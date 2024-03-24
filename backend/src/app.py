from flask import Flask, Response
from dotenv import load_dotenv
import pymongo
import os

from routes.user_routes import user_bp

load_dotenv()

MONGODB_URI = os.getenv("MONGODB_URI")

app = Flask(__name__)

try:
    # Conecte-se ao MongoDB
    client = pymongo.MongoClient(MONGODB_URI, serverSelectionTimeoutMS=1000)
    client.server_info()
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")

    # Selecione o banco de dados
    db = client.taverna
except Exception as e:
    # Lidar com erros de conexão
    print(e)

#Blueprints
app.register_blueprint(user_bp, url_prefix='/user')

if __name__ == "__main__":
    app.run(debug=True)
