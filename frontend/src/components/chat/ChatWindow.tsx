import React, { useRef } from "react";
import { useCurrentUserProvider } from "../../CurrentUserContext";
import { sendMessage } from "../../apis";
import Draggable from "react-draggable"

const ChatWindow: React.FC = () => {
  const { currentFriendChat } = useCurrentUserProvider();
  const [message, setMessage] = React.useState("");
  const divRef = useRef<HTMLDivElement>(null)

  

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.currentTarget.value);
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>)=>{
    if(e.key === "Enter"){
        setMessage("")
        await sendMessage(currentFriendChat.tag, message)
    }
  }

  return (
    <Draggable nodeRef={divRef} bounds="parent" defaultPosition={{x:16, y: 250}}>
    <div ref={divRef} className="flex flex-col bg-[#2c3336] w-110 h-155  rounded absolute">
      <div className="flex items-center bg-[#1a2022] h-17">
        <img src={`${currentFriendChat?.photo ? currentFriendChat.photo : "/assets/profile-placeholder.png"}`} className="rounded-full w-10 h-10 border ms-2" />
        <h1 className="text-lime-300 ms-2 capitalize">{currentFriendChat.fullName}</h1>
      </div>

      {/* <div ref={messages}></div> */}

      <input
        className="bg-[#1a2022] text-lime-300 mt-auto h-14 outline-none p-2"
        onChange={handleMessageChange}
        onKeyDown={handleKeyDown}
        value={message}
      />
    </div>

     </Draggable>
    
  );
};

export default ChatWindow;
