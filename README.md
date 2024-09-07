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
├── build                    # Diretório contendo os arquivos gerado após a compilação do código typescript.

├── node_modules             # Diretório gerado pelo Node que possui todas as dependencias do projeto (bibliotecas, tipagem, dentre outras).

├── src                      # Diretório principal que possui toda a estrutura do código.
    
    ├── controllers          # Diretório que possui funções de manipulação das rotas da API.
    
    ├── database             # Diretório que possui a estrutura de configuração, conexão e manipulação da base de dados.
        └── config           # Diretório responsável por configurar propiedades de conexão com a base de dados.
        └── models           # Diretório responsável por mapear a estrutura, tipos e atributos das entidades do banco de dados (tabelas, colunas, etc..). 
        └── providers        # Diretório responsável por possuir funções de manipulação das entidades da base de dados
        └── types            # Diretório responsável por configurar o query build (knex) com o diretório "models".
        └── index.ts         # Arquivo responsável por inicializar a conexão com a base de dados.
    
    ├── middlewares          # Diretório responsável por possuir todos os middlewares utilizados nas rotas da API.
       
    ├── routes               # Diretório responsável por possuir todas as rotas da aplicação.

    ├── server               # Diretório responsável por pela criação do servidor HTTP, consumo das rotas e middlewares

    ├── server               # Diretório responsável por possuir funções com diferentes funcionalidades que podem ser utilizadas na aplicação.

    └── index.ts             # Arquivo responsável por inicializar o servidor.

├── types                    # Diretório que possui a tipagem global para o controle e reconhecimento das variáves de ambiente.
```

## Documentação da API

#### Cria uma nova conta

```http
  POST /user
```

| Body   | Tipo       | Descrição     | Token
| :---------- | :--------- | :------- | :------- |
| `{"nome": string, "email": string, "senha": string}` | `objeto` | **Obrigatório** para a criação de uma nova conta.| Não

### Retornos

| Código| Valor | Descrição     |
| :---------- | :--------- | :------- | 
| 201 | `{ 'id': number, 'id_otp': number, 'email': string, 'token': string }` | Sucesso na chamada da rota | 
| 400 | `O endereço de email encontra-se em uso!` | Caso o usuário tente criar uma mesma conta com o mesmo endereço de email | 

#### Cria uma nova conta

```http
  POST /user
```

| Body   | Tipo       | Descrição | Token    
| :---------- | :--------- | :--------------| :--------------|
| `{"nome": string, "email": string, "senha": string}` | `objeto` | **Obrigatório** para a criação de uma nova conta.| Não

#### Gera uma sessão

```http
  POST /session
```

| Body   | Tipo       | Descrição | Token           
| :---------- | :--------- | :----------------| :----------------|
| `{"email": string, "senha": string}` | `objeto` | Informações **obrigatórias** para gerar sessão | Não

#### Gera uma sessão com a conta Google

```http
  POST /session/oauth
```

| Body   | Tipo       | Descrição                                | Token |
| :---------- | :--------- | :---------------------------------- | :------ 
| `{"id_conta": string, "nome": string, "email": string}` | `objeto` | **Obrigatório** para a criação de uma nova conta utilizando a identificação do Google. | Não

#### Criptografa informações e retorna os dados criptografados

```http
  POST /encrypt
```

| Body   | Tipo   | Descrição | Token
| :---------- | :--------- | :--- | :--- |
| `{"data": {}}` | `objeto` | **Obrigatório** para criptografar as informações.| Sim

## Middlewares

- Auth: Responsável por autenticar, validar e verificar tokens enviados nas requisições.

- index: Arquivo responsável por exportar todos os middlewares, servindo como referência na importação em outros arquivos.

- JWTServices: Responsável por criar um novo JWT ou verificar se determinado token possui a estrutura válida.

- Validation: Responsável por verificar se as informações da requisição, são exatamente as mesmas informações
que determinada rota necessita, seja essas informações estando no **body, params, header ou query**.

## Contribuições
Contribuições são bem-vindas! Se você encontrar algum problema ou tiver ideias para melhorias, 
sinta-se à vontade para enviar um pull request.

## Licença
Este projeto está licenciado sob a Licença MIT.
