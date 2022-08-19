<template>
  <div
    id="wrapper"
    class=" flex p-4 justify-end bg-primary  h-screen w-screen bg-cover bg-no-repeat flex-col  "
    style="background-image: url('lofi2.gif')"
  >
       <div v-if="showTodo"  class="transparentNoteWrapper bg-opacity-60 bg-gray-900 p-2 rounded-lg"  :class="noteFullScreen?' w-full h-full':'w-64 h-64'"  >
        <div class="border-white w-full h-full text-white p-2" >
          <textarea placeholder="Express your feelings"  spellcheck="false"  ref="noteArea" v-model="note"  :style="noteFullScreen ?`height:92%;font-family:${selectedFont}` : `height:88%; font-family:${selectedFont}`" autofocus class="bg-transparent w-full  text-xs outline-none focus:outline-none overflow-hidden text-justify"></textarea>
          <div class="flex justify-end items-center">
          <Emoji  @setEmoji="setEmoji" class="mr-4" v-if="noteFullScreen"/>    
          <SelectFont  @setFont="setFont" class="mr-4" v-if="noteFullScreen"/>    

          <span
          @click="copyToClipboard()"
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
     <ToolBar @toggleFullScreen="toggleFullScreen" @showTodo="showTodo = !showTodo" class="items-end" v-show="!noteFullScreen"/> 
  </div>
</template>

<script>
import Emoji from '../components/EmojiPicker'
import SelectFont from '../components/SelectFont'
export default {
  name: "IndexPage",
  components:{
    Emoji,
    SelectFont,
  },
  data() {
    return {
      showTodo:false,
      noteFullScreen:false,
      isFullScreen:false,
      selectedFont:null,
      note:"",
    };
  },
  methods: {
    toggleFullScreen(){
      var element = document.querySelector("#wrapper");
      this.isFullScreen
        ? document.exitFullscreen()
        : element.requestFullscreen();
      this.isFullScreen = !this.isFullScreen;
    },
    setFont(selectedFont){
    this.selectedFont = selectedFont
    },
    setEmoji(emoji){
      this.note += emoji
    },
    copyToClipboard(){
      this.$refs.noteArea.focus();
      this.$refs.noteArea.setSelectionRange(0, this.note.length)
      document.execCommand('copy');
      this.$refs.noteArea.setSelectionRange(this.note.length, this.note.length)
    },
    makeNoteFullScreen(){
      this.noteFullScreen = !this.noteFullScreen
      this.$refs.noteArea.focus()
    },
  },
};
</script>
<style scoped>
.transparentNoteWrapper{
   transition: height  0.3s ease-in, width  0.3s ease-in  ;
}
textarea{
  resize: none;
}
</style>

