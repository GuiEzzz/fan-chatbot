# Fan Chatbot 🤖🎮

Uma interface conversacional voltada para fãs da FURIA, com foco em CS:GO.

## 🚀 Objetivo

Criar uma experiência interativa para fãs da FURIA com um chatbot funcional. A ideia é proporcionar respostas divertidas, úteis e rápidas sobre o time, partidas, jogadores ou até mesmo curiosidades baseadas em prompts enviados pelo usuário.

## 🧰 Tecnologias utilizadas

- [Next.js](https://nextjs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [OpenAI API](https://platform.openai.com/)
- [Vercel](https://vercel.com/) (para deploy)

## 💡 Funcionalidades esperadas

- Permitir que o usuário envie perguntas relacionadas ao time FURIA.
- Exibir respostas do chatbot de forma rápida e amigável.
- Exibir uma mensagem de boas-vindas automática ao carregar o chat.
- Manter o histórico de mensagens trocadas entre usuário e bot durante a sessão.
- Scroll automático para a última mensagem enviada/recebida.
- Apresentar sugestões de perguntas ao lado do chat para guiar o usuário.
- Layout responsivo: se adaptando bem tanto em desktop quanto em dispositivos menores.
- Estilização baseada na identidade visual da FURIA (preto, branco e cinza).
- Interface intuitiva e amigável para torcedores da organização.

## ⚙️ Como rodar o projeto

1. Clone o repositório:

```bash
git clone https://github.com/GuiEzzz/fan-chatbot.git
cd fan-chatbot
```

2. Instale as dependências:
```bash
npm install
```

3. Crie um arquivo .env.local e adicione sua chave da OpenAI:
```bash
OPENAI_API_KEY=your_key_here
```

4. Rode o projeto:
```bash
npm run dev
```

🗂️ Estrutura do projeto
```bash
components/   → Componentes reutilizáveis
src/app/      → Diretório do Next.js App Router
utils/        → Funções utilitárias
```
📦 Deploy
O projeto será hospedado na Vercel. Após conexão com o GitHub, o deploy é automático com cada push na main.

📹 Apresentação
O projeto será demonstrado em um vídeo de até 3 minutos com funcionalidades básicas e navegação.

✍️ Autor
[Guilherme Enz]
