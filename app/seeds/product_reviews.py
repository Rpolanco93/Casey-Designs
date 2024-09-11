from app.models import db, ProductReview, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_review():
    demo1 = ProductReview(
        product_id=1,
        user_id=2,
        review="I love this design! Great Quality!",
        stars=5
    )
    demo2 = ProductReview(
        product_id=2,
        user_id=2,
        review="Great addition to welcome guest into our home",
        stars=5
    )
    demo3 = ProductReview(
        product_id=3,
        user_id=2,
        review="Love the design!",
        stars=4
    )
    demo4 = ProductReview(
        product_id=5,
        user_id=1,
        review="I love lions",
        stars=5
    )
    demo5 = ProductReview(
        product_id=6,
        user_id=1,
        review="Lovely wedding present",
        stars=5
    )

    db.session.add(demo1)
    db.session.add(demo2)
    db.session.add(demo3)
    db.session.add(demo4)
    db.session.add(demo5)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_review():
    # if environment == "production":
    #     db.session.execute(text(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;"))
    # else:
    #     db.session.execute(text("DELETE FROM reviews"))

    # db.session.commit()
    pass
