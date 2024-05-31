import pytest
from unittest.mock import patch
from bson import ObjectId
import mongomock
from models.Notification import Notification

@pytest.fixture
def mock_db():
    client = mongomock.MongoClient()
    mock_db = client.db
    with patch('models.Notification.db', mock_db):
        yield mock_db

@pytest.fixture
def notification_model(mock_db):
    return Notification()

def test_create_notification_service_success(notification_model, mock_db):
    response, status_code = notification_model.create_notification_service(
        ObjectId(), ObjectId(), "like", "Like Notification", "You received a like!", ObjectId()
    )
    assert status_code == 201
    assert response["message"] == "Notificação criada com sucesso!"

def test_find_notifications_by_user_id_service(notification_model, mock_db):
    user_id = "user_id_1"

    mock_db.notifications.insert_many([
        {"user_id": user_id, "sender_id": "sender_id_1", "type": "like", 
         "title": "Like Notification", "message": "You received a like!", 
         "post_id": "post_id_1", "check": False},
        {"user_id": user_id, "sender_id": "sender_id_1", "type": "comment", 
         "title": "Comment Notification", "message": "You received a comment!", 
         "post_id": "post_id_2", "check": False}
    ])
    notifications = notification_model.find_notifications_by_user_id_service(user_id)
    assert len(notifications) == 2
    assert notifications[0]["title"] == "Comment Notification"
    assert notifications[1]["title"] == "Like Notification"

def test_find_notification_by_id_service(notification_model, mock_db):
    notification_id = mock_db.notifications.insert_one(
        {"user_id": "user_id_1", "sender_id": "sender_id_1", 
         "type": "like", "title": "Like Notification", "message": "You received a like!", 
         "post_id": "post_id_1", "check": False}
    ).inserted_id

    notification_id_str = str(notification_id)

    notification = notification_model.find_notification_by_id_service(notification_id_str)

    assert notification["title"] == "Like Notification"
    assert isinstance(notification["_id"], str)

def test_remove_all_notifications_by_user_service(notification_model, mock_db):
    user_id = "user_id_1"

    mock_db.notifications.insert_many([
        {"user_id": user_id, "sender_id": "sender_id_1", "type": "like", 
         "title": "Like Notification", "message": "You received a like!", 
         "post_id": "post_id_1", "check": False},
        {"user_id": user_id, "sender_id": "sender_id_1", "type": "comment", 
         "title": "Comment Notification", "message": "You received a comment!", 
         "post_id": "post_id_2", "check": False}
    ])
    response = notification_model.remove_all_notifications_by_user_service(user_id)
    assert response.deleted_count == 2

def test_remove_notification_by_id_service(notification_model, mock_db):
    notification_id = mock_db.notifications.insert_one(
        {"user_id": "user_id_1", "sender_id": "sender_id_1", 
         "type": "like", "title": "Like Notification", "message": "You received a like!", 
         "post_id": "post_id_1", "check": False}
    ).inserted_id

    notification_id_str = str(notification_id)

    response = notification_model.remove_notification_by_id_service(notification_id_str)

    assert response.deleted_count == 1

