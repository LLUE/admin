import Main from './views/Main.vue';

export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: 'Login - 登录'
    },
    // component: resolve => {
    //     require(['./views/login.vue'], resolve);
    // }
    component: r => require.ensure([], () => r(require('@/views/login')), 'links')
};

export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    title: 'home.home',
    redirect: '/home',
    component: Main,
    icon: 'clipboard',
    meta: {
        roles: ['ADMIN'],
    },
    children: [{
        path: 'home',
        meta: {
            title: 'home.home'
        }, 
        name: 'home_index',
        component: r => require.ensure([], () => r(require('@/views/home/home')), 'links')
    }]
};

export const testRouter = [
    {
        path: '/test',
        name: 'test_ones',
        title: 'nav.yjzdh1',
        component: Main,
        icon: 'el-icon-star-on',
        meta: {
            roles: ['ADMIN'],
        },
        children: [{
            path: 'index',
            meta: {
                title: 'nav.yjzdh1'
            }, 
            name: 'test_one', 
            component: r => require.ensure([], () => r(require('@/views/test/test1')), 'links')
        }]
    },
    {
        path: '/test22',
        name: 'test_index',
        title: 'nav.yjzdh2',
        component: Main,
        icon: 'el-icon-video-camera-solid',
        meta: {
            roles: ['ADMIN'],
        },
        children: [{
            path: 'index',
            meta: {
                title: 'nav.yjzdh2'
            }, 
            name: 'test_two', 
            component: r => require.ensure([], () => r(require('@/views/test/test22')), 'links')
        }]
    },
];

export const firstRouter = [
    {
        path: '/first',
        name: 'firstOne_index',
        title: 'nav.ejzdh1',
        component: Main,
        icon: 'el-icon-s-platform',
        meta: {
            roles: ['ADMIN'],
        },
        children: [{
            path: 'one',
            meta: {
                title: 'nav.ejzdh1'
            }, 
            name: 'firstOne_indexx', 
            component: r => require.ensure([], () => r(require('@/views/first/firstOne')), 'links')
        }]
    },
    {
        path: '/first',
        name: 'firstTwo_index',
        title: 'nav.ejzdh2',
        component: Main,
        icon: 'el-icon-s-promotion',
        // meta: {
        //     roles: ['ROLE_ADMIN'],
        // },
        children: [{
            path: 'two',
            meta: {
                roles: ['ADMIN'],
                title: 'nav.sjzdh1'
            }, 
            name: 'firstTwo_indexx', 
            component: r => require.ensure([], () => r(require('@/views/first/firstTwo')), 'links')
        },{
            path: 'twoX',
            meta: {
                roles: ['ADMIN'],
                title: 'nav.sjzdh2'
            }, 
            name: 'firstTwoXX_index', 
            component: r => require.ensure([], () => r(require('@/views/first/firstTwoXX')), 'links')
        }]
    },
];

export const routers = [
    loginRouter,
    otherRouter,
    ...testRouter,
    ...firstRouter
]