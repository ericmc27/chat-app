{/**pages/Login.tsx */}
export interface UserLogin {
  email: string,
  password: string
}

{/**pages/Chat.tsx */}
interface PendingRequests {
  fullName: string,
  photo: string
}
export interface CachedUserData {
  tag: string,
  photo: string,
  pendingRequests: PendingRequests[]
}
