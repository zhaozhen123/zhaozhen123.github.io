<template>
  <div id="app">
        <!-- 需要缓存 -->
      <keep-alive> 
          <router-view v-if="$route.meta.keepAlive"/>
      </keep-alive>
      <!-- 不需要缓存 -->
      <router-view v-if="!$route.meta.keepAlive"/>
  </div>
</template>
<script>
  export default {
       created () {
          // 取回localStorage
          localStorage.getItem("smUserVuex") && this.$state.replaceState(Object.assign(this.$state.state,JSON.parse(localStorage.getItem("smUserVuex"))));
          //在页面刷新保存vuex状态
          window.addEventListener("beforeunload",()=>{
          localStorage.setItem("smUserVuex",JSON.stringify(this.$state.state))
       })
      },
      beforedestory() { // 实例销毁前，删除指定localStorage 释放缓存
        localStorage.removeItem('smUserVuex');
      }
    }
</script>

<style lang='scss'>
@import "~@/assets/css/common.scss";
#app{
  position: relative;
}
</style>