import { useDispatch } from "react-redux";
import { useState, useRef, useEffect } from 'react';
import { ReactComponent as MetamaskLogo } from '../../assets/metamask.svg';
import { useLoginStatus } from '../../hooks/metamask';
import MetaMaskOnboarding from '@metamask/onboarding';

function GateKeeper() {
  const dispatch = useDispatch();
  const [buttonText, setButtonText] = useState("Click to install MetaMask!");
  const [buttonTextColor, setButtonTextColor] = useState('text-gray-900');
  const [isDisabled, setIsDisabled] = useState(false);
  const onboarding = useRef();
  const isLoggedIn = useLoginStatus();

  // Initialize onboarding instance
  useEffect(() => {
    if (!onboarding.current) {
      onboarding.current = new MetaMaskOnboarding();
    }
  }, []);

  // Update button style and onboarding based on login status.
  useEffect(() => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      if (isLoggedIn) {
        setButtonText("MetaMask Connected!");
        setButtonTextColor('text-green-700');
        setIsDisabled(true);
        onboarding.current.stopOnboarding();
      } else {
        setButtonText("Login with MetaMask");
        setButtonTextColor('text-gray-900');
        setIsDisabled(false);
      }
    }
  }, [dispatch, isLoggedIn]);

  // Attach event listeners to metamask connection updates.
  useEffect(() => {
    function handleNewAccounts(accounts) {
      if (accounts.length > 0) {
        dispatch({ type: "LOGIN", accounts });
        if (!sessionStorage.loggedIn) {
          sessionStorage.setItem('loggedIn', 'true');
        }
      } else {
        dispatch({ type: "LOGOUT" });
        if (sessionStorage.loggedIn) {
          sessionStorage.removeItem('loggedIn');
        }
      }
    }

    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      if (sessionStorage.loggedIn) {
        // Avoids auto-connect unless already logged-in for the session.
        // This helps prevent the auto pop-up on first page load.
        window.ethereum
          .request({ method: 'eth_requestAccounts' })
          .then(handleNewAccounts);
      }
      window.ethereum.on('accountsChanged', handleNewAccounts);
      return () => {
        window.ethereum.removeListener('accountsChanged', handleNewAccounts);
      };
    }
  }, [dispatch]);

  // Only works when logged out, because button is disabled when logged-in.
  // On button click, either attempt MetaMask connection, or start onboarding.
  const onClick = () => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then(accounts => {
          dispatch({ type: "LOGIN", accounts });
          if (!sessionStorage.loggedIn) {
            sessionStorage.setItem('loggedIn', 'true');
          }
        });
    } else {
      onboarding.current.startOnboarding();
    }
  };

  return (
    <button type="button" className={`${buttonTextColor} bg-white hover:bg-lime-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 mr-2 mb-2 disabled:cursor-not-allowed disabled:bg-slate-100`} disabled={isDisabled} onClick={onClick}>
      <MetamaskLogo />
      {buttonText}
    </button>
  );
}
export default GateKeeper;