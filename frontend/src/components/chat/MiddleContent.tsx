import {
  React,
  useCurrentUserProvider,
  FriendsStories,
  AddNewContact,
  Settings,
  ChatWindow,
  Brand,
} from "../../imports";

const MiddleContent: React.FC = () => {
  const { selection } = useCurrentUserProvider();
  
  return (
    <div className="flex w-full h-screen">

      <div className="flex flex-col w-full h-full text-white relative">
        {selection === "friendsStories" ? (
          <FriendsStories />
        ) : selection === "addContact" ? (
          <AddNewContact />
        ) : selection === "settings" ? (
          <Settings />
        ) : selection === "chatWindow" ? (
          <ChatWindow/> 
        ) : (
         <Brand />
        )}
      </div>

    </div>
  );
};

export default MiddleContent;
