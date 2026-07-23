// publicPath 自适应：
// - 本地开发 (npm run serve) 用 '/'
// - CI 构建 (npm run build，带 CI 环境变量) 用 '/<仓库名>/'，适配 GitHub Pages
const repoName = 'stv-retro-tv'
const isCI = process.env.CI === 'true' || process.env.GITHUB_ACTIONS === 'true'

module.exports = {
  publicPath: isCI ? `/${repoName}/` : '/',
  // devServer 把 /info 和 /media 这两个「接口」映射到 public 下的静态 JSON
  devServer: {
    port: 8080,
    open: false,
    // 关掉 fsevents（与新版 Node 不兼容会崩溃），改用轮询监听
    watchOptions: {
      poll: 1000,
      ignored: /node_modules/
    },
    before(app) {
      // mock /info
      app.get('/info', (req, res) => {
        res.json(require('./public/info.json'))
      })
      // mock /media
      app.get('/media', (req, res) => {
        res.json(require('./public/media.json'))
      })
    }
  },
  lintOnSave: false,
  productionSourceMap: false
}
