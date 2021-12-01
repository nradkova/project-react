import { useState, useEffect } from "react";
import './index.css';
import PageLayout from "../../components/pageLayout";
import { getLastFourBooks, getMostLikedBooks } from "../../services/books";
import BookCardBrief from "../../components/book-card-brief";


const Home = () => {
  const [books, setBooks] = useState([])
  const [labelLatestBooks, setLabelLatestBooks]=useState('selected')
  const [labelLikedBooks, setLabelLikedBooks]=useState('')
  const [labelUpcomingEvents, setUpcomingEvents]=useState('selected')
  const [labelPopularEvents, setPopularEvents]=useState('')


  useEffect(() => {
    latestBooksHandler()
    setLabelLatestBooks('selected')
  }, [])


  const mostLikedBooksHandler=async(e)=>{
    const res = await getMostLikedBooks();
    setBooks(res)
    setLabelLikedBooks('selected')
    setLabelLatestBooks('')
  }
  
  const latestBooksHandler=async(e)=>{
    const res = await getLastFourBooks();
    // setBooks(res)
    setBooks([])
    setLabelLatestBooks('selected')
    setLabelLikedBooks('')
  }

  return (
    <PageLayout>
      <div className="inner-container">
        <section className="inner-container-text">
          <h3>READING IS AN EMOTION THAT CAN BE SHARED.</h3>
          <h1 className="read-aloud-header">&gt;&gt;&gt; read aloud &lt;&lt;&lt; </h1>
          <h3> IS A PLACE TO </h3>
          <h3> PRESENT YOUR FAVOURITE BOOKS AND FIND FRIENDS.</h3>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus nulla sequi ipsam modi quas doloribus a impedit quibusdam id numquam officia commodi voluptate maxime nihil assumenda temporibus, voluptatem accusantium minus?
        </section>
        <section className="inner-container-img">
          <img src="reading-time.jpg" alt="Reading Time" />
        </section>
      </div>
      <div className="inner-container-books-events">
        <section className="inner-container-books">
        {books.length > 0
          ? <div className="label-container">
            <p className={`label ${labelLatestBooks}`} onClick={latestBooksHandler}>LATEST BOOKS</p>
            <p className={`label ${labelLikedBooks}`} onClick={mostLikedBooksHandler}>MOST LIKED BOOKS</p>
          </div>
          : <h3>No books yet...</h3>
        }
        <div className="books-container">
          {books.map(x => <BookCardBrief key={x.id} id={x.id} imageUrl={x.imageUrl} title={x.title} author={x.author} rating={x.rating} />)}
        </div>
        </section>
        <section className="inner-container-events">
        {books.length > 0
          ? <div className="label-container">
            <p className={`label ${labelUpcomingEvents}`}>UPCOMING EVENTS</p>
            <p className={`label ${labelPopularEvents}`}>POPULAR EVENTS</p>
          </div>
          : <h3>No events yet...</h3>
        }
        <div className="events-container">
          {books.map(x => <BookCardBrief key={x.id} imageUrl={x.imageUrl} title={x.title} author={x.author} rating={x.rating} />)}
        </div>
        </section>
      </div>
    </PageLayout>
  )
}

export default Home;