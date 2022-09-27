<template>
  <div class="container">
    <Navbar />
    <Signup />
    <Thread />
  </div>
</template>

<script lang="js">
import Navbar from '~/components/Navbar.vue'
import Thread from '~/components/Thread.vue'
import Signup from '~/components/Signup.vue'


export default {
  components: {
    Navbar,
    Thread,
    Signup,
    // CommentSection,
  },

}



</script>
<style>
.container {
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
}

.container > div {
  margin: 0 auto;
}


.container > div > div {
  background-color: #fff;
}


@media (max-width: 768px) {
  .container > div {
    width: 100%;
  }
}



</style>