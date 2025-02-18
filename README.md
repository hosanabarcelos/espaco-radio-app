<div>
    <img src="https://github.com/hosanabarcelos/espaco-radio-app/blob/main/public/logo.png" width="120" height="120" />
</div>

# Espaço Rádio

## 📻 Sobre o projeto
**Espaço Rádio** é uma aplicação para gerenciamento de rádios online, permitindo que usuários favoritem, editem, filtrem e ouçam suas rádios.

## 🔎 Funcionalidades principais
1. Adicionar rádios à sua lista de favoritas;
2. Visualizar a lista de rádios adicionadas;
3. Remover rádios da lista;
4. Editar informações da rádio escolhida;
5. Ouvir rádios online e controlar a reprodução;
6. Pesquisar rádios por nome, país ou idioma com paginação (10 por vez);
7. Persistência de dados para manter as rádios salvas ao retornar.

## 🛠️ Tecnologias utilizadas
- **Linguagem**: [TypeScript](https://www.typescriptlang.org/);
- **Framework**: [Vue](https://vuejs.org/);
- **Containerização**: [Docker](https://www.docker.com/);
- **Gerenciamento de estado**: [Pinia](https://pinia.vuejs.org/);
- **Estilização**: [Tailwind CSS](https://tailwindcss.com/);
- **API**: [Rádio Browser](https://www.radio-browser.info/);
- **Build**: [Vite](https://vitejs.dev/);
- **Testes**: [Vitest](https://vitest.dev/);
- **Hospedagem**: [Vercel](https://vercel.com/), disponível em [Espaço Rádio](https://espacoradio.vercel.app/).

## 📦 Como rodar localmente com Node
### 🏗️ Pré-requisito(s)
- Ter o [Node.js](https://nodejs.org/) instalado na sua máquina.

### 💻 Rodando com Node
   1. Clone o repositório e acesse o diretório:
      ```sh
      git clone https://github.com/hosanabarcelos/espaco-radio-app.git
      ```
      ```sh
      cd espaco-radio-app
      ```
   2. Instale as dependências:
      ```sh
      npm install
      ```
   3. Inicie o ambiente localmente:
      ```sh
      npm run dev
      ```
   4. Acesse a porta `5173` no navegador: [http://localhost:5173](http://localhost:5173).

## 🐋 Como rodar localmente com Docker

### 🏗️ Pré-requisito(s)
- Ter o [Docker](https://www.docker.com/) instalado na sua máquina.

### 💻 Rodando com Docker
   1. Clone o repositório e acesse o diretório:
      ```sh
      git clone https://github.com/hosanabarcelos/espaco-radio-app.git
      ```
      ```sh
      cd espaco-radio-app
      ```
   2. Construa a imagem e suba o container Docker:
      ```sh
      docker build -t espaco-radio .
      ```
      ```sh
      docker run -p 5173:5173 espaco-radio
      ```
   3. Acesse a porta `5173` no navegador: [http://localhost:5173](http://localhost:5173).

## 🧪 Como rodar os testes
Execute os testes unitários e garanta que estão funcionando corretamente e sem erros:
```sh
npm run test:unit
```

## 🚀 Práticas de Desenvolvimento
Para garantir um fluxo de trabalho eficiente e organizado, segui as seguintes práticas neste projeto:

   1. **Gitflow**: Estrutura de branches bem definida para desenvolvimento;
   2. **Commits semânticos**: Seguindo convenções como `feat:`, `fix:`, `chore:`, garantindo um projeto estruturado;
   3. **Issues**: Criação de tarefas relevantes via issues do GitHub. Veja as issues atuais [aqui](https://github.com/hosanabarcelos/espaco-radio-app/issues) e algumas que já foram fechadas [aqui](https://github.com/hosanabarcelos/espaco-radio-app/issues?q=is%3Aissue%20state%3Aclosed);
   4. **Pull requests**: As mudanças passaram por PRs seguindo o fluxo do Gitflow. Veja as PRs fechadas [aqui](https://github.com/hosanabarcelos/espaco-radio-app/pulls?q=is%3Apr+is%3Aclosed).


## 🏆 Challenge
> This is a challenge by [Coodesh](https://coodesh.com/).

