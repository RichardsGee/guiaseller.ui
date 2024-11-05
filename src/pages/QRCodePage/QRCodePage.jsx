import React, { useContext, useState } from 'react';
import axios from 'axios';
import Header from '../../components/Header/Header';  
import Sidebar from '../../components/Sidebar/Sidebar';  
import Footer from '../../components/Footer/Footer';  
import MainContent from '../../components/MainContent/MainContent'; 
import '../../styles/styles.css'; // Importando o CSS global
import { AuthContext } from '../../context/AuthContext'; 
import styles from './QRCodePage.module.css'; // Importando os estilos do QRCodePage

const QRCodePage = () => {
  const { user, signOut } = useContext(AuthContext);
  const username = user ? user.displayName || user.email : "No User Logged";
  const userPhoto = user ? user.photoURL : null;

  const [qrCode, setQrCode] = useState(null);
  const [pixPayload, setPixPayload] = useState(null);
  const [value, setValue] = useState(10.00);

  const generateQrCode = async () => {
    try {
      const response = await axios.post('https://guiaseller-backend.dlmi5z.easypanel.host/generate-pix-qrcode', { value });
      setQrCode(response.data.qrCodeImage); 
      setPixPayload(response.data.pixPayload); 
    } catch (error) {
      console.error('Erro ao gerar QR Code:', error);
    }
  };

  return (
    <MainContent>
      <Header username={username} logout={signOut} />
      <Sidebar userPhoto={userPhoto} username={username} />
      <div className="main-content">
        <div className="contentContainer">
          <div className={styles.cardContainer}>
            <h1 className={styles.title}>Gerar QR Code de Pagamento Pix</h1>
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(parseFloat(e.target.value))}
              placeholder="Digite o valor"
              className={styles.valueInput}
            />
            <button onClick={generateQrCode} className={styles.generateButton}>Gerar QR Code</button>

            <div className={styles.qrCodeContainer}>
              {qrCode ? (
                <img src={`data:image/png;base64,${qrCode}`} alt="QR Code Pix" className={styles.qrCodeImage} />
              ) : (
                <div className={styles.qrCodePlaceholder}>QR Code será gerado aqui</div>
              )}
              <div className={styles.pixPayloadContainer}>
                <p>PIX Copia e Cola:</p>
                <div className={styles.pixPayload}>
                  {pixPayload}
                </div>
                <button className={styles.copyButton} onClick={() => navigator.clipboard.writeText(pixPayload)}>
                  Copiar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </MainContent>
  );
};

export default QRCodePage;
