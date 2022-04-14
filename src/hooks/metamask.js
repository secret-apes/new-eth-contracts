import { useSelector } from "react-redux";

function useLoginStatus() {
  return useSelector((store) => store.MetamaskReducer.loggedIn);
}

function useAllowlist() {
  const allowlist = useSelector((store) => store.MetamaskReducer.allowlist);
  return allowlist;
}

export { useLoginStatus, useAllowlist };