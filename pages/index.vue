<template>
  <div id="wrapper" class="wrapper p-4 flex  items-end bg-primary align-middle h-screen w-screen bg-cover bg-no-repeat " style="background-image:url('lofi2.gif');">

<div class=" flex justify-between w-full align-middle items-center ">
    <div style="min-width:130px"></div>
    <div class="flex-grow flex justify-center">
      <audio
        ref="raining"
        src="rain.mp3"
      ></audio>
      <audio
        ref="typing"
        src="keyboard.mp3"
      ></audio>
      <audio
        ref="player"
        src=" https://s3.us-east-2.amazonaws.com/lofi.co/lofi.co/tracks/chill/chill_16.mp3"
      ></audio>
      <span @click="togglePlay()" class="cursor-pointer">
        <img v-if="!isPlaying" src="play.png" alt="" class="w-12">
        <img v-else src="pause.png" alt="" class="w-12">
      </span>
    </div>
    <div class="flex space-x-4 align-middle">
      <span @click="toggleMute()">
        <img v-if="isMute" src="sound.png" width="30" alt="">
        <img v-else src="mute.png" width="30" alt="">
      </span>
       <span @click="toggleTyping()">
        <img v-if="isTyping" src="typing.png" width="30" alt="">
        <img v-else src="noTyping.png" width="30" alt="">
      </span>
      <span @click="toggleRaining()" class="cursor-pointer">
        <img v-if="isRaining" src="rain.png" width="30"  alt="">
        <img v-else src="noRain.png" width="30" alt="">
      </span>
      <span @click="toggleFullScreen()" class="cursor-pointer">
        <img src="fullscreen.png" width="30" alt="">
      </span>
    

    </div>

</div>
  </div>
</template>

 <script>
 import TypingSvg from '../components/TypingSvg.vue'
export default {
  name: "IndexPage",
  components:{
    TypingSvg
  },
  data() {
    return {
      authUrl: "",
      isMute:false,
      isPlaying: false,
      isTyping:false,
      isRaining:false,
      isFullScreen:false,
    };
  },
  methods: {
    toggleFullScreen() {
     var element = document.querySelector("#wrapper");
     this.isFullScreen ? document.exitFullscreen():element.requestFullscreen()
     this.isFullScreen = !this.isFullScreen
    },
    toggleMute(){
        this.$refs.player.muted = this.isMute
        this.isMute = !this.isMute
    },
    toggleRaining(){
      if (this.isRaining) {
        this.$refs.raining.pause();
        this.isRaining = false;
      } else {
        this.$refs.raining.play();
        this.isRaining = true;
      }
    },
    toggleTyping(){
      if (this.isTyping) {
        this.$refs.typing.pause();
        this.isTyping = false;
      } else {
        this.$refs.typing.play();
        this.isTyping = true;
      }
    },
    togglePlay() {
      if (this.isPlaying) {
        this.$refs.player.pause();
        this.isPlaying = false;
      } else {
        this.$refs.player.play();
        this.isPlaying = true;
      }
    },
  },
};
</script>
<style scoped>
</style>
