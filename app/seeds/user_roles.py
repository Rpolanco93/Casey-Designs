from app.models import UserRole
from app.models.db import db


# adds roles to the table for role based access control
def seed_user_roles():
    super_user = UserRole(
        user_id=1,
        role_id=1
    )
    marnie_review = UserRole(
        user_id=2,
        role_id=2
    )
    marnie_shopper = UserRole(
        user_id=2,
        role_id=3
    )
    bobbie_review = UserRole(
        user_id=3,
        role_id=2
    )
    bobby_shopper = UserRole(
        user_id=3,
        role_id=3
    )
    demotest_review = UserRole(
        user_id=4,
        role_id=2
    )
    demotest_shopper = UserRole(
        user_id=4,
        role_id=3
    )

    db.session.add(super_user)
    db.session.add(marnie_review)
    db.session.add(marnie_shopper)
    db.session.add(bobbie_review)
    db.session.add(bobby_shopper)
    db.session.add(demotest_review)
    db.session.add(demotest_shopper)
    db.session.commit()


# The id space between 1 and 99,999 is reserved for users created by seeding. To remove any seeded user a simple
# delete where primary key is < 100000 can be used.
def undo_user_roles():
    # No delete is necessary as deleting users / roles will clean this table
    # UserRole.query.filter(UserRole.id < 100000).delete()
    # db.session.commit()
    pass
