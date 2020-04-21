!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports,require("@tensorflow/tfjs"),require("@tensorflow-models/universal-sentence-encoder")):"function"==typeof define&&define.amd?define(["exports","@tensorflow/tfjs","@tensorflow-models/universal-sentence-encoder"],e):e((t=t||self).wisty={},t.tf,t.use)}(this,function(t,e,n){var r=function(){function t(n,r,i,o,s){void 0===o&&(o=e.train.adam()),void 0===s&&(s=.2),this.lstmKernel=t.randomVariable([n+r,4*r]),this.lstmBias=t.randomVariable([4*r]),this.lstmForgetBias=t.randomVariable([1],!0),this.lstmInitH=t.randomVariable([1,r]),this.lstmInitC=t.randomVariable([1,r]),this.denseWeights=t.randomVariable([r,i]),this.denseBias=t.randomVariable([i]),this.optimizer=o,this.dropout=s}t.randomVariable=function(t,n){return void 0===n&&(n=!1),e.tidy(function(){var r=e.randomNormal(t);return n&&(r=r.asScalar()),r.variable()})};var n=t.prototype;return n.initLSTM=function(){return{c:this.lstmInitC.clone(),h:this.lstmInitH.clone()}},n.predict=function(t,n,r,i){var o=this;return e.tidy(function(){var s=e.basicLSTMCell(o.lstmForgetBias,o.lstmKernel,o.lstmBias,e.stack([t]),r,n),a=s[0],u=s[1];return{y:e.dropout(u,o.dropout).matMul(o.denseWeights).add(o.denseBias).squeeze().mul(null!=i?i:1),nc:a,nh:u}})},n.fitSequence=function(t,n,r){var i,o,s=this;return this.optimizer.minimize(function(){var a=s.lstmInitC,u=s.lstmInitH,c=t.unstack(),l=null==r?void 0:r.unstack(),h=e.stack(c.map(function(t,e){var n=s.predict(t,a,u,null==l?void 0:l[e]);return a=n.nc,u=n.nh,n.y})),f=e.losses.softmaxCrossEntropy(n,h);return i=f.arraySync(),o=e.metrics.categoricalAccuracy(n,h).mean().arraySync(),f}),{loss:i,accuracy:o}},n.setWeights=function(t){var e=this;Object.entries(t).forEach(function(t){var n=t[1];switch(t[0]){case"lstmKernel":e.lstmKernel=n;break;case"lstmBias":e.lstmBias=n;break;case"lstmForgetBias":e.lstmForgetBias=n;break;case"lstmInitH":e.lstmInitH=n;break;case"lstmInitC":e.lstmInitC=n;break;case"denseWeights":e.denseWeights=n;break;case"denseBias":e.denseBias=n}})},n.getWeights=function(){return{lstmKernel:this.lstmKernel.clone(),lstmBias:this.lstmBias.clone(),lstmForgetBias:this.lstmForgetBias.clone(),lstmInitH:this.lstmInitH.clone(),lstmInitC:this.lstmInitC.clone(),denseWeights:this.denseWeights.clone(),denseBias:this.denseBias.clone()}},t}();function i(){return(i=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t}).apply(this,arguments)}const o=function(){function t(){}return t.prototype.then=function(e,n){const r=new t,i=this.s;if(i){const t=1&i?e:n;if(t){try{s(r,1,t(this.v))}catch(t){s(r,2,t)}return r}return this}return this.o=function(t){try{const i=t.v;1&t.s?s(r,1,e?e(i):i):n?s(r,1,n(i)):s(r,2,i)}catch(t){s(r,2,t)}},r},t}();function s(t,e,n){if(!t.s){if(n instanceof o){if(!n.s)return void(n.o=s.bind(null,t,e));1&e&&(e=n.s),n=n.v}if(n&&n.then)return void n.then(s.bind(null,t,e),s.bind(null,t,2));t.s=e,t.v=n;const r=t.o;r&&r(t)}}function a(t){return t instanceof o&&1&t.s}function u(t,e,n){for(var r;;){var i=t();if(a(i)&&(i=i.v),!i)return u;if(i.then){r=0;break}var u=n();if(u&&u.then){if(!a(u)){r=1;break}u=u.s}if(e){var c=e();if(c&&c.then&&!a(c)){r=2;break}}}var l=new o,h=s.bind(null,l,2);return(0===r?i.then(m):1===r?u.then(f):c.then(d)).then(void 0,h),l;function f(r){u=r;do{if(e&&(c=e())&&c.then&&!a(c))return void c.then(d).then(void 0,h);if(!(i=t())||a(i)&&!i.v)return void s(l,1,u);if(i.then)return void i.then(m).then(void 0,h);a(u=n())&&(u=u.v)}while(!u||!u.then);u.then(f).then(void 0,h)}function m(t){t?(u=n())&&u.then?u.then(f).then(void 0,h):f(u):s(l,1,u)}function d(){(i=t())?i.then?i.then(m).then(void 0,h):m(i):s(l,1,u)}}"undefined"!=typeof Symbol&&(Symbol.iterator||(Symbol.iterator=Symbol("Symbol.iterator"))),"undefined"!=typeof Symbol&&(Symbol.asyncIterator||(Symbol.asyncIterator=Symbol("Symbol.asyncIterator")));var c=function(){function t(t,n,i,o,s){void 0===i&&(i=128),void 0===o&&(o=e.train.adam(.01)),void 0===s&&(s=.2),this.actions=t,this.featurizers=n,this.inputSize=n.map(function(t){return t.size}).reduce(function(t,e){return t+e},1),this.outputSize=t.length,this.lstm=new r(this.inputSize,i,this.outputSize,o,s),this.lstmDropout=s,this.resetDialog()}var n=t.prototype;return n.resetDialog=function(){this.featurizers.forEach(function(t){return t.resetDialog()});var t=this.lstm.initLSTM();this.lstmC=t.c,this.lstmH=t.h},n.featurize=function(t){try{return Promise.resolve(Promise.all(this.featurizers.map(function(e){return e.handleQuery(t)}))).then(function(t){t.push(e.zeros([1]));var n=e.concat(t);return e.dispose(t),n})}catch(t){return Promise.reject(t)}},n.fitStory=function(t,n){try{var r=function(){var t=i({epoch:n},e.tidy(function(){return o.lstm.fitSequence(e.stack(s),e.stack(a))}));return e.dispose([s,a]),t},o=this;o.resetDialog();var s=[],a=[],c=0,l=u(function(){return c<t.length},function(){return!!(c+=1)},function(){var n=t[c],r=s.push;return Promise.resolve(o.featurize(n.query)).then(function(t){r.call(s,t),a.push(e.oneHot(o.actions.indexOf(n.action),o.outputSize))})});return Promise.resolve(l&&l.then?l.then(r):r())}catch(t){return Promise.reject(t)}},n.train=function(t,e,n){void 0===e&&(e=12);try{var r=function(){return i.resetDialog(),o},i=this,o=[],s=0,a=u(function(){return s<e},function(){return!!(s+=1)},function(){var e=[];return t.forEach(function(t){e.push(i.fitStory(t,s))}),Promise.resolve(Promise.all(e)).then(function(t){e=t,void 0!==n&&n(e),o.push.apply(o,e)})});return Promise.resolve(a&&a.then?a.then(r):r())}catch(t){return Promise.reject(t)}},n.predict=function(t,n,r){void 0===n&&(n=10),void 0===r&&(r=1);try{var i=this;return i.lstm.dropout=1===n?0:i.lstmDropout,Promise.resolve(i.featurize(t)).then(function(t){for(var o,s=[],a=0;a<n;a+=1)e.dispose(o),o=i.lstm.predict(t,i.lstmC,i.lstmH),s.push(e.tidy(function(){return o.y.div(r).softmax()}));e.dispose([i.lstmC,i.lstmH]),i.lstmC=o.nc.clone(),i.lstmH=o.nh.clone();var u=e.tidy(function(){return e.moments(e.stack(s),0)}),c=u.mean,l=u.variance,h=e.tidy(function(){return c.argMax().arraySync()}),f=1-e.tidy(function(){return l.sqrt().arraySync()[h]});return e.dispose([t,c,l]),e.dispose(o),e.dispose(s),{action:i.actions[h],confidence:f}})}catch(t){return Promise.reject(t)}},n.load=function(t){var n=this;e.tidy(function(){var r=JSON.parse(t);Object.entries(r).forEach(function(t){r[t[0]]=e.tensor(t[1]).variable()}),n.lstm.setWeights(r)})},n.export=function(){var t=this;return e.tidy(function(){var e={};return Object.entries(t.lstm.getWeights()).forEach(function(t){e[t[0]]=t[1].arraySync()}),JSON.stringify(e)})},t}(),l=function(){function t(){this.size=512}var r=t.prototype;return r.init=function(){try{var t=this;return Promise.resolve(n.load()).then(function(e){return t.encoder=e,Promise.resolve(t.encodeQuery("")).then(function(e){t.emptyEncoding=e})})}catch(t){return Promise.reject(t)}},r.encodeQuery=function(t){try{return Promise.resolve(this.encoder.embed([t])).then(function(t){var n=t.squeeze();return e.dispose(t),n})}catch(t){return Promise.reject(t)}},r.handleQuery=function(t){try{return Promise.resolve(t?this.encodeQuery(t):this.emptyEncoding.clone())}catch(t){return Promise.reject(t)}},r.resetDialog=function(){},t}();t.BOW=function(){function t(t){this.size=t}var n=t.prototype;return n.handleQuery=function(t){try{var n=this;return Promise.resolve(e.tidy(function(){var r=t.split(" ").map(function(t){return function(t){for(var e=0,n=0;n<t.length;n+=1)e=(e<<5)-e+t.charCodeAt(n),e|=0;return e}(t)%n.size});return e.oneHot(r,n.size).asType("float32").sum(0)}))}catch(t){return Promise.reject(t)}},n.resetDialog=function(){},t}(),t.HCN=c,t.LSTM=r,t.USE=l,t.parseStories=function(t){var e=[],n=[],r=!0;return t.split("\n").forEach(function(t){var i=/^## *([^#].*)?$/gm.exec(t),o=/^> *(.*)$/gm.exec(t),s=/^- *(\w*)$/gm.exec(t);null!=i&&n.length>0?(n.push({query:"",action:"LUS"}),e.push(n),n=[]):null!=o?(n.length>0&&n.push({query:"",action:"LUS"}),n.push({query:o[1],action:void 0}),r=!1):null!=s&&r?n.push({query:"",action:s[1]}):null==s||r||(n[n.length-1].action=s[1],r=!0)}),n.length>0&&(n.push({query:"",action:"LUS"}),e.push(n)),e}});
//# sourceMappingURL=wisty.umd.js.map
