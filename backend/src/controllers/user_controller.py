from models.user_model import User
from flask_jwt_extended import get_jwt_identity
from bson import ObjectId
import bcrypt
import base64

def get_all_users():
    users = User.find_all_users_service()
    return users

def create_user(name, birthdate, email, password, gender): 
    hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt(10))
    hashed64 = base64.b64encode(hashed).decode()
    response, status_code = User.cadastro_usuario_service(name,birthdate,email,hashed64,gender)
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


