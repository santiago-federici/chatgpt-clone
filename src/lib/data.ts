export async function getAllConversations() {
  try {
    const res = await fetch("http://127.0.0.1:8080/conversations");
    const data = await res.json();

    return data;
  } catch (err) {
    console.log("Error al obtener las conversaciones: ", err);
  }
}

export async function getConversation(conversation_id: string) {
  try {
    const res = await fetch(
      `http://127.0.0.1:8080/conversation/${conversation_id}`
    );
    const data = await res.json();

    return data;
  } catch (err) {
    console.log("Error al obtener la conversacion: ", err);
  }
}
