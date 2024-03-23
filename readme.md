<div align="center">
     <img src="https://i.ibb.co/VgFj84X/banner-solid-api.png">
</div>

## ℹ️ Sobre o projeto 

  Este é um projeto criado durante o curso de Node da RocketSeat. Este projeto aborda um dos 4 módulos do curso e destaca principalmente o uso do typescript e das ferramentas que vou mencionar abaixo.
  Além disso, a aplicação dos princípios SOLID de forma prática podem ser vistas por toda a aplicação.

## 🛠️ Tecnologias utilizadas

### Fastify

  Utilizei o fastify como base do projeto e tentei extrair o máximo que pude. Além do que o curso da rocketseat propôs eu implementei alguns extras como:
  - Logs com **pino**, inclusive configurado para que em ambiente local eu tenha todos os logs http e das querys executadas pelo prisma, isso facilita muito o debug.
  - Injetei o **prisma-client** como um plugin do fastify e também como um hook, assim eu tenho acesso à conexão do banco distríbuida por toda a aplicação.
  
### Vitest

  Foi meu primeiro contato com o vitest, porém a adaptação foi muito fácil pela compatibilidade com o jest que tenho maior proficiência.
  Em resumo:

  - 38 arquivos de teste distribuidos em testes unitários e de integração. ✅
  - Tempo de execução total variando entre 7 e 9 segundos. ✅
  - 100% de coverage! ✅

### Prisma

  Apesar de não ser o primeiro contato com o prisma, fiquei muito surpreso com as facilidades que ele trouxe durante o desenvolvimento da aplicação.
  Foi um aprendizado muito útil que será implementado em projetos futuros. Apesar disso ele não teve muito brilho pois grande parte das querys eram bem simples.
