import { useLoaderData } from "react-router-dom";
import {
    React,
    queryClient,
    useQuery,
    getCurrentUserData,
    uploadNewUserPhoto,
    addNewContact,
    io,
    FriendsStories,
    AddContact,
    Brand,
    Settings,
    settings,
    addContact,
    stories,
    userNotifications,
    CachedUserData
} from "../imports";


// import addUser from "../assets/friend-request.png";

const socket = io("http://localhost:3001", { withCredentials: true });

const Chat: React.FC = () => {
  const { data: currentUserData } = useQuery<CachedUserData>({
    queryKey: ["currentUserData"],
    queryFn: getCurrentUserData,
    initialData: useLoaderData(),
    enabled: false
  });

  const [selection, setSelection] = React.useState<string>("");

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files[0]) {
      uploadNewUserPhoto(files[0]);
    }
  };

  const acceptFriendRequest = async (tag: string)=>{
    await addNewContact(tag)
    queryClient.setQueryData<CachedUserData>(["currentUserData"], (oldData)=>{
      if (!oldData){return oldData}

      const updatePendingRequests = oldData.pendingRequests.filter((obj)=>(obj.tag !== tag))

      return {
        ...oldData,
        pendingRequests: updatePendingRequests
      }
    })
  }

  const declineFriendRequest = async ()=>{
    console.log("decline friendship")
  }

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
      queryClient.setQueryData<CachedUserData>(["currentUserData"], (oldData)=>{
        if(!oldData){return oldData}

        const newPendingRequest = [...oldData.pendingRequests, data]

        return {
          ...oldData,
          pendingRequests: newPendingRequest
        }
      })
    });

    socket.on("newFriendAdded", (data)=>{
      queryClient.setQueryData<CachedUserData>(["currentUserData"], (oldData)=>{
        console.log(data)
        if (!oldData){return oldData}

        const newContact = [...oldData.friends, data]

        return {
          ...oldData,
          friends: newContact
        }
      })
    })

    return () => {
      socket.off();
    };
  }, []);

  return (
    <div className="flex h-screen">
      {/**Container */}

      <div className="bg-[#1a2122] h-screen w-52 text-white flex flex-col">
        {/**Left layout */}
        <label htmlFor="photo-upload">
          <img
            src={
              currentUserData?.photo
                ? `/assets/${currentUserData.photo}`
                : "/assets/profile-placeholder.png"
            }
            className="rounded-full not-sm:h-19 not-sm:w-19 h-24 w-24 mx-auto mt-5 border border-lime-500 hover:cursor-pointer"
            alt="user photo"
          />
        </label>

        <input
          id="photo-upload"
          type="file"
          className="hidden"
          onChange={handlePhotoChange}
        />

        <div className="flex justify-center mt-4 gap-2">
          <img
            className="not-sm:h-8 not-sm:w-8 h-10 w-10 hover:cursor-pointer"
            src={stories}
            onClick={() => setSelection("friendsStories")}
          />

          <img
            className="not-sm:h-8 not-sm:w-8 h-10 w-10 hover:cursor-pointer"
            src={addContact}
            onClick={() => setSelection("addContact")}
          />

          <img
            className="not-sm:h-8 not-sm:w-8 h-10 w-10 hover:cursor-pointer"
            src={settings}
            onClick={() => setSelection("settings")}
          />
        </div>

        <div className="text-lime-300 mt-3 text-center">
          {currentUserData?.tag}
        </div>

        <div className="mt-4 flex-1 overflow-auto scrollbar">
          {currentUserData?.friends.map((friend, index)=>{
            return <div>{friend.fullName}</div>
          })}
        </div>
      </div>

      <div className="flex flex-col items-center mx-auto text-white">
        {/* Middle layout  */}

        {selection === "friendsStories" ? (
          <FriendsStories />
        ) : selection === "addContact" ? (
          <div className="flex flex-col mx-auto my-auto mt-7">
            <AddContact />
          </div>
        ) : selection === "settings" ? (
          <Settings />
        ) : (
          <div className="flex items-center my-auto">
            <Brand />
          </div>
        )}
      </div>

      <div className="bg-[#1a2122] h-screen w-65 rounded text-white flex flex-col items-center">
        {/**Right layout */}
        <img className="h-10 w-10 mt-3" src={userNotifications} />

        <div className="flex-1 overflow-auto scrollbar w-full mt-5">
          {currentUserData?.pendingRequests.map((pendingRequest, index) => {
            return (
              <div
                className={` bg-[#2a3234] w-50 flex animate-fade-in p-3 ms-7 rounded ${
                  index !== 0 && "mt-3"
                } ${index === currentUserData.pendingRequests.length - 1 && "mb-3"}`}
              >
                <img
                  src={`${pendingRequest?.photo ? `/assets/${pendingRequest.photo}` : "/assets/profile-placeholder.png"}`}
                  className="h-10 w-10 rounded-full"
                />
                <div className="flex flex-col">
                  <h2 className="text-white capitalize">
                    {pendingRequest.fullName}
                  </h2>
                  <button className="border" type="button" onClick={()=>(acceptFriendRequest(pendingRequest.tag))}>accept</button>
                  <button className="border" type="button" onClick={declineFriendRequest}>decline</button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default Chat;
