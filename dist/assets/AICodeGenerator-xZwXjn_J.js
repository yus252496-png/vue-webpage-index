import{_ as x,G as O,o as d,c as u,b as e,d as p,t as h,i as I,A as m,H,m as F,h as L,s as M,e as U,v as G,g as K,j as $,F as q,k as j,w as A}from"./index-BcUDsYpJ.js";import{M as z}from"./MainLayout-B4-05yGi.js";const E={DEEPSEEK_API_KEY:"sk-e57340e28ba149d480cc1514213dfae1",DEEPSEEK_API_URL:"https://api.deepseek.com/v1/chat/completions",DEEPSEEK_MODEL:"deepseek-coder",MAX_TOKENS:5e3,TEMPERATURE:.7};async function B(y,r,o,l){var n;try{const i=await fetch(E.DEEPSEEK_API_URL,{method:"POST",headers:{Authorization:`Bearer ${E.DEEPSEEK_API_KEY}`,"Content-Type":"application/json"},body:JSON.stringify({model:E.DEEPSEEK_MODEL,messages:[{role:"system",content:"你是一个专业的前端开发工程师，擅长使用各种前端技术栈。请根据用户的需求生成完整的前端代码，包括HTML、CSS和JavaScript。确保代码可以直接运行，并且具有良好的可读性和可维护性。请生成完整的代码，不要省略任何部分。"},{role:"user",content:y}],temperature:E.TEMPERATURE,max_tokens:E.MAX_TOKENS,stream:!0})});if(!i.ok){const a=await i.json();throw new Error(((n=a.error)==null?void 0:n.message)||`API请求失败: ${i.status}`)}await Y(i,r,o,l)}catch(i){if(l)l(i);else throw console.error("API请求失败:",i),i}}async function Y(y,r,o,l){const n=y.body.getReader(),i=new TextDecoder;let a="";const b=async()=>{try{const{done:f,value:k}=await n.read();if(f){o&&o();return}a+=i.decode(k,{stream:!0});const _=a.split(`
`);a=_.pop();for(const g of _)if(g.trim()!==""&&g.startsWith("data: ")){const w=g.substring(6);if(w==="[DONE]"){o&&o();return}try{const v=JSON.parse(w);if(v.choices&&v.choices[0]&&v.choices[0].delta&&v.choices[0].delta.content){const S=v.choices[0].delta.content;r&&r(S)}}catch(v){console.error("解析流式数据失败:",v)}}b()}catch(f){l?l(f):console.error("流式处理错误:",f)}};b()}const J={class:"typewriter-container"},V={key:0,class:"typewriter-loading"},W={__name:"TypewriterEffect",props:{content:{type:String,default:""},loading:{type:Boolean,default:!1},delay:{type:Number,default:0}},setup(y){const r=y,o=m(""),l=m(null),n=()=>{H(()=>{l.value&&(l.value.scrollTop=l.value.scrollHeight)})};return O(()=>r.content,i=>{if(r.delay>0){o.value="";let a=0;const b=setInterval(()=>{a<i.length?(o.value+=i.charAt(a),a++,n()):clearInterval(b)},r.delay)}else o.value=i,n()},{immediate:!0}),(i,a)=>(d(),u("div",J,[e("pre",{class:"cyber-code",ref_key:"codeElement",ref:l},[a[0]||(a[0]=p("      ",-1)),e("code",null,h(o.value),1),a[1]||(a[1]=p(`
    `,-1))],512),y.loading?(d(),u("div",V,[...a[2]||(a[2]=[e("div",{class:"loading-dots"},[e("span"),e("span"),e("span")],-1)])])):I("",!0)]))}},X=x(W,[["__scopeId","data-v-a19b0a64"]]),Q={class:"cyber-ai-generator"},Z={class:"cyber-actions-bar"},ee={class:"actions-left"},te=["disabled"],se={class:"btn-text"},oe={key:0,class:"btn-glitch"},ne={class:"actions-right"},ae=["disabled"],le=["disabled"],ie=["disabled"],re={class:"ai-main-content"},ce={class:"cyber-panel input-panel"},de={class:"input-content"},ue={class:"input-wrapper"},ve={class:"cyber-panel result-panel"},pe={class:"panel-header"},me={class:"record-count"},be={class:"count-value"},ye={class:"result-content"},he={key:0,class:"code-container"},fe={key:1,class:"empty-state"},ge={class:"history-content"},Ee={class:"history-actions-top"},_e=["disabled"],we={key:0,class:"history-list"},ke=["onClick"],Se={class:"history-item-header"},Ie={class:"history-time"},Ce={class:"history-actions"},Te=["onClick"],Ae=["onClick"],xe={class:"history-prompt"},Re={class:"history-code-preview"},Ne={key:1,class:"empty-history"},Pe={__name:"AICodeGenerator",setup(y){M("isFullscreen",m(!1));const r=m(""),o=m(""),l=m(!1),n=m([]),i=m(""),a=m(!1),b=()=>{a.value=!a.value},f=async()=>{if(r.value.trim()){l.value=!0,o.value="";try{console.log("开始生成代码..."),await B(r.value,s=>{o.value+=s},()=>{console.log("代码生成完成"),k()},s=>{console.error("生成代码失败:",s),alert(`生成代码失败: ${s.message}
请检查 API Key 是否正确`)})}catch(s){console.error("生成代码失败:",s),alert(`生成代码失败: ${s.message}
请检查 API Key 是否正确`)}finally{l.value=!1}}},k=()=>{const s={id:Date.now(),prompt:r.value,code:o.value,timestamp:new Date().toISOString()};n.value.unshift(s),n.value.length>20&&(n.value=n.value.slice(0,20));try{localStorage.setItem("aiCodeGeneratorHistory",JSON.stringify(n.value))}catch(t){console.error("保存历史记录失败:",t)}},_=()=>{try{const s=localStorage.getItem("aiCodeGeneratorHistory");s&&(n.value=JSON.parse(s))}catch(s){console.error("加载历史记录失败:",s),n.value=[]}},g=s=>{r.value=s.prompt,o.value=s.code},w=()=>{confirm("确定要清空历史记录吗？")&&(n.value=[],localStorage.removeItem("aiCodeGeneratorHistory"))},v=s=>{confirm("确定要删除这条历史记录吗？")&&(n.value=n.value.filter(t=>t.id!==s),localStorage.setItem("aiCodeGeneratorHistory",JSON.stringify(n.value)))},S=()=>{o.value&&(i.value=o.value,C())},R=s=>{i.value=s.code,C()},C=()=>{const s=window.open("","_blank","fullscreen=yes");if(!s){alert("请允许弹出窗口权限");return}s.document.write(`
    <!DOCTYPE html>
    <html lang="zh-CN">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>AI 生成代码预览</title>
      <style>
        body {
          margin: 0;
          padding: 20px;
          font-family: Arial, sans-serif;
          background: white;
        }
        .preview-container {
          max-width: 1200px;
          margin: 0 auto;
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          padding-bottom: 10px;
          border-bottom: 1px solid #eee;
        }
        .title {
          font-size: 18px;
          font-weight: bold;
        }
        .close-btn {
          background: #ff4d4f;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
        }
        .close-btn:hover {
          background: #ff7875;
        }
        .content {
          min-height: 80vh;
        }
      </style>
    </head>
    <body>
      <div class="preview-container">
        <div class="header">
          <div class="title">AI 生成代码预览</div>
          <button class="close-btn" onclick="window.close()">关闭</button>
        </div>
        <div class="content">
          ${i.value}
        </div>
      </div>
    </body>
    </html>
  `),s.document.close(),s.document.documentElement.requestFullscreen?s.document.documentElement.requestFullscreen():s.document.documentElement.mozRequestFullScreen?s.document.documentElement.mozRequestFullScreen():s.document.documentElement.webkitRequestFullscreen?s.document.documentElement.webkitRequestFullscreen():s.document.documentElement.msRequestFullscreen&&s.document.documentElement.msRequestFullscreen()},N=s=>new Date(s).toLocaleString("zh-CN",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"});_();const P=()=>{o.value&&(navigator.clipboard.writeText(o.value),alert("代码已复制到剪贴板"))},D=()=>{if(!o.value)return;const s=new Blob([o.value],{type:"text/html"}),t=URL.createObjectURL(s),c=document.createElement("a");c.href=t,c.download="ai-generated-code.html",document.body.appendChild(c),c.click(),document.body.removeChild(c),URL.revokeObjectURL(t)};return(s,t)=>(d(),F(z,{title:"AI 代码生成器"},{default:L(()=>[e("div",Q,[t[19]||(t[19]=e("div",{class:"scan-line"},null,-1)),t[20]||(t[20]=e("div",{class:"cyber-header-section"},[e("div",{class:"header-glow"}),e("div",{class:"header-content"},[e("div",{class:"header-top"},[e("span",{class:"system-tag"},"AI_DEVELOPMENT"),e("span",{class:"status-indicator online"},"SYSTEM_READY")]),e("h2",{class:"cyber-title"},[e("span",{class:"title-icon"},"◊"),p(" AI 前端代码生成器 "),e("span",{class:"title-icon"},"◊")]),e("p",{class:"cyber-subtitle"},[e("span",{class:"blink"},"["),p(" DeepSeek API // 智能代码生成 // 实时预览 "),e("span",{class:"blink"},"]")])]),e("div",{class:"corner-decoration tl"}),e("div",{class:"corner-decoration tr"}),e("div",{class:"corner-decoration bl"}),e("div",{class:"corner-decoration br"})],-1)),e("div",Z,[e("div",ee,[e("button",{class:"cyber-btn cyber-btn-primary",onClick:f,disabled:l.value||!r.value.trim()},[t[1]||(t[1]=e("span",{class:"btn-icon"},"◉",-1)),e("span",se,h(l.value?"GENERATING...":"生成代码"),1),l.value?(d(),u("div",oe)):I("",!0)],8,te)]),e("div",ne,[e("button",{class:"cyber-btn cyber-btn-small cyber-btn-success",onClick:P,disabled:!o.value},[...t[2]||(t[2]=[e("span",{class:"btn-icon"},"◉",-1),p(" 复制 ",-1)])],8,ae),e("button",{class:"cyber-btn cyber-btn-small cyber-btn-info",onClick:D,disabled:!o.value},[...t[3]||(t[3]=[e("span",{class:"btn-icon"},"▼",-1),p(" 下载 ",-1)])],8,le),e("button",{class:"cyber-btn cyber-btn-small",onClick:S,disabled:!o.value},[...t[4]||(t[4]=[e("span",{class:"btn-icon"},"◊",-1),p(" 预览 ",-1)])],8,ie),e("button",{class:"cyber-btn cyber-btn-small cyber-btn-warning",onClick:b},[t[5]||(t[5]=e("span",{class:"btn-icon"},"◈",-1)),p(" "+h(a.value?"关闭历史记录":"查看历史记录"),1)])])]),e("div",re,[e("div",ce,[t[7]||(t[7]=e("div",{class:"panel-header"},[e("div",{class:"header-icon"},"◈"),e("h3",null,"输入需求 // INPUT_REQUIREMENTS"),e("div",{class:"header-line"})],-1)),e("div",de,[e("div",ue,[U(e("textarea",{"onUpdate:modelValue":t[0]||(t[0]=c=>r.value=c),class:"cyber-textarea",placeholder:"请输入您的前端需求，例如：'做一个登录页面，带 Tailwind'",rows:"8"},null,512),[[G,r.value]]),t[6]||(t[6]=e("div",{class:"textarea-glow"},null,-1))])])]),e("div",ve,[e("div",pe,[t[9]||(t[9]=e("div",{class:"header-icon"},"◈",-1)),t[10]||(t[10]=e("h3",null,"生成结果 // GENERATION_RESULTS",-1)),t[11]||(t[11]=e("div",{class:"header-line"},null,-1)),e("div",me,[t[8]||(t[8]=e("span",{class:"count-label"},"STATUS:",-1)),e("span",be,h(l.value?"GENERATING...":"READY"),1)])]),e("div",ye,[o.value?(d(),u("div",he,[K(X,{content:o.value,loading:l.value},null,8,["content","loading"])])):(d(),u("div",fe,[...t[12]||(t[12]=[e("div",{class:"empty-icon"},"◉",-1),e("p",{class:"empty-text"},"输入需求并点击生成按钮开始",-1)])]))])])]),a.value?(d(),u("div",{key:0,class:"history-panel-overlay",onClick:b})):I("",!0),e("div",{class:$(["history-panel",{show:a.value}])},[e("div",{class:"history-panel-header"},[t[13]||(t[13]=e("div",{class:"header-icon"},"◈",-1)),t[14]||(t[14]=e("h3",null,"历史记录 // HISTORY",-1)),e("button",{class:"close-btn",onClick:b},"◊")]),e("div",ge,[e("div",Ee,[e("button",{class:"cyber-btn cyber-btn-small cyber-btn-warning",onClick:w,disabled:n.value.length===0},[...t[15]||(t[15]=[e("span",{class:"btn-icon"},"◊",-1),p(" 清空 ",-1)])],8,_e)]),n.value.length>0?(d(),u("div",we,[(d(!0),u(q,null,j(n.value,c=>(d(),u("div",{key:c.id,class:"history-item",onClick:T=>g(c)},[e("div",Se,[e("span",Ie,h(N(c.timestamp)),1),e("div",Ce,[e("button",{class:"history-btn",onClick:A(T=>R(c),["stop"])},[...t[16]||(t[16]=[e("span",{class:"btn-icon"},"◊",-1)])],8,Te),e("button",{class:"history-btn delete-btn",onClick:A(T=>v(c.id),["stop"])},[...t[17]||(t[17]=[e("span",{class:"btn-icon"},"✕",-1)])],8,Ae)])]),e("div",xe,h(c.prompt),1),e("div",Re,h(c.code.substring(0,100))+"...",1)],8,ke))),128))])):(d(),u("div",Ne,[...t[18]||(t[18]=[e("div",{class:"empty-icon"},"◉",-1),e("p",{class:"empty-text"},"暂无历史记录",-1)])]))])],2)])]),_:1}))}},He=x(Pe,[["__scopeId","data-v-50a17b70"]]);export{He as default};
