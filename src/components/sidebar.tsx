import { DotsIcon } from "../icons/dots";
import { getConversations } from "../lib/data";
import CreateConversation from "./create-conversation";

export default function Sidebar() {
  const conversations = getConversations();

  const handleDotsClick = () => {
    console.log("dots clicked");
  };

  return (
    <aside className="h-screen w-64 bg-background py-10 px-4 space-y-20">
      <CreateConversation />

      <span className="w-full h-px bg-neutral-800 flex"></span>

      <section className="space-y-4">
        <p className="text-sm text-muted-foreground">Conversaciones</p>

        <ul className="flex flex-col gap-2">
          {conversations &&
            conversations.length > 0 &&
            conversations.map((conversation) => (
              <li className="group flex items-center justify-between gap-1 hover:bg-muted p-2 text-sm rounded-md w-full cursor-pointer duration-200">
                <a
                  href={`/conversations/${conversation.id}`}
                  className="w-full"
                >
                  {conversation.name}
                </a>
                <span onClick={handleDotsClick}>
                  <DotsIcon className="hidden group-hover:flex text-muted-foreground size-4 hover:text-white duration-200" />
                </span>
              </li>
            ))}
        </ul>
      </section>
    </aside>
  );
}
