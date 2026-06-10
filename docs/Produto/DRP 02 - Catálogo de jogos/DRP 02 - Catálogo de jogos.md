# DRP 02 - Catálogo de jogos

> [!important] Resumo
> O usuário deve poder catalogar seus jogos, quais as plataformas que ele possui o jogo, quais as principais características dos jogos e outras informações iniciais do jogo.

Objetivos:

- Criar o catálogo de jogos
- Simplificar o processo de catálogo de jogos

Métricas para monitorar:

- Adição de jogos periódicos
- Atualização de informações dos jogos

# Contexto

Para controlar quais jogos estão sendo jogados é necessário criar um catálogo de jogos.

### Hipóteses

- Assumindo que o processo de catálogo de jogos seja simples, essa biblioteca irá crescer constantemente pelos próprios usuários

### Restrições

- Armazenamento online restrito
	- Ainda a definir o local, mas provavelmente será um armazenamento com espaço restrito, então toda otimização de espaço é bem vinda.

### Dependências

- [[DRP 01 - Jogadores]] para a maioria dos requisitos é necessário um persona jogador.

### Dúvidas

- Integrar com API externa para auxiliar no processo de catálogo

### Fora do escopo

- Garantir integridade do catálogo, como duplicatas. Vamos confiar nos usuários (por enquanto).

### Referências

- Vários outros catálogos de jogos

# Requisitos

- [[RF 02.01 - Cadastro de jogos]]
	- [[RF 02.01.01 - Preenchimento automático]]
- [[RF 02.02 - Cadastro de DLCs e conteúdos extras]]
- [[RF 02.03 - Visualização dos jogos]]
- [[RF 02.04 - Edição de jogos]]

# Especificação de arquitetura

### Pesquisa por jogos

Antes de registrar qualquer jogo o usuário deve buscar pela lista de jogos.

Essa lista é recuperada primeiramente pelo nosso próprio banco de dados e após pelo serviço [https://www.igdb.com/api](https://www.igdb.com/api). Caso não o jogo não foi encontrado o usuário pode entrar com um novo registro de um jogo.

### Armazenamento do cadastro de Jogos

Todos os jogos registrados passam a fazer parte da nossa base de dados.

Tabela: `Games`

Campos:
 - Nome
 - Desenvolvedora
 - Ano de publicação


# Qualidade

- __Definição de Pronto__
- __Planos de testes__

# Esboços ou protótipos de UX

- [[Guia visual]]

## Tela de cadastro de jogos

![[UI - Formulário de cadastro de jogo|%cheio]]


## Página de todos os jogos

![[UI - Página de todos os jogos|%cheio]]

## Página do jogo

![[UI - Página do jogo|%cheio]]

#### Observações

- Modo de edição é permitido apenas para jogadores.