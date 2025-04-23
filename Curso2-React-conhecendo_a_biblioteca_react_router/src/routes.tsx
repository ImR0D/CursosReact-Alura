
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Menu from 'components/Menu';
import PaginaPadrao from 'components/Header';
import Inicio from 'pages/Inicio';
import Cardapio from 'pages/Cardapio';
import Sobre from 'pages/Sobre';
import Footer from 'components/Footer';
import PageNotFound from 'pages/NotFound';
import Prato from 'pages/Prato';

export default function PageRoutes() {
  return (
    <main className='container'>
      <BrowserRouter>
        <Menu />
        <Routes>
          <Route path='/' element={<PaginaPadrao />}>
            <Route index element={<Inicio />} />
            <Route path='cardapio' element={<Cardapio />} />
            <Route path='sobre' element={<Sobre />} />
          </Route>
          <Route path='/prato/:id' element={<Prato />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </main>
  );
}
