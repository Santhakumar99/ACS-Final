import { useState, useCallback, useEffect } from "react";

let logoutTimer;
export const useAuth = () => {
  const [token, setToken] = useState(false);
  // const [userId, setUserId] = useState();

  const [tokenExpirationDate, setTokenExpirationDate] = useState();

  const login = useCallback((token, expirationDate) => {
    setToken(token);
    // setUserId(uid);
    // store token in localstrorage[ its global variable of js & used by browser]

    // 1000 is in miliseconds [1000 * 60 * 60 = 1 hour]
    const tknExpirationDate =
      // expirationDate || new Date(new Date().getTime() + 120 * 120);        // 12 seconds
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60); // 1hour
    setTokenExpirationDate(tknExpirationDate);

    localStorage.setItem("token", token);

    localStorage.setItem(
      "userData",
      JSON.stringify({
        // usedId: uid,
        token: token,
        expiration: tknExpirationDate.toISOString(),
      })
    );
  }, []);

  const logout = useCallback(() => {
    // alert("Session Expired");
    setToken(null);
    // setUserId(null);
    setTokenExpirationDate(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userData");

    return (window.location = "/login");
  }, []);

  // auto logout functionality
  useEffect(() => {
    if (token && tokenExpirationDate) {
      // though calculate it in time [milisecond]
      const tknRemainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, tknRemainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  // auto login functionality
  useEffect(() => {
    // get localStorage [its in string so parse it into json]
    const storedData = JSON.parse(localStorage.getItem("userData"));

    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        // storedData.userId,
        storedData.token,
        new Date(storedData.expiration)
      );
    }
  }, [login]);

  return { token, login, logout };
};
