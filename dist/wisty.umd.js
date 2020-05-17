!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports,require("@tensorflow/tfjs"),require("@tensorflow-models/universal-sentence-encoder")):"function"==typeof define&&define.amd?define(["exports","@tensorflow/tfjs","@tensorflow-models/universal-sentence-encoder"],e):e((t=t||self).wisty={},t.tf,t.use)}(this,function(t,e,n){var r=function(){function t(e,n,r,i){void 0===i&&(i=.2),this.lstmKernel=t.randomVariable([e+n,4*n]),this.lstmBias=t.randomVariable([4*n]),this.lstmForgetBias=t.randomVariable([1],!0),this.lstmInitH=t.randomVariable([1,n]),this.lstmInitC=t.randomVariable([1,n]),this.denseWeights=t.randomVariable([n,r]),this.denseBias=t.randomVariable([r]),this.dropout=i}t.randomVariable=function(t,n){return void 0===n&&(n=!1),e.tidy(function(){var r=e.randomNormal(t);return n&&(r=r.asScalar()),r.variable()})};var n=t.prototype;return n.initLSTM=function(t){return void 0===t&&(t=!0),{c:t?this.lstmInitC.clone():this.lstmInitC,h:t?this.lstmInitH.clone():this.lstmInitH}},n.predict=function(t,n,r,i,o){var s=this;return void 0===o&&(o=1),e.tidy(function(){var u=e.basicLSTMCell(s.lstmForgetBias,s.lstmKernel,s.lstmBias,e.stack([t]),r,n),a=u[0],c=u[1],l=e.dropout(c,s.dropout).matMul(s.denseWeights).add(s.denseBias).squeeze().div(o).softmax().mul(null!=i?i:1);return{y:l=l.div(e.sum(l)),nc:a,nh:c}})},n.load=function(t){var n=this;e.tidy(function(){n.lstmKernel=e.tensor(t.lstmKernel).variable(),n.lstmBias=e.tensor(t.lstmBias).variable(),n.lstmForgetBias=e.tensor(t.lstmForgetBias).variable(),n.lstmInitH=e.tensor(t.lstmInitH).variable(),n.lstmInitC=e.tensor(t.lstmInitC).variable(),n.denseWeights=e.tensor(t.denseWeights).variable(),n.denseBias=e.tensor(t.denseBias).variable()})},n.export=function(){try{var t=this;return Promise.resolve(t.lstmKernel.array()).then(function(e){return Promise.resolve(t.lstmBias.array()).then(function(n){return Promise.resolve(t.lstmForgetBias.array()).then(function(r){return Promise.resolve(t.lstmInitH.array()).then(function(i){return Promise.resolve(t.lstmInitC.array()).then(function(o){return Promise.resolve(t.denseWeights.array()).then(function(s){return Promise.resolve(t.denseBias.array()).then(function(t){return{lstmKernel:e,lstmBias:n,lstmForgetBias:r,lstmInitH:i,lstmInitC:o,denseWeights:s,denseBias:t}})})})})})})})}catch(t){return Promise.reject(t)}},t}();const i=function(){function t(){}return t.prototype.then=function(e,n){const r=new t,i=this.s;if(i){const t=1&i?e:n;if(t){try{o(r,1,t(this.v))}catch(t){o(r,2,t)}return r}return this}return this.o=function(t){try{const i=t.v;1&t.s?o(r,1,e?e(i):i):n?o(r,1,n(i)):o(r,2,i)}catch(t){o(r,2,t)}},r},t}();function o(t,e,n){if(!t.s){if(n instanceof i){if(!n.s)return void(n.o=o.bind(null,t,e));1&e&&(e=n.s),n=n.v}if(n&&n.then)return void n.then(o.bind(null,t,e),o.bind(null,t,2));t.s=e,t.v=n;const r=t.o;r&&r(t)}}function s(t){return t instanceof i&&1&t.s}function u(t,e,n){for(var r;;){var u=t();if(s(u)&&(u=u.v),!u)return a;if(u.then){r=0;break}var a=n();if(a&&a.then){if(!s(a)){r=1;break}a=a.s}if(e){var c=e();if(c&&c.then&&!s(c)){r=2;break}}}var l=new i,h=o.bind(null,l,2);return(0===r?u.then(d):1===r?a.then(f):c.then(v)).then(void 0,h),l;function f(r){a=r;do{if(e&&(c=e())&&c.then&&!s(c))return void c.then(v).then(void 0,h);if(!(u=t())||s(u)&&!u.v)return void o(l,1,a);if(u.then)return void u.then(d).then(void 0,h);s(a=n())&&(a=a.v)}while(!a||!a.then);a.then(f).then(void 0,h)}function d(t){t?(a=n())&&a.then?a.then(f).then(void 0,h):f(a):o(l,1,a)}function v(){(u=t())?u.then?u.then(d).then(void 0,h):d(u):o(l,1,a)}}"undefined"!=typeof Symbol&&(Symbol.iterator||(Symbol.iterator=Symbol("Symbol.iterator"))),"undefined"!=typeof Symbol&&(Symbol.asyncIterator||(Symbol.asyncIterator=Symbol("Symbol.asyncIterator")));var a=function(){function t(t,n,r,i,o){void 0===r&&(r=128),void 0===i&&(i=e.train.adam(.01)),void 0===o&&(o=.2),this.actions=t,this.featurizers=n,this.optimizer=i,this.hiddenSize=r,this.outputSize=t.length,this.lstmDropout=o}var n=t.prototype;return n.init=function(){try{var t=this;return Promise.resolve(Promise.all(t.featurizers.map(function(e){return e.init(t.actions)}))).then(function(){t.inputSize=t.featurizers.map(function(t){return t.size}).reduce(function(t,e){return t+e},1),t.lstm=new r(t.inputSize,t.hiddenSize,t.outputSize,t.lstmDropout),t.resetDialog()})}catch(t){return Promise.reject(t)}},n.resetDialog=function(){this.featurizers.forEach(function(t){return t.resetDialog()});var t=this.lstm.initLSTM();this.lstmC=t.c,this.lstmH=t.h},n.handleQuery=function(t){try{return Promise.all(this.featurizers.map(function(e){return e.handleQuery(t)}))}catch(t){return Promise.reject(t)}},n.getOptimizableFeatures=function(t){var n=this;return e.tidy(function(){var r=n.featurizers.map(function(e,n){return e.getOptimizableFeatures(t[n])});return r.push(e.zeros([1])),e.concat(r)})},n.handleAction=function(t){this.featurizers.map(function(e){return e.handleAction(t)})},n.getActionMask=function(){var t=this;return e.tidy(function(){return t.featurizers.map(function(t){return e.tensor(t.getActionMask(),void 0,"float32")}).reduce(function(t,n){return e.mul(t,n)},e.ones([t.actions.length]))})},n.fitStory=function(t){try{var n=function(){var t;return r.optimizer.minimize(function(){var n=r.lstm.initLSTM(!1),u=n.c,a=n.h,c=i.map(function(t,e){var n=r.lstm.predict(r.getOptimizableFeatures(t),u,a,o[e]);return u=n.nc,a=n.nh,n.y}),l=e.stack(s),h=e.stack(c),f=e.metrics.categoricalCrossentropy(l,h).mean();return t={targets:e.keep(l.argMax(1)),predictions:e.keep(h.argMax(1)),loss:f.arraySync(),isFailing:e.metrics.categoricalAccuracy(l,h).mean().arraySync()<.999},f}),e.dispose([i,s]),t},r=this;r.resetDialog();var i=[],o=[],s=[],a=0,c=u(function(){return a<t.length},function(){return!!(a+=1)},function(){var n=t[a],u=i.push;return Promise.resolve(r.handleQuery(n.query)).then(function(t){u.call(i,t),o.push(r.getActionMask()),s.push(e.oneHot(r.actions.indexOf(n.action),r.outputSize)),r.handleAction(n.action)})});return Promise.resolve(c&&c.then?c.then(n):n())}catch(t){return Promise.reject(t)}},n.train=function(t,n,r){void 0===n&&(n=12);try{var i,o=function(){return s.resetDialog(),i},s=this,a=0,c=u(function(){return a<n},function(){return!!(a+=1)},function(){function n(){var t=e.tidy(function(){return e.math.confusionMatrix(e.concat(o),e.concat(c),s.outputSize)}),n=e.tidy(function(){return t.mul(e.eye.apply(e,t.shape)).sum(0)});i={epoch:a,failingSamples:h,accuracy:e.tidy(function(){return n.sum().div(t.sum()).arraySync()}),recall:e.tidy(function(){return n.div(t.sum(1)).mean().arraySync()}),precision:e.tidy(function(){return n.div(t.sum(0)).mean().arraySync()}),loss:l.reduce(function(t,e){return t+e})/l.length},e.dispose(o),e.dispose(c),e.dispose([n,t]),void 0!==r&&r(i)}var o=[],c=[],l=[],h=[],f=0,d=u(function(){return f<t.length},function(){return!!(f+=1)},function(){return Promise.resolve(s.fitStory(t[f])).then(function(t){o.push(t.targets),c.push(t.predictions),l.push(t.loss),t.isFailing&&h.push(f)})});return d&&d.then?d.then(n):n()});return Promise.resolve(c&&c.then?c.then(o):o())}catch(t){return Promise.reject(t)}},n.predict=function(t,n,r){void 0===n&&(n=1),void 0===r&&(r=1);try{var i=this;i.lstm.dropout=1===n?0:i.lstmDropout;var o=i.getOptimizableFeatures;return Promise.resolve(i.handleQuery(t)).then(function(t){for(var s,u=o.call(i,t),a=i.getActionMask(),c=[],l=0;l<n;l+=1)e.dispose(s),s=i.lstm.predict(u,i.lstmC,i.lstmH,a,r),c.push(s.y);e.dispose([i.lstmC,i.lstmH]),i.lstmC=s.nc.clone(),i.lstmH=s.nh.clone();var h=e.tidy(function(){return e.moments(e.stack(c),0)}),f=h.mean,d=h.variance,v=e.tidy(function(){return f.argMax().arraySync()}),m=e.tidy(function(){return f.sub(d.sqrt()).arraySync()[v]});return e.dispose([u,a,f,d]),e.dispose(s),e.dispose(c),i.handleAction(i.actions[v]),{action:i.actions[v],confidence:m}})}catch(t){return Promise.reject(t)}},n.score=function(t,n,r){void 0===n&&(n=1),void 0===r&&(r=1);try{var i=function(){var t=e.tidy(function(){return e.math.confusionMatrix(e.tensor(s),e.tensor(a),o.outputSize)}),n=e.tidy(function(){return t.mul(e.eye.apply(e,t.shape)).sum(0)}),r={failingSamples:l,accuracy:e.tidy(function(){return n.sum().div(t.sum()).arraySync()}),recall:e.tidy(function(){return n.div(t.sum(1)).mean().arraySync()}),precision:e.tidy(function(){return n.div(t.sum(0)).mean().arraySync()}),averageConfidence:c.reduce(function(t,e){return t+e})/c.length};return e.dispose([n,t]),o.resetDialog(),r},o=this,s=[],a=[],c=[],l=[],h=0,f=u(function(){return h<t.length},function(){return!!(h+=1)},function(){o.resetDialog();var e=0,i=u(function(){return e<t[h].length},function(){return!!(e+=1)},function(){var i=t[h][e];return Promise.resolve(o.predict(i.query,n,r)).then(function(t){var e=t.action,n=t.confidence;s.push(o.actions.indexOf(i.action)),a.push(o.actions.indexOf(e)),c.push(n),e===i.action||l.includes(h)||l.push(h)})});if(i&&i.then)return i.then(function(){})});return Promise.resolve(f&&f.then?f.then(i):i())}catch(t){return Promise.reject(t)}},n.load=function(t){var e=JSON.parse(t);this.featurizers.forEach(function(t){t.load(e[t.id])}),this.lstm.load(e.lstm),this.resetDialog()},n.export=function(){try{var t=this;return Promise.resolve(t.lstm.export()).then(function(e){function n(){return JSON.stringify(r)}var r={lstm:e},i=0,o=u(function(){return i<t.featurizers.length},function(){return!!(i+=1)},function(){var e=t.featurizers[i];return Promise.resolve(e.export()).then(function(t){r[e.id]=t})});return o&&o.then?o.then(n):n()})}catch(t){return Promise.reject(t)}},t}();function c(){return(c=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t}).apply(this,arguments)}function l(t,e){t.prototype=Object.create(e.prototype),t.prototype.constructor=t,t.__proto__=e}var h=function(){function t(){}var e=t.prototype;return e.init=function(t){try{return this.actions=t,Promise.resolve()}catch(t){return Promise.reject(t)}},e.getOptimizableFeatures=function(t){return t},e.handleAction=function(t){},e.getActionMask=function(){return this.actions.map(function(){return!0})},e.resetDialog=function(){},e.load=function(t){},e.export=function(){return Promise.resolve({})},t}(),f=function(t){function r(){var e;return(e=t.apply(this,arguments)||this).id="Universal Sentence Encoder",e.size=512,e}l(r,t);var i=r.prototype;return i.init=function(e){try{var r=this;return Promise.resolve(t.prototype.init.call(r,e)).then(function(){return Promise.resolve(n.load()).then(function(t){return r.encoder=t,Promise.resolve(r.encodeQuery("")).then(function(t){r.emptyEncoding=t})})})}catch(t){return Promise.reject(t)}},i.encodeQuery=function(t){try{return Promise.resolve(this.encoder.embed([t])).then(function(t){var n=t.squeeze();return e.dispose(t),n})}catch(t){return Promise.reject(t)}},i.handleQuery=function(t){try{return Promise.resolve(t?this.encodeQuery(t):this.emptyEncoding.clone())}catch(t){return Promise.reject(t)}},r}(h);function d(t){for(var e=0,n=0;n<t.length;n+=1)e=(e<<5)-e+t.charCodeAt(n),e|=0;return e}var v=function(t){function n(e){var n;return(n=t.call(this)||this).id="Bag-of-Words",n.size=e,n}return l(n,t),n.prototype.handleQuery=function(t){try{var n=this;return Promise.resolve(e.tidy(function(){var r=t.toLowerCase().split(/\W/g).map(function(t){return d(t)%n.size});return e.oneHot(r,n.size).asType("float32").sum(0)}))}catch(t){return Promise.reject(t)}},n}(h);function m(t,e){for(var n=Array.from(Array(t.length+1),function(){return new Array(e.length+1).fill(0)}),r=1;r<=t.length;r+=1)n[r][0]=r;for(var i=1;i<=e.length;i+=1)n[0][i]=i;for(var o=0;o<e.length;o+=1)for(var s=0;s<t.length;s+=1)n[s+1][o+1]=Math.min(n[s][o+1]+1,n[s+1][o]+1,n[s][o]+(t[s]!==e[o]?1:0));return n[t.length][e.length]/Math.max(t.length,e.length,1)}var y=function(t){function n(e,n){var r;return(r=t.call(this)||this).id="Word Embedding",r.size=2*n,r.loaderFunction=e,r}l(n,t);var r=n.prototype;return r.init=function(e){try{var n=this;return Promise.resolve(t.prototype.init.call(n,e)).then(function(){return Promise.resolve(n.loaderFunction()).then(function(t){n.vectors=JSON.parse(t)})})}catch(t){return Promise.reject(t)}},r.handleQuery=function(t){try{var n=this;return Promise.resolve(e.tidy(function(){var r=t.toLowerCase().split(/\W/g).filter(function(t){return t.length>0}),i=[];if(r.forEach(function(t){if(Object.keys(n.vectors).includes(t))i.push(e.tensor(n.vectors[t]));else{var r,o=Infinity;Object.keys(n.vectors).forEach(function(e){var n=m(e,t);n<o&&(r=e,o=n)}),o<.5&&i.push(e.tensor(n.vectors[r]))}}),0===i.length)return e.zeros([n.size]);var o=e.stack(i);return e.concat([o.mean(0),o.max(0)])}))}catch(t){return Promise.reject(t)}},n}(h);function p(t,e){for(var n={extract:void 0,score:0},r=0;r<t.length;r+=1){var i=t.substring(r,r+e.length),o={extract:i,score:1-m(i,e)};if(1===o.score)return o;o.score>n.score&&(n=o)}return n}var g=function(t){function n(e,n,r,i){var o;return void 0===n&&(n=[]),void 0===r&&(r=[]),void 0===i&&(i=.75),(o=t.call(this)||this).categoryNames=Object.keys(e),o.categories=e,o.id="Categorical Slot ("+d(JSON.stringify(o.categoryNames))+")",o.dependantActions=n,o.inverselyDependantActions=r,o.threshold=i,o.size=2*o.categoryNames.length,o}l(n,t);var r=n.prototype;return r.init=function(e){try{var n=this;return Promise.resolve(t.prototype.init.call(n,e)).then(function(){n.resetDialog()})}catch(t){return Promise.reject(t)}},r.featurizeValue=function(t){var n=Object.keys(this.categories);return e.oneHot(n.indexOf(t.category),n.length)},r.handleQuery=function(t){try{var n=this,r={category:void 0,extract:void 0,score:0};Object.entries(n.categories).forEach(function(e){var i=e[0],o=e[1].map(function(e){return p(t.toLowerCase(),e.toLowerCase())}).filter(function(t){return t.score>=n.threshold}).reduce(function(t,e){return t.score>e.score?t:e},{extract:void 0,score:0});o.score>r.score&&(r=c({category:i},o))});var i=e.tidy(function(){return e.concat([n.featurizeValue(r),n.featurizeValue(n.value)])});return void 0!==r.category&&(n.value=r),Promise.resolve(i)}catch(t){return Promise.reject(t)}},r.getActionMask=function(){var t=this;return this.actions.map(function(e){var n=void 0===t.value.extract,r=t.dependantActions.includes(e),i=t.inverselyDependantActions.includes(e);return n&&(i||!r)||!n&&!i})},r.resetDialog=function(){this.value={category:void 0,extract:void 0,score:0}},r.getValue=function(){return this.value},n}(h);t.ActionFeaturizer=function(t){function n(e,n,r){var i;return void 0===e&&(e=!0),void 0===n&&(n=!0),void 0===r&&(r="LUS"),(i=t.call(this)||this).id="Action Featurizer",i.maskLUS=e,i.maskPreviousAction=n,i.LUSAction=r,i.resetDialog(),i}l(n,t);var r=n.prototype;return r.init=function(e){try{var n=this;return Promise.resolve(t.prototype.init.call(n,e)).then(function(){n.size=e.length})}catch(t){return Promise.reject(t)}},r.handleQuery=function(t){try{var n=this;return Promise.resolve(e.tidy(function(){return n.userTalked=""!==t,e.oneHot([n.actions.indexOf(n.previousAction)],n.actions.length).squeeze()}))}catch(t){return Promise.reject(t)}},r.handleAction=function(t){this.previousAction=t!==this.LUSAction?t:this.previousAction},r.getActionMask=function(){var e=t.prototype.getActionMask.call(this);return this.maskLUS&&this.userTalked&&(e[this.actions.indexOf(this.LUSAction)]=!1),this.maskPreviousAction&&this.actions.includes(this.previousAction)&&(e[this.actions.indexOf(this.previousAction)]=!1),e},r.resetDialog=function(){this.userTalked=!1,this.previousAction=void 0},n}(h),t.BOW=v,t.CategoricalSlot=g,t.Featurizer=h,t.HCN=a,t.LSTM=r,t.USE=f,t.WordEmbedding=y,t.fuzzyMatch=p,t.hashcode=d,t.parseStories=function(t){var e=[],n=[],r=!0;return t.split("\n").forEach(function(t){var i=/^## *([^#].*)?$/gm.exec(t),o=/^> *(.*)$/gm.exec(t),s=/^- *(\w*)$/gm.exec(t);null!=i&&n.length>0?(n.push({query:"",action:"LUS"}),e.push(n),n=[]):null!=o?(n.length>0&&n.push({query:"",action:"LUS"}),n.push({query:o[1],action:void 0}),r=!1):null!=s&&r?n.push({query:"",action:s[1]}):null==s||r||(n[n.length-1].action=s[1],r=!0)}),n.length>0&&(n.push({query:"",action:"LUS"}),e.push(n)),e}});
//# sourceMappingURL=wisty.umd.js.map
