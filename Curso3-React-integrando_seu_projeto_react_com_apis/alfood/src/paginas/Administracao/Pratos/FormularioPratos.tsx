import { Box, Button, FormControl, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import http from "../../../service";
import IPrato from "../../../interfaces/IPrato";

const FormularioPratos = () => {
  const [nomePrato, setNomePrato] = useState("");
  const [descricaoPrato, setDescricaoPrato] = useState("");
  const [idRestaurantePrato, setIdRestaurantePrato] = useState<number>();
  const [isEditing, setIsEditing] = useState(false);

  const navigate = useNavigate();

  const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    if (parametros.id) {
      setIsEditing(true);
      http
        .patch(`pratos/${parametros.id}/`, {
          nome: nomePrato,
          descricao: descricaoPrato,
          restaurante: idRestaurantePrato
        })
        .then(() => {
          alert("Prato atualizado com sucesso!");
        })
        .catch((error) => console.log("Erro ao realizar ação"));
      setTimeout(() => navigate(-1), 700);
      return;
    }

    http
      .post("pratos/", {
        nome: nomePrato,
        descricao: descricaoPrato,
        restaurante: idRestaurantePrato
      })
      .then(() => {
        alert("Prato cadastrado com sucesso!");
        setTimeout(() => navigate("/admin/pratos"), 700);
      })
      .catch((error) => console.log("Erro ao realizar ação"));
  };

  const parametros = useParams();
  useEffect(() => {
    setIsEditing(false);
    if (parametros.id) {
      setIsEditing(true);
      http
        .get<IPrato>(`pratos/${parametros.id}/`)
        .then((resposta) => {
          setNomePrato(resposta.data.nome)
          setDescricaoPrato(resposta.data.descricao)
          setIdRestaurantePrato(resposta.data.restaurante)
        }
      );
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
          Formulário de pratos de restaurantes
        </Typography>
        <FormControl
          variant="standard"
          component={"form"}
          onSubmit={aoSubmeterForm}
          sx={{ m: "3em" }}
        >
          <TextField
            value={nomePrato}
            onChange={(evento) => setNomePrato(evento.target.value)}
            label="Nome do Prato"
            variant="outlined"
            color="success"
            sx={{ my: "1em" }}
            required
          />
          <TextField
            value={descricaoPrato}
            onChange={(evento) => setDescricaoPrato(evento.target.value)}
            label="Descricao"
            variant="outlined"
            color="success"
            sx={{ my: "1em" }}
            required
          />
          <TextField
            value={idRestaurantePrato}
            onChange={(evento) => setIdRestaurantePrato(Number(evento.target.value))}
            label="Id do Restaurante"
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

export default FormularioPratos;
