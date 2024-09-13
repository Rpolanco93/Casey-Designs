import uuid, os, boto3, botocore
from flask_login import current_user
from app.models import ProductReview
from typing import Dict, Any

'''AWS connection setup'''

s3 = boto3.client(
   "s3",
   aws_access_key_id=os.environ.get("S3_KEY"),
   aws_secret_access_key=os.environ.get("S3_SECRET")
)

'''Helper function to generate unique file names for s3'''

ALLOWED_EXTENSIONS = {"pdf", "png", "jpg", "jpeg", "gif", "HEIC"}

def get_unique_filename(filename):
    ext = filename.rsplit(".", 1)[1].lower()
    unique_filename = uuid.uuid4().hex
    return f"{unique_filename}.{ext}"

'''Upload File to s3 helper'''

BUCKET_NAME = os.environ.get("S3_BUCKET")
S3_LOCATION = f"http://{BUCKET_NAME}.s3.amazonaws.com/"

def upload_file_to_s3(file, acl="public-read"):
    try:
        s3.upload_fileobj(
            file,
            BUCKET_NAME,
            file.filename,
            ExtraArgs={
                "ACL": acl,
                "ContentType": file.content_type
            }
        )
    except Exception as e:
        # in case the your s3 upload fails
        return {"errors": str(e)}

    return {"url": f"{S3_LOCATION}{file.filename}"}

'''Delete file from s3 helper'''
def remove_file_from_s3(image_url):
    # AWS needs the image file name, not the URL,
    # so you split that out of the URL
    key = image_url.rsplit("/", 1)[1]
    try:
        s3.delete_object(
        Bucket=BUCKET_NAME,
        Key=key
        )
    except Exception as e:
        return { "errors": str(e) }
    return True

'''Function to convert product results to dict'''

def make_dict(product):
    # fetch first image
    preview_image = product.product_images[0].url if len(product.product_images) else None

    # calculate avg star rating & review count
    review_count = len(product.product_reviews)
    avg_rating = round(sum([review.stars for review in product.product_reviews]) / review_count,
                       1) if review_count > 0 else 0

    return {
        'id': product.id,
        'sellerId': product.seller_id,
        'name': product.name,
        'description': product.description,
        'price': product.price,
        'previewImage': preview_image,
        'avgRating': avg_rating,
        'reviewCount': review_count,
        'isOwner': True if current_user.is_authenticated and current_user.id is product.seller_id else False,
    }

'''function to make review returns with user data to dict'''

def review_dict(review: ProductReview) -> Dict[str, Any]:
    owner = review.user.to_dict()

    return {
        'review': review.review,
        'stars': review.stars,
        'user': {
            'firstName': owner["first_name"],
        },
        'reviewOwner': True if current_user.is_authenticated and current_user.id is owner['id'] else False,
        'createdAt': review.created_at,
        'updatedAt': review.updated_at,
        'userId': review.user_id
    }
