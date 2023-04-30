import logo from "../img/logo.jpg";
import useAuth from "../auth/useAuth";

export default function Home() {
  const { conta } = useAuth();
  return (
    <div className="w-full h-full flex flex-col">
      {conta && <p className="text-xl">Bem-vindo, {conta?.username}.</p>}
      <img src={logo} alt="dkm logo" className="mx-auto my-5 sm:my-24 sm:w-1/2 rounded-xl" />
    </div>
  );
}
