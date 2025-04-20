
import style from './../Lista.module.scss';

export default function Item({tarefa, tempo}: {tarefa: string, tempo: string}) {

    //const displayOption: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
    return (
        <li className={style.item}>
            <h3>{tarefa}</h3>
            <span>{tempo}</span>
        </li>
    );
}