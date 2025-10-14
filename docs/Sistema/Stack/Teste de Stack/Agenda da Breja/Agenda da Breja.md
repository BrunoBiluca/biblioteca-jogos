# Agenda da Breja

Título: Agenda da Breja

O usuário irá poder marcar suas próximas visitas as cervejarias cadastradas.

API de cervejarias:
[https://api.openbrewerydb.org/v1/breweries/](https://api.openbrewerydb.org/v1/breweries/)

## Requisitos

### 01 - Listagem das cervejarias

__Descrição__
Serão exibidos todos as cervejarias disponíveis na API de cervejarias

- Carregamento infinito
	- Serão exibidas 10 cervejarias por vez
	- `GET https://api.openbrewerydb.org/v1/breweries?page=15&per_page=3`

- Cartões para cada cervejaria

__Impacto__

- Integração com serviços externos
- Renderização de cards, imagens e outros componentes
- Gerenciamento de estado local

### 02 - Detalhes da cervejaria

__Descrição__
Quando uma cervejaria é clicada é aberta uma modal de detalhes da cervejaria para exibir todas as informaçoẽs

__Impacto__

- Navegação
- Renderização

### 03 - Agendamento de visita

__Descrição__
Na tela de cervejaria o usuário pode selecionar para marcar uma visita.

Campos necessários
- Cervejaria
- Data da visita
	- Validações
		- Apenas datas posteriores são válidas

Campos opcionais
- Pessoas
- Notas

__Impacto__

- Validação de formulários
- Navegação

### 04 - Visitas agendadas

__Descrição__
Carregar todas as visitas agendadas pelo usuário ordenadas da mais recente até a a mais distante.

__Impacto__

- Renderização de lista
- Carregamento de informações

### 05 - Sem visitas agendadas

__Descrição__
Exibir quando usuário não tem nenhuma visita agendada.

__Impacto__

- Renderização condicional

### 06 - Remoção de visitas

__Descrição__
Usuário pode remover visitas da tela inicial e deve atualizar a lista automaticamente

__Impacto__

- Renderização de componentes reativa

### 07 - Registro do usuário

__Descrição__

__Impacto__

- Roteamento de páginas
- Guarda de páginas (usuário está ou não logado)

### 08 - Login do usuário

__Descrição__

__Impacto__

- Roteamento de páginas
- Guarda de páginas (usuário está ou não logado)

### 09 - Logout

__Descrição__

__Impacto__

- Roteamento de páginas
- Guarda de páginas (usuário está ou não logado)


## Requisitos não funcionais

### Isolar serviços de consultas externas

Todas as consultas externas devem ser isoladas em seus respectivos serviços.

Apenas um lugar deve implementar uma requisição.

Simular um delay de carregamento para testar indicador de carregamento.

### Gerenciamento de dados de visitas

As visitas serão cadastradas em um banco de dados.

```json
{
"id": uuid,
"cervejaria": id da cervejaria,
"data_visita": date,
"observações": texto grande,
"galera": list[string] 
}
```

### Testes automatizados

A aplicação deve ser desenvolvida aplicando o conceito de TDD.