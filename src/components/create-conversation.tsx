import { PlusIcon } from "../icons/plus";

export default function CreateConversation({
  className,
}: {
  className?: string;
}) {
  const handleCreateConversation = () => {
    // TODO: communicate with the backend and call an endpoint to create a new conversation
    console.log("conversation created");
  };

  return (
    <button
      className={`flex items-center gap-1 hover:bg-muted p-3 rounded-md w-full text-sm duration-200 ${className}`}
      onClick={handleCreateConversation}
    >
      <PlusIcon className="size-4" />
      Nueva conversación
    </button>
  );
}
