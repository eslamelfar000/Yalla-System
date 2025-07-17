import { Icon } from "@iconify/react";

const EmptyMessage = ({ type = "messages" }) => {
  const getContent = () => {
    switch (type) {
      case "chats":
        return {
          icon: "gala:chat",
          title: "No chats yet",
          subtitle: "Start a conversation with your teachers or classmates",
        };
      case "messages":
      default:
        return {
          icon: "typcn:messages",
          title: "No messages",
          subtitle: "Don't worry, just take a deep breath & say 'Hello'",
        };
    }
  };

  const content = getContent();

  return (
    <div className="h-full flex flex-col justify-center">
      <div className="text-center flex flex-col justify-center items-center opacity-50">
        <div className="mt-4 text-md font-medium text-default-500">
          No chats available
        </div>
      </div>
    </div>
  );
};

export default EmptyMessage;
