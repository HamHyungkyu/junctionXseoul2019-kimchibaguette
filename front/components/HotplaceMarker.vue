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
    mounted() {
        this.$axios({
            headers: {
                "X-NCP-APIGW-API-KEY-ID": "l912l4ua42",
	            "X-NCP-APIGW-API-KEY": "0f3Sp1v5vLusl4JQhh32xZr542MwqIGuCnrAg527"
            },
            url: 'https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc?request=coordsToaddr&coords=126.9913201,37.5666936&sourcecrs=epsg:4326&orders=admcode,legalcode,addr,roadaddr&output=xml',
            // url : 'https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc?coords='+ this.point.location.lng + ',' + this.point.location.lat,
            method: 'GET'
        }).then(function(response){
            console.log(response)
        })
    },
}
</script>
