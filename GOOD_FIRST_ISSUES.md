# GOOD_FIRST_ISSUES.md
## 红尘灵境 / Hongchen Lingjing
### Good First Issues
**Version**: v1.0
**Effective Date**: 2026-01-21
**Scope**: All contributors, especially beginners, zero-basis participants

---
## 一、新手友好任务 / Good First Issues
### 🔹 L0 零技术 · 人人可参与 / Zero Tech · Everyone Can Do
| 任务内容 / Task Content | 所需技能 / Required Skills | 完成标准 / Completion Criteria |
|-------------------------|----------------------------|--------------------------------|
| 校对项目文档（中英文）错别字、标点、语句通顺度<br>Proofread typos, punctuation and fluency in Chinese/English project documents | 基础中英读写能力<br>Basic Chinese/English reading & writing | 提交PR标注修改位置，修改后无错漏、语句通顺<br>Submit PR with modified positions, no typos or awkward sentences |
| 为技能提交模板补充1-2份完整填写示例（如剪纸、Git基础）<br>Add 1-2 complete examples to the skill submission template (e.g., paper cutting, basic Git) | 熟悉任意一项技能（传统/生活/数字均可）<br>Familiar with any skill (traditional/life/digital) | 示例贴合模板规范，步骤清晰、信息完整<br>Examples match template rules, clear steps and complete information |
| 征集赛博国风创意素材（社区标语、技能场景名、虚拟形象思路）<br>Collect cyber-Chinese creative materials (community slogans, skill scene names, avatar ideas) | 创意构思、文字表达<br>Creative thinking & writing | 提交≥10条素材，贴合技能传承核心定位<br>Submit ≥10 materials in line with the core positioning of skill inheritance |
| 整理全球技能传承优质资源（非遗网站、教学视频、开源3D资产库链接）<br>Sort high-quality global skill inheritance resources (intangible cultural heritage websites, teaching videos, open source 3D asset library links) | 网络检索、简单分类整理<br>Web search & basic classification | 按品类分栏整理，每类≥5个有效链接，提交Markdown文档<br>Classified by category, ≥5 valid links per category, submit Markdown document |

### 🔹 L1 基础操作 · 简单上手 / Basic Operation · Easy to Start
| 任务内容 / Task Content | 所需技能 / Required Skills | 完成标准 / Completion Criteria |
|-------------------------|----------------------------|--------------------------------|
| 压缩仓库静态文件（图片转webp/3D模型轻量化，单文件≤5MB）<br>Compress warehouse static files (images to webp/3D model lightweight, single file ≤5MB) | 会用基础压缩工具（TinyPNG/Blender）<br>Basic compression tools operation | 画质/模型无明显损失，体积减少≥50%，PR替换原文件<br>No obvious loss of image quality/model, volume reduced by ≥50%, replace original files via PR |
| 为仓库核心目录添加README.md（说明目录用途、文件存储/命名规范）<br>Add README.md to core warehouse directories (explain directory purpose, file storage/naming rules) | 基础GitHub操作、简单Markdown语法<br>Basic GitHub operation & simple Markdown | 每个核心目录1份README，说明清晰、规范统一<br>1 README for each core directory, clear explanation and unified rules |
| 优化前端页面移动端适配细节（按钮大小、文字行间距、页面边距）<br>Optimize mobile adaptation details of front-end pages (button size, text line spacing, page margins) | 基础HTML/CSS（简单样式调整）<br>Basic HTML/CSS (simple style adjustment) | 移动端显示正常、操作无卡顿，适配主流手机型号<br>Normal display and smooth operation on mobile, compatible with mainstream phone models |

### 🔹 L2 轻量技术 · 入门开发 / Lightweight Tech · Beginner Development
| 任务内容 / Task Content | 所需技能 / Required Skills | 完成标准 / Completion Criteria |
|-------------------------|----------------------------|--------------------------------|
| 为技能展示页添加简单样式美化（赛博国风配色、技能卡片hover效果）<br>Add simple style beautification to the skill display page (cyber-Chinese color scheme, skill card hover effect) | 基础CSS语法<br>Basic CSS syntax | 样式贴合项目美学，无视觉违和，代码简洁无冗余<br>Style fits project aesthetics, no visual discomfort, concise code without redundancy |
| 编写简单GitHub Actions脚本（文档提交自动查错、图片自动压缩）<br>Write simple GitHub Actions scripts (automatic error checking for document submission, automatic image compression) | 基础YAML语法<br>Basic YAML syntax | 脚本运行正常，可自动完成指定操作，提交至.github/workflows/<br>Script runs normally, can automatically complete specified operations, submit to .github/workflows/ |

---
## 二、专项任务：项目文件操作员 / Special Task: Project File Operator
### 📌 任务背景 / Task Background
解决项目仓库**文件上传卡顿、管理效率低**问题，专人负责文件全流程运维，直连项目发起人，承接文件相关所有工作，降低发起人操作成本。
Solve the problems of **file upload lag and low management efficiency** in the project warehouse, assign a special person to be responsible for the whole process of file operation and maintenance, connect directly with the project initiator, undertake all file-related work, and reduce the initiator's operation cost.

