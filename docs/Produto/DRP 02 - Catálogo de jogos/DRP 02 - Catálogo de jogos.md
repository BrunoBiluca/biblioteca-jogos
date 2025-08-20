# DRP 02 - Catálogo de jogos

> [!important] Resumo
> O usuário deve poder catalogar seus jogos, quais as plataformas que ele possui o jogo, quais as principais características dos jogos e outras informações iniciais do jogo

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

- Nenhum

### Fora do escopo

- Integrar com API externa para auxiliar no processo de catálogo
- Garantir integridade do catálogo, como duplicatas. Vamos confiar nos usuários (por enquanto).

### Referências

- Vários outros catálogos de jogos

# Requisitos

- [[RF 02.01 - Cadastro de jogos]]
- [[RF 02.02 - Cadastro de DLCs e conteúdos extras]]
- [[RF 02.03 - Visualização dos jogos]]
- [[RF 02.04 - Edição de jogos]]

# Especificação de arquitetura

> [!warning] 🔬 API de catálogo de jogos
> - Buscar API de informações de jogos para facilitar o cadastro de jogos
> 	- API deve ser grátis, pública
> 	- IGDB para jogos
> - [https://www.igdb.com/api](https://www.igdb.com/api)

# Qualidade

- __Definição de Pronto__
- __Planos de testes__

# Esboços ou protótipos de UX

> [!warning] 🔬 Esboço e protótipo

- Tela: nome da tela
- Imagem da tela
- Explicação de cada elemento da tela
- Explicação dos comportamentos da tela