from models.User import User
from flask_jwt_extended import create_access_token, get_jwt_identity
from datetime import timedelta
from socketio_instance import socketio
import bcrypt
import base64

def login_usuario(email, password):
    user = User.find_by_email_service(email)
    if user and bcrypt.checkpw(password.encode(), base64.b64decode(user["password"])):
        User.update_to_online_service(user["_id"])

        friends = user.get("friends", [])
        for friend_id in friends:
            notify_friend(friend_id, user["_id"], True)

        expires = timedelta(hours=24)
        token = create_access_token(identity=str(user["_id"]), expires_delta=expires)
        return token, 200
    else:
        return {"message": "Email ou senha inválidos."}, 401
    
def logout_usuario():
    user_id = get_jwt_identity()
    user = User.find_by_id_service(user_id)
    friends = user.get("friends", [])

    for friend_id in friends:
        notify_friend(friend_id, user_id, False)

    User.update_to_offline_service(user_id)
    return {"message": "Usuário deslogado com sucesso."}, 200

def notify_friend(friend_id, user_id, is_online):
    socketio.emit('status_changed', {'user_id': user_id, 'is_online': is_online}, room=friend_id)