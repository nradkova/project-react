import { Link } from 'react-router-dom'
import Star from '../star';
import './index.css'

const BookCardLite = ({ userId,bookId, imageUrl, title, author, rating = '0' }) => {

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
                <Link className="delete-link-lite" to={`/my-page/${userId}/book-remove/${bookId}`}>REMOVE</Link>
                </div>
            </div>
        </div>
    )
}

export default BookCardLite;