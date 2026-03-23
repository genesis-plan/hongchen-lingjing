## 红尘灵境 / Hongchen Lingjing 安全政策
### Security Policy
**版本 / Version**：v1.0
**生效日期 / Effective Date**：2026-01-21
**适用范围 / Scope**：本政策适用于「红尘灵境」（genesis-plan/hongchen-lingjing）开源项目所有代码仓库、线上协作空间、用户数据及相关基础设施，覆盖所有贡献者、使用者、维护者及项目关联方。

This policy applies to all code repositories, online collaboration spaces, user data and related infrastructure of the "Hongchen Lingjing" (genesis-plan/hongchen-lingjing) open-source project, covering all contributors, users, maintainers and project affiliates.

---

## 核心安全宗旨 / Core Security Purpose
「红尘灵境」以**开源共享、安全合规**为基础，致力于打造安全、可靠、可信赖的技能传承开源生态。本政策旨在明确项目安全标准、漏洞披露与处理流程、数据安全保护规范，保障项目代码、基础设施、用户信息的安全，同时兼顾开源协作的开放性与后续商业化运营的安全合规要求，维护全体社区成员与项目的合法权益。

Based on **open-source sharing and security compliance**, Hongchen Lingjing is committed to building a safe, reliable and trustworthy open-source ecosystem for skill inheritance. This policy aims to clarify the project's security standards, vulnerability disclosure and handling processes, data security protection norms, safeguard the security of project code, infrastructure and user information, and take into account the openness of open-source collaboration and the security compliance requirements of subsequent commercial operations, so as to protect the legitimate rights and interests of all community members and the project.

---

## 安全支持范围 / Supported Security Scope
本项目仅对**主分支（main/master）**及**最新发布的正式版本**提供安全维护与漏洞修复支持，非主分支、测试分支、废弃版本及第三方基于本项目二次开发的衍生版本，不在官方安全支持范围内。

The project only provides security maintenance and vulnerability fix support for the **main branch** and the **latest released official version**. Non-main branches, test branches, abandoned versions and third-party derivative versions developed based on this project are not within the scope of official security support.

### 安全支持版本 / Supported Versions
| 版本 / Version | 安全支持状态 / Security Support Status |
|----------------|----------------------------------------|
| Main (Latest)  | ✅ 受支持 / Supported                   |
| 历史正式版本 / Previous official versions | ❌ 不再支持 / Unsupported（仅关键高危漏洞可申请临时修复） |
| 测试/开发分支 / Test/Dev branches | ❌ 不支持 / Unsupported                  |

---

## 漏洞披露规范 / Vulnerability Disclosure Norms
### 可披露的安全漏洞类型 / Disclosable Vulnerability Types
社区成员可向官方报告项目中存在的各类安全漏洞，包括但不限于：
1. 代码层面：代码注入、跨站脚本（XSS）、跨站请求伪造（CSRF）、未授权访问、权限绕过、敏感信息泄露等；
2. 基础设施层面：服务器漏洞、域名解析安全、云服务配置漏洞、分布式存储安全等；
3. 数据层面：用户信息泄露、数据传输未加密、数据存储不安全等；
4. 协作层面：仓库权限配置漏洞、恶意代码提交、社区账号被盗用相关的安全隐患等。

Community members may report various security vulnerabilities in the project to the official, including but not limited to:
1. Code level: Code injection, Cross-Site Scripting (XSS), Cross-Site Request Forgery (CSRF), unauthorized access, privilege escalation, sensitive information disclosure, etc.;
2. Infrastructure level: Server vulnerabilities, domain name resolution security, cloud service configuration vulnerabilities, distributed storage security, etc.;
3. Data level: User information leakage, unencrypted data transmission, unsafe data storage, etc.;
4. Collaboration level: Repository permission configuration vulnerabilities, malicious code submission, potential security risks related to theft of community accounts, etc.

### 禁止的披露行为 / Prohibited Disclosure Behaviors
1. 未向官方报告，擅自公开项目未修复的安全漏洞，导致项目及用户遭受损失；
2. 利用发现的漏洞进行恶意攻击、盗取数据、篡改项目内容、谋取非法利益；
3. 伪造漏洞信息，恶意举报或干扰官方漏洞处理流程；
4. 泄露漏洞处理过程中的非公开信息，包括但不限于漏洞细节、修复方案、举报人信息等。

