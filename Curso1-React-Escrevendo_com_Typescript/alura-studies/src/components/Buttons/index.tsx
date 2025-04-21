import React from 'react';

import style from "./Buttons.module.scss";

interface Props {
    type?: "button" | "submit" | "reset" | undefined, 
    children?: React.ReactNode,
    onClick? : () => void
}

export default function Botao({type, onClick, children}: Props) {
    return (
        <button onClick={onClick} type={type} className={style.botao}>
            {children}
        </button>    
    );
}