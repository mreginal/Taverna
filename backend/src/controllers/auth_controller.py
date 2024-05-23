from models.User import User
from flask_jwt_extended import create_access_token
from datetime import timedelta
import bcrypt
import base64

def login_usuario(email, password):
    user = User.find_by_email_service(email)
    if user and bcrypt.checkpw(password.encode(), base64.b64decode(user["password"])):
        expires = timedelta(hours=24)
        token = create_access_token(identity=str(user["_id"]), expires_delta=expires)
        return token, 200
    else:
        return {"message": "Email ou senha inválidos!"}, 401