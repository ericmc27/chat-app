import React from "react"
import { useQuery } from "@tanstack/react-query"
import { CachedUserData, CachedUserObjects, CurrentUserProviderProps } from "./interfaces"
import { getCurrentUserData } from "./apis"
import { useLoaderData } from "react-router-dom"
import { CurrentUserContextValues } from "./interfaces"


const CurrentUserContext = React.createContext<CurrentUserContextValues | undefined>(undefined)

export const CurrentUserProvider: React.FC<CurrentUserProviderProps> = ({children})=>{
  const [selection, setSelection] = React.useState<string>("");
  
  const { data: currentUserData } = useQuery<CachedUserData>({
    queryKey: ["currentUserData"],
    queryFn: getCurrentUserData,
    initialData: useLoaderData(),
    enabled: false,
  });
  
  const [currentFriendChat, setCurrentFriendChat] = React.useState<CachedUserObjects>({tag: '', fullName: '', photo: ''})

  return (
    <CurrentUserContext.Provider value={{selection, setSelection, currentUserData, currentFriendChat, setCurrentFriendChat }}>
      {children}
    </CurrentUserContext.Provider>
  )
}

export const useCurrentUserProvider = ()=>{
  const context = React.useContext(CurrentUserContext)

  if(!context){
    throw new Error("error")
  }

  return context
}

export default CurrentUserContext