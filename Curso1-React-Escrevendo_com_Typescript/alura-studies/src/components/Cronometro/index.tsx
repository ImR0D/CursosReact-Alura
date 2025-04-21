import Botao from "../Buttons";
import Relogio from "./Relogio";

import style from './Cronometro.module.scss';
import ITarefa from "../types/tarefas";
import { useEffect, useState } from "react";
import { convTempoParaSegundos } from "../../utils/time";

interface Props {
    selecionado: ITarefa | undefined
    finalizarTarefa: () => void;
}

export default function Cronometro({ selecionado, finalizarTarefa }: Props) {

    const [tempo, setTempo] = useState<number>(0);
    
    useEffect(() => {
        if (selecionado?.tempo) {
            setTempo(convTempoParaSegundos(selecionado.tempo));
        }
    }, [selecionado])


    function contagemRegressiva(contador: number) {        
        setTimeout(() => {
            if (contador > 0) {
                setTempo(contador - 1);
                return contagemRegressiva(contador - 1);
            }
            finalizarTarefa();
        }, 1000)
    }

    return (
        <div className={style.cronometro}>
            <p className={style.titulo}>
                Escolha um card e inicie o cronômetro
            </p>
            <div className={style.relogioWrapper}>
                <div className={style.cronometroClock}>
                    <Relogio tempoEmSegundos={tempo} />
                </div>
                <div className={style.cronometroLabel}>
                    <span>Horas</span>
                    <span>Minutos</span>
                    <span>Segundos</span>
                </div>
            </div>
            <Botao onClick={() => contagemRegressiva(tempo)}>Começar</Botao>
        </div>
    )
}