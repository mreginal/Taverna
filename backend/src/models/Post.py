from database.mongodb import db

class Post:

    @staticmethod
    def create_post_service(title, content, user_id):
        new_post = {
            "title": title,
            "content": content,
            "user_id": user_id,
            "likes": 0,
        }
        try:
            db.posts.insert_one(new_post)
            return {"message": "Post criado com sucesso!"}, 201
        except Exception as e:
            error_message = f"Erro ao criar o post: {str(e)}"
            return {"message": error_message}, 400

    
    @staticmethod
    def find_all_posts_service():
        posts = db.posts.find()
        posts_list = [post for post in posts]
        for post in posts_list:
            post['_id'] = str(post['_id'])
        return posts_list
