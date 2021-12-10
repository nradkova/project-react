import { useState, useEffect } from "react";

import './index.css';

import { getAllBooks } from "../../services/book";

import Title from "../../components/title";
import PageLayout from "../../components/pageLayout";
import BookCardMedium from "../../components/book-card-medium";

const Books = () => {
  const [books, setBooks] = useState([])

  useEffect(() => {
    getAllBooksHandler()
  }, [])


  const getAllBooksHandler = async () => {
    const res = await getAllBooks();
    console.log(res);
    setBooks(res)
  }

  return (
    <PageLayout>
      <Title title="Books" />
      <div className="all-books-container">
        <div className="books-inner-container">
          {books.map(x => <BookCardMedium key={x.id} id={x.id} imageUrl={x.imageUrl} title={x.title} author={x.author} rating={x.rating} />)}
        </div>
      </div>
    </PageLayout>
  )
}

export default Books;