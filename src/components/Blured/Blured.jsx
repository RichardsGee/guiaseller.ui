// src/components/Blured.jsx
import React, { useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import styles from './Blured.module.css';

function Blured({ setBlurChart, setBlurAdditional, setBlurTopBar }) {
  const [blurAll, setBlurAll] = useState(false);
  const [blurChart, toggleBlurChart] = useState(false);
  const [blurAdditional, toggleBlurAdditional] = useState(false);
  const [blurTopBar, toggleBlurTopBar] = useState(false);

  const handleBlurAll = () => {
    const newBlurAllState = !blurAll;
    setBlurAll(newBlurAllState);
    setBlurChart(newBlurAllState);
    setBlurAdditional(newBlurAllState);
    setBlurTopBar(newBlurAllState);
  };

  return (
    <div className={styles.visibilityToggle}>
      {/* Botão principal para borrar todos */}
      <div onClick={handleBlurAll}>
        {blurAll ? <VisibilityOffIcon /> : <VisibilityIcon />}
        <span>Todos</span>
      </div>
      
      {/* Botões individuais para cada seção */}
      <div onClick={() => {
        const newBlurChart = !blurChart;
        toggleBlurChart(newBlurChart);
        setBlurChart(newBlurChart);
      }}>
        {blurChart ? <VisibilityOffIcon /> : <VisibilityIcon />}
        <span>Gráficos</span>
      </div>
      
      <div onClick={() => {
        const newBlurAdditional = !blurAdditional;
        toggleBlurAdditional(newBlurAdditional);
        setBlurAdditional(newBlurAdditional);
      }}>
        {blurAdditional ? <VisibilityOffIcon /> : <VisibilityIcon />}
        <span>Mais Vendidos</span>
      </div>
      
      {/* Botão individual para TopBar */}
      <div onClick={() => {
        const newBlurTopBar = !blurTopBar;
        toggleBlurTopBar(newBlurTopBar);
        setBlurTopBar(newBlurTopBar);
      }}>
        {blurTopBar ? <VisibilityOffIcon /> : <VisibilityIcon />}
        <span>TopBar</span>
      </div>
    </div>
  );
}

export default Blured;
