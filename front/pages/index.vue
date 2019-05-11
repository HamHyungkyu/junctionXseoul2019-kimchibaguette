<template>
  <div style="width=375px; height=812px">
    <naver-maps-view>
    </naver-maps-view>
    <hashtags></hashtags>
  </div>
</template>

<script>
import NaverMapsView from '@/components/NaverMapsView'
import Hashtags from  '@/components/Hashtags.vue'
  export default {
    name: 'HelloWorld',
    components: {
      NaverMapsView,
      Hashtags
    }
  }
</script>
<style scoped>
  .info-window-container {
    padding: 10px;
    width: 300px;
    height: 100px;
  }
</style>