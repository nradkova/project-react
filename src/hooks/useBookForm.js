import { useState, useCallback } from 'react';

import { DEFAULT_BOOK_URL } from '../common';

import uploadImage from '../services/image';
import { bookDataValidation } from '../utils/validation';
import { createBook, editBook, getBookById } from '../services/book';

const useBookForm = (categories) => {

    const initialBookValue = {
        id: "",
        title: "",
        author: "",
        description: "",
        imageUrl: "",
        rating: "",
        createdAt: "",
        categories:[]
    }

    const initialValidationError = {
        title: null,
        author: null,
        image: null,
        description: null,
    };

    const [isLoading, setIsloading] = useState(false);
    const [isImageLoading, setIsImageloading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [bookValue, setBookValue] = useState(initialBookValue);
    const [validationError, setValidationError] = useState(initialValidationError);
    const [imagePreview, setImagePreview] = useState(DEFAULT_BOOK_URL);


    const onSubmitBookCreateHandler = (e) => {
        e.preventDefault();
        const data = new FormData(e.target)
        const book = {
            title: data.get('title'),
            author: data.get('author'),
            description: data.get('description'),
            category: categories,
            image: imagePreview
        }
        if (validationError.title || validationError.description 
            || validationError.image || validationError.author) {
            return;
        }
        createBook(book)
            .then(res => {
                setIsloading(true);
                setIsSuccess(true);
                setBookValue(pre=>({...pre,res}))
            })
            .catch(err => console.log(err))

            bookFormReset();
    }

    const onSubmitBookEditHandler = (e) => {
        e.preventDefault();
        const data = new FormData(e.target)
        const book = {
            title: data.get('title'),
            author: data.get('author'),
            description: data.get('description'),
            category: categories,
            image: imagePreview
        }
        if (validationError.title || validationError.description 
            || validationError.image || validationError.author) {
            return;
        }
        editBook(bookValue.id,book)
            .then(res => {
                setIsloading(true);
                setIsSuccess(true);
                setBookValue(pre=>({...pre,res}))
            })
            .catch(err => console.log(err))

        bookFormReset();
    }

    const onBlurInputHandler = (e) => {
        e.preventDefault();
        const value = e.target.value;
        const type = e.target.name;

        const error = bookDataValidation(type, value);
        setValidationError(prev => ({ ...prev, [type]: error }))
        if (error) {
            return;
        }
    }

    const onChangeInputHandler = (e) => {
        e.preventDefault();
        const value = e.target.value;
        const type = e.target.name;

        const error = bookDataValidation(type, value);
        setValidationError(prev => ({ ...prev, [type]: error }))
        if (error) {
            return;
        }
    }

    const onChangeImageHandler = (e) => {
        const value = e.target.files[0];
        
        const error =bookDataValidation('imageUrl', (value || ''));
        setValidationError(prev => ({ ...prev, 'image': error }))
        if (error) {
            return;
        }
        if (!value) {
            setImagePreview(DEFAULT_BOOK_URL);
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

    const setInitialBookEditValue = useCallback((bookId) => {
        setIsloading(true);
        getBookById(bookId)
        .then(res => {
            setBookValue(res);
            setImagePreview(res.imageUrl)
            setIsloading(false);
        })
        .catch(err => console.log(err))
    }, [])

    const bookFormReset = () => {
        setValidationError(initialValidationError);
        setIsloading(false);
        setIsSuccess(false);
        setBookValue(initialBookValue);
        setImagePreview(DEFAULT_BOOK_URL);
    }

    return{
        bookValue,
        isLoading,
        isImageLoading,
        isSuccess,
        validationError,
        imagePreview,
        onChangeImageHandler,
        onBlurInputHandler,
        onChangeInputHandler,
        onSubmitBookCreateHandler,
        setInitialBookEditValue,
        onSubmitBookEditHandler
    }
}

export default useBookForm;