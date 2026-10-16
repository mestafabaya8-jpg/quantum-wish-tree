"use client";
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import AdminWithdraw from '../components/AdminWithdraw';

const CONTRACT_ABI = [
  "function etchVow(string memory _vow) public payable",
  "function withdraw() public",
  "function owner() public view returns (address)"
];

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "0xf2E22d2f67fb7bcc6C3a2f8a475deAa53815CfBb";

const PRESET_FORMULAS = [
  { label: "⚛️ Quantum Foam (Vibrational Harmony)", text: "May this vow vibrate eternally through the quantum foam, bound by cosmic harmony. ⚛️✨" },
  { label: "✨ Starlight Memory (Cosmic DNA)", text: "Etched into the mind and DNA of the stars — An eternal bond across the cosmos. 🌌⭐" },
  { label: "🪐 Quantum Entanglement (Unbreakable Bond)", text: "Two souls entangled in the quantum void, united beyond time and space. 🪐💫" },
  { label: "🌿 Universal Frequency (Pure Energy)", text: "Sealed within the fundamental frequency of the universe for everlasting peace and love. 🌿✨" }
];

const INITIAL_PUBLIC_VOWS = [
  { text: "Sarah & Thomas — Two souls entangled beyond time and space. 🪐💫", sender: "0x8F3...91a2", date: "Just now" },
  { text: "May our union remain unbreakable within the quantum foam. ⚛️✨", sender: "0x3B1...44c0", date: "Yesterday" },
  { text: "For everlasting prosperity, peace, and love in our home forever. 🌿✨", sender: "0x7E9...12f8", date: "Yesterday" }
];

