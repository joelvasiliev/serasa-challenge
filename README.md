# Início

Para testar as funções de admin, entre na
https://serasa-challenge.vercel.app/auth
e se autentique com o seguinte usuário:

```
email: admin@email.com
senha: Umasenhamuitoforte
```

# Tecnologias

```
Next JS
TypeScript
Shadcn
Tailwindcss
Docker (Banco de dados)
MySQL
Prisma
```

# Landing Page

Essa landing page foi feita apenas para exemplificar uma aplicação real, onde seria a página de captura de clientes.

# Usuários

No sistema existem dois tipos de usuários, ADMIN e MEMBER.
A única diferença é que administradores podem convidar outros usuários, enquanto membros só podem utilizar as funções.
Porém já está estruturado para adicionar regras de negócio mais complexas com permissionamento.

Nas configurações > Membros se você for um administrador poderá criar contas para novos usuários

# Page Not Found

Esse site conta com uma página 404 para rotas não mapeadas pelo site.

Exemplo: https://serasa-challenge.vercel.app/d

# Login e Cadastro

https://serasa-challenge.vercel.app/auth

Tanto o login quanto o cadastro são feitos por essa página acima.
Todas as senhas salvas no banco de dados são criptografadas para seguir normas da LGPD.
Também é possível criar, listar usuários através da API route do Next JS.

```
POST - https://serasa-challenge.vercel.app/api/user
body: {
    email: '',
    password: ''
}
GET - https://serasa-challenge.vercel.app/api/user
resposta: retorna a lista de usuários cadastrados
```

# Dashboard

O dashboard possui sistema de filtros por range de datas, e também conta com um botão para habilitar/desabilitar a visualização do gráfico em pizza na tela.
Na listagem de dívidas, é possível criar, editar ou remover dívidas.
Também é possível pesquisar pela barra de busca ou filtrar pelo status.
Todos os dados são carregados dinamicamente, ao atualizar, remover, ou adicionar uma dívida todos os cálculos e o gráfico são atualizados.

# Multilinguagem

O site conta com a função de multilinguagem (pt-BR e en-US). Quando o usuário altera o idioma, instantaneamente toda a aplicação é traduzida de acordo com as configurações. (Por conta do tempo curto eu não traduzi 100% do site, mas traduzi grande parte)

# Animações

Utilizei a biblioteca framer-motion para adicionar algumas animações na tela para melhorar o visual.
