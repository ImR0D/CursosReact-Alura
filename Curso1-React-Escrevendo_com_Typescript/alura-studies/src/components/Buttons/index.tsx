import React from 'react';

import style from "./Buttons.module.scss";

export default class Botao extends React.Component<{ 
    type?: "button" | "submit" | "reset" | undefined, 
    children?: React.ReactNode }>
{
    render() {
        const { type = "button" } = this.props;
        return (
            <button type={type} className={style.botao}>
                {this.props.children}
            </button>    
        );
    }
}

