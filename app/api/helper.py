# function to convert db results to dict
def make_dict(product):
    # fetch first image
        preview_image = product.images[0].url if product.images else None

        # calculate avg star rating & review count
        review_count = len(product.reviews)
        avg_rating = round(sum([review.star_rating for review in product.reviews]) / review_count, 1) if review_count > 0 else 0

        return {
            'id': product.id,
            'sellerId': product.seller_id,
            'categoryId': product.category_id,
            'name': product.name,
            'description': product.description,
            'price': product.price,
            'previewImage': preview_image,
            'avgRating': avg_rating,
            'reviewCount': review_count
        }
