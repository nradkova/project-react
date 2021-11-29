import Parse from "../config/server";

const User = Parse.Object.extend('User');

function getUserData() {
    let user = localStorage.getItem(`user`);

    if (user) {
        return JSON.parse(user);
    }
}

const login= async(userCredentials)=> {
    const { username, password } = userCredentials;
    try {
        let user = await Parse.User.logIn(username,password);
        console.log('Logged in user', user);
      } catch (error) {
        console.error('Error while logging in user', error);
      }
}

const register = async (userCredentials) => {
    const { username, password } = userCredentials;

    const user = new Parse.User();
    user.set('username', username);
    user.set('password', password);

    try {
        let userResult = await user.signUp();
        console.log('User signed up', userResult);
    } catch (error) {
        console.error('Error while signing up user', error);
    }
}

function saveUserData(data) {
    let { user: { email, uid } } = data;
    localStorage.setItem(`user`, JSON.stringify({ email, uid }));
}

function clearUserData() {
    localStorage.removeItem(`user`);
}

const authServices = {
    getUserData,
    login,
    register,
    saveUserData,
    clearUserData
}

export default authServices;