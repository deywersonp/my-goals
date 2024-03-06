### Sobre o projeto

- My-Goals é um app de metas que permite que o usuário crie um objetivo e vá fazendo depósitos ou retiradas com o objetivo de alcançar o valor estimado.
- O projeto faz uso do `nativewind`, uma lib que permite utilizar na propriedade `className` as classes já prontas do `tailwind`.
- Foi utilizada a lib `@gorhom/bottom-sheet` para criar o menu suspenso. Essa lib além de permitir a criação de um menu suspenso também trás funcionalidades relacionadas a gestos.
- Utilizamos também o `sqlite/next` (sqlite com as próximas novidades do sqlite) como banco de dados. Utilizando o sqlite, fazemos uso do provider que fica responsável por fazer a gestão da instância do nosso banco de dados, compartilhando através de contextos com toda nossa aplicação, removendo a necessidade de gerencias instâncias toda vez que uma nova chamada precisa ser feita ao db.

  | Importante: Sempre que estiver trabalhando com SQL, não coloque vírgula na última linha do comando (comando que antecede o fechamento do parenteses da instrução).
