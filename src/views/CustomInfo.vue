<template>
  <div id="customInfo">
    <vue-canvas-nest></vue-canvas-nest>
    <!-- Form -->
    <el-container style="height: 100%; border: 1px solid #eee">
      <el-header style="text-align: left; font-size: 12px">
        <esc-menu></esc-menu>
      </el-header>

      <el-main style="text-align: center">
        <el-row :gutter="20">
          <el-col :span="3">
            <div class="block">
              <el-date-picker
                v-model="current_date"
                align="right"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
                :picker-options="pickerOptions">
              </el-date-picker>
            </div>
          </el-col>

          <el-dialog title="新增" :visible.sync="dialogFormVisible">
            <el-form ref="form" :model="form" label-width="80px"
                     style="text-align: left; font-size: 12px">
              <el-form-item label="预约时间" style="margin-left: 0px">
                <div class="block">
                  <el-date-picker
                    v-model="form.book_time"
                    type="datetime"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    placeholder="选择日期时间">
                  </el-date-picker>
                </div>
              </el-form-item>
              <el-form-item label="预约主题">
                <el-select id="selectRoom" v-model="form.room"
                           @change="validateMethod('room','blur','selectRoom')" placeholder="请选择主题">
                  <el-option label="大宋奇案" value="大宋奇案"></el-option>
                  <el-option label="玉观音" value="玉观音"></el-option>
                  <el-option label="鬼娃学校" value="鬼娃学校"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="预约人数" prop="number">
                <el-input id="addNumber" v-model="form.number"
                          @blur="validateMethod('number','blur','addNumber')"
                          style="display: inline-block;width: 230px" placeholder="请输入人数"
                          clearable></el-input>
              </el-form-item>
              <el-form-item label="预约号码" prop="phone">
                <el-input id="addPhone" v-model="form.phone"
                          @blur="validateMethod('phone','blur','addPhone')"
                          style="display: inline-block;width: 230px" placeholder="请输入手机号码"
                          clearable></el-input>
              </el-form-item>
              <el-form-item label="支付方式">
                <el-select id="selectPay" v-model="form.pay_mode"
                           @change="validateMethod('pay_mode','blur','selectPay')"
                           placeholder="请选择支付方式">
                  <el-option label="支付宝" value="支付宝"></el-option>
                  <el-option label="微信" value="微信"></el-option>
                  <el-option label="现金" value="现金"></el-option>
                  <el-option label="美团" value="美团"></el-option>
                  <el-option label="云闪付" value="云闪付"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="支付金额">
                <el-input v-model="form.income" style="display: inline-block;width: 230px"
                          placeholder="请输入金额" clearable></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit(form)">立即创建
                </el-button>
                <el-button @click="dialogFormVisible = false">取消</el-button>
              </el-form-item>
            </el-form>
          </el-dialog>
          <el-col :span="4" :offset="1">
            <div>
              <el-input v-model="searchWord" style="width: 300px"
                        placeholder="请输入搜索内容"
                        clearable>
                <el-button slot="append" icon="el-icon-search" @click="search(searchWord)">搜索
                </el-button>
              </el-input>

            </div>
          </el-col>


          <el-col :span="2" :offset="3">
            <el-button type="button" @click="initForm(),dialogFormVisible = true">增加信息
            </el-button>
          </el-col>
          <el-col :span="3">
            <el-button type="primary" @click="uploadExcelVisible = true">Excel导入
            </el-button>
          </el-col>
          <el-col :span="3">
            <el-button type="primary" @click="deriveExcelVisible = true">Excel导出
            </el-button>
          </el-col>
        </el-row>

        <el-dialog title="导入Excel" :visible.sync="uploadExcelVisible" width="30%" >
          <el-upload
            class="upload-demo"
            ref="upload"
            action=""
            :on-preview="handlePreview"
            :on-change="handleChange"
            :on-exceed="handleExceed"
            :on-remove="handleRemove"
            :file-list="fileList"
            :limit="limitUpload"
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
            :auto-upload="false">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">导入</el-button>
            <div slot="tip" class="el-upload__tip">只能选择Excel文件</div>
          </el-upload>
        </el-dialog>

        <el-dialog title="导出Excel" :visible.sync="deriveExcelVisible" width="30%" >
          <el-form ref="form" :model="deriveCondi" label-width="80px"
                   style="text-align: left; font-size: 12px">
            <el-form-item label="频度">
              <el-select id="selectTime" v-model="deriveCondi.timeType"
                         placeholder="请选择导出频度">
                <el-option label="月" value="m"></el-option>
                <el-option label="年" value="y"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="导出类型" >
              <el-select id="conType" v-model="deriveCondi.conType"
                         placeholder="请选择导出类型">
                <el-option label="大宋奇案" value="大宋奇案"></el-option>
                <el-option label="玉观音" value="玉观音"></el-option>
                <el-option label="鬼娃学校" value="鬼娃学校"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="getExcelByCondi(deriveCondi)">导出
              </el-button>
              <el-button @click="deriveExcelVisible = false">取消</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>

        <el-table @sort-change="sortChange" :data="tableData" border style="width: 100%">
          <!-- <button @click="selectDemo">点击请求</button> -->
          <el-table-column label="序号" width="60">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{(currentPage-1) * pageSize +tableData.indexOf(scope.row) +1 }} </span>
            </template>
          </el-table-column>
          <el-table-column prop="book_time" label="预约时间" sortable="custom" width="180">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.book_time }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="room" label="预约主题" sortable="custom" width="110">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.room }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="number" label="人数" sortable="custom" width="80">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.number }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="phone" label="手机" sortable="custom" width="140">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.phone }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="phone" label="支付方式" sortable="custom" width="110">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.pay_mode }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="phone" label="收费" sortable="custom" width="110">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.income }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="start_time" label="开始时间" sortable="custom" width="200">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.start_time }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="end_time" label="结束时间" sortable="custom" width="200">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.end_time }}</span>
            </template>
          </el-table-column>
          <!--           <el-table-column prop="create_time" label="创建时间" sortable="custom" width="200">-->
          <!--            <template slot-scope="scope">-->
          <!--              <i class="el-icon-time"></i>-->
          <!--              <span style="margin-left: 10px">{{ scope.row.create_time }}</span>-->
          <!--            </template>-->
          <!--          </el-table-column>-->
          <el-table-column label="操作" width="120">
            <template slot-scope="scope">
              <el-button size="mini" type="danger" icon="el-icon-delete"
                         @click="handleDelete(scope.row.id)">删除
              </el-button>
              <el-dialog title="修改" :visible.sync="modifyDialogFormVisible">
                <el-form ref="form" :model="form" label-width="80px">
                  <el-form-item label="预约时间">
                    <!--                    <el-input v-model="form.book_time" style="display: inline-block;width: 230px"></el-input>-->
                    <div class="block">
                      <el-date-picker
                        v-model="form.book_time"
                        type="datetime"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        placeholder="选择日期时间">
                      </el-date-picker>
                    </div>
                  </el-form-item>
                  <el-form-item label="预约主题">
                    <!--                    <el-input v-model="form.room" style="display: inline-block;width: 230px"></el-input>-->
                    <el-select v-model="form.room"
                               @change="validateMethod('room','blur','selectRoom')"
                               placeholder="请选择">
                      <el-option label="大宋奇案" value="大宋奇案"></el-option>
                      <el-option label="玉观音" value="玉观音"></el-option>
                      <el-option label="鬼娃学校" value="鬼娃学校"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="预约人数" prop="number">
                    <el-input id="modifyNum" v-model="form.number"
                              @blur="validateMethod('number','blur','modifyNum')"
                              style="display: inline-block;width: 230px"></el-input>
                  </el-form-item>
                  <el-form-item label="手机号码" prop="phone">
                    <el-input id="modifyPhone" v-model="form.phone"
                              @blur="validateMethod('phone','blur','modifyPhone')"
                              style="display: inline-block;width: 230px"></el-input>
                  </el-form-item>
                  <el-form-item label="支付方式">
                    <el-select v-model="form.pay_mode"
                               @change="validateMethod('pay_mode','blur','selectPay')"
                               placeholder="请选择">
                      <el-option label="支付宝" value="支付宝"></el-option>
                      <el-option label="微信" value="微信"></el-option>
                      <el-option label="现金" value="现金"></el-option>
                      <el-option label="美团" value="美团"></el-option>
                      <el-option label="云闪付" value="云闪付"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="支付金额">
                    <el-input v-model="form.income"
                              style="display: inline-block;width: 230px"></el-input>
                  </el-form-item>
                  <el-form-item label="开始时间">
                    <div class="block">
                      <el-date-picker
                        v-model="form.start_time"
                        type="datetime"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        placeholder="选择日期时间">
                      </el-date-picker>
                    </div>
                  </el-form-item>
                  <el-form-item label="结束时间">
                    <div class="block">
                      <el-date-picker
                        v-model="form.end_time"
                        type="datetime"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        placeholder="选择日期时间">
                      </el-date-picker>
                    </div>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary"
                               @click="modifyForm(form)">立即修改
                    </el-button>
                    <el-button @click="modifyDialogFormVisible = false">取消</el-button>
                  </el-form-item>
                </el-form>
              </el-dialog>
              <el-button slot="reference" size="mini" icon="el-icon-edit"
                         @click="getForm(scope.row.id),modifyDialogFormVisible = true">修改
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
      <el-footer>
        <el-pagination v-if="pageshow" @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page="currentPage" :page-sizes="[5, 10, 50, 100]"
                       :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
                       :total="totalNum">
        </el-pagination>
      </el-footer>
    </el-container>
  </div>
