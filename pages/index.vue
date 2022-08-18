<template>
  <div
    id="wrapper"
    class="wrapper mx-auto p-4 flex items-end bg-primary align-middle h-screen w-screen bg-cover bg-no-repeat relative "
    style="background-image: url('lofi2.gif')"
  >
       <div style="" :style="noteFullScreen ?'width:98%;height:88%;   transition: height 0.3s ease-in  ': ''" :class="noteFullScreen?'bottom-20':'w-64 h-64 bottom-20'" class="absolute   bg-opacity-60 bg-gray-900  p-2 rounded-lg"  v-if="!showTodo" >
        <div class=" ease-in border-white w-full h-full text-white p-2" >
          <textarea spellcheck="false"   ref="noteArea" v-model="note" style="resize:none;" :style="noteFullScreen ?`height:92%;font-family:${selectedFont}` : `height:88%; font-family:${selectedFont}`" autofocus class="bg-transparent w-full  text-xs outline-none focus:outline-none overflow-hidden text-justify"></textarea>
          <div class="flex justify-end">
            <select v-if="noteFullScreen" v-model="selectedFont" class="text-xs bg-gray-900 bg-opacity-30 rounded-lg px-2 focus:outline-none mr-2">
              <option :value="font" v-for="(font,index) in fonts" :key="index" class="" >{{font}}</option>
            </select>
          <span
            class="cursor-pointer bg-gray-900 p-2 bg-opacity-30 rounded-lg mr-2"
            :class="noteFullScreen ?'text-xs' : 'text-x'"
          > copy
          </span>
          <span
          @click="makeNoteFullScreen()"
            class="cursor-pointer bg-gray-900 p-2 bg-opacity-30 rounded-lg"
          >
            <img src="fullscreen.png" :width="noteFullScreen ?'14' : '8'" alt="" />
          </span>
          </div>
        </div>


      </div>
    <div class="flex justify-between w-full align-middle items-center mx-auto ">
      
        <div class="cursor-pointer bg-gray-900 bg-opacity-50 p-2 rounded-lg"  @click="showTodo = !showTodo">
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
  </div>
</template>

<script>
import Player from "../methods/Player";
export default {
  name: "IndexPage",
  data() {
    return {
      showTodo:false,
      noteFullScreen:false,
      fonts:["Arial" , "Verdana ", "Helvetica ", "Tahoma", "Trebuchet MS ", "Times New Roman ", "Georgia ", "Garamond ", "Courier New, Courier, monospace", "Brush Script MT " ],
      selectedFont:null,
      note:"",
      primary: new Player("primary"),
      rain: new Player("rain"),
      type: new Player("type"),

      isFullScreen: false,
      audio:
        "https://s3.us-east-2.amazonaws.com/lofi.co/lofi.co/tracks/chill/chill_4.mp3",
    };
  },
  mounted(){
    this.selectedFont = this.fonts[8]
  },
  methods: {
    makeNoteFullScreen(){
      this.noteFullScreen = !this.noteFullScreen
      this.$refs.noteArea.focus()
    },
    toggleFullScreen() {
      var element = document.querySelector("#wrapper");
      this.isFullScreen
        ? document.exitFullscreen()
        : element.requestFullscreen();
      this.isFullScreen = !this.isFullScreen;
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
  },
};
</script>
<style scoped>
input[type="range"][orient="vertical"] {
  writing-mode: bt-lr; /* IE */
  -webkit-appearance: slider-vertical; /* Chromium */
  width: 8px;
  height: 175px;
}
option {
    margin: 40px;
    background: rgba(0, 0, 0, 0.8);
    color: #fff;
    text-shadow: 0 1px 0 rgba(0, 0, 0, 0.1);
}
</style>
