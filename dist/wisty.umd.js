!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports,require("@tensorflow/tfjs"),require("@tensorflow-models/universal-sentence-encoder")):"function"==typeof define&&define.amd?define(["exports","@tensorflow/tfjs","@tensorflow-models/universal-sentence-encoder"],e):e((t=t||self).wisty={},t.tf,t.use)}(this,function(t,e,r){var n=function(){function t(r,n,i,o,s){void 0===o&&(o=e.train.adam()),void 0===s&&(s=.2),this.lstmKernel=t.randomVariable([r+n,4*n]),this.lstmBias=t.randomVariable([4*n]),this.lstmForgetBias=t.randomVariable([1],!0),this.lstmInitH=t.randomVariable([1,n]),this.lstmInitC=t.randomVariable([1,n]),this.denseWeights=t.randomVariable([n,i]),this.denseBias=t.randomVariable([i]),this.optimizer=o,this.dropout=s}t.randomVariable=function(t,r){return void 0===r&&(r=!1),e.tidy(function(){var n=e.randomNormal(t);return r&&(n=n.asScalar()),n.variable()})};var r=t.prototype;return r.initLSTM=function(){return{c:this.lstmInitC.clone(),h:this.lstmInitH.clone()}},r.predict=function(t,r,n,i){var o=this;return e.tidy(function(){var s=e.basicLSTMCell(o.lstmForgetBias,o.lstmKernel,o.lstmBias,e.stack([t]),n,r),a=s[0],u=s[1];return{y:e.dropout(u,o.dropout).matMul(o.denseWeights).add(o.denseBias).squeeze().mul(null!=i?i:1),nc:a,nh:u}})},r.fitSequence=function(t,r,n){var i,o,s=this;return this.optimizer.minimize(function(){var a=s.lstmInitC,u=s.lstmInitH,c=t.unstack(),l=null==n?void 0:n.unstack(),h=e.stack(c.map(function(t,e){var r=s.predict(t,a,u,null==l?void 0:l[e]);return a=r.nc,u=r.nh,r.y})),f=e.losses.softmaxCrossEntropy(r,h);return i=f.arraySync(),o=e.metrics.categoricalAccuracy(r,h).mean().arraySync(),f}),{loss:i,accuracy:o}},r.load=function(t){this.lstmKernel=e.tensor(t.lstmKernel).variable(),this.lstmBias=e.tensor(t.lstmBias).variable(),this.lstmForgetBias=e.tensor(t.lstmForgetBias).variable(),this.lstmInitH=e.tensor(t.lstmInitH).variable(),this.lstmInitC=e.tensor(t.lstmInitC).variable(),this.denseWeights=e.tensor(t.denseWeights).variable(),this.denseBias=e.tensor(t.denseBias).variable()},r.export=function(){try{var t=this;return Promise.resolve(t.lstmKernel.array()).then(function(e){return Promise.resolve(t.lstmBias.array()).then(function(r){return Promise.resolve(t.lstmForgetBias.array()).then(function(n){return Promise.resolve(t.lstmInitH.array()).then(function(i){return Promise.resolve(t.lstmInitC.array()).then(function(o){return Promise.resolve(t.denseWeights.array()).then(function(s){return Promise.resolve(t.denseBias.array()).then(function(t){return{lstmKernel:e,lstmBias:r,lstmForgetBias:n,lstmInitH:i,lstmInitC:o,denseWeights:s,denseBias:t}})})})})})})})}catch(t){return Promise.reject(t)}},t}();function i(){return(i=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(t[n]=r[n])}return t}).apply(this,arguments)}function o(t,e){t.prototype=Object.create(e.prototype),t.prototype.constructor=t,t.__proto__=e}const s=function(){function t(){}return t.prototype.then=function(e,r){const n=new t,i=this.s;if(i){const t=1&i?e:r;if(t){try{a(n,1,t(this.v))}catch(t){a(n,2,t)}return n}return this}return this.o=function(t){try{const i=t.v;1&t.s?a(n,1,e?e(i):i):r?a(n,1,r(i)):a(n,2,i)}catch(t){a(n,2,t)}},n},t}();function a(t,e,r){if(!t.s){if(r instanceof s){if(!r.s)return void(r.o=a.bind(null,t,e));1&e&&(e=r.s),r=r.v}if(r&&r.then)return void r.then(a.bind(null,t,e),a.bind(null,t,2));t.s=e,t.v=r;const n=t.o;n&&n(t)}}function u(t){return t instanceof s&&1&t.s}function c(t,e,r){for(var n;;){var i=t();if(u(i)&&(i=i.v),!i)return o;if(i.then){n=0;break}var o=r();if(o&&o.then){if(!u(o)){n=1;break}o=o.s}if(e){var c=e();if(c&&c.then&&!u(c)){n=2;break}}}var l=new s,h=a.bind(null,l,2);return(0===n?i.then(d):1===n?o.then(f):c.then(m)).then(void 0,h),l;function f(n){o=n;do{if(e&&(c=e())&&c.then&&!u(c))return void c.then(m).then(void 0,h);if(!(i=t())||u(i)&&!i.v)return void a(l,1,o);if(i.then)return void i.then(d).then(void 0,h);u(o=r())&&(o=o.v)}while(!o||!o.then);o.then(f).then(void 0,h)}function d(t){t?(o=r())&&o.then?o.then(f).then(void 0,h):f(o):a(l,1,o)}function m(){(i=t())?i.then?i.then(d).then(void 0,h):d(i):a(l,1,o)}}"undefined"!=typeof Symbol&&(Symbol.iterator||(Symbol.iterator=Symbol("Symbol.iterator"))),"undefined"!=typeof Symbol&&(Symbol.asyncIterator||(Symbol.asyncIterator=Symbol("Symbol.asyncIterator")));var l=function(){function t(t,r,n,i,o){void 0===n&&(n=128),void 0===i&&(i=e.train.adam(.01)),void 0===o&&(o=.2),this.actions=t,this.featurizers=r,this.optimizer=i,this.hiddenSize=n,this.outputSize=t.length,this.lstmDropout=o}var r=t.prototype;return r.init=function(){try{var t=this;return Promise.resolve(Promise.all(t.featurizers.map(function(e){return e.init(t.actions)}))).then(function(){t.inputSize=t.featurizers.map(function(t){return t.size}).reduce(function(t,e){return t+e},1),t.lstm=new n(t.inputSize,t.hiddenSize,t.outputSize,t.optimizer,t.lstmDropout),t.resetDialog()})}catch(t){return Promise.reject(t)}},r.resetDialog=function(){this.featurizers.forEach(function(t){return t.resetDialog()});var t=this.lstm.initLSTM();this.lstmC=t.c,this.lstmH=t.h},r.handleQuery=function(t){try{return Promise.resolve(Promise.all(this.featurizers.map(function(e){return e.handleQuery(t)}))).then(function(t){t.push(e.zeros([1]));var r=e.concat(t);return e.dispose(t),r})}catch(t){return Promise.reject(t)}},r.handleAction=function(t){this.featurizers.map(function(e){return e.handleAction(t)})},r.getActionMask=function(){var t=this;return e.tidy(function(){return t.featurizers.map(function(t){return e.tensor(t.getActionMask(),void 0,"float32")}).reduce(function(t,r){return e.mul(t,r)},e.ones([t.actions.length]))})},r.fitStory=function(t,r){try{var n=function(){var t=i({epoch:r},e.tidy(function(){return o.lstm.fitSequence(e.stack(s),e.stack(u),e.stack(a))}));return e.dispose([s,u]),t},o=this;o.resetDialog();var s=[],a=[],u=[],l=0,h=c(function(){return l<t.length},function(){return!!(l+=1)},function(){var r=t[l],n=s.push;return Promise.resolve(o.handleQuery(r.query)).then(function(t){n.call(s,t),a.push(o.getActionMask()),u.push(e.oneHot(o.actions.indexOf(r.action),o.outputSize)),o.handleAction(r.action)})});return Promise.resolve(h&&h.then?h.then(n):n())}catch(t){return Promise.reject(t)}},r.train=function(t,e,r){void 0===e&&(e=12);try{var n=function(){return i.resetDialog(),o},i=this,o=[],s=0,a=c(function(){return s<e},function(){return!!(s+=1)},function(){var e=[];return t.forEach(function(t){e.push(i.fitStory(t,s))}),Promise.resolve(Promise.all(e)).then(function(t){e=t,void 0!==r&&r(e),o.push.apply(o,e)})});return Promise.resolve(a&&a.then?a.then(n):n())}catch(t){return Promise.reject(t)}},r.predict=function(t,r,n){void 0===r&&(r=10),void 0===n&&(n=1);try{var i=this;return i.lstm.dropout=1===r?0:i.lstmDropout,Promise.resolve(i.handleQuery(t)).then(function(t){for(var o,s=i.getActionMask(),a=[],u=0;u<r;u+=1)e.dispose(o),o=i.lstm.predict(t,i.lstmC,i.lstmH,s),a.push(e.tidy(function(){return o.y.div(n).softmax()}));e.dispose([i.lstmC,i.lstmH]),i.lstmC=o.nc.clone(),i.lstmH=o.nh.clone();var c=e.tidy(function(){return e.moments(e.stack(a),0)}),l=c.mean,h=c.variance,f=e.tidy(function(){return l.argMax().arraySync()}),d=e.tidy(function(){return l.sub(h.sqrt()).arraySync()[f]});return e.dispose([t,s,l,h]),e.dispose(o),e.dispose(a),i.handleAction(i.actions[f]),{action:i.actions[f],confidence:d}})}catch(t){return Promise.reject(t)}},r.load=function(t){var e=JSON.parse(t);this.featurizers.forEach(function(t){t.load(e[t.id])}),this.lstm.load(e.lstm),this.resetDialog()},r.export=function(){try{var t=this;return Promise.resolve(t.lstm.export()).then(function(e){var r={lstm:e};return t.featurizers.forEach(function(t){r[t.id]=t.export()}),Promise.resolve(Promise.all(Object.values(r))).then(function(){return JSON.stringify(r)})})}catch(t){return Promise.reject(t)}},t}(),h=function(){function t(){}var e=t.prototype;return e.init=function(t){try{return this.actions=t,Promise.resolve()}catch(t){return Promise.reject(t)}},e.handleAction=function(t){},e.getActionMask=function(){return this.actions.map(function(){return!0})},e.resetDialog=function(){},e.load=function(t){},e.export=function(){return Promise.resolve({})},t}(),f=function(t){function n(){var e;return(e=t.apply(this,arguments)||this).id="Universal Sentence Encoder",e.size=512,e}o(n,t);var i=n.prototype;return i.init=function(e){try{var n=this;return t.prototype.init.call(n,e),Promise.resolve(r.load()).then(function(t){return n.encoder=t,Promise.resolve(n.encodeQuery("")).then(function(t){n.emptyEncoding=t})})}catch(t){return Promise.reject(t)}},i.encodeQuery=function(t){try{return Promise.resolve(this.encoder.embed([t])).then(function(t){var r=t.squeeze();return e.dispose(t),r})}catch(t){return Promise.reject(t)}},i.handleQuery=function(t){try{return Promise.resolve(t?this.encodeQuery(t):this.emptyEncoding.clone())}catch(t){return Promise.reject(t)}},n}(h);function d(t){for(var e=0,r=0;r<t.length;r+=1)e=(e<<5)-e+t.charCodeAt(r),e|=0;return e}var m=function(t){function r(e){var r;return(r=t.call(this)||this).id="Bag-of-Words",r.size=e,r}return o(r,t),r.prototype.handleQuery=function(t){try{var r=this;return Promise.resolve(e.tidy(function(){var n=t.split(" ").map(function(t){return d(t)%r.size});return e.oneHot(n,r.size).asType("float32").sum(0)}))}catch(t){return Promise.reject(t)}},r}(h);function v(t,e){for(var r=Array.from(Array(t.length+1),function(){return new Array(e.length+1).fill(0)}),n=1;n<=t.length;n+=1)r[n][0]=n;for(var i=1;i<=e.length;i+=1)r[0][i]=i;for(var o=0;o<e.length;o+=1)for(var s=0;s<t.length;s+=1)r[s+1][o+1]=Math.min(r[s][o+1]+1,r[s+1][o]+1,r[s][o]+(t[s]!==e[o]?1:0));return r[t.length][e.length]/Math.max(t.length,e.length,1)}function y(t,e){for(var r={extract:void 0,score:0},n=0;n<t.length;n+=1){var i=t.substring(n,n+e.length),o={extract:i,score:1-v(i,e)};if(1===o.score)return o;o.score>r.score&&(r=o)}return r}var p=function(t){function r(e,r,n,i){var o;return void 0===r&&(r=[]),void 0===n&&(n=[]),void 0===i&&(i=.75),(o=t.call(this)||this).categoryNames=Object.keys(e),o.categories=e,o.id="Categorical Slot ("+d(JSON.stringify(o.categoryNames))+")",o.dependantActions=r,o.inverselyDependantActions=n,o.threshold=i,o.size=2*o.categoryNames.length,o}o(r,t);var n=r.prototype;return n.init=function(){try{return this.resetDialog(),Promise.resolve()}catch(t){return Promise.reject(t)}},n.featurizeValue=function(t){var r=Object.keys(this.categories);return e.oneHot(r.indexOf(t.category),r.length)},n.handleQuery=function(t){try{var r=this,n={category:void 0,extract:void 0,score:0};Object.entries(r.categories).forEach(function(e){var o=e[0],s=e[1].map(function(e){return y(t.toLowerCase(),e.toLowerCase())}).filter(function(t){return t.score>=r.threshold}).reduce(function(t,e){return t.score>e.score?t:e},{extract:void 0,score:0});s.score>n.score&&(n=i({category:o},s))});var o=e.tidy(function(){return e.concat([r.featurizeValue(n),r.featurizeValue(r.value)])});return void 0!==n.category&&(r.value=n),Promise.resolve(o)}catch(t){return Promise.reject(t)}},n.getActionMask=function(){var t=this;return this.actions.map(function(e){var r=void 0===t.value.extract,n=t.dependantActions.includes(e),i=t.inverselyDependantActions.includes(e);return r&&(i||!n)||!r&&!i})},n.resetDialog=function(){this.value={category:void 0,extract:void 0,score:0}},n.getValue=function(){return this.value},r}(h);t.BOW=m,t.CategoricalSlot=p,t.HCN=l,t.LSTM=n,t.USE=f,t.fuzzyMatch=y,t.hashcode=d,t.parseStories=function(t){var e=[],r=[],n=!0;return t.split("\n").forEach(function(t){var i=/^## *([^#].*)?$/gm.exec(t),o=/^> *(.*)$/gm.exec(t),s=/^- *(\w*)$/gm.exec(t);null!=i&&r.length>0?(r.push({query:"",action:"LUS"}),e.push(r),r=[]):null!=o?(r.length>0&&r.push({query:"",action:"LUS"}),r.push({query:o[1],action:void 0}),n=!1):null!=s&&n?r.push({query:"",action:s[1]}):null==s||n||(r[r.length-1].action=s[1],n=!0)}),r.length>0&&(r.push({query:"",action:"LUS"}),e.push(r)),e}});
//# sourceMappingURL=wisty.umd.js.map
