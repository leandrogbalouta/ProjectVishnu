Ao atualizar a base de dados, de maneira a atualizar também a pasta models, correr o comando :
Scaffold-DbContext “Host=localhost;Database=DBName;Username=DBUsername;Password=DBPassword” Npgsql.EntityFrameworkCore.PostgreSQL -OutputDir Models -force
no Packet Manager Console, com os campos DBName, DBUsername e DBPassword devidamente substituídos.