# API - AuthSystem  

**API complementar ao projeto AuthSystem**, projetada para gerenciar o processo de autenticação e autorização de usuários em aplicações web e móveis.
Esta API fornece um conjunto de endpoints que permitem a criação, verificação e gerenciamento de contas de usuários, garantindo que apenas usuários
autorizados possam acessar recursos protegidos da aplicação.

## Conceitos Aplicados no Projeto:

- OAuth2
- OTP
- Login
- Logout
- Criptografia de informações
- Redefinição/Recuperação de senha
- Manipulação de Banco de dados
- Estruturação de Projeto

## Tecnologias Utilizadas:

- Express
- Typescript
- Knex
- Nodemailer
- Yup
- Bcrypt
- JWT
- Dotenv
- MySQL


## Requisitos

Para visualizar e modificar o projeto, você precisará de:

- Um navegador web moderno (Chrome, Firefox, Edge, etc.).
- Um editor de texto ou IDE para edição de código (VSCode, Sublime Text, etc.).
- Sistema operacional MacOS, Windows ou Linux.
- Node.js 18.18 ou maior.


## Como Usar


1. **Clone este repositório**:
    ```bash
    git clone https://github.com/ruansantosmatos/API-AuthSystem.git
    ```


2. **Gere o executável da aplicação com o comando:**:
    ```bash
    tsc
    ```


3. **Atualize as dependências com o comando:**:
    ```bash
    npm install
    ```


5. **Execute o projeto com o comando:**:
    ```bash
    npm run dev
    ```

## Estrutura do Projeto


```plaintext
├── build                    # Diretório contendo os arquivos gerados após a compilação do código typescript.


├── node_modules             # Diretório gerado pelo Node que possui todas as dependências do projeto (bibliotecas, tipagem, dentre outras).


├── src                      # Diretório principal que possui toda a estrutura do código.
   
    ├── controllers          # Diretório que possui funções de manipulação das rotas da API.
   
    ├── database             # Diretório que possui a estrutura de configuração, conexão e manipulação da base de dados.
        └── config           # Diretório responsável por configurar propriedades de conexão com a base de dados.
        └── models           # Diretório responsável por mapear a estrutura, tipos e atributos das entidades do banco de dados (tabelas, colunas, etc).
        └── providers        # Diretório responsável por possuir funções de manipulação das entidades da base de dados
        └── types            # Diretório responsável por configurar o query build (knex) com o diretório "models".
        └── index.ts         # Arquivo responsável por inicializar a conexão com a base de dados.
   
    ├── middlewares          # Diretório responsável por possuir todos os middlewares utilizados nas rotas da API.
       
    ├── routes               # Diretório responsável por possuir todas as rotas da aplicação.


    ├── server               # Diretório responsável por pela criação do servidor HTTP, consumo das rotas e middlewares


    ├── server               # Diretório responsável por possuir funções com diferentes funcionalidades que podem ser utilizadas na aplicação.


    └── index.ts             # Arquivo responsável por inicializar o servidor.


├── types                    # Diretório que possui a tipagem global para o controle e reconhecimento das variáveis de ambiente.
```

# Rotas

### **Busca o usuário pelo ID**

```http
  GET /password/1
```

| Params   | Tipo   | Descrição | Token
| :---------- | :--------- | :--- | :--- |
| `id_usuario` | `number` | **Obrigatório** para buscar as informações do usuário pelo ID.| Sim


#### Retornos

| Código | Valor | Descrição          |
| :---------- | :--------- | :------- |
| 200 | `{ 'response': [{ 'id': number, 'nome': string, 'email:' string, 'senha:' string }]}` | Sucesso na chamada da rota.|
| 400 | `{ 'response': 'usuário não localizado!' }` | Caso o id_usuario não corresponda a algum registro na base de dados.|
| 401 | `{ 'response': 'Tipo de autorização inválida!' }` | Tipo de autorização diferente de *Bearer* no envio da requisição.|
| 401 | `{ 'response': 'INVALID_TOKEN' }` | Token inválido, estrutura comprometida, tempo de vida esgotado, etc..|
| 500 | `{ 'response': string }` | Em caso de erro interno do servidor, ou falha na base de dados (conexão, ausência de tabela, etc..)|


