from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from controllers.post_controller import (
    create_post, get_all_posts, add_like, remove_like, get_posts_by_user_id,
    update_post
)

post_bp = Blueprint('post_bp', __name__)

@post_bp.route('/', methods=['GET'])
def get_all_posts_route():
    posts = get_all_posts()
    return jsonify(posts)

@post_bp.route('/perfil', methods=['GET'])
@jwt_required()
def get_posts_by_user_id_route():
    posts = get_posts_by_user_id()
    return jsonify(posts)

@post_bp.route('/criar', methods=['POST'])
@jwt_required()
def create_post_route():
    data = request.json
    if not all(key in data for key in ('title', 'content')):
        return jsonify({'message': 'Campos obrigatórios ausentes'}), 400
    
    title = data.get('title')
    content = data.get('content')
    response, status_code = create_post(title, content)
    return jsonify(response), status_code

@post_bp.route('/like', methods=['POST'])
@jwt_required()
def add_like_route():
    data = request.json
    if 'post_id' not in data:
        return jsonify({'message': 'Campo obrigatório ausente'}), 400
    
    post_id = data.get('post_id')
    response, status_code = add_like(post_id)
    return jsonify(response), status_code

@post_bp.route('/dislike', methods=['POST'])
@jwt_required()
def remove_like_route():
    data = request.json
    if 'post_id' not in data:
        return jsonify({'message': 'Campo obrigatório ausente'}), 400
    
    post_id = data.get('post_id')
    response, status_code = remove_like(post_id)
    return jsonify(response), status_code

@post_bp.route('/atualizar', methods=['POST'])
@jwt_required()
def update_post_route():
    data = request.json
    post_id = data.get('_id')
    title = data.get('title')
    content = data.get('content')
    response, status_code = update_post(post_id, title, content)
    return jsonify(response), status_code