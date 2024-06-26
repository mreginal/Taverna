from database.mongodb import db
from bson import ObjectId

class Post:

    @staticmethod
    def create_post_service(title, content, user_id):
        new_post = {
            "title": title,
            "content": content,
            "user_id": user_id,
            "likes": 0,
            "comments": []
        }
        try:
            db.posts.insert_one(new_post)
            
            created_post = db.posts.find_one({"_id": new_post["_id"]})
            
            if created_post:
                created_post['_id'] = str(created_post['_id'])
                return created_post, 201
            else:
                return {"message": "Erro ao criar o post. Post não encontrado."}, 400
        except Exception as e:
            error_message = f"Erro ao criar o post: {str(e)}"
            return {"message": error_message}, 400
    
    @staticmethod
    def find_all_posts_service():
        posts = db.posts.find({}, {"comments": 0}).sort('_id', -1)
        posts_list = [post for post in posts]
        for post in posts_list:
            post['_id'] = str(post['_id'])
        return posts_list
    
    @staticmethod
    def find_post_by_id_service(post_id):
        post = db.posts.find_one({"_id": ObjectId(post_id)}, {"comments": 0})
        if post:
            post['_id'] = str(post['_id'])
            return post
        return None
    
    @staticmethod
    def find_post_by_user_id_service(user_id):
        posts = db.posts.find({"user_id": user_id}, {"comments": 0}).sort('_id', -1)
        posts_list = [post for post in posts]
        for post in posts_list:
            post['_id'] = str(post['_id'])
        return posts_list

    @staticmethod
    def add_like_service(post_id):
        post = db.posts.find_one({"_id": ObjectId(post_id)})
        if post:
            db.posts.update_one({"_id": ObjectId(post_id)}, {"$set": {"likes": post['likes'] + 1}})
            return {"message": "Like adicionado com sucesso!"}, 200
        return {"message": "Post não encontrado!"}, 404
    
    @staticmethod
    def remove_like_service(post_id):
        post = db.posts.find_one({"_id": ObjectId(post_id)})
        if post:
            db.posts.update_one({"_id": ObjectId(post_id)}, {"$set": {"likes": post['likes'] - 1}})
            return {"message": "Like removido com sucesso!"}, 200
        return {"message": "Post não encontrado!"}, 404
    
    @staticmethod
    def update_post_service(post_id, update_data):
        response = db.posts.update_one(
            {"_id": ObjectId(post_id)},
            {"$set": update_data}
        )
        return response
    
    @staticmethod
    def add_comment_service(post_id, user_id, content):
        comment = {
            "comment_id": ObjectId(),
            "user_id": user_id,
            "content": content
        }
        response = db.posts.update_one(
            {"_id": ObjectId(post_id)},
            {"$push": {"comments": comment}}
        )
        if response.modified_count == 1:
            return {"message": "Comentário adicionado com sucesso!"}, 200
        return {"message": "Post não encontrado!"}, 404
    
    @staticmethod
    def find_comments_by_post_id_service(post_id):
        post = db.posts.find_one({"_id": ObjectId(post_id)}, {"comments": 1, "_id": 0})
        if post and "comments" in post:
            comments = sorted(post["comments"], key=lambda x: x["comment_id"], reverse=True)
            for comment in comments:
                comment["comment_id"] = str(comment["comment_id"])
            return comments
        return []
    
    @staticmethod
    def update_comment_service(post_id, comment_id, content):
        response = db.posts.update_one(
            {"_id": ObjectId(post_id), "comments.comment_id": ObjectId(comment_id)},
            {"$set": {"comments.$.content": content}}
        )
        if response.modified_count == 1:
            return {"message": "Comentário atualizado com sucesso!"}, 200
        return {"message": "Comentário não encontrado!"}, 404
    
    @staticmethod
    def delete_comment_service(post_id, comment_id):
        response = db.posts.update_one(
            {"_id": ObjectId(post_id)},
            {"$pull": {"comments": {"comment_id": ObjectId(comment_id)}}}
        )
        if response.modified_count == 1:
            return {"message": "Comentário removido com sucesso!"}, 200
        return {"message": "Comentário não encontrado!"}, 404