### **Cria uma nova conta**

```http
  POST /user
```

| Body   | Tipo       | Descrição     | Token
| :---------- | :--------- | :------- | :------- |
| `{ "nome": string, "email": string, "senha": string }` | `objeto` | **Obrigatório** para a criação de uma nova conta.| Não


#### Retornos

| Código | Valor | Descrição          |
| :---------- | :--------- | :------- |
| 201 | `{ 'id': number, 'id_otp': number, 'email': string, 'token': string }` | Sucesso na chamada da rota. |
| 400 | `{ 'response': O endereço de email encontra-se em uso! }` | Caso o usuário tente criar uma mesma conta com o mesmo endereço de email. |
| 500 | `{ 'response': string }` | Em caso de erro interno do servidor, ou falha na base de dados (conexão, ausência de tabela, etc..). |


### **Gera uma sessão de Login**

```http
  POST /session
```

| Body   | Tipo       | Descrição | Token          
| :---------- | :--------- | :----------------| :----------------|
| `{ "email": string, "senha": string }` | `objeto` | Informações **obrigatórias** para gerar sessão | Não


#### Retornos

| Código | Valor | Descrição          |
| :---------- | :--------- | :------- |
| 200 | `{ 'id': number, 'token': string }` | Sucesso na chamada da rota. |
| 400 | `{ 'response': 'email incorreto' }` | Caso o usuário tente fazer login com determinado email não cadastrado. |
| 400 | `{ 'response':'senha incorreta' }` | Caso a senha do usuário esteja incorreta. |
| 500 | `{ 'response': string }` | Em caso de erro interno do servidor, ou falha na base de dados (conexão, ausência de tabela, etc..). |


### **Gera uma sessão de login com a conta Google**

```http
  POST /session/oauth
```

| Body   | Tipo       | Descrição                                | Token |
| :---------- | :--------- | :---------------------------------- | :------
| `{ "id_conta": string, "nome": string, "email": string }` | `objeto` | **Obrigatório** para a criação de uma nova conta utilizando a identificação do Google. | Não


#### Retornos

| Código | Valor | Descrição          |
| :---------- | :--------- | :------- |
| 200 | `{ 'id': number, 'token': string }` | Sucesso na chamada da rota. |
| 500 | `{ 'response': string }` | Em caso de erro interno do servidor, ou falha na base de dados (conexão, ausência de tabela, etc..). |


### **Criptografa informações**

```http
  POST /encrypt
```

| Body   | Tipo   | Descrição | Token
| :---------- | :--------- | :--- | :--- |
| `{ "data": {} }` | `objeto` | **Obrigatório** para criptografar as informações.| Sim


#### Retornos

| Código | Valor | Descrição          |
| :---------- | :--------- | :------- |
| 200 | `{ 'data': string }` | Sucesso na chamada da rota. |
| 401 | `{ 'response': 'Tipo de autorização inválida!' }` | Tipo de autorização diferente de *Bearer* no envio da requisição. |
| 401 | `{ 'response': 'INVALID_TOKEN' }` | Token inválido, estrutura comprometida, tempo de vida esgotado, etc.. |
| 500 | `{ 'response': string }` | Em caso de erro interno do servidor, ou falha na base de dados (conexão, ausência de tabela, etc..). |


### **Descriptografa informações**

```http
  POST /decrypt
```

| Body   | Tipo   | Descrição | Token
| :---------- | :--------- | :--- | :--- |
| `{ "data": string }` | `string` | **Obrigatório** para descriptografar uma string criptografada.| Sim


#### Retornos

