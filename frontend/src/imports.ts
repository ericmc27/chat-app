{/** pages/Chat.tsx */}
import { queryClient } from "./main";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUserData, uploadNewUserPhoto } from "./apis";
import { io } from "socket.io-client";
import settings from "./assets/icons8-settings.png";
import addContact from "./assets/icons8-add-contact.png";
import stories from "./assets/icons8-chat-stories.png";
import notificacions from "./assets/icons8-notification-48.png"
import AddContact from "./components/chat/addContact";
import FriendsStories from "./components/chat/friendsStories";
import Brand from "./components/chat/brand";
import Settings from "./components/chat/settings";
import { CachedUserData } from "./interfaces";

export {queryClient, useQuery, getCurrentUserData, uploadNewUserPhoto, io, settings, addContact, stories, notificacions, FriendsStories, AddContact, Brand, Settings}
export type {CachedUserData}


{/** pages/Login.tsx */}
import chatLogo from "./assets/icons8-chat-logo.png"
import signIn from "./assets/sign-in.png"
import { login } from "./apis"
import { UserLogin } from "./interfaces"

export {chatLogo, signIn, login}
export type {UserLogin}
