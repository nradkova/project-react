import { useState, useEffect } from "react";

import './index.css';

import { getAllBooks } from "../../services/book";

import Title from "../../components/title";
import PageLayout from "../../components/pageLayout";
import BookCardMedium from "../../components/book-card-medium";
import { Link } from "react-router-dom";

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

  const onSubmitSearchHandler=(e)=>{
    e.preventDefault();
    const data =new FormData(e.target);
    const [value,category]=Array.from( data.values());
    console.log(value);
    console.log(category);
    e.target.reset();
  }

  const onClickInputHandler=(e)=>{
    const inputClass=e.target.parentNode.getAttribute('class');
    console.log(e.target.parentNode.getAttribute('class'));
   if(inputClass.includes('checked')){
     e.target.parentNode.classList.remove('checked');
   }else{
    e.target.parentNode.classList.add('checked');
   }
    console.log(e.target.parentNode);
  }

  return (
    <PageLayout>
      <Title title="Books" />
      <div className="all-books-container">
        <div className="search-container">
          <form action="" onSubmit={onSubmitSearchHandler}>
            <input className="main-input" type="text" placeholder="Search by key and criteria..." name="search" /><button className="search-btn" type="submit"> <i className="fa fa-search"></i></button>
            <div className="search-options-list">
              <div className="search-option popup-postedBy">
                <label className="search-options-label">
                  <input type="radio" className="popup-postedBy" name="search" defaultValue="postedBy" onClick={onClickInputHandler}/>
                  <i className="far fa-id-badge"></i>
                  <span className="popuptext-postedBy">POSTED BY</span>
                </label>
              </div>
              <div className="search-option popup-title">
                <label className="search-options-label">
                  <input type="radio" className="popup-title" name="search" defaultValue="title"  onClick={onClickInputHandler}/>
                  <i className="far fa-bookmark"></i>
                  <span className="popuptext-title">TITLE</span>
                </label>
              </div>
              <div className="search-option popup-author">
                <label className="search-options-label">
                  <input type="radio" className="popup-author" name="search" defaultValue="author"  onClick={onClickInputHandler}/>
                  <i className="far fa-edit"></i>
                  <span className="popuptext-author">BY AUTHOR</span>
                </label>
              </div>
              <div className="search-option popup-category">
                <label className="search-options-label">
                  <input type="radio" className="popup-category" name="search" defaultValue="category" onClick={onClickInputHandler} />
                  <i className="fas fa-list-ul"></i>
                  <span className="popuptext-category">BY CATEGORY</span>
                </label>
              </div>
            </div>
          </form>
        </div>
        {/* <div className="all-books-seach">
          <button className="search-my-books-posts" ><i className="fas fa-check"></i>POSTED BY ME</button>
          <button className="search-by-date" ><i className="fas fa-check"></i>BY DATE</button>
          <button className="search-by-date" to="/events/create"><i className="fas fa-check"></i>POST NEW EVENT</button>
        </div> */}
        <div className="books-inner-container">
          {books.map(x => <BookCardMedium key={x.id} id={x.id} imageUrl={x.imageUrl} title={x.title} author={x.author} rating={x.rating} />)}
        </div>
      </div>
    </PageLayout>
  )
}

export default Books;