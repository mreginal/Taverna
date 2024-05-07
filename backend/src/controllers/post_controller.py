from models.Post import Post
from flask_jwt_extended import get_jwt_identity

def create_post(title, content):
    user_id = get_jwt_identity()
    response, status_code = Post.create_post_service(title, content, user_id)
    return response, status_code

def get_all_posts():
    posts = Post.find_all_posts_service()
    return posts