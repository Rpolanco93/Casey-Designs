from app.models import Product
from app.models.db import db


# Adds a demo product along with any other products here if you want. The id space between 1 and 99,999 is reserved
# for products created by seeding. As make sure specify an id when creating a seeded product.
def seed_products():
    product1 = Product(
        id=1,
        seller_id=1,
        name='American Flag',
        price=100,
        deleted=False,
        description='Take pride in our country and hang our flag with pride!'
    )
    product2 = Product(
        id=2,
        seller_id=1,
        name='Adventure Time',
        price=100,
        deleted=False,
        description='Classic sign with the ability to engrave anything into the white space!'
    )
    product3 = Product(
        id=3,
        seller_id=1,
        name='Family Name Portrait',
        price=100,
        deleted=False,
        description='Make your home your own!'
    )
    product4 = Product(
        id=4,
        seller_id=1,
        name='Sport Team Logos',
        price=100,
        deleted=False,
        description='Create a custom design or keep their original'
    )
    product5 = Product(
        id=5,
        seller_id=1,
        name='Victory',
        price=100,
        deleted=False,
        description='Lion'
    )
    product6 = Product(
        id=6,
        seller_id=2,
        name='Established Family',
        price=75,
        deleted=False,
        description='This is home'
    )
    product7 = Product(
        id=7,
        seller_id=2,
        name='Put on Your Armor',
        price=30,
        deleted=False,
        description='Daily reminder'
    )
    product8 = Product(
        id=8,
        seller_id=2,
        name='Ephes 6:11',
        price=80,
        deleted=False,
        description='Armor of God'
    )
    product9 = Product(
        id=9,
        seller_id=2,
        name='I Am....',
        price=100,
        deleted=False,
        description='Positive reinforcements'
    )
    product10 = Product(
        id=10,
        seller_id=2,
        name='Shield',
        price=150,
        deleted=False,
        description='Put on the shield'
    )

    db.session.add(product1)
    db.session.add(product2)
    db.session.add(product3)
    db.session.add(product4)
    db.session.add(product5)
    db.session.add(product6)
    db.session.add(product7)
    db.session.add(product8)
    db.session.add(product9)
    db.session.add(product10)

    db.session.commit()


# The id space between 1 and 99,999 is reserved for users created by seeding. To remove any seeded user a simple
# delete where primary key is < 100000 can be used.
def undo_products():
    Product.query.filter(Product.id < 100000).delete()
    db.session.commit()
