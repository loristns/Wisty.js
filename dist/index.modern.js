import{zeros as t,tidy as e,initializers as s,basicLSTMCell as i,stack as r,dropout as n,sum as a,tensor as o,oneHot as c,dispose as l,concat as h,train as u,mul as d,ones as m,metrics as y,keep as p,math as g,eye as f,tensor1d as v}from"@tensorflow/tfjs";import{load as w}from"@tensorflow-models/universal-sentence-encoder";import{Parser as z}from"commonmark";class S{constructor(){this.size=1}async init(t){this.actions=t}async handleQuery(t){}getOptimizableFeatures(e){return void 0===e?t([1]):e}handleAction(t){}getActionMask(){return this.actions.map(()=>!0)}resetDialog(){}load(t){}async export(){return{}}}function k(t,e){const s=Array.from(Array(t.length+1),()=>new Array(e.length+1).fill(0));for(let e=1;e<=t.length;e+=1)s[e][0]=e;for(let t=1;t<=e.length;t+=1)s[0][t]=t;for(let i=0;i<e.length;i+=1)for(let r=0;r<t.length;r+=1)s[r+1][i+1]=Math.min(s[r][i+1]+1,s[r+1][i]+1,s[r][i]+(t[r]!==e[i]?1:0));return s[t.length][e.length]/Math.max(t.length,e.length,1)}function x(t,e){let s={extract:void 0,score:0};for(let i=0;i<t.length;i+=1){const r=t.substring(i,i+e.length),n={extract:r,score:1-k(r,e)};if(1===n.score)return n;n.score>s.score&&(s=n)}return s}function b(t){let e=0;for(let s=0;s<t.length;s+=1)e=(e<<5)-e+t.charCodeAt(s),e|=0;return e}function A(t,i=!1,r="he"){return e(()=>{let e;switch(r){case"he":e=s.heNormal({});break;case"zeros":e=s.zeros();break;case"normal":e=s.randomNormal({});break;default:throw new Error(`Expected parameter init to take value 'he', 'zeros' or 'normal' not '${r}'.`)}let n=e.apply(t);return i&&(n=n.asScalar()),n.variable()})}class L{constructor(t,e,s,i=.2){this.lstmKernel=A([t+e,4*e]),this.lstmBias=A([4*e],!1,"zeros"),this.lstmForgetBias=A([1],!0,"zeros"),this.lstmInitH=A([1,e]),this.lstmInitC=A([1,e]),this.denseWeights=A([e,s]),this.denseBias=A([s],!1,"zeros"),this.dropout=i}initLSTM(t=!0){return{c:t?this.lstmInitC.clone():this.lstmInitC,h:t?this.lstmInitH.clone():this.lstmInitH}}predict(t,s,o,c,l=1){return e(()=>{const[e,h]=i(this.lstmForgetBias,this.lstmKernel,this.lstmBias,r([t]),o,s);let u=n(h,this.dropout).matMul(this.denseWeights).add(this.denseBias).squeeze().div(l).softmax().mul(c??1);return u=u.div(a(u)),{y:u,nc:e,nh:h}})}load(t){e(()=>{this.lstmKernel=o(t.lstmKernel).variable(),this.lstmBias=o(t.lstmBias).variable(),this.lstmForgetBias=o(t.lstmForgetBias).variable(),this.lstmInitH=o(t.lstmInitH).variable(),this.lstmInitC=o(t.lstmInitC).variable(),this.denseWeights=o(t.denseWeights).variable(),this.denseBias=o(t.denseBias).variable()})}async export(){return{lstmKernel:await this.lstmKernel.array(),lstmBias:await this.lstmBias.array(),lstmForgetBias:await this.lstmForgetBias.array(),lstmInitH:await this.lstmInitH.array(),lstmInitC:await this.lstmInitC.array(),denseWeights:await this.denseWeights.array(),denseBias:await this.denseBias.array()}}}class _{constructor(t,e){this.key=t,this.parent=e,this.childs={},this.ending=!1}addChild(t){this.childs[t.key]=t}setEnding(){this.ending=!0}}class V{constructor(){this.root=new _("",null)}add(t){let e=this.root;for(let s=0;s<t.length;s+=1)void 0===e.childs[t[s]]&&e.addChild(new _(t[s],e)),e=e.childs[t[s]],s===t.length-1&&e.setEnding()}split(t,e,s=[]){const i=[];function r(t){i[i.length-1]===e||s.includes(t)||i.push(e)}let n=this.root,a="";for(let e=0;e<t.length;e+=1){const s=t[e];void 0!==n.childs[s]?(a+=s,n=n.childs[s]):(n.ending?i.push(a):r(a),void 0!==this.root.childs[s]?(a=s,n=this.root.childs[s]):(r(a),a="",n=this.root))}return n.ending?i.push(a):r(a),i}}var q={__proto__:null,fuzzyMatch:x,hashcode:b,initializeVariable:A,levenshteinDistance:k,LSTM:L,Trie:V},O={__proto__:null,Featurizer:S,ActionFeaturizer:class extends S{constructor({maskLUS:t=!0,maskPreviousAction:e=!0,LUSAction:s="LUS"}={maskLUS:!0,maskPreviousAction:!0,LUSAction:"LUS"}){super(),this.id="Action Featurizer",this.maskLUS=t,this.maskPreviousAction=e,this.LUSAction=s,this.resetDialog()}async init(t){await super.init(t),this.size=t.length,this.embeddings=A([this.size,this.size])}async handleQuery(t){return e(()=>(this.userTalked=""!==t,c([this.actions.indexOf(this.previousAction)],this.actions.length)))}getOptimizableFeatures(t){return t.matMul(this.embeddings).squeeze()}handleAction(t){this.previousAction=t!==this.LUSAction?t:this.previousAction}getActionMask(){const t=super.getActionMask();return this.maskLUS&&this.userTalked&&(t[this.actions.indexOf(this.LUSAction)]=!1),this.maskPreviousAction&&this.actions.includes(this.previousAction)&&(t[this.actions.indexOf(this.previousAction)]=!1),t}resetDialog(){this.userTalked=!1,this.previousAction=void 0}load(t){this.embeddings=e(()=>o(t.embeddings).variable())}async export(){return{embeddings:await this.embeddings.array()}}},BOW:class extends S{constructor(t){super(),this.id="Bag-of-Words",this.size=t}async handleQuery(t){return e(()=>{const e=t.toLowerCase().split(/\W/g).map(t=>b(t)%this.size);return c(e,this.size).asType("float32").sum(0)})}},USE:class extends S{constructor(){super(...arguments),this.id="Universal Sentence Encoder",this.size=512}async init(t){await super.init(t),this.encoder=await w(),this.emptyEncoding=await this.encodeQuery("")}async encodeQuery(t){const e=await this.encoder.embed([t]),s=e.squeeze();return l(e),s}async handleQuery(t){return t?this.encodeQuery(t):this.emptyEncoding.clone()}},WordEmbedding:class extends S{constructor(t){super(),this.id="Word Embedding",this.size=2*t.size,this.vectors=t}async init(t){await super.init(t),this.vectors.isLoaded()||await this.vectors.load()}async handleQuery(s){return e(()=>{const e=this.vectors.tokenize(s).map(t=>this.vectors.get(t)).filter(t=>void 0!==t);if(0===e.length)return t([this.size]);const i=r(e);return h([i.mean(0),i.max(0)])})}}},C={__proto__:null,HCN:class{constructor({actions:t,featurizers:e,hiddenSize:s=32,optimizer:i=u.adam(.01),temperature:r=1,dropout:n=0}){this.actions=t,this.featurizers=e,this.optimizer=i,this.hiddenSize=s,this.outputSize=t.length,this.lstmTemperature=r,this.lstmDropout=n}async init(){await Promise.all(this.featurizers.map(t=>t.init(this.actions))),this.inputSize=this.featurizers.map(t=>t.size).reduce((t,e)=>t+e,1),this.lstm=new L(this.inputSize,this.hiddenSize,this.outputSize,this.lstmDropout),this.resetDialog()}resetDialog(){this.featurizers.forEach(t=>t.resetDialog()),({c:this.lstmC,h:this.lstmH}=this.lstm.initLSTM())}async handleQuery(t){return Promise.all(this.featurizers.map(e=>e.handleQuery(t)))}getOptimizableFeatures(s){return e(()=>{const e=this.featurizers.map((t,e)=>t.getOptimizableFeatures(s[e]));return e.push(t([1])),h(e)})}handleAction(t){this.featurizers.map(e=>e.handleAction(t))}getActionMask(){return e(()=>this.featurizers.map(t=>o(t.getActionMask(),void 0,"float32")).reduce((t,e)=>d(t,e),m([this.actions.length])))}async fitStory(t){this.resetDialog();const e=[],s=[],i=[];for(let r=0;r<t.length;r+=1){const n=t[r];e.push(await this.handleQuery(n.query)),s.push(this.getActionMask()),i.push(c(this.actions.indexOf(n.action),this.outputSize)),this.handleAction(n.action)}let n;return this.optimizer.minimize(()=>{let{c:t,h:a}=this.lstm.initLSTM(!1);const o=e.map((e,i)=>{const r=this.lstm.predict(this.getOptimizableFeatures(e),t,a,s[i]);return t=r.nc,a=r.nh,r.y}),c=r(i),l=r(o),h=y.categoricalCrossentropy(c,l).mean();return n={targets:p(c.argMax(1)),predictions:p(l.argMax(1)),loss:h.arraySync(),isFailing:y.categoricalAccuracy(c,l).mean().arraySync()<.999},h}),l([e,i]),n}async train({stories:t,nEpochs:s=12,onEpochEnd:i}){const r=Object.entries(t);let n;for(let t=0;t<s;t+=1){const s=[],a=[],o=[],c=[];for(let t=0;t<r.length;t+=1){const[e,i]=r[t],n=await this.fitStory(i);s.push(n.targets),a.push(n.predictions),o.push(n.loss),n.isFailing&&c.push(e)}const u=e(()=>g.confusionMatrix(h(s),h(a),this.outputSize)),d=e(()=>u.mul(f(...u.shape)).sum(0));n={epoch:t,failingSamples:c,accuracy:e(()=>d.sum().div(u.sum()).arraySync()),recall:e(()=>d.div(u.sum(1)).mean().arraySync()),precision:e(()=>d.div(u.sum(0)).mean().arraySync()),loss:o.reduce((t,e)=>t+e)/o.length},l(s),l(a),l([d,u]),void 0!==i&&i(n)}return this.resetDialog(),n}async predict(t){this.lstm.dropout=0;const s=this.getOptimizableFeatures(await this.handleQuery(t)),i=this.getActionMask(),r=this.lstm.predict(s,this.lstmC,this.lstmH,i,this.lstmTemperature);l([this.lstmC,this.lstmH]),this.lstmC=r.nc.clone(),this.lstmH=r.nh.clone();const n=e(()=>r.y.argMax().arraySync()),a=e(()=>r.y.arraySync()[n]);return l([s,i]),l(r),this.lstm.dropout=this.lstmDropout,this.handleAction(this.actions[n]),{action:this.actions[n],confidence:a}}async score(t){const s=Object.entries(t),i=[],r=[],n=[],a=[];for(let t=0;t<s.length;t+=1){const[e,o]=s[t];this.resetDialog();for(let t=0;t<o.length;t+=1){const s=o[t],{action:c,confidence:l}=await this.predict(s.query);i.push(this.actions.indexOf(s.action)),r.push(this.actions.indexOf(c)),n.push(l),c===s.action||a.includes(e)||a.push(e)}}const c=e(()=>g.confusionMatrix(o(i),o(r),this.outputSize)),h=e(()=>c.mul(f(...c.shape)).sum(0)),u={failingSamples:a,accuracy:e(()=>h.sum().div(c.sum()).arraySync()),recall:e(()=>h.div(c.sum(1)).mean().arraySync()),precision:e(()=>h.div(c.sum(0)).mean().arraySync()),averageConfidence:n.reduce((t,e)=>t+e)/n.length};return l([h,c]),this.resetDialog(),u}load(t){const e=JSON.parse(t);this.featurizers.forEach(t=>{t.load(e[t.id])}),this.lstm.load(e.lstm),this.resetDialog()}async export(){const t={lstm:await this.lstm.export()};for(let e=0;e<this.featurizers.length;e+=1){const s=this.featurizers[e];t[s.id]=await s.export()}return JSON.stringify(t)}}};class D extends S{constructor(t,e){super(),this.dependantActions=t,this.invDependantActions=e}getActionMask(){return this.actions.map(t=>{const e=void 0!==this.value,s=this.dependantActions.includes(t),i=this.invDependantActions.includes(t);return!e&&(!s||i)||e&&!i})}resetDialog(){this.value=void 0}getValue(){return this.value}setValue(t){this.value=t}}var M,E={__proto__:null,Slot:D,CategoricalSlot:class extends D{constructor({name:t,categories:e,dependantActions:s=[],invDependantActions:i=[],threshold:r=.75}){super(s,i),this.categoryNames=Object.keys(e),this.categories=e,this.threshold=r,this.id=t+"#Categorical",this.size=2*this.categoryNames.length}async init(t){await super.init(t),this.resetDialog()}oneHotValue(t){const e=Object.keys(this.categories);return c(e.indexOf(t.category),e.length)}async handleQuery(t){const s=this.getValue();let i={category:void 0,extract:void 0,score:0};Object.entries(this.categories).forEach(([e,r])=>{const n=r.map(e=>x(t.toLowerCase(),e.toLowerCase())).filter(t=>t.score>=this.threshold).reduce((t,e)=>t.score>e.score?t:e,{extract:void 0,score:0});if(void 0!==n.extract){const t=e!==s.category,r=i.category===s.category,a=n.score>i.score;(void 0===i.category||t&&a||r&&t||r&&a)&&(i={category:e,...n})}});const r=e(()=>h([this.oneHotValue(i),this.oneHotValue(this.getValue())]));return void 0!==i.category&&this.setValue(i),r}getValue(){return void 0===super.getValue()?{category:void 0,extract:void 0,score:0}:super.getValue()}}};!function(t){t[t.query=0]="query",t[t.data=1]="data",t[t.action=2]="action",t[t.empty=3]="empty"}(M||(M={}));var U={__proto__:null,parseWistyML:function(t){const e=new z({smart:!0}).parse(t).walker();let s=e.next();const i={section:void 0,status:void 0,slot:void 0,sentence:"",extractedValues:[],storyName:void 0,story:[],currentState:void 0,stateStep:M.empty},r={stories:{},extractedValues:{}};function n(){void 0!==i.storyName&&(i.story.push(i.currentState),i.story.push({query:"",action:"LUS"}),r.stories[i.storyName]=i.story,i.storyName=void 0,i.story=[],i.currentState=void 0,i.stateStep=M.empty)}function a(t){void 0===r.extractedValues[i.slot]&&(r.extractedValues[i.slot]=[]),r.extractedValues[i.slot].push(...i.extractedValues.map(e=>({sentence:t,...e}))),i.extractedValues=[],i.sentence=""}for(;null!==s;){const{entering:t,node:o}=s,{type:c,literal:l,destination:h,info:u,level:d}=o;if(t&&"heading"===c&&2===d)i.status="new-section",n();else if("text"===c&&"new-section"===i.status)i.section=l,i.status=l+".entering";else if("wisty.slots"===i.section)t&&"heading"===c&&3===d?i.status="slots.new-slot":"text"===c&&"slots.new-slot"===i.status?(l in r.extractedValues||(r.extractedValues[l]=[]),i.slot=l,i.status="slots.in-slot"):t&&"item"===c&&"slots.in-slot"===i.status?i.status="slots.in-sample":"text"===c&&"slots.in-sample"===i.status?i.sentence+=l:"code"===c&&"slots.in-sample"===i.status?(i.extractedValues.push({extract:l,start:i.sentence.length,end:i.sentence.length+l.length-1}),i.sentence+=l):t||"item"!==c||"slots.in-sample"!==i.status||(a(i.sentence),i.status="slots.in-slot");else if("wisty.stories"===i.section)if(t&&"heading"===c&&3===d)i.status="stories.new-story",n();else if("text"===c&&"stories.new-story"===i.status)i.storyName=l,i.status="stories.in-story";else if(t&&["block_quote","item","code_block"].includes(c)&&"stories.in-story"===i.status){let t;switch(c){case"block_quote":t=M.query;break;case"item":t=M.action;break;case"code_block":t=M.data}switch(t<=i.stateStep&&(void 0!==i.currentState&&(i.story.push(i.currentState),t===M.query&&"LUS"!==i.currentState.action&&i.story.push({query:"",action:"LUS"})),i.currentState={query:"",action:"LUS"}),t){case M.query:i.status="stories.new-query";break;case M.action:i.status="stories.new-action";break;case M.data:"json"===u&&(i.currentState.data=JSON.parse(l))}i.stateStep=t}else"text"===c&&"stories.new-query"===i.status?i.currentState.query+=l:t&&"link"===c&&"stories.new-query"===i.status?(i.slot=h,i.status="stories.new-slot"):"text"===c&&"stories.new-slot"===i.status?(i.extractedValues.push({extract:l,start:i.currentState.query.length,end:i.currentState.query.length+l.length-1}),i.currentState.query+=l,i.status="stories.new-query"):t||"block_quote"!==c||"stories.new-query"!==i.status?"text"===c&&"stories.new-action"===i.status&&(i.currentState.action=l,i.status="stories.in-story"):(i.extractedValues.length>0&&a(i.currentState.query),i.status="stories.in-story");s=e.next()}return n(),r},trainTestSplit:function(t,e){const s=Object.entries(t),i=[];for(let t=0;t/s.length<e;t+=1)i.push(...s.splice(Math.floor(Math.random()*s.length),1));return{train:Object.fromEntries(s),test:Object.fromEntries(i)}},NLUFormatter:class{constructor({model:t,slots:e=[],LUSAction:s="LUS"}){this.model=t,this.slots=e,this.LUSAction=s}async ask(t){const e={query:t,actions:[],turnConfidence:1,slots:{}};let{action:s,confidence:i}=await this.model.predict(t);for(;s!==this.LUSAction;)e.actions.push(s),e.turnConfidence*=i,({action:s,confidence:i}=await this.model.predict(""));return this.slots.forEach(t=>{e.slots[t.id]=t.getValue()}),e}resetDialog(){this.model.resetDialog()}},KeyedVectors:class{constructor({loaderFunction:t,size:e,tokenization:s="word",cased:i=!1,maxDistance:r=.5,unknownKey:n}){if(!["word","byte_pair"].includes(s))throw new Error('KeyedVector tokenization setting must be "word" or "byte_pair"');this.loaderFunction=t,this.size=e,this.tokenization=s,this.cased=i,this.maxDistance=r,this.unknownKey=n}keys(){return Object.keys(this.vectors)}async load(){this.vectors=JSON.parse(await this.loaderFunction()),"byte_pair"===this.tokenization&&(this.trie=new V,this.keys().forEach(t=>this.trie.add(t)))}isLoaded(){return void 0!==this.vectors}get(t){if(this.keys().includes(t))return v(this.vectors[t]);let e,s=Infinity;return this.keys().forEach(i=>{const r=k(i,t);r<s&&(e=i,s=r)}),s<=this.maxDistance?o(this.vectors[e]):void 0!==this.unknownKey?o(this.vectors[this.unknownKey]):void 0}wordTokenize(t){return t.split(/\W/g).filter(t=>t.length>0)}bytePairTokenize(t){const e=(" "+t).split(" ").join("▁");return this.trie.split(e,this.unknownKey,["▁"])}tokenize(t){switch(this.cased&&(t=t.toLowerCase()),this.tokenization){case"word":return this.wordTokenize(t);case"byte_pair":return this.bytePairTokenize(t);default:throw new Error('KeyedVector tokenization setting must be "word" or "byte_pair"')}}}};export{O as featurizers,C as models,E as slots,U as tools,q as utils};
//# sourceMappingURL=index.modern.js.map
