
import * as jose from 'jose'
import IContaOutput from './Interfaces/Conta/IContaOutput';

const GetUserProfile = () => {
  const token = localStorage.getItem("CMOToken");
  if (!token) return undefined;
  const decoded = jose.decodeJwt(token!); 
  if(decoded!.exp!*1000 < new Date().getTime()) return undefined;
  // redirect user if token valid
  return <IContaOutput><unknown>decoded;
};
export default GetUserProfile;