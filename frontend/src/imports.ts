{/**Common imports */}
import React from "react"
export { React }

{
  /** pages/Chat.tsx */
}
import { queryClient } from "./main";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUserData, uploadNewUserPhoto, addNewFriend } from "./apis";
import { io } from "socket.io-client";
import FriendsStories from "./components/chat/friendsStories";
import AddContact from "./components/chat/addNewContact";
import Brand from "./components/chat/brand";
import Settings from "./components/chat/settings";
import { CachedUserData } from "./interfaces";
import settings from "./assets/icons8-settings.png";
import addContact from "./assets/icons8-add-contact.png";
import stories from "./assets/icons8-chat-stories.png";
import userNotifications from "./assets/icons8-notification-48.png"

export {
  queryClient,
  useQuery,
  getCurrentUserData,
  uploadNewUserPhoto,
  addNewFriend,
  io,
  FriendsStories,
  AddContact,
  Brand,
  Settings,
  settings,
  addContact,
  stories,
  userNotifications
};

export type { CachedUserData };


{/** components/addContact.tsx */}
import sendRequest from "./assets/icons8-add-48.png";
import { sendFriendRequest } from "./apis";
export { sendRequest, sendFriendRequest }

{/** components/brand.tsx */}
import chatBrand from "./assets/icons8-chat-brand.png";
export { chatBrand }


{
  /** pages/Login.tsx */
}
import chatLogo from "./assets/icons8-chat-logo.png";
import signIn from "./assets/sign-in.png";
import { login } from "./apis";
import { UserLogin } from "./interfaces";

export { chatLogo, signIn, login };
export type { UserLogin };
