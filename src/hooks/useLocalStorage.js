import { useState } from "react";

const useLocalStorage = (key, value) => {
    
    const localStorageItem = () => {
        try {
         const item = localStorage.getItem(key);
            return item
                ? JSON.parse(item)
                : value
        } catch (error) {
            console.log(error.message);
            return value;
        }
    }

    const [state, setState] = useState(localStorageItem());

    const setLocalStorageItem = (value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value))

            setState(value);
        } catch (error) {
            console.log(error.message);
        }
    }
    return [
        state, 
        setLocalStorageItem
    ]
};

export default useLocalStorage;