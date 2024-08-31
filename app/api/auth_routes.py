from flask import Blueprint, request
from flask_login import current_user, login_user, logout_user
from sqlalchemy.orm import joinedload

from app.forms import LoginForm, SignUpForm
from app.models import User, db, UserRole

auth_routes = Blueprint('auth', __name__)

def make_dict(user):
    return {
        'id': user.id,
        'first_name': user.first_name,
        'roles': [role.to_dict() for role in user.user_roles]
    }

@auth_routes.route('/')
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        return make_dict(current_user)
    return {'errors': {'message': 'Unauthorized'}}, 401


@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = (
            User
                .query
                .filter(User.email == form.data['email'])
                .options(joinedload(User.user_roles))
                .first()
        )
        login_user(user)
        return make_dict(user)
    return form.errors, 401


@auth_routes.route('/logout')
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {'message': 'User logged out'}


@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new user and logs them in
    """
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # removes the csrf to use the ** distribution for ease of coding.
        # it will turn the form.data into key=values
        del form['csrf_token']
        user = User(
            **form.data
        )
        db.session.add(user)
        # flush is used to push(run) all of the previous db adds
        # needed to flush the user to get an id from the db to use it for user roles
        db.session.flush()

        super = UserRole(
            user_id=user.id,
            role_id=1
        )
        product_review = UserRole(
            user_id=user.id,
            role_id=2
        )
        shopper = UserRole(
            user_id=user.id,
            role_id=3
        )

        db.session.add(super)
        db.session.add(product_review)
        db.session.add(shopper)

        db.session.commit()
        login_user(user)
        return make_dict(user)
    return form.errors, 401


@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': {'message': 'Unauthorized'}}, 401
