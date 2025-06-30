import { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { AuthenticatedUser, AuthenticationResponse } from "@/commons/types";
import { api } from "@/lib/axios";
import { useNavigate } from "react-router-dom";

import { jwtDecode } from "jwt-decode"; // Será usado para validar se o usuário está logado


interface AuthContextType {
  authenticated: boolean;
  authenticatedUser?: AuthenticatedUser;
  handleLogin: (authenticationResponse: AuthenticationResponse) => Promise<any>;
  handleLogout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [authenticatedUser, setAuthenticatedUser] =
    useState<AuthenticatedUser>();
  const navigate = useNavigate();

  const validateToken = () => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      try {
        const token = JSON.parse(storedToken);
        const decodedToken: any = jwtDecode(token);

        // Verifica se o token expirou (exp é em segundos, Date.now() em milissegundos)
        if (decodedToken.exp * 1000 > Date.now()) {
          // Token está valido
          setAuthenticatedUser(JSON.parse(storedUser));
          setAuthenticated(true);
          api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          return true;
        } else {
          // Token inválido / expirado
          console.log("Token expirado. Deslogando automaticamente.");
          handleLogout();
          return false; 
        }
      } catch (error) {
        handleLogout(); 
        return false;
      }
    }
    // Não há token ou usuário armazenado
    setAuthenticated(false);
    setAuthenticatedUser(undefined);
    return false;
  }

  useEffect(() => {
    validateToken(); // Valida o token ao carregar o componente
  }, []); // O array de dependências é vazio para garantir que isso só seja executado uma vez na montagem

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setAuthenticatedUser(JSON.parse(storedUser));
      setAuthenticated(true);
      api.defaults.headers.common["Authorization"] = `Bearer ${JSON.parse(
        storedToken
      )}`;
      navigate("/");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogin = async (
    authenticationResponse: AuthenticationResponse
  ) => {
    try {
      localStorage.setItem(
        "token",
        JSON.stringify(authenticationResponse.token)
      );
      
      localStorage.setItem("user", JSON.stringify(authenticationResponse.user));
      
      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${authenticationResponse.token}`;

      setAuthenticatedUser(authenticationResponse.user);
      setAuthenticated(true);
    } catch {
      setAuthenticatedUser(undefined);
      setAuthenticated(false);
    }
  };

  const handleLogout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    api.defaults.headers.common["Authorization"] = "";

    setAuthenticated(false);
    setAuthenticatedUser(undefined);
  };

  return (
    <AuthContext.Provider
      value={{ authenticated, authenticatedUser, handleLogin, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };