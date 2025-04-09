{/**pages/Login.tsx */}
export interface UserLogin {
  email: string,
  password: string
}

{/**pages/Chat.tsx */}
interface CachedUserObjects {
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
