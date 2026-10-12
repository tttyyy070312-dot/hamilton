# Hamilton: The Story Behind the Story

> **An American Musical & Digital Humanities Archive**  
> *"Who lives, who dies, who tells your story."*

---

## 🌐 网站在线访问地址 (Live Production URLs)

- **线上公开体验地址 (Shared App URL)**:  
  👉 **[https://ais-pre-ml3c2niwi2744a5ielm6qa-202840962339.us-west2.run.app](https://ais-pre-ml3c2niwi2744a5ielm6qa-202840962339.us-west2.run.app)**

- **开发实时预览地址 (Development Preview URL)**:  
  👉 **[https://ais-dev-ml3c2niwi2744a5ielm6qa-202840962339.us-west2.run.app](https://ais-dev-ml3c2niwi2744a5ielm6qa-202840962339.us-west2.run.app)**

---

## 🎭 核心功能与架构

### 1. 双层剧院架构 (Theatrical Two-Tier Design)
- **第一层 · 剧院开场 (Broadway Opening Landing Page)**:
  - 经典深蓝与五角星金标海报（★）、烫金立体字与 *"Who lives, who dies, who tells your story"*、*"History has its eyes on you."*
  - 约 6 秒百老汇开场沉浸式微动效序列。
  - **Playbill 模式切换**：还原 Richard Rodgers Theatre 黄顶百老汇节目册，支持 **[ OPEN TONIGHT ]** 翻折进入。
  - 伴随大幕拉开（Curtain Call）动效与音效无缝进入主站。
- **第二层 · 沉浸式历史档案库 (Main Archive Stage)**:
  - 左侧专属滑出式导航栏（`HOME`、`TIMELINE`、`CHARACTERS`、`SONGS`、`HISTORY`、`ARCHIVES`、`MAP`、`PLAYBILL`）。
  - 全屏沉浸式杂志排版，随时切换探索。

### 2. 全剧角色与全部乐章 (Complete Cast & 46 Tracks)
- **全部有姓名人物（20位）**：包含亚历山大·汉密尔顿、阿伦·伯尔、伊丽莎白、安吉莉卡、佩吉、华盛顿、杰斐逊、麦迪逊、拉法耶特、穆利根、劳伦斯、菲利普、乔治三世、玛丽亚·雷诺兹、詹姆斯·雷诺兹、菲利普·斯凯勒将军、塞缪尔·西伯里、查尔斯·李将军、乔治·埃克、命运之弹（The Bullet）。支持阵营筛选与实时搜索。
- **官方完整 46 首曲目（Act I & Act II）**：每一首包含流派、BPM、演唱者、主题、歌词摘录、编曲分析与历史对照。

### 3. 百老汇乐池合成器引擎 (Interactive Pit Audio Engine)
- 基于原生 Web Audio API，无需外部音频依赖，开场默认播放《Alexander Hamilton》（默认静音）。
- **右下角悬浮音乐控制器**：
  - 音量无级调节、一键静音/解静音、调性显示与金色均衡波形。
  - 舞台音效（大幕开场、翻折节目册、议会木槌）。
  - 各版块与时间线（1776《My Shot》、1787《Non-Stop》、1804《The World Was Wide Enough》等）动态无缝切换伴奏。

### 4. 历史文献与革命足迹 (Primary Sources & Map)
- 18 世纪手稿书桌与羊皮纸原件：《联邦党人文集》第 1 篇、1797 年《雷诺兹手册》丑闻原文、华盛顿告别演说草稿、汉密尔顿决斗前致妻绝笔信。
- 革命地理全景：从加勒比圣克罗伊岛到曼哈顿国王学院、约克镇红垒与新泽西威霍肯决斗崖壁。

---

## 🚀 部署到你的 GitHub 仓库

如果你需要将此项目同步推送到你的 GitHub 仓库中，只需在本地或终端执行以下步骤：

```bash
# 1. 初始化并添加所有文件
git init
git add .
git commit -m "feat: complete Hamilton theatrical archive with 20 characters and 46 songs"

# 2. 关联到你的 GitHub 仓库（将 YOUR_USERNAME 和 YOUR_REPO 替换为你自己的仓库）
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# 3. 推送到 GitHub
git push -u origin main
```

---

## 🛠 本地开发与构建

```bash
# 安装依赖
npm install

# 启动本地开发服务 (默认端口 3000)
npm run dev

# 编译生产构建文件
npm run build
```

---

*Curated for Hamilton: An American Musical & Digital Humanities History Archives.*
