import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/main.vue'
import Login from '@/components/login.vue'
import Register from '@/components/register.vue'
import ForgetPass from '@/components/forgetpass.vue'
import UserCenter from '@/components/usercenter.vue'
import SubmitTable from '@/components/submitMain.vue'
import Image from '@/components/image.vue'
import store from '@/store/index'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/index',
      name: 'Index',
      component: Main,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login

    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/forgetpass',
      component: ForgetPass
    },
    {
      path: '/usercenter',
      component: UserCenter,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/submit',
      name: 'submit',
      component: SubmitTable,
      meta:{
        requiresAuth: true
      }

    },
    {
      path: '/image',
      name: 'image',
      component: Image,
      meta:{
        requiresAuth: true
      }

    }
  ]
});

// 注册全局钩子用来拦截导航
router.beforeEach((to, from, next) => {
  // 获取store里的token

  let token = store.state.token;
  // 判断要去的路由有没有requiresAuth,requireAuth字段表示该路由是需要登陆的
  if (to.meta.requiresAuth) {
    if (token) {
      next();
    } else {
      next({
        path: '/login',
        query: {redirect: to.fullPath} // 将刚刚要去的路由path作为参数，方便登录成功后直接跳转到该路由 
      });
    }
  } else {
    next();
  }
})

export default router ;
