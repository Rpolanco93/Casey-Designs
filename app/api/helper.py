# function to convert db results to dict
def make_dict(product):
    # fetch first image
    preview_image = product.product_images[0].url if len(product.product_images) else None

    # calculate avg star rating & review count
    review_count = len(product.product_reviews)
    avg_rating = round(sum([review.star_rating for review in product.product_reviews]) / review_count,
                       1) if review_count > 0 else 0

    return {
        'id': product.id,
        'sellerId': product.seller_id,
        'name': product.name,
        'description': product.description,
        'price': product.price,
        'previewImage': preview_image,
        'avgRating': avg_rating,
        'reviewCount': review_count
    }
