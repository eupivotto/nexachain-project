import Web3 from "web3";

import { MetaMaskInpageProvider } from "@metamask/providers";

declare global {
  interface Window{
    ethereum?:MetaMaskInpageProvider
  }
}

type Itransation = {
  from: string;
  to: string;
  value: string;
  gas: number;
  nonce: string;
}

export async function getMetaMaskProvider() {
    if(!window.ethereum) throw new Error(`No Meta Mask Found!`);

    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.requestAccounts();
    console.log(accounts);
    if(!accounts || accounts.length === 0) throw new Error('Permission required');

    return web3;
}

export async function getBalance(adress: string) {
  const web3 = await getMetaMaskProvider();
  const balance = await web3.eth.getBalance(adress);

  return web3.utils.fromWei(balance, 'ether');
}

export async function trasnfer(from:string, to:string, quantity:string) {
  const web3 = await getMetaMaskProvider();
  const value = web3.utils.toWei(quantity, 'ether');

  const nonce = (await web3.eth.getTransactionCount(from, 'latest')).toString();

  const transaction: Itransation = {
    from,
    to,
    value,
    gas: 21000,
    nonce
  }

  const tx = web3.eth.sendTransaction(transaction);
  return (await tx).transactionHash

}