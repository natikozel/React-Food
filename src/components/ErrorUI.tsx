import {log} from "../log";

export interface ErrorUIProps {
    err: Error
}

export const ErrorUI = ({err}: ErrorUIProps) => {
    log('<ErrorUI /> rendered', 3);
    console.log(err);

    return (
        <>
            <h1>An Error Occurred</h1>
            <p>{err.message}</p>
        </>
    );
};