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
		console.log('Error while logging in user', error);
		throw error;
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

const updateUserReadingList = async (userId, bookId) => {
	const book = new Parse.Object('Book');
	book.id = bookId;

	const User = new Parse.User();
	const query = new Parse.Query(User);

	try {
		const user = await query.get(userId);

		try {
			const relation = user.relation('readingList')
			relation.add(book)
			const response = await user.save();
			console.log('Updated user');
		} catch (error) {
			console.error('Error while updating user', error);
		}

	} catch (error) {
		console.error('Error while retrieving user', error);
	}

}

const getUserReadingList = async (userId) => {

	const User = new Parse.User();
	const query = new Parse.Query(User);

	try {
		const user = await query.get(userId);
		try {
			const relation = user.relation('readingList');
			const data = await relation.query().find();
			
			const results = data.reduce((a, x) => {
				a.push({
					id: x.id,
					title: x.get('title'),
					author: x.get('author'),
					description: x.get('description'),
					imageUrl: x.get('imageUrl'),
					rating: x.get('rating'),
					createdAt: x.createdAt
				})
				return a
			}, [])
			return results;
		} catch (error) {
			console.error('Error while updating user', error);
		}
	} catch (error) {
		console.error('Error while retrieving user', error);
	}

}


const authServices = {
	login,
	register,
	logout,
	updateUserReadingList,
	getUserReadingList
}

export default authServices;