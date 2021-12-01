import { useState } from 'react'
import AuthContext from './context/authContext';

const initialUserState = {
    userId: '',
    username: '',
    sessionToken: ''
};

const AuthContextProvider = (props) => {
    const [user, setUser] = useState(props.user ? props.user : initialUserState);

    const login = (authData) => {
        setUser(authData);
    }

    const logout = () => {
        setUser(initialUserState);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                logout
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider
