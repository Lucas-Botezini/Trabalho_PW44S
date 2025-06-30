export interface IUserRegister {
  id?: number;
  username: string;
  nickname: string;
  email: string;
  password: string;
}

export interface IResponse<T = any> {
  status?: number;
  success?: boolean;
  message?: string;
  data?: T
}

export interface IUserLogin {
  username: string;
  password: string;
}

export interface Authorities {
  authority: string;
}

export interface AuthenticatedUser {
  nickname: string;
  username: string;
  authorities: Authorities[];
}

export interface AuthenticationResponse {
  token: string;
  user: AuthenticatedUser;
}

export  interface  IGenre {
  id?:  number;
  name:  string;
}

export interface IGame {
  id: number;
  name: string;
  description: string;
  price: number;
  image?: string;
  genres: IGenre[];
  contentType?: string;
}

export interface IAddress {
  id?: number;
  street: string;
  complement?: string;
  cep: string;
  city: string;
  state: string;
}

export interface IOrderItem {
  id?: number;
  game: IGame;
  unitPrice?: number;
  amount: number;
}

export interface IOrder {
  id?: number;
  date?: string;
  user: AuthenticatedUser;
  totalPrice?: number;
  orderItems: IOrderItem[];
  paymentMethod: String;
  address: IAddress;
}

