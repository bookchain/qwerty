// React
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// NEAR
import { GuestBook } from './near-interface';
import { Wallet } from './near-wallet';

// When creating the wallet you can choose to create an access key, so the user
// can skip signing non-payable methods when talking wth the  contract
const wallet = new Wallet({ createAccessKeyFor: 'dev-1678123361275-42270562033517' });

const guestBook = new GuestBook({
  contractId: 'dev-1678123361275-42270562033517',
  walletToUse: wallet,
});

// Setup on page load
window.onload = async () => {
  const isSignedIn = await wallet.startUp();

  ReactDOM.render(
    <App isSignedIn={isSignedIn} guestBook={guestBook} wallet={wallet} />,
    document.getElementById('root'),
  );
};
