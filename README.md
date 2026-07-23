# 📺 复古小电视 (stv)

一个用复古老式电视 UI 播放视频的 Vue 应用。点击电源按钮开机，随机播放一个节目（哆啦A梦、七龙珠、奥特曼、周杰伦 MV 等）。

> 在线预览（GitHub Pages）：部署完成后见 https://honlnkagent.github.io/stv-retro-tv/

---

## ✨ 功能

- 📺 复古电视机外观（CSS 3D 立体桌台 + CRT 屏幕特效 + 雪花噪点）
- 🔘 电源按钮 → 开/关机，开机随机播放「频道」
- 🎚️ 音量旋钮、频道旋钮（实际控制 1x/1.5x/2x 倍速）
- 🎈 点击热气球 → 情人节活动（播放第二组视频）
- 🧋 奶茶图标 → 赞赏码弹窗
- 「信号接收中...」开机模拟动画 + 开关机音效

## 🛠️ 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| Vue | 2.6.12 | 前端框架 |
| video.js | 7.11.8 | HLS (m3u8) 视频播放 |
| axios | ~0.21 | 拉取接口数据 |
| Vue CLI | ~4.5 | 构建/开发工具 |
| GitHub Actions | — | CI/CD（自动部署 Pages） |

## 🚀 本地运行

```bash
# 安装依赖
npm install

# 启动开发服务器 (http://localhost:8081)
npm run serve

# 构建生产版本 (输出到 dist/)
npm run build
```

> ⚠️ 在较新的 Node.js（v20+）上运行 dev server 时，可能因 fsevents 不兼容崩溃。
> 解决：用 `CHOKIDAR_USEPOLLING=true npm run serve` 改用轮询监听。

## 📁 项目结构

```
stv-run/
├── .github/workflows/deploy.yml   # CI：push → 构建 → 部署 Pages
├── public/
│   ├── index.html
│   ├── info.json                  # 站点信息（标题/赞赏码）接口数据
│   └── media.json                 # 视频源清单接口数据
├── src/
│   ├── main.js                    # 入口（挂载 video.js）
│   ├── App.vue                    # 根组件
│   ├── assets/tv.css              # 样式
│   └── components/
│       └── TVMain.vue             # 主组件（小电视全部逻辑）
├── babel.config.js
├── vue.config.js                  # publicPath 自适应 + mock 接口
└── package.json
```

## 🔄 工作原理

本应用没有传统后端。页面加载后通过两个静态接口获取数据：

- `GET /info` → 站点标题、提示文案、赞赏码图片地址
- `GET /media` → 视频源清单（分类、节目名、m3u8 地址、使用场景）

视频本体（m3u8）托管在 jsDelivr CDN 上，由 video.js 通过 HLS 协议播放。

## 📦 CI/CD（GitHub Flow）

推送到 `main` 分支会自动触发 GitHub Actions：

1. 安装依赖 (`npm ci`)
2. 构建 (`npm run build`)
3. 部署 `dist/` 到 GitHub Pages

部署成功后访问：https://honlnkagent.github.io/stv-retro-tv/

---

## ⚠️ 版权与声明

本项目是对一个**公开网站**（`game.waimai.zone/stv`）的**前端反编译还原**，仅用于学习和研究目的。

- 原始设计、UI、视频内容的版权归原作者所有
- 本仓库不包含视频本体，仅播放原作者公开的 CDN 链接
- 代码中的赞赏码图片 URL 为原作者所有，请勿用于商业用途
- 如原作者认为本仓库侵犯其权益，请联系移除

**本项目仅供学习交流，请勿用于任何商业用途。**
