import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Box,
  Button,
  Link,
} from "@mui/material";
import { ReactNode } from "react";
import { Outlet, Link as RouterLink } from "react-router-dom";

const buttons = [
  {
    bid: 1,
    label: 'Exibir Restaurantes',
    link: '/admin/restaurantes',
  },
  {
    bid: 2,
    label: 'Cadastrar Restaurante',
    link: '/admin/restaurantes/novo'
  },
  {
    bid: 3,
    label: 'Exibir Pratos',
    link: '/admin/pratos/'
  },
  {
    bid: 4,
    label: 'Cadastrar Prato',
    link: '/admin/pratos/novo'
  }
]


export default function AdminPanel(children?: ReactNode) {
  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar>
            <Typography variant="h6">Administração</Typography>
            <Box sx={{ display: "flex", flexGrow: 1, mx: 4, px: 1 }}>
              {
                buttons.map(button => { 
                  return(
                  <Link component={RouterLink} to={button.link} key={button.bid}>
                  <Button sx={{ px: 2, color: "whitesmoke" }}>
                    {button.label}
                  </Button>
                </Link>
                )})
              }
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Box 
        sx={{
          m: 3,
          display: "flex",
          justifyContent: "center",
          alignItems: 'stretch',
          border: 'none'
        }}
      >
        <Container sx={{ display: 'flex', flexDirection: 'column', width: '70%', borderRadius: '10px', boxShadow: '0 0 4px 0px #888'}}>
          <Outlet />
        </Container>
      </Box>
    </>
  );
}
