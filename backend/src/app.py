from flask import Flask 
from dotenv import load_dotenv 
from waitress import serve 
from flask_cors import CORS
import pymongo
import os

from routes.user_routes import user_bp

load_dotenv()

MONGODB_URI = os.getenv("MONGODB_URI")
FLASK_ENV = os.getenv("FLASK_ENV")

# Conectar-se ao banco de dados
try:
    client = pymongo.MongoClient(MONGODB_URI, serverSelectionTimeoutMS=1000)
    client.server_info()
    client.admin.command('ping')
    print("Você se conectou ao Banco de dados!")

    # Selecionar o banco de dados
    db = client.taverna

    # Definir índice único para o campo de e-mail
    index_model = pymongo.IndexModel([('email', pymongo.ASCENDING)], unique=True)
    db.usuarios.create_indexes([index_model])
except Exception as e:
    print("Erro ao conectar ao MongoDB:", e)
    raise e

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

# Blueprints
app.register_blueprint(user_bp, url_prefix='/user')

if __name__ == "__main__":
    if FLASK_ENV == "production":
        print("Rodando server em produção!")
        serve(app, host='0.0.0.0', port=5000)
    else:
        app.run(debug=True)
