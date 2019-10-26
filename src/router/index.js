import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/page/Home'
import Config from '@/page/Config'
import Skill from '@/components/Skill'

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
    }
  ]
})
