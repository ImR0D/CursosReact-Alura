
import style from "./Lista.module.scss";
import Item from "./Item";
import ITarefa from "../types/tarefas";

interface IProps {
    tarefas: ITarefa[],
    selecionado: (tarefaSelecionada: ITarefa) => void
}

export default function Lista({ tarefas, selecionado}: IProps) {
    return (
        <aside className={style.listaTarefas}>
            <h2>Estudos do dia</h2>
            <ul>
                {tarefas.map(item => 
                    <Item 
                        selecionaTarefa={selecionado}
                        key={item.id}
                        {...item}
                    />
                )}
            </ul>
        </aside>
    )
}   