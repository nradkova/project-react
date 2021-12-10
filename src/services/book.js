import Parse from "../config/server";

import uploadImage from "./image";
import { createBookRating, getRatingByBookId } from "./rating";

const getAllBooks = async function () {
	const Book = Parse.Object.extend('Book');

	const query = new Parse.Query(Book);
	query.include('creator');
	query.include('bookRating');

	try {
		const data = await query.find();
		const results = data.map(viewModel);
		return results;
	} catch (error) {
		console.error('Error while fetching Book', error);
	}
}

const getBookById = async function (bookId) {
	const Book = Parse.Object.extend('Book');

	const query = new Parse.Query(Book);
	query.include('bookRating');
	query.equalTo('objectId', bookId);

	try {
		const data = await query.first();
		const result = viewModel(data);
		const rating = await getRatingByBookId(bookId)
		result.rating = rating.star;
		return result;
	} catch (error) {
		console.error('Error while fetching Book', error);
	}
}

const getLastFourBooks = async function () {
	const Book = Parse.Object.extend('Book');

	const query = new Parse.Query(Book);
	query.include('creator');
	query.include('bookRating');
	query.descending('createdAt').limit(4);

	try {
		const data = await query.find();
		const results = data.map(viewModel)
		return results;
	} catch (error) {
		console.error('Error while fetching Book', error);
	}
}

const getMostLikedBooks = async function () {
	const BookRating=Parse.Object.extend('BookRating');
	const innerQuery = new Parse.Query(BookRating);
	innerQuery.equalTo('star',5).limit(4)
	
	const Book = Parse.Object.extend('Book');
	const query = new Parse.Query(Book);
	
	query.matchesQuery('bookRating', innerQuery);
	query.include('creator');
	query.include('bookRating');
	
	try {
		const data = await query.find();
		const results = data.map(viewModel)
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

		const bookResult = await book.save();
		const ratingResult = await createBookRating(bookResult.id);

		bookResult.set('bookRating', ratingResult);
		await bookResult.save();

	} catch (error) {
		console.error('Error while creating Book: ', error);
	}
}

const deleteBook = async (bookId) => {
	const Book = Parse.Object.extend('Book');

	const query = new Parse.Query(Book);

	try {
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
	const creator = record.get('creator').get('username');
	const rating = record.get('bookRating').get('star');
	const voted = record.get('bookRating').get('voted');
	const date = new Date(record.createdAt)
		.toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })

	return {
		id: record.id,
		createdAt: date,
		title: record.get('title'),
		author: record.get('author'),
		description: record.get('description'),
		imageUrl: record.get('imageUrl'),
		category: record.get('category'),
		voted,
		rating,
		creator,
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
