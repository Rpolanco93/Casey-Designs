from flask.cli import AppGroup

from app.models.db import environment
from .users import seed_users, undo_users
from .roles import seed_roles, undo_roles
from .user_roles import seed_user_roles, undo_user_roles

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
        undo_user_roles()
        undo_roles()
        undo_users()

    # Add other seed functions here
    seed_users()
    seed_roles()
    seed_user_roles()


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    # Add other undo functions here
    undo_user_roles()
    undo_roles()
    undo_users()
