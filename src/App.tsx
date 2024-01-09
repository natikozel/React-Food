import React from 'react';
import './App.css';
import {Container} from "./components/Container";
import {log} from "./log";

function App(): React.JSX.Element {
    log('<App /> rendered');

    return (
        <>
        <Container/>
        </>
    );

}

export default App;
