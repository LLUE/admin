<template>
  <!-- <div id="app"> -->
    <!-- <HelloWorld msg="Welcome to Your App"/> -->
    <router-view></router-view>
    
  <!-- </div> -->
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  // components: {
  //   HelloWorld
  // }
  data(){
    return{

    }
  },
  watch: {
    $route (to, from) {
    //   console.log(to, from)
    }
  }
  
}
</script>

