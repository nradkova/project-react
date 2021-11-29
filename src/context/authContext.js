import React from 'react';

const AuthContext = React.createContext({
    isLogged: false,
    userInfo: {},
    checkIfLogged: () => { },
});

export default AuthContext;