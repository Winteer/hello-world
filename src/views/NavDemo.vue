<template>
  <div id="NavDemo">
    <div>
      <qui-nav v-on:navClickEvent="dosth"></qui-nav>
    </div>
    <div>
      <video-player v-bind:videoUrl="videoUrl"></video-player>
    </div>
    <div>
      <video-player v-bind:videoUrl="video1Url"></video-player>
    </div>
  </div>
</template>

<script>
  import quiNav from '../components/quiNav.vue';
  import VideoPlayers from '../components/VideoPlayers';

  export default {
    name: 'NavDemo',
    components: {
      'qui-nav': quiNav,
      'video-player': VideoPlayers
    },
    data() {
      return {
        videoUrl: 'http://192.168.1.36/image/tinymce/test.mp4',//视频url
        video1Url: 'http://192.168.1.36/image/tinymce/test1.mp4',//视频url
        coverUrl: '',//封面url
      };
    },
    methods: {
      dosth: function (items, index) {
        // alert(items[index].text + index);
        console.log(items[index].text + index);
      }
    }
  };
</script>

<style scoped>

</style>
