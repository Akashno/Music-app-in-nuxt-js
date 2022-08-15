<template>
  <div
    id="wrapper"
    class="wrapper mx-auto p-4 flex items-end bg-primary align-middle h-screen w-screen bg-cover bg-no-repeat"
    style="background-image: url('lofi2.gif')"
  >
    <div class="flex justify-between w-full align-middle items-center mx-auto">
      <div style="min-width: 130px"></div>
      <div class="flex-grow flex justify-center">
        <audio ref="raining" src="rain.mp3"></audio>
        <audio ref="typing" src="keyboard.mp3"></audio>
        <audio
          loop
          ref="player"
          src="https://s3.us-east-2.amazonaws.com/lofi.co/lofi.co/tracks/chill/chill_4.mp3"
        ></audio>
        <span @click="togglePlay()" class="cursor-pointer">
          <img v-if="!isPlaying" src="play.png" alt="" class="w-12" />
          <img v-else src="pause.png" alt="" class="w-12" />
        </span>
      </div>
      <div class="flex space-x-4 align-middle">
        <span class="cursor-pointer">
          <div
            class="h-16 flex relative justify-end align-middle items-center"
            @mouseenter="showVolume = true"
            @mouseleave="showVolume = false"
          >
            <input
              v-if="showVolume"
              id="default-range"
              type="range"
              min="0"
              max="1"
              v-model="volume"
              step="0.01"
              class="rs-range w-full left-2 absolute h-2 bottom-16"
              orient="vertical"
            />
            <span @click="toggleMute()">
              <img v-if="!isMute" src="sound.png" width="30" alt="" />
              <img v-else src="mute.png" width="30" alt="" />
            </span>
          </div>
        </span>
        <div
          class="h-16 flex justify-end align-middle relative items-center"
          @mouseenter="showTyping = true"
          @mouseleave="showTyping = false"
        >
          <input
            v-if="showTyping"
            id="default-range"
            type="range"
            min="0"
            max="1"
            v-model="typing"
            step="0.01"
            class="rs-range w-full left-2 absolute h-2 bottom-16"
            orient="vertical"
          />
          <span @click="toggleTyping()" class="cursor-pointer">
            <img v-if="isTyping" src="typing.png" width="30" alt="" />
            <img v-else src="noTyping.png" width="30" alt="" />
          </span>
        </div>

        <div
          class="h-16 flex justify-end align-middle relative items-center"
          @mouseenter="showRaining = true"
          @mouseleave="showRaining = false"
        >
          <input
            v-if="showRaining"
            id="default-range"
            type="range"
            min="0"
            max="1"
            v-model="raining"
            step="0.01"
            class="rs-range w-full left-2 absolute h-2 bottom-16"
            orient="vertical"
          />
          <span @click="toggleRaining()" class="cursor-pointer">
            <img v-if="isRaining" src="rain.png" width="30" alt="" />
            <img v-else src="noRain.png" width="30" alt="" />
          </span>
        </div>

        <div class="h-16 flex justify-end align-middle relative items-center">
          <span @click="toggleFullScreen()" class="cursor-pointer ab">
            <img src="fullscreen.png" width="30" alt="" />
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TypingSvg from "../components/TypingSvg.vue";
export default {
  name: "IndexPage",
  components: {
    TypingSvg,
  },
  data() {
    return {
      authUrl: "",
      isMute: false,
      showVolume: false,
      showTyping: false,
      showRaining: false,
      isPlaying: false,
      isTyping: false,
      isRaining: false,
      isFullScreen: false,
      volume: 0.5,
      typing: 0.5,
      raining: 0.5,
    };
  },
  watch: {
    raining: {
      handler() {
        this.$refs.raining.play();
        this.isRaining = true;
        this.$refs.raining.volume = this.raining;
      },
    },
    typing: {
      handler() {
        this.$refs.typing.play();
        this.isTyping = true;
        this.$refs.typing.volume = this.typing;
      },
    },
    volume: {
      handler() {
        this.isMute = false;
        this.$refs.player.muted = this.isMute;
        this.$refs.player.volume = this.volume;
      },
    },
  },
  methods: {
    toggleFullScreen() {
      var element = document.querySelector("#wrapper");
      this.isFullScreen
        ? document.exitFullscreen()
        : element.requestFullscreen();
      this.isFullScreen = !this.isFullScreen;
    },
    toggleMute() {
      this.isMute = !this.isMute;
      this.$refs.player.muted = this.isMute;
    },
    toggleRaining() {
      if (this.isRaining) {
        this.$refs.raining.pause();
        this.isRaining = false;
      } else {
        this.$refs.raining.play();
        this.isRaining = true;
      }
    },
    toggleTyping() {
      this.$refs.typing.volume = 1;
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
input[type="range"][orient="vertical"] {
  writing-mode: bt-lr; /* IE */
  -webkit-appearance: slider-vertical; /* Chromium */
  width: 8px;
  height: 175px;
  padding: 0 5px;
}
</style>
