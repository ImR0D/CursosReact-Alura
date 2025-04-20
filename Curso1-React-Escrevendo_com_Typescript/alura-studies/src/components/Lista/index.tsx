
import style from "./Lista.module.scss";
import Item from "./Item";
import ITarefa from "../types/tarefas";

export default function Lista({ tarefas }: { tarefas: ITarefa[]}) {
    return (
        <aside className={style.listaTarefas}>
            <h2>Estudos do dia</h2>
            <ul>
                {tarefas.map((item, itemID) => 
                    <Item key={itemID}
                        {...item}
                    />
                )}
            </ul>
        </aside>
    )
}