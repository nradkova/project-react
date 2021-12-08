import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DEFAULT_BOOK_URL } from "../../common";
import Category from "../../components/category";
import PageLayout from "../../components/pageLayout";
import AuthContext from "../../context/authContext";
import { createBook } from "../../services/book";
import uploadImage from "../../services/image";
import { bookDataValidation } from "../../utils/validation";

import './index.css';

const BookCreate = () => {
	const navigate = useNavigate();
	const { user } = useContext(AuthContext);
	const [imagePreview, setImagePreview] = useState(DEFAULT_BOOK_URL);
	const categories = [];

	const onSubmitBookHandler = (e) => {
		e.preventDefault();
		const data = new FormData(e.target)
		const book = {
			title: data.get('title'),
			author: data.get('author'),
			description: data.get('description'),
			category: categories,
			image: data.get('image')
		}
		createBook(book)
			.then(res => {
				console.log(book);
				navigate('/home')
			})
			.catch(err => console.log(err))
	}

	const onBlurInputHandler = (e) => {
		e.preventDefault();
		const value = e.target.value;
		const type = e.target.name;
		const error = bookDataValidation(type, value);
		console.log(error);
		if (error) {
			return <p>{error}</p>
		}
	}

	// const onCategoryBlurHandler = (e) => {
	// 	e.preventDefault();
	// 	const updated = categories.slice();
	// 	const value = e.target.value;
	// 	if (value && !updated.includes(value)) {
	// 		updated.push(value);
	// 	}
	// 	setCategories(updated);
	// 	e.target.value = '';
	// }

	// const onCategoryClickHandler = (e) => {
	// 	const value = e.target.value;

	// 	const updated = categories.slice();

	// 	updated.splice(updated.indexOf(value), 1)
	// 	setCategories(updated)
	// }

	const onChangeImageHandler = (e) => {
		const value = e.target.files[0];
		const error = bookDataValidation('image', (value || ''));
		if (error) {
			console.log(error);
			return;
		}
		console.log(value);
		!value
			? setImagePreview(DEFAULT_BOOK_URL)
			: uploadImage(value)
				.then(url => {
					setImagePreview(url)
				})
				.catch(err => {
					console.log(err);
				})
	}

	return (
		<PageLayout>
			<div className="book-form-container">
				<div className="book-form-title">
					<h3><i className="fa fa-arrow-right"></i>New book</h3>
				</div>
				<form className="book-form-body" onSubmit={onSubmitBookHandler}>
					<div className="book-form-body-main">
						<div className="title">
							<input className="title-input" type="text" name="title" id="title" onBlur={onBlurInputHandler} />
							<label htmlFor="title"><i className="fa fa-pen"></i>Title</label>
						</div>
						<div className="author">
							<input className="author-input" type="text" name="author" id="author" onBlur={onBlurInputHandler} />
							<label htmlFor="title"><i className="fa fa-pen"></i>Author</label>
						</div>
						<div className="default-image">
							<img src={imagePreview} alt="Book_Image" />
						</div>
						<div className="image">
							<input className="image-input" type="file" accept="image/*" lang="en" name="image" id="image" onChange={onChangeImageHandler} />
							{/* <input type="file" name="image" id="image" onChange={onImageChangeHandler} /> */}
							<label htmlFor="image"><i className="fas fa-image"></i>Image</label>
						</div>
					</div>
					<div className="book-form-body-details">
						<div className="description">
							<textarea className="description-input" type="text" name="description" id="description" cols="50" rows="12" onBlur={onBlurInputHandler} />
							<label htmlFor="description"><i className="fa fa-pen"></i>Description</label>
						</div>
						<Category selectedCategories={categories} />
					</div>
					<div className="book-form-footer">
						<div className="recommend">
							<p>Recommended by</p>
							<h3>{user.username}</h3>
						</div>
						<div className="action">
							<button className="action-btn" type="submit">Add to books</button>
						</div>
					</div>
				</form>
			</div>
		</PageLayout>
	)
}

export default BookCreate;

{/* <div className="category">
	<input className="category-input" type="text" name="category" id="category" onBlur={onCategoryBlurHandler} />
	<span className="add-category"><i className="fa fa-pen"></i> Add category</span>
</div>
<div className="categories-list">
	{categories.map(x => <span key={x} className="category-list-item" onClick={onCategoryClickHandler} ><i className="fas fa-times"></i>{x}</span>)}
</div> */}