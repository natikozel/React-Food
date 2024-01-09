import React, {useCallback, useState} from 'react';
import {log} from "../log";
import {OrderProps} from "../components/Checkout";

export interface PostProps {
    sendRequest: Function;
    isLoading?: boolean;
    error?: Error | undefined;
    data?: any;
    setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>;
    setError?: React.Dispatch<React.SetStateAction<Error | undefined>>;
    setData?: React.Dispatch<React.SetStateAction<any>>;
}

export interface ConfigProps {
    method: string;
    headers: { "Content-Type": string };
}


export const usePost = (url: string, config: ConfigProps): PostProps => {

        log('<usePost Hook is being used />', 2, 'other');


        const [data, setData] = useState<string>('');
        const [isLoading, setIsLoading] = useState<boolean>(false);
        const [error, setError] = useState<Error>();

        const sendRequest = useCallback(async function (order: OrderProps): Promise<void> {
            log('<HTTP Post happening... />', 2, 'other');

            try {
                setIsLoading(true);
                const response: Response = await fetch(url, {
                    ...config,
                    body: JSON.stringify({order})
                });
                if (!response.ok)
                    throw new Error('Failed to post new order');

                setData(await response.json());
                setIsLoading(false);
            } catch (err) {
                if (err instanceof Error)
                    setError(err || new Error('Failed to fetch data'));
                setIsLoading(false);
            }

        }, [url, config]);


        return {
            sendRequest,
            data,
            setData,
            isLoading,
            setIsLoading,
            error,
            setError
        };

    }
;
