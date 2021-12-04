import { useState, useEffect, useContext } from "react";
import { Link } from 'react-router-dom'
import BookCardBrief from "../../components/book-card-brief";
import PageLayout from "../../components/pageLayout";
import Title from "../../components/title";
import AuthContext from "../../context/authContext";
import authServices from "../../services/auth";

import './index.css';

const MyPage = () => {

	const { user } = useContext(AuthContext);
	const [readingList,setReadingList]=useState([])

	useEffect(()=>{
		const fetchData=async()=>{
		 const readingList=	await authServices.getUserReadingList(user.userId)
		 setReadingList(readingList)
		}
		fetchData()

	},[])

	return (
		<PageLayout>
			<Title title='My Page' />
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