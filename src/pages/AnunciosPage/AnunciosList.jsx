// src/pages/AnunciosPage/AnunciosList.jsx
import React from 'react';
import anunciosStyles from './anuncios.module.css';

const AnunciosList = ({ anuncios }) => {
  return (
    <table className={anunciosStyles.anunciosTable}>
      <thead>
        <tr>
          <th>Data</th>
          <th>ID</th>
          <th>Título do Anúncio</th>
          <th>Estoque</th>
          <th>Preço</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {anuncios.map((anuncio) => (
          <tr key={anuncio.id} className={anunciosStyles.anuncioRow}>
            <td>{new Date(anuncio.date_created).toLocaleDateString()}</td>
            <td>{anuncio.id}</td>
            <td>{anuncio.title}</td>
            <td>{anuncio.available_quantity}</td>
            <td>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(anuncio.price)}</td>
            <td>{anuncio.listing_type_id}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AnunciosList;
