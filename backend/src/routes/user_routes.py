from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required

user_bp = Blueprint('user_bp', __name__)

@user_bp.route('/', methods=['GET'])
def get_all_users_route():
    from controllers.user_controller import get_all_users
    users = get_all_users()
    return jsonify(users)

@user_bp.route('/cadastrar', methods=['POST'])
def create_user_route():
    from controllers.user_controller import create_user
    data = request.json
    if not all(key in data for key in ('name', 'birthdate', 'email', 'password')):
        return jsonify({'message': 'Campos obrigatórios ausentes'}), 400
    
    name = data.get('name')
    birthdate = data.get('birthdate')
    email = data.get('email')
    password = data.get('password')
    gender = data.get('gender')
    response, status_code = create_user(name, birthdate, email, password, gender)
    return jsonify(response), status_code

@user_bp.route('/perfil', methods=['GET'])
@jwt_required()
def get_user_route():
    from controllers.user_controller import get_user_profile
    user, status_code = get_user_profile()
    return jsonify(user), status_code