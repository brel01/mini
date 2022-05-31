import React from 'react';

interface NameInputProps {
    submitName(name: string): void;
}

export const NameInput: React.FC<NameInputProps> = ({ submitName }) => {
    const [name, setName] = React.useState("")

    const updateName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    }

    const onLoginClick = () => {
        if (name.length > 0) {
            submitName(name);
            setName("");
        }        
    }
    return (
        <>
            <div className="inputBox">
                <input onChange={updateName} value={name} type="text" name="note" placeholder="Name" />
                <button onClick={onLoginClick}>Login</button>
            </div>
        </>
    )
}