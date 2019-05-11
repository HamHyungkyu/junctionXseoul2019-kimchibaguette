<template>
    <div>
        <naver-info-window
        class="info-window"
        @load="onWindowLoad"
        :isOpen="info"
        :marker="marker">
        <div class="info-window-container">
            <h1>{{ place. name }}</h1>
            <img/>
            <h2>Address</h2>
            {{ place.addr }}
            <h2>Description</h2>
            {{ place.description }}
            <h3>Tags</h3>
            {{ point.post.tags }}
        </div>
      </naver-info-window>
      <naver-marker :lat="point.location.lat" :lng="point.location.lng" @click="onMarkerClicked" @load="onMarkerLoaded"/>
    </div>
</template>
<script>
export default {
    props: ['point'],
    data: function(){
        return {
            info: false,
            marker : '',
            place:{
                name: 'ABC mart',
                imgSrc: '',
                description: 'ABC mart',
                addr: 'addr'
            }
        }
    },
    methods: {
        onLoad(vue) {
        },
        onWindowLoad(that) {
        },
        onMarkerClicked: function(vue){
            this.info = !this.info
        },
        onMarkerLoaded: function(vue){
            this.marker = vue.marker
        }
    },
}
</script>
