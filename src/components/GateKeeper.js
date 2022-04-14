import { useDispatch } from "react-redux";
import { useState, useRef, useEffect } from 'react';
import { ReactComponent as MetamaskLogo } from '../assets/metamask.svg';
import { useAllowlist, useLoginStatus } from '../hooks/metamask';
import MetaMaskOnboarding from '@metamask/onboarding';
import sha256 from 'sha256';

function isBackdoor() {
  const queryParams = new URLSearchParams(window.location.search);
  if (process.env.REACT_APP_SECRET_PWD &&
    queryParams.get('pwd') === process.env.REACT_APP_SECRET_PWD) {
    return true;
  }
  return false;
}

function isAccessGranted(allowlist, addr) {
  return isBackdoor() || allowlist.has(sha256.x2(addr));
}

function GateKeeper() {
  const dispatch = useDispatch();
  const [buttonText, setButtonText] = useState("Click to install MetaMask!");
  const [buttonTextColor, setButtonTextColor] = useState('text-gray-900');
  const [isDisabled, setIsDisabled] = useState(false);
  const onboarding = useRef();
  const isLoggedIn = useLoginStatus();
  const allowlist = useAllowlist();

  // Initialize onboarding instance
  useEffect(() => {
    if (isBackdoor()) {
      setButtonText("Backdoor Detected. Click to Enter.");
    } else if (!onboarding.current) {
      onboarding.current = new MetaMaskOnboarding();
    }
  }, []);

  // Update button style and onboarding based on login status.
  useEffect(() => {
    if (isBackdoor()) {
      if (isLoggedIn) {
        setButtonText("MetaMask Connected!");
        setButtonTextColor('text-green-700');
        setIsDisabled(true);
      } else {
        setButtonText("Backdoor Detected. Click to Enter.");
        setButtonTextColor('text-gray-900');
        setIsDisabled(false);
      }
    } else if (MetaMaskOnboarding.isMetaMaskInstalled()) {
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
        if (isAccessGranted(allowlist, accounts[0])) {
          dispatch({ type: "LOGIN", accounts });
          if (!sessionStorage.loggedIn) {
            sessionStorage.setItem('loggedIn', 'true');
          }
          return;
        } else {
          setButtonText('Permission denied');
        }
      }
      dispatch({ type: "LOGOUT" });
      if (sessionStorage.loggedIn) {
        sessionStorage.removeItem('loggedIn');
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
  }, [dispatch, allowlist]);

  // Only works when logged out, because button is disabled when logged-in.
  // On button click, either attempt MetaMask connection, or start onboarding.
  const onClick = () => {
    if (isBackdoor()) {
      dispatch({ type: "LOGIN", accounts: [] });
      if (!sessionStorage.loggedIn) {
        sessionStorage.setItem('loggedIn', 'true');
      }
    }
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then(accounts => {
          if (accounts.length > 0) {
            if (isAccessGranted(allowlist, accounts[0])) {
              dispatch({ type: "LOGIN", accounts });
              if (!sessionStorage.loggedIn) {
                sessionStorage.setItem('loggedIn', 'true');
              }
            } else {
              setButtonText('Permission denied');
            }
          }
        });
    } else {
      onboarding.current.startOnboarding();
    }
  };

  return (
    <button type="button" className={`${buttonTextColor} bg-white hover:bg-lime-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:text-slate-300 dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 mr-2 mb-2 disabled:cursor-not-allowed`} disabled={isDisabled} onClick={onClick}>
      <MetamaskLogo />
      {buttonText}
    </button>
  );
}
export default GateKeeper;