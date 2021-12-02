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
