Ao atualizar a base de dados, de maneira a atualizar também a pasta models, correr o comando :

`Scaffold-DbContext “Host=localhost;Database=DBName;Username=DBUsername;Password=DBPassword” Npgsql.EntityFrameworkCore.PostgreSQL -OutputDir Models -force`

no Packet Manager Console, com os campos DBName, DBUsername e DBPassword devidamente substituídos.


Verificar que na raiz da ClientApp existe um ficheiro de config do next com o proxy para a api:

Ficheiro: next.config.js

const rewrites = () => {
  return [
    {
      source: "/api/:path*",
      destination: "http://localhost:4000/:path*",
    },
  ];
};

4000 no meu caso, mudem para a porta que estiverem a usar 😝

No meu caso para forçar no backend é:

 launchSettings.json tem a seguinte linha dentro de “profiles”:
      "applicationUrl": "http://localhost:4000",

Ao rodar a app, se o front-end não rodar automaticamente, 'npm run dev' dentro da pasta ClientApp e ter os 2 serviços a rodar em simultâneo.
