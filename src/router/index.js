import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/page/Home'
import Config from '@/page/Config'
import Manage from '@/page/Manage'
import MyBat from '@/components/MyBat'
import Skill from '@/components/Skill'
import Logger from '@/components/Logger'
import Service from '@/components/Service'
import Permition from '@/components/Permition'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
        path: '/config',
        name: 'config',
        component: Config,
        redirect: '/config/skill',
        children: [
          {
            path: '/config/skill',
            name: 'skill',
            component: Skill
          }
        ]
    },
    {
      path: '/manage',
      name: 'manage',
      component: Manage,
      redirect: '/manage/myBat',
      children: [
        {
          path: '/manage/myBat',
          name: 'myBat',
          component: MyBat
        },
        {
          path: '/manage/logger',
          name: 'logger',
          component: Logger
        },
        {
          path: '/manage/service',
          name: 'service',
          component: Service
        },
        {
          path: '/manage/permition',
          name: 'permition',
          component: Permition
        }
      ]
  }
  ]
})