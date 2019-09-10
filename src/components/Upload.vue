<template>
    <div>
      <el-upload
        class="upload-demo"
        action="http://127.0.0.1:8000/api/persons/uploadFile/"
        :http-request="defineUpload"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        multiple
        :limit="3"
        :on-exceed="handleExceed"
        :file-list="fileList">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </div>
</template>

<script>
  import axios from 'axios'
  import VueAxios from 'vue-axios'
  export default {
    name: 'Upload',
    data() {
      return {
        fileList: []
      };
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      defineUpload(file){
        let param = new FormData()
        param.append('files',file.file)
        this.$axios({
          method:'post',
          url:'http://127.0.0.1:8000/api/persons/uploadFile/',
          // header:{'Content-Type':'multipart/form-data'},
          data:param
        }).then(response =>{
          console.log(response)
        })
      }
    }
  }
  // export function fileUpload(fileObj) {
  //   let param = new FormData()
  //     param.append('files',fileObj.file)
  //    this.$axios({
  //       method:'post',
  //       url:'http://127.0.0.1:8000/api/persons/uploadFile/',
  //       // header:{'Content-Type':'multipart/form-data'},
  //       data:param
  //     })
  //   ;
  // }
</script>

<style scoped>

</style>
