import { useState, useEffect } from "react";
import { Link,useParams } from "react-router-dom";
import CustomComment from "../../components/comment";
import PageLayout from "../../components/pageLayout";
import Rating from "../../components/rating";
import { getBookById } from "../../services/books";

import './index.css';

const BookDetails = () => {

	const {bookId} = useParams()
	// const bookId = 'iQFlWJ9qh4'
console.log(bookId);
	const [book, setBook] = useState({
		id: "",
		title: "",
		author: "",
		description: "",
		imageUrl: "",
		rating: "",
		createdAt: ""
	})
	useEffect(() => {
		async function fetchData() {
			const res = await getBookById(bookId);
			setBook(res)
			// setBook({
			// 	title: "VDFSGVFSD SDFSDFSF",
			// 	author: " ASDAD FD  ERERE",
			// 	description: "FGFSDGFS SFGFSDGSG SFGSG ",
			// 	imageUrl: "https://res.cloudinary.com/dah8nslpd/image/upload/v1638182308/books/a-book-gd09600698_640_nv8vzp.png",
			// 	rating: 5,
			// 	createdAt: "November 24,2021",
			// 	creator:"David"
			// })
		}
		fetchData()
	}, [bookId])
	const comments = [
		{ id: 1, creator: "Peter", text: "Very nice book......" },
		{ id: 2, creator: "Maria", text: "Very nice book. aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa....." },
		{ id: 3, creator: "David", text: "Very nice book...xxxxxxxxxxxx xxxxxx  x    x ... ddddddddd dd ddddddddddd ddddddd Very nice book...xxxxxxxxxxxx xxxxxx  x    x ... ddddddddd dd ddddddddddd ddddddd" },
		{ id: 4, creator: "Peter", text: "Very nice book......" },
		{ id: 5, creator: "Maria", text: "Very nice book. aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa....." },
		{ id: 6, creator: "David", text: "Very nice book...xxxxxxxxxxxx xxxxxx  x    x ... ddddddddd dd ddddddddddd ddddddd Very nice book...xxxxxxxxxxxx xxxxxx  x    x ... ddddddddd dd ddddddddddd ddddddd" }
	]


	return (
		<PageLayout>
			<div className="book-details-container">
				<div className="book-main">
					<h4 className="book-author">{book.author}</h4>
					<h1 className="book-title">{book.title}</h1>
					<div className="book-details">
						<span><i className="far fa-clock"></i>{book.createdAt}</span>
						<span><i className="far fa-user"></i>{book.creator}</span>
						<span><i className="far fa-comment-alt"></i>{book.rating}</span>
					</div>
					<div className="book-image">
						<img src={book.imageUrl} alt="Book_cover" />
					</div>
					<p className="book-description">{book.description}</p>
				</div>
				<div className="book-additional">
					<div className="book-comments">
						{comments.length > 0
							? comments.map(x => <CustomComment key={x.id} text={x.text} creator={x.creator} />)
							: <p>No comments yet... Be the first one to comment!</p>}
					</div>
					<div className="book-actions">
						<Link className="edit-link" to={`/books/${book.id}/edit`}>EDIT</Link>
						<Link className="delete-link" to={`/books/${book.id}/delete`}>DELETE</Link>
					</div>
					<div>
						<Rating/>
					</div>
					<div>
						<form action="" method="post">
							<h4>You can write your comment here:</h4>
							<textarea name="comment" id="comment" cols="50" rows="6"></textarea>
							<button type="submit">POST</button>
						</form>
					</div>


				</div>
			</div>
		</PageLayout>
	)
}

export default BookDetails;