| Código | Valor | Descrição          |
| :---------- | :--------- | :------- |
| 200 | `{ 'data': any }` | Sucesso na chamada da rota. |
| 401 | `{ 'response': 'Tipo de autorização inválida!' }` | Tipo de autorização diferente de *Bearer* no envio da requisição. |
| 401 | `{ 'response': 'INVALID_TOKEN' }` | Token inválido, estrutura comprometida, tempo de vida esgotado, etc.. |
| 500 | `{ 'response': string }` | Em caso de erro interno do servidor, ou falha na base de dados (conexão, ausência de tabela, etc..). |


### **Verifica Token de Redefinição de Senha**

```http
  PATCH /validate/token
```

| Body   | Tipo   | Descrição | Token
| :---------- | :--------- | :--- | :--- |
| `{ "id": number }` | `objeto` | **Obrigatório** para atualizar o token de redefinição de senha.| Sim


#### Retornos

| Código | Valor | Descrição          |
| :---------- | :--------- | :------- |
| 200 | `{ 'response': 'autenticação realizada com sucesso!' }` | Sucesso na chamada da rota. |
| 401 | `{ 'response': 'Tipo de autorização inválida!' }` | Tipo de autorização diferente de *Bearer* no envio da requisição. |
| 401 | `{ 'response': 'INVALID_TOKEN' }` | Token inválido, estrutura comprometida, tempo de vida esgotado, etc.. |
| 500 | `{ 'response': string }` | Em caso de erro interno do servidor, ou falha na base de dados (conexão, ausência de tabela, etc..). |


### **Redefine a senha do usuário**

```http
  PATCH /password/reset
```

| Body   | Tipo   | Descrição | Token
| :---------- | :--------- | :--- | :--- |
| `{ "id_usuario": number, "senha": string }` | `objeto` | **Obrigatório** para redefinir a senha do usuário.| Sim


#### Retornos

| Código | Valor | Descrição          |
| :---------- | :--------- | :------- |
| 200 | `{ 'response': 'Senha redefinida com sucesso!' }` | Sucesso na chamada da rota. |
| 400 | `{ 'response': 'usuário não encontrado!' }` | Caso o id_usuario não corresponda a algum registro na base de dados. |
| 401 | `{ 'response': 'Tipo de autorização inválida!' }` | Tipo de autorização diferente de *Bearer* no envio da requisição. |
| 401 | `{ 'response': 'INVALID_TOKEN' }` | Token inválido, estrutura comprometida, tempo de vida esgotado, etc.. |
| 500 | `{ 'response': string}` | Em caso de erro interno do servidor, ou falha na base de dados (conexão, ausência de tabela, etc..). |


### **Gera o link de redefinição de senha**

```http
  POST /forgot
```

| Body   | Tipo   | Descrição | Token
| :---------- | :--------- | :--- | :--- |
| `{ "email": string }` | `objeto` | **Obrigatório** para gerar o link de redefinição de senha e enviar para o email do usuário.| Sim


#### Retornos

| Código | Valor | Descrição          |
| :---------- | :--------- | :------- |
| 201 | `{ 'response': 'Link de redefinição de senha enviado com sucesso!' }` | Sucesso na chamada da rota. |
| 400 | `{ 'response': 'O endereço de email não localizado!' }` | Caso o email do usuário não corresponda a algum registro na base de dados. |
| 401 | `{ 'response': 'Tipo de autorização inválida!' }` | Tipo de autorização diferente de *Bearer* no envio da requisição. |
| 401 | `{ 'response': 'INVALID_TOKEN' }` | Token inválido, estrutura comprometida, tempo de vida esgotado, etc.. |
| 500 | `{ 'response': string }` | Em caso de erro interno do servidor, ou falha na base de dados (conexão, ausência de tabela, etc..). |


### **Busca informações de validade de determinado token**

```http
  GET /verify/token/<token>
```

| Params   | Tipo   | Descrição | Token
| :---------- | :--------- | :--- | :--- |
| `token` | `string` | **Obrigatório** para gerar o link de redefinição de senha e enviar para o email do usuário.| Sim


