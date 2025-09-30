# DRP 04 - Registro de desafios

> [!important] Resumo
> Para controle do jogador, ele terá a opção de criar seus próprios desafios para cada jogo adquirido.

Objetivos:

- Permitir ao jogador 
	- Criar seus próprios desafios
	- Ter controle sobre o estado de cada jogo

Métricas para monitorar:

- Criação de desafios periódicos
- Criação de desafios por jogo
- Tipos de desafios criados

# Contexto

Cada jogo tem vários desafios que o jogador pode fazer. Seja zerar o jogo ou até alcançar um ranking específico ele precisa de uma forma de controlar sua jogatina.

### Hipóteses

- Jogadores irão organizar os principais desafios de cada jogo que estão jogando
- Jogadores não irão organizar cada desafio proposto pelo jogo, apenas os principais

### Restrições

- Cada desafio é associado a um jogo apropriado pelo jogador e pelo próprio jogador

### Dependências

- [[DRP 02 - Catálogo de jogos]]

### Dúvidas

- 

### Fora do escopo

- Ver os desafios de outros jogadores
- Ter desafios públicos para os jogos disponíveis no catálogo, por exemplo, não deve existir nenhum tipo de sugestão de desafios para os jogadores, eles tem que criar seus próprios desafios

### Referências

- Troféus/Conquistas em plataformas de jogos são desafios propostos pelos próprios desenvolvedores de cada jogo. Agora é a vez dos próprios jogadores criarem seus próprios desafios.

# Requisitos

- [[RF 04.01 - Registro de um desafio]]
- [[RF 04.01.01 - Tipos de Desafios]]
- [[RF 04.01.02 - Plataforma de jogatina]]
- [[RF 04.04 - Desafios abertos]]
- [[RF 04.04.01 - Desafios pausados]]
- [[RF 04.05 - Jogando no momento]]
- [[RF 04.06 - Concluindo um desafio]]
- [[RF 04.07 - Abandonando de um desafio]]
- [[RF 04.08 - Remover desafios]]

# Especificação de arquitetura

### Descrição de estratégias e soluções técnicas


### Diagramas arquiteturais, modelagem, relacionamentos...

- /games/123/challenge/456
	- Header: Authentication: Token

## Requisitos técnicos


## Requisitos não funcionais


# Qualidade

- __Definição de Pronto__
- __Planos de testes__

# Esboços ou protótipos de UX

