import Vue from 'vue';
import VueI18n from 'vue-i18n'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'font-awesome/css/font-awesome.min.css';
import './assets/css/common.less';
import enLocale from 'element-ui/lib/locale/lang/en';
import zhLocale from 'element-ui/lib/locale/lang/zh-CN';
import App from './App.vue';
import VueRouter from 'vue-router';
import {routers} from './router';

import Cookies from 'js-cookie';
import Util from './libs/util';
import store from './vuexx/store';

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.config.productionTip = false
Vue.config.lang = 'zh-cn'

Vue.use(VueRouter);
Vue.use(VueI18n)
// Vue.use(ElementUI, { enLocale });
Vue.use(ElementUI, {
  i18n: function (path, options) {
      let value = i18n.t(path, options);
      if (value !== null && value !== undefined) {
          return value;
      }
      return '';
  }
});
Vue.locale = () => {};
// 自动设置语言
const navLang = navigator.language;
const localLang = (navLang === 'zh-CN' || navLang === 'en-US') ? navLang : false;
const lang = window.localStorage.getItem('language') || localLang || 'zh-CN';
const messages = {
  'en-US': Object.assign(require('./locale/lang/en-US'), enLocale),
  'zh-CN': Object.assign(require('./locale/lang/zh-CN'), zhLocale)
};
const i18n = new VueI18n({
  locale: lang,    // 语言标识通过切换locale的值来实现语言切换 this.$i18n.locale
  messages: messages,
  silentTranslationWarn: true
})

console.log()
// 路由配置
const RouterConfig = {
//   mode: 'history',
  routes: routers
};
const router = new VueRouter(
    RouterConfig
);
// console.log(RouterConfig)

let locking = 1
router.beforeEach((to, from, next) => {
    NProgress.start()
    Util.title(i18n.t('login.htxxglxt')+' - '+i18n.t(to.meta.title));
    if(locking == 1){
        if(!Cookies.get('username') && to.name !== 'login'){
            console.log('没有登录，进入'+to.name)
            next({
                name: 'login'
            });
        }else if(Cookies.get('username') && to.name === 'login'){
            console.log('刚刚login登录成功，进入下个页面'+to.name)
            next({
                name: 'home'
            });
        }else{
            console.log('已登录，将进入下个页面'+to.name)
            next();
        }
    }
});
router.afterEach(() => {
    NProgress.done()
})
window.vm = new Vue({
    el: '#app',
    i18n,
    router,
    store,
    render: h => h(App),
})