#### Retornos

| Código | Valor | Descrição          |
| :---------- | :--------- | :------- |
| 200 | `{ 'response': [{ 'id': number, 'criacao': string, 'valido': boolean }]}` | Sucesso na chamada da rota. |
| 401 | `{ 'response': 'Tipo de autorização inválida!' }` | Tipo de autorização diferente de *Bearer* no envio da requisição. |
| 401 | `{ 'response': 'INVALID_TOKEN' }` | Token inválido, estrutura comprometida, tempo de vida esgotado, etc.. |
| 500 | `{ 'response': string }` | Em caso de erro interno do servidor, ou falha na base de dados (conexão, ausência de tabela, etc..). |


### **Autêntica código OTP**

```http
  PATCH /verification
```

| Body   | Tipo   | Descrição | Token
| :---------- | :--------- | :--- | :--- |
| `{"id_otp": number, "id_usuario": number, "codigo": string}` | `object` | **Obrigatório** para atualizar o código OTP gerado na criação de uma nova conta de usuário.| Sim


#### Retornos

| Código | Valor | Descrição          |
| :---------- | :--------- | :------- |
| 200 | `{ 'response': { 'response': autenticação de conta realizada com sucesso! }` | Sucesso na chamada da rota. |
| 400 | `{ 'response': 'o código encontra-se inválido!' }` | Caso o usuário tente validar um código OTP inválido. |
| 400 | `{ 'response': 'código inexistente!' }` | Caso o usuário tente validar um código que não existe. |
| 401 | `{ 'response': 'Tipo de autorização inválida!' }` | Tipo de autorização diferente de *Bearer* no envio da requisição. |
| 401 | `{ 'response': 'INVALID_TOKEN' }` | Token inválido, estrutura comprometida, tempo de vida esgotado, etc.. |
| 500 | `{ 'response': string }` | Em caso de erro interno do servidor, ou falha na base de dados (conexão, ausência de tabela, etc..). |


### **Reenviar código OTP**

```http
  POST /resend
```

| Body   | Tipo   | Descrição | Token
| :---------- | :--------- | :--- | :--- |
| `{"email": string }` | `object` | **Obrigatório** para o reenvio do código OTP.| Sim


#### Retornos

| Código | Valor | Descrição          |
| :---------- | :--------- | :------- |
| 200 | `{ 'id': number }` | Sucesso na chamada da rota. |
| 401 | `{ 'response': 'Tipo de autorização inválida!' }` | Tipo de autorização diferente de *Bearer* no envio da requisição. |
| 401 | `{ 'response': 'INVALID_TOKEN' }` | Token inválido, estrutura comprometida, tempo de vida esgotado, etc.. |
| 500 | `{ 'response': falha no reenvio do código para o endereço de email. }` | Em caso de erro interno do servidor, ou falha no envio do email. |


### **Invalida código OTP**

```http
  PATCH /invalidate
```

| Body   | Tipo   | Descrição | Token
| :---------- | :--------- | :--- | :--- |
| `{"id_otp": string }` | `object` | **Obrigatório** para o reenvio do código OTP.| Sim


#### Retornos

| Código | Valor | Descrição          |
| :---------- | :--------- | :------- |
| 200 | `{ 'response': 'código invalidado com sucesso!' }` | Sucesso na chamada da rota. |
| 401 | `{ 'response': 'Tipo de autorização inválida!' }` | Tipo de autorização diferente de *Bearer* no envio da requisição. |
| 401 | `{ 'response': 'INVALID_TOKEN' }` | Token inválido, estrutura comprometida, tempo de vida esgotado, etc.. |
| 500 | `{ 'response': 'falha na invalidação do código.' }` | Em caso de erro interno do servidor, ou falha na base de dados (conexão, ausência de tabela, etc..)|


### **Busca informações de uma conta**

```http
  GET /contas/1
```

