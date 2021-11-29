import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './index.css'

const BookCardBrief = ({ id,imageUrl, title, author, rating = '6' }) => {

    return (
        <div className="book-card-brief">
            <span className="book-card-brief-img">
                <img src={imageUrl} alt="Book_cover" />
            </span>
            <div className="book-card-brief-content">
               <Link className="details-link" to={`/books/${id}`}>VIEW</Link>
                <div className="book-card-brief-content-text">
                <p><span className="book-card-brief-content-heading" >Title: </span>{title}</p>
                <p> <span className="book-card-brief-content-heading"> Author: </span>{author}</p>
                <p><span className="book-card-brief-content-heading">Rating: </span>{rating}</p>
                </div>
            </div>
        </div>
    )
}

export default BookCardBrief