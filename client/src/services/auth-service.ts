import type { IUserRegister, IUserLogin, IResponse, AuthenticationResponse } from "@/commons/types";
import { api } from "@/lib/axios";

/**
 * Função para realizar uma requisição HTTP para API para cadastrar um novo usuário
 * @param user - Dados do usuário que será cadastrado do tipo IUserRegister
 * @returns - Retorna a resposta da API
 */

// Informa que a função retorna uma Promise que resolve no formato IResponse contendo, no campo data, um objeto do tipo IUserRegister.
const signup = async (user: IUserRegister): Promise<IResponse<IUserRegister>> => {
  let response = {} as IResponse;
  try {
    const data = await api.post("/user", user);
    response = {
      status: 200,
      success: true,
      message: "Usuário cadastrado com sucesso",
      data: data.data,
    };  
  } catch (err: any) {
    response = {
      status: 400,
      success: false,
      message: "Usuário não pode ser cadastrado",
      data: err.response.data,
    };
  }
  return response;
};

/**
 * Função para realizar a autenticação do usuário
 * @param user - Dados do usuário que será autenticado do tipo IUserLogin (username e password)
 * @returns - Retorna a resposta da API
 * Além disso salva o token no localStorage e adiciona o token no cabeçalho da requisição
 */
const login = async (user: IUserLogin):Promise<IResponse<AuthenticationResponse>> => {
  let response = {} as IResponse;
  try {
    const data = await api.post("/login", user);
    response = {
      status: 200,
      success: true,
      message: "Login bem-sucedido",
      data: data.data,
    };
  } catch (err: any) {
    response = {
      status: 401,
      success: false,
      message: "Usuário ou senha inválidos",
      data: err.response.data,
    };
  }
  return response;
};

const AuthService = {
  signup,
  login
};
export default AuthService;