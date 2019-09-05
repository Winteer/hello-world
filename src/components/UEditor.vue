<template>
  <div class="edit">
    <script id="editor" type="text/plain"></script>
  </div>
</template>

<script>
  import '../../public/static/ueditor/ueditor.config.js'
  import '../../public/static/ueditor/ueditor.all.js'
  import '../../public/static/ueditor/lang/zh-cn/zh-cn.js'
  export default {
    name: 'UEditor',
    data () {
      return {
        editor: null
      }
    },
    props: {
      defaultMsg: {
        type: String
      },
      config: {
        type: Object
      }
    },
    mounted() {
      const _this = this;
      this.editor = UE.getEditor('editor', this.config); // 初始化UE
    },
    methods: {
      getUEContent() { // 获取内容方法
        return this.editor.getContent()
      }
    },
    destroyed() {
      this.editor.destroy();
    }
  }
</script>

<style lang="scss" scoped>
  /*.edit{*/
  /*  width: 1200px;*/
  /*  margin: auto;*/
  /*}*/
  @import '../../public/static/ueditor/themes/default/css/ueditor.css';
</style>
