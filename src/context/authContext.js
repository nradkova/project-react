import React from 'react';

const AuthContext = React.createContext({
    user: {
        userId: '',
        username: '',
        sessionToken: ''
    },
    login:()=>{},
    logout:()=>{},
    resetUserInitialValue:()=>{},
    isAuthenticated:false
});

export default AuthContext;