from flask import jsonify, request
from src.models.user_model import User
from ..app import client

def cadastrar_usuario():
    data = request.json
    
    if not all(key in data for key in ('name', 'birthdate', 'gender')):
        return jsonify({'message': 'Campos obrigatórios ausentes'}), 400
    
    novo_usuario = User(
        name=data['name'],
        birthdate=data['birthdate'],
        gender=data['gender']
    )
    
    client.db.usuarios.insert_one({
        'name': novo_usuario.name,
        'birthdate': novo_usuario.birthdate,
        'gender': novo_usuario.gender
    })
    
    return jsonify({'message': 'Usuário cadastrado com sucesso!'}), 201
