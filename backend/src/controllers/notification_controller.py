from models.Notification import Notification
from flask_jwt_extended import get_jwt_identity

def create_notification(user_id, type, title, message, post_id):
    sender_id = get_jwt_identity()
    if type == "like" or type == "comment":
        if post_id is None:
            return {"message": "O id do post é obrigatório para notificações de like e comentários"}, 400
    response, status_code = Notification.create_notification_service(user_id, sender_id, type, title, message, post_id)
    return response, status_code

def get_notifications_by_user():
    user_id = get_jwt_identity()
    notifications = Notification.find_notifications_by_user_id_service(user_id)
    return notifications

def remove_all_notifications_by_user():
    user_id = get_jwt_identity()
    response = Notification.remove_all_notifications_by_user_service(user_id)
    if response.deleted_count > 0:
        return {"message": "Notificações removidas com sucesso"}, 200
    else:
        return {"message": "A operação falhou ou não há notificações a serem apagadas"}, 404
    
def remove_notification_by_id(notification_id):
    user_id = get_jwt_identity()
    notification = Notification.find_notification_by_id_service(notification_id)
    if notification:
        if notification.get("user_id") == user_id:
            response = Notification.remove_notification_by_id_service(notification_id)
            if response.deleted_count > 0:
                return {"message": "Notificação removida com sucesso"}, 200
            else:
                return {"message": "A operação falhou"}, 400
        else:
            return {"message": "Você não tem permissão para remover esta notificação"}, 403
    else:
        return {"message": "Notificação não encontrada"}, 404

