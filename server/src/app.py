from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_socketio import SocketIO, emit, join_room
from utils import request_chatBot
import json
import os
import uuid

app = Flask(__name__)
CORS(app)  # Permite solicitudes desde otros dominios (configurado para aceptar todas las solicitudes)

# Setup Flask-SocketIO
socketio = SocketIO(app, cors_allowed_origins="*")  # Configura SocketIO con soporte para todos los orígenes CORS

CONVERSATIONS_FILE = "conversations.json"  # Nombre del archivo donde se almacenan las conversaciones

# Función para leer el archivo de conversaciones
def load_conversations():
    if os.path.exists(CONVERSATIONS_FILE):  # Verifica si el archivo existe
        with open(CONVERSATIONS_FILE, "r") as f:
            return json.load(f)  # Carga las conversaciones desde el archivo
    return []  # Retorna una lista vacía si el archivo no existe

# Función para guardar el archivo de conversaciones
def save_conversations(conversations):
    with open(CONVERSATIONS_FILE, "w") as f:
        json.dump(conversations, f, indent=4)  # Guarda las conversaciones en el archivo con formato JSON

@app.route("/start_conversation", methods=['POST'])
def start_conversation():
    conversation_id = str(uuid.uuid4())  # Genera un ID único para la nueva conversación
    conversations = load_conversations()  # Carga las conversaciones actuales
    conversations.append({"id": conversation_id, "messages": []})  # Agrega una nueva conversación vacía
    save_conversations(conversations)  # Guarda las conversaciones actualizadas

    return jsonify({"conversation_id": conversation_id})  # Retorna el ID de la nueva conversación

@app.route("/prompt/<conversation_id>", methods=['POST'])
def handle_prompt(conversation_id):
    try:
        data = request.json
        if not data or 'prompt' not in data:
            return jsonify({"error": "El campo 'prompt' es requerido."}), 400  # Retorna error si el prompt no está presente

        prompt = data.get('prompt')  # Obtiene el prompt del cuerpo de la solicitud
        response = request_chatBot(prompt)  # Obtiene la respuesta del chatbot
        content = response.choices[0].message.content  # Extrae el contenido de la respuesta

        conversations = load_conversations()  # Carga las conversaciones actuales
        conversation = next((conv for conv in conversations if conv["id"] == conversation_id), None)  # Busca la conversación por ID
        if conversation is None:
            return jsonify({"error": "Conversación no encontrada."}), 404  # Retorna error si la conversación no se encuentra

        user_message = {"role": "user", "content": prompt}  # Crea un mensaje del usuario
        assistant_message = {"role": "assistant", "content": content}  # Crea un mensaje del asistente

        conversation["messages"].append(user_message)  # Agrega el mensaje del usuario a la conversación
        conversation["messages"].append(assistant_message)  # Agrega el mensaje del asistente a la conversación
        save_conversations(conversations)  # Guarda las conversaciones actualizadas

        # Emitir el mensaje al WebSocket para los clientes en la sala correspondiente
        socketio.emit("newMessage", user_message, room=conversation_id)
        socketio.emit("newMessage", assistant_message, room=conversation_id)

        return jsonify({"response": content})  # Retorna la respuesta del asistente

    except Exception as e:
        return jsonify({"error": "Ocurrió un error inesperado.", "message": str(e)}), 500  # Retorna error en caso de excepción

@app.route("/conversation/<conversation_id>", methods=['GET'])
def get_conversation(conversation_id):
    conversations = load_conversations()  # Carga las conversaciones actuales
    conversation = next((conv for conv in conversations if conv["id"] == conversation_id), None)  # Busca la conversación por ID
    if conversation is None:
        return jsonify({"error": "Conversación no encontrada."}), 404  # Retorna error si la conversación no se encuentra

    return jsonify(conversation)  # Retorna la conversación solicitada

@app.route("/conversations", methods=['GET'])
def get_all_conversations():
    conversations = load_conversations()  # Carga las conversaciones actuales
    return jsonify(conversations)  # Retorna todas las conversaciones

# WebSocket event for joining a room
@socketio.on('join')
def handle_join(data):
    room = data['room']  # Obtiene el nombre de la sala del mensaje recibido
    join_room(room)  # El cliente se une a la sala especificada
    print(f"Client joined room: {room}")  # Imprime en consola cuando un cliente se une a una sala

if __name__ == "__main__":
    socketio.run(app, debug=True)  # Ejecuta la aplicación Flask con soporte para WebSocket
