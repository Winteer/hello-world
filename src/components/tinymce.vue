<template>
  <div class="tinymce-box" align="center">
    <editor v-model="myValue"
            :init="init"
            :disabled="disabled"
            @onClick="onClick">
    </editor>
  </div>
</template>

<script>
  import tinymce from 'tinymce/tinymce'; //tinymce默认hidden，不引入不显示
  import Editor from '@tinymce/tinymce-vue';
  import 'tinymce/themes/silver';
  import axios from 'axios'
  import VueAxios from 'vue-axios'
  // 编辑器插件plugins
  // 更多插件参考：https://www.tiny.cloud/docs/plugins/
  import 'tinymce/plugins/image';// 插入上传图片插件
  import 'tinymce/plugins/media';// 插入视频插件
  import 'tinymce/plugins/table';// 插入表格插件
  import 'tinymce/plugins/link'; //超链接插件
  import 'tinymce/plugins/code'; //代码块插件
  import 'tinymce/plugins/lists';// 列表插件
  import 'tinymce/plugins/contextmenu';  //右键菜单插件
  import 'tinymce/plugins/wordcount'; // 字数统计插件
  import 'tinymce/plugins/colorpicker'; //选择颜色插件
  import 'tinymce/plugins/textcolor';  //文本颜色插件
  import 'tinymce/plugins/fullscreen'; //全屏
  import 'tinymce/plugins/help';
  import 'tinymce/plugins/charmap';
  import 'tinymce/plugins/paste';
  import 'tinymce/plugins/print';
  import 'tinymce/plugins/preview';
  import 'tinymce/plugins/hr';
  import 'tinymce/plugins/anchor';
  import 'tinymce/plugins/pagebreak';
  import 'tinymce/plugins/spellchecker';
  import 'tinymce/plugins/searchreplace';
  import 'tinymce/plugins/visualblocks';
  import 'tinymce/plugins/visualchars';
  import 'tinymce/plugins/insertdatetime';
  import 'tinymce/plugins/nonbreaking';
  import 'tinymce/plugins/autosave';
  import 'tinymce/plugins/fullpage';
  import 'tinymce/plugins/toc';

  export default {
    components: {
      Editor
    },
    name: 'tinymce',
    props: {
      value: {
        type: String,
        default: ''
      },
      disabled: {
        type: Boolean,
        default: false
      },
      plugins: {
        type: [String, Array],
        default: 'lists image media table wordcount code fullscreen help  toc fullpage autosave nonbreaking insertdatetime visualchars visualblocks searchreplace spellchecker pagebreak link charmap paste print preview hr anchor'
      },
      toolbar: {
        type: [String, Array],
        default: 'newdocument undo redo |fontsizeselect | formatselect fontselect | bold italic underline strikethrough |codeformat blockformats| superscript subscript  | forecolor backcolor | alignleft aligncenter alignright alignjustify | outdent indent |  removeformat ' +
          '|code  bullist numlist | lists image media table link |fullscreen help toc fullpage restoredraft nonbreaking insertdatetime visualchars visualblocks searchreplace  pagebreak anchor charmap  pastetext print preview hr'
        // default: 'undo redo | bold italic underline strikethrough forecolor backcolor | fontsizeselect |  formatselect | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | lists image table | code | removeformat'
      }
    },
    data() {
      return {
        init: {
          language_url: '/tinymce/langs/zh_CN.js',
          language: 'zh_CN',
          skin_url: '/tinymce/skins/ui/oxide',
          // skin_url: 'tinymce/skins/ui/oxide-dark',//暗色系
          height: 600,
          plugins: this.plugins,
          toolbar: this.toolbar,
          branding: false,
          menubar: false,// 隐藏最上方menu菜单
          statusbar: true, // 隐藏编辑器底部的状态栏
          elementpath: true,  //禁用下角的当前标签路径
          paste_data_images: true, // 允许粘贴图像
          // theme_advanced_fonts: '宋体=宋体;微软雅黑=微软雅黑;新宋体=新宋体',
          font_formats: `
              微软雅黑=微软雅黑;
              宋体=宋体;
              黑体=黑体;
              仿宋=仿宋;
              楷体=楷体;
              隶书=隶书;
              幼圆=幼圆;
              Andale Mono=andale mono,times;
              Arial=arial, helvetica,
              sans-serif;
              Arial Black=arial black, avant garde;
              Book Antiqua=book antiqua,palatino;
              Comic Sans MS=comic sans ms,sans-serif;
              Courier New=courier new,courier;
              Georgia=georgia,palatino;
              Helvetica=helvetica;
              Impact=impact,chicago;
              Symbol=symbol;
              Tahoma=tahoma,arial,helvetica,sans-serif;
              Terminal=terminal,monaco;
              Times New Roman=times new roman,times;
              Trebuchet MS=trebuchet ms,geneva;
              Verdana=verdana,geneva;
              Webdings=webdings;
              Wingdings=wingdings,zapf dingbats`,
          plugins:
            'lists image media table wordcount code fullscreen help  toc fullpage autosave nonbreaking insertdatetime visualchars visualblocks searchreplace spellchecker pagebreak link charmap paste print preview hr anchor',

          // 此处为图片上传处理函数，这个直接用了base64的图片形式上传图片，
          // 如需ajax上传可参考https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_handler
          // images_upload_handler: (blobInfo, success, failure) => {
          //   const img = 'data:image/jpeg;base64,' + blobInfo.base64();
          //   success(img);
          // },

          // 图片上传三个参数，图片数据，成功时的回调函数，失败时的回调函数
          images_upload_handler: function (blobInfo, success, failure) {

            console.log(blobInfo.base64());
            // if (blobInfo.blob().size > self.maxSize) {
            //   failure('文件体积过大')
            // }
            if (self.accept.indexOf(blobInfo.blob().type) >= 0) {
              uploadPic()
            } else {
              failure('图片格式错误')
            }
            function uploadPic () {
              // 服务端接收文件的参数名，文件数据，文件名
              var params = new URLSearchParams();
              params.append('uploadFile', blobInfo.base64());
              params.append('name',blobInfo.filename());
              axios({
                method: 'POST',
                // 图片上传地址
                url: 'http://127.0.0.1:8000/api/persons/tinyUploadFile',
                data: params,
              })
                .then((res) => {
                  // 返回的地址
                  success(res.data.location)
                })
                .catch(() => {
                  failure('上传失败')
                })
            }
          }
        },
        myValue: this.value
      };
    },
    mounted() {
      tinymce.init({});
    },
    methods: {
      // 添加相关的事件，可用的事件参照文档=> https://github.com/tinymce/tinymce-vue => All available events
      // 需要什么事件可以自己增加
      onClick(e) {
        this.$emit('onClick', e, tinymce);
      },
      // 可以添加一些自己的自定义事件，如清空内容
      clear() {
        this.myValue = '';
      }
    },
    watch: {
      value(newValue) {
        this.myValue = newValue;
      },
      myValue(newValue) {
        this.$emit('input', newValue);
      }
    }
  };

</script>
<style scoped>

</style>
