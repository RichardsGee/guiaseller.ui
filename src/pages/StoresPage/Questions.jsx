import React from 'react';
import styles from './stores.module.css';

const QuestionsContent = () => (
  <div>
    <h2>Perguntas Pendentes</h2>
    <div className={styles.questionsList}>
      <div className={styles.questionItem}>
        <p>Qual é o prazo de entrega?</p>
        <span className={styles.pending}>Pendente</span>
      </div>
    </div>
  </div>
);

export default QuestionsContent;
