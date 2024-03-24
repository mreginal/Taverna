from flask import Blueprint

# Crie uma instância de Blueprint
user_bp = Blueprint('user_bp', __name__)

# Associe a função cadastrar_usuario() a uma rota usando o método correto do Blueprint: .route()
@user_bp.route('/cadastrar', methods=['POST'])
def cadastrar_usuario_route():
    from controllers.user_controller import cadastrar_usuario
    return cadastrar_usuario()