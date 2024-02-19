import React , { createContext, useState } from 'react'

export const UserContext = React.createContext({
    user: {
        fullName: '',
        avatar: "",
        github:"",
        linkedin:"",
      }
})
  

const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState({
        fullName: 'Mahdi Ghanati',
        avatar: "https://avatars2.githubusercontent.com/u/6865268?s=460&v=4",
        github:"https://github.com/MTaheriii",
        linkedin:"https://www.linkedin.com/in/mostafa-ali-jafari/",
      }
    );
    
    return (
        <UserContext.Provider value={{
            user
        }}>
            {children}
        </UserContext.Provider>
    )

}

export default UserContextProvider