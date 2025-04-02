import React from "react";
import {
  queryClient,
  CachedUserData,
  useQuery,
  getCurrentUserData,
  uploadNewUserPhoto,
  io,
  settings,
  addContact,
  stories,
  notificacions,
  FriendsStories,
  AddContact,
  Brand,
  Settings,
} from "../imports";

const socket = io("http://localhost:3001", { withCredentials: true });

const Chat: React.FC = () => {
  const { data: currentUserData } = useQuery({
    queryKey: ["currentUserData"],
    queryFn: getCurrentUserData,
  });

  const [selection, setSelection] = React.useState<string>("");

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files[0]) {
      uploadNewUserPhoto(files[0]);
    }
  };

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

    return () => {
      socket.off("userNewPhotoAdded");
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
          {/**Users list */}
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

      <div className="bg-[#1a2122] h-screen w-52 rounded text-white flex flex-col items-center">
        {/**Right layout */}
        <img className="h-10 w-10 mt-3" src={notificacions} />
      </div>
    </div>
  );
};

export default Chat;
