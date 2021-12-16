import { useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";

import './index.css';

import AuthContext from "../../context/authContext";
import useEventForm from "../../hooks/useEventForm";

import Loader from "../../components/loader";
import Category from "../../components/category";
import PageLayout from "../../components/page-layout";
import ValidationError from "../../components/validation-error";

const EventCreate = () => {
	const navigate = useNavigate();
	const { user } = useContext(AuthContext);

	const categories = [];
	const {
		isLoading,
		isImageLoading,
		isSuccess,
		validationError,
		imagePreview,
		onChangeImageHandler,
		onBlurInputHandler,
		onSubmitEventCreateHandler
	} = useEventForm(categories);


	useEffect(() => {
		if (isSuccess) {
			navigate('/events');
		}
	}, [isSuccess, navigate])

	if (isLoading) {
		return (
		  <PageLayout>
			<Loader />
		  </PageLayout>
		)
	  }

	return (
		<PageLayout>
			<div className="event-form-container">
				<div className="event-form-title">
					<h3><i className="fa fa-arrow-right"></i>New event</h3>
				</div>
				<form className="event-form-body" onSubmit={onSubmitEventCreateHandler}>
					<div className="event-form-body-main">
						<div className="title">
							<input className="title-input" type="text" name="title" id="title" onBlur={onBlurInputHandler} />
							<label htmlFor="title"><i className="fa fa-pen"></i>Title</label>
							{validationError.title && <ValidationError message={validationError.title} />}
						</div>
						<div className="author">
							<input className="author-input" type="text" name="author" id="author" onBlur={onBlurInputHandler} />
							<label htmlFor="title"><i className="fa fa-pen"></i>Author</label>
							{validationError.author &&  <ValidationError message={validationError.author} />}
						</div>
						<div className="default-image">
							{isImageLoading ? <Loader /> : <img src={imagePreview} alt="event_Image" />}
							
						</div>
						<div className="image">
							<input className="image-input" type="file" accept="image/*" lang="en" name="imageUrl" id="imageUrl" onChange={onChangeImageHandler} />
							<label htmlFor="image"><i className="fas fa-image"></i>Image</label>
							{validationError.image && <ValidationError message={validationError.image} />}
						</div>
					</div>
					<div className="event-form-body-details">
						<div className="description">
							<textarea className="description-input" type="text" name="description" id="description" cols="50" rows="12" onBlur={onBlurInputHandler} />
							<label htmlFor="description"><i className="fa fa-pen"></i>Description</label>
							{validationError.description && <ValidationError message={validationError.description} />}
						</div>
						<Category selectedCategories={categories} />
					</div>
					<div className="event-form-footer">
						<div className="recommend">
							<p>Recommended by</p>
							<h3>{user.username}</h3>
						</div>
						<div className="action">
							<button className="action-btn" type="submit">Add to events</button>
						</div>
						{validationError.required && <ValidationError message={validationError.required} />}
					</div>
				</form>
			</div>
		</PageLayout>
	)
}

export default EventCreate;
