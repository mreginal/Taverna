from models.Post import Post
from flask_jwt_extended import get_jwt_identity
from bson import ObjectId

def create_post(title, content):
    user_id = get_jwt_identity()
    response, status_code = Post.create_post_service(title, content, user_id)
    return response, status_code

def get_all_posts():
    posts = Post.find_all_posts_service()
    return posts

def get_posts_by_user_id():
    id = get_jwt_identity()
    posts = Post.find_post_by_user_id_service(id)
    return posts

def add_like(post_id):
    response, status_code = Post.add_like_service(post_id)
    return response, status_code

def remove_like(post_id):
    response, status_code = Post.remove_like_service(post_id)
    return response, status_code

def update_post(post_id, title, content):
    user_id = get_jwt_identity()
    current_post = Post.find_post_by_id_service(post_id)

    if current_post.get("user_id") != user_id:
        return {'message': 'Você não tem permissão para atualizar este post'}, 403
    
    update_data = {}
    if title and title != current_post.get("title"):
        update_data["title"] = title
    if content and content != current_post.get("content"):
        update_data["content"] = content

    if not update_data:
        return {'message': 'Pelo menos um campo deve ser enviado para ser atualizado'}, 400
    
    response = Post.update_post_service(post_id, update_data)
    
    if response.modified_count > 0:
        return {'message': 'Post atualizado com sucesso'}, 200
    else:
        return {'message': 'Nenhum campo foi modificado ou post não encontrado'}, 404

    