export function convTempoParaSegundos(tempo: string) {
    const [horas = 0, minutos = 0, segundos = 0] = tempo.split(":")
    return ((Number(horas) * 60 * 60) + (Number(minutos) * 60) + Number(segundos))
}

export function formatNumberInTwoDigits(num: number): String {
    return String(Intl.NumberFormat('pt-BR', { minimumIntegerDigits: 2 }).format(num))
}