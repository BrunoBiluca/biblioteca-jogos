# Levantamento da Stack

### Características da stack

Características que serão levadas em consideração para escolha das tecnologias e serviços utilizados.

- Portabilidade
	- Foco em Web, seria bom ter capacidade porte para outras plataformas

- Hospedagem e armazenamento
	- Grátis* (até % de uso, que seja razoável com uma base pequena de usuários)

- Usabilidade
	- Curva de aprendizado: Pequena
	- Documentação abrangente em relação aos requisitos
	- Sólida, vários casos de solução de problemas

- UI
	- Capacidade de responder dinamicamente a interação com o usuário

- Trabalho
	- Quantidade de trabalho pra fazer o módulo nessa tech ou serviço
	- Criação de ambientes (local, dev, prod)
	- Integração e entrega contínuas

### Opções

| Necessidade                  | Tech                  | Portabilidade                                                     | Hospedagem                                                          | Usabilidade                                                             | UI                            | Trabalho                                 | Decisão |
| ---------------------------- | --------------------- | ----------------------------------------------------------------- | ------------------------------------------------------------------- | ----------------------------------------------------------------------- | ----------------------------- | ---------------------------------------- | ------- |
| Interação com usuário        | React (React Router)  |                                                                   |                                                                     |                                                                         |                               |                                          |         |
|                              | Flutter               | Portável para todas as plataformas                                |                                                                     | Curva de aprendizado alta, documentação boa, comunidade boa             |                               |                                          |         |
|                              | Astro                 |                                                                   |                                                                     |                                                                         |                               |                                          |         |
|                              | Svelte                |                                                                   |                                                                     |                                                                         |                               |                                          |         |
|                              |                       |                                                                   |                                                                     |                                                                         |                               |                                          |         |
| Autenticação de usuário      | Supabase<br>          |                                                                   |                                                                     |                                                                         |                               |                                          |         |
|                              | https://surrealdb.com |                                                                   |                                                                     |                                                                         |                               |                                          |         |
|                              |                       |                                                                   |                                                                     |                                                                         |                               |                                          |         |
| Serviços                     | Fastapi               |                                                                   |                                                                     | Curva de aprendizado baixa, por mais que o SQLAlchemy tem suas questões |                               |                                          |         |
|                              |                       |                                                                   |                                                                     |                                                                         |                               |                                          |         |
| Web app (Front + Back)       | .net Core (Blazor)    | Front acoplado, Backend facilmente utilizável como apenas serviço | Mais simples, por precisar hospedar apenas uma instância de serviço | Front (baixa)<br>Backend (média)                                        | ❓ Como funciona reactividade? | Menor, por juntar tudo no mesmo ambiente |         |
|                              | Laravel               |                                                                   |                                                                     |                                                                         |                               |                                          |         |
|                              |                       |                                                                   |                                                                     |                                                                         |                               |                                          |         |
| Armazenamento de dados       |                       |                                                                   |                                                                     |                                                                         |                               |                                          |         |
|                              |                       |                                                                   |                                                                     |                                                                         |                               |                                          |         |
|                              |                       |                                                                   |                                                                     |                                                                         |                               |                                          |         |
| Monitoramento de requisitos  |                       |                                                                   |                                                                     |                                                                         |                               |                                          |         |
|                              |                       |                                                                   |                                                                     |                                                                         |                               |                                          |         |
| Monitoramento de sustentação |                       |                                                                   |                                                                     |                                                                         |                               |                                          |         |

