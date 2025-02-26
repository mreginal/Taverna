from database.mongodb import db
from bson import ObjectId

class User:
    
    @staticmethod
    def create_user_service(username, name, birthdate, email, hashed64, gender):
        existing_user = db.usuarios.find_one({"$or": [{"username": username}, {"email": email}]})
        if existing_user:
            if existing_user.get("username") == username:
                return {"message": "Username já cadastrado"}, 400
            elif existing_user.get("email") == email:
                return {"message": "E-mail já cadastrado"}, 400
        else:
            new_user = {
                "username": username,
                "name": name,
                "birthdate": birthdate,
                "email": email,
                "password": hashed64,
                "gender": gender,
                "profile_picture": None,
                "friends": [],
                "favorites": [],
                "is_online": False
            }
            db.usuarios.insert_one(new_user)
            return {"message": "Usuário cadastrado com sucesso!"}, 201
            

    @staticmethod
    def find_all_users_service():
        users = db.usuarios.find({}, {"password": 0})
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

    @staticmethod
    def update_to_online_service(id):
        response = db.usuarios.update_one(
            {"_id": ObjectId(id)},
            {"$set": {"is_online": True}}
        )
        return response

    @staticmethod
    def update_to_offline_service(id):
        response = db.usuarios.update_one(
            {"_id": ObjectId(id)},
            {"$set": {"is_online": False}}
        )
        return response
    
    @staticmethod
    def add_friend_service(user_id, friend_id):
        response = db.usuarios.update_one(
            {"_id": ObjectId(user_id)},
            {"$addToSet": {"friends": friend_id}}
        )
        return response
    
    @staticmethod
    def remove_friend_service(user_id, friend_id):
        response = db.usuarios.update_one(
            {"_id": ObjectId(user_id)},
            {"$pull": {"friends": friend_id}}
        )
        return response
    
    def find_friends_service(user_id):
        user = db.usuarios.find_one({"_id": ObjectId(user_id)})
        if user:
            return user.get("friends", [])
        return []

    @staticmethod
    def add_favorite_service(user_id, post_id):
        response = db.usuarios.update_one(
            {"_id": ObjectId(user_id)},
            {"$addToSet": {"favorites": post_id}}
        )
        return response
    
    @staticmethod
    def remove_favorite_service(user_id, post_id):
        response = db.usuarios.update_one(
            {"_id": ObjectId(user_id)},
            {"$pull": {"favorites": post_id}}
        )
        return response
    
    @staticmethod
    def find_favorites_service(user_id):
        user = db.usuarios.find_one({"_id": ObjectId(user_id)})
        if user:
            return user.get("favorites", [])
        return []

    @staticmethod
    def upload_profile_picture_service(user_id, profile_picture_url):
        response = db.usuarios.update_one(
            {"_id": ObjectId(user_id)},
            {"$set": {"profile_picture": profile_picture_url}}
        )
        return response