| Params   | Tipo   | Descrição | Token
| :---------- | :--------- | :--- | :--- |
| `{"id_usuario": number }` | `object` | **Obrigatório** para obter informações de uma conta que foi validada ou não.| Sim


#### Retornos

| Código | Valor | Descrição          |
| :---------- | :--------- | :------- |
| 200 | `{ 'data': [{ 'id': number, 'id_usuario': number, 'codigo': string, 'autenticada': boolean, 'validacao': string }] }` | Sucesso na chamada da rota. |
| 401 | `{ 'response': 'Tipo de autorização inválida!' }` | Tipo de autorização diferente de *Bearer* no envio da requisição. |
| 401 | `{ 'response': 'INVALID_TOKEN' }` | Token inválido, estrutura comprometida, tempo de vida esgotado, etc.. |
| 500 | `{ 'response': string }` | Em caso de erro interno do servidor, ou falha na base de dados (conexão, ausência de tabela, etc..)|


## Variáveis de Ambiente

Para a execução do projeto é necessário adicionar as respectivas variáveis de ambiente no seu arquivo `.env`

- `USER`: **Usuário da base de dados**

- `PASSWORD`: **Senha da base de dados**

- `DATABASE`: **Nome da base de dados utilizada**

- `HOST`: **Endereço IP da base de dados (localhost, etc..)**

- `DIALECT`: **Tipo de banco de dados (Mysql2, postgresql, dentre outros..)**

- `PORT`: **Porta de acesso API**

- `PORT_DATABASE`: **Porta de acesso da base de dados**

- `JTW_SCRET`: **Hash256 utilizado como segredo de assinatura JWT**

- `EXPIRES_IN`: **Tempo de vida do JTW**

- `SMTP_HOST`: **Valor padrão utilizado na biblioteca Nodemailer**

- `SMTP_PORT`: **Valor padrão utilizado na biblioteca Nodemailer**

- `ACCOUNT_EMAIL`: **Email utilizado para envio das messagens pelo Nodemailer**

- `PASSWORD_EMAIL` **Senha do email utilizado para envio das messagens pelo Nodemailer**

- `SECRET_KEY`: **Segredo de criptografia utilizado pelo services "CryptoData"**

- `SECRET_IV`: **Segredo complementar de criptografia utilizado pelo services "CryptoData"**

- `ECNRYPTION_METHOD`: **Tipo de criptografia utilizada por "CryptoData"**

- `CLIENT_URL`: **Endereço IP do cliente para a criação do link de redefinição de senha**

- `CLIENT_PORT`: **Porta de acesso do cliente**

## Middlewares

- Auth: Responsável por autenticar, validar e verificar tokens enviados nas requisições.

- index: Arquivo responsável por exportar todos os middlewares, servindo como referência na importação em outros arquivos.

- JWTServices: Responsável por criar um novo JWT ou verificar se determinado token possui a estrutura válida.

- Validation: Responsável por verificar se as informações da requisição, são exatamente as mesmas informações
que determinada rota necessita, seja essas informações estando no **body, params, header ou query**.

## Observações:

1. As variáveis de ambiente: `USER`, `PASSWORD`, `DATABASE`, `HOST`, `DIALECT` e `PORT_DATABASE`,
devem ser configuradas de acordo com a documentação oficial do query build **Knex**. Para mais informações
acesse: https://knexjs.org/guide/

2. As variáveis de ambiente: `SMTP_HOST`, `SMTP_PORT`, `ACCOUNT_EMAIL` e `PASSWORD_EMAIL`,
devem ser configuradas de acordo com a documentação oficial da biblioteca **Nodemailer**, para
mais informações consulte: https://nodemailer.com/about/. 

## Contribuições
Contribuições são bem-vindas! Se você encontrar algum problema ou tiver ideias para melhorias,
sinta-se à vontade para enviar um pull request.

## Licença
Este projeto está licenciado sob a Licença MIT.