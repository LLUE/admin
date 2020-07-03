<style lang="less" scoped>
    @import "./menus.less";
     .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 240px;
        height: 100%;
    }
    .el-submenu{
            -webkit-touch-callout: none; 
            -webkit-user-select: none; 
            -khtml-user-select: none;
            -moz-user-select: none; 
            -ms-user-select: none; 
            user-select: none; 
    }
    .el-menu .el-menu-item{
        span{
            -webkit-touch-callout: none; 
            -webkit-user-select: none; 
            -khtml-user-select: none;
            -moz-user-select: none; 
            -ms-user-select: none; 
            user-select: none; 
        }
    }
</style>
<template>
<!-- :background-color="muenTheme.menuBgColor"
    :text-color="muenTheme.menuTxtColor"
    :default-active="menuActive"
    :default-openeds="openeds"
    :active-text-color="muenTheme.activeTextColor" -->
    <el-menu class="el-menu-vertical-demo menuInit" 
    :unique-opened="true"
    :default-active="menuActive"
    :collapse="isCollapse">
        <el-submenu :index="item.id" v-for="item in filterMenus" :key="item.id">
            <template slot="title">
                <i :class="item.icon"></i>
                <span slot="title">{{$t(item.name)}}</span>
            </template>
            <!-- <el-menu-item-group v-if="item.menus.length<=1">
                <el-menu-item v-for="(data,y) in item.menus" 
                :index="item.name+data.name" 
                :key="y"
                @click="readerTo(data)"
                >
                    {{item.name+data.name}}
                </el-menu-item>
            </el-menu-item-group> -->
            <div v-for="(data,y) in item.menus" :key="y">
                <div v-if="data.children.length<=1">
                    <el-menu-item  
                    :index="data.id" 
                    @click="readerTo(data)"
                    >
                    <i :class="data.icon"></i>
                    <span slot="title">{{$t(data.title)}}</span>
                    </el-menu-item>
                </div>
                <div v-if="data.children.length>1">
                    <el-submenu
                    :index="data.id"
                    >
                        <template slot="title">
                            <i :class="data.icon"></i>
                            <span slot="title">{{$t(data.title)}}</span>
                        </template>
                        <el-menu-item v-for="(parm,z) in data.children"
                        :key="z"
                        :index="parm.id"
                        @click="readerTo(parm)"
                        >{{$t(parm.meta.title)}}</el-menu-item>
                    </el-submenu>
                </div>
            </div>
        </el-submenu>
        
        <!-- <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">导航四</span>
        </el-menu-item> -->
    </el-menu>
</template>

<script>

import {
    testRouter,
    firstRouter,
} from '../../router';
import Cookies from 'js-cookie';
import util from '@/libs/util.js';

export default {
    props: ['isCollapse'],
    data() {
        return {
            show: true,
            menuActive: '/firstTwo',
            // openeds: ['/firstTwo'],
            selected: localStorage.getItem('currentMenu') || 'test',
            datas: [
                {id: 'test', path: 'test_index', name: 'nav.dh1', menus: testRouter, icon:'el-icon-platform-eleme'},
                {id: 'first', path: 'first_index', name: 'nav.dh2', menus: firstRouter, icon:'el-icon-user-solid'},
            ]
        };
    },
    computed: {
        filterMenus () {
            let accessCode = Cookies.get('roles');
            let newMenus = [];
            this.datas.forEach((menu) => {
                let menuList = [];
                menu.menus.forEach((item, index) => {
                    item.id = menu.id+(index+1)
                    let access = item.meta && item.meta.roles;
                    if (access !== undefined) {
                        if (util.showThisRoute(access, accessCode)) {
                            if (item.children.length <= 1) {
                                menuList.push(item);
                            }else{
                                let i = menuList.push(item);
                                let childrenArr = [];
                                childrenArr = item.children.filter((child,sort) => {
                                    child.id = menu.id+(index+1)+(sort+1);
                                    let childAccess = child.meta && child.meta.roles;
                                    if (childAccess !== undefined) {
                                        if (childAccess === accessCode) {
                                            return child;
                                        }
                                    } else {
                                        return child;
                                    }
                                });
                                menuList[i - 1].children = childrenArr;
                            }
                        }
                    } else {
                        if (item.children.length <= 1) {
                            menuList.push(item);
                        } else {
                            let i = menuList.push(item);
                            let childrenArr = [];
                            childrenArr = item.children.filter((child,sort) => {
                                child.id = menu.id+(index+1)+(sort+1);
                                let childAccess = child.meta && child.meta.roles;
                                if (childAccess !== undefined) {
                                    if (util.showThisRoute(childAccess, accessCode)) {
                                        return child;
                                    }
                                } else {
                                    return child;
                                }
                            });
                            menuList[i - 1].children = childrenArr;
                        }
                    }
                });
                if (menuList.length) {
                    newMenus.push({
                        id: menu.id,
                        menus: menuList,
                        name: menu.name,
                        path: menu.path,
                        icon: menu.icon,
                    });
                }
            });
            
            this.$store.commit('setTagsList', newMenus);
            // console.log('菜单列表 ',newMenus);
            return newMenus
        },
        tagsList () {
            return this.$store.state.tagsList;
        },
        // menuList () {
        //     return this.$store.state.menuList;
        // },
        currentPageName () {
            return this.$store.state.currentPageName;
        },
        menuCur () {
            return this.$store.state.menuCur;
        },
    },
    watch: {
        selected (newVal) {
            localStorage.setItem('currentMenu', newVal);
        },
        '$route' (to,f) {
            if (to.name === 'home_index') {
                // console.log(to)
            }
        },
        menuCur(e){
            this.$nextTick(() => {
                // 设置菜单
                this.menuActive = e.id|| '/'
            })
        }
        
    },
    created () {
    },
    mounted () {
    },
    methods: {
        readerTo (active) {
            this.$parent.initMoveTag();
            this.$store.commit('changeMenu', active);
            if(this.currentPageName !== this.$route.name){
                this.$router.push({
                    name: this.currentPageName
                });
            }
        },
        
    }
}
</script>