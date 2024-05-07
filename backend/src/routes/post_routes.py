from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from controllers.post_controller import create_post, get_all_posts

post_bp = Blueprint('post_bp', __name__)

@post_bp.route('/', methods=['GET'])
def get_all_posts_route():
    posts = get_all_posts()
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

