from database.mongodb import db
from pymongo.errors import DuplicateKeyError
from bson import ObjectId

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
    def find_all_users_service():
        users = db.usuarios.find()
        users_list = [user for user in users]
        for user in users_list:
            user['_id'] = str(user['_id'])
        return users_list
    
    @staticmethod
    def find_by_id_service(id):
        user = db.usuarios.find_one({"_id": ObjectId(id)})
        return user
    
    @staticmethod
    def find_by_email_service(email):
        user = db.usuarios.find_one({"email":email})
        return user
    
    @staticmethod
    def update_user_service(id, update_data):
        response = db.usuarios.update_one(
            {"_id": ObjectId(id)},
            {"$set": update_data}
        )
        return response

