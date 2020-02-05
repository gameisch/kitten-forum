import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'
import App from './App.vue'
import Post from './components/Post.vue'
import Comment from './components/Comment.vue'
import filter from './components/Filter.vue'
import User from './components/User.vue'
import Hello from './components/Hello.vue'

Vue.use(Router)
Vue.use(Meta)
Vue.use(filter)

const router = new Router({
 routes: [
   {
     path: '/',
     name:'home',
   },
   {
     path: '/post/:id',
     name:'post',
     component: Post,
     props: true,
   },
   {
    path: '/comments?postId=:id',
    name:'comment',
    component: Comment,
    props: true,
  },
  {
    path: '/user/:id',
    name:'user',
    component: User,
    props: true,
  },
 ],
  mode: 'history'
})

new Vue({
 el: '#app',
 render: h => h(App),
 router
})