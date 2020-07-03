<style lang="less" scoped>
    @import "./home.less";
</style>
<template>
    <el-card shadow="never">
        <div slot="header" class="clearfix">
            <span>{{$t('home.yhlb')}}</span>
            <el-button style="float: right; padding: 3px 0" type="text">{{$t('home.czan')}}</el-button>
        </div>
        <div class="home-main">
            <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                    prop="id"
                    label="ID">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="姓名">
                </el-table-column>
                <el-table-column
                    prop="email"
                    label="Email">
                </el-table-column>
                <el-table-column
                    prop="roles"
                    label="Roles">
                </el-table-column>
            </el-table>
        </div>
    </el-card>

</template>

<script>
import userApi from '@/api/user';
export default {
    data() {
        return {
            tableData: []
        }
    },
    created(){
        this.getList()
    },
    methods: {
        getList() {
            userApi.getAllList((res) => {
                this.tableData = res
            })
        }
    }
}
</script>