1. Disclosing unpatched security vulnerabilities of the project without reporting to the official, resulting in losses to the project and users;
2. Using discovered vulnerabilities to conduct malicious attacks, steal data, tamper with project content, and seek illegal interests;
3. Forging vulnerability information, malicious reporting or interfering with the official vulnerability handling process;
4. Disclosing non-public information during the vulnerability handling process, including but not limited to vulnerability details, repair plans, and reporter information.

---

## 漏洞上报途径与要求 / Vulnerability Reporting Channels and Requirements
### 官方上报渠道（唯一指定）/ Official Reporting Channel (Only Designated)
为保障漏洞信息的安全传输与高效处理，项目优先接受GitHub私密渠道上报，专用安全邮箱待项目推进后开通，**暂仅支持以下渠道**提交安全漏洞，不接受公共Issues、Discussions、社区聊天频道等公开渠道的漏洞上报：
- **GitHub私密漏洞提交（优先推荐）**：通过GitHub Repository的「Security > Report a vulnerability」功能提交
- **专用安全邮箱（暂未开通）**：security@hongchen-lingjing.org（项目后续将正式开通，开通后将在仓库公告更新）

To ensure the secure transmission and efficient processing of vulnerability information, the project prioritizes GitHub private channel reports, and the dedicated security email will be activated as the project progresses. **Only the following channels are supported temporarily** for submitting security vulnerabilities, and reports through public channels such as public Issues, Discussions, and community chat channels are not accepted:
- **GitHub Private Vulnerability Submission (Highly Recommended)**: Submit via the 「Security > Report a vulnerability」 function of the GitHub Repository
- **Dedicated Security Email (Not Activated Yet)**: security@hongchen-lingjing.org (Will be officially activated in the follow-up of the project, and will be updated in the repository announcement after activation)

### 上报信息要求 / Reporting Information Requirements
上报漏洞时，请提供**客观、真实、完整**的信息，便于维护团队快速核实与修复，所需信息包括：
1. 漏洞基本信息：漏洞所在模块、版本、触发路径；
2. 漏洞复现细节：详细的复现步骤、测试环境（系统、浏览器、工具等）、相关测试代码/截图/日志；
3. 漏洞影响范围：受影响的功能、数据、用户群体及可能造成的危害；
4. 漏洞修复建议（可选）：你认为可行的修复方案、技术思路；
5. 举报人信息（可选）：你的姓名/昵称、联系方式，便于维护团队反馈修复进度（将严格保密）。

When reporting a vulnerability, please provide **objective, true and complete** information to facilitate the maintenance team to quickly verify and fix it. The required information includes:
1. Basic vulnerability information: Vulnerable module, version, and trigger path;
2. Vulnerability reproduction details: Detailed reproduction steps, test environment (system, browser, tools, etc.), and relevant test code/screenshots/logs;
3. Vulnerability impact scope: Affected functions, data, user groups and possible hazards;
4. Vulnerability repair suggestions (optional): Feasible repair solutions and technical ideas you think of;
5. Reporter information (optional): Your name/nickname and contact information, to facilitate the maintenance team to feed back the repair progress (will be strictly kept confidential).

---

## 漏洞处理流程 / Vulnerability Handling Process
项目**临时维护小组**承诺对所有合规上报的漏洞进行**及时响应、高效处理、透明公示**，标准处理流程如下，全程周期根据漏洞严重程度调整；待项目核心安全维护团队组建后，将由专业团队承接全流程漏洞处理工作：
1. **接收与确认（1-2个工作日）**：维护人员在1-2个工作日内接收漏洞上报信息，完成信息核实与漏洞确认，向举报人反馈「已接收并开始处理」（若提供了联系方式）；
2. **漏洞定级（1个工作日）**：根据漏洞的危害程度、影响范围，将漏洞分为**高危、中危、低危**三个等级，确定修复优先级；
3. **修复开发（3-10个工作日）**：维护人员针对漏洞开展修复开发，高危漏洞优先处理，开发完成后进行内部测试，确保修复有效且不影响项目正常功能；
4. **修复验证（1-2个工作日）**：邀请举报人（可选）对修复方案进行验证，确认漏洞已彻底修复；
5. **版本发布与公示（即时）**：将修复代码合并至主分支，发布新版本，并在项目仓库的**Security Advisories**及社区公告渠道公示漏洞修复信息（隐去举报人隐私，不披露未修复的漏洞细节）；
6. **后续跟踪（7个工作日）**：对修复后的漏洞进行7个工作日的跟踪，确认无复现及衍生问题，完成漏洞处理闭环。

