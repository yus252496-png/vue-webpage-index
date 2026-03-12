<template>
  <div class="personal-resume" :class="currentStyle">
    <!-- 风格切换按钮 -->
    <div class="style-switcher" v-if="!isStyleMenuOpen">
      <button class="style-btn" @click="toggleStyleMenu">
        <span class="btn-icon">🎨</span>
        <span class="btn-text">风格</span>
      </button>
    </div>
    
    <!-- 风格选择菜单 -->
    <div class="style-menu" v-if="isStyleMenuOpen">
      <div class="menu-header">
        <h3>选择风格</h3>
        <button class="close-btn" @click="toggleStyleMenu">×</button>
      </div>
      <div class="menu-content">
        <div 
          v-for="style in availableStyles" 
          :key="style.id"
          class="style-option"
          :class="{ active: currentStyle === style.id }"
          @click="changeStyle(style.id)"
        >
          <div class="style-preview" :class="style.id"></div>
          <span class="style-name">{{ style.name }}</span>
        </div>
      </div>
    </div>
    <!-- Header -->
    <header class="resume-header">
      <div class="header-content">
        <div class="name-section">
          <h1>余宏果</h1>
          <div class="title-badge">高级前端开发工程师 | 技术管理 | AI应用专家</div>
        </div>
        <div class="contact-meta">
          <div class="meta-info">
            <div class="meta-item">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              10年工作经验
            </div>
            <div class="meta-item">
              <a href="https://maps.google.com/maps?q=江西赣州" target="_blank" rel="noopener noreferrer" style="display: flex; align-items: center; gap: 8px; color: inherit; text-decoration: none;">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                江西赣州
              </a>
            </div>
            <div class="meta-item">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path></svg>
              本科
            </div>
          </div>
          <div class="contact-info">
            <div class="contact-grid">
              <div class="contact-item">
                <a href="tel:17688939632" style="display: flex; align-items: center; gap: 8px; color: inherit; text-decoration: none;">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                  17688939632
                </a>
              </div>
              <div class="contact-item">
                <a href="mailto:17688939632@163.com" style="display: flex; align-items: center; gap: 8px; color: inherit; text-decoration: none;">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                  17688939632@163.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <main class="resume-content">
      <!-- Professional Summary -->
      <section class="resume-section">
        <h2 class="section-title">个人优势</h2>
        <div class="summary">
          <p>拥有<span class="highlight">10年前端开发经验</span>及<span class="highlight">3年技术团队管理经验</span>，擅长从0到1搭建前端架构及技术选型。精通Vue/React全栈开发，具备大型电商系统、金融信贷平台、AI智能化系统的全周期交付能力。紧跟技术前沿，<span class="highlight">熟练运用Trae、Cursor、Claude等AI辅助工具</span>提升开发效率。持有<span class="highlight">PMP认证</span>，熟练运用敏捷开发方法论，擅长跨部门协作与团队梯队建设。具备全栈视野，熟悉Java/Python基础及数据库操作，能快速定位并解决前后端联调问题。</p>
        </div>
      </section>

      <!-- Skills -->
      <section class="resume-section">
        <h2 class="section-title">专业技能</h2>
        <div class="skills-container">
          <div class="skill-category">
            <h3>前端核心</h3>
            <div class="skill-tags">
              <span class="skill-tag expert">JavaScript (ES5/ES6+)</span>
              <span class="skill-tag expert">Vue 2/3 全家桶</span>
              <span class="skill-tag expert">React + Hooks</span>
              <span class="skill-tag expert">HTML5/CSS3</span>
              <span class="skill-tag">TypeScript</span>
              <span class="skill-tag">jQuery</span>
              <span class="skill-tag">微信小程序</span>
              <span class="skill-tag">Uni-app</span>
            </div>
          </div>
          <div class="skill-category">
            <h3>工程化 & 工具</h3>
            <div class="skill-tags">
              <span class="skill-tag expert">Webpack</span>
              <span class="skill-tag">Vite</span>
              <span class="skill-tag">Git/SVN</span>
              <span class="skill-tag">CI/CD (Jenkins/GitLab)</span>
              <span class="skill-tag">LESS/SCSS</span>
              <span class="skill-tag">npm/Yarn</span>
            </div>
          </div>
          <div class="skill-category">
            <h3>AI 辅助开发 🔥</h3>
            <div class="skill-tags">
              <span class="skill-tag ai">Trae</span>
              <span class="skill-tag ai">Cursor</span>
              <span class="skill-tag ai">Claude (VS Code)</span>
              <span class="skill-tag ai">AI代码生成</span>
              <span class="skill-tag ai">提示词工程</span>
            </div>
          </div>
          <div class="skill-category">
            <h3>后端 & 数据库</h3>
            <div class="skill-tags">
              <span class="skill-tag">Java基础</span>
              <span class="skill-tag">Python基础</span>
              <span class="skill-tag">MySQL</span>
              <span class="skill-tag">RESTful API</span>
              <span class="skill-tag">前后端联调</span>
            </div>
          </div>
          <div class="skill-category">
            <h3>项目管理</h3>
            <div class="skill-tags">
              <span class="skill-tag expert">PMP认证</span>
              <span class="skill-tag">敏捷开发(Scrum)</span>
              <span class="skill-tag">团队管理(5-8人)</span>
              <span class="skill-tag">需求评估/工时评估</span>
              <span class="skill-tag">技术面试</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Work Experience -->
      <section class="resume-section">
        <h2 class="section-title">工作经历</h2>
        <div class="timeline">
          <div class="timeline-item">
            <div class="timeline-header">
              <div class="company-info">
                <h3>软通动力信息技术有限公司（超聚变项目）</h3>
                <div class="position">高级前端开发工程师</div>
              </div>
              <span class="duration">2022.09 - 至今</span>
            </div>
            <p class="company-desc">服务华为、超聚变等大客户，参与AI智能化系统及低代码平台从0到1建设</p>
            <ul class="responsibilities">
              <li>主导一站式项目前端架构设计，封装可复用基础组件库，提升团队开发效率30%</li>
              <li>负责AI招投标系统的语音识别与流式输出模块开发，实现浏览器录音与Fetch API流式数据处理</li>
              <li>参与低代码平台开发，设计可拖拽表单与商品展示组件，支持客户定制化需求</li>
              <li>运用Trae、Cursor等AI工具辅助代码生成与重构，提升需求交付速度40%</li>
              <li>参与公司人才梯队建设，负责技术面试与新人培养，年均面试候选人20+</li>
            </ul>
            <div class="achievement">
              <strong>技术亮点：</strong>基于AI辅助工具实现招投标文件智能生成功能，采用打字机效果展示流式数据，用户体验显著提升
            </div>
          </div>

          <div class="timeline-item">
            <div class="timeline-header">
              <div class="company-info">
                <h3>怡丰云智科技（怡亚通集团）</h3>
                <div class="position">技术副经理 / 前端组长</div>
              </div>
              <span class="duration">2021.10 - 2022.08</span>
            </div>
            <p class="company-desc">集团子公司，服务怡亚通及政府部门，提供电商及政务解决方案</p>
            <ul class="responsibilities">
              <li>统筹5-8人前端团队，制定开发规范与代码审查机制，项目交付准时率提升25%</li>
              <li>主导怡通云电商平台（PC+APP+小程序）技术选型与架构设计，支撑供应链上下游交易</li>
              <li>建立生产问题应急响应机制，担任"消防队长"角色，客户满意度提升至95%</li>
              <li>推动前端技术栈升级，引入Vue3+TypeScript，降低维护成本40%</li>
            </ul>
            <div class="achievement">
              <strong>关键成就：</strong>带领团队完成大型电商系统重构，页面加载速度提升50%，获客户书面表彰
            </div>
          </div>

          <div class="timeline-item">
            <div class="timeline-header">
              <div class="company-info">
                <h3>软通动力信息技术有限公司</h3>
                <div class="position">高级前端开发工程师</div>
              </div>
              <span class="duration">2020.04 - 2021.10</span>
            </div>
            <p class="company-desc">华为海思芯片系统开发项目，涉及PC端及WeLink小程序</p>
            <ul class="responsibilities">
              <li>并行管理3个项目（Vue+jQuery+小程序），确保多产品线按时交付</li>
              <li>解决多浏览器兼容性问题，支持Chrome、Safari、IE11等主流浏览器</li>
              <li>组织前端技术分享会10+场，提升团队整体技术水平</li>
              <li>参与集团招聘，建立前端岗位胜任力模型，优化面试流程</li>
            </ul>
          </div>

          <div class="timeline-item">
            <div class="timeline-header">
              <div class="company-info">
                <h3>佰仟金融集团</h3>
                <div class="position">前端开发组长</div>
              </div>
              <span class="duration">2018.10 - 2020.03</span>
            </div>
            <p class="company-desc">互联网金融领域，服务1800万用户，涉及消费贷、个人信贷业务</p>
            <ul class="responsibilities">
              <li>主导技术栈从jQuery向Vue迁移，重构3大业务线系统，代码可维护性显著提升</li>
              <li>负责个人信贷、消费贷、后台管理系统的前端迭代，采用敏捷开发模式（1-2周/迭代）</li>
              <li>带领团队完成高保真页面还原，确保UI还原度达98%以上</li>
              <li>建立前端开发规范与组件库，新人上手时间缩短50%</li>
            </ul>
          </div>

          <div class="timeline-item">
            <div class="timeline-header">
              <div class="company-info">
                <h3>深圳市思朔创意广告科技（锦龙集团）</h3>
                <div class="position">中级前端开发工程师</div>
              </div>
              <span class="duration">2017.04 - 2018.10</span>
            </div>
            <p class="company-desc">服务集团及4S店，涉及电商及企业管理系统开发</p>
            <ul class="responsibilities">
              <li>参与集团管理系统（用户/车辆/物料/财务）全周期开发，项目周期6个月，按时交付</li>
              <li>配合产品经理完成需求梳理与原型设计，提升跨部门协作效率</li>
              <li>编写技术文档与培训材料，为集团员工提供系统使用培训</li>
            </ul>
          </div>

          <div class="timeline-item">
            <div class="timeline-header">
              <div class="company-info">
                <h3>赣州市卓远高新科技有限公司</h3>
                <div class="position">产品助理 / Web前端开发</div>
              </div>
              <span class="duration">2015.07 - 2017.04</span>
            </div>
            <p class="company-desc">本土电商平台及外包服务</p>
            <ul class="responsibilities">
              <li>参与土购网电商平台前端开发，负责首页及商品详情页性能优化</li>
              <li>协助产品经理对接甲方需求，进行技术可行性分析</li>
              <li>定期客户回访，收集反馈并推动产品优化，续约率提升15%</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- Projects -->
      <section class="resume-section">
        <h2 class="section-title">重点项目</h2>
        
        <div class="project-card">
          <div class="project-header">
            <div class="project-name">招投标AI生成系统（超聚变）</div>
            <div class="tech-stack">
              <span class="tech-item ai">AI集成</span>
              <span class="tech-item">WebRTC</span>
              <span class="tech-item">Fetch API Stream</span>
              <span class="tech-item">Vue 3</span>
              <span class="tech-item">TypeScript</span>
            </div>
          </div>
          <p class="project-desc">基于AI技术的智能招投标辅助平台，通过语音识别与提示词工程，自动生成招投标文件模板。采用流式输出技术实现打字机效果，支持实时预览与模块选择。</p>
          <div class="project-role">
            <strong>职责：</strong>核心前端开发 | 实现浏览器录音功能与音频流传输，开发Fetch API流式数据接收与打字机效果展示模块，集成AI生成接口，确保大文件生成的流畅用户体验。
          </div>
        </div>

        <div class="project-card">
          <div class="project-header">
            <div class="project-name">低代码平台（超聚变）</div>
            <div class="tech-stack">
              <span class="tech-item">低代码</span>
              <span class="tech-item">Vue 3</span>
              <span class="tech-item">组件化设计</span>
              <span class="tech-item">拖拽引擎</span>
            </div>
          </div>
          <p class="project-desc">面向企业客户的可视化应用搭建平台，支持商品展示、表单提交等常见业务场景的可拖拽配置，大幅降低开发门槛与交付周期。</p>
          <div class="project-role">
            <strong>职责：</strong>前端核心开发 | 设计公共组件体系与可扩展插件机制，开发系统后台管理功能，制定组件开发规范，确保平台灵活性与稳定性。
          </div>
        </div>

        <div class="project-card">
          <div class="project-header">
            <div class="project-name">怡通云电商平台（怡亚通）</div>
            <div class="tech-stack">
              <span class="tech-item">Vue 2/3</span>
              <span class="tech-item">React</span>
              <span class="tech-item">微信小程序</span>
              <span class="tech-item">Node.js</span>
            </div>
          </div>
          <p class="project-desc">为怡亚通集团打造的大型B2B电商平台，覆盖PC端、APP端及小程序端，支撑供应链上下游交易，日均PV超百万。</p>
          <div class="project-role">
            <strong>职责：</strong>技术副经理/前端组长 | 主导技术架构设计，制定开发计划，协调10+人研发团队，建立组件库与开发规范，确保多终端体验一致性；处理生产环境问题，维护客户关系。
          </div>
        </div>

        <div class="project-card">
          <div class="project-header">
            <div class="project-name">海思芯片生产管理系统（华为）</div>
            <div class="tech-stack">
              <span class="tech-item">Vue</span>
              <span class="tech-item">jQuery</span>
              <span class="tech-item">WeLink小程序</span>
              <span class="tech-item">ECharts</span>
            </div>
          </div>
          <p class="project-desc">华为海思委托开发的生产销售电子化流程系统，实现芯片全生命周期管理，对接企业微信及WeLink移动办公平台。</p>
          <div class="project-role">
            <strong>职责：</strong>核心前端开发 | 负责PC端及移动端开发，解决复杂表单校验与大数据表格渲染性能问题，实现多浏览器兼容（含IE11）。
          </div>
        </div>

        <div class="project-card">
          <div class="project-header">
            <div class="project-name">佰仟金融信贷业务系统</div>
            <div class="tech-stack">
              <span class="tech-item">Vue</span>
              <span class="tech-item">Vuex</span>
              <span class="tech-item">Axios</span>
              <span class="tech-item">Element UI</span>
            </div>
          </div>
          <p class="project-desc">面向个人及商户的信贷服务平台，包含APP端、H5及后台管理系统，采用敏捷开发模式快速响应业务变化。</p>
          <div class="project-role">
            <strong>职责：</strong>前端组长 | 主导技术栈从jQuery向Vue迁移，搭建Vue-cli工程化体系，封装通用请求拦截与权限控制模块，带领团队完成3大产品线重构。
          </div>
        </div>
      </section>

      <!-- Education -->
      <section class="resume-section">
        <h2 class="section-title">教育背景 & 认证</h2>
        <div class="edu-item">
          <div class="edu-main">
            <h4>九江学院</h4>
            <p>设计专业 · 本科 | 2011.09 - 2015.07</p>
          </div>
        </div>
        <div class="edu-item">
          <div class="edu-main">
            <h4>项目管理专业人士资格认证</h4>
            <p>PMP认证 | 具备瀑布式与敏捷开发实战经验</p>
          </div>
          <span class="cert-badge">
            <svg width="14" height="14" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
            PMP Certified
          </span>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  name: 'PersonalResume',
  data() {
    return {
      isStyleMenuOpen: false,
      currentStyle: 'cyberpunk',
      availableStyles: [
        {
          id: 'cyberpunk',
          name: '赛博朋克'
        },
        {
          id: 'minimal',
          name: '极简风格'
        },
        {
          id: 'classic',
          name: '经典风格'
        },
        {
          id: 'modern',
          name: '现代风格'
        },
        {
          id: 'comic',
          name: '漫画风格'
        },
        {
          id: 'sketch',
          name: '简笔风格'
        }
      ]
    }
  },
  methods: {
    toggleStyleMenu() {
      this.isStyleMenuOpen = !this.isStyleMenuOpen
    },
    changeStyle(styleId) {
      this.currentStyle = styleId
      this.isStyleMenuOpen = false
    }
  }
}
</script>

<style scoped>
@import '../styles/resume.css';
@import '../styles/resume-styles.css';
</style>