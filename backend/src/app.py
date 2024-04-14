from flask import Flask 
from dotenv import load_dotenv 
from waitress import serve 
from flask_cors import CORS
from flask_jwt_extended import JWTManager
import pymongo
import os

from routes.user_routes import user_bp
from routes.auth_routes import auth_bp

load_dotenv()

MONGODB_URI = os.getenv("MONGODB_URI")
FLASK_ENV = os.getenv("FLASK_ENV")
JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")

try:
    client = pymongo.MongoClient(MONGODB_URI, serverSelectionTimeoutMS=1000)
    client.server_info()
    client.admin.command('ping')
    print("Você se conectou ao Banco de dados!")
    
    db = client.taverna
    
    index_model = pymongo.IndexModel([('email', pymongo.ASCENDING)], unique=True)
    db.usuarios.create_indexes([index_model])
except Exception as e:
    print("Erro ao conectar ao MongoDB:", e)
    raise e

app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = JWT_SECRET_KEY
jwt = JWTManager(app)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

app.register_blueprint(user_bp, url_prefix='/user')
app.register_blueprint(auth_bp, url_prefix='/auth')

if __name__ == "__main__":
    if FLASK_ENV == "production":
        print("Rodando server em produção!")
        serve(app, host='0.0.0.0', port=5000)
    else:
        app.run(debug=True)
