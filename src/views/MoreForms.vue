<template>

  <div id="app">
    <el-row>
      <el-col :span="2">
        <div align="center" style="font-weight: bold">施工单位名称</div>
      </el-col>
      <el-col :span="2">
        <div align="center" style="font-weight: bold">工程名称</div>
      </el-col>
      <el-col :span="2">
        <div align="center" style="font-weight: bold">所属分公司</div>
      </el-col>
      <el-col :span="1">
        <div align="center" style="font-weight: bold">项目经理</div>
      </el-col>
      <el-col :span="1">
        <div align="center" style="font-weight: bold">项目负责人</div>
      </el-col>
      <el-col :span="2">
        <div align="center" style="font-weight: bold">联系电话</div>
      </el-col>
      <el-col :span="2">
        <div align="center" style="font-weight: bold">工程地点</div>
      </el-col>
      <el-col :span="1">
        <div align="center" style="font-weight: bold">建筑面积</div>
      </el-col>
      <el-col :span="1">
        <div align="center" style="font-weight: bold">结构类型</div>
      </el-col>
      <el-col :span="1">
        <div align="center" style="font-weight: bold">合同价款</div>
      </el-col>
      <el-col :span="2">
        <div align="center" style="font-weight: bold">开工日期</div>
      </el-col>
      <el-col :span="2">
        <div align="center" style="font-weight: bold">竣工日期</div>
      </el-col>
      <el-col :span="2">
        <div align="center" style="font-weight: bold">工程现状</div>
      </el-col>
      <el-col :span="1">
        <div align="center" style="font-weight: bold">状态</div>
      </el-col>
      <el-col :span="1">
        <div align="center" style="font-weight: bold">属性</div>
      </el-col>
    </el-row>
    <el-form :model="ruleForm" ref="ruleForm" label-width="0px" class="demo-dynamic"
             style="text-align: center; font-size: 8px">
      <!--      //动态生成的联系人表单-->
      <div class="moreRules">
        <div class="moreRulesIn" v-for="(item, index) in ruleForm.moreNotifyObject" :key="item.key">
          <el-row>
            <el-col :span="2">
              <el-form-item class="rules" label=""
                            :prop="'moreNotifyObject.' + index +'.construct_name'"
                            :rules="[{ required: true, message: '施工单位名称', trigger: 'blur' }]">
                <el-input v-model="item.construct_name" size="small" placeholder="施工单位名称"
                          :disabled="isReadonly" clearable
                          style="display: inline-block;width: 150px"
                          class="el-select_box"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-form-item class="rules" label=""
                            :prop="'moreNotifyObject.'+ index +'.project_name'"
                            :rules="[{ required: true, message: '工程名称', trigger: 'blur' }]">
                <el-input v-model="item.project_name" size="small" placeholder="工程名称"
                          :disabled="isReadonly" clearable
                          style="display: inline-block;width: 150px"
                          class="el-select_box"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-form-item class="rules" label=""
                            :prop="'moreNotifyObject.'+ index +'.corporation'"
                            :rules="[{ required: true, message: '所属分公司', trigger: 'blur' }]">
                <el-input v-model="item.corporation" size="small" placeholder="所属分公司"
                          :disabled="isReadonly" clearable
                          style="display: inline-block;width: 150px"
                          class="el-select_box"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="1">
              <el-form-item class="rules" label=""
                            :prop="'moreNotifyObject.'+ index +'.project_man'"
                            :rules="[{ required: true, message: '中标项目经理', trigger: 'blur' }]">
                <el-input v-model="item.project_man" size="small" placeholder="中标项目经理"
                          :disabled="isReadonly" clearable
                          style="display: inline-block;width: 75px"
                          class="el-select_box"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="1">
              <el-form-item class="rules" label="" :prop="'moreNotifyObject.'+ index +'.charge_man'"
                            :rules="[{ required: true, message: '项目负责人', trigger: 'blur' }]">
                <el-input v-model="item.charge_man" size="small" placeholder="项目负责人"
                          :disabled="isReadonly" clearable
                          style="display: inline-block;width: 75px"
                          class="el-select_box"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-form-item class="rules" label=""
                            :prop="'moreNotifyObject.' + index +'.phone'"
                            :rules="[{ required: true, message: '联系电话', trigger: 'blur' }]">
                <el-input v-model="item.phone" size="small" placeholder="联系电话"
                          :disabled="isReadonly" clearable
                          style="display: inline-block;width: 135px"
                          class="el-select_box"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-form-item class="rules" label=""
                            :prop="'moreNotifyObject.'+ index +'.construct_place'"
                            :rules="[{ required: true, message: '工程地点', trigger: 'blur' }]">
                <el-input v-model="item.construct_place" size="small" placeholder="工程地点"
                          :disabled="isReadonly" clearable
                          style="display: inline-block;width: 155px"
                          class="el-select_box"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="1">
              <el-form-item class="rules" label=""
                            :prop="'moreNotifyObject.'+ index +'.construct_area'"
                            :rules="[{ required: true, message: '建筑面积', trigger: 'blur' }]">
                <el-input v-model="item.construct_area" size="small" placeholder="建筑面积"
                          :disabled="isReadonly" clearable
                          style="display: inline-block;width: 70px"
                          class="el-select_box"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="1">
              <el-form-item class="rules" label=""
                            :prop="'moreNotifyObject.'+ index +'.construct_type'"
                            :rules="[{ required: true, message: '结构类型', trigger: 'blur' }]">
                <el-input v-model="item.construct_type" size="small" placeholder="结构类型"
                          :disabled="isReadonly" clearable
                          style="display: inline-block;width: 70px"
                          class="el-select_box"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="1">
              <el-form-item class="rules" label="" :prop="'moreNotifyObject.'+ index +'.price'"
                            :rules="[{ required: true, message: '合同价款', trigger: 'blur' }]">
                <el-input v-model="item.price" size="small" placeholder="合同价款"
                          :disabled="isReadonly" clearable
                          style="display: inline-block;width: 70px"
                          class="el-select_box"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-form-item class="rules" label=""
                            :prop="'moreNotifyObject.' + index +'.start_time'"
                            :rules="[{ required: true, message: '开工日期', trigger: 'blur' }]">
                <el-date-picker
                  v-model="item.start_time"
                  size="small"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期时间"
                  style="display: inline-block;width: 140px">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-form-item class="rules" label=""
                            :prop="'moreNotifyObject.'+ index +'.end_time'"
                            :rules="[{ required: true, message: '竣工日期', trigger: 'blur' }]">
                <el-date-picker
                  v-model="item.end_time"
                  size="small"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期时间"
                  style="display: inline-block;width: 140px">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-form-item class="rules" label=""
                            :prop="'moreNotifyObject.'+ index +'.cons_stat'"
                            :rules="[{ required: true, message: '工程现状', trigger: 'blur' }]">
                <el-input v-model="item.cons_stat" size="small" placeholder="工程现状"
                          :disabled="isReadonly" clearable
                          style="display: inline-block;width: 150px"
                          class="el-select_box"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="1">
              <el-form-item class="rules" label=""
                            :prop="'moreNotifyObject.'+ index +'.status'"
                            :rules="[{ required: true, message: '状态', trigger: 'blur' }]">
                <el-input v-model="item.status" size="small" placeholder="状态" :disabled="isReadonly"
                          style="display: inline-block;width: 70px" clearable
                          class="el-select_box"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="1">
              <el-form-item class="rules" label="" :prop="'moreNotifyObject.'+ index +'.attribute'"
                            :rules="[{ required: true, message: '属性', trigger: 'blur' }]">
                <el-input v-model="item.attribute" size="small" placeholder="属性"
                          :disabled="isReadonly" clearable
                          style="display: inline-block;width: 70px"
                          class="el-select_box"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="1">
              <el-button @click="deleteRules(item, index)" :disabled="isReadonly">删除</el-button>
            </el-col>
          </el-row>
<!--          <el-divider></el-divider>-->
        </div>
      </div>
      <el-form-item v-show="!isReadonly">
        <el-button class="addUser" @click="addUser" :disabled="isReadonly">添加更多</el-button>
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
          message: '联系人名称',
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
        moreNotifyObjectEmail: [{
          required: true,
          message: '邮箱地址',
          trigger: 'blur'
        },
          {
            type: 'email',
            message: '正确的邮箱地址',
            trigger: ['blur', 'change']
          }
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
