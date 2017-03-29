const ALLOCATION = 'allocation';
const ATTRIBUTION = 'attribution';
const FUNCTION_CALL = 'function call';
const LOGICAL = 'logical';
const SWITCH_LOGICAL = 'switch logical';
const WHILE_LOOP = 'while loop';
const FOR_LOOP = 'for loop';
const FUNCTION_DEFINITION = 'function definition';
const GLOBAL = 'global';

module.exports = [
  {
    comand: 'a, b, soma: inteiro',
    type: ALLOCATION,
    line: 5,
    scope: GLOBAL,
    code: []
  },
  {
    comand: 'valores: vetor [1..20] de real',
    type: ALLOCATION,
    line: 6,
    scope: GLOBAL,
    code: []
  },
  {
    comand: 'a <- 2 + 4',
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
    comand: 'escolha soma',
    type: SWITCH_LOGICAL,
    line: 12,
    scope: GLOBAL,
    options: [{
      value: [9,8],
      code: [{
        comand: 'escreval(\'Entrei no caso.\')',
        type: FUNCTION_CALL,
        line: 13,
        scope: GLOBAL,
        code: []
      }]
    },
    {
      value: [9,8],
      code: [{
        comand: 'escreval(\'Entrei no caso 2.\')',
        type: FUNCTION_CALL,
        line: 13,
        scope: GLOBAL,
        code: []
      }]
    }],
    default: [{
      comand: 'escreval(\'default.\')',
      type: FUNCTION_CALL,
      line: 13,
      scope: GLOBAL,
      code: []
    }]
  },
  {
    comand: 'escreval(\'Resultado da soma: \', soma)',
    type: FUNCTION_CALL,
    line: 13,
    scope: GLOBAL,
    code: []
  }
];
