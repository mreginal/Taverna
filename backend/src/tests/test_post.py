import pytest
from unittest.mock import patch
from bson import ObjectId
import mongomock
from models.Post import Post

@pytest.fixture
def mock_db():
    client = mongomock.MongoClient()
    mock_db = client.db
    with patch('models.Post.db', mock_db):
        yield mock_db

@pytest.fixture
def post_model(mock_db):
    return Post()

def test_create_post_service_success(post_model, mock_db):
    response, status_code = post_model.create_post_service(
        "Test Post", "Test Content", ObjectId()
    )
    assert status_code == 201
    assert isinstance(response["_id"], str)

def test_find_all_posts_service(post_model, mock_db):
    mock_db.posts.insert_many([
        {"title": "Post 1", "content": "Content 1", "user_id": "user_id_1", "likes": 5},
        {"title": "Post 2", "content": "Content 2", "user_id": "user_id_2", "likes": 10}
    ])
    posts = post_model.find_all_posts_service()
    assert len(posts) == 2
    assert posts[0]["title"] == "Post 1"
    assert posts[1]["title"] == "Post 2"

def test_add_like_service(post_model, mock_db):
    post_id = mock_db.posts.insert_one({
        "title": "Test Post",
        "content": "This is a test post.",
        "user_id": "user_id_123",
        "likes": 0
    }).inserted_id
    response, status_code = post_model.add_like_service(str(post_id))
    assert status_code == 200
    assert response["message"] == "Like adicionado com sucesso!"

def test_remove_like_service(post_model, mock_db):
    post_id = mock_db.posts.insert_one({
        "title": "Test Post",
        "content": "This is a test post.",
        "user_id": "user_id_123",
        "likes": 1
    }).inserted_id
    response, status_code = post_model.remove_like_service(str(post_id))
    assert status_code == 200
    assert response["message"] == "Like removido com sucesso!"

