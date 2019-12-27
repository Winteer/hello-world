<template>

  <div id="app">
<!--    <el-row>-->
<!--      <el-col :span="4">-->
<!--        <div align="center">施工单位名称:</div>-->
<!--      </el-col>-->
<!--      <el-col :span="4">-->
<!--        <div align="center">施工单位名称:</div>-->
<!--      </el-col>-->
<!--      <el-col :span="4">-->
<!--        <div align="center">施工单位名称:</div>-->
<!--      </el-col>-->
<!--      <el-col :span="4">-->
<!--        <div align="center">施工单位名称:</div>-->
<!--      </el-col>-->
<!--      <el-col :span="4">-->
<!--        <div align="center">施工单位名称:</div>-->
<!--      </el-col>-->
<!--      <el-col :span="4">-->
<!--        <div align="center">施工单位名称:</div>-->
<!--      </el-col>-->
<!--    </el-row>-->


    <el-form :model="ruleForm" ref="ruleForm" label-width="120px" class="demo-dynamic"
             style="text-align: left; font-size: 12px">
      <!--      //动态生成的联系人表单-->
      <div class="moreRules">
        <div class="moreRulesIn" v-for="(item, index) in ruleForm.moreNotifyObject" :key="item.key">
          <el-row>
            <el-col :span="4">
              <el-form-item class="rules" label="施工单位名称:"
                            :prop="'moreNotifyObject.' + index +'.construct_name'"
                            :rules="[{ required: true, message: '请输入施工单位名称', trigger: 'blur' }]">
                <el-input v-model="item.construct_name" placeholder="请输入施工单位名称" :disabled="isReadonly"
                          style="display: inline-block;width: 230px"
                          class="el-select_box"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item class="rules" label="工程名称:" :prop="'moreNotifyObject.'+ index +'.project_name'"
                            :rules="[{ required: true, message: '请输入工程名称', trigger: 'blur' }]">
                <el-input v-model="item.project_name" placeholder="请输入工程名称" :disabled="isReadonly"
                          style="display: inline-block;width: 230px"
                          class="el-select_box"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item class="rules" label="所属分公司:" :prop="'moreNotifyObject.'+ index +'.corporation'"
                            :rules="[{ required: true, message: '请输入所属分公司', trigger: 'blur' }]">
                <el-input v-model="item.corporation" placeholder="请输入所属分公司" :disabled="isReadonly"
                          style="display: inline-block;width: 230px"
                          class="el-select_box"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item class="rules" label="中标项目经理:" :prop="'moreNotifyObject.'+ index +'.project_man'"
                            :rules="[{ required: true, message: '请输入中标项目经理', trigger: 'blur' }]">
                <el-input v-model="item.project_man" placeholder="请输入中标项目经理" :disabled="isReadonly"
                          style="display: inline-block;width: 230px"
                          class="el-select_box"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item class="rules" label="项目负责人:" :prop="'moreNotifyObject.'+ index +'.charge_man'"
                            :rules="[{ required: true, message: '请输入项目负责人', trigger: 'blur' }]">
                <el-input v-model="item.charge_man" placeholder="请输入项目负责人" :disabled="isReadonly"
                          style="display: inline-block;width: 230px"
                          class="el-select_box"></el-input>
              </el-form-item>
            </el-col>
          </el-row>


          <el-row>
            <el-col :span="4">
              <el-form-item class="rules" label="联系电话:"
                            :prop="'moreNotifyObject.' + index +'.phone'"
                            :rules="[{ required: true, message: '请输入联系电话', trigger: 'blur' }]">
                <el-input v-model="item.phone" placeholder="请输入联系电话" :disabled="isReadonly"
                          style="display: inline-block;width: 230px"
                          class="el-select_box"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item class="rules" label="工程地点:" :prop="'moreNotifyObject.'+ index +'.construct_place'"
                            :rules="[{ required: true, message: '请输入工程地点', trigger: 'blur' }]">
                <el-input v-model="item.construct_place" placeholder="请输入工程地点" :disabled="isReadonly"
                          style="display: inline-block;width: 230px"
                          class="el-select_box"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item class="rules" label="建筑面积:" :prop="'moreNotifyObject.'+ index +'.construct_area'"
                            :rules="[{ required: true, message: '请输入建筑面积', trigger: 'blur' }]">
                <el-input v-model="item.construct_area" placeholder="请输入建筑面积" :disabled="isReadonly"
                          style="display: inline-block;width: 230px"
                          class="el-select_box"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item class="rules" label="结构类型:" :prop="'moreNotifyObject.'+ index +'.project_man'"
                            :rules="[{ required: true, message: '请输入结构类型', trigger: 'blur' }]">
                <el-input v-model="item.project_man" placeholder="请输入结构类型" :disabled="isReadonly"
                          style="display: inline-block;width: 230px"
                          class="el-select_box"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item class="rules" label="合同价款:" :prop="'moreNotifyObject.'+ index +'.charge_man'"
                            :rules="[{ required: true, message: '合同价款', trigger: 'blur' }]">
                <el-input v-model="item.charge_man" placeholder="合同价款" :disabled="isReadonly"
                          style="display: inline-block;width: 230px"
                          class="el-select_box"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="4">
              <el-form-item class="rules" label="开工日期:"
                            :prop="'moreNotifyObject.' + index +'.start_time'"
                            :rules="[{ required: true, message: '请输入开工日期', trigger: 'blur' }]">
                <el-input v-model="item.start_time" placeholder="请输入开工日期" :disabled="isReadonly"
                          style="display: inline-block;width: 230px"
                          class="el-select_box"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item class="rules" label="竣工日期:" :prop="'moreNotifyObject.'+ index +'.construct_place'"
                            :rules="[{ required: true, message: '请输入竣工日期', trigger: 'blur' }]">
                <el-input v-model="item.construct_place" placeholder="请输入竣工日期" :disabled="isReadonly"
                          style="display: inline-block;width: 230px"
                          class="el-select_box"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item class="rules" label="工程现状:" :prop="'moreNotifyObject.'+ index +'.construct_area'"
                            :rules="[{ required: true, message: '请输入工程现状', trigger: 'blur' }]">
                <el-input v-model="item.construct_area" placeholder="请输入工程现状" :disabled="isReadonly"
                          style="display: inline-block;width: 230px"
                          class="el-select_box"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item class="rules" label="状态:" :prop="'moreNotifyObject.'+ index +'.project_man'"
                            :rules="[{ required: true, message: '请输入状态', trigger: 'blur' }]">
                <el-input v-model="item.project_man" placeholder="请输入状态" :disabled="isReadonly"
                          style="display: inline-block;width: 230px"
                          class="el-select_box"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item class="rules" label="属性:" :prop="'moreNotifyObject.'+ index +'.charge_man'"
                            :rules="[{ required: true, message: '属性', trigger: 'blur' }]">
                <el-input v-model="item.charge_man" placeholder="属性" :disabled="isReadonly"
                          style="display: inline-block;width: 230px"
                          class="el-select_box"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
          <el-col :span="1">
            <el-button @click="deleteRules(item, index)" :disabled="isReadonly">删除</el-button>
          </el-col>
          </el-row>
          <el-divider></el-divider>
        </div>
      </div>
      <el-form-item v-show="!isReadonly">
        <el-button class="addUser" @click="addUser" :disabled="isReadonly"><i
          class="iconfont icon-tianjialianxiren"></i>添加更多联系人
        </el-button>
        <el-button @click="submitInfos(ruleForm)">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  export default {
    name: 'MoreForms',
    data() {
      return {

        isReadonly: false,
        ruleForm: {
          moreNotifyObject: [{
            construct_name: '', //施工单位名称
            project_name: '', //	工程名称
            corporation: '', //	所属分公司
            project_man: '', //	中标项目经理
            charge_man: '', //	项目负责人
            phone: '', //手机号码
            construct_place: '', //	工程地点
            construct_area: '', //:'' //	建筑面积
            construct_type: '', //	结构类型
            price: '', //	合同价款
            start_time: '', //	开工日期
            end_time: '', //	竣工日期
            cons_stat: '', //	工程现状
            status: '', //	状态
            attribute: '' //	属性
          }]
        }
      };
    },
    methods: {
      mounted: function () {
        this.initData();
      },
      //初始化数据
      initData() {
        this.ruleFrom.moreNotifyObject = [];
      },
      ruleForm: {},
      //新增联系人
      addUser() {
        this.ruleForm.moreNotifyObject.push({
          notifyobject: '',
          email: ''
        });
      },
      //删除联系人
      deleteRules(item, index) {
        this.index = this.ruleForm.moreNotifyObject.indexOf(item);
        if (index !== -1) {
          this.ruleForm.moreNotifyObject.splice(index, 1);
        }
      },
      moreNotifyObjectRules: {
        moreNotifyObjectName: [{
          required: true,
          message: '请输入联系人名称',
          trigger: 'blur'
        },
          {
            validator: (rule, value, callback) => {
              if (value.length > 15 || value.length < 2) {
                callback(new Error('长度必须为2~8个字符'));
              } else {
                var reg = new RegExp('[`~!@#$^&*()=|{}\':\',\\[\\].<>《》/?~！@#￥……&*（）——|{}【】‘；：”“\'。，、？]');
                if (reg.test(value)) {
                  callback(new Error('不能含有特殊字符'));
                } else {
                  callback();
                }
              }
            },
            trigger: 'change'
          }
        ],
        moreNotifyObjectEmail: [{ required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ]
      },
      submitInfos: function (ruleForm) {
        var params = new URLSearchParams();

      }
    }
  };
</script>

<style scoped>
  @import url("//unpkg.com/element-ui@2.11.0/lib/theme-chalk/index.css");

  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-dialog {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 500px;
    margin: 0 !important;
    transform: translate(-50%, -50%);
  }

</style>
