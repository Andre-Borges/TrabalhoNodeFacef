## Trabalho de conclusão de módulo Uni-FACEF

- Trabalho para avaliação da disciplina de Desenvolvimento WebRest com Node

## Alunos

- [André Luis Borges (22290)](https://github.com/Andre-Borges)
- [Bruno Nascimento Brancalhao (22291)](https://github.com/brunobrancalhao)
- [Iago Colbacho Bettarello (22310)](https://github.com/bettarelloiago)
- [Rafael Henrique de Morais (22321)](https://github.com/rhMorais)
- [Willyan Luindayk Machado (22327)](https://github.com/luindayk)

## Configuração

1. Caso não tenha, instale o [Docker](https://www.docker.com/get-started)

2. Renomeie o arquivo ".env.example" para ".env"

3. Instale todas as dependências:

	```sh
	$ npm install
	```

4. Suba o banco de dados com o docker:

	```sh
	$ docker-compose up
	```

5. Rode o projeto:

	```sh
	$ npm run dev
	```

## Documentação

A documentação está localizada na pasta `postman`, onde o arquivo `collection.json` estão todas as rotas e no arquivo `environment.json` estão as váriaveis de ambiente.