var t=require("@tensorflow/tfjs"),e=require("@tensorflow-models/universal-sentence-encoder"),n=function(){function e(n,r,i,o,s){void 0===o&&(o=t.train.adam()),void 0===s&&(s=.2),this.lstmKernel=e.randomVariable([n+r,4*r]),this.lstmBias=e.randomVariable([4*r]),this.lstmForgetBias=e.randomVariable([1],!0),this.lstmInitH=e.randomVariable([1,r]),this.lstmInitC=e.randomVariable([1,r]),this.denseWeights=e.randomVariable([r,i]),this.denseBias=e.randomVariable([i]),this.optimizer=o,this.dropout=s}e.randomVariable=function(e,n){return void 0===n&&(n=!1),t.tidy(function(){var r=t.randomNormal(e);return n&&(r=r.asScalar()),r.variable()})};var n=e.prototype;return n.initLSTM=function(){return{c:this.lstmInitC.clone(),h:this.lstmInitH.clone()}},n.predict=function(e,n,r,i){var o=this;return t.tidy(function(){var s=t.basicLSTMCell(o.lstmForgetBias,o.lstmKernel,o.lstmBias,t.stack([e]),r,n),a=s[0],c=s[1];return{y:t.dropout(c,o.dropout).matMul(o.denseWeights).add(o.denseBias).squeeze().mul(null!=i?i:1),nc:a,nh:c}})},n.fitSequence=function(e,n,r){var i,o,s=this;return this.optimizer.minimize(function(){var a=s.lstmInitC,c=s.lstmInitH,u=e.unstack(),l=null==r?void 0:r.unstack(),h=t.stack(u.map(function(t,e){var n=s.predict(t,a,c,null==l?void 0:l[e]);return a=n.nc,c=n.nh,n.y})),f=t.losses.softmaxCrossEntropy(n,h);return i=f.arraySync(),o=t.metrics.categoricalAccuracy(n,h).mean().arraySync(),f}),{loss:i,accuracy:o}},n.setWeights=function(t){var e=this;Object.entries(t).forEach(function(t){var n=t[1];switch(t[0]){case"lstmKernel":e.lstmKernel=n;break;case"lstmBias":e.lstmBias=n;break;case"lstmForgetBias":e.lstmForgetBias=n;break;case"lstmInitH":e.lstmInitH=n;break;case"lstmInitC":e.lstmInitC=n;break;case"denseWeights":e.denseWeights=n;break;case"denseBias":e.denseBias=n}})},n.getWeights=function(){return{lstmKernel:this.lstmKernel.clone(),lstmBias:this.lstmBias.clone(),lstmForgetBias:this.lstmForgetBias.clone(),lstmInitH:this.lstmInitH.clone(),lstmInitC:this.lstmInitC.clone(),denseWeights:this.denseWeights.clone(),denseBias:this.denseBias.clone()}},e}();function r(){return(r=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t}).apply(this,arguments)}const i=function(){function t(){}return t.prototype.then=function(e,n){const r=new t,i=this.s;if(i){const t=1&i?e:n;if(t){try{o(r,1,t(this.v))}catch(t){o(r,2,t)}return r}return this}return this.o=function(t){try{const i=t.v;1&t.s?o(r,1,e?e(i):i):n?o(r,1,n(i)):o(r,2,i)}catch(t){o(r,2,t)}},r},t}();function o(t,e,n){if(!t.s){if(n instanceof i){if(!n.s)return void(n.o=o.bind(null,t,e));1&e&&(e=n.s),n=n.v}if(n&&n.then)return void n.then(o.bind(null,t,e),o.bind(null,t,2));t.s=e,t.v=n;const r=t.o;r&&r(t)}}function s(t){return t instanceof i&&1&t.s}function a(t,e,n){for(var r;;){var a=t();if(s(a)&&(a=a.v),!a)return c;if(a.then){r=0;break}var c=n();if(c&&c.then){if(!s(c)){r=1;break}c=c.s}if(e){var u=e();if(u&&u.then&&!s(u)){r=2;break}}}var l=new i,h=o.bind(null,l,2);return(0===r?a.then(d):1===r?c.then(f):u.then(m)).then(void 0,h),l;function f(r){c=r;do{if(e&&(u=e())&&u.then&&!s(u))return void u.then(m).then(void 0,h);if(!(a=t())||s(a)&&!a.v)return void o(l,1,c);if(a.then)return void a.then(d).then(void 0,h);s(c=n())&&(c=c.v)}while(!c||!c.then);c.then(f).then(void 0,h)}function d(t){t?(c=n())&&c.then?c.then(f).then(void 0,h):f(c):o(l,1,c)}function m(){(a=t())?a.then?a.then(d).then(void 0,h):d(a):o(l,1,c)}}"undefined"!=typeof Symbol&&(Symbol.iterator||(Symbol.iterator=Symbol("Symbol.iterator"))),"undefined"!=typeof Symbol&&(Symbol.asyncIterator||(Symbol.asyncIterator=Symbol("Symbol.asyncIterator")));var c=function(){function e(e,r,i,o,s){void 0===i&&(i=128),void 0===o&&(o=t.train.adam(.01)),void 0===s&&(s=.2),this.actions=e,this.featurizers=r,this.inputSize=r.map(function(t){return t.size}).reduce(function(t,e){return t+e},1),this.outputSize=e.length,this.lstm=new n(this.inputSize,i,this.outputSize,o,s),this.lstmDropout=s,this.resetDialog()}var i=e.prototype;return i.resetDialog=function(){this.featurizers.forEach(function(t){return t.resetDialog()});var t=this.lstm.initLSTM();this.lstmC=t.c,this.lstmH=t.h},i.featurize=function(e){try{return Promise.resolve(Promise.all(this.featurizers.map(function(t){return t.handleQuery(e)}))).then(function(e){e.push(t.zeros([1]));var n=t.concat(e);return t.dispose(e),n})}catch(t){return Promise.reject(t)}},i.getMasks=function(){var e=this;return t.tidy(function(){return e.featurizers.filter(function(t){return void 0!==t.getActionMask}).map(function(n){return t.tensor(n.getActionMask(e.actions),void 0,"float32")}).reduce(function(e,n){return t.mul(e,n)},t.ones([e.actions.length]))})},i.fitStory=function(e,n){try{var i=function(){var e=r({epoch:n},t.tidy(function(){return o.lstm.fitSequence(t.stack(s),t.stack(u),t.stack(c))}));return t.dispose([s,u]),e},o=this;o.resetDialog();var s=[],c=[],u=[],l=0,h=a(function(){return l<e.length},function(){return!!(l+=1)},function(){var n=e[l],r=s.push;return Promise.resolve(o.featurize(n.query)).then(function(e){r.call(s,e),c.push(o.getMasks()),u.push(t.oneHot(o.actions.indexOf(n.action),o.outputSize))})});return Promise.resolve(h&&h.then?h.then(i):i())}catch(t){return Promise.reject(t)}},i.train=function(t,e,n){void 0===e&&(e=12);try{var r=function(){return i.resetDialog(),o},i=this,o=[],s=0,c=a(function(){return s<e},function(){return!!(s+=1)},function(){var e=[];return t.forEach(function(t){e.push(i.fitStory(t,s))}),Promise.resolve(Promise.all(e)).then(function(t){e=t,void 0!==n&&n(e),o.push.apply(o,e)})});return Promise.resolve(c&&c.then?c.then(r):r())}catch(t){return Promise.reject(t)}},i.predict=function(e,n,r){void 0===n&&(n=10),void 0===r&&(r=1);try{var i=this;return i.lstm.dropout=1===n?0:i.lstmDropout,Promise.resolve(i.featurize(e)).then(function(e){for(var o,s=i.getMasks(),a=[],c=0;c<n;c+=1)t.dispose(o),o=i.lstm.predict(e,i.lstmC,i.lstmH,s),a.push(t.tidy(function(){return o.y.div(r).softmax()}));t.dispose([i.lstmC,i.lstmH]),i.lstmC=o.nc.clone(),i.lstmH=o.nh.clone();var u=t.tidy(function(){return t.moments(t.stack(a),0)}),l=u.mean,h=u.variance,f=t.tidy(function(){return l.argMax().arraySync()}),d=1-t.tidy(function(){return h.sqrt().arraySync()[f]});return t.dispose([e,s,l,h]),t.dispose(o),t.dispose(a),{action:i.actions[f],confidence:d}})}catch(t){return Promise.reject(t)}},i.load=function(e){var n=this;t.tidy(function(){var r=JSON.parse(e);Object.entries(r).forEach(function(e){r[e[0]]=t.tensor(e[1]).variable()}),n.lstm.setWeights(r)})},i.export=function(){var e=this;return t.tidy(function(){var t={};return Object.entries(e.lstm.getWeights()).forEach(function(e){t[e[0]]=e[1].arraySync()}),JSON.stringify(t)})},e}(),u=function(){function n(){this.size=512}var r=n.prototype;return r.init=function(){try{var t=this;return Promise.resolve(e.load()).then(function(e){return t.encoder=e,Promise.resolve(t.encodeQuery("")).then(function(e){t.emptyEncoding=e})})}catch(t){return Promise.reject(t)}},r.encodeQuery=function(e){try{return Promise.resolve(this.encoder.embed([e])).then(function(e){var n=e.squeeze();return t.dispose(e),n})}catch(t){return Promise.reject(t)}},r.handleQuery=function(t){try{return Promise.resolve(t?this.encodeQuery(t):this.emptyEncoding.clone())}catch(t){return Promise.reject(t)}},r.resetDialog=function(){},n}();function l(t){for(var e=0,n=0;n<t.length;n+=1)e=(e<<5)-e+t.charCodeAt(n),e|=0;return e}var h=function(){function e(t){this.size=t}var n=e.prototype;return n.handleQuery=function(e){try{var n=this;return Promise.resolve(t.tidy(function(){var r=e.split(" ").map(function(t){return l(t)%n.size});return t.oneHot(r,n.size).asType("float32").sum(0)}))}catch(t){return Promise.reject(t)}},n.resetDialog=function(){},e}();function f(t,e){for(var n=Array.from(Array(t.length+1),function(){return new Array(e.length+1).fill(0)}),r=1;r<=t.length;r+=1)n[r][0]=r;for(var i=1;i<=e.length;i+=1)n[0][i]=i;for(var o=0;o<e.length;o+=1)for(var s=0;s<t.length;s+=1)n[s+1][o+1]=Math.min(n[s][o+1]+1,n[s+1][o]+1,n[s][o]+(t[s]!==e[o]?1:0));return n[t.length][e.length]/Math.max(t.length,e.length,1)}function d(t,e){for(var n={extract:void 0,score:0},r=0;r<t.length;r+=1){var i=t.substring(r,r+e.length),o={extract:i,score:1-f(i,e)};if(1===o.score)return o;o.score>n.score&&(n=o)}return n}var m=function(){function e(t,e,n,r){void 0===e&&(e=[]),void 0===n&&(n=[]),void 0===r&&(r=.75),this.categoryNames=Object.keys(t),this.categories=t,this.dependantActions=e,this.inverselyDependantActions=n,this.threshold=r,this.size=2*this.categoryNames.length,this.resetDialog()}var n=e.prototype;return n.featurizeValue=function(e){var n=Object.keys(this.categories);return t.oneHot(n.indexOf(e.category),n.length)},n.handleQuery=function(e){try{var n=this,i={category:void 0,extract:void 0,score:0};Object.entries(n.categories).forEach(function(t){var o=t[0],s=t[1].map(function(t){return d(e.toLowerCase(),t.toLowerCase())}).filter(function(t){return t.score>=n.threshold}).reduce(function(t,e){return t.score>e.score?t:e},{extract:void 0,score:0});s.score>i.score&&(i=r({category:o},s))});var o=t.tidy(function(){return t.concat([n.featurizeValue(i),n.featurizeValue(n.value)])});return void 0!==i.category&&(n.value=i),Promise.resolve(o)}catch(t){return Promise.reject(t)}},n.getActionMask=function(t){var e=this;return t.map(function(t){var n=void 0===e.value.extract,r=e.dependantActions.includes(t),i=e.inverselyDependantActions.includes(t);return n&&(i||!r)||!n&&!i})},n.resetDialog=function(){this.value={category:void 0,extract:void 0,score:0}},n.getValue=function(){return this.value},e}();exports.BOW=h,exports.CategoricalSlot=m,exports.HCN=c,exports.LSTM=n,exports.USE=u,exports.fuzzyMatch=d,exports.hashcode=l,exports.parseStories=function(t){var e=[],n=[],r=!0;return t.split("\n").forEach(function(t){var i=/^## *([^#].*)?$/gm.exec(t),o=/^> *(.*)$/gm.exec(t),s=/^- *(\w*)$/gm.exec(t);null!=i&&n.length>0?(n.push({query:"",action:"LUS"}),e.push(n),n=[]):null!=o?(n.length>0&&n.push({query:"",action:"LUS"}),n.push({query:o[1],action:void 0}),r=!1):null!=s&&r?n.push({query:"",action:s[1]}):null==s||r||(n[n.length-1].action=s[1],r=!0)}),n.length>0&&(n.push({query:"",action:"LUS"}),e.push(n)),e};
//# sourceMappingURL=wisty.js.map
