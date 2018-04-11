# btc-rest

Software desenvolvido para o processo seletivo da Yi mobile.  

O aplicativo desenvolvido em uma semana, possui os endpoints:  

GET localhost:3000/  
POST localhost:3000/users/register  
POST localhost:3000/exchange/cotacao  
POST localhost:3000/users/login  
POST localhost:3000/exchange/ordem  

Sugestão das requests estão na pasta de requests dentro do projeto.  
Para utilizar o endpoint ordem utilizar a header Authorization da response do login.  

Obs: serviço de ordem funcionando somente para testar se o usuário está autenticado. Não está abrindo ordem de serviço.  

Para criação do banco de dados use o passo a passo abaixo:  

mysql -u root -p  
campo pedindo senha  
mysql> create database btcrest;  
umysql> use btcrest;  
mysql> create table usuario (id int not null auto_increment, email varchar(255) not null, senha varchar(255) not null, primary key (id));    
mysql> create table ordem (id int not null auto_increment, usuarioid int not null, data Date not null, qtdbtc int not null, valorporbtc decimal(15,2) not null, tipo varchar(255) not null, primary key (id), foreign key (usuarioid) references usuario(id));  
mysql> create table cotacao (id int not null auto_increment, moeda varchar(255) not null, valor decimal(15,2) not null, data DateTime not null, exchange varchar(255) not null, primary key (id));  

Obs: caso login e senha diferente do padrão alterar no arquivo config/db.js.  

Para iniciar a aplicação:  

npm install  
npm start  

melhorias:  
testes unitários.
testes funcionais.  
autenticação por jwt.
variavéis de ambiente.