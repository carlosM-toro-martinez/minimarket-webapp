import { useState } from "react";

function useMain() {
  const [auth, setAuth] = useState(false);
  const [superAdmin, setSuperAdmin] = useState(true);
  const [token, setToken] = useState("");
  const [user, setUser] = useState();
  const [products, setProducts] = useState();

  return {
    auth,
    token,
    user,
    superAdmin,
    products,
    setProducts,
    setSuperAdmin,
    setUser,
    setToken,
    setAuth,
  };
}

export default useMain;
