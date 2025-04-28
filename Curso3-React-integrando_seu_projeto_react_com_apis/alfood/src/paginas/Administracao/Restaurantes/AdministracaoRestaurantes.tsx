import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { useEffect, useState } from "react"
import IRestaurante from "../../../interfaces/IRestaurante"
import { Link } from "react-router-dom"
import http from "../../../service"

const AdministracaoRestaurantes = () => {

    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])

    useEffect(() => {
        http.get<IRestaurante[]>('restaurantes/')
            .then(resposta => setRestaurantes(resposta.data))
    }, []);

    function excluir(restaurante: IRestaurante) {
        http.delete<IRestaurante>(`restaurantes/${restaurante.id}/`)
        .then(() => {
            const novaListaRestaurantes = restaurantes.filter(item => item.id !== restaurante.id);
            setRestaurantes([ ...novaListaRestaurantes]);
        });
    }

    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell>Nome</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {restaurantes.map(restaurante => <TableRow key={restaurante.id}>
                        <TableCell>
                            {restaurante.id}
                        </TableCell>
                        <TableCell>
                            {restaurante.nome}
                        </TableCell>
                        <TableCell>
                            <Button sx={{mr: '0.5em', width: '85px'}} variant="outlined" color="info">
                                <Link to={`${restaurante.id}/`}>Editar</Link> 
                            </Button>
                            <Button sx={{mr: '0.5em', width: '85px'}} variant="outlined" color="error" onClick={() => excluir(restaurante)} >Deletar</Button>
                        </TableCell>
                    </TableRow>)}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default AdministracaoRestaurantes