import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import http from "../../../service"
import IPrato from "../../../interfaces/IPrato"
import IRestaurante from "../../../interfaces/IRestaurante"

const AdministracaoPratos = () => {

    const [pratos, setPratos] = useState<IPrato[]>([])
    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);

    useEffect(() => {
        http.get<IRestaurante[]>('restaurantes/')
        .then( resposta => {
            setRestaurantes(resposta.data)
        })
        http.get<IPrato[]>('pratos/')
            .then(prato => {
                setPratos(prato.data)
            }
        )
    }, []);

    function excluir(prato: IPrato) {
        http.delete<IPrato>(`pratos/${prato.id}/`)
        .then(() => {
            const novaListaRestaurantes = pratos.filter(item => item.id !== prato.id);
            setPratos([ ...novaListaRestaurantes]);
        });
    }

    let restaurantePrato = restaurantes;
    function getNomeRestaurante(id: number) {
        let restaurante = restaurantePrato.find(restaurante => restaurante.id === id)
        return restaurante?.nome;
    }

    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Nome</TableCell>
                        <TableCell>Tag</TableCell>
                        <TableCell>Restaurante</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {pratos.map(prato => <TableRow key={prato.id}>
                        <TableCell>
                            {prato.nome}
                        </TableCell>
                        <TableCell>
                            {prato.tag}
                        </TableCell>
                        <TableCell>
                            {getNomeRestaurante(prato.restaurante)}
                        </TableCell>
                        <TableCell>
                            <Button sx={{mr: '0.5em', width: '85px'}} variant="outlined" color="info">
                                <Link to={`${prato.id}/`}>Editar</Link> 
                            </Button>
                            <Button sx={{mt: '0.2em', mr: '0.5em', width: '85px'}} variant="outlined" color="error" onClick={() => excluir(prato)} >Deletar</Button>
                        </TableCell>
                    </TableRow>)}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default AdministracaoPratos;