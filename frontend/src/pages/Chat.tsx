import React from "react";
import { uploadNewUserPhoto } from "../apis";
import messages from "../assets/icons8-message-48.png";
import addContact from "../assets/icons8-add-contact-48.png";
import friendsStories from "../assets/icons8-stories-48.png";

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
  const [selection, setSelection] = React.useState<string>("messages");

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files[0]) {
      uploadNewUserPhoto(files[0]);
    }
  };

  return (
    <div className="flex items-center min-h-screen">{/**Container */}

      <div className="bg-[#1a2122] w-60 rounded">{/**Left layout*/}
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
              src={messages}
              onClick={() => setSelection("messages")}
            />
            <div
              className={`rounded-full h-3 w-3 border border-lime-50 ${
                selection === "messages" && "bg-lime-500"
              }`}
            ></div>
          </div>

          <div className="flex flex-col items-center gap-2">
            <img
              className="h-10 w-10 hover:cursor-pointer"
              src={addContact}
              onClick={() => setSelection("addContact")}
            />
            <div
              className={`rounded-full h-3 w-3 border border-lime-50 ms-3 ${
                selection === "addContact" && "bg-lime-500"
              }`}
            ></div>
          </div>

          <div className="flex flex-col items-center gap-2">
            <img
              className="h-10 w-10 hover:cursor-pointer"
              src={friendsStories}
              onClick={() => setSelection("friendsStories")}
            />
            <div
              className={`rounded-full h-3 w-3 border-lime-50 border ${
                selection === "friendsStories" && "bg-lime-500"
              }`}
            ></div>
          </div>
        </div>

        <div className="mt-5 h-132 overflow-auto scrollbar">
          {
            users.map((user, index)=>{
              return(
                <>
                <div className="flex mb-2.5 items-center gap-2 text-white">
                  <img className="ms-4 h-10 w-10 rounded-full" src={`/assets/${currentUserPhoto}`}/>
                  {user.fullName}
                </div>
                <div className="border border-[#576467] mb-2 w-41 mx-auto"></div>
                </>
                
                
              )
            })
          }

        </div>
      </div>



      {/* {
        selection === "messages" ? 
        <div>hello</div>:<div className="flex flex-col h-full w-full items-center">
        <input type="text" className="bg-[#232b2c] rounded h-14 w-100 mt-6" />
      </div>
      } */}
      
    </div>
  );
};

export default Chat;
