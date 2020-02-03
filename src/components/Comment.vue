<template lang="pug">
  .comment(v-if="comment")
    h1.comment__title {{ comment.name }}
    p.comment__body {{ comment.body }}
    p.comment__email {{ comment.email }}
    p.comment__id {{ comment.id }}
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
        comment: null,
        commentsUrl: 'https://jsonplaceholder.typicode.com/comments?postId=',
      }
    },

    methods: {
      getComment(cId) {
        axios(this.commentsUrl + cId)
          .then(response => {
            this.comment = response.data
            console.log(this.commentsUrl + cId)
          })
          .catch( error => {
            console.log('-----error-------');
            console.log(error)
          })
      }
    },
    
    created() {
      this.getComment(this.cId);
    },

    watch: {
      '$route'() {
        this.getComment(this.cId);
      }
    }
  }
</script>
