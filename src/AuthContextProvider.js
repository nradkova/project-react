import { INITIAL_AUTH_STATE } from './common';

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
    }

    const logout = () => {
        setUser(INITIAL_AUTH_STATE);
    };

    const resetUserInitialValue=()=>{
        setUser(INITIAL_AUTH_STATE);
    }


    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
                resetUserInitialValue,
                isAuthenticated: user.username
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider
