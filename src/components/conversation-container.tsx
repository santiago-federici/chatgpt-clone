"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

import io from "socket.io-client";

import { getConversation } from "@/lib/data";

interface Message {
  content: string;
  role: string;
}

const socket = io("http://127.0.0.1:8080");

export default function ConversationContainer({
  conversationId,
}: {
  conversationId: string;
}) {
  const [messages, setMessages] = useState<Message[]>();

  useEffect(() => {
    const findMessages = async () => {
      const conversation = await getConversation(conversationId);
      setMessages(conversation.messages);
    };
    findMessages();

    // Join the WebSocket room for the specific conversation
    socket.emit("join", { room: conversationId });

    // Listen for new messages from WebSocket
    socket.on("newMessage", (newMessage: Message) => {
      setMessages((prevMessages) => [...prevMessages!, newMessage]);
    });

    return () => {
      socket.off("newMessage"); // Clean up the listener when component unmounts
    };
  }, [conversationId]);

  return (
    <div className="w-[50%] mx-auto py-8 h-[calc(100vh_-_8rem)] flex flex-col gap-16 overflow-y-auto pr-6">
      {messages?.map((message, index) => (
        <div
          key={index}
          className={cn({
            "bg-muted max-w-screen-sm self-end p-3 rounded-md":
              message.role === "user",
          })}
        >
          <p className="text-sm text-muted-foreground">{message.content}</p>
        </div>
      ))}
    </div>
  );
}
