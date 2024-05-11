import pymongo
from dotenv import load_dotenv
import os

load_dotenv()

MONGODB_URI = os.getenv("MONGODB_URI")

try:
    client = pymongo.MongoClient(MONGODB_URI, serverSelectionTimeoutMS=1000)
    client.server_info()
    client.admin.command('ping')
    print("Conexão bem sucedida com o MongoDB!")

    db = client.taverna

    index_model = pymongo.IndexModel([('email', pymongo.ASCENDING)], unique=True)
    db.usuarios.create_indexes([index_model])
except Exception as e:
    print("Erro ao conectar ao MongoDB:", e)
    raise e