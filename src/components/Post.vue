<template lang="pug">
  .post(v-if="post")
    .post__title {{ post.title }}
    .post__body {{ post.body }}
    .post__id {{ post.id }}
</template>

<script>
  import axios from 'axios';

  export default {
    props: ['id'],

    metaInfo() {
      return {
        title: this.post,
      };
    },

    data() {
      return {
        post: null,
        endpoint: 'https://jsonplaceholder.typicode.com/posts/',
      }
    },

    methods: {
      getPost(id) {
        axios(this.endpoint + id)
          .then(response => {
            this.post = response.data
          })
          .catch( error => {
            console.log('-----error-------');
            console.log(error)
          })
      },
    },
    
    created() {
      this.getPost(this.id);
    },

    watch: {
      '$route'() {
        this.getPost(this.id);
      }
    }
  }
</script>