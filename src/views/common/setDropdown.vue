<style lang="less" scoped>

    .langs{
        font-size: 12px;
        font-weight: bold;
    }
    .themeOn{
        color: #409EFF;
    }
    .langOn{
        color: #409EFF;
    }
</style>
<template>
    <el-dropdown trigger="click" class="dropdown" @command="handleCommand">
        <span class="el-dropdown-link">
            <el-button type="text" circle size="small" icon="el-icon-setting" class="btns"></el-button>
        </span>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item disabled>{{$t('home.ztqh')}}</el-dropdown-item>
            <el-dropdown-item :class="{'themeOn':light}" command="light" icon="fa fa-sun-o">{{$t('home.glms')}}</el-dropdown-item>
            <el-dropdown-item :class="{'themeOn':dark}" command="dark" icon="fa fa-moon-o">{{$t('home.yjms')}}</el-dropdown-item>
            <el-dropdown-item disabled>{{$t('home.yyqh')}}</el-dropdown-item>
            <el-dropdown-item :class="{'langOn':langZh}" command="zh-CN" icon="fa fa-language">中文简体</el-dropdown-item>
            <el-dropdown-item :class="{'langOn':langEn}" command="en-US"><span class="langs">En</span> English</el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
</template>

<script>
import Cookies from 'js-cookie';

export default {
    props: [''],
    data() {
        return {
            langZh: false,
            langEn: false,
            light: false,
            dark: false,
        };
    },
    computed:{
        // ...mapState(['theme'])
    },
    created(){
        this.changeLang(this.$i18n.locale)
        this.changeTheme(this.$store.state.theme)
        
    },
    methods: {
        changeLang(val){
            if(val == 'en-US'){
                this.langZh = false;
                this.langEn = true;
            }else{
                this.langZh = true;
                this.langEn = false;
            }
        },
        changeTheme(val){
            if(val == 'light'){
                this.light = true;
                this.dark = false;
            }else{
                this.light = false;
                this.dark = true;
            }
        },
        handleCommand (val) {
            let name = Cookies.get('username');
            if(val=='light'||val=='dark'){
                this.$store.commit('changeMainTheme', val);
                window.localStorage['theme'] = JSON.stringify({
                    userName: name,
                    mainTheme: val
                });
                this.changeTheme(val)
            }
            
            if(val=='zh-CN'||val=='en-US'){
                window.localStorage['language'] = this.$i18n.locale = val;
                this.changeLang(val)
            }
        }
    }
}
</script>