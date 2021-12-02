import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "../../components/pageLayout";
import AuthContext from "../../context/authContext";
import { createBook } from "../../services/books";

import './index.css';

const BookCreate = () => {
	const navigate = useNavigate();
	const { user } = useContext(AuthContext);
	const [categories, setCategories] = useState([]);
	
	const onBookSubmitHandler = (e) => {
		e.preventDefault();
		const data = new FormData(e.target)
		const book = {
			title: data.get('title'),
			author: data.get('author'),
			description: data.get('description'),
			imageFile: data.get('image'),
			category: categories
		}
		createBook(book)
			.then(res => {
				console.log(book);
				navigate('/home')
			})
			.catch(err=>console.log(err))
	}

	const onCategoryBlurHandler = (e) => {
		e.preventDefault();
		const updated = categories.slice();
		const value = e.target.value;
		if (value && !updated.includes(value)) {
			updated.push(value);
		}
		setCategories(updated);
		e.target.value = '';
	}

	const onCategoryClickHandler = (e) => {
		const value = e.target.value;

		const updated = categories.slice();

		updated.splice(updated.indexOf(value), 1)
		setCategories(updated)
	}

	return (
		<PageLayout>
			<div className="book-form-container">
				<div className="book-form-title">
					<h3><i className="fa fa-arrow-right"></i>New book</h3>
				</div>
				<form className="book-form-body" onSubmit={onBookSubmitHandler}>
					<div className="book-form-body-main">
						<div className="title">
							<input type="text" name="title" id="title" />
							<label htmlFor="title"><i className="fa fa-pen"></i>Title</label>
						</div>
						<div className="author">
							<input type="text" name="author" id="author" />
							<label htmlFor="title"><i className="fa fa-pen"></i>Author</label>
						</div>
						<div className="default-image">
							<img src="/book.png" alt="" />
						</div>
						<div className="image">
							<input type="file" name="image" id="image" placeholder="No file choosen..." />
							<label htmlFor="image"><i className="fas fa-image"></i>Image</label>
						</div>
					</div>
					<div className="book-form-body-details">
						<div className="description">
							<textarea type="text" name="description" id="description" cols="50" rows="12" />
							<label htmlFor="description"><i className="fa fa-pen"></i>Description</label>
						</div>
						<div className="category">
							<input type="text" name="category" id="category" onBlur={onCategoryBlurHandler} />
							<span className="add-category"><i className="fa fa-pen"></i> Add category</span>
						</div>
						<div className="categories-list">
							{categories.map(x => <span key={x} className="category-list-item" onClick={onCategoryClickHandler} ><i className="fas fa-times"></i>{x}</span>)}
						</div>
					</div>
					<div className="book-form-footer">
						<div className="recommend">
							<p>Recommended by</p>
							<h3>{user.username}</h3>
						</div>
						<div className="action">
							<button type="submit">Add to books</button>
						</div>
					</div>
				</form>
			</div>
		</PageLayout>
	)
}

export default BookCreate;