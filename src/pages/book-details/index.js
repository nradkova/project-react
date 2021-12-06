import { useState, useEffect, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import CustomComment from "../../components/comment";
import PageLayout from "../../components/pageLayout";
import Rating from "../../components/rating";
import AuthContext from "../../context/authContext";
import { getBookById, deleteBook } from "../../services/book";
import { createBookComment, getAllCommentsByBookId } from "../../services/comment";
import userService from "../../services/user";


import './index.css';

const BookDetails = () => {
	const navigate = useNavigate();
	const { user } = useContext(AuthContext);
	const { bookId } = useParams();

	const [isGuest, setIsGuest] = useState(true);
	const [isUser, setIsUser] = useState(false);
	const [isCreator, setIsCreator] = useState(false);

	const [book, setBook] = useState({
		id: "",
		title: "",
		author: "",
		description: "",
		imageUrl: "",
		rating: "",
		createdAt: "",
		creator: "",
		category: []
	});

	const [comments, setComments] = useState([]);

	useEffect(() => {
		async function fetchData() {
			const book = await getBookById(bookId);
			console.log(user.username);
			setBook(book)
			if (user.username === book.creator) {
				setIsCreator(true);
				setIsUser(false);
				setIsGuest(false);
			} else if (Boolean(user.username)) {
				setIsUser(true);
				setIsGuest(false);
				setIsCreator(false)
			} else {
				setIsGuest(true);
				setIsUser(false);
				setIsCreator(false)
			}
			const comments = await getAllCommentsByBookId(bookId);
			console.log(comments);
			setComments(comments)
		}
		fetchData()
	}, [bookId, user])


	const onClickAddBookHandler = async (e) => {
		e.preventDefault();
		await userService.updateUserReadingList(user.userId, bookId)
		navigate(`/my-page/${user.userId}`)
	}

	const onSubmitCommentHandler = async (e) => {
		e.preventDefault();
		console.log(e.target.comment.value);
		await createBookComment(bookId, e.target.comment.value);
		const updated=await getAllCommentsByBookId(bookId);
		setComments(updated);
		e.target.comment.value='';
	}

	// const onClickDeleteBookHandler = async(e)=>{
	// 	e.preventDefault();
	// 	await deleteBook(bookId)
	// 	navigate('/books')
	// }

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
						<img src={book.imageUrl ? book.imageUrl : "/default_book.png"} alt="Book_cover" />
					</div>
					<p className="book-description">{book.description}</p>
					<div className="book-categories">
						{book.category.map(x => <span key={x}><i className="far fa-circle"></i>{x}</span>)}
					</div>
				</div>
				<div className="book-additional">
					<div className="book-comments">
						{comments.length > 0
							? comments.map(x => <CustomComment key={x.id} createdAt={x.createdAt} text={x.text} creator={x.creator} />)
							: <p>No comments yet... Be the first one to comment!</p>}
					</div>
					<div className="book-actions">
						{isCreator
							? <Link className="edit-link" to={`/books/${book.id}/edit`}>EDIT</Link>
							: null
						}
						{/* <Link className="delete-link" to={`/books/${book.id}/delete`}  onClick={onClickDeleteBookHandler}>DELETE</Link> */}
						{isUser
							? <Link className="add-to-reading-list-link" to={`/books/${book.id}/add`} onClick={onClickAddBookHandler} >ADD TO READING LIST</Link>
							: null
						}
					</div>
					<div>
						<Rating />
					</div>
					{isUser
						? <div className="book-comments-form">
							<form action="" method="post" onSubmit={onSubmitCommentHandler}>
								<h4>You can write your comment here:</h4>
								<textarea className="comment-input" name="comment" id="comment" cols="50" rows="6"></textarea>
								<button className="comment-btn" type="submit">POST</button>
							</form>
						</div>
						: null
					}
				</div>
			</div>
		</PageLayout>
	)
}

export default BookDetails;