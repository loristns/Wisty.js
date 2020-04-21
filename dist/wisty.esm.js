import{tidy as t,basicLSTMCell as n,stack as e,dropout as r,losses as i,metrics as o,train as s,randomNormal as u,zeros as a,concat as c,dispose as l,oneHot as h,moments as f,tensor as m}from"@tensorflow/tfjs";import{load as v}from"@tensorflow-models/universal-sentence-encoder";var d=function(){function a(t,n,e,r,i){void 0===r&&(r=s.adam()),void 0===i&&(i=.2),this.lstmKernel=a.randomVariable([t+n,4*n]),this.lstmBias=a.randomVariable([4*n]),this.lstmForgetBias=a.randomVariable([1],!0),this.lstmInitH=a.randomVariable([1,n]),this.lstmInitC=a.randomVariable([1,n]),this.denseWeights=a.randomVariable([n,e]),this.denseBias=a.randomVariable([e]),this.optimizer=r,this.dropout=i}a.randomVariable=function(n,e){return void 0===e&&(e=!1),t(function(){var t=u(n);return e&&(t=t.asScalar()),t.variable()})};var c=a.prototype;return c.initLSTM=function(){return{c:this.lstmInitC.clone(),h:this.lstmInitH.clone()}},c.predict=function(i,o,s,u){var a=this;return t(function(){var t=n(a.lstmForgetBias,a.lstmKernel,a.lstmBias,e([i]),s,o),c=t[0],l=t[1];return{y:r(l,a.dropout).matMul(a.denseWeights).add(a.denseBias).squeeze().mul(null!=u?u:1),nc:c,nh:l}})},c.fitSequence=function(t,n,r){var s,u,a=this;return this.optimizer.minimize(function(){var c=a.lstmInitC,l=a.lstmInitH,h=t.unstack(),f=null==r?void 0:r.unstack(),m=e(h.map(function(t,n){var e=a.predict(t,c,l,null==f?void 0:f[n]);return c=e.nc,l=e.nh,e.y})),v=i.softmaxCrossEntropy(n,m);return s=v.arraySync(),u=o.categoricalAccuracy(n,m).mean().arraySync(),v}),{loss:s,accuracy:u}},c.setWeights=function(t){var n=this;Object.entries(t).forEach(function(t){var e=t[1];switch(t[0]){case"lstmKernel":n.lstmKernel=e;break;case"lstmBias":n.lstmBias=e;break;case"lstmForgetBias":n.lstmForgetBias=e;break;case"lstmInitH":n.lstmInitH=e;break;case"lstmInitC":n.lstmInitC=e;break;case"denseWeights":n.denseWeights=e;break;case"denseBias":n.denseBias=e}})},c.getWeights=function(){return{lstmKernel:this.lstmKernel.clone(),lstmBias:this.lstmBias.clone(),lstmForgetBias:this.lstmForgetBias.clone(),lstmInitH:this.lstmInitH.clone(),lstmInitC:this.lstmInitC.clone(),denseWeights:this.denseWeights.clone(),denseBias:this.denseBias.clone()}},a}();function y(){return(y=Object.assign||function(t){for(var n=1;n<arguments.length;n++){var e=arguments[n];for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])}return t}).apply(this,arguments)}const p=function(){function t(){}return t.prototype.then=function(n,e){const r=new t,i=this.s;if(i){const t=1&i?n:e;if(t){try{g(r,1,t(this.v))}catch(t){g(r,2,t)}return r}return this}return this.o=function(t){try{const i=t.v;1&t.s?g(r,1,n?n(i):i):e?g(r,1,e(i)):g(r,2,i)}catch(t){g(r,2,t)}},r},t}();function g(t,n,e){if(!t.s){if(e instanceof p){if(!e.s)return void(e.o=g.bind(null,t,n));1&n&&(n=e.s),e=e.v}if(e&&e.then)return void e.then(g.bind(null,t,n),g.bind(null,t,2));t.s=n,t.v=e;const r=t.o;r&&r(t)}}function b(t){return t instanceof p&&1&t.s}function S(t,n,e){for(var r;;){var i=t();if(b(i)&&(i=i.v),!i)return o;if(i.then){r=0;break}var o=e();if(o&&o.then){if(!b(o)){r=1;break}o=o.s}if(n){var s=n();if(s&&s.then&&!b(s)){r=2;break}}}var u=new p,a=g.bind(null,u,2);return(0===r?i.then(l):1===r?o.then(c):s.then(h)).then(void 0,a),u;function c(r){o=r;do{if(n&&(s=n())&&s.then&&!b(s))return void s.then(h).then(void 0,a);if(!(i=t())||b(i)&&!i.v)return void g(u,1,o);if(i.then)return void i.then(l).then(void 0,a);b(o=e())&&(o=o.v)}while(!o||!o.then);o.then(c).then(void 0,a)}function l(t){t?(o=e())&&o.then?o.then(c).then(void 0,a):c(o):g(u,1,o)}function h(){(i=t())?i.then?i.then(l).then(void 0,a):l(i):g(u,1,o)}}"undefined"!=typeof Symbol&&(Symbol.iterator||(Symbol.iterator=Symbol("Symbol.iterator"))),"undefined"!=typeof Symbol&&(Symbol.asyncIterator||(Symbol.asyncIterator=Symbol("Symbol.asyncIterator")));var P=function(){function n(t,n,e,r,i){void 0===e&&(e=128),void 0===r&&(r=s.adam(.01)),void 0===i&&(i=.2),this.actions=t,this.featurizers=n,this.inputSize=n.map(function(t){return t.size}).reduce(function(t,n){return t+n},1),this.outputSize=t.length,this.lstm=new d(this.inputSize,e,this.outputSize,r,i),this.lstmDropout=i,this.resetDialog()}var r=n.prototype;return r.resetDialog=function(){this.featurizers.forEach(function(t){return t.resetDialog()});var t=this.lstm.initLSTM();this.lstmC=t.c,this.lstmH=t.h},r.featurize=function(t){try{return Promise.resolve(Promise.all(this.featurizers.map(function(n){return n.handleQuery(t)}))).then(function(t){t.push(a([1]));var n=c(t);return l(t),n})}catch(t){return Promise.reject(t)}},r.fitStory=function(n,r){try{var i=function(){var i=y({epoch:r},t(function(){return o.lstm.fitSequence(e(s),e(u),a([n.length,o.actions.length]))}));return l([s,u]),i},o=this;o.resetDialog();var s=[],u=[],c=0,f=S(function(){return c<n.length},function(){return!!(c+=1)},function(){var t=n[c],e=s.push;return Promise.resolve(o.featurize(t.query)).then(function(n){e.call(s,n),u.push(h(o.actions.indexOf(t.action),o.outputSize))})});return Promise.resolve(f&&f.then?f.then(i):i())}catch(t){return Promise.reject(t)}},r.train=function(t,n,e){void 0===n&&(n=12);try{var r=function(){return i.resetDialog(),o},i=this,o=[],s=0,u=S(function(){return s<n},function(){return!!(s+=1)},function(){var n=[];return t.forEach(function(t){n.push(i.fitStory(t,s))}),Promise.resolve(Promise.all(n)).then(function(t){n=t,void 0!==e&&e(n),o.push.apply(o,n)})});return Promise.resolve(u&&u.then?u.then(r):r())}catch(t){return Promise.reject(t)}},r.predict=function(n,r,i){void 0===r&&(r=10),void 0===i&&(i=1);try{var o=this;return o.lstm.dropout=1===r?0:o.lstmDropout,Promise.resolve(o.featurize(n)).then(function(n){for(var s,u=[],a=0;a<r;a+=1)l(s),s=o.lstm.predict(n,o.lstmC,o.lstmH),u.push(t(function(){return s.y.div(i).softmax()}));l([o.lstmC,o.lstmH]),o.lstmC=s.nc.clone(),o.lstmH=s.nh.clone();var c=t(function(){return f(e(u),0)}),h=c.mean,m=c.variance,v=t(function(){return h.argMax().arraySync()}),d=1-t(function(){return m.sqrt().arraySync()[v]});return l([n,h,m]),l(s),l(u),{action:o.actions[v],confidence:d}})}catch(t){return Promise.reject(t)}},r.load=function(n){var e=this;t(function(){var t=JSON.parse(n);Object.entries(t).forEach(function(n){t[n[0]]=m(n[1]).variable()}),e.lstm.setWeights(t)})},r.export=function(){var n=this;return t(function(){var t={};return Object.entries(n.lstm.getWeights()).forEach(function(n){t[n[0]]=n[1].arraySync()}),JSON.stringify(t)})},n}(),z=function(){function t(){this.size=512}var n=t.prototype;return n.init=function(){try{var t=this;return Promise.resolve(v()).then(function(n){return t.encoder=n,Promise.resolve(t.encodeQuery("")).then(function(n){t.emptyEncoding=n})})}catch(t){return Promise.reject(t)}},n.encodeQuery=function(t){try{return Promise.resolve(this.encoder.embed([t])).then(function(t){var n=t.squeeze();return l(t),n})}catch(t){return Promise.reject(t)}},n.handleQuery=function(t){try{return Promise.resolve(t?this.encodeQuery(t):this.emptyEncoding.clone())}catch(t){return Promise.reject(t)}},n.resetDialog=function(){},t}(),B=function(){function n(t){this.size=t}var e=n.prototype;return e.handleQuery=function(n){try{var e=this;return Promise.resolve(t(function(){var t=n.split(" ").map(function(t){return function(t){for(var n=0,e=0;e<t.length;e+=1)n=(n<<5)-n+t.charCodeAt(e),n|=0;return n}(t)%e.size});return h(t,e.size).asType("float32").sum(0)}))}catch(t){return Promise.reject(t)}},e.resetDialog=function(){},n}();function I(t){var n=[],e=[],r=!0;return t.split("\n").forEach(function(t){var i=/^## *([^#].*)?$/gm.exec(t),o=/^> *(.*)$/gm.exec(t),s=/^- *(\w*)$/gm.exec(t);null!=i&&e.length>0?(e.push({query:"",action:"LUS"}),n.push(e),e=[]):null!=o?(e.length>0&&e.push({query:"",action:"LUS"}),e.push({query:o[1],action:void 0}),r=!1):null!=s&&r?e.push({query:"",action:s[1]}):null==s||r||(e[e.length-1].action=s[1],r=!0)}),e.length>0&&(e.push({query:"",action:"LUS"}),n.push(e)),n}export{B as BOW,P as HCN,d as LSTM,z as USE,I as parseStories};
//# sourceMappingURL=wisty.esm.js.map
