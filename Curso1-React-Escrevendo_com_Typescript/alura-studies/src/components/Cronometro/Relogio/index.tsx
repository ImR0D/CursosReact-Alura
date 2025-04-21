
import { formatNumberInTwoDigits } from '../../../utils/time';
import style from './Relogio.module.scss';

interface Props {
    tempoEmSegundos: number
}


export default function Relogio({tempoEmSegundos = 0}: Props) {
    
    
    const hour = Math.floor((tempoEmSegundos / 60) / 60);
    const minute = Math.floor((tempoEmSegundos / 60) % 60);
    const second = Math.floor((tempoEmSegundos % 60));

    const [hourTen, hourUnit] = formatNumberInTwoDigits(hour);
    const [minuteTen, minuteUnit] = formatNumberInTwoDigits(minute);
    const [secondTen, secondUnit] = formatNumberInTwoDigits(second);

    return (
        <>
            <span className={style.relogioNumero}>{hourTen}</span>
            <span className={style.relogioNumero}>{hourUnit}</span>
            <span className={style.relogioDivisao}>:</span>
            <span className={style.relogioNumero}>{minuteTen}</span>
            <span className={style.relogioNumero}>{minuteUnit}</span>
            <span className={style.relogioDivisao}>:</span>
            <span className={style.relogioNumero}>{secondTen}</span>
            <span className={style.relogioNumero}>{secondUnit}</span>
        </>
    )
}