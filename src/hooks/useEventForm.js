import { useState, useCallback } from 'react';

import { DEFAULT_EVENT_URL, INITIAL_EVENT_VALUE, INITIAL_EVENT_VALIDATION_ERROR } from '../common';

import uploadImage from '../services/image';
import { eventDataValidation } from '../utils/validation';
import { createBook, editBook, getBookById } from '../services/book';
import { createEvent } from '@testing-library/react';
import { editEvent, getEventById } from '../services/event';

const useEventForm = (date) => {
    const [isLoading, setIsloading] = useState(false);
    const [isImageLoading, setIsImageloading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [eventValue, setEventValue] = useState(INITIAL_EVENT_VALUE);
    const [validationError, setValidationError] = useState(INITIAL_EVENT_VALIDATION_ERROR);
    const [imagePreview, setImagePreview] = useState(DEFAULT_EVENT_URL);


    const onSubmitEventCreateHandler = (e) => {
        e.preventDefault();

        if (validationError.required) {
            setValidationError(prev => ({ ...prev, "required": null }))
        }

        const data = new FormData(e.target)
        const event = {
            name: data.get('name'),
            location: data.get('location'),
            description: data.get('description'),
            image: imagePreview,
            date: date
        }

        if (validationError.name || validationError.description
            || validationError.image || validationError.date) {
            return;
        }
        if (event.name === '' || event.description === '' || event.location === '') {
            setValidationError(prev => ({ ...prev, 'required': '*Title, description and location are required.' }))
            return;
        }

        createEvent(event)
            .then(res => {
                setIsloading(true);
                setEventValue(prev => ({ ...prev, res }));
                setIsSuccess(true);
            })
            .catch(err => console.log(err))

        eventFormReset();
    }

    const onSubmitEventEditHandler = (e) => {
        e.preventDefault();

        if (validationError.required) {
            setValidationError(prev => ({ ...prev, "required": null }))
        }

        const data = new FormData(e.target)
        const event = {
            name: data.get('name'),
            location: data.get('location'),
            description: data.get('description'),
            image: imagePreview,
            date: date
        }

        if (validationError.name || validationError.description
            || validationError.image || validationError.date) {
            return;
        }
        if (event.name === '' || event.description === '' || event.location === '') {
            setValidationError(prev => ({ ...prev, 'required': '*Title, description and location are required.' }))
            return;
        }

        editEvent(eventValue.id, event)
            .then(res => {
                setIsloading(true);
                setEventValue(prev => ({ ...prev, res }));
                setIsSuccess(true);
            })
            .catch(err => console.log(err))

        eventFormReset();
    }

    const onBlurInputHandler = (e) => {
        const value = e.target.value;
        const type = e.target.name;

        if (validationError.required) {
            setValidationError(prev => ({ ...prev, "required": null }))
        }

        const error = eventDataValidation(type, value);
        setValidationError(prev => ({ ...prev, [type]: error }))
        if (error) {
            return;
        }
    }

    const onChangeInputHandler = (e) => {
        const value = e.target.value;
        const type = e.target.name;

        if (validationError.required) {
            setValidationError(prev => ({ ...prev, "required": null }))
        }

        const error = eventDataValidation(type, value);
        setValidationError(prev => ({ ...prev, [type]: error }))
        if (error) {
            return;
        }
    }

    const onChangeImageHandler = (e) => {
        const value = e.target.files[0];

        const error = eventDataValidation('imageUrl', (value || ''));
        setValidationError(prev => ({ ...prev, 'image': error }))
        if (error) {
            return;
        }
        if (!value) {
            setImagePreview(DEFAULT_EVENT_URL);
        } else {
            setIsImageloading(true);
            uploadImage(value)
                .then(url => {
                    setIsImageloading(false);
                    setImagePreview(url);
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }

    const setInitialEventEditValue = useCallback((eventId) => {
        setIsloading(true);
        getEventById(eventId)
            .then(res => {
                setEventValue(res);
                setImagePreview(res.imageUrl)
                setIsloading(false);
            })
            .catch(err => console.log(err))
    }, [])

    const eventFormReset = () => {
        setValidationError(INITIAL_EVENT_VALIDATION_ERROR);
        setIsloading(false);
        setIsSuccess(false);
        setEventValue(INITIAL_EVENT_VALUE);
        setImagePreview(DEFAULT_EVENT_URL);
    }

    return {
        eventValue,
        isLoading,
        isImageLoading,
        isSuccess,
        validationError,
        imagePreview,
        onChangeImageHandler,
        onBlurInputHandler,
        onChangeInputHandler,
        onSubmitEventCreateHandler,
        setInitialEventEditValue,
        onSubmitEventEditHandler
    }
}

export default useEventForm;