<template>
  <div class="teditor">
    <tinymce
      ref="editor"
      v-model="msg"
      :disabled="disabled"
      @onClick="onClick"
    />
    <el-button type="warning" round @click="clear">清空内容</el-button>
    <el-button type="primary" round  @click="disabled = false">启用</el-button>
    <el-button type="danger" round  @click="disabled = true">禁用</el-button>
  </div>
</template>
<script>
  import tinymce from '@/components/tinymce.vue'

  export default {
    name: 'teditor',
    components: {
      tinymce
    },
    data(){
      return{
        msg: '请输入……',
        disabled: false
      }
    },
    methods: {
      // 鼠标单击的事件
      onClick (e, editor) {
        console.log('Element clicked')
        console.log(e)
        console.log(editor)
      },
      // 清空内容
      clear () {
        this.$refs.editor.clear()
      }
    }
  }
</script>
