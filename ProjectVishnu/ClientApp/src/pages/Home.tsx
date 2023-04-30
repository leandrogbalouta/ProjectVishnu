import logo from "../img/logo.jpg";

export default function Home() {
  return (
    <div className="w-full h-full flex flex-col">
      <img src={logo} alt="" className="mx-auto my-24 sm:w-1/2 rounded-xl" />
    </div>
  );
}
