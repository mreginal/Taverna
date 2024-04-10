from flask import Blueprint, request, jsonify

user_bp = Blueprint('user_bp', __name__)

@user_bp.route('/cadastrar', methods=['POST'])
def cadastrar_usuario_route():
    from controllers.user_controller import cadastrar_usuario
    data = request.json
    if not all(key in data for key in ('name', 'birthdate', 'email', 'password')):
        return jsonify({'message': 'Campos obrigatórios ausentes'}), 400
    
    name = data.get('name')
    birthdate = data.get('birthdate')
    email = data.get('email')
    password = data.get('password')
    gender = data.get('gender')
    response, status_code = cadastrar_usuario(name, birthdate, email, password, gender)
    return jsonify(response), status_code
