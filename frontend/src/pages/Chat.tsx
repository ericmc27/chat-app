import React from "react";
import { uploadNewUserPhoto } from "../apis";
import settings from "../assets/icons8-settings.png";
import addContact from "../assets/icons8-add-contact.png";
import stories from "../assets/icons8-chat-stories.png";
import chatBrand from "../assets/icons8-chat-brand.png";

const users = [
  { fullName: "John Doe" },
  { fullName: "Jane Smith" },
  { fullName: "Sam Brown" },
  { fullName: "Emily Johnson" },
  { fullName: "Michael Davis" },
  { fullName: "Sarah Wilson" },
  { fullName: "David Clark" },
  { fullName: "Laura Martinez" },
  { fullName: "James Lee" },
  { fullName: "Megan Taylor" },
  { fullName: "Chris Anderson" },
  { fullName: "Lisa Thomas" },
  { fullName: "Kevin Moore" },
  { fullName: "Rebecca Harris" },
  { fullName: "Daniel Lewis" },
];

const Chat: React.FC = () => {
  const currentUserPhoto = localStorage.getItem("currentUserPhoto");
  const [selection, setSelection] = React.useState<string>("");

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files[0]) {
      uploadNewUserPhoto(files[0]);
    }
  };

  return (
    <div className="flex h-screen">
      {/**Container */}

      <div className="bg-[#1a2122] h-full w-69 rounded text-white">
        {/**Left layout */}
        {/* #1a2122 */}
        <label htmlFor="photo-upload">
          <img
            src={
              currentUserPhoto === "null"
                ? "/assets/profile-placeholder.png"
                : `/assets/${currentUserPhoto}`
            }
            className="rounded-full h-24 w-24 mx-auto mt-5 border border-lime-500 hover:cursor-pointer"
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
          <div className="flex flex-col items-center gap-2">
            <img
              className="h-10 w-10 hover:cursor-pointer"
              src={stories}
              onClick={() => setSelection("friendsStories")}
            />
          </div>

          <div className="flex flex-col items-center gap-2">
            <img
              className="h-10 w-10 hover:cursor-pointer"
              src={addContact}
              onClick={() => setSelection("addContact")}
            />
          </div>

          <div className="flex flex-col items-center gap-2">
            <img
              className="h-10 w-10 hover:cursor-pointer"
              src={settings}
              onClick={() => setSelection("settings")}
            />
          </div>
        
        </div>

        <div className="text-lime-300 mt-3 text-center">@ericast</div>

        <div className="mt-5 h-132 overflow-auto scrollbar">
          {users.map((user, index) => {
            return (
              <>
                <div className="flex mb-2.5 items-center gap-2">
                  <img
                    className="ms-4 h-10 w-10 rounded-full"
                    src={`/assets/${currentUserPhoto}`}
                  />
                  {user.fullName}
                </div>
                <div className="border border-[#576467] mb-2 w-41 mx-auto"></div>
              </>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col items-center mx-auto text-white  w-full">
        {/**Middle layout */}

        {selection === "friendsStories" ? (
          <input
            type="text"
            className="bg-[#232b2c] rounded h-14 w-100 mt-7 mx-auto"
          />
        ) : selection === "addContact" ? (
          <div className="mx-auto my-auto mt-20">
            <label className="text-4xl text-white">Add a contact</label>
          </div>
        ) : selection === "settings" ? (
          <div>settings</div>
        ) : (
          <div className="flex items-center my-auto">
            <div className="flex flex-col">
              <label className="text-6xl ms-7">Chatty</label>
              <label className="mt-2 flex">
                One click away from your friends
              </label>
            </div>
            <img className="h-10 w-10" src={chatBrand} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