</template>
<script>
  import EscapeMenu from '../components/EscapeMenu';
  import vueCanvasNest from 'vue-canvas-nest';

  export default {
    components: {
      'esc-menu': EscapeMenu,
      'vue-canvas-nest': vueCanvasNest
    },
    data: function () {
      return {
        tableData: [{
          id: '',
          book_time: '',
          phone: '',
          room: '',
          number: '',
          pay_mode: '',
          income: '',
          start_time: '',
          end_time: '',
          create_time: ''
        }],
        excelData: [{
          id: '',
          book_time: '',
          phone: '',
          room: '',
          number: '',
          pay_mode: '',
          income: '',
          start_time: '',
          end_time: '',
          create_time: ''
        }],
        form: {
          id: 0,
          book_time: '',
          phone: '',
          room: '',
          number: '',
          pay_mode: '',
          income: '',
          start_time: '',
          end_time: '',
          create_time: ''
        },
        deriveCondi:{//导出可选条件
          timeType:'m',//m按月导出，y按年导出
          conType:'大宋奇案',//0大宋，1玉观音，2鬼娃学校
        },
        current_date: '',  //选择日期查看当天的预约
        sortColumn: '',//排序的字段名
        sortMethod: '',//排序方式；descending ascending null
        pageshow: true,
        searchWord: '',//搜索字段
        currentPage: 1,//当前页
        pageSize: 5,//页面大小
        totalNum: 0,//总记录数
        modifFlag: '',
        dialogTableVisible: false,
        modifyDialogFormVisible: false,//修改表单是否可见标志
        dialogFormVisible: false,
        formLabelWidth: '120px',
        limitUpload: 1,//限制只能上传1个文件
        fileTemp: null,//指向最新上传的附件，起始定义为null。
        fileList:[],//上传文件列表
        uploadExcelVisible:false,//导入
        deriveExcelVisible:false,//导出
        //日期框快捷方法
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
          shortcuts: [{
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '明天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }]
        },
      };
    },
    mounted: function () {
      // this.getCount(this.searchWord);
      let time = new Date();
      let y = time.getFullYear();
      let m = time.getMonth() + 1;
      let d = time.getDate();
      this.current_date = y + '-' + m + '-' + d;
      this.getInfoByPage(this.searchWord, this.current_date, this.currentPage, this.pageSize, this.sortColumn, this.sortMethod);
    },
    methods: {
      //每次添加完之后清空form，防止下次点击添加时，数据残留
      initForm: function () {
        this.form.id = 0;
        this.form.book_time = '';
        this.form.phone = '';
        this.form.room = '';
        this.form.number = '';
        this.form.pay_mode = '';
        this.form.income = '';
        this.form.start_time = '';
        this.form.end_time = '';
        this.form.create_time = '';
      },
      //根据id获取当前行的信息
      getForm: function (id) {
        var params = new URLSearchParams();
        params.append('id', id);
        this.$axios({
          url: 'http://localhost:8000/book/getInfoByID',
          method: 'post',
          data: params
        })
          .then((response) => {
            this.form = response.data;
          })
          .catch(function (response) {
            console.log(response);
          });
      },
      //根据前台获取的信息修改后台对应的信息
      modifyForm: function (form) {
        if (this.validateAll('modifyNum', 'modifyPhone')) {
          this.modifyDialogFormVisible = false;
          var params = new URLSearchParams();
          params.append('id', form.id);
          params.append('book_time', form.book_time);
          params.append('phone', form.phone);
          params.append('room', form.room);
          params.append('number', form.number);
          params.append('pay_mode', form.pay_mode);
          params.append('income', form.income);
          params.append('start_time', form.start_time);
          params.append('end_time', form.end_time);
          this.$axios({
            url: 'http://localhost:8000/book/updateForm',
            method: 'post',
            data: params
          })
            .then((response) => {
              this.modifFlag = response.data;
              if (this.modifFlag > 0) {
                this.getInfoByPage(this.searchWord, this.current_date, this.currentPage, this.pageSize, this.sortColumn, this.sortMethod);
                // this.selectDemo();
                this.$message('修改成功！');
              }
              console.log(response.data);
            })
            .catch(function (response) {
              console.log(response);
            });
        }
      },

      selectDemo: function () {
        this.$axios({
          url: 'http://localhost:8000/api/persons/getAllInfo',
          method: 'post'
        })
          .then((response) => {
            this.tableData = response.data;
            console.log(response.data);
          })
          .catch(function (response) {
            console.log(response);
          });
      },
      getCount: function (searchWord, current_date) {//获取总记录数
        var params = new URLSearchParams();
        params.append('searchWord', searchWord);
        params.append('current_date', current_date);
        this.$axios({
          url: 'http://localhost:8000/book/getCount',
          method: 'post',
          data: params

        })
          .then((response) => {
            this.totalNum = response.data;
            console.log(response.data);
          })
          .catch(function (response) {
            console.log(response);
          });
      },
      search: function (searchWord) {
        this.currentPage = 1;//搜索完毕后默认第一页
        this.getInfoByPage(searchWord, this.current_date, this.currentPage, this.pageSize, this.sortColumn, this.sortMethod);
      },
      sortChange(column) {
        this.sortColumn = column.prop;
        this.sortMethod = column.order;
        if (column.order === null) {
          this.sortMethod = '';
        }
        this.getInfoByPage(this.searchWord, this.current_date, this.currentPage, this.pageSize, this.sortColumn, this.sortMethod);
        console.log(column = '-' + column.prop + '-' + column.order);
      },
      getInfoByPage: function (searchWord, current_date, currentPage, pageSize, sortColumn, sortMethod) {
        this.getCount(searchWord, current_date);
        var params = new URLSearchParams();
        params.append('current_date', current_date);
        params.append('searchWord', searchWord);
        params.append('pageNum', currentPage);
        params.append('pageSize', pageSize);
        params.append('sortColumn', sortColumn);
        params.append('sortMethod', sortMethod);
        this.$axios({
          url: 'http://localhost:8000/book/getInfoByPage',
          method: 'post',
          data: params
        })
          .then((response) => {
            this.tableData = response.data;
            console.log(response.data);
          })
          .catch(function (response) {
            console.log(response);
          });
      },
      handleEdit: function (index, row) {
        console.log(index, row);
      },
      handleDelete: function (id) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.delete(id);
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
      },
      delete(id) {
        var params = new URLSearchParams();
        params.append('id', id);
        this.$axios({
          url: 'http://localhost:8000/book/deleteByID',
          method: 'post',
          data: params
        })
          .then((response) => {
            // this.open();
            // this.selectDemo();
            this.getInfoByPage(this.searchWord, this.current_date, this.currentPage, this.pageSize, this.sortColumn, this.sortMethod);
            console.log(response.data);
          })
          .catch(function (response) {
            console.log(response);
          });
      },
      open() {
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
      },
      //插入数据
      onSubmit(form) {
        if (this.validateAll('addNumber', 'addPhone')) {
          this.dialogFormVisible = false;
          var flag = -1;
          var params = new URLSearchParams();
          params.append('book_time', form.book_time);
          params.append('phone', form.phone);
          params.append('room', form.room);
          params.append('number', form.number);
          params.append('pay_mode', form.pay_mode);
          params.append('income', form.income);
          this.$axios({
            url: 'http://localhost:8000/book/insertBookInfo',
            method: 'post',
            data: params
          })
            .then((response) => {
              flag = response.data;
              if (flag > 0) {
                this.$message('插入成功！');
              } else {
                this.$message('插入失败！');
              }
              this.getInfoByPage(this.searchWord, this.current_date, this.currentPage, this.pageSize, this.sortColumn, this.sortMethod);
            })
            .catch(function (response) {
            });
        }
      },
      //分页
      handleSizeChange(val) {
        this.pageSize = val;
        this.getInfoByPage(this.searchWord, this.current_date, this.currentPage, this.pageSize, this.sortColumn, this.sortMethod);
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getInfoByPage(this.searchWord, this.current_date, this.currentPage, this.pageSize, this.sortColumn, this.sortMethod);
        console.log(`当前页: ${val}`);
      },
      //上传excel
      submitUpload() {
        if(this.fileTemp){
          if((this.fileTemp.type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') || (this.fileTemp.type == 'application/vnd.ms-excel')){
            this.importExcel(this.fileTemp)
          } else {
            this.$message({
              type:'warning',
              message:'附件格式错误，请删除后重新上传！'
            })
          }
        } else {
          this.$message({
            type:'warning',
            message:'请上传附件！'
          })
        }
      },
      importExcel(obj) {
        let _this = this;
        // 通过DOM取文件数据
        this.file = obj
        var rABS = false; //是否将文件读取为二进制字符串
        var f = this.file;
        var reader = new FileReader();
        //if (!FileReader.prototype.readAsBinaryString) {
        FileReader.prototype.readAsBinaryString = function(f) {
          var binary = "";
          var rABS = false; //是否将文件读取为二进制字符串
          var pt = this;
          var wb; //读取完成的数据
          var outdata;
          var reader = new FileReader();
          reader.onload = function(e) {
            var bytes = new Uint8Array(reader.result);
            var length = bytes.byteLength;
            for(var i = 0; i < length; i++) {
              binary += String.fromCharCode(bytes[i]);
            }
            var XLSX = require('xlsx');
            if(rABS) {
              wb = XLSX.read(btoa(fixdata(binary)), { //手动转化
                type: 'base64'
              });
            } else {
              wb = XLSX.read(binary, {
                type: 'binary'
              });
            }
            outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);//outdata就是你想要的东西
            console.log("outdata---->"+outdata);
            this.da = [...outdata]
            console.log("da---->"+this.da);
            let arr = []
            this.da.map(v => {
              console.log("v---->"+v.toString());
              let obj = {}
              obj.code = v['运行环境']
              console.log("v['运行环境']---->"+v['运行环境']);
              obj.type = v['工作简述']
              arr.push(obj)
            })
            console.log("arr---->"+arr);
            _this.$message({
              message: '导入成功！',
              center: true
            });
            _this.uploadExcelVisible=false;
            return arr
          }
          reader.readAsArrayBuffer(f);
        }

        if(rABS) {
          reader.readAsArrayBuffer(f);
        } else {
          reader.readAsBinaryString(f);
        }
      },

      //文件改变
      handleChange(file, fileList){
        console.log('handleChange');
        this.fileTemp = file.raw
      },
      //删除文件
      handleRemove(file, fileList) {
        console.log('handleRemove');
        console.log(file, fileList);
      },
      //文件预览
      handlePreview(file) {
        console.log('handlePreview');
        console.log(file);
      },
      //文件数量限制
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      //导出Excel
      //根据条件导出Excel
      getExcelByCondi(condition){
        let time = new Date();
        let y = time.getFullYear();
        let m = time.getMonth() + 1;
        let d = time.getDate();
        var timeStr;
        if(condition.timeType === 'm'){
          timeStr = y+'-'+m;
        }else{
          timeStr = y;
        }
        var params = new URLSearchParams();
        params.append('timeType',  condition.timeType);
        params.append('timeStr',  timeStr);
        params.append('conType',   condition.conType);
        this.$axios({
          url: 'http://localhost:8000/book/getInfoByCondi',
          method: 'post',
          data: params
        })
          .then((response) => {
            this.excelData = response.data;
            this.getExcel(this.excelData);
            this.deriveExcelVisible=false;
            console.log(response.data);
          })
          .catch(function (response) {
            console.log(response);
          });
      },

      getExcel(res) {
        require.ensure([], () => {
          const { export_json_to_excel } = require('../../public/excel/Export2Excel.js')
          const tHeader = ['主题', '电话','办公室']
          const filterVal = ['room', 'phone','office']
          const list = res
          const data = this.formatJson(filterVal, list)
          export_json_to_excel(tHeader, data, 'test')
        })
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      },

      //全字段验证
      validateAll(numID, phoneID) {
        if (!this.validateIntger(this.form.number, '人数', numID)) {
          return false;
        } else if (!this.validatePhone(this.form.phone, '手机号码', phoneID)) {
          return false;
        }
        return true;
      },
      //按照需求进行表单验证
      validateMethod(name, type, eleID) {
        if (name == 'phone') {
          if (type == 'blur') {
            return this.validatePhone(this.form.phone, '手机号码', eleID);
          }
        } else if (name == 'number') {
          if (type == 'blur') {
            return this.validateBookNum(this.form.number, '人数', eleID);
          }
        } else if (name == 'pay_mode' || name == 'room') {
          if (type == 'blur') {
            return this.trueIncome(this.form.room, this.form.number, this.form.pay_mode);
          }
        } else {
          return false;
        }
      },
      //验证手机号
      validatePhone(phone, field, phoneID) {
        var addPhone = document.getElementById(phoneID);
        const reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
        if (phone != '' && !reg.test(phone)) {
          addPhone.style.color = '#ff0000';
          this.$message({
            message: '请在' + field + '处输入正确的手机号！',
            center: true
          });
          return false;
        }
        addPhone.style.color = '#000000';
        return true;
      },
      //支付方式更改时，对应修改收入
      validatePayMode(pay_mode, field, numID) {
        if (this.form.room === '玉观音' || this.form.room === '大宋奇案') {
          this.form.income = this.form.number * 69;
        } else if (this.form.room === '鬼娃学校') {
          this.form.income = this.form.number * 59;
        }
        if (pay_mode === '美团') {
          this.form.income = this.form.income * 0.93;
        }
        return true;
      },
      //根据密室，人数，支付类型计算实际收入
      trueIncome(room, number, payMode) {
        if (room === '玉观音' || room === '大宋奇案') {
          this.form.income = number * 69;
        } else if (this.form.room === '鬼娃学校') {
          this.form.income = number * 59;
        }
        if (payMode === '美团') {
          this.form.income = (this.form.income * 0.93).toFixed(2);
        }
        return true;
      },
      //验证是否为数字
      validateIntger(num, field, numID) {
        var addNumber = document.getElementById(numID);
        const reg = /^[0-9]+$/;
        if (!reg.test(num)) {
          addNumber.style.color = '#ff0000';
          this.$message({
            message: '请在' + field + '处输入数字！',
            center: true
          });
          return false;
        }
        // if (this.form.room === '玉观音' || this.form.room === '大宋奇案') {
        //     this.form.income = this.form.number * 69;
        // } else if (this.form.room === '鬼娃学校') {
        //     this.form.income = this.form.number * 59;
        // }
        addNumber.style.color = '#000000';
        return true;
      },
      //验证预约人数
      validateBookNum(num, field, numID) {
        var addNumber = document.getElementById(numID);
        const reg = /^[0-9]+$/;
        if (!reg.test(num)) {
          addNumber.style.color = '#ff0000';
          this.$message({
            message: '请在' + field + '处输入数字！',
            center: true
          });
          return false;
        }
        this.trueIncome(this.form.room, this.form.number, this.form.pay_mode);
        addNumber.style.color = '#000000';
        return true;
      },
      calculateIncome(room, number) {
        if (room === '玉观音' || room === '大宋奇案') {
          this.form.income = number * 69;
        } else if (room === '鬼娃学校') {
          this.form.income = number * 59;
        }
      }

      // calculateIncome() {
      //     if (this.form.room === '玉观音' || this.form.room === '大宋奇案') {
      //         this.form.income = this.form.number * 69;
      //     } else if (this.form.room === '鬼娃学校') {
      //         this.form.income = this.form.number * 59;
      //     }
      // }
    }
  };
</script>
<style type="text/css">
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
