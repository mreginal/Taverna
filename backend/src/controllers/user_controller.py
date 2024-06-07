from models.User import User
from flask_jwt_extended import get_jwt_identity
from bson import ObjectId
import bcrypt
import base64

def get_all_users():
    users = User.find_all_users_service()
    return users

def get_user_by_id(user_id):
    user = User.find_by_id_service(ObjectId(user_id))
    if user:
        user['_id'] = str(user['_id'])
        user.pop('password', None)
        return user
    else:
        return {'message': 'Usuário não encontrado'}, 404

def create_user(username, name, birthdate, email, password, gender): 
    hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt(10))
    hashed64 = base64.b64encode(hashed).decode()
    response, status_code = User.create_user_service(username, name, birthdate, email, hashed64, gender)
    return response, status_code

def get_user_profile():
    id = get_jwt_identity()
    user = User.find_by_id_service(ObjectId(id))
    if user:
        user.pop('password', None)
        user['_id'] = str(user['_id'])
        return user, 200
    else:
        return {'message': 'Usuário não encontrado'}, 404
    
def update_user_profile(name, birthdate, gender):
    id = get_jwt_identity()
    current_user = User.find_by_id_service(ObjectId(id))
    
    update_data = {}
    if name and name != current_user.get("name"):
        update_data["name"] = name
    if birthdate and birthdate != current_user.get("birthdate"):
        update_data["birthdate"] = birthdate
    if gender and gender != current_user.get("gender"):
        update_data["gender"] = gender

    if not update_data:
        return {'message': 'Pelo menos um campo deve ser enviado para ser atualizado'}, 400
    
    response = User.update_user_service(id, update_data)
    if response.modified_count > 0:
        return {'message': 'Usuário atualizado com sucesso'}, 200
    else:
        return {'message': 'Nenhum campo foi modificado ou usuário não encontrado'}, 404
    
def add_favorite(post_id):
    id = get_jwt_identity()
    if not post_id:
        return {'message': 'ID do post deve ser enviado'}, 400
    response = User.add_favorite_service(id, post_id)
    if response.modified_count > 0:
        return {'message': 'Post adicionado aos favoritos com sucesso'}, 200
    else:
        return {'message': 'Post já estava nos favoritos ou usuário não encontrado'}, 404
    
def remove_favorite(post_id):
    id = get_jwt_identity()
    response = User.remove_favorite_service(id, post_id)
    if response.modified_count > 0:
        return {'message': 'Post removido dos favoritos com sucesso'}, 200
    else:
        return {'message': 'Post não estava nos favoritos ou usuário não encontrado'}, 404
    
def get_favorites():
    id = get_jwt_identity()
    favorites = User.find_favorites_service(id)
    if favorites:
        return favorites, 200
    else:
        return {'message': 'Usuário não encontrado'}, 404


