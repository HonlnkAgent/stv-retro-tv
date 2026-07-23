<template>
  <!-- 主容器：复古小电视 + 背景 + 桌子 + 赞赏码弹窗 -->
  <div class="container valentine block load" :class="{ 'valentine-enter': enterValentine }">
    <!-- 点击热气球触发「情人节活动」(播放第二组视频源) -->
    <div class="balloon-tv" @click="openActivity"></div>

    <!-- 静态渲染 _m(0)：背景装饰 (云/山/光点) -->
    <div class="background">
      <div class="bg1"></div>
      <div class="bg2"></div>
      <div class="c_1"></div><div class="c_2"></div><div class="c_3"></div><div class="c_4"></div>
      <div class="h_1"></div><div class="h_2"></div><div class="h_3"></div><div class="h_4"></div>
      <div class="h_5"></div><div class="h_6"></div><div class="h_7"></div><div class="h_8"></div>
      <img class="d_1" src="https://cdn.jsdelivr.net/gh/knob16/resource@1.2/static/img/dot1.svg" />
      <img class="d_2" src="https://cdn.jsdelivr.net/gh/knob16/resource@1.2/static/img/dot2.svg" />
      <img class="d_3" src="https://cdn.jsdelivr.net/gh/knob16/resource@1.2/static/img/dot3.svg" />
      <img class="d_4" src="https://cdn.jsdelivr.net/gh/knob16/resource@1.2/static/img/dot4.svg" />
      <img class="d_5" src="https://cdn.jsdelivr.net/gh/knob16/resource@1.2/static/img/dot5.svg" />
      <img class="d_6" src="https://cdn.jsdelivr.net/gh/knob16/resource@1.2/static/img/dot6.svg" />
      <img class="d_7" src="https://cdn.jsdelivr.net/gh/knob16/resource@1.2/static/img/dot7.svg" />
    </div>

    <div class="all">
      <!-- 老式电视机本体 -->
      <div class="old-tv" :class="tvOn && !showMessage ? 'load' : (offAnimation ? 'off off-animation' : 'off')">
        <!-- 左侧赞赏码按钮 -->
        <div class="paycode-btn-left" @click="onShowPayCode('left')">
          <img src="https://cdn.jsdelivr.net/gh/knob16/resource@1.2/static/img/milktea.svg" />
        </div>
        <!-- 右侧赞赏码按钮 -->
        <div class="paycode-btn" @click="onShowPayCode('right')">
          <img src="https://cdn.jsdelivr.net/gh/knob16/resource@1.2/static/img/milktea.svg" />
        </div>

        <div class="antenna"></div>

        <main>
          <div class="error-noise">
            <div class="error-effect">
              <!-- video.js 挂载点 -->
              <video ref="player" class="video-js"></video>
              <div class="old-tv-content">
                <div class="text-layout">
                  <p v-if="showMessage">信号接收中... </p>
                  <span v-if="playbackRate > 1 && tvOn" class="corner-text rate"> {{ playbackRate }}x </span>
                </div>
              </div>
            </div>
          </div>
        </main>

        <div class="speaker"></div>

        <!-- 音量旋钮 -->
        <div class="volume">
          <input type="range" min="0" max="100" @input="onVolumeChange" />
        </div>
        <!-- 频道旋钮（实际控制倍速） -->
        <nav class="channel">
          <input type="range" min="1" max="2" step="0.5" :value="playbackRate" @input="onRateChange" />
        </nav>
        <!-- 电源开关 -->
        <nav class="power">
          <button @click="toggleTV"></button>
        </nav>

        <nav></nav>
        <footer></footer>
      </div>

      <!-- 静态渲染 _m(1)：桌子 + 3D 立方体（纯装饰，用 CSS 3D 实现） -->
      <div id="table-tv">
        <div class="scene">
          <div class="shape cuboid-1 cub-1">
            <div class="face ft" style="box-shadow: rgba(255, 255, 255, 0.2) 0px 1px inset"></div>
            <div class="face bk"></div>
            <div class="face rt"></div>
            <div class="face lt"></div>
            <div class="face bm"></div>
            <div class="face tp" style="box-shadow: rgba(0, 0, 0, 0.3) 0px 100px 20px inset, rgba(0, 0, 0, 0.3) 0px 300px inset"></div>
          </div>
          <div class="shape cuboid-3 cub-3">
            <div class="face ft" style="box-shadow: rgba(0, 0, 0, 0.6) 0px 300px inset, rgba(0, 0, 0, 0.8) 10px 2px 10px"></div>
            <div class="face bk"></div>
            <div class="face rt"></div>
            <div class="face lt" style="box-shadow: rgba(0, 0, 0, 0.8) 0px 300px inset"></div>
            <div class="face bm"></div>
            <div class="face tp"></div>
          </div>
          <div class="shape cuboid-4 cub-4">
            <div class="face ft" style="box-shadow: rgba(0, 0, 0, 0.6) 0px 20px 5px inset, rgba(0, 0, 0, 0.4) 5px 2px 8px"></div>
            <div class="face bk"></div>
            <div class="face rt"></div>
            <div class="face lt" style="box-shadow: rgba(0, 0, 0, 0.3) 0px 300px inset"></div>
            <div class="face bm"></div>
            <div class="face tp"></div>
          </div>
          <div class="shape cuboid-5 cub-5">
            <div class="face ft" style="box-shadow: rgba(0, 0, 0, 0.6) 0px 300px inset, rgba(0, 0, 0, 0.8) -10px 2px 10px"></div>
            <div class="face bk"></div>
            <div class="face rt" style="box-shadow: rgba(0, 0, 0, 0.8) 0px 300px inset"></div>
            <div class="face lt"></div>
            <div class="face bm"></div>
            <div class="face tp"></div>
          </div>
          <div class="shape cuboid-6 cub-6">
            <div class="face ft" style="box-shadow: rgba(0, 0, 0, 0.6) 0px 20px 5px inset, rgba(0, 0, 0, 0.4) -5px 2px 8px"></div>
            <div class="face bk"></div>
            <div class="face rt"></div>
            <div class="face lt"></div>
            <div class="face bm"></div>
            <div class="face tp"></div>
          </div>
          <div class="shape cuboid-2 cub-2">
            <div class="face ft" style="box-shadow: rgba(255, 255, 255, 0.2) 0px 1px inset"></div>
            <div class="face bk"></div>
            <div class="face rt"></div>
            <div class="face lt"></div>
            <div class="face bm"></div>
            <div class="face tp" style="box-shadow: rgba(0, 0, 0, 0.5) 0px 50px 20px inset, rgba(0, 0, 0, 0.4) 0px 150px inset"></div>
          </div>
        </div>
      </div>

      <!-- 静态渲染 _m(2)：气球装饰 -->
      <div class="balloons">
        <div class="balloon"></div><div class="balloon"></div>
        <div class="balloon"></div><div class="balloon"></div>
        <div class="balloon"></div>
      </div>

      <!-- 关闭活动按钮 -->
      <div class="close-activity" @click="closeActivity">
        <i class="iconfont icon-poweroff"></i>
      </div>

      <!-- 赞赏码弹窗 -->
      <div
        v-if="info != null"
        :class="(showPayCode ? 'fadein-enter-active' : 'fadein-leave-active') + ' modal paycode'"
        :style="showPayCode ? '' : 'display: none;'"
      >
        <p> {{ info.head_tips }} </p>
        <img :src="qrcode" />
        <div style="font-size: 11px; margin-top: 10px; color: rgb(102, 102, 102)">
          <p> {{ info.tail_desc }} </p>
        </div>
        <div class="close-btn-x" @click="showPayCode = false"></div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'TVMain',
  data() {
    return {
      showPayCode: false,
      tvOn: false,
      offAnimation: false,
      playbackRate: 1,
      enterValentine: false,
      info: null,
      mediaList: [],
      qrcode: null,
      showMessage: false,
      // player 由 video.js 实例化，不在 data 里声明（避免 Vue 响应式包装）
      player: null
    }
  },
  computed: {
    // 第一组视频源：开机后随机播放的「频道」
    firstSource() {
      const first = this.mediaList.filter((m) => m.use_on === 'first')
      return first.reduce((acc, m) => {
        return acc.concat(
          m.resource.map((src) => ({ src, type: m.type }))
        )
      }, [])
    },
    // 第二组视频源：情人节活动专用
    secondSource() {
      const second = this.mediaList.filter((m) => m.use_on === 'second')
      return second.reduce((acc, m) => {
        return acc.concat(
          m.resource.map((src) => ({ src, type: m.type }))
        )
      }, [])
    }
  },
  created() {
    const baseUrl = '.'
    // 拉取站点信息（标题、赞赏码、文案）
    axios.get(`${baseUrl}/info`).then((res) => {
      if (res.data) this.info = res.data
    }).catch((err) => console.log(err))

    // 拉取视频源列表
    axios.get(`${baseUrl}/media`).then((res) => {
      if (res.data && res.data.length > 0) {
        this.mediaList = res.data
        this.setupPlayer()
      }
    }).catch((err) => console.log(err))
  },
  beforeDestroy() {
    if (this.player) this.player.dispose()
  },
  methods: {
    // 初始化 video.js 播放器（隐藏所有原生控件，纯靠外层旋钮控制）
    setupPlayer() {
      this.player = this.$video(this.$refs.player, {
        playsinline: true,
        controls: false,
        autoplay: false,
        preload: 'auto',
        width: '0px',
        height: '0px',
        errorDisplay: false,
        posterImage: false,
        bigPlayButton: false,
        textTrackDisplay: false,
        controlBar: false,
        loadingSpinner: false,
        textTrackSettings: false
      }, () => {
        console.log('onPlayerReady', this)
      })
    },

    // 开/关电视
    toggleTV() {
      if (!this.showMessage && this.player != null) {
        this.tvOn = !this.tvOn
        if (this.tvOn) {
          // 开机：从第一组源里随机挑一个，1 秒后播放（模拟「信号接收中」）
          const idx = Math.floor(Math.random() * this.firstSource.length)
          this.playerPlay(this.firstSource[idx].src, 1000)
        } else {
          // 关机：播放关机动画 + 暂停
          this.offAnimation = true
          this.player.pause()
        }
        // 开关机音效
        new Audio('https://cdn.jsdelivr.net/gh/knob16/resource@1.2/static/media/switch.mp3').play()
      }
    },

    onVolumeChange(e) {
      if (this.player != null) {
        this.player.volume(e.target.value / 100)
      }
    },

    onRateChange(e) {
      if (this.player != null) {
        this.playbackRate = e.target.value
        this.player.playbackRate(e.target.value)
      }
    },

    // 显示赞赏码弹窗（left/right 对应不同的二维码）
    onShowPayCode(side) {
      if (this.info != null) {
        this.qrcode = side === 'left' ? this.info.qrcode_on_left : this.info.qrcode
        this.showPayCode = true
      }
    },

    // 进入「情人节活动」：播放第二组视频源
    openActivity() {
      if (this.player != null) {
        this.player.pause()
        this.enterValentine = true
        this.tvOn = true
        const idx = Math.floor(Math.random() * this.secondSource.length)
        this.playerPlay(this.secondSource[idx].src, 2000)
      }
    },

    closeActivity() {
      new Audio('https://cdn.jsdelivr.net/gh/knob16/resource@1.2/static/media/switch.mp3').play()
      this.tvOn = false
      this.player.pause()
      this.enterValentine = false
    },

    // 切换视频源：先显示「信号接收中...」，delay 毫秒后真正播放
    playerPlay(src, delay) {
      this.player.src(src)
      this.playbackRate = 1
      this.player.playbackRate(1)
      this.showMessage = true
      console.log(this.player)
      setTimeout(() => {
        console.log('timeout')
        this.showMessage = false
        this.player.play()
      }, delay)
    }
  }
}
</script>

<!-- 非 scoped：原站 CSS 选择器是写死的，不带 scope 限定，直接全局匹配 -->
<style>
@import url(https://at.alicdn.com/t/font_2545871_iksg2uq65n.css);
@import '../assets/tv.css';

/* 覆盖 video.js 默认尺寸，让播放器被电视屏幕容器裁剪 */
.video-js {
  width: 100% !important;
  height: 100% !important;
}
</style>

