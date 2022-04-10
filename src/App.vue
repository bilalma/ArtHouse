<template>
<Header></Header>
<router-view></router-view>
</template>

<script>
import Header from '../src/components/common/Header.vue'
export default {
  name: 'App',
  components: {
    Header
  }
}
</script>

<style>
#app {

}
</style>
