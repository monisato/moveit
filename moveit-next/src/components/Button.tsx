import { useState } from 'react';

// type 
interface ButtonProps {
    color: string;
    children: string;
}


export function Button(props: ButtonProps) {
    const [counter, setCounter] = useState(1)
    // react não altera o valor de uma variavel, cria um novo valor

    function increment() {
        setCounter(counter + 1)
    }
    
    // style= {{ xxx }} primeira chaves para indicar js e segunda para indicar objeto
    return (
        <button 
            type="button" 
            style={{backgroundColor: props.color}}
            onClick={increment}
        > 
            {props.children} <strong>{counter}</strong>
        </button>
    );
}