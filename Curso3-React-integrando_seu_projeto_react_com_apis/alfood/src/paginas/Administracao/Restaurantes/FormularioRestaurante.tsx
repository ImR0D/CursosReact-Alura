import { Box, Button, FormControl, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import IRestaurante from "../../../interfaces/IRestaurante";
import http from "../../../service";

const FormularioRestaurante = () => {
  const [nomeRestaurante, setNomeRestaurante] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const navigate = useNavigate();

  const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    if (parametros.id) {
      setIsEditing(true);
      http
        .patch(`restaurantes/${parametros.id}/`, {
          nome: nomeRestaurante,
        })
        .then(() => {
          alert("Restaurante atualizado com sucesso!");
        })
        .catch((error) => console.log("Erro ao realizar ação"));
      setTimeout(() => navigate(-1), 700);
      return;
    }

    http
      .post("restaurantes/", {
        nome: nomeRestaurante,
      })
      .then(() => {
        alert("Restaurante cadastrado com sucesso!");
        setTimeout(() => navigate("/admin/restaurantes"), 700);
      })
      .catch((error) => console.log("Erro ao realizar ação"));
  };

  const parametros = useParams();
  useEffect(() => {
    setIsEditing(false);
    if (parametros.id) {
      setIsEditing(true);
      http
        .get<IRestaurante>(`restaurantes/${parametros.id}/`)
        .then((resposta) => setNomeRestaurante(resposta.data.nome));
    }
  }, [parametros]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          justifyContent: "center",
          textAlign: 'center',
          width: '100%'
        }}
      >
        <Typography component="h1" variant="h6">
          Formulário de restaurantes
        </Typography>
        <FormControl
          variant="standard"
          component={"form"}
          onSubmit={aoSubmeterForm}
          sx={{ m: "3em" }}
        >
          <TextField
            value={nomeRestaurante}
            onChange={(evento) => setNomeRestaurante(evento.target.value)}
            label="Nome do Restaurante"
            variant="outlined"
            color="success"
            sx={{ my: "1em" }}
            required
          />
          <Button
            type="submit"
            variant="outlined"
            color="success"
            sx={{ borderRadius: 0 }}
          >
            {isEditing ? "Editar" : "Salvar"}
          </Button>
        </FormControl>
      </Box>
    </>
  );
};

export default FormularioRestaurante;
