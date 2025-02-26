from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from controllers.auth_controller import login_usuario, logout_usuario

auth_bp = Blueprint('auth_bp', __name__)

@auth_bp.route('/login', methods=['POST'])
def login_usuario_route():
    data = request.json

    email = data.get('email')
    password = data.get('password')

    response, status_code = login_usuario(email, password)
    return jsonify(response), status_code

@auth_bp.route('/logout', methods=['POST'])
@jwt_required()  
def logout_usuario_route():
    response, status_code = logout_usuario()
    return jsonify(response), status_code