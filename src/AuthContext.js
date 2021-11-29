import {useState} from 'react'
import AuthContext from './context/authContext';
import authServices from './services/user';

export const AuthContextProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  const checkIfLoggedHandler = () => {
      const user = authServices.getUserData();

      if (user) {
          setIsLogged(true)
          setUserInfo(user);
      } else {
          setIsLogged(false);
          setUserInfo({});
      }
  }

  return (
      <AuthContext.Provider
          value={{
              isLogged,
              userInfo,
              checkIfLogged: checkIfLoggedHandler,
          }}
      >
          {children}
      </AuthContext.Provider>
  );
};

