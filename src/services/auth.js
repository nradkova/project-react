import Parse from "../config/server";

const login = async (authData) => {
    const { username, password } = authData;
    try {
        const res = await Parse.User.logIn(username, password);
        console.log('Logged in user');

        return {
            userId: res.id,
            username: res.get('username'),
            sessionToken: res.get('sessionToken')
        }
    } catch (error) {
        console.error('Error while logging in user', error);
    }
}

const register = async (authData) => {
    const { username, password } = authData;
    const user = new Parse.User();
    user.set('username', username);
    user.set('password', password);

    try {
        const res = await user.signUp();
        console.log('User signed up');

        return {
            userId: res.id,
            username: res.get('username'),
            sessionToken: res.get('sessionToken')
        }
    } catch (error) {
        console.error('Error while signing up user', error);
    }
}

const logout = async () => {
    try {
        await Parse.User.logOut();
        const currentUser = await Parse.User.current();
        if (currentUser === null) {
            console.log('Success! No user is logged in anymore!');
          }
    } catch (error) {
        console.error('Error!', error);
    }
}

// function saveUserres(res) {
//     console.log(res);
//     let { user: { email, uid } } = res;
//     localStorage.setItem('user', JSON.stringify({ email, uid }));
// }

// function clearUserres() {
//     localStorage.removeItem('user');
// }

// function getUserres() {
//     let user = localStorage.getItem('user');

//     if (user) {
//         return JSON.parse(user);
//     }
// }

const authServices = {
    login,
    register,
    logout
}

export default authServices;