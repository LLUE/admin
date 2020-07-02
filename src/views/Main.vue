<style lang="less">
    @import "./main.less";

    .main-header {
        min-width: 100%;
    }
</style>
<template>
    <div id="main" :class="{'dark':themes.dark, 'light':themes.light,'main':true}">
        <div class="sidebar-menu-con">
            <div class="logo"
            :style="{width: showMenuCur ? '64px' : '240px'}">
                <span v-if="showMenuCur"><img src="../assets/logo.png" alt=""></span>
                <span v-if="!showMenuCur">{{$t('login.htxxglxt')}}</span>
            </div>
            <menus :isCollapse="showMenuCur"/>
        </div>
        <div class="main-header-con"
            :style="{paddingLeft: showMenuCur ? '64px' : '240px'}">
            <div class="main-header">
                <div class="lef">
                    <el-button type="text" circle size="small" :icon="!showMenuCur?'el-icon-s-fold':'el-icon-s-unfold'" class="btns" @click="showMenu"></el-button>
                    <el-button type="primary" circle size="small" icon="fa fa-home" class="btns"></el-button>
                </div>
                <div class="rig">
                    <el-dropdown trigger="click" class="dropdown" @command="handleAdmin">
                        <span class="el-dropdown-link">
                            {{ userName }}
                            <i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item icon="fa fa-user-circle-o">个人资料</el-dropdown-item>
                            <el-dropdown-item icon="fa fa-pencil-square-o">修改密码</el-dropdown-item>
                            <el-dropdown-item command="loginout" icon="fa fa-sign-out">退出</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <el-avatar :src="avatorPath" size="medium" @error="errorImg" class="avator">
                        <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
                    </el-avatar>
                    
                    <el-button type="text" circle size="small" icon="el-icon-message" class="btns"></el-button>
                    <setDropdown></setDropdown>
                </div>
            </div>
            <div class="tags-con">
                <tags-page-opened :pageTagsList="pageTagsList" class="tagbox"></tags-page-opened>
            </div>
        </div>
        <div class="main-page-con"
        :style="{paddingLeft: showMenuCur ? '64px' : '240px'}">
            <div class="main-page">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import menus from './common/menus';
import setDropdown from './common/setDropdown';
import tagsPageOpened from './common/tagsPageOpened';
import Cookies from 'js-cookie';
import util from '../libs/util.js';

export default {
    components: {
        menus,
        setDropdown,
        tagsPageOpened
    },
    data(){
        return {
            themes:{
                dark:false,
                light:true,
            },
            showMenuCur: false,
            userName: '',
            messageCount: '',
        }
    },
    computed: {
        avatorPath () {
            return localStorage.avatorImgPath || 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png';
        },
        mainTheme () {
            return this.$store.state.theme;
        },
        pageTagsList () {
            return this.$store.state.pageOpenedList;  // 打开的页面的页面对象
        },
    },
    mounted () {
        this.init();
        // 查找当前用户之前登录时设置的主题
        let name = Cookies.get('username');
       
    },
    watch: {
        mainTheme: function(theme){
            this.setMainTheme(theme)
            
        }
    },
    created () {
        // 设置主题
        localStorage.theme && this.$store.commit('changeMainTheme', localStorage.theme);
        if(localStorage.theme){
            let themes = JSON.parse(localStorage.theme)
            if(themes.userName === Cookies.get('username')){
                this.$store.commit('changeMainTheme', themes.mainTheme)
            }
        }else{
            if(this.$store.state.theme){
                localStorage.theme = JSON.stringify({
                    userName: Cookies.get('username'),
                    mainTheme: this.$store.state.theme
                })
            }
        }
        this.setMainTheme(this.$store.state.theme);
        this.$i18n.locale && (localStorage.language = this.$i18n.locale);
        
        // 显示打开的页面的列表
        this.$store.commit('setOpenedList');
    },
    methods: {
        setMainTheme(val){
            if (val !== 'light') {
                Vue.use(require('../assets/css/theme.dark.less'))
            }else{
                Vue.use(require('../assets/css/theme.light.less'))
            }
            let curTheme = Object.keys(this.themes).filter(res=>{
                this.themes[res] = false
                return val == res
            })
            this.themes[curTheme[0]] = true
        },
        showMenu(){
            this.showMenuCur = !this.showMenuCur;
        },
        init () {
            this.$store.commit('setCurrentPageName', this.$route.name);
            this.$store.commit('setInitMenuCur');
            // let pathArr = util.setCurrentPath(this, this.$route.name);
            // if (pathArr.length >= 2) {
            //     this.$store.commit('addOpenSubmenu', pathArr[1].name);
            // }
            this.userName = Cookies.get('username');
            let messageCount = 3;
            this.theme = this.$store.state.theme
            this.setMainTheme(this.theme)
        },
        errorImg() {
            return true
        },
        handleAdmin(val){
            if(val == 'loginout'){
                // 退出登录
                Cookies.remove('username');
                Cookies.remove('password');
                Cookies.remove('hasGreet');
                Cookies.remove('access');

                localStorage.clear();
                this.$router.push({name: 'login'});
                return;
            }

        }
    }
}
</script>