<template>
 <div class="flex justify-between w-full align-middle items-center mx-auto ">
        <div class="cursor-pointer bg-gray-900 bg-opacity-50 p-2 rounded-lg"  @click="$emit('showTodo')">
          <img src="pencil.png" width="15" alt="" />
      </div>
      <div class="flex-grow flex justify-center">
        <audio loop ref="primary" :src="audio"></audio>
        <audio loop ref="type" src="keyboard.mp3"></audio>
        <audio loop ref="rain" src="rain.mp3"></audio>
        <!-- Primary play / pause button -->
        <span @click="playPause('primary')" class="cursor-pointer">
          <img v-if="!primary.playing" src="play.png" alt="" class="w-12" />
          <img v-else src="pause.png" alt="" class="w-12" />
        </span>
      </div>
      <!-- Volume button -->
      <div class="flex space-x-4 align-middle">
        <span class="cursor-pointer">
          <div
            class="h-16 flex relative justify-end align-middle items-center"
            @mouseenter="primary.showSlider = true"
            @mouseleave="primary.showSlider = false"
          >
            <input
              v-if="primary.showSlider"
              id="default-range"
              type="range"
              min="0"
              max="1"
              @input="slideVolume('primary')"
              v-model="primary.volume"
              step="0.01"
              class="rs-range w-full left-2 absolute h-2 bottom-16"
              orient="vertical"
            />
            <span @click="toggleMute()" class="bg-gray-900 p-2 rounded-lg bg-opacity-30">
              <img
                src="sound.png"
                width="15"
                alt=""
                :class="{ 'opacity-50 ': primary.muted || primary.volume <=0 }"
              />
            </span>
          </div>
        </span>
        <!-- Keyboard button -->
        <div
          class="h-16 flex justify-end align-middle relative items-center"
          @mouseenter="type.showSlider = true"
          @mouseleave="type.showSlider = false"
        >
          <input
            v-if="type.showSlider"
            id="default-range"
            type="range"
            min="0"
            max="1"
            @input="slideVolume('type')"
            v-model="type.volume"
            step="0.01"
            class="rs-range w-full left-2 absolute h-2 bottom-16"
            orient="vertical"
          />
          <span
            @click="playPause('type')"
            class="cursor-pointer bg-gray-900 p-2 bg-opacity-30 rounded-lg"
          >
            <img
              src="typing.png"
              width="15"
              alt=""
              :class="{ 'opacity-50': !type.playing }"
            />
          </span>
        </div>

        <!-- Rain cloud button -->
        <div
          class="h-16 flex justify-end align-middle relative items-center"
          @mouseenter="rain.showSlider = true"
          @mouseleave="rain.showSlider = false"
        >
          <input
            v-if="rain.showSlider"
            id="default-range"
            type="range"
            min="0"
            max="1"
            @input="slideVolume('rain')"
            v-model="rain.volume"
            step="0.01"
            class="rs-range w-full left-2 absolute h-2 bottom-16"
            orient="vertical"
          />
          <span
            @click="playPause('rain')"
            class="cursor-pointer bg-gray-900 bg-opacity-30 p-2 rounded-lg"
          >
            <img
              src="rain.png"
              width="17"
              alt=""
              :class="{ 'opacity-50': !rain.playing }"
            />
          </span>
        </div>
        <!-- Full Screen button -->
        <div class="h-16 flex justify-end align-middle relative items-center">
          <span
            @click="toggleFullScreen()"
            class="cursor-pointer bg-gray-900 p-2 bg-opacity-30 rounded-lg"
          >
            <img src="fullscreen.png" width="15" alt="" />
          </span>
        </div>
      </div>
    </div> 
</template>

<script>

import Player from "../methods/Player";
export default {
    name:"ToolBar",
    data(){
     return{
      primary: new Player("primary"),
      rain: new Player("rain"),
      type: new Player("type"),
      isFullScreen: false,
      audio:
        "https://s3.us-east-2.amazonaws.com/lofi.co/lofi.co/tracks/chill/chill_4.mp3",
        }
    },
    methods:{
    toggleFullScreen() {
        this.$emit('toggleFullScreen')
    },
    toggleMute() {
      this.primary.muted = !this.primary.muted;
      this.$refs.primary.muted = this.primary.muted;
    },
    slideVolume(player) {
      this.$refs[player].play();
      this[player].playing = true;
      this.$refs[player].volume = this[player].volume;
    },
    playPause(player) {
      if (this[player].playing) {
        this.$refs[player].pause();
        this[player].playing = false;
      } else {
        this.$refs[player].play();
        this[player].playing = true;
      }
    },
    }

}
</script>

<style scoped>
input[type="range"][orient="vertical"] {
  writing-mode: bt-lr; /* IE */
  -webkit-appearance: slider-vertical; /* Chromium */
  width: 8px;
  height: 175px;
}
</style>