from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from controllers.notification_controller import (
    create_notification, get_notifications_by_user, remove_all_notifications_by_user,
    remove_notification_by_id
)

notification_bp = Blueprint('notification_bp', __name__)

@notification_bp.route('/criar', methods=['POST'])
@jwt_required()
def create_notification_route():
    data = request.json
    if not all(key in data for key in ('user_id', 'type', 'title', 'message')):
        return jsonify({'message': 'Campos obrigatórios ausentes'}), 400
    
    user_id = data.get('user_id')
    type = data.get('type')
    title = data.get('title')
    message = data.get('message')
    post_id = data.get('post_id')
    response, status_code = create_notification(user_id, type, title, message, post_id)
    return jsonify(response), status_code

@notification_bp.route('/usuario', methods=['GET'])
@jwt_required()
def get_notifications_by_user_route():
    notifications = get_notifications_by_user()
    return jsonify(notifications)

@notification_bp.route('/limpar', methods=['DELETE'])
@jwt_required()
def remove_all_notifications_by_user_route():
    response, status_code = remove_all_notifications_by_user()
    return jsonify(response), status_code

@notification_bp.route('/remover/<notification_id>', methods=['DELETE'])
@jwt_required()
def remove_notification_by_id_route(notification_id):
    response, status_code = remove_notification_by_id(notification_id)
    return jsonify(response), status_code