import {
  React,
  useCurrentUserProvider,
  uploadNewUserPhoto,
  settings,
  addContact,
  stories,
  CurrentUserFriends
} from "../../imports";

const LeftSideBar: React.FC = () => {
  const { currentUserData, setSelection } = useCurrentUserProvider();

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files[0]) {
      uploadNewUserPhoto(files[0]);
    }
  };

  return (
    <div className="bg-[#1a2122] h-screen w-100 text-white flex flex-col">
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
          <CurrentUserFriends/>
      </div>
    </div>
  );
};

export default LeftSideBar;
