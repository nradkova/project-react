import { INITIAL_AUTH_STATE, INITIAL_AUTH_VALUE } from './common';

import AuthContext from './context/authContext';
import useLocalStorage from './hooks/useLocalStorage';

// const initialUserState = {
//     userId: '',
//     username: '',
//     sessionToken: ''
// };
let isAuthenticated=false;

const AuthContextProvider = (props) => {

    const [user, setUser] = useLocalStorage('user', INITIAL_AUTH_STATE);
    
    const login = (authData) => {
        setUser(authData);
        isAuthenticated=true;
    }

    const logout = () => {
        setUser(INITIAL_AUTH_STATE);
        isAuthenticated=false;
    };

    const resetUserInitialValue=()=>{
        setUser(INITIAL_AUTH_STATE);
        isAuthenticated=false;
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
                resetUserInitialValue,
                isAuthenticated
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider
