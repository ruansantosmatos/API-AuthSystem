# API - AuthSystem  

*API complementar ao projeto AuthSystem*, projetada para gerenciar o processo de autenticação e autorização de usuários em aplicações web e móveis. 
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

1. **Inicie um projeto Next**:
    ```bash
    npx create-next-app@latest <NameApp>
    ```

2. **Clone este repositório**:
    ```bash
    git clone https://github.com/ruansantosmatos/AuthSystem.git
    ```

3. **Inicie o prompt de comando no diretório do projeto e execute**:
    ```bash
    npm run dev
    ```

4. **API AuthSystem**:
    - Torna-se necessário a utilização da API backend, desenvolvida para garantir a interação
    com o cliente, assim como manipulação das informações e interações da aplicação. Para mais detalhes
    a cerca da documentação e endpoints acesse: 

5. **Personalize o estilo**:
    - Para aplicar modificações de estilo global, edite o arquivo `styles/globals.css` conforme necessário.
    Nas modificações de componentes, páginas, dentre outros, torna-se necessário a utilização do Tailwind CSS

## Estrutura do Projeto

```plaintext
├── public                   # Diretório que possui utilitários gerais (icones, imagens, dentre outros).

├── src
    ├── api                  # Diretório responsável por definir os endpoints da API para consumo.
        └── config           # Arquivo contendo as configurações da API.
        └── models           # Tipagem estrutural das entendidades da base de dados.
    
    ├── app                  # Diretório principal contendo todas as rotas e páginas da aplicação.
    
    ├── components           # Diretório contendo componentes globais e de bibliotecas.
        └── ui               # Diretório gerado para componentes tailwind CSS da biblioteca Sadcn UI.
    ├── lib                  # Diretório que possui componente base para a utilização do Sadcn UI.
    
    ├── services             # Diretório responsável por conter funções que podem ser utilizadas de maneiras gerais.
    
    ├── styles               # Diretório que possui os arquivos de estilos gerais da aplicação.

```

## Demonstração

### Login/Logout
https://github.com/user-attachments/assets/0ae13b46-1598-4ab3-987f-f368d5ceb6f4

### Criação de Conta
https://github.com/user-attachments/assets/c0d11adc-ef6d-4316-a2e9-1aa3f704dd8c

### Redefinição de Senha
https://github.com/user-attachments/assets/8fbe26b1-b185-4fd7-bc12-f1c55986730b

### Código OTP
https://github.com/user-attachments/assets/c2c53b74-b0e2-4348-bccd-74d8868db29b

## Observações

1. Para executar o processo de login com a conta google, torna-se necessário a utilização do 
código das crendenciais de acesso para a aplicação, consulte a documentação oficial:
[Google Identity](https://developers.google.com/identity/protocols/oauth2?hl=pt-br)

## Contribuições
Contribuições são bem-vindas! Se você encontrar algum problema ou tiver ideias para melhorias, 
sinta-se à vontade para enviar um pull request.

## Licença
Este projeto está licenciado sob a Licença MIT.
