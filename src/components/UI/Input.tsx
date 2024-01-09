export interface InputProps {
    label: string;
    type: string;
    id: string;
}

export const Input = ({label, type, id}: InputProps) => {
    return (
        <div className="control">
            <label htmlFor={id}>{label}</label>
            <input type={type} id={id} name={id}></input>
        </div>
    );
};