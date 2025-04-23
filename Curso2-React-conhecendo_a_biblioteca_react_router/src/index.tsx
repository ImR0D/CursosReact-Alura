import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';
import './index.css';
import PageRoutes from 'routes';

ReactDOM.render(
  <React.StrictMode>
    <PageRoutes />
  </React.StrictMode>,
  document.getElementById('root')
);
