import{zeros as t,tidy as e,initializers as s,basicLSTMCell as i,stack as n,dropout as r,sum as a,tensor as o,oneHot as c,dispose as l,concat as h,train as u,mul as d,ones as m,metrics as y,keep as p,math as g,eye as f,tensor1d as v}from"@tensorflow/tfjs";import{load as S}from"@tensorflow-models/universal-sentence-encoder";import{Parser as w}from"commonmark";class z{constructor(){this.size=1}async init(t){this.actions=t}async handleQuery(t){}getOptimizableFeatures(e){return void 0===e?t([1]):e}handleAction(t){}getActionMask(){return this.actions.map(()=>!0)}resetDialog(){}load(t){}async export(){return{}}}function x(t,e){const s=Array.from(Array(t.length+1),()=>new Array(e.length+1).fill(0));for(let e=1;e<=t.length;e+=1)s[e][0]=e;for(let t=1;t<=e.length;t+=1)s[0][t]=t;for(let i=0;i<e.length;i+=1)for(let n=0;n<t.length;n+=1)s[n+1][i+1]=Math.min(s[n][i+1]+1,s[n+1][i]+1,s[n][i]+(t[n]!==e[i]?1:0));return s[t.length][e.length]/Math.max(t.length,e.length,1)}function k(t,e){let s={extract:void 0,score:0};for(let i=0;i<t.length;i+=1){const n=t.substring(i,i+e.length),r={extract:n,score:1-x(n,e)};if(1===r.score)return r;r.score>s.score&&(s=r)}return s}function b(t){let e=0;for(let s=0;s<t.length;s+=1)e=(e<<5)-e+t.charCodeAt(s),e|=0;return e}function A(t,i=!1,n="he"){return e(()=>{let e;switch(n){case"he":e=s.heNormal({});break;case"zeros":e=s.zeros();break;case"normal":e=s.randomNormal({});break;default:throw new Error(`Expected parameter init to take value 'he', 'zeros' or 'normal' not '${n}'.`)}let r=e.apply(t);return i&&(r=r.asScalar()),r.variable()})}class L{constructor(t,e,s,i=.2){this.lstmKernel=A([t+e,4*e]),this.lstmBias=A([4*e],!1,"zeros"),this.lstmForgetBias=A([1],!0,"zeros"),this.lstmInitH=A([1,e]),this.lstmInitC=A([1,e]),this.denseWeights=A([e,s]),this.denseBias=A([s],!1,"zeros"),this.dropout=i}initLSTM(t=!0){return{c:t?this.lstmInitC.clone():this.lstmInitC,h:t?this.lstmInitH.clone():this.lstmInitH}}predict(t,s,o,c,l=1){return e(()=>{const[e,h]=i(this.lstmForgetBias,this.lstmKernel,this.lstmBias,n([t]),o,s);let u=r(h,this.dropout).matMul(this.denseWeights).add(this.denseBias).squeeze().div(l).softmax().mul(c??1);return u=u.div(a(u)),{y:u,nc:e,nh:h}})}load(t){e(()=>{this.lstmKernel=o(t.lstmKernel).variable(),this.lstmBias=o(t.lstmBias).variable(),this.lstmForgetBias=o(t.lstmForgetBias).variable(),this.lstmInitH=o(t.lstmInitH).variable(),this.lstmInitC=o(t.lstmInitC).variable(),this.denseWeights=o(t.denseWeights).variable(),this.denseBias=o(t.denseBias).variable()})}async export(){return{lstmKernel:await this.lstmKernel.array(),lstmBias:await this.lstmBias.array(),lstmForgetBias:await this.lstmForgetBias.array(),lstmInitH:await this.lstmInitH.array(),lstmInitC:await this.lstmInitC.array(),denseWeights:await this.denseWeights.array(),denseBias:await this.denseBias.array()}}}class q{constructor(t,e){this.key=t,this.parent=e,this.childs={},this.ending=!1}addChild(t){this.childs[t.key]=t}setEnding(){this.ending=!0}}class _{constructor(){this.root=new q("",null)}add(t){let e=this.root;for(let s=0;s<t.length;s+=1)void 0===e.childs[t[s]]&&e.addChild(new q(t[s],e)),e=e.childs[t[s]],s===t.length-1&&e.setEnding()}split(t,e,s=[]){const i=[];function n(t){i[i.length-1]===e||s.includes(t)||i.push(e)}let r=this.root,a="";for(let e=0;e<t.length;e+=1){const s=t[e];void 0!==r.childs[s]?(a+=s,r=r.childs[s]):(r.ending?i.push(a):n(a),void 0!==this.root.childs[s]?(a=s,r=this.root.childs[s]):(n(a),a="",r=this.root))}return r.ending?i.push(a):n(a),i}}var V={__proto__:null,fuzzyMatch:k,hashcode:b,initializeVariable:A,levenshteinDistance:x,LSTM:L,Trie:_},U={__proto__:null,Featurizer:z,ActionFeaturizer:class extends z{constructor({maskLUS:t=!0,maskPreviousAction:e=!0,LUSAction:s="LUS"}={maskLUS:!0,maskPreviousAction:!0,LUSAction:"LUS"}){super(),this.id="Action Featurizer",this.maskLUS=t,this.maskPreviousAction=e,this.LUSAction=s,this.resetDialog()}async init(t){await super.init(t),this.size=t.length,this.embeddings=A([this.size,this.size])}async handleQuery(t){return e(()=>(this.userTalked=""!==t,c([this.actions.indexOf(this.previousAction)],this.actions.length)))}getOptimizableFeatures(t){return t.matMul(this.embeddings).squeeze()}handleAction(t){this.previousAction=t!==this.LUSAction?t:this.previousAction}getActionMask(){const t=super.getActionMask();return this.maskLUS&&this.userTalked&&(t[this.actions.indexOf(this.LUSAction)]=!1),this.maskPreviousAction&&this.actions.includes(this.previousAction)&&(t[this.actions.indexOf(this.previousAction)]=!1),t}resetDialog(){this.userTalked=!1,this.previousAction=void 0}load(t){this.embeddings=e(()=>o(t.embeddings).variable())}async export(){return{embeddings:await this.embeddings.array()}}},BOW:class extends z{constructor(t){super(),this.id="Bag-of-Words",this.size=t}async handleQuery(t){return e(()=>{const e=t.toLowerCase().split(/\W/g).map(t=>b(t)%this.size);return c(e,this.size).asType("float32").sum(0)})}},USE:class extends z{constructor(){super(...arguments),this.id="Universal Sentence Encoder",this.size=512}async init(t){await super.init(t),this.encoder=await S(),this.emptyEncoding=await this.encodeQuery("")}async encodeQuery(t){const e=await this.encoder.embed([t]),s=e.squeeze();return l(e),s}async handleQuery(t){return t?this.encodeQuery(t):this.emptyEncoding.clone()}},WordEmbedding:class extends z{constructor(t){super(),this.id="Word Embedding",this.size=2*t.size,this.vectors=t}async init(t){await super.init(t),this.vectors.isLoaded()||await this.vectors.load()}async handleQuery(s){return e(()=>{const e=this.vectors.tokenize(s).map(t=>this.vectors.get(t)).filter(t=>void 0!==t);if(0===e.length)return t([this.size]);const i=n(e);return h([i.mean(0),i.max(0)])})}}},C={__proto__:null,HCN:class{constructor({actions:t,featurizers:e,hiddenSize:s=32,optimizer:i=u.adam(.01),temperature:n=1,dropout:r=0}){this.actions=t,this.featurizers=e,this.optimizer=i,this.hiddenSize=s,this.outputSize=t.length,this.lstmTemperature=n,this.lstmDropout=r}async init(){await Promise.all(this.featurizers.map(t=>t.init(this.actions))),this.inputSize=this.featurizers.map(t=>t.size).reduce((t,e)=>t+e,1),this.lstm=new L(this.inputSize,this.hiddenSize,this.outputSize,this.lstmDropout),this.resetDialog()}resetDialog(){this.featurizers.forEach(t=>t.resetDialog()),({c:this.lstmC,h:this.lstmH}=this.lstm.initLSTM())}async handleQuery(t){return Promise.all(this.featurizers.map(e=>e.handleQuery(t)))}getOptimizableFeatures(s){return e(()=>{const e=this.featurizers.map((t,e)=>t.getOptimizableFeatures(s[e]));return e.push(t([1])),h(e)})}handleAction(t){this.featurizers.map(e=>e.handleAction(t))}getActionMask(){return e(()=>this.featurizers.map(t=>o(t.getActionMask(),void 0,"float32")).reduce((t,e)=>d(t,e),m([this.actions.length])))}async fitStory(t){this.resetDialog();const e=[],s=[],i=[];for(let n=0;n<t.length;n+=1){const r=t[n];e.push(await this.handleQuery(r.query)),s.push(this.getActionMask()),i.push(c(this.actions.indexOf(r.action),this.outputSize)),this.handleAction(r.action)}let r;return this.optimizer.minimize(()=>{let{c:t,h:a}=this.lstm.initLSTM(!1);const o=e.map((e,i)=>{const n=this.lstm.predict(this.getOptimizableFeatures(e),t,a,s[i]);return t=n.nc,a=n.nh,n.y}),c=n(i),l=n(o),h=y.categoricalCrossentropy(c,l).mean();return r={targets:p(c.argMax(1)),predictions:p(l.argMax(1)),loss:h.arraySync(),isFailing:y.categoricalAccuracy(c,l).mean().arraySync()<.999},h}),l([e,i]),r}async train({stories:t,nEpochs:s=12,onEpochEnd:i}){let n;for(let r=0;r<s;r+=1){const s=[],a=[],o=[],c=[];for(let e=0;e<t.length;e+=1){const i=await this.fitStory(t[e]);s.push(i.targets),a.push(i.predictions),o.push(i.loss),i.isFailing&&c.push(e)}const u=e(()=>g.confusionMatrix(h(s),h(a),this.outputSize)),d=e(()=>u.mul(f(...u.shape)).sum(0));n={epoch:r,failingSamples:c,accuracy:e(()=>d.sum().div(u.sum()).arraySync()),recall:e(()=>d.div(u.sum(1)).mean().arraySync()),precision:e(()=>d.div(u.sum(0)).mean().arraySync()),loss:o.reduce((t,e)=>t+e)/o.length},l(s),l(a),l([d,u]),void 0!==i&&i(n)}return this.resetDialog(),n}async predict(t){this.lstm.dropout=0;const s=this.getOptimizableFeatures(await this.handleQuery(t)),i=this.getActionMask(),n=this.lstm.predict(s,this.lstmC,this.lstmH,i,this.lstmTemperature);l([this.lstmC,this.lstmH]),this.lstmC=n.nc.clone(),this.lstmH=n.nh.clone();const r=e(()=>n.y.argMax().arraySync()),a=e(()=>n.y.arraySync()[r]);return l([s,i]),l(n),this.lstm.dropout=this.lstmDropout,this.handleAction(this.actions[r]),{action:this.actions[r],confidence:a}}async score(t){const s=[],i=[],n=[],r=[];for(let e=0;e<t.length;e+=1){this.resetDialog();for(let a=0;a<t[e].length;a+=1){const o=t[e][a],{action:c,confidence:l}=await this.predict(o.query);s.push(this.actions.indexOf(o.action)),i.push(this.actions.indexOf(c)),n.push(l),c===o.action||r.includes(e)||r.push(e)}}const a=e(()=>g.confusionMatrix(o(s),o(i),this.outputSize)),c=e(()=>a.mul(f(...a.shape)).sum(0)),h={failingSamples:r,accuracy:e(()=>c.sum().div(a.sum()).arraySync()),recall:e(()=>c.div(a.sum(1)).mean().arraySync()),precision:e(()=>c.div(a.sum(0)).mean().arraySync()),averageConfidence:n.reduce((t,e)=>t+e)/n.length};return l([c,a]),this.resetDialog(),h}load(t){const e=JSON.parse(t);this.featurizers.forEach(t=>{t.load(e[t.id])}),this.lstm.load(e.lstm),this.resetDialog()}async export(){const t={lstm:await this.lstm.export()};for(let e=0;e<this.featurizers.length;e+=1){const s=this.featurizers[e];t[s.id]=await s.export()}return JSON.stringify(t)}}};class D extends z{constructor(t,e){super(),this.dependantActions=t,this.invDependantActions=e}getActionMask(){return this.actions.map(t=>{const e=void 0!==this.value,s=this.dependantActions.includes(t),i=this.invDependantActions.includes(t);return!e&&(!s||i)||e&&!i})}resetDialog(){this.value=void 0}getValue(){return this.value}setValue(t){this.value=t}}var M,E={__proto__:null,Slot:D,CategoricalSlot:class extends D{constructor({name:t,categories:e,dependantActions:s=[],invDependantActions:i=[],threshold:n=.75}){super(s,i),this.categoryNames=Object.keys(e),this.categories=e,this.threshold=n,this.id=t+"#Categorical",this.size=2*this.categoryNames.length}async init(t){await super.init(t),this.resetDialog()}oneHotValue(t){const e=Object.keys(this.categories);return c(e.indexOf(t.category),e.length)}async handleQuery(t){const s=this.getValue();let i={category:void 0,extract:void 0,score:0};Object.entries(this.categories).forEach(([e,n])=>{const r=n.map(e=>k(t.toLowerCase(),e.toLowerCase())).filter(t=>t.score>=this.threshold).reduce((t,e)=>t.score>e.score?t:e,{extract:void 0,score:0});if(void 0!==r.extract){const t=e!==s.category,n=i.category===s.category,a=r.score>i.score;(void 0===i.category||t&&a||n&&t||n&&a)&&(i={category:e,...r})}});const n=e(()=>h([this.oneHotValue(i),this.oneHotValue(this.getValue())]));return void 0!==i.category&&this.setValue(i),n}getValue(){return void 0===super.getValue()?{category:void 0,extract:void 0,score:0}:super.getValue()}}};!function(t){t[t.query=0]="query",t[t.data=1]="data",t[t.action=2]="action",t[t.empty=3]="empty"}(M||(M={}));var O={__proto__:null,parseStories:function(t){const e=[];let s=[],i=!0;return t.split("\n").forEach(t=>{const n=/^## *([^#].*)?$/gm.exec(t),r=/^> *(.*)$/gm.exec(t),a=/^- *(\w*)$/gm.exec(t);null!=n&&s.length>0?(s.push({query:"",action:"LUS"}),e.push(s),s=[]):null!=r?(s.length>0&&(void 0===s[s.length-1].action?s[s.length-1].action="LUS":s.push({query:"",action:"LUS"})),s.push({query:r[1],action:void 0}),i=!1):null!=a&&i?s.push({query:"",action:a[1]}):null==a||i||(s[s.length-1].action=a[1],i=!0)}),s.length>0&&(s.push({query:"",action:"LUS"}),e.push(s)),e},parseWistyML:function(t){const e=new w({smart:!0}).parse(t).walker();let s=e.next();const i={section:void 0,status:void 0,slot:void 0,sentence:"",extractedValues:[],storyName:void 0,story:[],currentState:void 0,stateStep:M.empty},n={stories:{},extractedValues:{}};function r(){void 0!==i.storyName&&(i.story.push(i.currentState),i.story.push({query:"",action:"LUS"}),n.stories[i.storyName]=i.story,i.storyName=void 0,i.story=[],i.currentState=void 0,i.stateStep=M.empty)}function a(t){void 0===n.extractedValues[i.slot]&&(n.extractedValues[i.slot]=[]),n.extractedValues[i.slot].push(...i.extractedValues.map(e=>({sentence:t,...e}))),i.extractedValues=[],i.sentence=""}for(;null!==s;){const{entering:t,node:o}=s,{type:c,literal:l,destination:h,info:u,level:d}=o;if(t&&"heading"===c&&2===d)i.status="new-section",r();else if("text"===c&&"new-section"===i.status)i.section=l,i.status=l+".entering";else if("wisty.slots"===i.section)t&&"heading"===c&&3===d?i.status="slots.new-slot":"text"===c&&"slots.new-slot"===i.status?(l in n.extractedValues||(n.extractedValues[l]=[]),i.slot=l,i.status="slots.in-slot"):t&&"item"===c&&"slots.in-slot"===i.status?i.status="slots.in-sample":"text"===c&&"slots.in-sample"===i.status?i.sentence+=l:"code"===c&&"slots.in-sample"===i.status?(i.extractedValues.push({extract:l,start:i.sentence.length,end:i.sentence.length+l.length-1}),i.sentence+=l):t||"item"!==c||"slots.in-sample"!==i.status||(a(i.sentence),i.status="slots.in-slot");else if("wisty.stories"===i.section)if(t&&"heading"===c&&3===d)i.status="stories.new-story",r();else if("text"===c&&"stories.new-story"===i.status)i.storyName=l,i.status="stories.in-story";else if(t&&["block_quote","item","code_block"].includes(c)&&"stories.in-story"===i.status){let t;switch(c){case"block_quote":t=M.query;break;case"item":t=M.action;break;case"code_block":t=M.data}switch(t<=i.stateStep&&(void 0!==i.currentState&&(i.story.push(i.currentState),t===M.query&&"LUS"!==i.currentState.action&&i.story.push({query:"",action:"LUS"})),i.currentState={query:"",action:"LUS"}),t){case M.query:i.status="stories.new-query";break;case M.action:i.status="stories.new-action";break;case M.data:"json"===u&&(i.currentState.data=JSON.parse(l))}i.stateStep=t}else"text"===c&&"stories.new-query"===i.status?i.currentState.query+=l:t&&"link"===c&&"stories.new-query"===i.status?(i.slot=h,i.status="stories.new-slot"):"text"===c&&"stories.new-slot"===i.status?(i.extractedValues.push({extract:l,start:i.currentState.query.length,end:i.currentState.query.length+l.length-1}),i.currentState.query+=l,i.status="stories.new-query"):t||"block_quote"!==c||"stories.new-query"!==i.status?"text"===c&&"stories.new-action"===i.status&&(i.currentState.action=l,i.status="stories.in-story"):(i.extractedValues.length>0&&a(i.currentState.query),i.status="stories.in-story");s=e.next()}return r(),n},trainTestSplit:function(t,e){const s=[];for(let i=0;i/t.length<e;i+=1)s.push(...t.splice(Math.floor(Math.random()*t.length),1));return{train:t,test:s}},NLUFormatter:class{constructor({model:t,slots:e=[],LUSAction:s="LUS"}){this.model=t,this.slots=e,this.LUSAction=s}async ask(t){const e={query:t,actions:[],turnConfidence:1,slots:{}};let{action:s,confidence:i}=await this.model.predict(t);for(;s!==this.LUSAction;)e.actions.push(s),e.turnConfidence*=i,({action:s,confidence:i}=await this.model.predict(""));return this.slots.forEach(t=>{e.slots[t.id]=t.getValue()}),e}resetDialog(){this.model.resetDialog()}},KeyedVectors:class{constructor({loaderFunction:t,size:e,tokenization:s="word",cased:i=!1,maxDistance:n=.5,unknownKey:r}){if(!["word","byte_pair"].includes(s))throw new Error('KeyedVector tokenization setting must be "word" or "byte_pair"');this.loaderFunction=t,this.size=e,this.tokenization=s,this.cased=i,this.maxDistance=n,this.unknownKey=r}keys(){return Object.keys(this.vectors)}async load(){this.vectors=JSON.parse(await this.loaderFunction()),"byte_pair"===this.tokenization&&(this.trie=new _,this.keys().forEach(t=>this.trie.add(t)))}isLoaded(){return void 0!==this.vectors}get(t){if(this.keys().includes(t))return v(this.vectors[t]);let e,s=Infinity;return this.keys().forEach(i=>{const n=x(i,t);n<s&&(e=i,s=n)}),s<=this.maxDistance?o(this.vectors[e]):void 0!==this.unknownKey?o(this.vectors[this.unknownKey]):void 0}wordTokenize(t){return t.split(/\W/g).filter(t=>t.length>0)}bytePairTokenize(t){const e=(" "+t).split(" ").join("▁");return this.trie.split(e,this.unknownKey,["▁"])}tokenize(t){switch(this.cased&&(t=t.toLowerCase()),this.tokenization){case"word":return this.wordTokenize(t);case"byte_pair":return this.bytePairTokenize(t);default:throw new Error('KeyedVector tokenization setting must be "word" or "byte_pair"')}}}};export{U as featurizers,C as models,E as slots,O as tools,V as utils};
//# sourceMappingURL=index.modern.js.map
