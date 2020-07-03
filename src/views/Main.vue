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
                <span v-show="showMenuCur"><img src="../assets/logo.png" alt=""></span>
                <span v-show="!showMenuCur">{{$t('login.htxxglxt')}}</span>
            </div>
            <menus :isCollapse="showMenuCur"/>
        </div>
        <div class="main-header-con"
            :style="{paddingLeft: showMenuCur ? '64px' : '240px'}">
            <div class="main-header">
                <div class="lef">
                    <el-button type="text" circle size="small" :icon="!showMenuCur?'el-icon-s-fold':'el-icon-s-unfold'" class="btns" @click="showMenu"></el-button>
                    <el-button type="primary" circle size="small" @click="linkTo({name:'home_index'})" icon="fa fa-home" class="btns"></el-button>
                </div>
                <div class="rig">
                    <el-dropdown trigger="click" class="dropdown" @command="handleAdmin">
                        <span class="el-dropdown-link">
                            {{ userName }}
                            <i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item icon="fa fa-user-circle-o">{{$t('home.grzl')}}</el-dropdown-item>
                            <el-dropdown-item icon="fa fa-pencil-square-o">{{$t('login.xgmm')}}</el-dropdown-item>
                            <el-dropdown-item command="loginout" icon="fa fa-sign-out">{{$t('home.tc')}}</el-dropdown-item>
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
                <div class="tags_lef" @click="lefTag" v-show="lefBtn">
                    <i class="el-icon-arrow-left"></i>
                </div>
                <div class="pos_rel" ref="tagRel">
                <div class="pos_abs">
                    <tags-page-opened :pageTagsList="pageTagsList" id="tagsList" class="tagbox"></tags-page-opened>
                </div>
                </div>
                <div class="tags_rig" @click="rigTag" v-show="rigBtn">
                    <i class="el-icon-arrow-right"></i>
                </div>
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
            lis:[],
            lefBtn: false,
            rigBtn: false,
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
        let that = this
        this.init();
        // 查找当前用户之前登录时设置的主题
        let name = Cookies.get('username');
        this.initMoveTag();
    },
    watch: {
        mainTheme: function(theme){
            this.setMainTheme(theme)
        },
        pageTagsList: function() { 
            this.liswrap();
        },
        '$route':{
            handler(to,from) { 
                this.liswrap();
            }, 
            immediate: true
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
        linkTo(ops){
            this.$route.name != ops.name && this.$router.push(ops);
        },
        initMoveTag(){
            if(!this.$refs.tagRel){
                return false
            }
            let abs = this.$refs.tagRel.querySelector('.pos_abs');
            abs.style.cssText = `left: 0px`;
            this.lefBtn = false;
            this.rigBtn = (abs.clientWidth>this.$refs.tagRel.clientWidth) ? true : false;
        },
        rigTag(){
            this.liswrap();
            if(!this.$refs.tagRel){
                return false
            }
            let abs = this.$refs.tagRel.querySelector('.pos_abs');
            let lef = abs.offsetLeft
            let posW = this.$refs.tagRel.offsetWidth;
            let tagW = this.lis.reduce((all,cur,index,arr)=>{
                if (all+lef>posW){
                    return all+0
                }
                return all+cur
            })
            if(tagW>posW){
                abs.style.cssText = `left: ${posW-tagW}px`
                this.lefBtn = true
            }
        },
        lefTag(){
            this.liswrap();
            let abs = this.$refs.tagRel.querySelector('.pos_abs');
            let lef = -abs.offsetLeft
            
            let alls = null;
            let ars = this.lis.filter((a,i)=>{
                alls += a;
                return (alls<lef)
            })
            let preW = ars.length ? ars.reduce((all,cur,index,arr)=>{
                return all+cur
            }) : 0 ;

            if(preW<lef){
                abs.style.cssText = `left: ${-preW}px`
            }
            if(preW == 0){
                this.lefBtn = false
            }
        },
        liswrap(){
            this.$nextTick(()=>{
                let lis = []
                document.querySelector('#tagsList').querySelectorAll('.el-tag').forEach(e=>{
                    if(e.classList.contains('el-zoom-in-center-leave-active') !== true){
                        lis.push(e.offsetWidth+5)
                    }
                })
                this.lis = lis;
                return lis
            })
        },
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