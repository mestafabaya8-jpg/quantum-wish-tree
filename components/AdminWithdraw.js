"use client";
import { useState } from 'react';
import { ethers } from 'ethers';

export default function AdminWithdraw({ contractAddress, contractABI }) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  const handleWithdraw = async () => {
    try {
      setLoading(true);
      setStatus('Connexion à MetaMask...');

      if (!window.ethereum) throw new Error("MetaMask n'est pas installé");

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      setStatus('Validation de la transaction de retrait...');
      const tx = await contract.withdraw();
      
      setStatus('Transfert des fonds en cours sur la blockchain...');
      await tx.wait();

      setStatus('Succès ! Tous les ETH du contrat ont été transférés sur votre portefeuille MetaMask.');
    } catch (error) {
      console.error(error);
      setStatus(`Erreur : ${error.reason || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: '20px', padding: '15px', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
      <h3>Espace Administrateur - Gain du site</h3>
      <button 
        onClick={handleWithdraw} 
        disabled={loading}
        style={{
          padding: '10px 20px',
          backgroundColor: '#10B981',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: loading ? 'not-allowed' : 'pointer'
        }}
      >
        {loading ? 'Retrait en cours...' : 'Retirer les fonds du contrat'}
      </button>
      {status && <p style={{ marginTop: '10px' }}>{status}</p>}
    </div>
  );
}
