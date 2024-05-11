from flask import Blueprint, request, jsonify
from controllers.auth_controller import login_usuario

auth_bp = Blueprint('auth_bp', __name__)

@auth_bp.route('/user', methods=['POST'])
def login_usuario_route():
    data = request.json

    email = data.get('email')
    password = data.get('password')

    response, status_code = login_usuario(email, password)
    return jsonify(response), status_code