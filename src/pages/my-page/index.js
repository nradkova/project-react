import { Link } from 'react-router-dom';
import { useState, useEffect, useContext } from "react";

import './index.css';

import userService from "../../services/user";
import AuthContext from "../../context/authContext";

import Title from "../../components/title";
import PageLayout from "../../components/pageLayout";
import BookCardBrief from "../../components/book-card-brief";


const MyPage = () => {
	const { user } = useContext(AuthContext);
	const [readingList,setReadingList]=useState([])

	useEffect(()=>{
		const fetchData=async()=>{
		 const readingList=	await userService.getUserReadingList(user.userId)
		 setReadingList(readingList)
		}
		fetchData()

	},[user.userId])

	return (
		<PageLayout>
			<Title title={user.username.toLocaleUpperCase()+ ' \'s page'} />
			<div className="my-page-navigation">
				<Link className="create-book-link" to="/books/create"><i className="fas fa-plus"></i>NEW BOOK</Link>
				<Link className="create-event-link" to="/events/create"><i className="fas fa-plus"></i>NEW EVENT</Link>
			</div>
			<div>
			{readingList.map(x => <BookCardBrief key={x.id} id={x.id} imageUrl={x.imageUrl} title={x.title} author={x.author} rating={x.rating} />)}
			</div>
		</PageLayout>
	)
}

export default MyPage;