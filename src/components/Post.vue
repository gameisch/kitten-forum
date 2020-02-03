<template lang="pug">
  .post(v-if="comment")
    //- h1.post__title {{ post.title }}
    //- p.post__body {{ post.body }}
    //- p.post__id {{ post.id }}
    p.post__comment {{ comment.name }}
</template>

<script>
  import axios from 'axios';

  export default {
    props: ['id'],

    metaInfo() {
      return {
        // title: this.post,
        // name: this.name,
        title: this.comment
      };
    },

    data() {
      return {
        // post: null,
        comment: null,
        // endpoint: 'https://jsonplaceholder.typicode.com/posts/',
        commentpoint: 'https://jsonplaceholder.typicode.com/comments/',
      }
    },

    methods: {
      // getPost(id) {
      //   axios(this.endpoint + id)
      //     .then(response => {
      //       this.post = response.data
      //     })
      //     .catch( error => {
      //       console.log('-----error-------');
      //       console.log(error)
      //     })
      // },
      getComment(cId) {
        axios(this.commentpoint + cId)
          .then(response => {
            this.comment = response.data
          })
      }
    },
    
    created() {
      // this.getPost(this.id);
      this.getComment(this.cId);
    },

    watch: {
      '$route'() {
        // this.getPost(this.id);
        this.getComment(this.cId);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .post {
    position: relative;
    max-width: 500px;
    margin: 0 auto;
    padding: 50px 20px 70px;
    &__title {
      position: relative;
      text-transform: uppercase;
      z-index: 1;
    }
    &__body {
      position: relative;
      z-index: 1;
    }
    &__id {
      position: absolute;
      font-size: 280px;
      bottom: -50px;
      margin: 0;
      color: #eeeeee;
      right: -20px;
      line-height: 1;
      font-weight: 900;
      z-index: 0;
    }
  }
</style>
