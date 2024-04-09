from flask import jsonify, request
from models.user_model import User
from app import db
import bcrypt
from pymongo.errors import DuplicateKeyError

def cadastrar_usuario():
    data = request.json
    
    if not all(key in data for key in ('name', 'birthdate', 'email', 'password')):
        return jsonify({'message': 'Campos obrigatórios ausentes'}), 400
    
    gender = data.get('gender')
    password = data['password']
    hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt(10))
    
    novo_usuario = User(
        name=data['name'],
        birthdate=data['birthdate'],
        email=data['email'],
        password=hashed,
        gender=gender
    )
    
    try:
        db.usuarios.insert_one({
            'name': novo_usuario.name,
            'birthdate': novo_usuario.birthdate,
            'email': novo_usuario.email,
            'password': novo_usuario.password,
            'gender': novo_usuario.gender
        })
        return jsonify({'message': 'Usuário cadastrado com sucesso!'}), 201
    except DuplicateKeyError:
        return jsonify({'message': 'E-mail já cadastrado'}), 400
