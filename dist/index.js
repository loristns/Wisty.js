var t=require("@tensorflow/tfjs"),e=require("@tensorflow-models/universal-sentence-encoder"),n=function(){function e(){this.size=1}var n=e.prototype;return n.init=function(t){try{return this.actions=t,Promise.resolve()}catch(t){return Promise.reject(t)}},n.handleQuery=function(t){return Promise.resolve()},n.getOptimizableFeatures=function(e){return void 0===e?t.zeros([1]):e},n.handleAction=function(t){},n.getActionMask=function(){return this.actions.map(function(){return!0})},n.resetDialog=function(){},n.load=function(t){},n.export=function(){return Promise.resolve({})},e}();function r(){return(r=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t}).apply(this,arguments)}function i(t,e){t.prototype=Object.create(e.prototype),t.prototype.constructor=t,t.__proto__=e}function o(t,e){for(var n=Array.from(Array(t.length+1),function(){return new Array(e.length+1).fill(0)}),r=1;r<=t.length;r+=1)n[r][0]=r;for(var i=1;i<=e.length;i+=1)n[0][i]=i;for(var o=0;o<e.length;o+=1)for(var s=0;s<t.length;s+=1)n[s+1][o+1]=Math.min(n[s][o+1]+1,n[s+1][o]+1,n[s][o]+(t[s]!==e[o]?1:0));return n[t.length][e.length]/Math.max(t.length,e.length,1)}function s(t,e){for(var n={extract:void 0,score:0},r=0;r<t.length;r+=1){var i=t.substring(r,r+e.length),s={extract:i,score:1-o(i,e)};if(1===s.score)return s;s.score>n.score&&(n=s)}return n}function u(t){for(var e=0,n=0;n<t.length;n+=1)e=(e<<5)-e+t.charCodeAt(n),e|=0;return e}function a(e,n,r){return void 0===n&&(n=!1),void 0===r&&(r="he"),t.tidy(function(){var i;switch(r){case"he":i=t.initializers.heNormal({});break;case"zeros":i=t.initializers.zeros();break;case"normal":i=t.initializers.randomNormal({});break;default:throw new Error("Expected parameter init to take value 'he', 'zeros' or 'normal' not '"+r+"'.")}var o=i.apply(e);return n&&(o=o.asScalar()),o.variable()})}var c=function(){function e(t,e,n,r){void 0===r&&(r=.2),this.lstmKernel=a([t+e,4*e]),this.lstmBias=a([4*e],!1,"zeros"),this.lstmForgetBias=a([1],!0,"zeros"),this.lstmInitH=a([1,e]),this.lstmInitC=a([1,e]),this.denseWeights=a([e,n]),this.denseBias=a([n],!1,"zeros"),this.dropout=r}var n=e.prototype;return n.initLSTM=function(t){return void 0===t&&(t=!0),{c:t?this.lstmInitC.clone():this.lstmInitC,h:t?this.lstmInitH.clone():this.lstmInitH}},n.predict=function(e,n,r,i,o){var s=this;return void 0===o&&(o=1),t.tidy(function(){var u=t.basicLSTMCell(s.lstmForgetBias,s.lstmKernel,s.lstmBias,t.stack([e]),r,n),a=u[0],c=u[1],l=t.dropout(c,s.dropout).matMul(s.denseWeights).add(s.denseBias).squeeze().div(o).softmax().mul(null!=i?i:1);return{y:l=l.div(t.sum(l)),nc:a,nh:c}})},n.load=function(e){var n=this;t.tidy(function(){n.lstmKernel=t.tensor(e.lstmKernel).variable(),n.lstmBias=t.tensor(e.lstmBias).variable(),n.lstmForgetBias=t.tensor(e.lstmForgetBias).variable(),n.lstmInitH=t.tensor(e.lstmInitH).variable(),n.lstmInitC=t.tensor(e.lstmInitC).variable(),n.denseWeights=t.tensor(e.denseWeights).variable(),n.denseBias=t.tensor(e.denseBias).variable()})},n.export=function(){try{var t=this;return Promise.resolve(t.lstmKernel.array()).then(function(e){return Promise.resolve(t.lstmBias.array()).then(function(n){return Promise.resolve(t.lstmForgetBias.array()).then(function(r){return Promise.resolve(t.lstmInitH.array()).then(function(i){return Promise.resolve(t.lstmInitC.array()).then(function(o){return Promise.resolve(t.denseWeights.array()).then(function(s){return Promise.resolve(t.denseBias.array()).then(function(t){return{lstmKernel:e,lstmBias:n,lstmForgetBias:r,lstmInitH:i,lstmInitC:o,denseWeights:s,denseBias:t}})})})})})})})}catch(t){return Promise.reject(t)}},e}(),l={__proto__:null,fuzzyMatch:s,hashcode:u,initializeVariable:a,levenshteinDistance:o,LSTM:c},h={__proto__:null,Featurizer:n,ActionFeaturizer:function(e){function n(t){var n,r=void 0===t?{maskLUS:!0,maskPreviousAction:!0,LUSAction:"LUS"}:t,i=r.maskLUS,o=void 0===i||i,s=r.maskPreviousAction,u=void 0===s||s,a=r.LUSAction,c=void 0===a?"LUS":a;return(n=e.call(this)||this).id="Action Featurizer",n.maskLUS=o,n.maskPreviousAction=u,n.LUSAction=c,n.resetDialog(),n}i(n,e);var r=n.prototype;return r.init=function(t){try{var n=this;return Promise.resolve(e.prototype.init.call(n,t)).then(function(){n.size=t.length,n.embeddings=a([n.size,n.size])})}catch(t){return Promise.reject(t)}},r.handleQuery=function(e){try{var n=this;return Promise.resolve(t.tidy(function(){return n.userTalked=""!==e,t.oneHot([n.actions.indexOf(n.previousAction)],n.actions.length)}))}catch(t){return Promise.reject(t)}},r.getOptimizableFeatures=function(t){return t.matMul(this.embeddings).squeeze()},r.handleAction=function(t){this.previousAction=t!==this.LUSAction?t:this.previousAction},r.getActionMask=function(){var t=e.prototype.getActionMask.call(this);return this.maskLUS&&this.userTalked&&(t[this.actions.indexOf(this.LUSAction)]=!1),this.maskPreviousAction&&this.actions.includes(this.previousAction)&&(t[this.actions.indexOf(this.previousAction)]=!1),t},r.resetDialog=function(){this.userTalked=!1,this.previousAction=void 0},r.load=function(e){this.embeddings=t.tidy(function(){return t.tensor(e.embeddings).variable()})},r.export=function(){try{return Promise.resolve(this.embeddings.array()).then(function(t){return{embeddings:t}})}catch(t){return Promise.reject(t)}},n}(n),BOW:function(e){function n(t){var n;return(n=e.call(this)||this).id="Bag-of-Words",n.size=t,n}return i(n,e),n.prototype.handleQuery=function(e){try{var n=this;return Promise.resolve(t.tidy(function(){var r=e.toLowerCase().split(/\W/g).map(function(t){return u(t)%n.size});return t.oneHot(r,n.size).asType("float32").sum(0)}))}catch(t){return Promise.reject(t)}},n}(n),USE:function(n){function r(){var t;return(t=n.apply(this,arguments)||this).id="Universal Sentence Encoder",t.size=512,t}i(r,n);var o=r.prototype;return o.init=function(t){try{var r=this;return Promise.resolve(n.prototype.init.call(r,t)).then(function(){return Promise.resolve(e.load()).then(function(t){return r.encoder=t,Promise.resolve(r.encodeQuery("")).then(function(t){r.emptyEncoding=t})})})}catch(t){return Promise.reject(t)}},o.encodeQuery=function(e){try{return Promise.resolve(this.encoder.embed([e])).then(function(e){var n=e.squeeze();return t.dispose(e),n})}catch(t){return Promise.reject(t)}},o.handleQuery=function(t){try{return Promise.resolve(t?this.encodeQuery(t):this.emptyEncoding.clone())}catch(t){return Promise.reject(t)}},r}(n),WordEmbedding:function(e){function n(t){var n;return(n=e.call(this)||this).id="Word Embedding",n.size=2*t.size,n.vectors=t,n}i(n,e);var r=n.prototype;return r.init=function(t){try{var n=this;return Promise.resolve(e.prototype.init.call(n,t)).then(function(){var t=function(){if(!n.vectors.isLoaded())return Promise.resolve(n.vectors.load()).then(function(){})}();if(t&&t.then)return t.then(function(){})})}catch(t){return Promise.reject(t)}},r.handleQuery=function(e){try{var n=this;return Promise.resolve(t.tidy(function(){var r=e.toLowerCase().split(/\W/g).filter(function(t){return t.length>0}),i=[];if(r.forEach(function(t){return i.push(n.vectors.get(t))}),i.filter(function(t){return void 0!==t}),0===i.length)return t.zeros([n.size]);var o=t.stack(i);return t.concat([o.mean(0),o.max(0)])}))}catch(t){return Promise.reject(t)}},n}(n)};function f(t,e,n){if(!t.s){if(n instanceof v){if(!n.s)return void(n.o=f.bind(null,t,e));1&e&&(e=n.s),n=n.v}if(n&&n.then)return void n.then(f.bind(null,t,e),f.bind(null,t,2));t.s=e,t.v=n;var r=t.o;r&&r(t)}}var v=function(){function t(){}return t.prototype.then=function(e,n){var r=new t,i=this.s;if(i){var o=1&i?e:n;if(o){try{f(r,1,o(this.v))}catch(t){f(r,2,t)}return r}return this}return this.o=function(t){try{var i=t.v;1&t.s?f(r,1,e?e(i):i):n?f(r,1,n(i)):f(r,2,i)}catch(t){f(r,2,t)}},r},t}();function d(t){return t instanceof v&&1&t.s}function m(t,e,n){for(var r;;){var i=t();if(d(i)&&(i=i.v),!i)return o;if(i.then){r=0;break}var o=n();if(o&&o.then){if(!d(o)){r=1;break}o=o.s}if(e){var s=e();if(s&&s.then&&!d(s)){r=2;break}}}var u=new v,a=f.bind(null,u,2);return(0===r?i.then(l):1===r?o.then(c):s.then(h)).then(void 0,a),u;function c(r){o=r;do{if(e&&(s=e())&&s.then&&!d(s))return void s.then(h).then(void 0,a);if(!(i=t())||d(i)&&!i.v)return void f(u,1,o);if(i.then)return void i.then(l).then(void 0,a);d(o=n())&&(o=o.v)}while(!o||!o.then);o.then(c).then(void 0,a)}function l(t){t?(o=n())&&o.then?o.then(c).then(void 0,a):c(o):f(u,1,o)}function h(){(i=t())?i.then?i.then(l).then(void 0,a):l(i):f(u,1,o)}}var p={__proto__:null,HCN:function(){function e(e){var n=e.actions,r=e.featurizers,i=e.hiddenSize,o=void 0===i?32:i,s=e.optimizer,u=void 0===s?t.train.adam(.01):s,a=e.temperature,c=void 0===a?1:a,l=e.dropout,h=void 0===l?0:l;this.actions=n,this.featurizers=r,this.optimizer=u,this.hiddenSize=o,this.outputSize=n.length,this.lstmTemperature=c,this.lstmDropout=h}var n=e.prototype;return n.init=function(){try{var t=this;return Promise.resolve(Promise.all(t.featurizers.map(function(e){return e.init(t.actions)}))).then(function(){t.inputSize=t.featurizers.map(function(t){return t.size}).reduce(function(t,e){return t+e},1),t.lstm=new c(t.inputSize,t.hiddenSize,t.outputSize,t.lstmDropout),t.resetDialog()})}catch(t){return Promise.reject(t)}},n.resetDialog=function(){this.featurizers.forEach(function(t){return t.resetDialog()});var t=this.lstm.initLSTM();this.lstmC=t.c,this.lstmH=t.h},n.handleQuery=function(t){try{return Promise.all(this.featurizers.map(function(e){return e.handleQuery(t)}))}catch(t){return Promise.reject(t)}},n.getOptimizableFeatures=function(e){var n=this;return t.tidy(function(){var r=n.featurizers.map(function(t,n){return t.getOptimizableFeatures(e[n])});return r.push(t.zeros([1])),t.concat(r)})},n.handleAction=function(t){this.featurizers.map(function(e){return e.handleAction(t)})},n.getActionMask=function(){var e=this;return t.tidy(function(){return e.featurizers.map(function(e){return t.tensor(e.getActionMask(),void 0,"float32")}).reduce(function(e,n){return t.mul(e,n)},t.ones([e.actions.length]))})},n.fitStory=function(e){try{var n=function(){var e;return r.optimizer.minimize(function(){var n=r.lstm.initLSTM(!1),u=n.c,a=n.h,c=i.map(function(t,e){var n=r.lstm.predict(r.getOptimizableFeatures(t),u,a,o[e]);return u=n.nc,a=n.nh,n.y}),l=t.stack(s),h=t.stack(c),f=t.metrics.categoricalCrossentropy(l,h).mean();return e={targets:t.keep(l.argMax(1)),predictions:t.keep(h.argMax(1)),loss:f.arraySync(),isFailing:t.metrics.categoricalAccuracy(l,h).mean().arraySync()<.999},f}),t.dispose([i,s]),e},r=this;r.resetDialog();var i=[],o=[],s=[],u=0,a=m(function(){return u<e.length},function(){return!!(u+=1)},function(){var n=e[u],a=i.push;return Promise.resolve(r.handleQuery(n.query)).then(function(e){a.call(i,e),o.push(r.getActionMask()),s.push(t.oneHot(r.actions.indexOf(n.action),r.outputSize)),r.handleAction(n.action)})});return Promise.resolve(a&&a.then?a.then(n):n())}catch(t){return Promise.reject(t)}},n.train=function(e){var n=e.stories,r=e.nEpochs,i=void 0===r?12:r,o=e.onEpochEnd,s=void 0===o?void 0:o;try{var u,a=function(){return c.resetDialog(),u},c=this,l=0,h=m(function(){return l<i},function(){return!!(l+=1)},function(){function e(){var e=t.tidy(function(){return t.math.confusionMatrix(t.concat(r),t.concat(i),c.outputSize)}),n=t.tidy(function(){return e.mul(t.eye.apply(t,e.shape)).sum(0)});u={epoch:l,failingSamples:a,accuracy:t.tidy(function(){return n.sum().div(e.sum()).arraySync()}),recall:t.tidy(function(){return n.div(e.sum(1)).mean().arraySync()}),precision:t.tidy(function(){return n.div(e.sum(0)).mean().arraySync()}),loss:o.reduce(function(t,e){return t+e})/o.length},t.dispose(r),t.dispose(i),t.dispose([n,e]),void 0!==s&&s(u)}var r=[],i=[],o=[],a=[],h=0,f=m(function(){return h<n.length},function(){return!!(h+=1)},function(){return Promise.resolve(c.fitStory(n[h])).then(function(t){r.push(t.targets),i.push(t.predictions),o.push(t.loss),t.isFailing&&a.push(h)})});return f&&f.then?f.then(e):e()});return Promise.resolve(h&&h.then?h.then(a):a())}catch(t){return Promise.reject(t)}},n.predict=function(e){try{var n=this;n.lstm.dropout=0;var r=n.getOptimizableFeatures;return Promise.resolve(n.handleQuery(e)).then(function(e){var i=r.call(n,e),o=n.getActionMask(),s=n.lstm.predict(i,n.lstmC,n.lstmH,o,n.lstmTemperature);t.dispose([n.lstmC,n.lstmH]),n.lstmC=s.nc.clone(),n.lstmH=s.nh.clone();var u=t.tidy(function(){return s.y.argMax().arraySync()}),a=t.tidy(function(){return s.y.arraySync()[u]});return t.dispose([i,o]),t.dispose(s),n.lstm.dropout=n.lstmDropout,n.handleAction(n.actions[u]),{action:n.actions[u],confidence:a}})}catch(t){return Promise.reject(t)}},n.score=function(e){try{var n=function(){var e=t.tidy(function(){return t.math.confusionMatrix(t.tensor(i),t.tensor(o),r.outputSize)}),n=t.tidy(function(){return e.mul(t.eye.apply(t,e.shape)).sum(0)}),a={failingSamples:u,accuracy:t.tidy(function(){return n.sum().div(e.sum()).arraySync()}),recall:t.tidy(function(){return n.div(e.sum(1)).mean().arraySync()}),precision:t.tidy(function(){return n.div(e.sum(0)).mean().arraySync()}),averageConfidence:s.reduce(function(t,e){return t+e})/s.length};return t.dispose([n,e]),r.resetDialog(),a},r=this,i=[],o=[],s=[],u=[],a=0,c=m(function(){return a<e.length},function(){return!!(a+=1)},function(){r.resetDialog();var t=0,n=m(function(){return t<e[a].length},function(){return!!(t+=1)},function(){var n=e[a][t];return Promise.resolve(r.predict(n.query)).then(function(t){var e=t.action,c=t.confidence;i.push(r.actions.indexOf(n.action)),o.push(r.actions.indexOf(e)),s.push(c),e===n.action||u.includes(a)||u.push(a)})});if(n&&n.then)return n.then(function(){})});return Promise.resolve(c&&c.then?c.then(n):n())}catch(t){return Promise.reject(t)}},n.load=function(t){var e=JSON.parse(t);this.featurizers.forEach(function(t){t.load(e[t.id])}),this.lstm.load(e.lstm),this.resetDialog()},n.export=function(){try{var t=this;return Promise.resolve(t.lstm.export()).then(function(e){function n(){return JSON.stringify(r)}var r={lstm:e},i=0,o=m(function(){return i<t.featurizers.length},function(){return!!(i+=1)},function(){var e=t.featurizers[i];return Promise.resolve(e.export()).then(function(t){r[e.id]=t})});return o&&o.then?o.then(n):n()})}catch(t){return Promise.reject(t)}},e}()},y=function(t){function e(e,n){var r;return(r=t.call(this)||this).dependantActions=e,r.invDependantActions=n,r}i(e,t);var n=e.prototype;return n.getActionMask=function(){var t=this;return this.actions.map(function(e){var n=void 0!==t.value,r=t.dependantActions.includes(e),i=t.invDependantActions.includes(e);return!n&&(!r||i)||n&&!i})},n.resetDialog=function(){this.value=void 0},n.getValue=function(){return this.value},n.setValue=function(t){this.value=t},e}(n),g={__proto__:null,Slot:y,CategoricalSlot:function(e){function n(t){var n,r=t.name,i=t.categories,o=t.dependantActions,s=t.invDependantActions,u=t.threshold,a=void 0===u?.75:u;return(n=e.call(this,void 0===o?[]:o,void 0===s?[]:s)||this).categoryNames=Object.keys(i),n.categories=i,n.threshold=a,n.id=r+"#Categorical",n.size=2*n.categoryNames.length,n}i(n,e);var o=n.prototype;return o.init=function(t){try{var n=this;return Promise.resolve(e.prototype.init.call(n,t)).then(function(){n.resetDialog()})}catch(t){return Promise.reject(t)}},o.oneHotValue=function(e){var n=Object.keys(this.categories);return t.oneHot(n.indexOf(e.category),n.length)},o.handleQuery=function(e){try{var n=this,i=n.getValue(),o={category:void 0,extract:void 0,score:0};Object.entries(n.categories).forEach(function(t){var u=t[0],a=t[1].map(function(t){return s(e.toLowerCase(),t.toLowerCase())}).filter(function(t){return t.score>=n.threshold}).reduce(function(t,e){return t.score>e.score?t:e},{extract:void 0,score:0});if(void 0!==a.extract){var c=u!==i.category,l=o.category===i.category,h=a.score>o.score;(void 0===o.category||c&&h||l&&c||l&&h)&&(o=r({category:u},a))}});var u=t.tidy(function(){return t.concat([n.oneHotValue(o),n.oneHotValue(n.getValue())])});return void 0!==o.category&&n.setValue(o),Promise.resolve(u)}catch(t){return Promise.reject(t)}},o.getValue=function(){return void 0===e.prototype.getValue.call(this)?{category:void 0,extract:void 0,score:0}:e.prototype.getValue.call(this)},n}(y)};function z(t,e,n){if(!t.s){if(n instanceof P){if(!n.s)return void(n.o=z.bind(null,t,e));1&e&&(e=n.s),n=n.v}if(n&&n.then)return void n.then(z.bind(null,t,e),z.bind(null,t,2));t.s=e,t.v=n;var r=t.o;r&&r(t)}}var P=function(){function t(){}return t.prototype.then=function(e,n){var r=new t,i=this.s;if(i){var o=1&i?e:n;if(o){try{z(r,1,o(this.v))}catch(t){z(r,2,t)}return r}return this}return this.o=function(t){try{var i=t.v;1&t.s?z(r,1,e?e(i):i):n?z(r,1,n(i)):z(r,2,i)}catch(t){z(r,2,t)}},r},t}();function S(t){return t instanceof P&&1&t.s}var b={__proto__:null,parseStories:function(t){var e=[],n=[],r=!0;return t.split("\n").forEach(function(t){var i=/^## *([^#].*)?$/gm.exec(t),o=/^> *(.*)$/gm.exec(t),s=/^- *(\w*)$/gm.exec(t);null!=i&&n.length>0?(n.push({query:"",action:"LUS"}),e.push(n),n=[]):null!=o?(n.length>0&&(void 0===n[n.length-1].action?n[n.length-1].action="LUS":n.push({query:"",action:"LUS"})),n.push({query:o[1],action:void 0}),r=!1):null!=s&&r?n.push({query:"",action:s[1]}):null==s||r||(n[n.length-1].action=s[1],r=!0)}),n.length>0&&(n.push({query:"",action:"LUS"}),e.push(n)),e},trainTestSplit:function(t,e){for(var n=[],r=0;r/t.length<e;r+=1)n.push.apply(n,t.splice(Math.floor(Math.random()*t.length),1));return{train:t,test:n}},NLUFormatter:function(){function t(t){var e=t.slots,n=void 0===e?[]:e,r=t.LUSAction,i=void 0===r?"LUS":r;this.model=t.model,this.slots=n,this.LUSAction=i}var e=t.prototype;return e.ask=function(t){try{var e=this,n={query:t,actions:[],turnConfidence:1,slots:{}};return Promise.resolve(e.model.predict(t)).then(function(t){var r=t.action,i=t.confidence;function o(){return e.slots.forEach(function(t){n.slots[t.id]=t.getValue()}),n}var s=function(t,e,n){for(var r;;){var i=t();if(S(i)&&(i=i.v),!i)return o;if(i.then){r=0;break}var o=n();if(o&&o.then){if(!S(o)){r=1;break}o=o.s}}var s=new P,u=z.bind(null,s,2);return(0===r?i.then(c):1===r?o.then(a):(void 0).then(function(){(i=t())?i.then?i.then(c).then(void 0,u):c(i):z(s,1,o)})).then(void 0,u),s;function a(e){o=e;do{if(!(i=t())||S(i)&&!i.v)return void z(s,1,o);if(i.then)return void i.then(c).then(void 0,u);S(o=n())&&(o=o.v)}while(!o||!o.then);o.then(a).then(void 0,u)}function c(t){t?(o=n())&&o.then?o.then(a).then(void 0,u):a(o):z(s,1,o)}}(function(){return r!==e.LUSAction},0,function(){return n.actions.push(r),n.turnConfidence*=i,Promise.resolve(e.model.predict("")).then(function(t){r=t.action,i=t.confidence})});return s&&s.then?s.then(o):o()})}catch(t){return Promise.reject(t)}},e.resetDialog=function(){this.model.resetDialog()},t}(),KeyedVectors:function(){function e(t,e,n){void 0===n&&(n=.5),this.loaderFunction=t,this.size=e,this.maxDistance=n}var n=e.prototype;return n.load=function(){try{var t=this;return Promise.resolve(t.loaderFunction()).then(function(e){t.vectors=JSON.parse(e)})}catch(t){return Promise.reject(t)}},n.isLoaded=function(){return void 0!==this.vectors},n.keys=function(){return Object.keys(this.vectors)},n.get=function(e){if(this.keys().includes(e))return t.tensor1d(this.vectors[e]);var n,r=Infinity;return this.keys().forEach(function(t){var i=o(t,e);i<r&&(n=t,r=i)}),r<=this.maxDistance?t.tensor(this.vectors[n]):void 0},e}()};exports.featurizers=h,exports.models=p,exports.slots=g,exports.tools=b,exports.utils=l;
//# sourceMappingURL=index.js.map