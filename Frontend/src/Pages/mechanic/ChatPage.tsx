import { FC } from "react";
import Header from "../../Components/Mechanic/Heder"; // Corrected the import path
import ChatInterface from "../../Components/Mechanic/ChatInterface";

const ChatPage: FC = () => {
  return (
    <>
      <Header />
      <ChatInterface />
    </>
  );
};

export default ChatPage;

