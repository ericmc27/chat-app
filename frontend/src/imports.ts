{
  /**Common imports */
}
import React from "react";
import { queryClient } from "./main";
import { useCurrentUserProvider } from "./CurrentUserContext";
import { CachedUserData } from "./interfaces";

export { React, queryClient, useCurrentUserProvider };
export type { CachedUserData };

{
  /** pages/Chat.tsx */
}
import { io } from "socket.io-client";
import LeftSideBar from "./components/chat/LeftSideBar";
import MiddleContent from "./components/chat/MiddleContent";
import RightSideBar from "./components/chat/RIghtSideBar";

export { io, LeftSideBar, MiddleContent, RightSideBar };

{
  /** components/leftSideBar.tsx */
}

import { uploadNewUserPhoto } from "./apis";
import settings from "./assets/icons8-settings.png";
import addContact from "./assets/icons8-add-contact.png";
import stories from "./assets/icons8-chat-stories.png";
import CurrentUserFriends from "./components/chat/CurrentUserFriends";

export { uploadNewUserPhoto, settings, addContact, stories, CurrentUserFriends };

{
  /** components/middleContent.tsx */
}

import FriendsStories from "./components/chat/FriendsStories";
import AddNewContact from "./components/chat/AddNewContact";
import Settings from "./components/chat/Settings";
import ChatWindow from "./components/chat/ChatWindow";
import Brand from "./components/chat/Brand";

export { FriendsStories, AddNewContact, Settings, ChatWindow, Brand };

{
  /** components/rightSideBar.tsx */
}

import { addNewContact } from "./apis";
import userNotifications from "./assets/icons8-notification-48.png";
import acceptFriendRequestIcon from "./assets/icons-friend-request.png";

export { addNewContact, userNotifications, acceptFriendRequestIcon };

{
  /** pages/Login.tsx */
}
import chatLogo from "./assets/icons8-chat-logo.png";
import chatLogo72 from "./assets/icons8-chat-logo-72.png"
import signIn from "./assets/sign-in.png";
import { login } from "./apis";
import { UserLogin } from "./interfaces";

export { chatLogo, chatLogo72, signIn, login };
export type { UserLogin };

{
  /** components/addNewContact.tsx */
}
import sendRequest from "./assets/icons8-add-48.png";
import { sendFriendRequest } from "./apis";
export { sendRequest, sendFriendRequest };

{
  /** components/brand.tsx */
}
import chatBrand from "./assets/icons8-chat-brand.png";
export { chatBrand };
