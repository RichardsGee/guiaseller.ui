// src/components/Blured.jsx
import React, { useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import styles from './Blured.module.css';

function Blured({ setBlurChart, setBlurAdditional }) {
  const [blurAll, setBlurAll] = useState(false);
  const [blurChart, toggleBlurChart] = useState(false);
  const [blurAdditional, toggleBlurAdditional] = useState(false);

  const handleBlurAll = () => {
    const newBlurAllState = !blurAll;
    setBlurAll(newBlurAllState);
    setBlurChart(newBlurAllState);
    setBlurAdditional(newBlurAllState);
  };

  return (
    <div className={styles.visibilityToggle}>
      {/* Botão principal para borrar todos */}
      <div onClick={handleBlurAll}>
        {blurAll ? <VisibilityOffIcon /> : <VisibilityIcon />}
        <span>Borrar Todos</span>
      </div>
      {/* Botões individuais para cada seção */}
      <div onClick={() => {
        const newBlurChart = !blurChart;
        toggleBlurChart(newBlurChart);
        setBlurChart(newBlurChart);
      }}>
        {blurChart ? <VisibilityOffIcon /> : <VisibilityIcon />}
        <span>Borrar Gráficos</span>
      </div>
      <div onClick={() => {
        const newBlurAdditional = !blurAdditional;
        toggleBlurAdditional(newBlurAdditional);
        setBlurAdditional(newBlurAdditional);
      }}>
        {blurAdditional ? <VisibilityOffIcon /> : <VisibilityIcon />}
        <span>Borrar Mais Vendidos</span>
      </div>
    </div>
  );
}

export default Blured;
