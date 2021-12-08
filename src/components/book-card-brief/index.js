import { Link } from 'react-router-dom'
import Star from '../star';
import './index.css'

const BookCardBrief = ({ id, imageUrl, title, author, rating = '0' }) => {
   
    return (
        <div className="book-card-brief">
            <span className="book-card-brief-img">
                <img src={imageUrl ? imageUrl :"/default_book.png"} alt="Book_cover" />
            </span>
            <div className="book-card-brief-content">
                <Link className="details-link" to={`/books/${id}`}>VIEW</Link>
                <div className="book-card-brief-content-text">
                    <p><span className="book-card-brief-content-heading" >Title: </span>{title}</p>
                    <p> <span className="book-card-brief-content-heading"> Author: </span>{author}</p>
                    <p><span className="book-card-brief-content-heading">Rating: </span>
                        <Star rating={rating} />
                    </p>
                </div>
            </div>
        </div>
    )
}

export default BookCardBrief;