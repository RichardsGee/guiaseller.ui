import React, { useState } from 'react';
import axios from 'axios';

function QRCodePage() {
  const [qrCode, setQrCode] = useState(null);
  const [value, setValue] = useState(10.00); 

  const generateQrCode = async () => {
    try {
      const response = await axios.post('http://localhost:8080/generate-pix-qrcode', { value });
      setQrCode(response.data.qrCodeDataUrl);
    } catch (error) {
      console.error('Erro ao gerar QR Code:', error);
    }
  };

  return (
    <div>
      <h2>Gerar QR Code de Pagamento Pix</h2>
      <input
        type="number"
        value={value}
        onChange={(e) => setValue(parseFloat(e.target.value))}
        placeholder="Digite o valor"
      />
      <button onClick={generateQrCode}>Gerar QR Code</button>
      {qrCode && <img src={qrCode} alt="QR Code Pix" />}
    </div>
  );
}

export default QRCodePage;