### 📋 核心职责 / Core Responsibilities
1. **文件代上传**：为发起人代传仓库文件（文档/图片/3D素材等），解决上传卡顿问题，高效完成仓库文件更新；<br>File upload on behalf: Upload warehouse files (documents/images/3D assets, etc.) on behalf of the initiator, solve upload lag problems, and complete warehouse file updates efficiently;
2. **仓库文件管理**：统一维护仓库文件结构，清理冗余文件，规范文件命名/存储格式，避免目录杂乱；<br>Warehouse file management: Uniformly maintain the warehouse file structure, clean up redundant files, standardize file naming/storage formats, and avoid messy directories;
3. **文件轻量化处理**：对所有待上传文件做压缩/格式优化（图片/3D/视频），严格控制单文件体积≤5MB，提升仓库访问速度；<br>File lightweight processing: Compress/optimize the format of all files to be uploaded (images/3D/videos), strictly control the single file size ≤5MB, and improve warehouse access speed;
4. **文件相关PR审核**：快速审核社区贡献者的文件提交PR，核对格式/规范，及时合并合规文件；<br>File-related PR review: Quickly review file submission PRs from community contributors, check formats/rules, and merge compliant files in a timely manner;
5. **核心文件备份**：定期对项目核心文档、素材文件做备份，防止文件丢失/误删。<br>Core file backup: Regularly back up the project's core documents and material files to prevent file loss/accidental deletion.

### 📌 任职要求 / Requirements
1. 熟练掌握**GitHub仓库基础操作**（文件上传/PR提交/分支管理/目录编辑）；<br>Proficient in **basic GitHub warehouse operations** (file upload/PR submission/branch management/directory editing);
2. 会使用基础文件处理工具（图片/3D压缩、格式转换），能高效处理各类静态文件；<br>Can use basic file processing tools (image/3D compression, format conversion) and efficiently process various static files;
3. 每日可投入**1-2小时**在线时间，及时响应发起人文件处理需求，细心、负责、执行力强；<br>Can devote **1-2 hours** of online time every day, respond to the initiator's file processing needs in a timely manner, and be careful, responsible and with strong execution;
4. 无专业技术背景要求，零基础可参与，有开源项目文件管理/运维经验者优先。<br>No professional technical background required, zero basis is acceptable, open source project file management/operation experience is preferred.

### 🎯 任务权益 / Task Rights & Interests
1. 完成首次工作后，直接收录至《HALL_OF_FAME.md》**核心贡献者**板块，标注「项目文件操作员」专属身份；<br>After completing the first work, be directly included in the **Core Contributor** section of 《HALL_OF_FAME.md》 with the exclusive identity of "Project File Operator";
2. 获得项目仓库**写权限**，成为项目核心运维成员，参与项目基础决策；<br>Obtain the **write permission** of the project warehouse, become a core operation and maintenance member of the project, and participate in basic project decision-making;
3. 与项目发起人建立**专属沟通渠道**，优先对接项目最新需求，享受后续项目生态发展相关激励。<br>Establish an **exclusive communication channel** with the project initiator, connect with the latest project needs first, and enjoy relevant incentives for the subsequent development of the project ecosystem.

### 📮 报名方式 / Application Method
在项目GitHub Issues提交报名帖，标题格式统一为：<br>
Submit an application post in the project GitHub Issues with the unified title format:
### 【文件操作员报名】- GitHub ID - 个人简介
**报名内容包含 / Application content includes**：
1. GitHub ID + 常用联系方式（微信/邮箱/Discord）；<br>GitHub ID + Common contact information (WeChat/Email/Discord);
2. GitHub仓库操作/文件管理相关经验描述；<br>Description of GitHub warehouse operation/file management experience;
3. 每日可投入在线时间及可承接的具体工作内容。<br>Daily available online time and specific work content that can be undertaken.

> 项目临时维护小组将在24小时内回复，沟通确认后即可上岗开展工作。<br>
> The project temporary maintenance team will reply within 24 hours, and you can start working after communication and confirmation.

---
## 三、任务认领方式 / Task Claim Method
1. 所有任务均可在GitHub Issues提交认领帖，标题格式：**【任务认领】- 任务等级/名称 - GitHub ID**；<br>All tasks can be claimed by submitting a post in GitHub Issues with the title format: **[Task Claim] - Task Level/Name - GitHub ID**;
2. 完成任务后直接提交PR，PR标题标注**【新手贡献】**，便于维护人员快速审核；<br>After completing the task, submit a PR directly with the label **[Newbie Contribution]** in the PR title for quick review by maintainers;
3. 同一任务仅限1人认领，先到先得，维护人员将实时更新任务状态。<br>Each task is limited to one person, first come first served, and maintainers will update the task status in real time.

---
## 四、贡献奖励 / Contribution Rewards
1. **首次贡献**：完成任意1项新手任务，即可解锁《HALL_OF_FAME.md》「新芽贡献者」身份，获得专属凭证编号；<br>First contribution: Complete any 1 newbie task to unlock the "New Bud Contributor" identity in 《HALL_OF_FAME.md》 and get an exclusive certificate number;
2. **累计贡献**：完成≥3项任务，升级为「成长贡献者」，享有PR优先审核权，获得社区专属徽章；<br>Cumulative contribution: Complete ≥3 tasks to upgrade to "Growing Contributor", enjoy PR priority review rights and get an exclusive community badge;
3. **核心贡献**：完成L2技术任务/担任项目文件操作员，直接收录为「核心贡献者」，参与项目技术与运营决策。<br>Core contribution: Complete L2 technical tasks/serve as a project file operator to be directly included as a "Core Contributor" and participate in project technical and operational decision-making.

---
**Maintainer**：Hongchen Lingjing Temporary Maintenance Group
**维护方**：红尘灵境项目临时维护小组
**2026-01-21**
