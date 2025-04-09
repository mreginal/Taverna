import eventlet
eventlet.monkey_patch()

from flask import Flask
from dotenv import load_dotenv
from waitress import serve 
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from firebase_admin import credentials
from socketio_instance import init_socketio, socketio
import base64
import json
import firebase_admin
import os

from routes.user_routes import user_bp
from routes.auth_routes import auth_bp
from routes.post_routes import post_bp
from routes.notification_routes import notification_bp

load_dotenv()

FLASK_ENV = os.getenv("FLASK_ENV")
JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")
FIREBASE_CREDENTIALS = os.getenv("FIREBASE_CREDENTIALS")

app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = JWT_SECRET_KEY
jwt = JWTManager(app)
cors = CORS(app, resources={r"/*": {"origins": "*"}})
firebase_json = base64.b64decode(FIREBASE_CREDENTIALS).decode()
cred_dict = json.loads(firebase_json)
cred = credentials.Certificate(cred_dict)

firebase_admin.initialize_app(cred, {
    'storageBucket': 'taverna-c88f7.appspot.com'
})

init_socketio(app)

app.register_blueprint(user_bp, url_prefix='/user')
app.register_blueprint(auth_bp, url_prefix='/auth')
app.register_blueprint(post_bp, url_prefix='/post')
app.register_blueprint(notification_bp, url_prefix='/notification')

@socketio.on('join_room')
def handle_join_room(data):
    user_id = data['user_id']
    socketio.join_room(user_id)

if __name__ == "__main__":
    if FLASK_ENV == "production":
        print("Simulando produção localmente...")
        socketio.run(app, host="0.0.0.0", port=5000)
    else:
        print("Rodando em Desenvolvimento!")
        socketio.run(app, debug=True)
