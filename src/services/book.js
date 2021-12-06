import Parse from "../config/server";
import uploadImage from "./image";

const Book = Parse.Object.extend('Book');

const getAllBooks = async function () {
	const query = new Parse.Query(Book);
	query.include('creator');

	try {
		const data = await query.find();
		const results = data.reduce((a, x) => {
			a.push(viewModel(x))
			return a
		}, [])
		return results;
	} catch (error) {
		console.error('Error while fetching Book', error);
	}
}

const getBookById = async function (id) {
	const query = new Parse.Query(Book);
	query.include('creator');
	query.equalTo('objectId', id);

	try {
		const data = await query.first();
		const result = viewModel(data);
		return result;
	} catch (error) {
		console.error('Error while fetching Book', error);
	}
}

const getLastFourBooks = async function () {
	const query = new Parse.Query(Book);
	query.include('creator');
	query.descending('createdAt').limit(4);

	try {
		const data = await query.find();
		const results = data.reduce((a, x) => {
			a.push(viewModel(x))
			return a
		}, [])
		return results;
	} catch (error) {
		console.error('Error while fetching Book', error);
	}
}

const getMostLikedBooks = async function () {
	const query = new Parse.Query(Book);
	query.include('creator');
	query.descending('rating').limit(4);

	try {
		const data = await query.find();
		const results = data.reduce((a, x) => {
			a.push(viewModel(x))
			return a
		}, [])
		return results;
	} catch (error) {
		console.error('Error while fetching Book', error);
	}
}

const createBook = async (data) => {
	try {
		let imageUrl = "";
		if (data.image.size > 0) {
			imageUrl = await uploadImage(data.image);
		}
	
		const book = new Parse.Object('Book');
		book.set('title', data.title);
		book.set('author', data.author);
		book.set('description', data.description);
		book.set('creator', Parse.User.current());
		book.set('category', data.category);
		book.set('imageUrl', imageUrl);

		await book.save();
	} catch (error) {
		console.error('Error while creating Book: ', error);
	}
}

const deleteBook = async (bookId) => {
	try {
		const query = new Parse.Query(Book);
		const book = await query.get(bookId);
		try {
			const response = await book.destroy();
			console.log('Deleted ParseObject', response);
		} catch (error) {
			console.error('Error while deleting ParseObject', error);
		}
	} catch (error) {
		console.error('Error while retrieving ParseObject', error);
	}
}

const viewModel = (record) => {
	const date = new Date(record.createdAt).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })
	const creator = record.get('creator').get('username');
	return {
		id: record.id,
		createdAt: date,
		title: record.get('title'),
		author: record.get('author'),
		description: record.get('description'),
		imageUrl: record.get('imageUrl'),
		rating: record.get('rating'),
		creator,
		category: record.get('category')
	}
}

export {
	getBookById,
	getAllBooks,
	getLastFourBooks,
	getMostLikedBooks,
	createBook,
	deleteBook
}
