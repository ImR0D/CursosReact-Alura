
import styles from './Prato.module.scss';
import { useNavigate, useParams } from 'react-router-dom';

import cardapio from 'data/cardapio.json';
import PageNotFound from 'pages/NotFound';
import TagsPrato from 'components/TagsPrato';
import PaginaPadrao from 'components/Header';


export default function Prato() {
  const navigate = useNavigate();

  const { id } = useParams();
  const prato = cardapio.find(item => item.id === Number(id));

  if (!prato) return <PageNotFound />;

  return (
    <PaginaPadrao>
      <button onClick={() => navigate(-1)} className={styles.voltar}>
        {'< voltar'}
      </button>
      <section className={styles.container}>
        <h1 className={styles.titulo}>{prato.title}</h1>
        <div className={styles.imagem}>
          <img src={prato.photo} alt={prato.title} />
        </div>
        <div className={styles.conteudo}>
          <p className={styles.conteudo__descricao}>{prato.description}</p>
        </div>
        <TagsPrato {...prato}/>
      </section>
    </PaginaPadrao>
  );
}