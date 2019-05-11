<template>
  <div style="width=375px; height=812px">
    <naver-maps-view>
    </naver-maps-view>
  </div>
</template>

<script>
import NaverMapsView from '@/components/NaverMapsView'
  export default {
    name: 'HelloWorld',
    components: {
      NaverMapsView
    },
    data() {
      return {
        info: false,
        marker: null,
        count: 1,
        map: null,
        mapOptions: {
          lat: 37.554055,
          lng: 126.922452,
          zoom: 10,
          zoomControl: true,
          zoomControlOptions: {position: 'TOP_RIGHT'},
          mapTypeControl: false,
        },
      }
    },
    computed: {
      hello() {
        return `Hello, World! × ${this.count}`;
      }
    },
    methods: {
      onLoad(vue) {
      },
      onWindowLoad(that) {
      },
      onMarkerClicked(event) {
        alert("clicked")
        this.info = !this.info;
      },
      onMarkerLoaded(vue) {
        this.marker = vue.marker;
      }
    },
    mounted() {
      setInterval(() => this.count++, 1000);
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