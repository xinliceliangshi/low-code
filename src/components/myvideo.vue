<template>
  <div class="PlayVideo" v-if="show">

    <div class="close">
      <img src="../../assets/img/关闭.png" alt="" @click="close" />
    </div>

    <video
        class="video"
        controls=""
        ref="video"
        id="video"
        v-on:error.prevent="error($event)"
    >
    </video>

    <div class="msg" v-if="isError">
      <div  style="color: #fff">{{errMsg}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "myvideo",
  props: ["videoUrl"],
  data() {
    return {
      // videoUrls: ''
      show: true,
      isError: false,
      errMsg: "",
    };
  },
  computed: {},
  components: {},
  mounted() {
    this.$refs.video.src = this.videoUrl
    let myvideo = document.getElementById("video");

    if(this.isMobile){
      myvideo.play()
    }
  },
  methods: {
    close() {
      this.show = false;
      this.$emit("close");
    },
    error(e) {
      console.log(e);
      if(this.videoUrl == ''){
        this.isError = true
        this.errMsg = "该文章暂无视频！"
      }else{
        this.isError = true
        this.errMsg = "视频链接失效！无法播放！"
      }
    },
  },
};
</script>

<style lang='scss' scoped>
.PlayVideo {
  width: 45.3125vw;
  height: 50.1vh;
  position: relative;
  // z-index: 99999;
  // background: rgba(0, 0, 0, 0.5);
  .close {
    position: absolute;
    top: -32px;
    right: -32px;
    z-index: 9999;
  }
  .video {
    width: 45.3125vw;
    height: 50.1vh;
    background: #000;
    // position: absolute;
    // top: 50%;
    // left: 50%;
    // transform: translate(-50%,-50%);
    // z-index: 100000;
  }
  .msg {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
  }
}
</style>
