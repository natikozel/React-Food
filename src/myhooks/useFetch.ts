import React, {useEffect, useState} from 'react';
import {log} from "../log";

export interface FetchProps {
    isFetching?: boolean;
    error?: Error | undefined;
    data?: any;
    setIsFetching?: React.Dispatch<React.SetStateAction<boolean>>;
    setError?: React.Dispatch<React.SetStateAction<Error | undefined>>;
    setData?: React.Dispatch<React.SetStateAction<any>>;
}

export const useFetch = (fetchFn: Function, initialValue: unknown) => {

    log('<useFetch Hook is being used />', 2, 'other');


    const [data, setData] = useState<typeof initialValue>(initialValue);
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const [error, setError] = useState<Error>();

    useEffect(() => {
        async function fetchData(): Promise<void> {
            try {
                setIsFetching(true);
                const meals = await fetchFn();
                setData((prevData: typeof initialValue): typeof initialValue => {
                    return meals
                });
                setIsFetching(false);
            } catch (err) {
                if (err instanceof Error)
                    setError(err || new Error('Failed to fetch data'));
                setIsFetching(false);
            }
        }

        fetchData();

    }, [fetchFn]);


    return {
        data,
        setData,
        isFetching,
        setIsFetching,
        error,
        setError
    };

};
