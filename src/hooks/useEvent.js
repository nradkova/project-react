import { useState } from 'react';


import { getEventById } from '../services/event';
import { signSubscription } from '../services/subscription';
import { commentDataValidation } from '../utils/validation';
import { createEventComment, getAllCommentsByEventId } from '../services/comment';

const initialEventValue = {
	id: "",
	name: "",
	date: "",
	location: "",
	description: "",
	imageUrl: "",
	status: "",
	createdAt: "",
	creator: "",
	subscriptionId: "",
	subscribed: [],
	dateObj: {}
};

const useEvent = (eventId, isAuthenticated, user) => {
	const [event, setEvent] = useState(initialEventValue);
	const [isLoading, setIsloading] = useState(false);
	const [canSubscribe, setCanSubscribe] = useState(false);
	const [comments, setComments] = useState([]);
	const [validationError, setValidationError] = useState(null);

	const isCreator = isAuthenticated && user.username === event.creator;

	useState(() => {
		async function fetchData() {
			setIsloading(true);
			const event = await getEventById(eventId);
			setIsloading(false);
			setEvent(event);
			if (isAuthenticated && user.username !== event.creator && !event.subscribed.includes(user.userId)) {
				setCanSubscribe(true);
			}
			// if (Boolean(user.username) && user.username !== book.creator) {
			// 	const canAdd = await userService.checkBookInUserReadingList(user.userId, bookId);
			// 	setCanAdd(canAdd);
			// }
			const comments = await getAllCommentsByEventId(eventId);
			setComments(comments);
		}
		fetchData()
	}, [eventId, user, isAuthenticated])


	const onClickAddEventHandler = async (e) => {
		e.preventDefault();
		await signSubscription(user.userId, event.subscriptionId, event.subscribed);
		setCanSubscribe(false);
	}

	const onSubmitCommentHandler = async (e) => {
		e.preventDefault();
		const text = e.target.comment.value;
		const error = commentDataValidation(text)
		if (error) {
			setValidationError(error);
			return;
		}
		if (validationError) {
			setValidationError(null);
		}
		await createEventComment(eventId, text);
		const updated = await getAllCommentsByEventId(eventId);
		setComments(updated);
		e.target.comment.value = '';
	}

	return {
		event,
		isLoading,
		isCreator,
		canSubscribe,
		comments,
		validationError,
		onClickAddEventHandler,
		onSubmitCommentHandler
	}
}

export default useEvent;