import {
  React,
  queryClient,
  useCurrentUserProvider,
  CachedUserData,
  addNewContact,
  userNotifications,
  acceptFriendRequestIcon,
} from "../../imports";

const RightSideBar: React.FC = () => {
  const { currentUserData } = useCurrentUserProvider();

  const acceptFriendRequest = async (tag: string) => {
    await addNewContact(tag);
    queryClient.setQueryData<CachedUserData>(["currentUserData"], (oldData) => {
      if (!oldData) {
        return oldData;
      }

      const updatePendingRequests = oldData.pendingRequests.filter(
        (obj) => obj.tag !== tag
      );

      return {
        ...oldData,
        pendingRequests: updatePendingRequests,
      };
    });
  };

  const declineFriendRequest = async () => {
    console.log("decline friendship");
  };

  return (
    <div className="bg-[#1a2122] h-screen w-100 rounded text-white flex flex-col items-center">
      <img className="h-10 w-10 mt-3" src={userNotifications} />

      <div className="flex-1 overflow-auto scrollbar w-full mt-5">
        {currentUserData?.pendingRequests.map((pendingRequest, index) => {
          return (
            <div
              className={` bg-[#2a3234] h-22 w-50 flex animate-fade-in ps-2 pt-3 ms-7 rounded ${
                index !== 0 && "mt-3"
              } ${
                index === currentUserData.pendingRequests.length - 1 && "mb-3"
              }`}
              key={index}
            >
              <img
                src={`${
                  pendingRequest?.photo
                    ? `/assets/${pendingRequest.photo}`
                    : "/assets/profile-placeholder.png"
                }`}
                className="h-10 w-10 rounded-full"
              />

              <div className="flex flex-col">
                <h2 className="text-white capitalize ms-2">
                  {pendingRequest.fullName}
                </h2>
                <div className="flex">
                  <img className="h-8 w-8" src={acceptFriendRequestIcon} />

                  <button
                    type="button"
                    onClick={() => acceptFriendRequest(pendingRequest.tag)}
                  >
                    Accept
                  </button>
                </div>
              </div>

              <button
                className="ms-auto text-lime-300 me-2"
                type="button"
                onClick={declineFriendRequest}
              >
                X
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RightSideBar;
