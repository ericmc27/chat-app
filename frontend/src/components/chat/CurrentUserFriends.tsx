import { useCurrentUserProvider } from "../../CurrentUserContext";
import { CachedUserObjects } from "../../interfaces";

const CurrentUserFriends = () => {
  const { currentUserData, setSelection, setCurrentFriendChat } = useCurrentUserProvider();

  const handleCurrentFriendChat = (friend: CachedUserObjects)=>{
    setSelection("chatWindow")
    setCurrentFriendChat(friend)
  }

  return (
    <div>
      {currentUserData?.friends.map((friend, index) => {
        return (
          <div
            key={index}
            className="bg-[#2a3234] flex h-14 w-60 pt-2 m-auto rounded"
            onClick={() => handleCurrentFriendChat(friend)}
          >
            <img
              className="rounded-full h-10 w-10 ms-2 me-1"
              src={`${
                friend?.photo
                  ? `/assets/${friend.photo}`
                  : "/assets/profile-placeholder.png"
              }`}
            />
            <h1 className="capitalize text-lime-300 mt-1">{friend.fullName}</h1>
          </div>
        );
      })}
    </div>
  );
};

export default CurrentUserFriends