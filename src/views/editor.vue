
<template>
  <div class="components-container">
    <div class="info">UE编辑器示例<br>需要使用编辑器时，调用UE公共组件即可。可设置填充内容defaultMsg，配置信息config(宽度和高度等)，可调用组件中获取内容的方法。</div>
    <button @click="getUEContent()">获取内容</button>
    <div class="editor-container">
      <mh-ue :defaultMsg=defaultMsg :config=config ref="ue"></mh-ue>
    </div>
  </div>
</template>

<script>
  import mhUe from '../components/UEditor';
  export default {
    components: {
      mhUe
    },
    data() {
      return {
        defaultMsg: '这里是UE测试',
        config: {
          initialFrameWidth: null,
          initialFrameHeight: 350
        }
      }
    },
    methods: {
      getUEContent() {
        let content = this.$refs.ue.getUEContent();
        this.$notify({
          title: '获取成功，可在控制台查看！',
          message: content,
          type: 'success'
        });
        console.log(content)
      }
    }
  };
</script>

  <style lang="scss" scoped>
       .info{
         border-radius: 10px;
         line-height: 20px;
         padding: 10px;
         margin: 10px;
         background-color: #ffffff;
       }
  </style>