The project's **temporary maintenance group** is committed to **timely response, efficient processing and transparent announcement** for all compliantly reported vulnerabilities. The standard handling process is as follows, and the whole cycle is adjusted according to the severity of the vulnerability. After the project's core security maintenance team is established, the professional team will take over the full-process vulnerability handling work:
1. **Reception and Confirmation (1-2 working days)** : The maintenance personnel receive the vulnerability report information within 1-2 working days, complete information verification and vulnerability confirmation, and feed back "Received and started processing" to the reporter (if contact information is provided);
2. **Vulnerability Classification (1 working day)** : Classify vulnerabilities into three levels: **Critical, Medium, Low** according to the hazard degree and influence scope, and determine the repair priority;
3. **Repair Development (3-10 working days)** : The maintenance personnel carry out repair development for vulnerabilities, with critical vulnerabilities being processed first. After the development is completed, internal testing is conducted to ensure that the repair is effective and does not affect the normal functions of the project;
4. **Repair Verification (1-2 working days)** : Invite the reporter (optional) to verify the repair plan and confirm that the vulnerability has been completely fixed;
5. **Version Release and Announcement (Immediate)** : Merge the repaired code into the main branch, release a new version, and announce the vulnerability repair information in the **Security Advisories** of the project repository and community announcement channels (hiding the reporter's privacy and not disclosing the details of unpatched vulnerabilities);
6. **Subsequent Tracking (7 working days)** : Track the repaired vulnerability for 7 working days, confirm no recurrence and derivative problems, and complete the vulnerability handling closed loop.

### 漏洞等级划分标准 / Vulnerability Level Classification Standard
| 等级 / Level | 划分标准 / Classification Standard | 修复优先级 / Repair Priority | 处理周期 / Handling Cycle |
|--------------|------------------------------------|-----------------------------|--------------------------|
| 高危 / Critical | 可导致系统崩溃、未授权访问核心数据、用户信息大规模泄露、恶意代码注入的漏洞 | 最高 / Highest | ≤7个工作日 / ≤7 working days |
| 中危 / Medium | 可导致部分功能异常、权限轻微绕过、少量敏感信息泄露，影响范围有限的漏洞 | 中等 / Medium | ≤10个工作日 / ≤10 working days |
| 低危 / Low | 仅导致界面异常、非敏感信息展示错误，无实际安全危害的漏洞 | 最低 / Lowest | ≤15个工作日 / ≤15 working days |

---

## 安全责任划分 / Security Responsibility Division
### 1. 项目临时维护小组责任 / Project Temporary Maintenance Group Responsibility
**注**：项目核心安全维护团队暂未组建，现阶段由临时维护小组承接安全相关工作，团队组建后将更新并细化安全责任体系
1. 制定并更新项目安全政策，初步建立项目安全防护与漏洞处理机制；
2. 对项目主分支及正式版本进行基础的安全检测与维护，及时修复合规上报的安全漏洞；
3. 保障项目基础基础设施（服务器、云服务、存储等）的安全配置，开展简易安全巡检；
4. 严格保护漏洞举报人信息及漏洞处理过程中的非公开信息，及时向社区公示漏洞修复结果；
5. 为社区贡献者提供基础安全开发指导，推动项目安全编码规范的初步落地。

### 2. 贡献者责任 / Contributor Responsibility
1. 遵循项目安全编码规范，提交的代码、文档需进行自查，避免引入安全漏洞；
2. 发现安全漏洞后，按本政策规定的私密渠道上报，不擅自公开或利用漏洞；
3. 配合维护人员进行漏洞复现、修复验证工作，提供必要的技术支持；
4. 不恶意提交包含安全漏洞的代码、文件，不滥用仓库提交权限。

### 3. 使用者责任 / User Responsibility
1. 仅使用项目官方发布的受支持版本，对非官方版本的使用风险自行承担；
2. 基于本项目二次开发时，需遵守安全开发规范，做好自身衍生产品的安全防护；
3. 发现安全漏洞后及时向官方上报，不利用漏洞从事任何损害项目及他人利益的行为；
4. 妥善保管自身的项目协作账号、API密钥等信息，避免账号被盗用引发安全问题。

---

## 安全奖励与保护 / Security Rewards and Protection
### 1. 漏洞举报人保护 / Vulnerability Reporter Protection
项目维护人员将对漏洞举报人的**个人信息严格保密**，未经举报人书面同意，不得向任何第三方披露举报人信息；在漏洞修复公示中，将隐去所有可识别举报人身份的信息，保障举报人的合法权益。

### 2. 安全贡献奖励 / Security Contribution Rewards
对为项目发现并合规上报**高危/中危**安全漏洞，且协助维护人员完成修复的贡献者，项目将给予相应的荣誉与奖励，核心安全维护团队组建后，将出台更完善的奖励体系：
1. 荣誉奖励：在项目《HALL_OF_FAME.md》荣誉墙中单独标注「安全贡献者」身份，记录核心贡献；
2. 社区激励：提升社区贡献度等级，授予专属安全贡献徽章，享有项目技术决策的优先发言权；
3. 专属奖励（后续落地）：项目核心团队组建及商业化运营后，将对重大安全漏洞贡献者出台配套物质奖励，具体规则由社区共识确定。

---

## 数据安全保护规范 / Data Security Protection Norms
1. 项目仅收集必要的用户信息（如协作账号、贡献者昵称），不收集无关的个人敏感信息（身份证号、手机号、银行卡号等）；
2. 项目所有用户数据均采用加密方式存储与传输，杜绝明文存储敏感信息；
3. 项目不向任何第三方出售、出租、泄露用户信息，除非法律法规另有要求；
4. 贡献者提交的技能内容、代码、设计作品等知识产权，归贡献者所有，项目仅享有非商业性使用权限（另有协议除外）。

1. The project only collects necessary user information (such as collaboration accounts and contributor nicknames), and does not collect irrelevant personal sensitive information (ID card numbers, mobile phone numbers, bank card numbers, etc.);
2. All user data of the project is stored and transmitted in an encrypted manner, and plaintext storage of sensitive information is prohibited;
3. The project does not sell, rent or disclose user information to any third party, unless required by laws and regulations;
4. The intellectual property rights of skill content, code, design works and other materials submitted by contributors belong to the contributors, and the project only has the right of non-commercial use (unless otherwise agreed).

---

## 政策的更新与解释 / Policy Update and Interpretation
1. **政策更新**：本安全政策将根据项目发展、社区反馈、行业安全标准及法律法规的变化进行修订，所有修订将在项目仓库公示（公示期≥7天），无重大异议后正式生效；项目核心安全维护团队组建后，将对本政策进行全面优化与细化；
2. **政策解释**：现阶段本安全政策的解释权归「红尘灵境」项目**临时维护小组**所有，核心安全维护团队组建后，解释权将移交至核心团队；
3. **合规适配**：本政策的制定与执行均遵循全球相关网络安全法律法规，若与项目运营地、用户所在地的法律法规冲突，以当地法律法规为准。

1. **Policy Update** : This security policy will be revised according to the project development, community feedback, industry security standards and changes in laws and regulations. All revisions will be announced in the project repository (public notice period ≥7 days) and take effect officially after no major objections. After the project's core security maintenance team is established, this policy will be fully optimized and refined;
2. **Policy Interpretation** : At this stage, the right of interpretation of this security policy belongs to the **temporary maintenance group** of the "Hongchen Lingjing" project. After the core security maintenance team is established, the right of interpretation will be transferred to the core team;
3. **Compliance Adaptation** : The formulation and implementation of this policy comply with relevant global network security laws and regulations. If it conflicts with the laws and regulations of the project operation location and user location, the local laws and regulations shall prevail.

---

## 附则 / Supplementary Provisions
1. 任何单位或个人违反本安全政策，给「红尘灵境」项目及相关方造成损失的，项目临时维护小组有权追究其法律责任，核心团队组建后由核心团队承接相关权责；
2. 本安全政策与项目《CODE_OF_CONDUCT.md》《CONTRIBUTING.md》等文件互为补充，共同构成项目的安全与治理规范体系；
3. 参与本项目的任何行为，均视为已阅读、理解并同意本安全政策的所有条款；
4. 本政策中涉及的**专用安全邮箱、核心安全维护团队**等内容，将随项目推进逐步落地，落地后将第一时间在项目仓库发布公告更新。

1. Any unit or individual that violates this security policy and causes losses to the Hongchen Lingjing project and related parties shall be subject to legal liability pursued by the project's temporary maintenance group. After the core team is established, the core team will take over the relevant rights and responsibilities;
2. This security policy is complementary to the project's 《CODE_OF_CONDUCT.md》, 《CONTRIBUTING.md》 and other documents, jointly forming the project's security and governance standard system;
3. Any participation in this project shall be deemed as having read, understood and agreed to all terms of this security policy;
4. Content such as the **dedicated security email and core security maintenance team** involved in this policy will be gradually implemented as the project progresses, and an announcement will be released in the project repository for update as soon as it is implemented.

**「红尘灵境」项目临时维护小组**
**Hongchen Lingjing Project Temporary Maintenance Group**
**2026-01-21**
