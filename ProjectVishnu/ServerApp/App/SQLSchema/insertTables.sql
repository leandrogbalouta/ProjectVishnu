INSERT INTO CATEGORIAS_PROFISSIONAIS
(codigo,nomenclatura) values
('1234567','XXXXXXX'),
('1243123','XXXXXXX');

INSERT INTO FUNCIONARIO 
(nome,dtnascimento,telemovel,contactoemergencia,nacionalidade,mercado,
tipodocident,docident,tituloresidencia,manifestacaointeresse,
validadedocident,catprof,nif,niss,morada,contratoinicio,
contratofim,vencimentobase,tiposalario,salarioreal,calcado,
cartaconducao,iban) values
('Francisco Martins','1999-03-20',
'916705652','214439239','Portuguesa',
'portugal','CC','14627570',null,null,
'2025-09-19','1234567','255896379',
'12345678910','Rua Leandro Bolota n420',
'2021-03-09','2023-03-09',800.0,
'fixo',800.0,null,'Sim',
'0000000000000000000000'),
('Afonso Ramos','1999-05-30',
'919929349','214456789','Portuguesa',
'portugal','CC','13456234',null,null,
'2027-08-29','1243123','234567899',
'10987654321','Rua Antonio Silva n14 3Esq',
'2020-05-30','2022-05-30',900.0,
'fixo',900.0,null,'Sim',
'111111111111111111111'),
('Joao Filipe','1985-06-07',
'967899876','214498672','Espanhola',
'espanha','CC','195345543',null,null,
'2023-09-09','1243123','244555678',
'12436587091','Rua Umberto Delgado n66',
'2019-08-20','2022-12-31',900.0,
'horario',900.0,null,'Sim',
'22222222222222222222');

INSERT INTO OBRA
(codigointerno,designacao,cliente,
datainicio,datafim,mercado,autosdemedicao) values
('OB22PT04','Obra de um edificio','ISEL',
'2022-05-09','2025-05-09','Portugal',
'Autos de medicao');

INSERT INTO FUNCIONARIOS_OBRAS
(funcionario,obra,datacomeco,datafim) values
('255896379','OB22PT04','2022-05-10',
null);