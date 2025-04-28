import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import http from "../../../service"
import IPrato from "../../../interfaces/IPrato"

const AdministracaoPratos = () => {

    const [pratos, setPratos] = useState<IPrato[]>([])

    useEffect(() => {
        http.get<IPrato[]>('pratos/')
            .then(resposta => setPratos(resposta.data))
    }, []);

    function excluir(prato: IPrato) {
        http.delete<IPrato>(`pratos/${prato.id}/`)
        .then(() => {
            const novaListaRestaurantes = pratos.filter(item => item.id !== prato.id);
            setPratos([ ...novaListaRestaurantes]);
        });
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
                            {prato.restaurante}
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