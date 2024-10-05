import React, { useRef, useEffect } from 'react';

const BuySound = ({ play, stop }) => {
  const loadingSoundRef = useRef(null); // Referência para o áudio
  const fadeOutTimeout = useRef(null); // Timeout para o fade out

  useEffect(() => {
    // Tocar som
    if (play) {
      playSound();
    }
    // Parar som com fade
    if (stop) {
      stopSound();
    }
  }, [play, stop]);

  // Função para tocar som
  const playSound = () => {
    if (loadingSoundRef.current) {
      loadingSoundRef.current.currentTime = 0;
      loadingSoundRef.current.volume = 1;

      const playPromise = loadingSoundRef.current.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Som tocando
          })
          .catch(error => {
            console.log('Som bloqueado: O usuário precisa interagir com a página primeiro.');
          });
      }
    }
  };

  // Função para parar som gradualmente com fade-out mais rápido
  const stopSound = () => {
    if (loadingSoundRef.current) {
      clearTimeout(fadeOutTimeout.current); // Limpa qualquer fade anterior
      let volume = 1;

      const fadeOut = () => {
        if (volume > 0.1) {
          volume -= 0.2; // Reduz o volume em incrementos maiores
          loadingSoundRef.current.volume = volume;
          fadeOutTimeout.current = setTimeout(fadeOut, 50); // Diminui o intervalo para fazer o fade-out mais rápido
        } else {
          loadingSoundRef.current.volume = 0;
          loadingSoundRef.current.pause();
        }
      };

      fadeOut(); // Inicia o fade-out
    }
  };

  return (
    <audio ref={loadingSoundRef} src="/loading-sound.mp3" />
  );
};

export default BuySound;
