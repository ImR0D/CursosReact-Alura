import React, { useState } from 'react';
import Botao from '../Buttons';
import style from "./Forms.module.scss";
import ITarefa from '../types/tarefas';

import { v4 as uuidv4 } from "uuid";

interface Props {
    setTarefas?: React.Dispatch<React.SetStateAction<ITarefa[]>> 
}

export default function Formulario( { setTarefas }: Props) {
    
    const [tarefa, setTarefa] = useState("");
    const [tempo, setTempo] = useState('00:00:00');

    function adicionarTarefa(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (setTarefas) {
            setTarefas(tarefas => [ ...tarefas, { 
                tarefa,
                tempo,
                selecionado: false,
                completado: false,
                id: uuidv4()
            }]);
        }
        setTarefa("");
        setTempo("00:00:00");
    }

    return (
        <form className={style.novaTarefa} onSubmit={adicionarTarefa}>
            <div className={style.inputContainer}>
                <label htmlFor='tarefa'>Adicione um novo estudo</label>
                <input 
                    type="text" 
                    name="tarefa" 
                    id="tarefa" 
                    placeholder="O que você quer estudar" 
                    value={tarefa}
                    onChange={evento => setTarefa(evento.target.value)}
                    required 
                />
            </div>
            <div className={style.inputContainer}>
                <label htmlFor="tempo">Tempo</label>
                <input 
                    type="time" 
                    step="1" 
                    name="tempo" 
                    id="tempo" 
                    min="00:00:00" max="23:59:59" 
                    value={tempo} 
                    onChange={evento => setTempo( evento.target.value )}
                    required />
            </div>
            <Botao type="submit">Adicionar</Botao>
        </form>
    );
}