export default function Home() {
  const [account, setAccount] = useState("");
  const [vowText, setVowText] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [contractBalance, setContractBalance] = useState("0");
  const [certificate, setCertificate] = useState(null);
  const [publicVows, setPublicVows] = useState(INITIAL_PUBLIC_VOWS);

  const fetchContractBalance = async () => {
    try {
      if (!window.ethereum) return;
      const provider = new ethers.BrowserProvider(window.ethereum);
      const balance = await provider.getBalance(CONTRACT_ADDRESS);
      setContractBalance(ethers.formatEther(balance));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchContractBalance();
  }, []);

  const connectWallet = async () => {
    try {
      if (!window.ethereum) return alert("Please install MetaMask to proceed!");
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      setAccount(accounts[0]);
      fetchContractBalance();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSelectPreset = (e) => {
    const selected = PRESET_FORMULAS.find(p => p.label === e.target.value);
    if (selected) {
      setVowText(selected.text);
    }
  };

  const handleCardClickNotice = () => {
    alert("💳 Credit Card & Apple Pay instant checkout is coming very soon! Currently accepting Web3 / MetaMask payments.");
  };

  const handleEtchVow = async (e) => {
    e.preventDefault();
    if (!vowText.trim()) return alert("Please enter your vow or wish.");
    if (!account) return alert("Please connect your MetaMask wallet first!");

    try {
      setLoading(true);
      setStatus("Connecting to the blockchain network...");
      
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      setStatus("Confirming quantum engraving ($3.33 / 0.003 ETH)...");
      const tx = await contract.etchVow(vowText, {
        value: ethers.parseEther("0.003"),
        gasLimit: 300000
      });

      setStatus("Engraving your vow into cosmic memory...");
      await tx.wait();

      setStatus("✨ Congratulations! Your vow now resonates eternally on the blockchain.");
      
      const newVowObj = {
        text: vowText,
        sender: `${account.substring(0, 5)}...${account.substring(account.length - 4)}`,
        date: "Just now"
      };
      setPublicVows([newVowObj, ...publicVows]);

      setCertificate({
        text: vowText,
        txHash: tx.hash,
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
      });

      setVowText("");
      fetchContractBalance();
    } catch (err) {
      console.error(err);
      if (err.code === "INSUFFICIENT_FUNDS") {
        setStatus("❌ Insufficient ETH balance in wallet to finalize engraving.");
      } else {
        setStatus(`❌ Error: ${err.reason || err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #31103f 100%)', 
      color: '#f8fafc',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      padding: '40px 20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <div style={{
        maxWidth: '650px',
        width: '100%',
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '24px',
        padding: '40px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <span style={{ fontSize: '48px' }}>⚛️✨🌌</span>
          <h1 style={{ fontSize: '32px', margin: '15px 0 5px 0', background: 'linear-gradient(to right, #f472b6, #fb7185, #c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            The Quantum Wish Tree
          </h1>
          <p style={{ color: '#cbd5e1', fontSize: '15px', marginTop: '10px', fontStyle: 'italic', lineHeight: '1.6' }}>
            "Upon the Quantum Tree, etched in cosmic ether,<br/>
            Your vow becomes an everlasting bond.<br/>
            Sealed forever by smart contract ether,<br/>
            A sacred memory time cannot step beyond."
          </p>
        </div>

        <div style={{ 
          background: 'rgba(244, 114, 182, 0.1)', 
          border: '1px solid rgba(244, 114, 182, 0.3)', 
          borderRadius: '12px', 
          padding: '12px 20px', 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '25px',
          fontSize: '14px'
        }}>
          <span>💰 Contract Treasury Balance:</span>
          <strong style={{ color: '#f472b6', fontSize: '16px' }}>{contractBalance} ETH</strong>
        </div>

        <form onSubmit={handleEtchVow}>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#cbd5e1' }}>
            Select a Cosmic Resonance (or write your own vow below):
          </label>
          
          <select 
            onChange={handleSelectPreset}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '12px',
              border: '1px solid rgba(255,255,255,0.2)',
              background: '#1e1b4b',
              color: '#fff',
              fontSize: '14px',
              marginBottom: '15px',
              outline: 'none'
            }}
          >
            <option value="">-- Choose a Quantum Formula --</option>
            {PRESET_FORMULAS.map((preset, idx) => (
              <option key={idx} value={preset.label}>{preset.label}</option>
            ))}
          </select>

          <textarea
            rows="4"
            placeholder="Write your eternal love vow, wish, or promise here..."
            value={vowText}
            onChange={(e) => setVowText(e.target.value)}
            style={{ 
              width: '100%', 
              padding: '14px', 
              borderRadius: '12px', 
              border: '1px solid rgba(255,255,255,0.2)', 
              background: 'rgba(0,0,0,0.2)',
              color: '#fff',
              fontSize: '15px',
              marginBottom: '20px',
              outline: 'none'
            }}
          />

          {!account ? (
            <button 
              type="button"
              onClick={connectWallet}
              style={{ 
                width: '100%',
                padding: '15px', 
                backgroundColor: '#3b82f6', 
                color: '#fff', 
                border: 'none', 
                borderRadius: '12px', 
                cursor: 'pointer', 
                fontWeight: 'bold',
                fontSize: '16px',
                boxShadow: '0 4px 14px rgba(59, 130, 246, 0.4)'
              }}
            >
              🦊 Connect Wallet to Engrave ($3.33 USD)
            </button>
          ) : (
            <div>
              <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid #10b981', padding: '10px', borderRadius: '12px', fontSize: '13px', textAlign: 'center', color: '#34d399', marginBottom: '12px' }}>
                Connected Wallet: <strong>{account.substring(0, 6)}...{account.substring(account.length - 4)}</strong>
              </div>
              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '15px',
                  backgroundColor: loading ? '#475569' : '#db2777',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '12px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  boxShadow: '0 4px 14px rgba(219, 39, 119, 0.4)'
                }}
              >
                {loading ? 'Engraving into the Blockchain...' : '✨ Engrave in Quantum Ether ($3.33 / 0.003 ETH)'}
              </button>
            </div>
          )}

          <div style={{ textAlign: 'center', marginTop: '15px' }}>
            <button
              type="button"
              onClick={handleCardClickNotice}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#94a3b8',
                fontSize: '12px',
                textDecoration: 'underline',
                cursor: 'pointer'
              }}
            >
              💳 Prefer to pay with Credit Card or Apple Pay? (Learn More)
            </button>
          </div>
        </form>

        {status && (
          <div style={{ marginTop: '20px', padding: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', fontSize: '14px', textAlign: 'center', color: '#f472b6' }}>
            {status}
          </div>
        )}

        {certificate && (
          <div style={{
            marginTop: '30px',
            padding: '25px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #fff1f2 0%, #ffe4e6 100%)',
            color: '#881337',
            border: '2px solid #fda4af',
            textAlign: 'center',
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
          }}>
            <h2 style={{ margin: '0 0 10px 0', fontSize: '22px' }}>📜 Quantum Entanglement Certificate</h2>
            <p style={{ fontStyle: 'italic', fontSize: '16px', margin: '15px 0', color: '#9f1239' }}>
              "{certificate.text}"
            </p>
            <div style={{ fontSize: '12px', color: '#be123c', marginTop: '15px', borderTop: '1px dashed #fda4af', paddingTop: '10px' }}>
              <p>Sealed on: <strong>{certificate.date}</strong></p>
              <p style={{ wordBreak: 'break-all' }}>Blockchain Proof (Tx): <br/><code>{certificate.txHash}</code></p>
            </div>
          </div>
        )}

        <div style={{ marginTop: '40px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '25px' }}>
          <h3 style={{ fontSize: '18px', color: '#f472b6', textAlign: 'center', marginBottom: '20px' }}>
            🌟 Wall of Wishes (Recently Engraved)
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {publicVows.map((vow, idx) => (
              <div key={idx} style={{
                background: 'rgba(0, 0, 0, 0.3)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '12px',
                padding: '14px 18px'
              }}>
                <p style={{ fontSize: '14px', margin: '0 0 8px 0', color: '#f1f5f9', fontStyle: 'italic' }}>
                  "{vow.text}"
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#94a3b8' }}>
                  <span>Engraved by: <code style={{ color: '#c084fc' }}>{vow.sender}</code></span>
                  <span>{vow.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ margin: '35px 0 20px 0', height: '1px', background: 'rgba(255,255,255,0.1)' }} />

        <AdminWithdraw contractAddress={CONTRACT_ADDRESS} contractABI={CONTRACT_ABI} />
      </div>
    </main>
  );
}
