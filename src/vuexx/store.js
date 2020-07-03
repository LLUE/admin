import Vue from 'vue';
import Vuex from 'vuex';
import Cookies from 'js-cookie';
import Util from '@/libs/util.js';
import {
    routers,
    otherRouter} from '../router';

Vue.use(Vuex);

const state = {
    routers: [
        routers,
        // ...appRouter
    ],
    menuCur: null,
    pageOpenedList: [],
    tagsList: [],
    theme: 'light',
    currentPageName: null,
}


const getters = {}
const mutations = {
    setMenuCur (state, active) {
        state.menuCur = active;
        localStorage.menuCur = JSON.stringify(state.menuCur);
    },
    setInitMenuCur (state,to) {
        state.menuCur = localStorage.menuCur ? JSON.parse(localStorage.menuCur) : otherRouter.children[0];
        localStorage.menuCur = JSON.stringify(state.menuCur);
    },
    setTagsList (state, newMenus) {
        let tagsList = [];
        newMenus.map((item) => {
            item.menus.map(tag =>{
                if (tag.children.length <= 1) {
                    tagsList.push(tag);
                } else {
                    tagsList.push(...tag.children);
                } 
            })
        });
        state.tagsList.push(...tagsList);
    },
    changeMainTheme (state, mainTheme) {
        // console.log('修改主题为：'+mainTheme)
        state.theme = mainTheme;
    },
    setAvator (state, path) {
        localStorage.avatorImgPath = path;
    },
    clearTag (state) {
        state.pageOpenedList.splice(1, state.pageOpenedList.length);
        localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
    },
    subTag (state,index) {
        state.pageOpenedList.splice(index, 1);
        localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
    },
    moveToSecond (state, index) {
        let openedPage = state.pageOpenedList[index];
        state.pageOpenedList.splice(index, 1);
        state.pageOpenedList.splice(index === 0 ? 0 : 1, 0, openedPage);
        localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
    },
    increateTag (state, tagObj) {
        state.pageOpenedList.splice(1, 0, tagObj);
        localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
    },
    setOpenedList (state) {
        state.tagsList = [otherRouter.children[0]];
        state.pageOpenedList = localStorage.pageOpenedList ? JSON.parse(localStorage.pageOpenedList) : [otherRouter.children[0]];
    },
    setCurrentPageName (state, name) {
        state.currentPageName = name;
    },
    filterMenuName(state,menu){
        state.currentPageName = (menu.children && menu.children.length==1) ? menu.children[0].name : menu.name;
    },
    changeMenu (state,active) {
        let pageOpenedList = state.pageOpenedList;
        let openedPageLen = pageOpenedList.length;
        let i = 0;
        let tagHasOpened = false;
        this.commit('filterMenuName',active);
        this.commit('setMenuCur',active);
        while (i < openedPageLen) {
            if (active.id === pageOpenedList[i].id) {  // 页面已经打开
                this.commit('moveToSecond',i);
                // console.log('进入true,有重复的标签')
                tagHasOpened = true;
                break;
            }
            i++;
        }
        if (!tagHasOpened) {
            let tag = state.tagsList.filter((item) => {
                return active.id === item.id;
            })[0];
            this.commit('increateTag', tag);
        }
    },
    changeTags (state,active) {
        this.commit('filterMenuName',active);
        this.commit('setMenuCur',active);
    },
}
const actions = {}

 
// 状态管理

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
});