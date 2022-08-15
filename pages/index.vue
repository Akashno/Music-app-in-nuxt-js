<template>
  <div id="wrapper" class="wrapper p-4 flex  items-end bg-primary align-middle h-screen w-screen bg-cover bg-no-repeat " style="background-image:url('lofi.gif');">

<div class=" flex justify-between w-full align-middle items-center ">

    <div style="min-width:10px"></div>
    <div class="">
      <audio
        autoplay
        ref="player"
        src=" https://s3.us-east-2.amazonaws.com/lofi.co/lofi.co/tracks/chill/chill_16.mp3"
      ></audio>
      <span @click="togglePlay()" class="cursor-pointer">

        <svg
          v-if="!isPlaying"
          width="60"
          fill="white"
          viewBox="0 0 50 50"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M25 42c-9.4 0-17-7.6-17-17S15.6 8 25 8s17 7.6 17 17-7.6 17-17 17zm0-32c-8.3 0-15 6.7-15 15s6.7 15 15 15 15-6.7 15-15-6.7-15-15-15z"
          />
          <path d="M20 33.7V16.3L35 25l-15 8.7zm2-14v10.5l9-5.3-9-5.2z" />
        </svg>
        <svg
          v-else
          width="55"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9 9h2v6H9V9Zm6 6h-2V9h2v6Z" fill="#fff" />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M23 12c0 6.075-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1s11 4.925 11 11Zm-2 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            fill="#fff"
          />
        </svg>

      </span>
    </div>
    <svg
    @click="toggleFullScreen()"
    class="cursor-pointer"
      width="24px"
      height="24px"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M33 6H42V15"
        stroke="white"
        stroke-width="4"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M42 33V42H33"
        stroke="white"
        stroke-width="4"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M15 42H6V33"
        stroke="white"
        stroke-width="4"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M6 15V6H15"
        stroke="white"
        stroke-width="4"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>

</div>
  </div>

</template>

 <script>
export default {
  name: "IndexPage",
  data() {
    return {
      authUrl: "",
      isPlaying: false,
      isFullScreen:false,
    };
  },
  methods: {
    toggleFullScreen() {
      var element = document.querySelector("#wrapper");
     
     this.isFullScreen ? document.exitFullscreen():element.requestFullscreen()
     this.isFullScreen = !this.isFullScreen
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
