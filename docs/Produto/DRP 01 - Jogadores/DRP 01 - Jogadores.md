# DRP 01 - Jogadores

> [!important] Resumo
> Jogadores são o principal usuário da biblioteca de games. 
> 
> Os jogadores querem principalmente rastrear o progresso em seus jogos favoritos e a plataforma deve ajudar os jogadores a conseguir fazer isso. Eles são responsáveis pela maioria das informações da plataforma como cadastro de novos jogos, registro de atividades nos jogos, e etc.
> 
> A plataforma serve como uma comunidade entre os jogadores, onde eles podem compartilhar suas conquistas e outras informações.

**Objetivos**

- Liberar funcionalidades para os jogadores

**Métricas para monitorar**

- Acessos periódicos a plataforma
- Número de registros de atividade em jogos
- Número de cadastro de novos jogos na plataforma
- Número de alteração em informações de jogos na plataforma

# Contexto

Para alterar qualquer informação dentro do ambiente da biblioteca de games é necessário estar registrado como um jogador.

### Hipóteses

- Jogadores irão submeter informações sobre novos jogos
- Jogadores irão ajustar informações sobre os jogos já contidos na plataforma em caso de erro
- Jogadores irão rastrear o progresso de seus jogos

### Restrições

- Sistema de autenticação gratuito
- Hospedagem gratuita

### Dependências

- Nenhuma

### Dúvidas

- Nenhuma

### Fora do escopo

- Integrações a vários outros sistemas

### Referências

- Qualquer website

# Requisitos

- [[RF 01.01 - Registro]]
- [[RF 01.02 - Esqueceu a senha?]]
- [[RF 01.03 - Autenticação]]
- [[RF 01.03.01 - Persistência da sessão do usuário]]

# Especificação de arquitetura

> [!warning] 🔬 Autenticação gratuita
> - [https://turso.tech/](https://turso.tech/)
> - [supabase](https://supabase.com/auth)
> - Desenvolvimento próprio

#### supabase

Para a autenticação um forma gratuita de implementação é utilizar a plataforma da [supabase](https://supabase.com/auth).

Essa plataforma já disponibiliza vários provedores de autenticação sendo uma boa pedida para poucos usuários.

[Documentação](https://supabase.com/docs/guides/auth)


## Requisitos técnicos


## Requisitos não funcionais


# Qualidade

- __Definição de Pronto__
- __Planos de testes__

# Esboços ou protótipos de UX

- [[Guia visual]]

## Tela de cadastro

![[UI - Tela de cadastro]]

## Tela de Login

![[UI - Login]]