import notFound from "./../img/404.svg"

export default function Custom404() {
  return (
    <div className="h-full m-auto my-10">
      <p className="text-2xl">Página não encontrada</p>
      <img src={notFound} alt="not found image"/>
      <p>Lamentamos mas não foi possível encontrar a página que procura.</p>
    </div>
  );
}
