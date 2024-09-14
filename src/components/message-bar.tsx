"use client";

import { useState } from "react";

import { SendIcon } from "@/icons/send";

export default function MessageBar() {
  const [input, setInput] = useState("");

  const handleSendMessage = () => {
    console.log("click");
  };

  return (
    <section className="bg-muted w-[50%] mx-auto my-8 px-8 py-3.5 rounded-full flex items-center justify-between">
      <input
        type="text"
        placeholder="Escribe tu mensaje..."
        className="bg-transparent w-full focus:outline-none"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <span onClick={handleSendMessage}>
        <SendIcon className="text-muted-foreground cursor-pointer hover:text-white duration-200" />
      </span>
    </section>
  );
}
