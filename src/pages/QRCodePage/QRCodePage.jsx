import React, { useState } from 'react';
import axios from 'axios';

function QRCodePage() {
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
    <div>
      <h2>Gerar QR Code de Pagamento Pix</h2>
      <input
        type="number"
        value={value}
        onChange={(e) => setValue(parseFloat(e.target.value))}
        placeholder="Digite o valor"
      />
      <button onClick={generateQrCode}>Gerar QR Code</button>
      
      {qrCode && (
        <div>
          <img src={`data:image/png;base64,${qrCode}`} alt="QR Code Pix" />
          {pixPayload && (
            <div>
              <p>Pix Copia e Cola:</p>
              <p>{pixPayload}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default QRCodePage;
