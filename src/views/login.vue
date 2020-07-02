<style lang="less">
    @import './login.less';
</style>

<template>
<div id="login" class="login" @keydown.enter="handleSubmit">
    <div class="login-con">
        <el-card class="">
            <h2 slot="header" class="clearfix title">
                {{$t('login.welcome')}}
                <span class="red">{{$t('login.v')}}</span>
            </h2>
            <div class="form-con">
                <el-form ref="loginForm" :model="form" :rules="rules">
                    <el-form-item prop="userName">
                        <el-input size="medium" v-model="form.userName" :placeholder="$t('common.qsr')" clearable>
                            <span slot="prepend" class="fa fa-user"></span>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input size="medium" v-model="form.password" :placeholder="$t('common.qsr')" show-password>
                            <span slot="prepend" class="fa fa-lock"></span>
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" style="width:100%" size="medium" @click="handleSubmit">{{$t('login.login')}}</el-button>
                    </el-form-item>
                </el-form>
                
                <p class="sw">
                    {{$t('login.changeLang')}}：<span @click="changeLang()" class="langBtn">中文/English</span>
                </p>
            </div>
        </el-card>
    </div>
</div>
</template>

<script>
    import Cookies from 'js-cookie';
    import hexmd5 from '../libs/hex_md5';
    import util from '../libs/util';
    import userApi from '../api/user';
    // import extendApi from '../api/extend';

    export default {
        data () {
            return {
                // baseUrl: util.baseURL,
                imageT: Date.now(),
                form: {
                    userName: '',
                    password: '',
                },
                rules: {
                    userName: [
                        {required: true, message: this.$t('login.zhbnwk'), trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: this.$t('login.mmbnwk'), trigger: 'blur'}
                    ]
                },
                lange: null
            };
        },
        watch: {
            imageT () {
                this.form.verifyCode = '';
            }
        },
        created () {
            // this.getL();
            // this.getList();
        },
        methods: {
            handleSubmit () {
                this.$refs.loginForm.validate((valid) => {
                    if (valid) {
                        userApi.login({
                            username: this.form.userName,
                            psd: this.form.password
                        }, (res) => {
                            Cookies.set('username', this.form.userName);
                            Cookies.set('password', this.form.password);
                            Cookies.set('user_id', res.id);
                            // Cookies.set('permissions', res.permissions);
                            Cookies.set('Authorization', res.Authorization);
                            Cookies.set('roles', res.roles);
                            this.$store.commit('setAvator', res.avator);
                            Cookies.set('access', 0);
                            this.$router.push({name: 'home_index'});
                        }, (error) => {
                            console.log(error)
                            this.imageT = Date.now();
                            this.$message.error(error);
                        });
                        // this.$router.push({path: '/home'});
                    }
                });
            },
            getL () {
                let data = {
                    l: '',
                    m: '5'
                };
                // userApi.getLang(data, res => {
                //     console.log(res);
                // });
            },
            getList () {
                // userApi.getLangType((res) => {
                //     // this.data1 = res;
                //     console.log(res)
                // });
            },
            changeLang () {
                if (this.$i18n.locale === 'zh-CN') {
                    this.$i18n.locale = 'en-US';//关键语句
                } else {
                    this.$i18n.locale = 'zh-CN';//关键语句
                }
                window.localStorage['language'] = this.$i18n.locale;
            }
        }
    };
</script>

