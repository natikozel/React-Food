export interface InputProps {
    label: string;
    type: string;
    id: string;
}

export const Input = ({label, id, ...props}: InputProps) => {
    return (
        <p className="control">
            <label htmlFor={id}>{label}</label>
            <input required id={id} name={id} {...props}></input>
        </p>
    );
};