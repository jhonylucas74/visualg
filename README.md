## visualg.js

O Visualg é biblioteca escrita em javascript para execução de código escrito em portugol usando a linguagem apresentada no [visualg](http://www.apoioinformatica.inf.br/produtos/visualg) desenvolvido pela empresa [A Apoio Informática](http://www.apoioinformatica.inf.br/empresa). A idéia é que a execução de algoritmos feitos em portugol sejam possíveis em qualquer sistema que suporta javascript. Este projeto não possui nenhum vinculo com a empresa citada acima.


#### Motivação

Esse módulo foi criado pra ser utilizado no [AndroiVisual](https://play.google.com/store/apps/details?id=av.androidvisual&hl=pt_BR) afim de subtituir a lógica feita em java para uma globalização mais interessante utilizando o js. No mais, a idéia é que a partir dessa premissa possa surgir mais produtos que possam ser interligados utilizando o visualg.

### Projeto de execução do portugol

A principio a ideia era simplesmente transpilar o portugol para o javascript. No entanto ao fazer a integração com um protótipo do androidvisual usando ionic foi encontrado um empasse na hora de executar o comando leia e ao mesmo tempo ter um rederização das informações a um nível aceitável. Por esse motivo foi necessário a mudança de paradigma e com esse repositório se dá inicio a uma versão mais parecida com a escrita em java mas utilizando js.


Abaixo segue o algoritmo inicial base para entendimento do processo que deverá ser realizado pelo visualg.js.

```c
algoritmo 'AloMundo'
// Autor : Jhony Lucas
// Data : 22/02/2017
var
  a, b, soma: inteiro

inicio
  // Seção de Comandos
  a <- 2
  b <- 3
  soma <- a + b

  escreval('Resultado da soma: ', soma)

fimalgoritmo
```

É importante ter o controle da execução de cada linha de comando do algoritmo em portugol, sendo possível definir o tempo de execução bem como pausar a execução quando o sistema estiver esperando uma entrada de dados. Para isso será usada a estrutura do código abaixo para representar uma linha de comando.

```js
var ComandLine = {
  /*Linha original.*/
  comand: 'a <- 2',
  /*Tipo do comando. No caso, atribuição.*/
  type: ATTRIBUTION,
  /*Linha em que o comando foi encontrado.*/
  line: 9,
  /*Escopo da linha de comando.*/
  scope: GLOBAL,
  /*A linha de comando pode possuir todo um
  bloco de códigos interno. Caso do Se, Para, Enquanto e etc.*/
  code: [ComandLine]
}
```

#### Linha de comando: Tipos

Todos os tipos de comandos possíveis.

* ``ALLOCATION``  - Alocação de variável no escopo.
* ``ATTRIBUTION`` - Atribuição de valor.
* ``FUNCTION_CALL`` - Chamada de função.
* ``LOGICAL`` - Comparação lógica.
* ``SWITCH_LOGICAL`` - Comparação lógica.
* ``WHILE_LOOP`` - Laço de repetição.
* ``FOR_LOOP`` - Laço de repetição.
* ``FUNCTION_DEFINITION`` - Criação de função (com escopo próprio).

Obs: escreval, escreva e leia são do tipo ``FUNCTION_CALL``.

Dos comandos citados acima somente esses listados abaixo possuem código interno que podem conter qualquer tipo de comando exceto ``ALLOCATION`` e ``FUNCTION_DEFINITION``.

* ``LOGICAL``
* ``SWITCH_LOGICAL``
* ``WHILE_LOOP``
* ``WHILE_LOOP``
* ``FUNCTION_DEFINITION.``

Se nosso primeiro algoritmo em portugal apresentado no inicio fosse convertido ele ficaria assim:

``` js
[
  {
    comand: 'a, b, soma: inteiro',
    type: ALLOCATION,
    line: 5,
    scope: GLOBAL,
    code: []
  },
  {
    comand: 'a <- 2',
    type: ATTRIBUTION,
    line: 9,
    scope: GLOBAL,
    code: []
  },
  {
    comand: 'b <- 3',
    type: ATTRIBUTION,
    line: 10,
    scope: GLOBAL,
    code: []
  },
  {
    comand: 'soma <- a + b',
    type: ATTRIBUTION,
    line: 11,
    scope: GLOBAL,
    code: []
  },
  {
    comand: 'escreval(\'Resultado da soma: \', soma)',
    type: FUNCTION_CALL,
    line: 13,
    scope: GLOBAL,
    code: []
  }
]
```
