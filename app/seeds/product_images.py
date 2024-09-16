from app.models import db, ProductImage, environment, SCHEMA
from sqlalchemy.sql import text


# Adding product_images seeder data
def seed_images():
    flag1 = ProductImage(
        id=1,
        product_id=1,
        url="https://kenswebsite.s3.us-east-2.amazonaws.com/photos/don't+tread+on+me+flag.jpg"
    )
    adventure1 = ProductImage(
        id=2,
        product_id=2,
        url="https://kenswebsite.s3.us-east-2.amazonaws.com/photos/let+the+adventure+begin.jpg"
    )
    familyName1 = ProductImage(
        id=3,
        product_id=3,
        url="https://kenswebsite.s3.us-east-2.amazonaws.com/photos/family+name+hanging.JPG"
    )
    sport1 = ProductImage(
        id=4,
        product_id=4,
        url="https://kenswebsite.s3.us-east-2.amazonaws.com/photos/buffalo+bills+flag.jpg"
    )
    christian1 = ProductImage(
        id=5,
        product_id=5,
        url="https://kenswebsite.s3.us-east-2.amazonaws.com/photos/angel-shield.jpg"
    )
    establishedFam = ProductImage(
        id=6,
        product_id=6,
        url="https://kenswebsite.s3.us-east-2.amazonaws.com/photos/family+name+est.jpg"
    )
    armor1 = ProductImage(
        id=7,
        product_id=7,
        url="https://kenswebsite.s3.us-east-2.amazonaws.com/photos/full-armor.jpeg"
    )
    ephes1 = ProductImage(
        id=8,
        product_id=8,
        url="https://kenswebsite.s3.us-east-2.amazonaws.com/photos/helmet+flag.jpg"
    )
    iAm = ProductImage(
        id=9,
        product_id=9,
        url="https://kenswebsite.s3.us-east-2.amazonaws.com/photos/i+am.jpg"
    )
    shield = ProductImage(
        id=10,
        product_id=10,
        url="https://kenswebsite.s3.us-east-2.amazonaws.com/photos/armor+shield.jpg"
    )


    all_images = [
        flag1,
        adventure1,
        familyName1,
        sport1,
        christian1,
        establishedFam,
        armor1,
        ephes1,
        iAm,
        shield
    ]

    add_all_images = [db.session.add(image) for image in all_images]
    print("All images added")

    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_images():
    if environment == "production":
        db.session.execute(text(f"TRUNCATE table {SCHEMA}.product_images RESTART IDENTITY CASCADE;"))
    else:
        db.session.execute(text("DELETE FROM product_images"))

    db.session.commit()
