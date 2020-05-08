import{tidy as t,basicLSTMCell as e,stack as r,dropout as n,sum as i,metrics as o,tensor as s,train as u,randomNormal as a,zeros as c,concat as l,dispose as h,mul as f,ones as v,oneHot as m,moments as d}from"@tensorflow/tfjs";import{load as y}from"@tensorflow-models/universal-sentence-encoder";var p=function(){function c(t,e,r,n,i){void 0===n&&(n=u.adam()),void 0===i&&(i=.2),this.lstmKernel=c.randomVariable([t+e,4*e]),this.lstmBias=c.randomVariable([4*e]),this.lstmForgetBias=c.randomVariable([1],!0),this.lstmInitH=c.randomVariable([1,e]),this.lstmInitC=c.randomVariable([1,e]),this.denseWeights=c.randomVariable([e,r]),this.denseBias=c.randomVariable([r]),this.optimizer=n,this.dropout=i}c.randomVariable=function(e,r){return void 0===r&&(r=!1),t(function(){var t=a(e);return r&&(t=t.asScalar()),t.variable()})};var l=c.prototype;return l.initLSTM=function(){return{c:this.lstmInitC.clone(),h:this.lstmInitH.clone()}},l.predict=function(o,s,u,a,c){var l=this;return void 0===c&&(c=1),t(function(){var t=e(l.lstmForgetBias,l.lstmKernel,l.lstmBias,r([o]),u,s),h=t[0],f=t[1],v=n(f,l.dropout).matMul(l.denseWeights).add(l.denseBias).squeeze().div(c).softmax().mul(null!=a?a:1);return{y:v=v.div(i(v)),nc:h,nh:f}})},l.fitSequence=function(t,e,n){var i,s,u=this;return this.optimizer.minimize(function(){var a=u.lstmInitC,c=u.lstmInitH,l=t.unstack(),h=null==n?void 0:n.unstack(),f=r(l.map(function(t,e){var r=u.predict(t,a,c,null==h?void 0:h[e]);return a=r.nc,c=r.nh,r.y})),v=o.categoricalCrossentropy(e,f).mean();return i=v.arraySync(),s=o.categoricalAccuracy(e,f).mean().arraySync(),v}),{loss:i,accuracy:s}},l.load=function(e){var r=this;t(function(){r.lstmKernel=s(e.lstmKernel).variable(),r.lstmBias=s(e.lstmBias).variable(),r.lstmForgetBias=s(e.lstmForgetBias).variable(),r.lstmInitH=s(e.lstmInitH).variable(),r.lstmInitC=s(e.lstmInitC).variable(),r.denseWeights=s(e.denseWeights).variable(),r.denseBias=s(e.denseBias).variable()})},l.export=function(){try{var t=this;return Promise.resolve(t.lstmKernel.array()).then(function(e){return Promise.resolve(t.lstmBias.array()).then(function(r){return Promise.resolve(t.lstmForgetBias.array()).then(function(n){return Promise.resolve(t.lstmInitH.array()).then(function(i){return Promise.resolve(t.lstmInitC.array()).then(function(o){return Promise.resolve(t.denseWeights.array()).then(function(s){return Promise.resolve(t.denseBias.array()).then(function(t){return{lstmKernel:e,lstmBias:r,lstmForgetBias:n,lstmInitH:i,lstmInitC:o,denseWeights:s,denseBias:t}})})})})})})})}catch(t){return Promise.reject(t)}},c}();function g(){return(g=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(t[n]=r[n])}return t}).apply(this,arguments)}function P(t,e){t.prototype=Object.create(e.prototype),t.prototype.constructor=t,t.__proto__=e}const b=function(){function t(){}return t.prototype.then=function(e,r){const n=new t,i=this.s;if(i){const t=1&i?e:r;if(t){try{S(n,1,t(this.v))}catch(t){S(n,2,t)}return n}return this}return this.o=function(t){try{const i=t.v;1&t.s?S(n,1,e?e(i):i):r?S(n,1,r(i)):S(n,2,i)}catch(t){S(n,2,t)}},n},t}();function S(t,e,r){if(!t.s){if(r instanceof b){if(!r.s)return void(r.o=S.bind(null,t,e));1&e&&(e=r.s),r=r.v}if(r&&r.then)return void r.then(S.bind(null,t,e),S.bind(null,t,2));t.s=e,t.v=r;const n=t.o;n&&n(t)}}function z(t){return t instanceof b&&1&t.s}function A(t,e,r){for(var n;;){var i=t();if(z(i)&&(i=i.v),!i)return o;if(i.then){n=0;break}var o=r();if(o&&o.then){if(!z(o)){n=1;break}o=o.s}if(e){var s=e();if(s&&s.then&&!z(s)){n=2;break}}}var u=new b,a=S.bind(null,u,2);return(0===n?i.then(l):1===n?o.then(c):s.then(h)).then(void 0,a),u;function c(n){o=n;do{if(e&&(s=e())&&s.then&&!z(s))return void s.then(h).then(void 0,a);if(!(i=t())||z(i)&&!i.v)return void S(u,1,o);if(i.then)return void i.then(l).then(void 0,a);z(o=r())&&(o=o.v)}while(!o||!o.then);o.then(c).then(void 0,a)}function l(t){t?(o=r())&&o.then?o.then(c).then(void 0,a):c(o):S(u,1,o)}function h(){(i=t())?i.then?i.then(l).then(void 0,a):l(i):S(u,1,o)}}"undefined"!=typeof Symbol&&(Symbol.iterator||(Symbol.iterator=Symbol("Symbol.iterator"))),"undefined"!=typeof Symbol&&(Symbol.asyncIterator||(Symbol.asyncIterator=Symbol("Symbol.asyncIterator")));var j=function(){function e(t,e,r,n,i){void 0===r&&(r=128),void 0===n&&(n=u.adam(.01)),void 0===i&&(i=.2),this.actions=t,this.featurizers=e,this.optimizer=n,this.hiddenSize=r,this.outputSize=t.length,this.lstmDropout=i}var n=e.prototype;return n.init=function(){try{var t=this;return Promise.resolve(Promise.all(t.featurizers.map(function(e){return e.init(t.actions)}))).then(function(){t.inputSize=t.featurizers.map(function(t){return t.size}).reduce(function(t,e){return t+e},1),t.lstm=new p(t.inputSize,t.hiddenSize,t.outputSize,t.optimizer,t.lstmDropout),t.resetDialog()})}catch(t){return Promise.reject(t)}},n.resetDialog=function(){this.featurizers.forEach(function(t){return t.resetDialog()});var t=this.lstm.initLSTM();this.lstmC=t.c,this.lstmH=t.h},n.handleQuery=function(t){try{return Promise.resolve(Promise.all(this.featurizers.map(function(e){return e.handleQuery(t)}))).then(function(t){t.push(c([1]));var e=l(t);return h(t),e})}catch(t){return Promise.reject(t)}},n.handleAction=function(t){this.featurizers.map(function(e){return e.handleAction(t)})},n.getActionMask=function(){var e=this;return t(function(){return e.featurizers.map(function(t){return s(t.getActionMask(),void 0,"float32")}).reduce(function(t,e){return f(t,e)},v([e.actions.length]))})},n.fitStory=function(e,n){try{var i=function(){var e=g({epoch:n},t(function(){return o.lstm.fitSequence(r(s),r(a),r(u))}));return h([s,a]),e},o=this;o.resetDialog();var s=[],u=[],a=[],c=0,l=A(function(){return c<e.length},function(){return!!(c+=1)},function(){var t=e[c],r=s.push;return Promise.resolve(o.handleQuery(t.query)).then(function(e){r.call(s,e),u.push(o.getActionMask()),a.push(m(o.actions.indexOf(t.action),o.outputSize)),o.handleAction(t.action)})});return Promise.resolve(l&&l.then?l.then(i):i())}catch(t){return Promise.reject(t)}},n.train=function(t,e,r){void 0===e&&(e=12);try{var n=function(){return i.resetDialog(),o},i=this,o=[],s=0,u=A(function(){return s<e},function(){return!!(s+=1)},function(){function e(){void 0!==r&&r(n),o.push.apply(o,n)}var n=[],u=0,a=A(function(){return u<t.length},function(){return!!(u+=1)},function(){var e=n.push;return Promise.resolve(i.fitStory(t[u],s)).then(function(t){e.call(n,t)})});return a&&a.then?a.then(e):e()});return Promise.resolve(u&&u.then?u.then(n):n())}catch(t){return Promise.reject(t)}},n.predict=function(e,n,i){void 0===n&&(n=10),void 0===i&&(i=1);try{var o=this;return o.lstm.dropout=1===n?0:o.lstmDropout,Promise.resolve(o.handleQuery(e)).then(function(e){for(var s,u=o.getActionMask(),a=[],c=0;c<n;c+=1)h(s),s=o.lstm.predict(e,o.lstmC,o.lstmH,u,i),a.push(s.y);h([o.lstmC,o.lstmH]),o.lstmC=s.nc.clone(),o.lstmH=s.nh.clone();var l=t(function(){return d(r(a),0)}),f=l.mean,v=l.variance,m=t(function(){return f.argMax().arraySync()}),y=t(function(){return f.sub(v.sqrt()).arraySync()[m]});return h([e,u,f,v]),h(s),h(a),o.handleAction(o.actions[m]),{action:o.actions[m],confidence:y}})}catch(t){return Promise.reject(t)}},n.load=function(t){var e=JSON.parse(t);this.featurizers.forEach(function(t){t.load(e[t.id])}),this.lstm.load(e.lstm),this.resetDialog()},n.export=function(){try{var t=this;return Promise.resolve(t.lstm.export()).then(function(e){var r={lstm:e};return t.featurizers.forEach(function(t){r[t.id]=t.export()}),Promise.resolve(Promise.all(Object.values(r))).then(function(){return JSON.stringify(r)})})}catch(t){return Promise.reject(t)}},e}(),k=function(){function t(){}var e=t.prototype;return e.init=function(t){try{return this.actions=t,Promise.resolve()}catch(t){return Promise.reject(t)}},e.handleAction=function(t){},e.getActionMask=function(){return this.actions.map(function(){return!0})},e.resetDialog=function(){},e.load=function(t){},e.export=function(){return Promise.resolve({})},t}(),x=function(t){function e(){var e;return(e=t.apply(this,arguments)||this).id="Universal Sentence Encoder",e.size=512,e}P(e,t);var r=e.prototype;return r.init=function(e){try{var r=this;return Promise.resolve(t.prototype.init.call(r,e)).then(function(){return Promise.resolve(y()).then(function(t){return r.encoder=t,Promise.resolve(r.encodeQuery("")).then(function(t){r.emptyEncoding=t})})})}catch(t){return Promise.reject(t)}},r.encodeQuery=function(t){try{return Promise.resolve(this.encoder.embed([t])).then(function(t){var e=t.squeeze();return h(t),e})}catch(t){return Promise.reject(t)}},r.handleQuery=function(t){try{return Promise.resolve(t?this.encodeQuery(t):this.emptyEncoding.clone())}catch(t){return Promise.reject(t)}},e}(k);function B(t){for(var e=0,r=0;r<t.length;r+=1)e=(e<<5)-e+t.charCodeAt(r),e|=0;return e}var O=function(e){function r(t){var r;return(r=e.call(this)||this).id="Bag-of-Words",r.size=t,r}return P(r,e),r.prototype.handleQuery=function(e){try{var r=this;return Promise.resolve(t(function(){var t=e.split(" ").map(function(t){return B(t)%r.size});return m(t,r.size).asType("float32").sum(0)}))}catch(t){return Promise.reject(t)}},r}(k),C=function(e){function n(t,r){var n;return(n=e.call(this)||this).id="Word Embedding",n.size=r,n.loaderFunction=t,n}P(n,e);var i=n.prototype;return i.init=function(t){try{var r=this;return Promise.resolve(e.prototype.init.call(r,t)).then(function(){return Promise.resolve(r.loaderFunction()).then(function(t){r.vectors=JSON.parse(t)})})}catch(t){return Promise.reject(t)}},i.handleQuery=function(e){try{var n=this;return Promise.resolve(t(function(){var t=e.toLowerCase().split(/\W/g).filter(function(t){return Object.keys(n.vectors).includes(t)});return 0===t.length?c([n.size]):r(t.map(function(t){return s(n.vectors[t])})).mean(0)}))}catch(t){return Promise.reject(t)}},n}(k);function I(t,e){for(var r=Array.from(Array(t.length+1),function(){return new Array(e.length+1).fill(0)}),n=1;n<=t.length;n+=1)r[n][0]=n;for(var i=1;i<=e.length;i+=1)r[0][i]=i;for(var o=0;o<e.length;o+=1)for(var s=0;s<t.length;s+=1)r[s+1][o+1]=Math.min(r[s][o+1]+1,r[s+1][o]+1,r[s][o]+(t[s]!==e[o]?1:0));return r[t.length][e.length]/Math.max(t.length,e.length,1)}function D(t,e){for(var r={extract:void 0,score:0},n=0;n<t.length;n+=1){var i=t.substring(n,n+e.length),o={extract:i,score:1-I(i,e)};if(1===o.score)return o;o.score>r.score&&(r=o)}return r}var L=function(e){function r(t,r,n,i){var o;return void 0===r&&(r=[]),void 0===n&&(n=[]),void 0===i&&(i=.75),(o=e.call(this)||this).categoryNames=Object.keys(t),o.categories=t,o.id="Categorical Slot ("+B(JSON.stringify(o.categoryNames))+")",o.dependantActions=r,o.inverselyDependantActions=n,o.threshold=i,o.size=2*o.categoryNames.length,o}P(r,e);var n=r.prototype;return n.init=function(t){try{var r=this;return Promise.resolve(e.prototype.init.call(r,t)).then(function(){r.resetDialog()})}catch(t){return Promise.reject(t)}},n.featurizeValue=function(t){var e=Object.keys(this.categories);return m(e.indexOf(t.category),e.length)},n.handleQuery=function(e){try{var r=this,n={category:void 0,extract:void 0,score:0};Object.entries(r.categories).forEach(function(t){var i=t[0],o=t[1].map(function(t){return D(e.toLowerCase(),t.toLowerCase())}).filter(function(t){return t.score>=r.threshold}).reduce(function(t,e){return t.score>e.score?t:e},{extract:void 0,score:0});o.score>n.score&&(n=g({category:i},o))});var i=t(function(){return l([r.featurizeValue(n),r.featurizeValue(r.value)])});return void 0!==n.category&&(r.value=n),Promise.resolve(i)}catch(t){return Promise.reject(t)}},n.getActionMask=function(){var t=this;return this.actions.map(function(e){var r=void 0===t.value.extract,n=t.dependantActions.includes(e),i=t.inverselyDependantActions.includes(e);return r&&(i||!n)||!r&&!i})},n.resetDialog=function(){this.value={category:void 0,extract:void 0,score:0}},n.getValue=function(){return this.value},r}(k),M=function(e){function r(t,r,n){var i;return void 0===t&&(t=!0),void 0===r&&(r=!0),void 0===n&&(n="LUS"),(i=e.call(this)||this).id="Action Featurizer",i.maskLUS=t,i.maskPreviousAction=r,i.LUSAction=n,i.resetDialog(),i}P(r,e);var n=r.prototype;return n.init=function(t){try{var r=this;return Promise.resolve(e.prototype.init.call(r,t)).then(function(){r.size=t.length})}catch(t){return Promise.reject(t)}},n.handleQuery=function(e){try{var r=this;return Promise.resolve(t(function(){return r.userTalked=""!==e,m([r.actions.indexOf(r.previousAction)],r.actions.length).squeeze()}))}catch(t){return Promise.reject(t)}},n.handleAction=function(t){this.previousAction=t!==this.LUSAction?t:this.previousAction},n.getActionMask=function(){var t=e.prototype.getActionMask.call(this);return this.maskLUS&&this.userTalked&&(t[this.actions.indexOf(this.LUSAction)]=!1),this.maskPreviousAction&&this.actions.includes(this.previousAction)&&(t[this.actions.indexOf(this.previousAction)]=!1),t},n.resetDialog=function(){this.userTalked=!1,this.previousAction=void 0},r}(k);function q(t){var e=[],r=[],n=!0;return t.split("\n").forEach(function(t){var i=/^## *([^#].*)?$/gm.exec(t),o=/^> *(.*)$/gm.exec(t),s=/^- *(\w*)$/gm.exec(t);null!=i&&r.length>0?(r.push({query:"",action:"LUS"}),e.push(r),r=[]):null!=o?(r.length>0&&r.push({query:"",action:"LUS"}),r.push({query:o[1],action:void 0}),n=!1):null!=s&&n?r.push({query:"",action:s[1]}):null==s||n||(r[r.length-1].action=s[1],n=!0)}),r.length>0&&(r.push({query:"",action:"LUS"}),e.push(r)),e}export{M as ActionFeaturizer,O as BOW,L as CategoricalSlot,k as Featurizer,j as HCN,p as LSTM,x as USE,C as WordEmbedding,D as fuzzyMatch,B as hashcode,q as parseStories};
//# sourceMappingURL=wisty.esm.js.map
