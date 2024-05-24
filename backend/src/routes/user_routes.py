from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from controllers.user_controller import (
    get_all_users, create_user, get_user_profile, update_user_profile, get_user_by_id,
    add_favorite, remove_favorite
)

user_bp = Blueprint('user_bp', __name__)

@user_bp.route('/', methods=['GET'])
def get_all_users_route():
    users = get_all_users()
    return jsonify(users)

@user_bp.route('/<user_id>', methods=['GET'])
def get_user_by_id_route(user_id):
    user = get_user_by_id(user_id)
    return jsonify(user)

@user_bp.route('/cadastrar', methods=['POST'])
def create_user_route():
    data = request.json
    if not all(key in data for key in ('username','name', 'birthdate', 'email', 'password')):
        return jsonify({'message': 'Campos obrigatórios ausentes'}), 400
    
    username = data.get('username')
    name = data.get('name')
    birthdate = data.get('birthdate')
    email = data.get('email')
    password = data.get('password')
    gender = data.get('gender')
    response, status_code = create_user(username, name, birthdate, email, password, gender)
    return jsonify(response), status_code

@user_bp.route('/perfil', methods=['GET'])
@jwt_required()
def get_user_route():
    user, status_code = get_user_profile()
    return jsonify(user), status_code

@user_bp.route('/atualizar', methods=['POST'])
@jwt_required()
def update_user_route():
    data = request.json
    name = data.get('name')
    birthdate = data.get('birthdate')
    gender = data.get('gender')
    response, status_code = update_user_profile(name, birthdate, gender)
    return jsonify(response), status_code

@user_bp.route('/favoritar', methods=['POST'])
@jwt_required()
def add_favorite_route():
    data = request.json
    post_id = data.get('post_id')
    response, status_code = add_favorite(post_id)
    return jsonify(response), status_code

@user_bp.route('/desfavoritar', methods=['POST'])
@jwt_required()
def remove_favorite_route():
    data = request.json
    post_id = data.get('post_id')
    response, status_code = remove_favorite(post_id)
    return jsonify(response), status_code