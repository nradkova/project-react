import { useState, useCallback } from 'react';

import { DEFAULT_EVENT_URL, INITIAL_EVENT_VALUE, INITIAL_EVENT_VALIDATION_ERROR, DEFAULT_LAG_LTD } from '../common';

import uploadImage from '../services/image';
import { eventDataValidation } from '../utils/validation';
import { createEvent, editEvent, getEventById } from '../services/event';


const useEventForm = () => {
    const [isLoading, setIsloading] = useState(false);
    const [isImageLoading, setIsImageloading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [point, setPoint] = useState(DEFAULT_LAG_LTD);
    const [eventValue, setEventValue] = useState(INITIAL_EVENT_VALUE);
    const [validationError, setValidationError] = useState(INITIAL_EVENT_VALIDATION_ERROR);
    const [imagePreview, setImagePreview] = useState(DEFAULT_EVENT_URL);

    const getGeoPoint = (point) => {
        setPoint(point);
    }

    const onSubmitEventCreateHandler = (e) => {
        e.preventDefault();

        if (validationError.required) {
            setValidationError(prev => ({ ...prev, "required": null }))
        }
        // if (validationError.name || validationError.description
        //     || validationError.image || validationError.date 
        //     || validationError.location ||validationError.required) {
        //     setValidationError(INITIAL_EVENT_VALIDATION_ERROR);
        // }

        const data = new FormData(e.target);
        const event = dataParser(data);
        event.image = imagePreview;
        event.status = 'active';
        event.location = point;

        const dateError = eventDataValidation('date', event.date);
        setValidationError(prev => ({ ...prev, 'date': dateError }));
        console.log(dateError);

        console.log(event);
        console.log(validationError);

        if (validationError.name || validationError.description
            || validationError.image || dateError) {
            // setValidationError(INITIAL_EVENT_VALIDATION_ERROR);
            return;
        }

        if (event.name === '' || event.description === ''
            || JSON.stringify(event.location) === JSON.stringify(DEFAULT_LAG_LTD)) {
            setValidationError(prev => ({ ...prev, 'required': '*Topic, description, date and location are required.' }))
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

        const data = new FormData(e.target);
        const event = dataParser(data);
        event.image = imagePreview;
        event.status = 'active';
        event.location = point;

        const dateError = eventDataValidation('date', event.date);
        setValidationError(prev => ({ ...prev, 'date': dateError }));

        if (validationError.name || validationError.description
            || validationError.image || dateError) {
            // setValidationError(INITIAL_EVENT_VALIDATION_ERROR);
            return;
        }

        if (event.name === '' || event.description === '') {
            setValidationError(prev => ({ ...prev, 'required': '*Topic, description, date and location are required.' }))
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

        console.log('b', value);
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
                setPoint(res.location)
                setImagePreview(res.imageUrl);
                setIsloading(false);
            })
            .catch(err => console.log(err))
    }, [])

    const eventFormReset = () => {
        setValidationError(INITIAL_EVENT_VALIDATION_ERROR);
        setIsloading(false);
        setIsSuccess(false);
        setPoint(DEFAULT_LAG_LTD);
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
        getGeoPoint,
        onChangeImageHandler,
        onBlurInputHandler,
        onChangeInputHandler,
        onSubmitEventCreateHandler,
        setInitialEventEditValue,
        onSubmitEventEditHandler
    }
}

export default useEventForm;

// const dateParser = (data) => {
//     const year = data.get('year');
//     const month = ('0' + data.get('month')).slice(-2);
//     const day = ('0' + data.get('day')).slice(-2);
//     const hour = ('0' + data.get('hour')).slice(-2);
//     const minute = ('0' + data.get('minute')).slice(-2);
//     const dataStr=`${year}-${month}-${day}T${hour}:${minute}:00`;
//     console.log(dataStr);
//     const date = Date.parse(dataStr);
//     const date =new Date(year,month,day,hour,minute,0);
//     return date;
// }

const dataParser = (data) => {
    const monthInput = Number(data.get('month')) - 1;
    const year = data.get('year');
    const month = ('0' + monthInput).slice(-2);
    const day = ('0' + data.get('day')).slice(-2);
    const hour = ('0' + data.get('hour')).slice(-2);
    const minute = ('0' + data.get('minute')).slice(-2);
    const date = new Date(year, month, day, hour, minute, 0);
    console.log(year, month);
    const event = {
        name: data.get('name'),
        location: data.get('location'),
        description: data.get('description'),
        date: date,
        status: data.get('status') || 'active'
    }
    return event;
}