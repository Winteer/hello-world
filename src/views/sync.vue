<template xmlns:font="http://www.w3.org/1999/xhtml">
    <div id="sync">
        <el-container style="height: 100%; border: 1px solid #eee">
            <el-aside width="400px" style="background-color: rgb(255, 255, 255)">
                <div class="custom-tree-container">
                    <div class="block">
                        <p style="background-color: #f5deb3;font-size:20px" ><i class="el-icon-s-home"></i>组织机构</p>

                        <el-tree
                                ref="tree"
                                :data="data"
                                node-key="id"
                                @node-click="handleNodeClick"
                                default-expand-all
                                :highlight-current="true"
                                :expand-on-click-node="false">
                        <span class="custom-tree-node" slot-scope="{ node, data }">
                        <span> <i :class="data.icon"></i>{{ node.label }}</span>
                        <span>
                        <el-dialog title="修改" :visible.sync="modifyOrganVisible">
                            <el-form ref="form" :model="organFormData" label-width="80px"
                                     style="text-align: left; font-size: 12px">
                                <el-form-item label="部门名称">
                                    <el-input v-model="organFormData.dept_name"
                                              style="display: inline-block;width: 230px" placeholder="请输入内容"
                                              clearable></el-input>
                                </el-form-item>
                                <el-form-item label="类型">
                                    <el-select v-model="organFormData.dept_type" placeholder="请选择">
                                        <el-option label="总公司" value="0"></el-option>
                                        <el-option label="分公司" value="1"></el-option>
                                        <el-option label="部门" value="2"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="modifyDepartInfo(organFormData)">立即修改
                                    </el-button>
                                    <el-button @click="modifyOrganVisible = false">取消</el-button>
                                </el-form-item>
                            </el-form>
                        </el-dialog>

                        <el-dialog title="新增" :visible.sync="addOrganVisible">
                            <el-form ref="form" :model="organFormData" label-width="80px"
                                     style="text-align: left; font-size: 12px">
                                <el-form-item label="部门名称">
                                    <el-input v-model="organFormData.dept_name"
                                              style="display: inline-block;width: 230px" placeholder="请输入内容"
                                              clearable></el-input>
                                </el-form-item>
                                <el-form-item label="类型">
                                    <el-select v-model="organFormData.dept_type" placeholder="请选择">
                                        <el-option label="总公司" value="0"></el-option>
                                        <el-option label="分公司" value="1"></el-option>
                                        <el-option label="部门" value="2"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="排序">
                                    <el-input v-model="organFormData.sort"
                                              style="display: inline-block;width: 230px" placeholder="请输入内容"
                                              clearable></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="addDepartInfo(organFormData)">立即添加
                                    </el-button>
                                    <el-button @click="addOrganVisible = false">取消</el-button>
                                </el-form-item>
                            </el-form>
                        </el-dialog>
                            <el-button
                                    type="text"
                                    size="mini"
                                    @click="addNode(data)">
                                添加
                            </el-button>
                            <el-button
                                    type="text"
                                    size="mini"
                                    @click="modifyNode(data)">
                                修改
                            </el-button>
                            </span>
                         </span>
                        </el-tree>
                    </div>
                </div>
            </el-aside>

            <el-container>
                <el-main>
                    <el-row :gutter="20">

                        <el-dialog title="新增" :visible.sync="dialogFormVisible">
                            <el-form ref="form" :model="userFormData" label-width="80px"
                                     style="text-align: left; font-size: 12px">
                                <el-form-item label="姓名">
                                    <el-input v-model="userFormData.user_name"
                                              style="display: inline-block;width: 230px" placeholder="请输入内容"
                                              clearable></el-input>
                                </el-form-item>
                                <el-form-item label="照片">
                                    <el-input v-model="userFormData.user_photo"
                                              style="display: inline-block;width: 230px" placeholder="请输入内容"
                                              clearable></el-input>
                                </el-form-item>
                                <el-form-item label="身份证号">
                                    <el-input v-model="userFormData.user_code"
                                              style="display: inline-block;width: 230px" placeholder="请输入内容"
                                              clearable></el-input>
                                </el-form-item>
                                <el-form-item label="手机号">
                                    <el-input v-model="userFormData.user_mob" style="display: inline-block;width: 230px"
                                              placeholder="请输入内容" clearable></el-input>
                                </el-form-item>
                                <el-form-item label="所属公司">
                                    <el-select v-model="userFormData.company_code"
                                               @change="getDpartByComp(userFormData.company_code)"
                                               placeholder="请选择">
                                        <el-option
                                                v-for="item in organData"
                                                v-if="item.dept_type != '2'"
                                                :key="item.serial_no"
                                                :label="item.dept_name"
                                                :value="item.serial_no">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="所属部门">
                                    <el-select v-model="userFormData.user_roles" placeholder="请选择">
                                        <el-option
                                                v-for="item in deptData"
                                                :key="item.serial_no"
                                                :label="item.dept_name"
                                                :value="item.serial_no">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="职务">
                                    <el-select v-model="userFormData.user_post" placeholder="请选择">
                                        <el-option label="经理" value="0"></el-option>
                                        <el-option label="副经理" value="1"></el-option>
                                        <el-option label="合同管理员" value="2"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="状态">
                                    <el-select v-model="userFormData.user_flag" placeholder="请选择">
                                        <el-option label="可用" value="0"></el-option>
                                        <el-option label="禁用" value="1"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="排序">
                                    <el-input v-model="userFormData.sort" style="display: inline-block;width: 230px"
                                              placeholder="请输入内容" clearable></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="onSubmit(userFormData)">立即创建
                                    </el-button>
                                    <el-button @click="dialogFormVisible = false">取消</el-button>
                                </el-form-item>
                            </el-form>
                        </el-dialog>

                        <el-col :span="2">
                            <el-button type="button" @click="initForm(),dialogFormVisible = true">增加信息
                            </el-button>
                        </el-col>
                    </el-row>
                    <el-table :data="memberData" border style="width: 100%"
                              :header-cell-style="{background:'#eef1f6',color:'#606266'}">
                        <!-- <button @click="selectDemo">点击请求</button> -->
                        <el-table-column label="序号" width="60">
                            <template slot-scope="scope">
                                <span style="margin-left: 10px">{{(currentPage-1) * pageSize +memberData.indexOf(scope.row) +1 }} </span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="user_name" label="姓名" width="100">
                            <template slot-scope="scope">
                                <span style="margin-left: 10px">{{ scope.row.user_name }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="user_photo" label="照片" width="110">
                            <template slot-scope="scope">
                                <!--                                <span style="margin-left: 10px">{{ scope.row.user_photo }}</span>-->
                                <img :src="scope.row.user_photo" width="100" height="100"/>
                            </template>
                        </el-table-column>
                        <el-table-column prop="user_code" label="身份证号" width="200">
                            <template slot-scope="scope">
                                <span style="margin-left: 10px">{{ scope.row.user_code }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="user_mob" label="手机号" width="140">
                            <template slot-scope="scope">
                                <span style="margin-left: 10px">{{ scope.row.user_mob }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="company_code" label="所属公司" width="220">
                            <template slot-scope="scope">
                                <span style="margin-left: 10px">{{ scope.row.company_code }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="user_roles" label="所属部门" width="230">
                            <template slot-scope="scope">
                                <span style="margin-left: 10px">{{ scope.row.user_roles }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="user_post" label="职务" width="110">
                            <template slot-scope="scope">
                                <span style="margin-left: 10px">{{ scope.row.user_post }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="user_flag" label="状态" width="110">
                            <template slot-scope="scope">
                                <span style="margin-left: 10px">{{ scope.row.user_flag }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" width="120">
                            <template slot-scope="scope">
                                <el-button size="mini" type="danger" icon="el-icon-delete"
                                           @click="handleDelete(scope.row.serial_no)">删除
                                </el-button>
                                <el-dialog title="修改" :visible.sync="modifyDialogFormVisible">
                                    <el-form ref="form" :model="userFormData" label-width="80px">
                                        <el-form-item label="姓名">
                                            <el-input v-model="userFormData.user_name"
                                                      style="display: inline-block;width: 230px"></el-input>
                                        </el-form-item>
                                        <el-form-item label="照片">
                                            <el-input v-model="userFormData.user_photo"
                                                      style="display: inline-block;width: 230px"></el-input>
                                        </el-form-item>
                                        <el-form-item label="身份证号">
                                            <el-input v-model="userFormData.user_code"
                                                      style="display: inline-block;width: 230px"></el-input>
                                        </el-form-item>
                                        <el-form-item label="手机号">
                                            <el-input v-model="userFormData.user_mob"
                                                      style="display: inline-block;width: 230px"></el-input>
                                        </el-form-item>
                                        <el-form-item label="所属公司">
                                            <el-select v-model="userFormData.company_name"
                                                       @change="getDpartByComp(userFormData.company_name)"
                                                       placeholder="请选择">
                                                <el-option
                                                        v-for="item in organData"
                                                        v-if="item.dept_type != '2'"
                                                        :key="item.serial_no"
                                                        :label="item.dept_name"
                                                        :value="item.serial_no">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item label="所属部门">
                                            <el-select v-model="userFormData.user_dept" placeholder="请选择">
                                                <el-option
                                                        v-for="item in deptData"
                                                        :key="item.serial_no"
                                                        :label="item.dept_name"
                                                        :value="item.serial_no">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item label="职务">
                                            <el-select v-model="userFormData.user_post" placeholder="请选择">
                                                <el-option label="经理" value="0"></el-option>
                                                <el-option label="副经理" value="1"></el-option>
                                                <el-option label="合同管理员" value="2"></el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item label="状态" prop="number">
                                            <el-select v-model="userFormData.user_flag" placeholder="请选择">
                                                <el-option label="可用" value="0"></el-option>
                                                <el-option label="禁用" value="1"></el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item label="排序">
                                            <el-input v-model="userFormData.sort"
                                                      style="display: inline-block;width: 230px"></el-input>
                                        </el-form-item>
                                        <el-form-item>
                                            <el-button type="primary"
                                                       @click="modifyForm(userFormData)">立即修改
                                            </el-button>
                                            <el-button @click="modifyDialogFormVisible = false">取消</el-button>
                                        </el-form-item>
                                    </el-form>
                                </el-dialog>
                                <el-button slot="reference" size="mini" icon="el-icon-edit"
                                           @click="getForm(scope.row.serial_no),modifyDialogFormVisible = true">修改
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination v-if="pageshow" @size-change="handleSizeChange"
                                   @current-change="handleCurrentChange"
                                   :current-page="currentPage" :page-sizes="[5, 10, 50, 100]"
                                   :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
                                   :total="totalNum">
                    </el-pagination>
                </el-main>
<!--                <el-footer>-->
<!--                    -->
<!--                </el-footer>-->
            </el-container>
        </el-container>
    </div>
</template>
<script>
    let id = 1000;
    import EscapeMenu from '../components/EscapeMenu';

    export default {
        components: {
            'esc-menu': EscapeMenu
        },
        data: function () {
            var data = [{
                id: '',
                label: '',
                children: []
            }];
            return {
                organ: {
                    id: '',
                    label: '',
                    children: []
                },
                data: JSON.parse(JSON.stringify(data)),
                data: JSON.parse(JSON.stringify(data)),
                memberData: [{ //成员信息
                    serial_no: '',
                    user_name: '',
                    user_photo: '',
                    user_code: '',
                    user_cookie: '',
                    user_mob: '',
                    company_code: '',
                    user_roles: '',
                    user_post: '',
                    user_flag: '',
                    sort: '',
                }],
                userFormData: {  //用户表单信息
                    serial_no: '',
                    user_name: '',
                    user_photo: '',
                    user_code: '',
                    user_cookie: '',
                    user_mob: '',
                    company_code: '',
                    company_name: '',
                    user_roles: '',
                    user_dept: '',
                    user_post: '',
                    user_flag: '',
                    sort: '',
                },
                organData: [{ //组织机构信息
                    serial_no: '',
                    parent_id: '',
                    dept_name: '',
                    dept_type: '',
                    company_code: '',
                    sort: '',
                }],
                deptData: [{ //部门信息
                    serial_no: '',
                    parent_id: '',
                    dept_name: '',
                    dept_type: '',
                    company_code: '',
                    sort: '',
                }],
                organFormData: {  //组织机构表单信息
                    serial_no: '',
                    parent_id: '',
                    dept_name: '',
                    dept_type: '',
                    company_code: '',
                    sort: '',
                },
                tableData: [{
                    // id: '',
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
                    // id: 0,
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
                current_date: '',  //选择日期查看当天的预约
                sortColumn: '',//排序的字段名
                sortMethod: '',//排序方式；descending ascending null
                pageshow: true,
                searchWord: '',//搜索字段
                currentPage: 1,//当前页
                pageSize: 10,//页面大小
                totalNum: 0,//总记录数
                modifFlag: '',
                dialogTableVisible: false,
                modifyDialogFormVisible: false,//修改表单是否可见标志
                dialogFormVisible: false,
                addOrganVisible: false, //添加组织机构可见标志
                modifyOrganVisible: false,//
                modifyOrganKey: '', //待修改的组织id
                clickOrganKey: 'JTJTF7E0506941DE8FD9FF74BA3E9BE7', //被点击的组织id
                formLabelWidth: '120px',
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
            this.getDepartTreeInfo();
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
                this.userFormData.serial_no = '';
                this.userFormData.user_name = '';
                this.userFormData.user_photo = '';
                this.userFormData.user_code = '';
                this.userFormData.user_cookie = '';
                this.userFormData.user_mob = '';
                this.userFormData.company_code = '';
                this.userFormData.user_roles = '';
                this.userFormData.user_post = '';
                this.userFormData.user_flag = '';
                this.getAllCompany();
            },
            //初始化部门表单数据
            initDeptForm:function(){
                this.organFormData.serial_no = '';
                this.organFormData.parent_id = '';
                this.organFormData.dept_name = '';
                this.organFormData.dept_type = '';
                this.organFormData.company_code = '';
                this.organFormData.sort = '';
            },
            //根据id获取当前行的信息
            getForm: function (serial_no) {
                this.getAllCompany();
                var params = new URLSearchParams();
                params.append('serial_no', serial_no);
                this.$axios({
                    url: 'http://localhost:8000/organ/getInfoByID',
                    method: 'post',
                    data: params
                })
                    .then((response) => {
                        this.userFormData = response.data;
                    })
                    .catch(function (response) {
                        console.log(response);
                    });
            },
            //根据前台获取的信息修改后台对应的信息
            modifyForm: function (userFormData) {
                this.modifyDialogFormVisible = false;
                var params = new URLSearchParams();
                params.append('serial_no', userFormData.serial_no);
                params.append('user_name', userFormData.user_name);
                params.append('user_photo', userFormData.user_photo);
                params.append('user_code', userFormData.user_code);
                params.append('user_cookie', userFormData.user_cookie);
                params.append('user_mob', userFormData.user_mob);
                params.append('company_code', userFormData.company_code);
                params.append('user_roles', userFormData.user_roles);
                params.append('user_post', userFormData.user_post);
                params.append('user_flag', userFormData.user_flag);
                params.append('sort', userFormData.sort);
                this.$axios({
                    url: 'http://localhost:8000/organ/updateForm',
                    method: 'post',
                    data: params
                })
                    .then((response) => {
                        this.modifFlag = response.data;
                        if (this.modifFlag > 0) {
                            // this.getInfoByPage(this.currentPage, this.pageSize, this.sortColumn, this.sortMethod);
                            this.getInfoByPage(this.searchWord, this.current_date, this.currentPage, this.pageSize, this.sortColumn, this.sortMethod);
                            // this.selectDemo();
                            this.$message('修改成功！');
                        }
                        console.log(response.data);
                    })
                    .catch(function (response) {
                        console.log(response);
                    });
            },
            // 获得选中的节点的key
            checkedKeys: function (data) {
                alert(JSON.stringify(this.$refs.tree.getCheckedKeys()));
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
            //获取成员数量
            getCount: function (searchWord, current_date) {//获取总记录数
                var params = new URLSearchParams();
                params.append('companyCode', this.clickOrganKey);
                this.$axios({
                    url: 'http://localhost:8000/organ/getCount',
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
                    this.sortMethod = "";
                }
                this.getInfoByPage(this.searchWord, this.current_date, this.currentPage, this.pageSize, this.sortColumn, this.sortMethod);
                console.log(column = '-' + column.prop + '-' + column.order);
            },

            // 获取用户成员信息
            getInfoByPage: function (searchWord, current_date, currentPage, pageSize, sortColumn, sortMethod) {
                this.getCount(searchWord, current_date);
                var params = new URLSearchParams();
                params.append('current_date', current_date);
                params.append('searchWord', searchWord);
                params.append('pageNum', currentPage);
                params.append('pageSize', pageSize);
                params.append('sortColumn', sortColumn);
                params.append('sortMethod', sortMethod);
                params.append('companyCode', this.clickOrganKey);
                this.$axios({
                    url: 'http://localhost:8000/organ/getInfoByPage',
                    method: 'post',
                    data: params
                })
                    .then((response) => {
                        this.memberData = response.data;
                    })
                    .catch(function (response) {
                        console.log(response);
                    });
            },
            //获取所有公司信息
            getAllCompany: function () {
                var params = new URLSearchParams();
                this.$axios({
                    url: 'http://localhost:8000/organ/getAllCompany',
                    method: 'post',
                    data: params
                })
                    .then((response) => {
                        this.organData = response.data;
                    })
                    .catch(function (response) {
                        console.log(response);
                    });
            },
            //根据公司获取部门信息
            getDpartByComp: function (companycode) {
                var params = new URLSearchParams();
                this.userFormData.user_dept = '';
                params.append('companyCode', companycode);
                this.$axios({
                    url: 'http://localhost:8000/organ/getDpartByComp',
                    method: 'post',
                    data: params
                })
                    .then((response) => {
                        this.deptData = response.data;
                    })
                    .catch(function (response) {
                        console.log(response);
                    });
            },
            //根据id获取部门的信息
            getDepartById: function (serial_no) {
                var params = new URLSearchParams();
                params.append('serial_no', serial_no);
                this.$axios({
                    url: 'http://localhost:8000/organ/getDepartInfoByID',
                    method: 'post',
                    data: params
                })
                    .then((response) => {
                        this.organFormData.dept_name = response.data.dept_name;
                        this.organFormData.dept_type = response.data.dept_type;
                    })
                    .catch(function (response) {
                        console.log(response);
                    });
            },
            //获取组织机构树节点
            getDepartTreeInfo: function () {
                this.$axios({
                    url: 'http://localhost:8000/organ/getDepartInfo',
                    method: 'post',
                })
                    .then((response) => {
                        this.data = response.data;
                        console.log(response.data);
                    })
                    .catch(function (response) {
                        console.log(response);
                    });
            },
            // 点击节点名称触发的事件---搜索该节点下所有人员
            handleNodeClick: function (data) {
                this.clickOrganKey = data.id;
                this.currentPage = 1;
                this.getInfoByPage(this.searchWord, this.current_date, this.currentPage, this.pageSize, this.sortColumn, this.sortMethod);
            },
            //点击修改触发事件
            modifyNode(data) {
                this.modifyOrganKey = data.id;
                this.getDepartById(data.id);
                //获取到节点id后，只需要相应的更新表中的数据即可。
                this.modifyOrganVisible = true;
            },
            //点击添加触发事件
            addNode(data) {
                this.initDeptForm();
                this.modifyOrganKey = data.id;
                //获取到节点id后，只需要相应的更新表中的数据即可。
                this.addOrganVisible = true;
            },

            //根据前台获取的部门信息添加后台对应的信息
            addDepartInfo: function (organFormData) {
                this.addOrganVisible = false;
                var params = new URLSearchParams();
                params.append('serial_no', this.get_uuid());
                params.append('parent_id', this.modifyOrganKey);
                params.append('dept_name', organFormData.dept_name);
                params.append('dept_type', organFormData.dept_type);
                params.append('sort', organFormData.sort);
                this.$axios({
                    url: 'http://localhost:8000/organ/addDepart',
                    method: 'post',
                    data: params
                })
                    .then((response) => {
                        this.modifFlag = response.data;
                        if (this.modifFlag > 0) {
                            this.getDepartTreeInfo();
                            // this.selectDemo();
                            this.$message('添加成功！');
                        }
                        console.log(response.data);
                    })
                    .catch(function (response) {
                        console.log(response);
                    });
            },

            //根据前台获取的部门信息修改后台对应的信息
            modifyDepartInfo: function (organFormData) {
                this.modifyOrganVisible = false;
                var params = new URLSearchParams();
                params.append('serial_no', this.modifyOrganKey);
                params.append('dept_name', organFormData.dept_name);
                params.append('dept_type', organFormData.dept_type);
                this.$axios({
                    url: 'http://localhost:8000/organ/updateDepart',
                    method: 'post',
                    data: params
                })
                    .then((response) => {
                        this.modifFlag = response.data;
                        if (this.modifFlag > 0) {
                            this.getDepartTreeInfo();
                            // this.selectDemo();
                            this.$message('修改成功！');
                        }
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
                    url: 'http://localhost:8000/organ/deleteByID',
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
            //获取uuid
            get_uuid() {
                var s = [];
                var hexDigits = "0123456789abcdef";
                for (var i = 0; i < 36; i++) {
                    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
                }
                s[14] = "4";
                s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
                s[8] = s[13] = s[18] = s[23] = "-";
                var uuid = s.join("");
                return uuid;
            },
            //插入数据
            onSubmit(userFormData) {
                // if (this.validateAll("addNumber", "addPhone")) {
                this.dialogFormVisible = false;
                var flag = -1;
                var params = new URLSearchParams();
                var serial_no = this.get_uuid();
                params.append('serial_no', serial_no);
                params.append('user_name', userFormData.user_name);
                params.append('user_photo', userFormData.user_photo);
                params.append('user_code', userFormData.user_code);
                params.append('user_cookie', userFormData.user_cookie);
                params.append('user_mob', userFormData.user_mob);
                params.append('company_code', userFormData.company_code);
                params.append('user_roles', userFormData.user_roles);
                params.append('user_post', userFormData.user_post);
                this.$axios({
                    url: 'http://localhost:8000/organ/insertBookInfo',
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
                // }

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
                if (name == "phone") {
                    if (type == "blur") {
                        return this.validatePhone(this.form.phone, '手机号码', eleID);
                    }
                } else if (name == "number") {
                    if (type == "blur") {
                        return this.validateIntger(this.form.number, '人数', eleID);
                    }
                } else {
                    return false;
                }
            },
            //验证手机号
            validatePhone(phone, field, phoneID) {
                var addPhone = document.getElementById(phoneID);
                const reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/
                if (phone != "" && !reg.test(phone)) {
                    addPhone.style.color = "#ff0000";
                    this.$message({
                        message: '请在' + field + '处输入正确的手机号！',
                        center: true
                    })
                    return false;
                }
                addPhone.style.color = "#000000";
                return true;
            },
            //验证是否为数字
            validateIntger(num, field, numID) {
                var addNumber = document.getElementById(numID);
                const reg = /^[0-9]+$/
                if (!reg.test(num)) {
                    addNumber.style.color = "#ff0000";
                    this.$message({
                        message: '请在' + field + '处输入数字！',
                        center: true
                    })
                    return false;
                }
                addNumber.style.color = "#000000";
                return true;
            },
            append(data) {
                this.addOrganVisible = true;
            },
            organAdd(organFormData, data) {

                const newChild = {id: organFormData.company_code, label: organFormData.dept_name, children: []};
                if (!data.children) {
                    this.$set(data, 'children', []);
                }
                data.children.push(newChild);
                this.addOrganVisible = false;
            },
            remove(node, data) {
                const parent = node.parent;
                const children = parent.data.children || parent.data;
                const index = children.findIndex(d => d.id === data.id);
                children.splice(index, 1);
            },
        }
    }
</script>
<style type="text/css">
    @import url("//unpkg.com/element-ui@2.12.0/lib/theme-chalk/index.css");

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

    .custom-tree-node {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        padding-right: 8px;
    }

</style>
