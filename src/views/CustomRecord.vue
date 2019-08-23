<template>
  <div id="CustomRecord">
    <!-- Form -->
    <el-container style="height: 100%; border: 1px solid #eee">
      <el-header style="text-align: left; font-size: 12px">
        <nav-menu></nav-menu>
      </el-header>

      <el-main>
        <el-row :gutter="20">
          <el-col :span="2">
            <el-button type="button" @click="initForm(),dialogFormVisible = true">增加信息
            </el-button>
            <el-dialog title="新增" :visible.sync="dialogFormVisible">
              <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="名称">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                  <el-input v-model="form.address"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                  <el-input v-model="form.sex"></el-input>
                </el-form-item>
                <el-form-item>
                  <!-- <el-button type="primary" @click="onSubmit(form.name,form.address,form.sex)">立即创建</el-button> -->
                  <el-button type="primary" @click="onSubmit(form),dialogFormVisible = false">立即创建
                  </el-button>
                  <el-button @click="dialogFormVisible = false">取消</el-button>
                </el-form-item>
              </el-form>
            </el-dialog>
          </el-col>
          <el-col :span="3">
            <div>
              <el-input v-model="searchWord" style="display: inline-block;width: 230px"
                        placeholder="请输入搜索内容">
              </el-input>

            </div>
          </el-col>
          <el-col :span="2">
            <el-button type="button" @click="search(searchWord)">搜索
            </el-button>
          </el-col>
        </el-row>
        <el-table @sort-change="sortChange" :data="tableData" stripe=true border style="width: 100%">
          <!-- <button @click="selectDemo">点击请求</button> -->
          <el-table-column label="序号"  width="120">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{(currentPage-1) * pageSize +tableData.indexOf(scope.row) +1 }} </span>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="姓名" sortable="custom" width="180">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="sex" label="性别" sortable="custom" width="180">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.sex }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="地址" sortable="custom" width="180">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.address }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="create_datetime" label="日期" sortable="custom" width="200">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.date }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="280">
            <template slot-scope="scope">
              <el-button size="mini" type="danger" icon="el-icon-delete"
                         @click="handleDelete(scope.row.id)">删除
              </el-button>
              <el-dialog title="新增" :visible.sync="modifyDialogFormVisible">
                <el-form ref="form" :model="form" label-width="80px">
                  <el-form-item label="名称">
                    <el-input v-model="form.name"></el-input>
                  </el-form-item>
                  <el-form-item label="地址">
                    <el-input v-model="form.address"></el-input>
                  </el-form-item>
                  <el-form-item label="性别">
                    <el-input v-model="form.sex"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <!-- <el-button type="primary" @click="onSubmit(form.name,form.address,form.sex)">立即创建</el-button> -->
                    <el-button type="primary"
                               @click="modifyForm(form),modifyDialogFormVisible = false">立即修改
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
  import NavMenu from '../components/NavMenu';
  export default {
    components:{
      'nav-menu':NavMenu
    },
    data: function () {
      return {
        tableData: [{
          id: '',
          date: '',
          name: '',
          address: ''
        }],
        form: {
          id: 0,
          name: '',
          address: '',
          sex: ''
        },
        sortColumn:'',//排序的字段名
        sortMethod:'',//排序方式；descending ascending null
        pageshow: true,
        searchWord: '',//搜索字段
        currentPage: 1,//当前页
        pageSize: 5,//页面大小
        totalNum: 200,//总记录数
        modifFlag: '',
        dialogTableVisible: false,
        modifyDialogFormVisible: false,//修改表单是否可见标志
        dialogFormVisible: false,
        formLabelWidth: '120px'
      };
    },
    mounted: function () {
      // this.getCount(this.searchWord);
      this.getInfoByPage(this.searchWord, this.currentPage, this.pageSize,this.sortColumn,this.sortMethod);
    },
    methods: {
      //每次添加完之后清空form，防止下次点击添加时，数据残留
      initForm: function () {
        this.form.id = 0;
        this.form.name = '';
        this.form.address = '';
        this.form.sex = '';
      },
      //根据id获取当前行的信息
      getForm: function (id) {
        var params = new URLSearchParams();
        params.append('id', id);
        this.$axios({
          url: 'http://127.0.0.1:8000/api/persons/getInfoByID',
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
        var params = new URLSearchParams();
        params.append('id', form.id);
        params.append('name', form.name);
        params.append('address', form.address);
        params.append('sex', form.sex);
        this.$axios({
          url: 'http://127.0.0.1:8000/api/persons/updateForm',
          method: 'post',
          data: params
        })
          .then((response) => {
            this.modifFlag = response.data;
            if (this.modifFlag > 0) {
              this.getInfoByPage(this.searchWord, this.currentPage, this.pageSize,this.sortColumn,this.sortMethod);
              // this.selectDemo();
              this.$message('修改成功！');
            }
            console.log(response.data);
          })
          .catch(function (response) {
            console.log(response);
          });
      },
      selectDemo: function () {
        this.$axios({
          url: 'http://127.0.0.1:8000/api/persons/getAllInfo',
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
      getCount: function (searchWord) {//获取总记录数
        var params = new URLSearchParams();
        params.append('searchWord', searchWord);
        this.$axios({
          url: 'http://127.0.0.1:8000/api/persons/getCount',
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
        this.getInfoByPage(searchWord, this.currentPage, this.pageSize,this.sortColumn,this.sortMethod);
      },
      sortChange(column){
        this.sortColumn = column.prop;
        this.sortMethod = column.order;
        if(column.order === null){
          this.sortMethod = "";
        }
        this.getInfoByPage(this.searchWord, this.currentPage, this.pageSize,this.sortColumn,this.sortMethod);
        console.log(column = '-' + column.prop +'-'+column.order);
      },
      getInfoByPage: function (searchWord, currentPage, pageSize,sortColumn,sortMethod) {
        this.getCount(searchWord);
        var params = new URLSearchParams();
        params.append('searchWord', searchWord);
        params.append('pageNum', currentPage);
        params.append('pageSize', pageSize);
        params.append('sortColumn', sortColumn);
        params.append('sortMethod', sortMethod);
        this.$axios({
          url: 'http://127.0.0.1:8000/api/persons/getInfoByPage',
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
          url: 'http://127.0.0.1:8000/api/persons/deleteByID',
          method: 'post',
          data: params
        })
          .then((response) => {
            // this.open();
            // this.selectDemo();
            this.getInfoByPage(this.searchWord, this.currentPage, this.pageSize,this.sortColumn,this.sortMethod);
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
      onSubmit(form) {
        var flag = -1;
        var params = new URLSearchParams();
        params.append('name', form.name);
        params.append('address', form.address);
        params.append('sex', form.sex);
        this.$axios({
          url: 'http://127.0.0.1:8000/api/persons/insertPerson',
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
            this.getInfoByPage(this.searchWord, this.currentPage, this.pageSize,this.sortColumn,this.sortMethod);
          })
          .catch(function (response) {
          });
      },
      //分页
      handleSizeChange(val) {
        this.pageSize = val;
        this.getInfoByPage(this.searchWord, this.currentPage, this.pageSize,this.sortColumn,this.sortMethod);
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getInfoByPage(this.searchWord, this.currentPage, this.pageSize,this.sortColumn,this.sortMethod);
        console.log(`当前页: ${val}`);
      }
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

</style>
