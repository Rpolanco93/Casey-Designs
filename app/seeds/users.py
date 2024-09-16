from app.models import User
from app.models.db import db


# Adds a demo user along with any other users here if you want. The id space between 1 and 99,999 is reserved
# for users created by seeding. As make sure specify an id when creating a seeded user.
def seed_users():
    demo = User(
        id=1,
        first_name='Demo User',
        last_name='Last',
        username='Demo',
        email='demo@aa.io',
        password='password'
    )
    marnie = User(
        id=2,
        first_name='Marnie',
        last_name='Last',
        username='marnie',
        email='marnie@aa.io',
        password='password'
    )
    bobbie = User(
        id=3,
        first_name='First',
        last_name='Last',
        username='bobbie',
        email='bobbie@aa.io',
        password='password'
    )
    demotest2 = User(
        id=4,
        first_name='First',
        last_name='Last',
        username='demotest2',
        email='demotest2@aa.io',
        password='password'
    )

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(demotest2)
    db.session.commit()


# The id space between 1 and 99,999 is reserved for users created by seeding. To remove any seeded user a simple
# delete where primary key is < 100000 can be used.
def undo_users():
    User.query.filter(User.id < 100000).delete()
    db.session.commit()
