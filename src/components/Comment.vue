<template lang="pug">
  .comment(v-if="comment")
    .comment__item(v-for="(comment, i) in comments")
      .comment__img
        img(src="http://placekitten.com/150/150" alt="" title)
        span пост id:{{ comment.postId }}
      .comment__desc
        .comment__name {{ comment.name }}
          span промурчал
        .comment__body  {{ comment.body }}
    router-link.comment__link(to="/" ) Скрыть комментарии
</template>

<script>
  import axios from 'axios';

  export default {
    props: ['id'],

    metaInfo() {
      return {
        title: this.comment,
      };
    },

    data() {
      return {
        // comment:false,
        comment: null,
        comments: [],
        commentsUrl: 'https://jsonplaceholder.typicode.com/comments?postId=',
      }
    },

    methods: {
      getComment(id) {
        axios(this.commentsUrl + id)
          .then(response => {
            this.comment = response.data
            this.comments = response.data
          })
      }
    },
    
    created() {
      this.getComment(this.id);
    },

    watch: {
      '$route'() {
        this.getComment(this.id);
      }
    }
  }
</script>