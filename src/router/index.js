import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/HelloFromVux'
import Test from '@/components/Test'
import myPage from '@/pages/myPage.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/test',
        name: 'Test',
        component: Test
    },
    {
        path: '/myPage',
        name: 'myPage',
        component: myPage
    },
    {
        path: '*',
        name: 'others',
        redirect:'/'
    }
  ]
})
