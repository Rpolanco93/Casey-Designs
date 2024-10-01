from app.models import ShoppingCartItem
from app.models.db import db


# Adds a demo product along with any other products here if you want. The id space between 1 and 99,999 is reserved
# for products created by seeding. As make sure specify an id when creating a seeded product.
def seed_shopping_cart_items():
    item1 = ShoppingCartItem(
        user_id=1,
        product_id=1,
        quantity=1,
        price=100
    )


    db.session.add(item1)
    db.session.commit()


# The id space between 1 and 99,999 is reserved for users created by seeding. To remove any seeded user a simple
# delete where primary key is < 100000 can be used.
def undo_shopping_cart_items():
    ShoppingCartItem.query.delete()
    db.session.commit()
