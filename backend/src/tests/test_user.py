import pytest
import warnings
from unittest.mock import patch
from bson import ObjectId
import mongomock
from models.User import User

@pytest.fixture
def mock_db():
    client = mongomock.MongoClient()
    mock_db = client.db
    mock_db.usuarios.create_index('email', unique=True)
    with patch('models.User.db', mock_db):
        yield mock_db

@pytest.fixture
def user_model(mock_db):
    return User()

def test_create_user_service_success(user_model, mock_db):
    response, status_code = user_model.create_user_service(
        "Test User", "1990-01-01", "test@example.com", "hashed_password", "M"
    )
    assert status_code == 201
    assert response["message"] == "Usuário cadastrado com sucesso!"

def test_create_user_service_duplicate_email(user_model, mock_db):
    mock_db.usuarios.insert_one({
        "name": "Existing User",
        "birthdate": "1990-01-01",
        "email": "test@example.com",
        "password": "hashed_password",
        "gender": "M"
    })
    response, status_code = user_model.create_user_service(
        "Test User", "1990-01-01", "test@example.com", "hashed_password", "M"
    )
    assert status_code == 400
    assert response["message"] == "E-mail já cadastrado"

def test_find_all_users_service(user_model, mock_db):
    mock_db.usuarios.insert_many([
        {"name": "User 1", "birthdate": "1990-01-01", "email": "user1@example.com", "password": "pass1", "gender": "M"},
        {"name": "User 2", "birthdate": "1991-02-02", "email": "user2@example.com", "password": "pass2", "gender": "F"}
    ])
    users = user_model.find_all_users_service()
    assert len(users) == 2
    assert users[0]["name"] == "User 1"
    assert users[1]["name"] == "User 2"

def test_find_by_id_service(user_model, mock_db):
    user_id = mock_db.usuarios.insert_one({
        "name": "Test User",
        "birthdate": "1990-01-01",
        "email": "test@example.com",
        "password": "hashed_password",
        "gender": "M"
    }).inserted_id
    user = user_model.find_by_id_service(user_id)
    assert user is not None
    assert user["name"] == "Test User"

def test_find_by_email_service(user_model, mock_db):
    mock_db.usuarios.insert_one({
        "name": "Test User",
        "birthdate": "1990-01-01",
        "email": "test@example.com",
        "password": "hashed_password",
        "gender": "M"
    })
    user = user_model.find_by_email_service("test@example.com")
    assert user is not None
    assert user["email"] == "test@example.com"

def test_update_user_service(user_model, mock_db):
    user_id = mock_db.usuarios.insert_one({
        "name": "Test User",
        "birthdate": "1990-01-01",
        "email": "test@example.com",
        "password": "hashed_password",
        "gender": "M"
    }).inserted_id
    update_data = {"name": "Updated User"}
    response = user_model.update_user_service(user_id, update_data)
    assert response.modified_count == 1
    updated_user = mock_db.usuarios.find_one({"_id": ObjectId(user_id)})
    assert updated_user["name"] == "Updated User"
