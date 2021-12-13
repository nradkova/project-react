import { INITIAL_AUTH_STATE, INITIAL_AUTH_VALUE } from './common';

import AuthContext from './context/authContext';
import useLocalStorage from './hooks/useLocalStorage';

const initialUserState = {
    userId: '',
    username: '',
    sessionToken: ''
};

const AuthContextProvider = (props) => {

    const [user, setUser] = useLocalStorage('user', initialUserState);
    
    const login = (authData) => {
        setUser(authData);
    }

    const logout = () => {
        setUser(initialUserState);
    };

    const resetUserInitialValue=()=>{
        setUser(initialUserState)
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
                resetUserInitialValue
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider
