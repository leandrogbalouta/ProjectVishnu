
import * as jose from 'jose'
import IContaOutput from './Interfaces/Conta/IContaOutput';

const GetConta  = (): IContaOutput | undefined  => {
  const token = localStorage.getItem("DKMToken");
  if (!token) return undefined;
  let decoded = jose.decodeJwt(token!); 
  if (decoded!.exp! * 1000 < new Date().getTime()) return undefined;
  return {
    username: decoded.username as string,
    role: decoded.role as string
  };
};
export default GetConta;