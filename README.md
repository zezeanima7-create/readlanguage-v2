# ReadLanguage Plus

Protótipo de estudo de idiomas estático para GitHub Pages.

## Arquivos
- `index.html`: login/cadastro demonstrativo, preferências e trilha de curso.
- `lesson.html`: página separada para responder às lições.
- `style.css`: interface responsiva, trilha em zigue-zague e estilos.
- `app.js`: cursos, perguntas, seleção de idioma e estatísticas locais.
- `animation.js`: onda e estrelas nos cliques.

## Publicar no GitHub Pages
Envie todos os arquivos para a raiz do repositório. Em **Settings → Pages**, selecione `Deploy from a branch`, branch `main` e pasta `/ (root)`. Abra a URL do GitHub Pages do repositório.

## Importante sobre login
Este projeto é apenas um protótipo front-end. Cadastro, senha e progresso são guardados no navegador com `localStorage` e `sessionStorage`. Não existe autenticação segura, recuperação de senha nem sincronização entre dispositivos. Não utilize senhas reais. Para produção, implemente um serviço de autenticação e banco de dados no servidor.
