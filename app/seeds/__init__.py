from flask.cli import AppGroup

from app.models.db import environment
from .users import seed_users, undo_users
from .roles import seed_roles, undo_roles
from .user_roles import seed_user_roles, undo_user_roles
from .products import seed_products, undo_products
from .product_images import seed_images, undo_images
from .product_reviews import seed_review, undo_review
from .shopping_cart_items import seed_shopping_cart_items, undo_shopping_cart_items

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_shopping_cart_items()
        undo_review()
        undo_images()
        undo_products()
        undo_user_roles()
        undo_roles()
        undo_users()


    # Add other seed functions here
    seed_users()
    seed_roles()
    seed_user_roles()
    seed_products()
    seed_images()
    seed_review()
    seed_shopping_cart_items()


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    # Add other undo functions here
    undo_shopping_cart_items()
    undo_review()
    undo_images()
    undo_products()
    undo_user_roles()
    undo_roles()
    undo_users()
