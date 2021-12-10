import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from "react";

import './index.css';

import userService from "../../services/user";
import AuthContext from "../../context/authContext";

import Title from "../../components/title";
import PageLayout from "../../components/pageLayout";
import BookCardLite from '../../components/book-card-lite';


const MyPage = () => {
	const { userId } = useParams();
	const { user } = useContext(AuthContext);
	const [readingList, setReadingList] = useState([])
	const [viewReadingList, setViewReadingList] = useState([])
	const [bookSliderCounter, setBookSliderCounter] = useState(0);
	const[isDisabledIncreaseButton,setIsDisabledIncreaseButton]=useState(false);
	const[isDisabledDecreaseButton,setIsDisabledDecreaseButton]=useState(true);


	useEffect(() => {
		const fetchData = async () => {
			const fetchedReadingListData = await userService.getUserReadingList(userId);
			console.log(fetchedReadingListData);
			setReadingList(fetchedReadingListData);
			setViewReadingList(fetchedReadingListData.slice(0, 3))
		}
		fetchData()

	}, [userId])

	const increaseCounter = (e) => {
		setBookSliderCounter(bookSliderCounter => bookSliderCounter + 3);
		setViewReadingList(x=>readingList.slice(bookSliderCounter, bookSliderCounter + 3));
		console.log(bookSliderCounter);
		const next = (bookSliderCounter + 3);
		if (next >= readingList.length) {
			setIsDisabledIncreaseButton(true);
			// return;
		}
		setIsDisabledDecreaseButton(false);
	}

	const decreaseCounter = (e) => {
		setBookSliderCounter(bookSliderCounter => bookSliderCounter - 3);
		setViewReadingList(x=>readingList.slice(bookSliderCounter-3, bookSliderCounter));
		console.log(bookSliderCounter);
		const next = (bookSliderCounter - 3);
		if (next <= 2) {
			setIsDisabledDecreaseButton(true);
			// return;
		}
		setIsDisabledIncreaseButton(false);
	}

	return (
		<PageLayout>
			<Title title={user.username.toLocaleUpperCase() + ' \'s page'} />
			<div className="my-page-container">

				<div className="my-page-navigation">
					<Link className="create-book-link" to="/books/create"><i className="fas fa-plus"></i>POST NEW BOOK</Link>
					<Link className="create-event-link" to="/events/create"><i className="fas fa-plus"></i>POST NEW EVENT</Link>
				</div>
				<div className="my-page-events-list">
					<h3 className="my-page-events-list-title">MY EVENT SCHEDULE</h3>
				</div>
				<div className="my-page-reading-list">
					<h3 className="my-page-reading-list-title">MY READING LIST</h3>
					{readingList.length > 0
						? <div className="my-page-reading-list-items-container">
							<button className="prev" disabled={isDisabledDecreaseButton} onClick={decreaseCounter}>&#10094;</button>
							<div className="my-page-reading-list-items">
								{viewReadingList.map(x => <BookCardLite key={x.id} userId={userId} bookId={x.id} imageUrl={x.imageUrl} title={x.title} author={x.author} rating={x.rating} />)}
							</div>
							<button className="next" disabled={isDisabledIncreaseButton} onClick={increaseCounter}>&#10095;</button>
						</div>
						: <p>You have not added anything to your reading list.</p>
					}
				</div>
			</div>
		</PageLayout>
	)
}

export default MyPage;