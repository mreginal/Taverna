from app import db
from pymongo.errors import DuplicateKeyError

class User:
    @staticmethod
    def cadastro_usuario_service(name, birthdate, email, hashed64, gender):
        new_user = {
            "name": name,
            "birthdate": birthdate,
            "email": email,
            "password": hashed64,
            "gender": gender
        }
        try:
            db.usuarios.insert_one(new_user)
            return {"message": "Usuário cadastrado com sucesso!"}, 201
        except DuplicateKeyError:
            return {"message": "E-mail já cadastrado"}, 400

    @staticmethod
    def find_by_email_service(email):
        user = db.usuarios.find_one({"email":email})
        return user
