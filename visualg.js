const ALLOCATION = 'allocation';
const ATTRIBUTION = 'attribution';
const FUNCTION_CALL = 'function call';
const LOGICAL = 'logical';
const SWITCH_LOGICAL = 'switch logical';
const WHILE_LOOP = 'while loop';
const FOR_LOOP = 'for loop';
const FUNCTION_DEFINITION = 'function definition';
const GLOBAL = 'global';

var comands = require('./algoritmo');

/* Escopos disponíveis do algoritmo.
 De inicío o único criado é o global. */
var scopes = {
  global: {
    vars: {  } // Iniciando variáveis
  }
};

/* Funções de chamada disponíveis */
var functions = {
  escreval: (...args) => {
    console.log(args.join(''));
  },
  escreva: (...args) => {
    console.log(args.join(''));
  }
}

/* Criando uma variável no escopo desejado. */
function createVariable (scope, variable, obj){
  if (!scopes[scope]) scopes[scope] = {vars: {}};
  scopes[scope].vars[variable] = obj;
}


/* Alocando variável. */
function runAllocation (data) {
  var str  = data.comand.replace(/ /g,'').match(/^(.*):/);
  var type = data.comand.replace(/ /g,'').match(/\w+$/)[0];

  if(!str[1]) return false;
  var vars = str[1].split(',');

  for (let variable of vars) {
    var value = null;

    // Caso seja um vetor.
    if(/vetor/.test(data.comand)){
      let dimension = data.comand.match(/\.\./g);
      if(dimension.length == 1){
        value = []; // uma dimensão
      } else {
        value = dimension.map(() => []); // 1 + n dimensões
      }
    }

    createVariable (data.scope, variable, {
      value: value,
      type: type
    });
  }
}

/* Retorna valor de uma varável de acordo com escopo.*/
function getValue (variable, scope) {
  return scopes[scope].vars[variable].value;
}

/* Alterando escopo de variáveis para execução do eval.*/
function changeVarsValues (str, scope) {
  var content = str.split(/(\+|\-|\*|\/|\<\=|\>\=|\=\=|\=|\<|\>)/);
  /* !!!!!! <<<<<  BUG QUANDO TEM UM DESSES SIMBOLOS ACIMA EM UMA STRING*/

  // Removendo espaços em branco.
  content = content.map((word) => {
    if(!/\'|\"/.test(word))
      word = word.replace(/ /g,'');
    return word;
  });

  // todas as variáveis disponíveis do escopo
  var variables = new RegExp(Object.keys(scopes[scope].vars).join('|'));
  // Trocando nomes de variáveis pelo valor delas.
  content = content.map((word) => {
    if(!/\'|\"/.test(word) || !/\+|\-|\*|\/|\<\=|\>\=|\=\=|\=|\<|\>/){
      if(variables.test(word))
        return `getValue('${word}','${scope}')`;
    }
    return word;
  });

  return content;
}

/* Atribuição de variável */
function runAttribuition (data) {
  var varname = data.comand.match(/^(.*)<-/)[1].replace(' ', '');
  var content = changeVarsValues(data.comand.match(/<-(.*)$/)[1], data.scope);

  try {
    eval(`scopes['${data.scope}'].vars['${varname}'].value = `+ content.join(''))
  } catch (e) {
    console.log(e);
  }
}

/* Executar uma função dentro do sistema.*/
function runFunctionCall (data) {
  var functionName = data.comand.match(/^(.*)\(/)[1]
  var params = data.comand.match(/\((.*)\)/)[1].split(',');

  params = params.map((expression) => {
    return changeVarsValues(expression, data.scope);
  });

  try {
    eval(`functions['${functionName}'](${params.join(',')})`)
  } catch (e) {
    console.log(e);
  }
}

/* Comando condicional Se (if)*/
function runLogical (data) {
  var logic = data.comand.substring(
    data.comand.lastIndexOf("se")+2,
    data.comand.lastIndexOf("entao")
  );

  var result = changeVarsValues(logic, data.scope);
  /* Caso a execução do código seja verdadeiro irá executar todo
   o código do block filho.*/
  if(eval(result.join(''))){
    for(let comand of data.code)
      runComands(comand);
  } else {
    // Caso falso e caso tenha uma else filha, executa.
    if (data.else != undefined && data.else != null)
      for(let comand of data.else)
        runComands(comand);
  }
}

/* Mostre todas as variáveis. */
function consoleShowVariables (){
  var escopes_names = Object.keys(scopes);

  for (let escope of escopes_names) {
    var vars =  Object.keys(scopes[escope].vars);
    console.log('ESCOPE : ' + escope)
    for (let variable of vars) {
      console.log(variable + ' = ' + JSON.stringify(scopes[escope].vars[variable].value));
    }
  }
}

// Executa o comando de acordo com seu tipo.
function runComands (comand){
  if(comand.type == ALLOCATION)
    runAllocation(comand);

  if(comand.type == ATTRIBUTION)
    runAttribuition(comand);

  if(comand.type == FUNCTION_CALL)
    runFunctionCall(comand);

  if(comand.type == LOGICAL)
    runLogical(comand);
}

// Executando todos os comandos.
for(let comand of comands) {
  runComands(comand);
}

//consoleShowVariables()
