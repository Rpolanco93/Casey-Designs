from app.models import Role
from app.models.db import db


# adds roles to the table for role based access control
def seed_roles():
    super_user = Role(
        id=1,
        name='super user',
        description='provides full admin access'
    )
    product_review = Role(
        id=2,
        name='product-review',
        description='provides users access to review products'
    )
    shopper = Role(
        id=3,
        name='shopper',
        description='provides access to add / remove / delete items from shopping cart'
    )


    db.session.add(super_user)
    db.session.add(product_review)
    db.session.add(shopper)
    db.session.commit()


# The id space between 1 and 99,999 is reserved for users created by seeding. To remove any seeded user a simple
# delete where primary key is < 100000 can be used.
def undo_roles():
    Role.query.filter(Role.id < 100000).delete()
    db.session.commit()
