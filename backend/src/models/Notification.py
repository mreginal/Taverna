from database.mongodb import db
from bson import ObjectId

class Notification:

    @staticmethod
    def create_notification_service(user_id, sender_id, type, title, message, post_id):
        new_notification = {
            "user_id": user_id,
            "sender_id": sender_id,
            "type": type,
            "title": title,
            "message": message,
            "post_id": post_id,
            "check": False
        }
        try:
            db.notifications.insert_one(new_notification)
            return {"message": "Notificação criada com sucesso!"}, 201
        except Exception as e:
            error_message = f"Erro ao criar a notificação: {str(e)}"
            return {"message": error_message}, 400
        
    @staticmethod
    def find_notifications_by_user_id_service(user_id):
        notifications = db.notifications.find({"user_id": user_id}).sort('_id', -1)
        notifications_list = [notification for notification in notifications]
        for notification in notifications_list:
            notification['_id'] = str(notification['_id'])
        return notifications_list
    
    @staticmethod
    def find_notification_by_id_service(notification_id):
        notification = db.notifications.find_one({"_id": ObjectId(notification_id)})
        if notification:
            notification['_id'] = str(notification['_id'])
            return notification
        return None

    @staticmethod
    def remove_all_notifications_by_user_service(user_id):
        response = db.notifications.delete_many({"user_id": user_id})
        return response
    
    @staticmethod
    def remove_notification_by_id_service(notification_id):
        response = db.notifications.delete_one({"_id": ObjectId(notification_id)})
        return response
    
    #@staticmethod
    #def check_notification_service(notification_id):
    #    response = db.notifications.update_one(
    #        {"_id": ObjectId(notification_id)},
    #        {"$set": {"check": True}}
    #    )
    #    return response
        