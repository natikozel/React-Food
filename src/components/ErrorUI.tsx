import {log} from "../log";

export interface ErrorUIProps {
    title: string;
    err: Error;
}

export const ErrorUI = ({title, err}: ErrorUIProps) => {
    log('<ErrorUI /> rendered', 3);
    console.log(err);

    return (
        <div className="error">
            <h2>{title}</h2>
            <p>{err.message}</p>
        </div>
    );
};