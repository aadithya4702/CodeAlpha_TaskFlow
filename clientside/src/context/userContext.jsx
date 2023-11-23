import axios from "axios";
import Cookies from "js-cookie";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken && !user) {
      // Fetch user data using the stored token
      axios
        .get("http://localhost:4000/api/users/profile", {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        })
        .then(({ data }) => {
          setUser(data);

          localStorage.setItem("user", JSON.stringify(data));
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [user]); // Include 'user' in the dependency array if needed

  const logout = () => {
    // Clear user data from local storage
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Clear user data from cookies
    Cookies.remove("token");

    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
}
