import { Link } from 'react-router-dom'
import authServices from '../../services/user';
import Star from '../star';
import './index.css'

const BookCardLite = ({onClickRemoveBook, userId,bookId, imageUrl, title, author}) => {

    // const onClickRemoveBook=async(e)=>{
    //     const removed=await authServices.removeBookFromUserReadingList(userId,bookId);
    //     console.log(removed);
    // }
    return (
        <div className="book-card-lite">
            <span className="book-card-lite-img">
                <img src={imageUrl ? imageUrl : "/default_book.png"} alt="Book_cover" />
            </span>
            <div className="book-card-lite-content">
                <div className="book-card-lite-content-text">
                    <p><span className="book-card-lite-content-heading" >Title: </span>{title}</p>
                    <p> <span className="book-card-lite-content-heading"> Author: </span>{author}</p>
                    {/* <p><span className="book-card-lite-content-heading">Rating: </span>
                        <Star rating={rating} />
                    </p> */}
                </div>
                <div className="book-card-lite-content-actions">
                <Link className="details-link-lite" to={`/books/${bookId}`}>VIEW</Link>
                <span className='slash-span'>&#47;</span>
                {/* <Link className="delete-link-lite" to={`/my-page/${userId}/book-remove/${bookId}`}>REMOVE</Link> */}
                <Link className="delete-link-lite" to={`/my-page/${userId}/book-remove/${bookId}`} onClick={onClickRemoveBook}>REMOVE</Link>
                </div>
            </div>
        </div>
    )
}

export default BookCardLite;