type AlertSeverity = 'error' | 'warning' | 'info' | 'success';


import { useState } from "react";
import {
  getMetaMaskProvider,
  getBalance,
  trasnfer,
} from "./services/MetaMaskService";
import { WhatsappLogo, LinkedinLogo, GithubLogo } from "@phosphor-icons/react";
import logoNexa from "../src/assets/images/logo-nexa.png";
import Button from "@mui/material/Button";
import Input from "@mui/joy/Input";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import "./styles.scss";

function App() {
  const [address, SetAddress] = useState("");
  const [to, SetTo] = useState("");
  const [quantity, SetQuantity] = useState("0.01");
  const [balance, setBalance] = useState("");

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<AlertSeverity>("info");
  

  const handleGetTransfer = async () => {
    trasnfer(address, to, quantity);
    
      setSnackbarMessage("Valor enviado com sucesso! autorize a transação.");
      setSnackbarSeverity("success");
  };

  const handleGetMetaMaskProvider = async () => {
    try {
      await getMetaMaskProvider();
      setSnackbarMessage("MetaMask Provider Obtido com sucesso!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
    } catch (error) {
      setSnackbarMessage("Erro ao obter o MetaMask Provider.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  const handleGetBalance = async () => {
    try {
      const balance = await getBalance(address);
      setBalance(balance.toString());
      setSnackbarMessage("Saldo obtido com sucesso.");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
    } catch (error) {
      setSnackbarMessage("Erro ao obter o Valor MetaMask ");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  return (
    <>
      <div className="main-container">
        <div className="nexa-nav">
          <img src={logoNexa} alt="logo da nexachain" />
          <div className="text-header">
            <h2>
              Projeto exclusivo para responsta da vaga - Desenvolvedor de
              Front-End - Júnior - React - Vite
            </h2>
            <h3>por Lucas Pivotto</h3>
          </div>
          <nav>
            <ul>
              <li>
                <WhatsappLogo size={20} />
                Whatsapp
              </li>
              <li>
                <LinkedinLogo size={20} />
                Linkedin
              </li>
              <li>
                <GithubLogo size={20} />
                GitHub
              </li>
            </ul>
          </nav>
        </div>

        <div className="get-meta">
        <Button variant="contained" onClick={handleGetMetaMaskProvider}>
            Conectar MetaMask
          </Button>
        </div>

        <div className="transations-container">
          <div className="balance-container">
            <h1>Wallet - </h1>
            <Input
              className="input-wallet"
              placeholder="Endereço da Carteira"
              color="success"
              variant="outlined"
              type="text"
              value={address}
              onChange={(ev) => SetAddress(ev.target.value)}
            />
            <Button
              className="button-balance"
              variant="contained"
              onClick={handleGetBalance}
            >
              Ver Saldo
            </Button>
          </div>

          <div className="text-balance">
            {" "}
            {balance && (
              <p>
                Saldo da Carteira: <span> {balance} </span> GoerliETH
              </p>
            )}{" "}
          </div>

          <div className="send-container">
            <h2>Enviar para:</h2>
            <Input
              className="input-send"
              placeholder="Endereço da Carteira"
              color="success"
              variant="outlined"
              type="text"
              value={to}
              onChange={(ev) => SetTo(ev.target.value)}
            />

            <h2>Valor:</h2>
            <Input
            className="input-value"
              placeholder="Digite o Valor"
              color="success"
              variant="outlined"
              type="text"
              value={quantity}
              onChange={(ev) => {
                const value = ev.target.value;
              
                // Verifica se a entrada é um número válido ou se está vazia, permitindo também um ponto decimal.
                if (String(value) === '' || String(value) === '.' ||!isNaN(Number(value)) && String(value).split('.').length === 2) {
                  SetQuantity(value);
                } else {
                  // Opção: Lidar com entrada inválida (ex: resetar para o último valor válido ou mostrar uma mensagem de erro)
                }
              }}
            />
            <Button className="button-send" onClick={handleGetTransfer}>Enviar</Button>
          </div>

         
        </div>
      </div>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
  <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
    {snackbarMessage}
  </Alert>
</Snackbar>
    </>
  );
}

export default App;

