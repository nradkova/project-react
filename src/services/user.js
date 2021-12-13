import Parse from "../config/server";

const login = async (authData) => {
	const { username, password } = authData;

	try {
		const res = await Parse.User.logIn(username.toLocaleLowerCase(), password);
		console.log('Logged in user');
		console.log(res);
		return {
			userId: res.id,
			username: res.get('username'),
			sessionToken: res.get('sessionToken')
		}
	} catch (error) {
		if(error.message==='Invalid username/password.'){
			throw error;
		}
		console.log('Error while logging in user', error);
	}
}

const register = async (authData) => {
	const { username, password } = authData;

	const user = new Parse.User();
	user.set('username', username.toLocaleLowerCase());
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

const checkUserExists = async (username) => {
	const User = new Parse.User();
	const query = new Parse.Query(User);
	query.equalTo('username', username.toLocaleLowerCase());

	try {
		const res = await query.first();
		console.log(res);
		return res;
	} catch (error) {
		console.error('Error while retrieving user', error);
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
			await user.save();
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
			const results = data.map(x => {
				return {
					id: x.id,
					title: x.get('title'),
					author: x.get('author'),
					imageUrl: x.get('imageUrl')
				}
			})
			return results;
		} catch (error) {
			console.error('Error while updating user', error);
		}
	} catch (error) {
		console.error('Error while retrieving user', error);
	}
}

const checkBookInUserReadingList = async (userId, bookId) => {
	const User = new Parse.User();
	const query = new Parse.Query(User);
	try {
		const user = await query.get(userId);
		try {
			const relation = user.relation('readingList');
			const data = await relation.query().find();
			const results = data.map(x => x.id);
			console.log(results);
			if (results.includes(bookId)) {
				return false;
			}
			return true;
		} catch (error) {
			console.error('Error while updating user', error);
		}
	} catch (error) {
		console.error('Error while retrieving user', error);
	}
}

const removeBookFromUserReadingList = async (userId, bookId) => {
	const book = new Parse.Object('Book');
	book.id = bookId;

	const User = new Parse.User();
	const query = new Parse.Query(User);

	try {
		const user = await query.get(userId);
		try {
			const relation = user.relation('readingList')
			relation.remove(book);
			await user.save();
			console.log('Updated user');
			return true;
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
	checkUserExists,
	updateUserReadingList,
	getUserReadingList,
	checkBookInUserReadingList,
	removeBookFromUserReadingList
}

export default authServices;