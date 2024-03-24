from flask import Blueprint
from ..controllers.user_controller import cadastrar_usuario

# Crie uma instância de Blueprint
user_bp = Blueprint('user', __name__)

# Associe a função cadastrar_usuario() a uma rota usando o método apropriado do Blueprint
user_bp.route('/', methods=['POST'])(cadastrar_usuario)
