import React from 'react';
import Botao from '../Buttons';
import style from "./Forms.module.scss";
import ITarefa from '../types/tarefas';

export default class Formulario extends React.Component<{
   setTarefas: React.Dispatch<React.SetStateAction<ITarefa[]>>
}> {
    state = {
        tarefa: "",
        tempo: "00:00"
    }

    adicionarTarefa(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        this.props.setTarefas(tarefas => [...tarefas, { ...this.state }])
    }

    render() {
        return (
            <form className={style.novaTarefa} onSubmit={this.adicionarTarefa.bind(this)}>
                <div className={style.inputContainer}>
                    <label htmlFor='tarefa'>Adicione um novo estudo</label>
                    <input 
                        type="text" 
                        name="tarefa" 
                        id="tarefa" 
                        placeholder="O que você quer estudar" 
                        value={this.state.tarefa}
                        onChange={evento => this.setState( { ...this.state, tarefa: evento.target.value })}
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
                        min="00:00:00" max="04:00:00" 
                        value={this.state.tempo} 
                        onChange={evento => this.setState( {...this.state, tempo: evento.target.value} )}
                        required />
                </div>
                <Botao type="submit">Adicionar</Botao>
            </form>
        );
    }
}