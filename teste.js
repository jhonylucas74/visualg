"use strict";

var universe = (function(){
  return {
    run: (str) => eval(str)
  };
})();


var omega = 2;

(function(uni){
  var omega = 1;

  uni.run('console.log(omega)');
})(universe)
