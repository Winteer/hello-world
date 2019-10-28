<template>
  <div class="block">
    <el-main style="text-align: left">
    <el-timeline>
      <el-timeline-item
        v-for="(activity, index) in activities"
        :key="index"
        :icon="activity.icon"
        :type="activity.type"
        :color="activity.color"
        :size="activity.size"
        :timestamp="activity.timestamp">
        {{activity.content}}
        <br/>
<video-player v-bind:videoUrl="videoUrl"></video-player>
        <br/>
      </el-timeline-item>
    </el-timeline>
    </el-main>
  </div>
</template>

<script>
  import VideoPlayers from './VideoPlayers';
  export default {
    name: 'TimeLine',
    components:{
      'video-player': VideoPlayers
    },
    data() {
      return {
        videoUrl: 'http://192.168.1.36/image/tinymce/test.mp4',//视频url
        activities: [{
          content: '支持使用图标',
          timestamp: '2018-04-12 20:46',
          size: 'large',
          type: 'primary',
          icon: 'el-icon-more'
        }, {
          content: '支持自定义颜色',
          timestamp: '2018-04-03 20:46',
          color: '#0bbd87'
        }, {
          content: '支持自定义尺寸',
          timestamp: '2018-04-03 20:46',
          size: 'large'
        }, {
          content: '默认样式的节点',
          timestamp: '2018-04-03 20:46'
        }]
      };
    }
  }
</script>

<style scoped>

</style>
