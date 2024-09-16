export async function sendMessage(conversation_id: string, prompt: string) {
  try {
    await fetch(`http://127.0.0.1:8080/prompt/${conversation_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });
  } catch (err) {
    console.log("Error al enviar el mensaje: ", err);
  }
}

export async function createConversation() {
  try {
    await fetch("http://127.0.0.1:8080/start_conversation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.log("Error al crear la conversacion: ", err);
  }
}
