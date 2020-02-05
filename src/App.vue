<template lang="pug">
  #app
    header
      h1 Форум котиков
    main
      aside.sidebar
        .filter
          .filter__title Фильтры
          .filter__field
            .filter__name Имя/Название
            .filter__input 
              input(type="text" v-model="queryname")
          .filter__field
            .filter__name Контент
            .filter__input 
              input(type="text" v-model="querybody")
      .content
        transition-group(
          name="staggered-fade"
          v-bind:css="false"
          tag="section"
          v-on:before-enter="beforeEnter"
          v-on:enter="enter"
          v-on:leave="leave")
          .post__item(
            v-for="(item, index) in computedList"
            v-bind:key="(item.title, item.body)"
            v-bind:data-index="index"
            ) 
            .post__img
              img(src="http://placekitten.com/g/200/200" alt="" title)
            .post__desc  
              .post__user user id__{{item.userId}} / post id__{{item.id}}
              .post__title {{item.title}}
              .post__body {{item.body}}
            router-link.comment__link(
              :to="{ name: 'comment', params: { id: item.id } }"
              active-class='active'
              ) Октрыть комментарии (к посту - {{item.id}})
        #router
          transition(name='moveInUp' mode='out-in')
            router-view
        
</template>

<script>
  import axios from 'axios'
  import Filtr from './components/Filter.vue'
  import Velocity from 'velocity-animate'

  export default {
    components: {Filtr},
    data () {
      return {
        comments: [],
        commentsUrl: 'https://jsonplaceholder.typicode.com/comments/',
        posts: [],
        endpoint: 'https://jsonplaceholder.typicode.com/posts/',
        users: [],
        usersUrl: 'https://jsonplaceholder.typicode.com/users/',
        querybody: '',
        queryname: '',
      }
    },
    computed: {
      computedList: function () {
        var vm = this
        return this.posts.filter(function (item) {
          return item.title.toLowerCase().indexOf(vm.queryname.toLowerCase()) !== -1;
          return item.body.toLowerCase().indexOf(vm.querybody.toLowerCase()) !== -1
        })
      }
    },
    methods: {
      getAllPosts () {
        axios.get(this.endpoint)
          .then(response => {
            this.posts = response.data
          })
      },
      getAllComments () {
        axios.get(this.commentsUrl)
          .then(response => {
            this.comments = response.data
          })
      },
      getAllUsers () {
        axios.get(this.usersUrl)
          .then(response => {
            this.users = response.data
          })
      },
      beforeEnter: function (el) {
        el.style.opacity = 0
      },
      enter: function (el, done) {
        var delay = el.dataset.index * 20
        setTimeout(function () {
          Velocity(
            el,
            { opacity: 1 },
            { complete: done }
          )
        }, delay)
      },
      leave: function (el, done) {
        var delay = el.dataset.index * 20
        setTimeout(function () {
          Velocity(
            el,
            { opacity: 0 },
            { complete: done }
          )
        }, delay)
      }
    },

    created() {
      this.getAllPosts()
      this.getAllComments()
      this.getAllUsers()
    },
  }
</script>
<style lang='scss'>
  @import './assets/styles/_app.scss';
  @import './assets/styles/_filter.scss';
  @import './assets/styles/_post.scss';
  @import './assets/styles/_comment.scss';
</style>