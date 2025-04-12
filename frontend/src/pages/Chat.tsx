import {
  React,
  queryClient,
  CachedUserData,
  io,
  LeftSideBar,
  MiddleContent,
  RightSideBar,
} from "../imports";

export const socket = io("http://localhost:3001", { withCredentials: true });

const Chat: React.FC = () => {
  React.useEffect(() => {
    socket.on("userNewPhotoAdded", (data) => {
      queryClient.setQueryData<CachedUserData>(
        ["currentUserData"],
        (oldData) => {
          if (oldData && oldData.tag === data.tag) {
            return {
              ...oldData,
              photo: data.newFileName,
            };
          }
          return oldData;
        }
      );
    });

    socket.on("addNewContact", (data) => {
      queryClient.setQueryData<CachedUserData>(
        ["currentUserData"],
        (oldData) => {
          if (!oldData) {
            return oldData;
          }

          const newPendingRequest = [...oldData.pendingRequests, data];

          return {
            ...oldData,
            pendingRequests: newPendingRequest,
          };
        }
      );
    });

    socket.on("newFriendAdded", (data) => {
      queryClient.setQueryData<CachedUserData>(
        ["currentUserData"],
        (oldData) => {
          console.log(data);
          if (!oldData) {
            return oldData;
          }

          const newContact = [...oldData.friends, data];

          return {
            ...oldData,
            friends: newContact,
          };
        }
      );
    });

    socket.on("sendNewMessage", (data)=>{
      console.log(data)
    })
    
    return () => {
      socket.off();
    };
  }, []);

  return (
    <div className="flex justify-between h-screen">
      <LeftSideBar />
      <MiddleContent />
      <RightSideBar />
    </div>
  );
};

export default Chat;
