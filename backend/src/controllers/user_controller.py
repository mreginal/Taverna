from models.user_model import User
import bcrypt
import base64

def cadastrar_usuario(name, birthdate, email, password, gender): 
    hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt(10))
    hashed64 = base64.b64encode(hashed).decode()
    response, status_code = User.cadastro_usuario_service(name,birthdate,email,hashed64,gender)
    return response, status_code
