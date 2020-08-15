import*as t from"@tensorflow/tfjs";import{zeros as e,tidy as n,initializers as r,basicLSTMCell as i,stack as o,dropout as s,sum as u,tensor as a,oneHot as c,dispose as l,concat as h,mul as f,ones as v,metrics as m,keep as d,math as p,eye as y,train as g}from"@tensorflow/tfjs";import{load as S}from"@tensorflow-models/universal-sentence-encoder";var P=function(){function t(){this.size=1}var n=t.prototype;return n.init=function(t){try{return this.actions=t,Promise.resolve()}catch(t){return Promise.reject(t)}},n.handleQuery=function(t){return Promise.resolve()},n.getOptimizableFeatures=function(t){return void 0===t?e([1]):t},n.handleAction=function(t){},n.getActionMask=function(){return this.actions.map(function(){return!0})},n.resetDialog=function(){},n.load=function(t){},n.export=function(){return Promise.resolve({})},t}();function z(){return(z=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t}).apply(this,arguments)}function b(t,e){t.prototype=Object.create(e.prototype),t.prototype.constructor=t,t.__proto__=e}function A(t,e){for(var n=Array.from(Array(t.length+1),function(){return new Array(e.length+1).fill(0)}),r=1;r<=t.length;r+=1)n[r][0]=r;for(var i=1;i<=e.length;i+=1)n[0][i]=i;for(var o=0;o<e.length;o+=1)for(var s=0;s<t.length;s+=1)n[s+1][o+1]=Math.min(n[s][o+1]+1,n[s+1][o]+1,n[s][o]+(t[s]!==e[o]?1:0));return n[t.length][e.length]/Math.max(t.length,e.length,1)}function x(t,e){for(var n={extract:void 0,score:0},r=0;r<t.length;r+=1){var i=t.substring(r,r+e.length),o={extract:i,score:1-A(i,e)};if(1===o.score)return o;o.score>n.score&&(n=o)}return n}function j(t){for(var e=0,n=0;n<t.length;n+=1)e=(e<<5)-e+t.charCodeAt(n),e|=0;return e}function k(t,e,i){return void 0===e&&(e=!1),void 0===i&&(i="he"),n(function(){var n;switch(i){case"he":n=r.heNormal({});break;case"zeros":n=r.zeros();break;case"normal":n=r.randomNormal({});break;default:throw new Error("Expected parameter init to take value 'he', 'zeros' or 'normal' not '"+i+"'.")}var o=n.apply(t);return e&&(o=o.asScalar()),o.variable()})}var L=function(){function t(t,e,n,r){void 0===r&&(r=.2),this.lstmKernel=k([t+e,4*e]),this.lstmBias=k([4*e],!1,"zeros"),this.lstmForgetBias=k([1],!0,"zeros"),this.lstmInitH=k([1,e]),this.lstmInitC=k([1,e]),this.denseWeights=k([e,n]),this.denseBias=k([n],!1,"zeros"),this.dropout=r}var e=t.prototype;return e.initLSTM=function(t){return void 0===t&&(t=!0),{c:t?this.lstmInitC.clone():this.lstmInitC,h:t?this.lstmInitH.clone():this.lstmInitH}},e.predict=function(t,e,r,a,c){var l=this;return void 0===c&&(c=1),n(function(){var n=i(l.lstmForgetBias,l.lstmKernel,l.lstmBias,o([t]),r,e),h=n[0],f=n[1],v=s(f,l.dropout).matMul(l.denseWeights).add(l.denseBias).squeeze().div(c).softmax().mul(null!=a?a:1);return{y:v=v.div(u(v)),nc:h,nh:f}})},e.load=function(t){var e=this;n(function(){e.lstmKernel=a(t.lstmKernel).variable(),e.lstmBias=a(t.lstmBias).variable(),e.lstmForgetBias=a(t.lstmForgetBias).variable(),e.lstmInitH=a(t.lstmInitH).variable(),e.lstmInitC=a(t.lstmInitC).variable(),e.denseWeights=a(t.denseWeights).variable(),e.denseBias=a(t.denseBias).variable()})},e.export=function(){try{var t=this;return Promise.resolve(t.lstmKernel.array()).then(function(e){return Promise.resolve(t.lstmBias.array()).then(function(n){return Promise.resolve(t.lstmForgetBias.array()).then(function(r){return Promise.resolve(t.lstmInitH.array()).then(function(i){return Promise.resolve(t.lstmInitC.array()).then(function(o){return Promise.resolve(t.denseWeights.array()).then(function(s){return Promise.resolve(t.denseBias.array()).then(function(t){return{lstmKernel:e,lstmBias:n,lstmForgetBias:r,lstmInitH:i,lstmInitC:o,denseWeights:s,denseBias:t}})})})})})})})}catch(t){return Promise.reject(t)}},t}(),O={__proto__:null,fuzzyMatch:x,hashcode:j,initializeVariable:k,levenshteinDistance:A,LSTM:L},M={__proto__:null,Featurizer:P,ActionFeaturizer:function(t){function e(e){var n,r=void 0===e?{maskLUS:!0,maskPreviousAction:!0,LUSAction:"LUS"}:e,i=r.maskLUS,o=void 0===i||i,s=r.maskPreviousAction,u=void 0===s||s,a=r.LUSAction,c=void 0===a?"LUS":a;return(n=t.call(this)||this).id="Action Featurizer",n.maskLUS=o,n.maskPreviousAction=u,n.LUSAction=c,n.resetDialog(),n}b(e,t);var r=e.prototype;return r.init=function(e){try{var n=this;return Promise.resolve(t.prototype.init.call(n,e)).then(function(){n.size=e.length,n.embeddings=k([n.size,n.size])})}catch(t){return Promise.reject(t)}},r.handleQuery=function(t){try{var e=this;return Promise.resolve(n(function(){return e.userTalked=""!==t,c([e.actions.indexOf(e.previousAction)],e.actions.length)}))}catch(t){return Promise.reject(t)}},r.getOptimizableFeatures=function(t){return t.matMul(this.embeddings).squeeze()},r.handleAction=function(t){this.previousAction=t!==this.LUSAction?t:this.previousAction},r.getActionMask=function(){var e=t.prototype.getActionMask.call(this);return this.maskLUS&&this.userTalked&&(e[this.actions.indexOf(this.LUSAction)]=!1),this.maskPreviousAction&&this.actions.includes(this.previousAction)&&(e[this.actions.indexOf(this.previousAction)]=!1),e},r.resetDialog=function(){this.userTalked=!1,this.previousAction=void 0},r.load=function(t){this.embeddings=n(function(){return a(t.embeddings).variable()})},r.export=function(){try{return Promise.resolve(this.embeddings.array()).then(function(t){return{embeddings:t}})}catch(t){return Promise.reject(t)}},e}(P),BOW:function(t){function e(e){var n;return(n=t.call(this)||this).id="Bag-of-Words",n.size=e,n}return b(e,t),e.prototype.handleQuery=function(t){try{var e=this;return Promise.resolve(n(function(){var n=t.toLowerCase().split(/\W/g).map(function(t){return j(t)%e.size});return c(n,e.size).asType("float32").sum(0)}))}catch(t){return Promise.reject(t)}},e}(P),USE:function(t){function e(){var e;return(e=t.apply(this,arguments)||this).id="Universal Sentence Encoder",e.size=512,e}b(e,t);var n=e.prototype;return n.init=function(e){try{var n=this;return Promise.resolve(t.prototype.init.call(n,e)).then(function(){return Promise.resolve(S()).then(function(t){return n.encoder=t,Promise.resolve(n.encodeQuery("")).then(function(t){n.emptyEncoding=t})})})}catch(t){return Promise.reject(t)}},n.encodeQuery=function(t){try{return Promise.resolve(this.encoder.embed([t])).then(function(t){var e=t.squeeze();return l(t),e})}catch(t){return Promise.reject(t)}},n.handleQuery=function(t){try{return Promise.resolve(t?this.encodeQuery(t):this.emptyEncoding.clone())}catch(t){return Promise.reject(t)}},e}(P),WordEmbedding:function(t){function r(e,n){var r;return(r=t.call(this)||this).id="Word Embedding",r.size=2*n,r.loaderFunction=e,r}b(r,t);var i=r.prototype;return i.init=function(e){try{var n=this;return Promise.resolve(t.prototype.init.call(n,e)).then(function(){return Promise.resolve(n.loaderFunction()).then(function(t){n.vectors=JSON.parse(t)})})}catch(t){return Promise.reject(t)}},i.handleQuery=function(t){try{var r=this;return Promise.resolve(n(function(){var n=t.toLowerCase().split(/\W/g).filter(function(t){return t.length>0}),i=[];if(n.forEach(function(t){if(Object.keys(r.vectors).includes(t))i.push(a(r.vectors[t]));else{var e,n=Infinity;Object.keys(r.vectors).forEach(function(r){var i=A(r,t);i<n&&(e=r,n=i)}),n<.5&&i.push(a(r.vectors[e]))}}),0===i.length)return e([r.size]);var s=o(i);return h([s.mean(0),s.max(0)])}))}catch(t){return Promise.reject(t)}},r}(P)};const _=function(){function t(){}return t.prototype.then=function(e,n){const r=new t,i=this.s;if(i){const t=1&i?e:n;if(t){try{C(r,1,t(this.v))}catch(t){C(r,2,t)}return r}return this}return this.o=function(t){try{const i=t.v;1&t.s?C(r,1,e?e(i):i):n?C(r,1,n(i)):C(r,2,i)}catch(t){C(r,2,t)}},r},t}();function C(t,e,n){if(!t.s){if(n instanceof _){if(!n.s)return void(n.o=C.bind(null,t,e));1&e&&(e=n.s),n=n.v}if(n&&n.then)return void n.then(C.bind(null,t,e),C.bind(null,t,2));t.s=e,t.v=n;const r=t.o;r&&r(t)}}function D(t){return t instanceof _&&1&t.s}function U(t,e,n){for(var r;;){var i=t();if(D(i)&&(i=i.v),!i)return o;if(i.then){r=0;break}var o=n();if(o&&o.then){if(!D(o)){r=1;break}o=o.s}if(e){var s=e();if(s&&s.then&&!D(s)){r=2;break}}}var u=new _,a=C.bind(null,u,2);return(0===r?i.then(l):1===r?o.then(c):s.then(h)).then(void 0,a),u;function c(r){o=r;do{if(e&&(s=e())&&s.then&&!D(s))return void s.then(h).then(void 0,a);if(!(i=t())||D(i)&&!i.v)return void C(u,1,o);if(i.then)return void i.then(l).then(void 0,a);D(o=n())&&(o=o.v)}while(!o||!o.then);o.then(c).then(void 0,a)}function l(t){t?(o=n())&&o.then?o.then(c).then(void 0,a):c(o):C(u,1,o)}function h(){(i=t())?i.then?i.then(l).then(void 0,a):l(i):C(u,1,o)}}"undefined"!=typeof Symbol&&(Symbol.iterator||(Symbol.iterator=Symbol("Symbol.iterator"))),"undefined"!=typeof Symbol&&(Symbol.asyncIterator||(Symbol.asyncIterator=Symbol("Symbol.asyncIterator")));var B={__proto__:null,HCN:function(){function r(t){var e=t.actions,n=t.featurizers,r=t.hiddenSize,i=void 0===r?32:r,o=t.optimizer,s=void 0===o?g.adam(.01):o,u=t.temperature,a=void 0===u?1:u,c=t.dropout,l=void 0===c?0:c;this.actions=e,this.featurizers=n,this.optimizer=s,this.hiddenSize=i,this.outputSize=e.length,this.lstmTemperature=a,this.lstmDropout=l}var i=r.prototype;return i.init=function(){try{var t=this;return Promise.resolve(Promise.all(t.featurizers.map(function(e){return e.init(t.actions)}))).then(function(){t.inputSize=t.featurizers.map(function(t){return t.size}).reduce(function(t,e){return t+e},1),t.lstm=new L(t.inputSize,t.hiddenSize,t.outputSize,t.lstmDropout),t.resetDialog()})}catch(t){return Promise.reject(t)}},i.resetDialog=function(){this.featurizers.forEach(function(t){return t.resetDialog()});var t=this.lstm.initLSTM();this.lstmC=t.c,this.lstmH=t.h},i.handleQuery=function(t){try{return Promise.all(this.featurizers.map(function(e){return e.handleQuery(t)}))}catch(t){return Promise.reject(t)}},i.getOptimizableFeatures=function(t){var r=this;return n(function(){var n=r.featurizers.map(function(e,n){return e.getOptimizableFeatures(t[n])});return n.push(e([1])),h(n)})},i.handleAction=function(t){this.featurizers.map(function(e){return e.handleAction(t)})},i.getActionMask=function(){var t=this;return n(function(){return t.featurizers.map(function(t){return a(t.getActionMask(),void 0,"float32")}).reduce(function(t,e){return f(t,e)},v([t.actions.length]))})},i.fitStory=function(t){try{var e=function(){var t;return n.optimizer.minimize(function(){var e=n.lstm.initLSTM(!1),u=e.c,a=e.h,c=r.map(function(t,e){var r=n.lstm.predict(n.getOptimizableFeatures(t),u,a,i[e]);return u=r.nc,a=r.nh,r.y}),l=o(s),h=o(c),f=m.categoricalCrossentropy(l,h).mean();return t={targets:d(l.argMax(1)),predictions:d(h.argMax(1)),loss:f.arraySync(),isFailing:m.categoricalAccuracy(l,h).mean().arraySync()<.999},f}),l([r,s]),t},n=this;n.resetDialog();var r=[],i=[],s=[],u=0,a=U(function(){return u<t.length},function(){return!!(u+=1)},function(){var e=t[u],o=r.push;return Promise.resolve(n.handleQuery(e.query)).then(function(t){o.call(r,t),i.push(n.getActionMask()),s.push(c(n.actions.indexOf(e.action),n.outputSize)),n.handleAction(e.action)})});return Promise.resolve(a&&a.then?a.then(e):e())}catch(t){return Promise.reject(t)}},i.train=function(e){var r=e.stories,i=e.nEpochs,o=void 0===i?12:i,s=e.onEpochEnd,u=void 0===s?void 0:s;try{var a,c=function(){return f.resetDialog(),a},f=this,v=0,m=U(function(){return v<o},function(){return!!(v+=1)},function(){function e(){var e=n(function(){return p.confusionMatrix(h(i),h(o),f.outputSize)}),r=n(function(){return e.mul(y.apply(t,e.shape)).sum(0)});a={epoch:v,failingSamples:c,accuracy:n(function(){return r.sum().div(e.sum()).arraySync()}),recall:n(function(){return r.div(e.sum(1)).mean().arraySync()}),precision:n(function(){return r.div(e.sum(0)).mean().arraySync()}),loss:s.reduce(function(t,e){return t+e})/s.length},l(i),l(o),l([r,e]),void 0!==u&&u(a)}var i=[],o=[],s=[],c=[],m=0,d=U(function(){return m<r.length},function(){return!!(m+=1)},function(){return Promise.resolve(f.fitStory(r[m])).then(function(t){i.push(t.targets),o.push(t.predictions),s.push(t.loss),t.isFailing&&c.push(m)})});return d&&d.then?d.then(e):e()});return Promise.resolve(m&&m.then?m.then(c):c())}catch(t){return Promise.reject(t)}},i.predict=function(t){try{var e=this;e.lstm.dropout=0;var r=e.getOptimizableFeatures;return Promise.resolve(e.handleQuery(t)).then(function(t){var i=r.call(e,t),o=e.getActionMask(),s=e.lstm.predict(i,e.lstmC,e.lstmH,o,e.lstmTemperature);l([e.lstmC,e.lstmH]),e.lstmC=s.nc.clone(),e.lstmH=s.nh.clone();var u=n(function(){return s.y.argMax().arraySync()}),a=n(function(){return s.y.arraySync()[u]});return l([i,o]),l(s),e.lstm.dropout=e.lstmDropout,e.handleAction(e.actions[u]),{action:e.actions[u],confidence:a}})}catch(t){return Promise.reject(t)}},i.score=function(e){try{var r=function(){var e=n(function(){return p.confusionMatrix(a(o),a(s),i.outputSize)}),r=n(function(){return e.mul(y.apply(t,e.shape)).sum(0)}),h={failingSamples:c,accuracy:n(function(){return r.sum().div(e.sum()).arraySync()}),recall:n(function(){return r.div(e.sum(1)).mean().arraySync()}),precision:n(function(){return r.div(e.sum(0)).mean().arraySync()}),averageConfidence:u.reduce(function(t,e){return t+e})/u.length};return l([r,e]),i.resetDialog(),h},i=this,o=[],s=[],u=[],c=[],h=0,f=U(function(){return h<e.length},function(){return!!(h+=1)},function(){i.resetDialog();var t=0,n=U(function(){return t<e[h].length},function(){return!!(t+=1)},function(){var n=e[h][t];return Promise.resolve(i.predict(n.query)).then(function(t){var e=t.action,r=t.confidence;o.push(i.actions.indexOf(n.action)),s.push(i.actions.indexOf(e)),u.push(r),e===n.action||c.includes(h)||c.push(h)})});if(n&&n.then)return n.then(function(){})});return Promise.resolve(f&&f.then?f.then(r):r())}catch(t){return Promise.reject(t)}},i.load=function(t){var e=JSON.parse(t);this.featurizers.forEach(function(t){t.load(e[t.id])}),this.lstm.load(e.lstm),this.resetDialog()},i.export=function(){try{var t=this;return Promise.resolve(t.lstm.export()).then(function(e){function n(){return JSON.stringify(r)}var r={lstm:e},i=0,o=U(function(){return i<t.featurizers.length},function(){return!!(i+=1)},function(){var e=t.featurizers[i];return Promise.resolve(e.export()).then(function(t){r[e.id]=t})});return o&&o.then?o.then(n):n()})}catch(t){return Promise.reject(t)}},r}()},F=function(t){function e(e,n){var r;return(r=t.call(this)||this).dependantActions=e,r.invDependantActions=n,r}b(e,t);var n=e.prototype;return n.getActionMask=function(){var t=this;return this.actions.map(function(e){var n=void 0!==t.value,r=t.dependantActions.includes(e),i=t.invDependantActions.includes(e);return!n&&(!r||i)||n&&!i})},n.resetDialog=function(){this.value=void 0},n.getValue=function(){return this.value},n.setValue=function(t){this.value=t},e}(P),E={__proto__:null,Slot:F,CategoricalSlot:function(t){function e(e){var n,r=e.name,i=e.categories,o=e.dependantActions,s=e.invDependantActions,u=e.threshold,a=void 0===u?.75:u;return(n=t.call(this,void 0===o?[]:o,void 0===s?[]:s)||this).categoryNames=Object.keys(i),n.categories=i,n.threshold=a,n.id=r+"#Categorical",n.size=2*n.categoryNames.length,n}b(e,t);var r=e.prototype;return r.init=function(e){try{var n=this;return Promise.resolve(t.prototype.init.call(n,e)).then(function(){n.resetDialog()})}catch(t){return Promise.reject(t)}},r.oneHotValue=function(t){var e=Object.keys(this.categories);return c(e.indexOf(t.category),e.length)},r.handleQuery=function(t){try{var e=this,r=e.getValue(),i={category:void 0,extract:void 0,score:0};Object.entries(e.categories).forEach(function(n){var o=n[0],s=n[1].map(function(e){return x(t.toLowerCase(),e.toLowerCase())}).filter(function(t){return t.score>=e.threshold}).reduce(function(t,e){return t.score>e.score?t:e},{extract:void 0,score:0});if(void 0!==s.extract){var u=o!==r.category,a=i.category===r.category,c=s.score>i.score;(void 0===i.category||u&&c||a&&u||a&&c)&&(i=z({category:o},s))}});var o=n(function(){return h([e.oneHotValue(i),e.oneHotValue(e.getValue())])});return void 0!==i.category&&e.setValue(i),Promise.resolve(o)}catch(t){return Promise.reject(t)}},r.getValue=function(){return void 0===t.prototype.getValue.call(this)?{category:void 0,extract:void 0,score:0}:t.prototype.getValue.call(this)},e}(F)},I={__proto__:null,parseStories:function(t){var e=[],n=[],r=!0;return t.split("\n").forEach(function(t){var i=/^## *([^#].*)?$/gm.exec(t),o=/^> *(.*)$/gm.exec(t),s=/^- *(\w*)$/gm.exec(t);null!=i&&n.length>0?(n.push({query:"",action:"LUS"}),e.push(n),n=[]):null!=o?(n.length>0&&n.push({query:"",action:"LUS"}),n.push({query:o[1],action:void 0}),r=!1):null!=s&&r?n.push({query:"",action:s[1]}):null==s||r||(n[n.length-1].action=s[1],r=!0)}),n.length>0&&(n.push({query:"",action:"LUS"}),e.push(n)),e},trainTestSplit:function(t,e){for(var n=[],r=0;r/t.length<e;r+=1)n.push.apply(n,t.splice(Math.floor(Math.random()*t.length),1));return{train:t,test:n}},NLUFormatter:function(){function t(t){var e=t.slots,n=void 0===e?[]:e,r=t.LUSAction,i=void 0===r?"LUS":r;this.model=t.model,this.slots=n,this.LUSAction=i}var e=t.prototype;return e.ask=function(t){try{var e=this,n={query:t,actions:[],turnConfidence:1,slots:{}};return Promise.resolve(e.model.predict(t)).then(function(t){var r=t.action,i=t.confidence;function o(){return e.slots.forEach(function(t){n.slots[t.id]=t.getValue()}),n}var s=U(function(){return r!==e.LUSAction},void 0,function(){return n.actions.push(r),n.turnConfidence*=i,Promise.resolve(e.model.predict("")).then(function(t){r=t.action,i=t.confidence})});return s&&s.then?s.then(o):o()})}catch(t){return Promise.reject(t)}},e.resetDialog=function(){this.model.resetDialog()},t}()};export{M as featurizers,B as models,E as slots,I as tools,O as utils};
//# sourceMappingURL=wisty.esm.js.map
