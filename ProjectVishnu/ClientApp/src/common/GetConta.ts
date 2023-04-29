
import * as jose from 'jose'
import IContaOutput from './Interfaces/Conta/IContaOutput';

const GetConta  = (): IContaOutput | undefined  => {
  const token = localStorage.getItem("DKMToken");
  if (!token) return undefined;
  let decoded = jose.decodeJwt(token!); 
  console.log("exp" + decoded.exp);
  if (decoded!.exp! * 1000 < new Date().getTime()) return undefined;
  return {
    username: decoded.username as string,
    tipoDeUser: decoded.tipoDeUser as string
  };
};
export default GetConta;