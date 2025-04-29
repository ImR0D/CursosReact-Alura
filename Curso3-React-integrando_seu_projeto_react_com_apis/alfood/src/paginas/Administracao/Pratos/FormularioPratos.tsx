import http from "../../../service";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import IRestaurante from "../../../interfaces/IRestaurante";
import ITag from "../../../interfaces/ITag";
import { useParams } from "react-router-dom";
import IPrato from "../../../interfaces/IPrato";

const FormularioPrato = () => {
  const [nomePrato, setNomePrato] = useState("");
  const [descricao, setDescricao] = useState("");

  const [tag, setTag] = useState("");
  const [restaurante, setRestaurante] = useState("");

  const [imagem, setImagem] = useState<File | null>(null);
  const [imageURI, setImageURI] = useState<string>("");

  const [tags, setTags] = useState<ITag[]>([]);
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);

  const [isEditing, setIsEditing] = useState<Boolean>(false);

  const parametro = useParams();

  useEffect(() => {
    if (parametro.id) {
      setIsEditing(true);
      http.get<IPrato>(`pratos/${parametro.id}/`)
      .then( resposta => setImageURI(resposta.data.imagem) )
    } else {
      setIsEditing(false);
      setImageURI("https://st.depositphotos.com/1189140/1409/i/450/depositphotos_14095241-stock-photo-plate-fork-knife-white-empty.jpg");
    }
  }, [parametro]);

  useEffect(() => {
    http
      .get<{ tags: ITag[] }>("tags/")
      .then((resposta) => setTags(resposta.data.tags));
    http
      .get<IRestaurante[]>("restaurantes/")
      .then((resposta) => setRestaurantes(resposta.data));
  }, []);

  const selecionarArquivo = (evento: React.ChangeEvent<HTMLInputElement>) => {
    if (evento.target.files?.length) {
      setImagem(evento.target.files[0]);
    } else {
      setImagem(null);
    }
  };

  const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();

    const formData = new FormData();

    formData.append("nome", nomePrato);
    formData.append("descricao", descricao);

    formData.append("tag", tag);

    formData.append("restaurante", restaurante);

    if (imagem) {
      formData.append("imagem", imagem);
    }

    http
      .request({
        url: "pratos/",
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      })
      .then(() => {
        setNomePrato("");
        setDescricao("");
        setTag("");
        setRestaurante("");
        alert("Prato cadastrado com sucesso!");
      })
      .catch((erro) => console.log(erro));
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flexGrow: 1,
      }}
    >
      <Typography component="h1" variant="h6" sx={{mt: '1em'}}>
        Formulário de Pratos
      </Typography>

      <img src={imageURI} style={{ width: '40%', minWidth: '280px', margin: '1em' }} alt="Foto do prato" />

      <Box component="form" sx={{ width: "100%" }} onSubmit={aoSubmeterForm}>
        <TextField
          value={nomePrato}
          onChange={(evento) => setNomePrato(evento.target.value)}
          label="Nome do Prato"
          variant="outlined"
          fullWidth
          required
          margin="dense"
        />
        <TextField
          value={descricao}
          onChange={(evento) => setDescricao(evento.target.value)}
          label="Descrição do Prato"
          variant="outlined"
          fullWidth
          required
          margin="dense"
        />

        <FormControl margin="dense" fullWidth>
          <InputLabel id="select-tag">Tag</InputLabel>
          <Select
            label="select-tag"
            variant="outlined"
            color="success"
            value={tag}
            onChange={(evento) => setTag(evento.target.value)}
          >
            {tags.map((tag) => (
              <MenuItem key={tag.id} value={tag.value}>
                {tag.value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl margin="dense" fullWidth>
          <InputLabel id="select-restaurante">Restaurante</InputLabel>
          <Select
            label="select-restaurante"
            variant="outlined"
            color="success"
            value={restaurante}
            required
            onChange={(evento) => setRestaurante(evento.target.value)}
          >
            {restaurantes.map((restaurante) => (
              <MenuItem key={restaurante.id} value={restaurante.id}>
                {restaurante.nome}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <input style={{marginTop: '1em', marginBottom: '1em'}} type="file" onChange={selecionarArquivo} />

        <Button
          sx={{ marginTop: 1 }}
          type="submit"
          fullWidth
          variant="outlined"
          style={{padding: '0.5em', marginTop: '2em', marginBottom: '2em'}}
        >
          {isEditing ? "Editar" : "Salvar"}
        </Button>
      </Box>
    </Box>
  );
};

export default FormularioPrato;
