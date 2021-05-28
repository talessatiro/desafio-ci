## Descrição

Desafio Full Cycle de Integração Contínua (CI) usando o [Nest](https://github.com/nestjs/nest) framework como applicação Nodejs.

## Instruções

- [x] Crie uma pequena aplicação simples em node.js (qualquer aplicação mesmo).
- [x] Crie testes de unidade para essa aplicação.
- Crie uma pipeline de CI utilizando o Github actions que:
  - [x] Instale a aplicação
  - [x] Execute os testes
  - [x] Execute o SonarCloud
- [x] No Github, ative o status check para que seja possível dar o merge apenas se a aplicação passar na pipeline de CI e também se a aplicação passar no quality gate do SonarCloud.
- [x] Crie uma Pull Request (PR) realizando todo o processo.

## Informações SonarCloud

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=talessatiro_desafio-ci&metric=alert_status)](https://sonarcloud.io/dashboard?id=talessatiro_desafio-ci)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=talessatiro_desafio-ci&metric=coverage)](https://sonarcloud.io/dashboard?id=talessatiro_desafio-ci)