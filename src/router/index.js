import Vue from 'vue'
import VueRouter from 'vue-router'
import Article from '@/components/ArticleCom/Article.vue'
import ArticleDetai from '@/components/ArticleCom/ArticleDetais.vue'
import More from '@/components/MoreCom/More.vue'
import Login from '@/components/Login.vue'
import Qa from '@/components/QaCom/Qa.vue'
import Register from '@/components/Register.vue'
import Test from '@/components/TestCom/Test.vue'
import Home from '@/components/Home.vue'
import QAndA from '@/components/QaCom/QAndA.vue'
import PublishQ from '@/components/QaCom/PublishQ.vue'
import UserPage from '@/components/UserCom/UserPage.vue'
import Test1 from '@/components/TestCom/Test1.vue'
import Test1Result from '@/components/TestCom/Test1Result.vue'
import Test2 from '@/components/TestCom/Test2.vue'
import Test3 from '@/components/TestCom/Test3.vue'
import Test4 from '@/components/TestCom/Test4.vue'
import Test5 from '@/components/TestCom/Test5.vue'
import cookie from '@/utils/cookie.js'

Vue.use(VueRouter)


const router = new VueRouter({
  mode:'hash',
  routes: [{
      path: '/',
      component: Home,
    },
    {
      path: '/Home',
      component: Home,
    },
    {
      path: '/Article',
      component: Article,
    },
    {
      path: '/Article/:id',
      component: ArticleDetai,
    },
    {
      path: '/More',
      component: More,
    },
    {
      path: '/Qa',
      component: Qa,
    },
    {
      path: '/PublishQ',
      component: PublishQ,
    },
    {
      path: '/Qa/:id',
      component: QAndA,
    },
    {
      path: '/Test',
      component: Test,
    },
    {
      path: '/Test1',
      component: Test1,
    },
    {
      path:'/Test1Result',
      component:Test1Result,
    },
    {
      path: '/Test2',
      component: Test2,
    },
    {
      path: '/Test3',
      component: Test3,
    },
    {
      path: '/Test4',
      component: Test4,
    },
    {
      path: '/Test5',
      component: Test5,
    },
    {
      path: '/Login',
      component: Login,
    },
    {
      path: '/Register',
      component: Register,
    },
    {
      path: '/UserPage',
      component: UserPage,
    }
  ],

});

// 路由守卫
router.beforeEach(function (to, from, next) {

  if (to.path == '/PublishQ' && !cookie.getCookie('userName')) {
    alert('请先登录');
  } else if (to.path == '/Test2' || to.path == '/Test3' || to.path == '/Test4' || to.path == '/Test5') {
    alert('功能尚未开放，敬请期待噢！')
  } else {
    next();
  }
})

export default router;