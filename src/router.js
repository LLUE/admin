import Main from './views/Main.vue';

export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: 'Login - 登录'
    },
    component: resolve => {
        require(['./views/login.vue'], resolve);
    }
};

export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    title: 'nav.hyffjl',
    redirect: '/home',
    component: Main,
    icon: 'clipboard',
    meta: {
        roles: ['ADMIN'],
    },
    children: [{
        path: 'home',
        meta: {
            title: '首页'
        }, 
        name: 'home_index', 
        component: resolve => {
            require(['./views/home/home.vue'], resolve);
        }
    }]
};

export const testRouter = [
    {
        path: '/test',
        name: 'test_ones',
        title: '导航test',
        component: Main,
        icon: 'el-icon-star-on',
        meta: {
            roles: ['ADMIN'],
        },
        children: [{
            path: 'index',
            meta: {
                title: '测试1'
            }, 
            name: 'test_one', 
            component: resolve => {
                require(['./views/test/test1.vue'], resolve);
            }
        }]
    },
    {
        path: '/test22',
        name: 'test_index',
        title: 'test',
        component: Main,
        icon: 'el-icon-video-camera-solid',
        meta: {
            roles: ['ADMIN'],
        },
        children: [{
            path: 'index',
            meta: {
                title: '测试22222'
            }, 
            name: 'test_two', 
            component: resolve => {
                require(['./views/test/test22.vue'], resolve);
            }
        }]
    },
];

export const firstRouter = [
    {
        path: '/first',
        name: 'firstOne_index',
        title: '导航11111',
        component: Main,
        icon: 'el-icon-s-platform',
        meta: {
            roles: ['ADMIN'],
        },
        children: [{
            path: 'one',
            meta: {
                title: '导航1-1'
            }, 
            name: 'firstOne_indexx', 
            component: resolve => {
                require(['./views/first/firstOne.vue'], resolve);
            }
        }]
    },
    {
        path: '/first',
        name: 'firstTwo_index',
        title: '导航122222',
        component: Main,
        icon: 'el-icon-s-promotion',
        // meta: {
        //     roles: ['ROLE_ADMIN'],
        // },
        children: [{
            path: 'two',
            meta: {
                roles: ['ADMIN'],
                title: '导航1-2-1'
            }, 
            name: 'firstTwo_indexx', 
            component: resolve => {
                require(['./views/first/firstTwo.vue'], resolve);
            }
        },{
            path: 'twoX',
            meta: {
                roles: ['ADMIN'],
                title: '导航1-2-2'
            }, 
            name: 'firstTwoXX_index', 
            component: resolve => {
                require(['./views/first/firstTwoXX.vue'], resolve);
            }
        }]
    },
];

export const routers = [
    loginRouter,
    otherRouter,
    ...testRouter,
    ...firstRouter
]