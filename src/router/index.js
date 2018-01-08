import Vue from 'vue'
import Router from 'vue-router'
import Core from '@/containers/Core'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Core',
      component: Core
    }
  ]
})
