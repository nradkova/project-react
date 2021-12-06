import { useState, useEffect } from 'react';


function useFetch(service,params) {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
   

    const setFetchedData = async (params) => {
        setIsLoading(true);

        try {
            const fetchedData = await service(...params);
            
            setData(prevState => [...prevState, ...fetchedData]);

        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        setFetchedData(params);
    },params)

    return { data,isLoading, error };

}

export default useFetch;