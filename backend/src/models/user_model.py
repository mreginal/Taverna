from app import db
from pymongo.errors import DuplicateKeyError

class User:
    @staticmethod
    def cadastro_usuario_service(name, birthdate, email, hashed64, gender):
        novo_usuario = {
            "name": name,
            "birthdate": birthdate,
            "email": email,
            "password": hashed64,
            "gender": gender
        }
        try:
            db.usuarios.insert_one(novo_usuario)
            return "Usuário cadastrado com sucesso!", 201
        except DuplicateKeyError:
            return "E-mail já cadastrado", 400
     
