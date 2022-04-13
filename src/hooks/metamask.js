import { useSelector } from "react-redux";

function useLoginStatus() {
  return useSelector((store) => store.MetamaskReducer.loggedIn);
}

export { useLoginStatus };