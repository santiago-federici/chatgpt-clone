"use client";

import { useState } from "react";

import { PlusIcon } from "../icons/plus";
import { DotsIcon } from "../icons/dots";

interface Conversation {
  id: number;
  name: string;
}

export default function Sidebar() {
  const [conversations, setConversations] = useState<Conversation[]>([]);

  const handleCreateConversation = () => {
    setConversations([
      ...conversations,
      { id: conversations.length + 1, name: "Nueva conversación" },
    ]);
  };

  return (
    <aside className="h-screen w-64 bg-background py-10 px-4 space-y-20">
      <button
        className="flex items-center gap-1 hover:bg-muted p-3 rounded-md w-full text-sm duration-200"
        onClick={handleCreateConversation}
      >
        <PlusIcon className="size-4" />
        Nueva conversación
      </button>
      <span className="w-full h-px bg-neutral-800 flex"></span>

      <section className="space-y-4">
        <p className="text-sm text-muted-foreground">Conversaciones</p>

        <ul className="flex flex-col gap-2">
          {conversations &&
            conversations.length > 0 &&
            conversations.map((conversation) => (
              <a
                href={`/conversations/${conversation.id}`}
                className="group flex items-center justify-between gap-1 hover:bg-muted p-2 text-sm rounded-md w-full cursor-pointer duration-200"
              >
                {conversation.name}
                <DotsIcon className="hidden group-hover:flex text-muted-foreground size-4 hover:text-white duration-200" />
              </a>
            ))}
        </ul>
      </section>
    </aside>
  );
}
