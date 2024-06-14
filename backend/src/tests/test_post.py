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
    assert posts[0]["title"] == "Post 2"
    assert posts[1]["title"] == "Post 1"

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

def test_find_post_by_id_service(mock_db):
    post_id = mock_db.posts.insert_one({
        "title": "Test Post",
        "content": "This is a test post.",
        "user_id": "test_user"
    }).inserted_id

    post_id_str = str(post_id)

    post = Post.find_post_by_id_service(post_id_str)

    assert post is not None
    assert post["_id"] == post_id_str
    assert post["title"] == "Test Post"
    assert post["content"] == "This is a test post."
    assert post["user_id"] == "test_user"

def test_find_post_by_user_id_service(mock_db):
    mock_db.posts.insert_many([
        {"title": "Post 1", "content": "Content 1", "user_id": "user_id_1"},
        {"title": "Post 2", "content": "Content 2", "user_id": "user_id_2"}
    ])
    
    posts = Post.find_post_by_user_id_service("user_id_1")
    assert len(posts) == 1
    assert posts[0]["title"] == "Post 1"
    assert posts[0]["content"] == "Content 1"
    assert posts[0]["user_id"] == "user_id_1"

def test_update_post_service(mock_db):
    post_id = mock_db.posts.insert_one({
        "title": "Test Post",
        "content": "This is a test post.",
        "user_id": "test_user"
    }).inserted_id
    
    response = Post.update_post_service(str(post_id), {"title": "Updated Post"})
    assert response.modified_count == 1
    
    post = mock_db.posts.find_one({"_id": ObjectId(post_id)})
    assert post["title"] == "Updated Post"

def test_add_like_service(mock_db):
    post_id = mock_db.posts.insert_one({
        "title": "Test Post",
        "content": "This is a test post.",
        "user_id": "test_user",
        "likes": 0
    }).inserted_id
    
    response, status_code = Post.add_like_service(str(post_id))
    assert status_code == 200
    assert response["message"] == "Like adicionado com sucesso!"
    
    post = mock_db.posts.find_one({"_id": ObjectId(post_id)})
    assert post["likes"] == 1

def test_remove_like_service(mock_db):
    post_id = mock_db.posts.insert_one({
        "title": "Test Post",
        "content": "This is a test post.",
        "user_id": "test_user",
        "likes": 1
    }).inserted_id
    
    response, status_code = Post.remove_like_service(str(post_id))
    assert status_code == 200
    assert response["message"] == "Like removido com sucesso!"
    
    post = mock_db.posts.find_one({"_id": ObjectId(post_id)})
    assert post["likes"] == 0

def test_add_comment_service(mock_db):
    post_id = mock_db.posts.insert_one({
        "title": "Test Post",
        "content": "This is a test post.",
        "user_id": "test_user"
    }).inserted_id
    
    response, status_code = Post.add_comment_service(post_id, "test_user", "This is a test comment.")
    assert status_code == 200
    assert response["message"] == "Comentário adicionado com sucesso!"
    
    post = mock_db.posts.find_one({"_id": ObjectId(post_id)})
    assert len(post["comments"]) == 1
    assert post["comments"][0]["content"] == "This is a test comment."
    assert post["comments"][0]["user_id"] == "test_user"

def test_find_comments_by_post_id_service(mock_db):
    post_id = mock_db.posts.insert_one({
        "title": "Test Post",
        "content": "This is a test post.",
        "user_id": "test_user",
        "comments": [
            {
                "comment_id": ObjectId(),
                "user_id": "test_user",
                "content": "This is a test comment."
            }
        ]
    }).inserted_id
    
    comments = Post.find_comments_by_post_id_service(post_id)
    assert len(comments) == 1
    assert comments[0]["content"] == "This is a test comment."
    assert comments[0]["user_id"] == "test_user"

def test_update_comment_service(mock_db):
    comment_id = ObjectId()
    post_id = mock_db.posts.insert_one({
        "title": "Test Post",
        "content": "This is a test post.",
        "user_id": "test_user",
        "comments": [
            {
                "comment_id": comment_id,
                "user_id": "test_user",
                "content": "This is a test comment."
            }
        ]
    }).inserted_id
    
    response, status_code = Post.update_comment_service(post_id, comment_id, "Updated comment content.")
    assert status_code == 200
    assert response["message"] == "Comentário atualizado com sucesso!"
    
    post = mock_db.posts.find_one({"_id": ObjectId(post_id)})
    assert len(post["comments"]) == 1
    assert post["comments"][0]["content"] == "Updated comment content."

def test_delete_comment_service(mock_db):
    comment_id = ObjectId()
    post_id = mock_db.posts.insert_one({
        "title": "Test Post",
        "content": "This is a test post.",
        "user_id": "test_user",
        "comments": [
            {
                "comment_id": comment_id,
                "user_id": "test_user",
                "content": "This is a test comment."
            }
        ]
    }).inserted_id
    
    response, status_code = Post.delete_comment_service(post_id, comment_id)
    assert status_code == 200
    assert response["message"] == "Comentário removido com sucesso!"
    
    post = mock_db.posts.find_one({"_id": ObjectId(post_id)})
    assert len(post["comments"]) == 0
