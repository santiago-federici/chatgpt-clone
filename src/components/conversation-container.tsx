"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

interface Message {
  text: string;
  isUser: boolean;
}

const messagesArray = [
  {
    text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod, voluptas. Dolorem suscipit fugit nulla voluptatibus, et sunt consectetur eius consequatur dicta! Quas officia sequi repellendus maxime odit harum iste id?Veniam autem odit laudantium in veritatis ea molestiae, consequuntur perspiciatis, rerum dolorem atque optio rem facilis cum iste voluptatem reiciendis sit vel. Quo, ullam. Tempore debitis eaque exercitationem sed porro.Similique, debitis. Sunt, magnam nobis saepe aspernatur quo fugit modi odit ea quae ipsum impedit aperiam asperiores deserunt nemo aliquam voluptates ab delectus repudiandae molestiae veritatis. Illo maxime commodi hic?Facere quis commodi quas quisquam doloremque et, nisi blanditiis earum expedita quaerat minima quia cumque eum sunt voluptatem aliquid beatae soluta harum qui quae, in, asperiores rem iste quod! Quibusdam.Sapiente, adipisci aliquid! Laboriosam temporibus provident ipsum fugiat. Error asperiores aliquam aut, enim voluptatibus consectetur dolorem, excepturi odit ipsam pariatur ratione sapiente facilis est, dolore optio laboriosam saepe quas quaerat?Nisi tenetur unde provident exercitationem inventore tempore reiciendis, repellendus, maiores nobis, qui excepturi minima sed fuga incidunt. Modi quidem quisquam possimus, id corporis deserunt eius quibusdam quod molestias quos repellat!Repellendus quisquam dolor molestiae molestias, repudiandae minus eligendi aspernatur fugiat fugit hic cupiditate iste adipisci iure sequi expedita placeat quod a ipsam in vitae quae laboriosam. Perspiciatis expedita libero voluptatum.Nostrum ab quis accusantium omnis dolor, eius voluptatibus veritatis fuga rerum magni reiciendis enim ratione vitae porro, vel provident veniam voluptas sunt necessitatibus ipsum alias? Aut eaque quaerat atque ab!Quidem, laborum esse. Modi aperiam vitae nesciunt amet dolorem! Voluptas nesciunt minima earum assumenda odit ratione necessitatibus cumque omnis ullam, quos quo sint suscipit nam. Reprehenderit atque illo architecto nobis.Dolorem facere eos iusto, adipisci soluta cupiditate repellat consequuntur voluptas! Quaerat error aperiam fugiat odio quis ab beatae praesentium, repellendus delectus aliquid, quae suscipit nostrum cum eius? Fugiat, ipsa. Ipsam!",
    isUser: true,
  },
  { text: "Estoy bien, gracias", isUser: false },
  { text: "¿Qué tal?", isUser: true },
  {
    text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod, voluptas. Dolorem suscipit fugit nulla voluptatibus, et sunt consectetur eius consequatur dicta! Quas officia sequi repellendus maxime odit harum iste id?Veniam autem odit laudantium in veritatis ea molestiae, consequuntur perspiciatis, rerum dolorem atque optio rem facilis cum iste voluptatem reiciendis sit vel. Quo, ullam. Tempore debitis eaque exercitationem sed porro.Similique, debitis. Sunt, magnam nobis saepe aspernatur quo fugit modi odit ea quae ipsum impedit aperiam asperiores deserunt nemo aliquam voluptates ab delectus repudiandae molestiae veritatis. Illo maxime commodi hic?Facere quis commodi quas quisquam doloremque et, nisi blanditiis earum expedita quaerat minima quia cumque eum sunt voluptatem aliquid beatae soluta harum qui quae, in, asperiores rem iste quod! Quibusdam.Sapiente, adipisci aliquid! Laboriosam temporibus provident ipsum fugiat. Error asperiores aliquam aut, enim voluptatibus consectetur dolorem, excepturi odit ipsam pariatur ratione sapiente facilis est, dolore optio laboriosam saepe quas quaerat?Nisi tenetur unde provident exercitationem inventore tempore reiciendis, repellendus, maiores nobis, qui excepturi minima sed fuga incidunt. Modi quidem quisquam possimus, id corporis deserunt eius quibusdam quod molestias quos repellat!Repellendus quisquam dolor molestiae molestias, repudiandae minus eligendi aspernatur fugiat fugit hic cupiditate iste adipisci iure sequi expedita placeat quod a ipsam in vitae quae laboriosam. Perspiciatis expedita libero voluptatum.Nostrum ab quis accusantium omnis dolor, eius voluptatibus veritatis fuga rerum magni reiciendis enim ratione vitae porro, vel provident veniam voluptas sunt necessitatibus ipsum alias? Aut eaque quaerat atque ab!Quidem, laborum esse. Modi aperiam vitae nesciunt amet dolorem! Voluptas nesciunt minima earum assumenda odit ratione necessitatibus cumque omnis ullam, quos quo sint suscipit nam. Reprehenderit atque illo architecto nobis.Dolorem facere eos iusto, adipisci soluta cupiditate repellat consequuntur voluptas! Quaerat error aperiam fugiat odio quis ab beatae praesentium, repellendus delectus aliquid, quae suscipit nostrum cum eius? Fugiat, ipsa. Ipsam!",
    isUser: false,
  },
];

export default function ConversationContainer() {
  const [messages, setMessages] = useState<Message[]>(
    messagesArray ? messagesArray : []
  );

  return (
    <section className="w-full h-full">
      <div className="w-[50%] mx-auto py-8 h-full flex flex-col gap-16">
        {messages.map((message, index) => (
          <div
            key={index}
            className={cn({
              "bg-muted max-w-screen-sm self-end p-3 rounded-md":
                message.isUser,
            })}
          >
            <p className="text-sm text-muted-foreground">{message.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
