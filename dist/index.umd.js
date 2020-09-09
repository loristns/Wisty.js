!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports,require("@tensorflow/tfjs"),require("@tensorflow-models/universal-sentence-encoder"),require("commonmark")):"function"==typeof define&&define.amd?define(["exports","@tensorflow/tfjs","@tensorflow-models/universal-sentence-encoder","commonmark"],e):e((t=t||self).wisty={},t.tf,t.use,t.commonmark)}(this,function(t,e,n,r){var i=function(){function t(){this.size=1}var n=t.prototype;return n.init=function(t){try{return this.actions=t,Promise.resolve()}catch(t){return Promise.reject(t)}},n.handleQuery=function(t){return Promise.resolve()},n.getOptimizableFeatures=function(t){return void 0===t?e.zeros([1]):t},n.handleAction=function(t){},n.getActionMask=function(){return this.actions.map(function(){return!0})},n.resetDialog=function(){},n.load=function(t){},n.export=function(){return Promise.resolve({})},t}();function o(){return(o=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t}).apply(this,arguments)}function s(t,e){t.prototype=Object.create(e.prototype),t.prototype.constructor=t,t.__proto__=e}function a(t,e){for(var n=Array.from(Array(t.length+1),function(){return new Array(e.length+1).fill(0)}),r=1;r<=t.length;r+=1)n[r][0]=r;for(var i=1;i<=e.length;i+=1)n[0][i]=i;for(var o=0;o<e.length;o+=1)for(var s=0;s<t.length;s+=1)n[s+1][o+1]=Math.min(n[s][o+1]+1,n[s+1][o]+1,n[s][o]+(t[s]!==e[o]?1:0));return n[t.length][e.length]/Math.max(t.length,e.length,1)}function u(t,e){for(var n={extract:void 0,score:0},r=0;r<t.length;r+=1){var i=t.substring(r,r+e.length),o={extract:i,score:1-a(i,e)};if(1===o.score)return o;o.score>n.score&&(n=o)}return n}function c(t){for(var e=0,n=0;n<t.length;n+=1)e=(e<<5)-e+t.charCodeAt(n),e|=0;return e}function l(t,n,r){return void 0===n&&(n=!1),void 0===r&&(r="he"),e.tidy(function(){var i;switch(r){case"he":i=e.initializers.heNormal({});break;case"zeros":i=e.initializers.zeros();break;case"normal":i=e.initializers.randomNormal({});break;default:throw new Error("Expected parameter init to take value 'he', 'zeros' or 'normal' not '"+r+"'.")}var o=i.apply(t);return n&&(o=o.asScalar()),o.variable()})}var h=function(){function t(t,e,n,r){void 0===r&&(r=.2),this.lstmKernel=l([t+e,4*e]),this.lstmBias=l([4*e],!1,"zeros"),this.lstmForgetBias=l([1],!0,"zeros"),this.lstmInitH=l([1,e]),this.lstmInitC=l([1,e]),this.denseWeights=l([e,n]),this.denseBias=l([n],!1,"zeros"),this.dropout=r}var n=t.prototype;return n.initLSTM=function(t){return void 0===t&&(t=!0),{c:t?this.lstmInitC.clone():this.lstmInitC,h:t?this.lstmInitH.clone():this.lstmInitH}},n.predict=function(t,n,r,i,o){var s=this;return void 0===o&&(o=1),e.tidy(function(){var a=e.basicLSTMCell(s.lstmForgetBias,s.lstmKernel,s.lstmBias,e.stack([t]),r,n),u=a[0],c=a[1],l=e.dropout(c,s.dropout).matMul(s.denseWeights).add(s.denseBias).squeeze().div(o).softmax().mul(null!=i?i:1);return{y:l=l.div(e.sum(l)),nc:u,nh:c}})},n.load=function(t){var n=this;e.tidy(function(){n.lstmKernel=e.tensor(t.lstmKernel).variable(),n.lstmBias=e.tensor(t.lstmBias).variable(),n.lstmForgetBias=e.tensor(t.lstmForgetBias).variable(),n.lstmInitH=e.tensor(t.lstmInitH).variable(),n.lstmInitC=e.tensor(t.lstmInitC).variable(),n.denseWeights=e.tensor(t.denseWeights).variable(),n.denseBias=e.tensor(t.denseBias).variable()})},n.export=function(){try{var t=this;return Promise.resolve(t.lstmKernel.array()).then(function(e){return Promise.resolve(t.lstmBias.array()).then(function(n){return Promise.resolve(t.lstmForgetBias.array()).then(function(r){return Promise.resolve(t.lstmInitH.array()).then(function(i){return Promise.resolve(t.lstmInitC.array()).then(function(o){return Promise.resolve(t.denseWeights.array()).then(function(s){return Promise.resolve(t.denseBias.array()).then(function(t){return{lstmKernel:e,lstmBias:n,lstmForgetBias:r,lstmInitH:i,lstmInitC:o,denseWeights:s,denseBias:t}})})})})})})})}catch(t){return Promise.reject(t)}},t}(),d=function(){function t(t,e){this.key=t,this.parent=e,this.childs={},this.ending=!1}var e=t.prototype;return e.addChild=function(t){this.childs[t.key]=t},e.setEnding=function(){this.ending=!0},t}(),f=function(){function t(){this.root=new d("",null)}var e=t.prototype;return e.add=function(t){for(var e=this.root,n=0;n<t.length;n+=1)void 0===e.childs[t[n]]&&e.addChild(new d(t[n],e)),e=e.childs[t[n]],n===t.length-1&&e.setEnding()},e.split=function(t,e,n){void 0===e&&(e=void 0),void 0===n&&(n=[]);var r=[];function i(t){r[r.length-1]===e||n.includes(t)||r.push(e)}for(var o=this.root,s="",a=0;a<t.length;a+=1){var u=t[a];void 0!==o.childs[u]?(s+=u,o=o.childs[u]):(o.ending?r.push(s):i(s),void 0!==this.root.childs[u]?(s=u,o=this.root.childs[u]):(i(s),s="",o=this.root))}return o.ending?r.push(s):i(s),r},t}(),v={__proto__:null,fuzzyMatch:u,hashcode:c,initializeVariable:l,levenshteinDistance:a,LSTM:h,Trie:f},m={__proto__:null,Featurizer:i,ActionFeaturizer:function(t){function n(e){var n,r=void 0===e?{maskLUS:!0,maskPreviousAction:!0,LUSAction:"LUS"}:e,i=r.maskLUS,o=void 0===i||i,s=r.maskPreviousAction,a=void 0===s||s,u=r.LUSAction,c=void 0===u?"LUS":u;return(n=t.call(this)||this).id="Action Featurizer",n.maskLUS=o,n.maskPreviousAction=a,n.LUSAction=c,n.resetDialog(),n}s(n,t);var r=n.prototype;return r.init=function(e){try{var n=this;return Promise.resolve(t.prototype.init.call(n,e)).then(function(){n.size=e.length,n.embeddings=l([n.size,n.size])})}catch(t){return Promise.reject(t)}},r.handleQuery=function(t){try{var n=this;return Promise.resolve(e.tidy(function(){return n.userTalked=""!==t,e.oneHot([n.actions.indexOf(n.previousAction)],n.actions.length)}))}catch(t){return Promise.reject(t)}},r.getOptimizableFeatures=function(t){return t.matMul(this.embeddings).squeeze()},r.handleAction=function(t){this.previousAction=t!==this.LUSAction?t:this.previousAction},r.getActionMask=function(){var e=t.prototype.getActionMask.call(this);return this.maskLUS&&this.userTalked&&(e[this.actions.indexOf(this.LUSAction)]=!1),this.maskPreviousAction&&this.actions.includes(this.previousAction)&&(e[this.actions.indexOf(this.previousAction)]=!1),e},r.resetDialog=function(){this.userTalked=!1,this.previousAction=void 0},r.load=function(t){this.embeddings=e.tidy(function(){return e.tensor(t.embeddings).variable()})},r.export=function(){try{return Promise.resolve(this.embeddings.array()).then(function(t){return{embeddings:t}})}catch(t){return Promise.reject(t)}},n}(i),BOW:function(t){function n(e){var n;return(n=t.call(this)||this).id="Bag-of-Words",n.size=e,n}return s(n,t),n.prototype.handleQuery=function(t){try{var n=this;return Promise.resolve(e.tidy(function(){var r=t.toLowerCase().split(/\W/g).map(function(t){return c(t)%n.size});return e.oneHot(r,n.size).asType("float32").sum(0)}))}catch(t){return Promise.reject(t)}},n}(i),USE:function(t){function r(){var e;return(e=t.apply(this,arguments)||this).id="Universal Sentence Encoder",e.size=512,e}s(r,t);var i=r.prototype;return i.init=function(e){try{var r=this;return Promise.resolve(t.prototype.init.call(r,e)).then(function(){return Promise.resolve(n.load()).then(function(t){return r.encoder=t,Promise.resolve(r.encodeQuery("")).then(function(t){r.emptyEncoding=t})})})}catch(t){return Promise.reject(t)}},i.encodeQuery=function(t){try{return Promise.resolve(this.encoder.embed([t])).then(function(t){var n=t.squeeze();return e.dispose(t),n})}catch(t){return Promise.reject(t)}},i.handleQuery=function(t){try{return Promise.resolve(t?this.encodeQuery(t):this.emptyEncoding.clone())}catch(t){return Promise.reject(t)}},r}(i),WordEmbedding:function(t){function n(e){var n;return(n=t.call(this)||this).id="Word Embedding",n.size=2*e.size,n.vectors=e,n}s(n,t);var r=n.prototype;return r.init=function(e){try{var n=this;return Promise.resolve(t.prototype.init.call(n,e)).then(function(){var t=function(){if(!n.vectors.isLoaded())return Promise.resolve(n.vectors.load()).then(function(){})}();if(t&&t.then)return t.then(function(){})})}catch(t){return Promise.reject(t)}},r.handleQuery=function(t){try{var n=this;return Promise.resolve(e.tidy(function(){var r=n.vectors.tokenize(t).map(function(t){return n.vectors.get(t)}).filter(function(t){return void 0!==t});if(0===r.length)return e.zeros([n.size]);var i=e.stack(r);return e.concat([i.mean(0),i.max(0)])}))}catch(t){return Promise.reject(t)}},n}(i)};function p(t,e,n){if(!t.s){if(n instanceof y){if(!n.s)return void(n.o=p.bind(null,t,e));1&e&&(e=n.s),n=n.v}if(n&&n.then)return void n.then(p.bind(null,t,e),p.bind(null,t,2));t.s=e,t.v=n;var r=t.o;r&&r(t)}}var y=function(){function t(){}return t.prototype.then=function(e,n){var r=new t,i=this.s;if(i){var o=1&i?e:n;if(o){try{p(r,1,o(this.v))}catch(t){p(r,2,t)}return r}return this}return this.o=function(t){try{var i=t.v;1&t.s?p(r,1,e?e(i):i):n?p(r,1,n(i)):p(r,2,i)}catch(t){p(r,2,t)}},r},t}();function g(t){return t instanceof y&&1&t.s}function z(t,e,n){for(var r;;){var i=t();if(g(i)&&(i=i.v),!i)return o;if(i.then){r=0;break}var o=n();if(o&&o.then){if(!g(o)){r=1;break}o=o.s}if(e){var s=e();if(s&&s.then&&!g(s)){r=2;break}}}var a=new y,u=p.bind(null,a,2);return(0===r?i.then(l):1===r?o.then(c):s.then(h)).then(void 0,u),a;function c(r){o=r;do{if(e&&(s=e())&&s.then&&!g(s))return void s.then(h).then(void 0,u);if(!(i=t())||g(i)&&!i.v)return void p(a,1,o);if(i.then)return void i.then(l).then(void 0,u);g(o=n())&&(o=o.v)}while(!o||!o.then);o.then(c).then(void 0,u)}function l(t){t?(o=n())&&o.then?o.then(c).then(void 0,u):c(o):p(a,1,o)}function h(){(i=t())?i.then?i.then(l).then(void 0,u):l(i):p(a,1,o)}}var S,k={__proto__:null,HCN:function(){function t(t){var n=t.actions,r=t.featurizers,i=t.hiddenSize,o=void 0===i?32:i,s=t.optimizer,a=void 0===s?e.train.adam(.01):s,u=t.temperature,c=void 0===u?1:u,l=t.dropout,h=void 0===l?0:l;this.actions=n,this.featurizers=r,this.optimizer=a,this.hiddenSize=o,this.outputSize=n.length,this.lstmTemperature=c,this.lstmDropout=h}var n=t.prototype;return n.init=function(){try{var t=this;return Promise.resolve(Promise.all(t.featurizers.map(function(e){return e.init(t.actions)}))).then(function(){t.inputSize=t.featurizers.map(function(t){return t.size}).reduce(function(t,e){return t+e},1),t.lstm=new h(t.inputSize,t.hiddenSize,t.outputSize,t.lstmDropout),t.resetDialog()})}catch(t){return Promise.reject(t)}},n.resetDialog=function(){this.featurizers.forEach(function(t){return t.resetDialog()});var t=this.lstm.initLSTM();this.lstmC=t.c,this.lstmH=t.h},n.handleQuery=function(t){try{return Promise.all(this.featurizers.map(function(e){return e.handleQuery(t)}))}catch(t){return Promise.reject(t)}},n.getOptimizableFeatures=function(t){var n=this;return e.tidy(function(){var r=n.featurizers.map(function(e,n){return e.getOptimizableFeatures(t[n])});return r.push(e.zeros([1])),e.concat(r)})},n.handleAction=function(t){this.featurizers.map(function(e){return e.handleAction(t)})},n.getActionMask=function(){var t=this;return e.tidy(function(){return t.featurizers.map(function(t){return e.tensor(t.getActionMask(),void 0,"float32")}).reduce(function(t,n){return e.mul(t,n)},e.ones([t.actions.length]))})},n.fitStory=function(t){try{var n=function(){var t;return r.optimizer.minimize(function(){var n=r.lstm.initLSTM(!1),a=n.c,u=n.h,c=i.map(function(t,e){var n=r.lstm.predict(r.getOptimizableFeatures(t),a,u,o[e]);return a=n.nc,u=n.nh,n.y}),l=e.stack(s),h=e.stack(c),d=e.metrics.categoricalCrossentropy(l,h).mean();return t={targets:e.keep(l.argMax(1)),predictions:e.keep(h.argMax(1)),loss:d.arraySync(),isFailing:e.metrics.categoricalAccuracy(l,h).mean().arraySync()<.999},d}),e.dispose([i,s]),t},r=this;r.resetDialog();var i=[],o=[],s=[],a=0,u=z(function(){return a<t.length},function(){return!!(a+=1)},function(){var n=t[a],u=i.push;return Promise.resolve(r.handleQuery(n.query)).then(function(t){u.call(i,t),o.push(r.getActionMask()),s.push(e.oneHot(r.actions.indexOf(n.action),r.outputSize)),r.handleAction(n.action)})});return Promise.resolve(u&&u.then?u.then(n):n())}catch(t){return Promise.reject(t)}},n.train=function(t){var n=t.stories,r=t.nEpochs,i=void 0===r?12:r,o=t.onEpochEnd,s=void 0===o?void 0:o;try{var a,u=function(){return c.resetDialog(),a},c=this,l=0,h=z(function(){return l<i},function(){return!!(l+=1)},function(){function t(){var t=e.tidy(function(){return e.math.confusionMatrix(e.concat(r),e.concat(i),c.outputSize)}),n=e.tidy(function(){return t.mul(e.eye.apply(e,t.shape)).sum(0)});a={epoch:l,failingSamples:u,accuracy:e.tidy(function(){return n.sum().div(t.sum()).arraySync()}),recall:e.tidy(function(){return n.div(t.sum(1)).mean().arraySync()}),precision:e.tidy(function(){return n.div(t.sum(0)).mean().arraySync()}),loss:o.reduce(function(t,e){return t+e})/o.length},e.dispose(r),e.dispose(i),e.dispose([n,t]),void 0!==s&&s(a)}var r=[],i=[],o=[],u=[],h=0,d=z(function(){return h<n.length},function(){return!!(h+=1)},function(){return Promise.resolve(c.fitStory(n[h])).then(function(t){r.push(t.targets),i.push(t.predictions),o.push(t.loss),t.isFailing&&u.push(h)})});return d&&d.then?d.then(t):t()});return Promise.resolve(h&&h.then?h.then(u):u())}catch(t){return Promise.reject(t)}},n.predict=function(t){try{var n=this;n.lstm.dropout=0;var r=n.getOptimizableFeatures;return Promise.resolve(n.handleQuery(t)).then(function(t){var i=r.call(n,t),o=n.getActionMask(),s=n.lstm.predict(i,n.lstmC,n.lstmH,o,n.lstmTemperature);e.dispose([n.lstmC,n.lstmH]),n.lstmC=s.nc.clone(),n.lstmH=s.nh.clone();var a=e.tidy(function(){return s.y.argMax().arraySync()}),u=e.tidy(function(){return s.y.arraySync()[a]});return e.dispose([i,o]),e.dispose(s),n.lstm.dropout=n.lstmDropout,n.handleAction(n.actions[a]),{action:n.actions[a],confidence:u}})}catch(t){return Promise.reject(t)}},n.score=function(t){try{var n=function(){var t=e.tidy(function(){return e.math.confusionMatrix(e.tensor(i),e.tensor(o),r.outputSize)}),n=e.tidy(function(){return t.mul(e.eye.apply(e,t.shape)).sum(0)}),u={failingSamples:a,accuracy:e.tidy(function(){return n.sum().div(t.sum()).arraySync()}),recall:e.tidy(function(){return n.div(t.sum(1)).mean().arraySync()}),precision:e.tidy(function(){return n.div(t.sum(0)).mean().arraySync()}),averageConfidence:s.reduce(function(t,e){return t+e})/s.length};return e.dispose([n,t]),r.resetDialog(),u},r=this,i=[],o=[],s=[],a=[],u=0,c=z(function(){return u<t.length},function(){return!!(u+=1)},function(){r.resetDialog();var e=0,n=z(function(){return e<t[u].length},function(){return!!(e+=1)},function(){var n=t[u][e];return Promise.resolve(r.predict(n.query)).then(function(t){var e=t.action,c=t.confidence;i.push(r.actions.indexOf(n.action)),o.push(r.actions.indexOf(e)),s.push(c),e===n.action||a.includes(u)||a.push(u)})});if(n&&n.then)return n.then(function(){})});return Promise.resolve(c&&c.then?c.then(n):n())}catch(t){return Promise.reject(t)}},n.load=function(t){var e=JSON.parse(t);this.featurizers.forEach(function(t){t.load(e[t.id])}),this.lstm.load(e.lstm),this.resetDialog()},n.export=function(){try{var t=this;return Promise.resolve(t.lstm.export()).then(function(e){function n(){return JSON.stringify(r)}var r={lstm:e},i=0,o=z(function(){return i<t.featurizers.length},function(){return!!(i+=1)},function(){var e=t.featurizers[i];return Promise.resolve(e.export()).then(function(t){r[e.id]=t})});return o&&o.then?o.then(n):n()})}catch(t){return Promise.reject(t)}},t}()},b=function(t){function e(e,n){var r;return(r=t.call(this)||this).dependantActions=e,r.invDependantActions=n,r}s(e,t);var n=e.prototype;return n.getActionMask=function(){var t=this;return this.actions.map(function(e){var n=void 0!==t.value,r=t.dependantActions.includes(e),i=t.invDependantActions.includes(e);return!n&&(!r||i)||n&&!i})},n.resetDialog=function(){this.value=void 0},n.getValue=function(){return this.value},n.setValue=function(t){this.value=t},e}(i),P={__proto__:null,Slot:b,CategoricalSlot:function(t){function n(e){var n,r=e.name,i=e.categories,o=e.dependantActions,s=e.invDependantActions,a=e.threshold,u=void 0===a?.75:a;return(n=t.call(this,void 0===o?[]:o,void 0===s?[]:s)||this).categoryNames=Object.keys(i),n.categories=i,n.threshold=u,n.id=r+"#Categorical",n.size=2*n.categoryNames.length,n}s(n,t);var r=n.prototype;return r.init=function(e){try{var n=this;return Promise.resolve(t.prototype.init.call(n,e)).then(function(){n.resetDialog()})}catch(t){return Promise.reject(t)}},r.oneHotValue=function(t){var n=Object.keys(this.categories);return e.oneHot(n.indexOf(t.category),n.length)},r.handleQuery=function(t){try{var n=this,r=n.getValue(),i={category:void 0,extract:void 0,score:0};Object.entries(n.categories).forEach(function(e){var s=e[0],a=e[1].map(function(e){return u(t.toLowerCase(),e.toLowerCase())}).filter(function(t){return t.score>=n.threshold}).reduce(function(t,e){return t.score>e.score?t:e},{extract:void 0,score:0});if(void 0!==a.extract){var c=s!==r.category,l=i.category===r.category,h=a.score>i.score;(void 0===i.category||c&&h||l&&c||l&&h)&&(i=o({category:s},a))}});var s=e.tidy(function(){return e.concat([n.oneHotValue(i),n.oneHotValue(n.getValue())])});return void 0!==i.category&&n.setValue(i),Promise.resolve(s)}catch(t){return Promise.reject(t)}},r.getValue=function(){return void 0===t.prototype.getValue.call(this)?{category:void 0,extract:void 0,score:0}:t.prototype.getValue.call(this)},n}(b)};function w(t,e,n){if(!t.s){if(n instanceof x){if(!n.s)return void(n.o=w.bind(null,t,e));1&e&&(e=n.s),n=n.v}if(n&&n.then)return void n.then(w.bind(null,t,e),w.bind(null,t,2));t.s=e,t.v=n;var r=t.o;r&&r(t)}}!function(t){t[t.query=0]="query",t[t.data=1]="data",t[t.action=2]="action",t[t.empty=3]="empty"}(S||(S={}));var x=function(){function t(){}return t.prototype.then=function(e,n){var r=new t,i=this.s;if(i){var o=1&i?e:n;if(o){try{w(r,1,o(this.v))}catch(t){w(r,2,t)}return r}return this}return this.o=function(t){try{var i=t.v;1&t.s?w(r,1,e?e(i):i):n?w(r,1,n(i)):w(r,2,i)}catch(t){w(r,2,t)}},r},t}();function A(t){return t instanceof x&&1&t.s}var L={__proto__:null,parseStories:function(t){var e=[],n=[],r=!0;return t.split("\n").forEach(function(t){var i=/^## *([^#].*)?$/gm.exec(t),o=/^> *(.*)$/gm.exec(t),s=/^- *(\w*)$/gm.exec(t);null!=i&&n.length>0?(n.push({query:"",action:"LUS"}),e.push(n),n=[]):null!=o?(n.length>0&&(void 0===n[n.length-1].action?n[n.length-1].action="LUS":n.push({query:"",action:"LUS"})),n.push({query:o[1],action:void 0}),r=!1):null!=s&&r?n.push({query:"",action:s[1]}):null==s||r||(n[n.length-1].action=s[1],r=!0)}),n.length>0&&(n.push({query:"",action:"LUS"}),e.push(n)),e},parseWistyML:function(t){var e=new r.Parser({smart:!0}).parse(t).walker(),n=e.next(),i={section:void 0,status:void 0,slot:void 0,sentence:"",extractedValues:[],storyName:void 0,story:[],currentState:void 0,stateStep:S.empty},s={stories:{},extractedValues:{}};function a(){void 0!==i.storyName&&(i.story.push(i.currentState),i.story.push({query:"",action:"LUS"}),s.stories[i.storyName]=i.story,i.storyName=void 0,i.story=[],i.currentState=void 0,i.stateStep=S.empty)}function u(t){var e;void 0===s.extractedValues[i.slot]&&(s.extractedValues[i.slot]=[]),(e=s.extractedValues[i.slot]).push.apply(e,i.extractedValues.map(function(e){return o({sentence:t},e)})),i.extractedValues=[],i.sentence=""}for(;null!==n;){var c=n.entering,l=n.node,h=l.type,d=l.literal,f=l.destination,v=l.info,m=l.level;if(c&&"heading"===h&&2===m)i.status="new-section",a();else if("text"===h&&"new-section"===i.status)i.section=d,i.status=d+".entering";else if("wisty.slots"===i.section)c&&"heading"===h&&3===m?i.status="slots.new-slot":"text"===h&&"slots.new-slot"===i.status?(d in s.extractedValues||(s.extractedValues[d]=[]),i.slot=d,i.status="slots.in-slot"):c&&"item"===h&&"slots.in-slot"===i.status?i.status="slots.in-sample":"text"===h&&"slots.in-sample"===i.status?i.sentence+=d:"code"===h&&"slots.in-sample"===i.status?(i.extractedValues.push({extract:d,start:i.sentence.length,end:i.sentence.length+d.length-1}),i.sentence+=d):c||"item"!==h||"slots.in-sample"!==i.status||(u(i.sentence),i.status="slots.in-slot");else if("wisty.stories"===i.section)if(c&&"heading"===h&&3===m)i.status="stories.new-story",a();else if("text"===h&&"stories.new-story"===i.status)i.storyName=d,i.status="stories.in-story";else if(c&&["block_quote","item","code_block"].includes(h)&&"stories.in-story"===i.status){var p=void 0;switch(h){case"block_quote":p=S.query;break;case"item":p=S.action;break;case"code_block":p=S.data}switch(p<=i.stateStep&&(void 0!==i.currentState&&(i.story.push(i.currentState),p===S.query&&"LUS"!==i.currentState.action&&i.story.push({query:"",action:"LUS"})),i.currentState={query:"",action:"LUS"}),p){case S.query:i.status="stories.new-query";break;case S.action:i.status="stories.new-action";break;case S.data:"json"===v&&(i.currentState.data=JSON.parse(d))}i.stateStep=p}else"text"===h&&"stories.new-query"===i.status?i.currentState.query+=d:c&&"link"===h&&"stories.new-query"===i.status?(i.slot=f,i.status="stories.new-slot"):"text"===h&&"stories.new-slot"===i.status?(i.extractedValues.push({extract:d,start:i.currentState.query.length,end:i.currentState.query.length+d.length-1}),i.currentState.query+=d,i.status="stories.new-query"):c||"block_quote"!==h||"stories.new-query"!==i.status?"text"===h&&"stories.new-action"===i.status&&(i.currentState.action=d,i.status="stories.in-story"):(i.extractedValues.length>0&&u(i.currentState.query),i.status="stories.in-story");n=e.next()}return a(),s},trainTestSplit:function(t,e){for(var n=[],r=0;r/t.length<e;r+=1)n.push.apply(n,t.splice(Math.floor(Math.random()*t.length),1));return{train:t,test:n}},NLUFormatter:function(){function t(t){var e=t.slots,n=void 0===e?[]:e,r=t.LUSAction,i=void 0===r?"LUS":r;this.model=t.model,this.slots=n,this.LUSAction=i}var e=t.prototype;return e.ask=function(t){try{var e=this,n={query:t,actions:[],turnConfidence:1,slots:{}};return Promise.resolve(e.model.predict(t)).then(function(t){var r=t.action,i=t.confidence;function o(){return e.slots.forEach(function(t){n.slots[t.id]=t.getValue()}),n}var s=function(t,e,n){for(var r;;){var i=t();if(A(i)&&(i=i.v),!i)return o;if(i.then){r=0;break}var o=n();if(o&&o.then){if(!A(o)){r=1;break}o=o.s}}var s=new x,a=w.bind(null,s,2);return(0===r?i.then(c):1===r?o.then(u):(void 0).then(function(){(i=t())?i.then?i.then(c).then(void 0,a):c(i):w(s,1,o)})).then(void 0,a),s;function u(e){o=e;do{if(!(i=t())||A(i)&&!i.v)return void w(s,1,o);if(i.then)return void i.then(c).then(void 0,a);A(o=n())&&(o=o.v)}while(!o||!o.then);o.then(u).then(void 0,a)}function c(t){t?(o=n())&&o.then?o.then(u).then(void 0,a):u(o):w(s,1,o)}}(function(){return r!==e.LUSAction},0,function(){return n.actions.push(r),n.turnConfidence*=i,Promise.resolve(e.model.predict("")).then(function(t){r=t.action,i=t.confidence})});return s&&s.then?s.then(o):o()})}catch(t){return Promise.reject(t)}},e.resetDialog=function(){this.model.resetDialog()},t}(),KeyedVectors:function(){function t(t){var e=t.loaderFunction,n=t.size,r=t.tokenization,i=void 0===r?"word":r,o=t.cased,s=void 0!==o&&o,a=t.maxDistance,u=void 0===a?.5:a,c=t.unknownKey,l=void 0===c?void 0:c;if(!["word","byte_pair"].includes(i))throw new Error('KeyedVector tokenization setting must be "word" or "byte_pair"');this.loaderFunction=e,this.size=n,this.tokenization=i,this.cased=s,this.maxDistance=u,this.unknownKey=l}var n=t.prototype;return n.keys=function(){return Object.keys(this.vectors)},n.load=function(){try{var t=this;return Promise.resolve(t.loaderFunction()).then(function(e){t.vectors=JSON.parse(e),"byte_pair"===t.tokenization&&(t.trie=new f,t.keys().forEach(function(e){return t.trie.add(e)}))})}catch(t){return Promise.reject(t)}},n.isLoaded=function(){return void 0!==this.vectors},n.get=function(t){if(this.keys().includes(t))return e.tensor1d(this.vectors[t]);var n,r=Infinity;return this.keys().forEach(function(e){var i=a(e,t);i<r&&(n=e,r=i)}),r<=this.maxDistance?e.tensor(this.vectors[n]):void 0!==this.unknownKey?e.tensor(this.vectors[this.unknownKey]):void 0},n.wordTokenize=function(t){return t.split(/\W/g).filter(function(t){return t.length>0})},n.bytePairTokenize=function(t){var e=(" "+t).split(" ").join("▁");return this.trie.split(e,this.unknownKey,["▁"])},n.tokenize=function(t){switch(this.cased&&(t=t.toLowerCase()),this.tokenization){case"word":return this.wordTokenize(t);case"byte_pair":return this.bytePairTokenize(t);default:throw new Error('KeyedVector tokenization setting must be "word" or "byte_pair"')}},t}()};t.featurizers=m,t.models=k,t.slots=P,t.tools=L,t.utils=v});
//# sourceMappingURL=index.umd.js.map
