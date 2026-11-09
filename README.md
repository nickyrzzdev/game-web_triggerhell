# 🐾 SnoopyScape

> Um jogo de tiro 2D top-down em HTML5, inspirado em **Berzerk** e **Enter the Gungeon**, desenvolvido com **Excalibur.js** e **TypeScript**.

[![Deploy](https://github.com/nickyrzzdev/snoopyscape/actions/workflows/deploy.yml/badge.svg)](https://github.com/nickyrzzdev/snoopyscape/actions/workflows/deploy.yml)

🎮 **Jogue:** [SnoopyScape — GitHub Pages](https://nickyrzzdev.github.io/snoopyscape/)

---

## Sobre o projeto

SnoopyScape é um jogo 2D de ação e sobrevivência no qual o jogador controla Snoopy, um personagem que precisa explorar salas, enfrentar inimigos, desviar de ataques e sobreviver o máximo possível.

O jogo utiliza uma perspectiva top-down, com salas geradas proceduralmente, inimigos com diferentes comportamentos, sistema de armas e progressão por níveis.

O projeto foi desenvolvido em equipe como trabalho acadêmico, utilizando TypeScript e o framework Excalibur.js.

## Funcionalidades

**Legenda:** ✅ Implementado · 🚧 Em desenvolvimento · 📝 Planejado

| Status | Funcionalidade |
|:---:|---|
| ✅ | Engine Excalibur.js e gerenciamento de cenas (Menu, Jogo e Game Over) |
| ✅ | Movimentação do jogador em 8 direções (WASD / setas) |
| ✅ | Sistema de estados do jogador (idle, walk, hurt e dead) |
| ✅ | Sistema de vida, dano e invulnerabilidade temporária (*i-frames*) |
| ✅ | Dois modos de disparo: pistola normal e rajada (*burst*) |
| ✅ | Mira direcionada pelo mouse e disparo de projéteis |
| ✅ | Sistema de colisões entre jogador, inimigos, paredes e projéteis |
| ✅ | Inimigos com diferentes variantes e comportamentos |
| ✅ | IA de perseguição com busca de caminhos (*pathfinding / BFS*) |
| ✅ | Disparos inimigos em 8 direções e verificação de linha de visão |
| ✅ | Projéteis inimigos com detecção de paredes e proximidade do jogador |
| ✅ | Chefe indestrutível Evil Otto, com espera, aviso e perseguição |
| ✅ | Geração procedural de salas e labirintos com caminhos conectados |
| ✅ | Portas que bloqueiam a saída até a eliminação dos inimigos |
| ✅ | Portais e transição entre salas, com progressão de níveis |
| ✅ | Sistema de inimigos por sala |
| ✅ | Sistema de pontuação e HUD com vida, nível e pontuação |
| ✅ | Pickups de coração e recuperação de vida a cada 3 níveis |
| ✅ | Sprites pixel art e animações do jogador, inimigos e tochas |
| ✅ | Efeitos sonoros para ações e eventos do jogo |

## Controles

| Ação | Tecla / Botão |
|---|---|
| Movimentar | `W`, `A`, `S`, `D` ou setas |
| Mirar | Mouse |
| Atirar | Botão esquerdo do mouse |
| Selecionar pistola normal | `1` |
| Selecionar rajada | `2` |

## Tecnologias utilizadas

- **[TypeScript](https://www.typescriptlang.org/)** — linguagem utilizada no desenvolvimento.
- **[Excalibur.js](https://excaliburjs.com/)** — engine para jogos 2D em HTML5.
- **[Vite](https://vite.dev/)** — ferramenta de desenvolvimento e build.
- **HTML5** — plataforma de execução do jogo.
- **Git e GitHub** — controle de versão e colaboração.
- **GitHub Actions** — automação do processo de publicação.
- **GitHub Pages** — hospedagem do jogo.

## Como executar localmente

### Pré-requisitos

- [Node.js](https://nodejs.org/) — versão 20 ou compatível.
- npm (instalado junto com o Node.js).
- Git.

### Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/nickyrzzdev/snoopyscape.git
   ```

2. Entre na pasta do projeto:

   ```bash
   cd snoopyscape
   ```

3. Instale as dependências:

   ```bash
   npm install
   ```

4. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

5. Acesse o endereço local exibido no terminal.

### Outros comandos

| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia o servidor de desenvolvimento. |
| `npm run build` | Verifica os tipos TypeScript e gera a versão de produção. |
| `npm run preview` | Executa uma prévia local da versão compilada. |

## Estrutura do projeto

```text
snoopyscape/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── public/
│   └── assets/
├── src/
│   ├── actors/
│   ├── assets/
│   ├── config/
│   ├── input/
│   ├── scenes/
│   ├── systems/
│   ├── ui/
│   ├── weapons/
│   ├── world/
│   ├── main.ts
│   └── sounds.ts
├── index.html
├── package.json
├── package-lock.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Equipe

O projeto foi desenvolvido colaborativamente por três integrantes:

| Integrante | Responsabilidades |
|---|---|
| **Nicole** | Liderança técnica, gerenciamento da Engine e das cenas, física, máquina de estados, integração do chefe, repositório, CI/CD e revisão de Pull Requests. |
| **Erick** | Sistema de disparos e projéteis, colisões, inteligência artificial de perseguição, geração de inimigos e efeitos sonoros. |
| **Gabriel** | Sistema de movimentação e entrada, HUD, carregamento de assets, sprites e implementação dos sistemas de armas e pickups. |

*As responsabilidades representam a divisão geral do trabalho. Algumas funcionalidades tiveram contribuições de mais de um integrante.*

## Fluxo de trabalho com Git

Para manter a organização do desenvolvimento em equipe, o projeto utiliza branches e Pull Requests.

**Regras de colaboração:**

- Não realizar commits diretamente na branch `main`.
- Criar uma branch específica para cada funcionalidade ou correção.
- Enviar as alterações por Pull Request.
- Solicitar revisão antes de integrar as alterações à `main`.
- Resolver conflitos antes do merge.

### Padrão de branches

| Prefixo | Utilização |
|---|---|
| `feat/` | Nova funcionalidade |
| `fix/` | Correção de bugs |
| `refactor/` | Refatoração |
| `docs/` | Documentação |
| `chore/` | Configurações e manutenção |

### Exemplos de comandos

```bash
# Atualizar a main
git switch main
git pull origin main

# Criar uma nova branch
git switch -c feat/nome-da-funcionalidade

# Adicionar alterações
git add .

# Criar commit
git commit -m "feat: descrição da alteração"

# Enviar branch para o GitHub
git push -u origin feat/nome-da-funcionalidade
```

Após o envio, abra um Pull Request para a branch `main`.

## Deploy

O projeto utiliza **GitHub Actions** para automatizar a publicação no GitHub Pages.

O processo acontece quando há um push na branch `main` ou quando o workflow é executado manualmente.

As etapas são:

1. Instalação das dependências com `npm ci`.
2. Compilação do projeto com `npm run build`.
3. Geração dos arquivos de produção na pasta `dist/`.
4. Publicação dos arquivos no GitHub Pages.

O Vite utiliza o caminho base `/snoopyscape/` para garantir que os recursos sejam carregados corretamente no endereço de publicação.

🔗 **[Acessar o jogo](https://nickyrzzdev.github.io/snoopyscape/)**

## Referências

- [Excalibur.js — Documentação oficial](https://excaliburjs.com/)
- [TypeScript — Documentação oficial](https://www.typescriptlang.org/docs/)
- [Vite — Documentação oficial](https://vite.dev/guide/)
- [GitHub Actions — Documentação](https://docs.github.com/en/actions)
- [GitHub Pages — Documentação](https://docs.github.com/en/pages)

---

<p align="center">
  Desenvolvido por Nicole, Erick e Gabriel.
</p>
