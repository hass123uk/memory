!function(){function e(e,r){for(var t=0;t<r.length;t++){var n=r[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function r(e,r){(null==r||r>e.length)&&(r=e.length);for(var t=0,n=new Array(r);t<r;t++)n[t]=e[t];return n}function t(e){return function(e){if(Array.isArray(e))return r(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(e){if("string"==typeof e)return r(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(n):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?r(e,t):void 0}}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var n;!function(e){e.SUCCESS="success",e.FAILURE="failure",e.PENDING="pending",e.GAMEOVER="game-over"}(n||(n={}));var a,i,o,l,u,c=function(){"use strict";function r(e){!function(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")}(this,r),this.initalValues=e,this.solvedValues=[],this.cards=this.doubleAndShuffle(e),this.playHistory=[]}var a,i,o;return a=r,(i=[{key:"cardSelected",value:function(e){if(null==e)throw new Error("Card is not defined.");if(this.isCardNotPartGame(e))throw new Error("This card is not part of the current game.");if(this.isCardSolved(e))throw new Error("This card has already been solved.");var r,t=this.playHistory[this.playHistory.length-1];console.debug("last play",t);var a={card:e,result:r=t&&t.result===n.PENDING?t.card===e?n.SUCCESS:n.FAILURE:n.PENDING,time:new Date};return this.playHistory.push(a),console.debug("current play",a),r===n.SUCCESS&&(this.solvedValues.push(e),this.isGameEnded())?n.GAMEOVER:r}},{key:"isCardNotPartGame",value:function(e){return!this.initalValues.includes(e)}},{key:"isCardSolved",value:function(e){var r=this.initalValues.filter((function(r){return r===e})).length;return this.solvedValues.filter((function(r){return r===e})).length===r}},{key:"isGameEnded",value:function(){return this.solvedValues.length===this.initalValues.length}},{key:"doubleAndShuffle",value:function(e){return t(e).concat(t(e)).sort((function(){return Math.random()-.5}))}}])&&e(a.prototype,i),o&&e(a,o),r}();function s(e,r){var t=Math.random()*(r-e)+e;return Math.floor(t)}function d(e,r){var n,a=document.createElement(e);return(n=a.classList).add.apply(n,t(r)),a}function f(e,r){var t=!0,n=!1,a=void 0;try{for(var i,o=r[Symbol.iterator]();!(t=(i=o.next()).done);t=!0){var l=i.value;null==l||l.classList.add(e)}}catch(e){n=!0,a=e}finally{try{t||null==o.return||o.return()}finally{if(n)throw a}}}function h(e,r){var t=!0,n=!1,a=void 0;try{for(var i,o=r[Symbol.iterator]();!(t=(i=o.next()).done);t=!0){var l=i.value;null==l||l.classList.remove(e)}}catch(e){n=!0,a=e}finally{try{t||null==o.return||o.return()}finally{if(n)throw a}}}o=function(e){for(var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:101,n=[];n.length<e;)n.push(s(r,t));return n},(i="generateRandomNumbers")in(a=c)?Object.defineProperty(a,i,{value:o,enumerable:!0,configurable:!0,writable:!0}):a[i]=o;var v,y,m=new c(c.generateRandomNumbers(5)),p=(y=(v=m).cards.map((function(e){return function(e,r){var t=d("button",["card"]);t.addEventListener("click",r,!0);var n,a,i,o,l=d("div",["card-inner"]),u=d("div",["card-front"]),c=d("div",["card-back"]),s=(n="h2",a=e.toString(),i=document.createElement(n),o=document.createTextNode(a),i.appendChild(o),i);return c.appendChild(s),l.appendChild(u),l.appendChild(c),t.appendChild(l),t}(e,(function(e){return function(e,r){var t=e.currentTarget;t.disabled=!0,t.classList.add("selected");var a,i=[t,l],o=Number(t.innerText.trim());switch(r.cardSelected(o)){case n.PENDING:l=t;break;case n.FAILURE:f("failure",i),a=i,window.setTimeout((function(){h("selected",a),h("failure",a);var e=!0,r=!1,t=void 0;try{for(var n,i=a[Symbol.iterator]();!(e=(n=i.next()).done);e=!0){var o=n.value;o&&(o.disabled=!1)}}catch(e){r=!0,t=e}finally{try{e||null==i.return||i.return()}finally{if(r)throw t}}}),1e3);break;case n.GAMEOVER:window.setTimeout((function(){confirm("Restart the game?")&&location.reload()}),500);case n.SUCCESS:f("success",i),h("failure",i);break;default:console.error("Unknown play result in click handler.")}}(e,v)}))})),y),b=document.getElementById("cards-container");if(!b)throw Error("Cannot find cards container.");(u=b).append.apply(u,t(p))}();
//# sourceMappingURL=index.eb84d4cd.js.map
