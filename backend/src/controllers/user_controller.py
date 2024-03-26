from flask import jsonify, request
from models.user_model import User
from app import client
import bcrypt

def cadastrar_usuario():
    data = request.json
    
    if not all(key in data for key in ('name', 'birthdate', 'email', 'password', 'confirmpassword', 'gender')):
        return jsonify({'message': 'Campos obrigatórios ausentes'}), 400
    
    if data['confirmpassword'] != data['password']:
        return jsonify({'message': 'A confirmação da senha está incorreta'}), 400
    
    password = data['password']
    hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    
    novo_usuario = User(
        name=data['name'],
        birthdate=data['birthdate'],
        email=data['email'],
        password=hashed,
        gender=data['gender']
    )
    
    client.taverna.usuarios.insert_one({
        'name': novo_usuario.name,
        'birthdate': novo_usuario.birthdate,
        'email': novo_usuario.email,
        'password': novo_usuario.password,
        'gender': novo_usuario.gender
    })
    
    return jsonify({'message': 'Usuário cadastrado com sucesso!'}), 201
