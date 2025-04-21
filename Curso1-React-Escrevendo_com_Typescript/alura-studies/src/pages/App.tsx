import React, { useState } from 'react';
import Formulario from '../components/Forms';
import Lista from '../components/Lista';
import style from "./App.module.scss";
import Cronometro from '../components/Cronometro';
import ITarefa from '../components/types/tarefas';

function App() {
  const [tarefas, setTarefas] = useState<ITarefa[]>([]);
  const [selecionado, setSelecionado] = useState<ITarefa>();
  
  function selecionaTarefa(tarefaSelecionada: ITarefa) {
    setSelecionado(tarefaSelecionada);
    setTarefas(tarefas => tarefas.map(tarefa => ({
      ...tarefa,
      selecionado: tarefa.id === tarefaSelecionada.id
    }) ));
  }

  function finalizarTarefa() {
    if (selecionado) {
      setSelecionado(undefined);
      setTarefas(tarefas => tarefas.map(tarefa => {
        if (tarefa.id === selecionado.id)
          return {
            ...tarefa,
            selecionado: false,
            completado: true
          }
          return tarefa
      }))
    }
  }

  return (
    <div className={style.AppStyle}>
      <Formulario setTarefas={setTarefas} />
      <Lista 
        tarefas={tarefas} 
        selecionado={selecionaTarefa}
      />
      <Cronometro 
        selecionado={selecionado}
        finalizarTarefa={finalizarTarefa}
      />
    </div>
  );
}

export default App;
