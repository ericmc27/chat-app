{/**pages/Login.tsx */}
export interface UserLogin {
  email: string,
  password: string
}

{/**pages/Chat.tsx */}
export interface CachedUserObjects {
  tag: string,
  fullName: string,
  photo: string
}
export interface CachedUserData {
  tag: string,
  photo: string,
  friends: CachedUserObjects[],
  pendingRequests: CachedUserObjects[]
}

export interface CurrentUserContextValues {
  currentUserData: CachedUserData | undefined,
  selection: string,
  setSelection: React.Dispatch<React.SetStateAction<string>>
  currentFriendChat: CachedUserObjects,
  setCurrentFriendChat: React.Dispatch<React.SetStateAction<CachedUserObjects>>
}
export interface CurrentUserProviderProps {
  children: React.ReactNode;
}
