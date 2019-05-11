<template>
    <naver-maps class="map"
    :height="812"
    :width="375"
    :mapOptions="mapOptions"
    :initLayers="['BACKGROUND']"
    @load="onLoad"
    @
    >
    <naver-marker :lng="126" :lat="37" @click="onMarkerClicked"></naver-marker>
    <hotplace-marker  v-for="(point, i) in points" :key="i" :point="point"></hotplace-marker>
    </naver-maps>
</template>
<script>
import HotplaceMarker from '@/components/HotplaceMarker'
export default {
    components: {
        HotplaceMarker
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
            zoomControl: false,
            zoomControlOptions: {position: 'TOP_RIGHT'},
            mapTypeControl: false,
        },
        points: [
            {
                location: {
                    lat: 37.554055,
                    lng: 126.922452
                },
                post : {   
                    time: "20190523",
                    tags: [
                        '#hongdae'
                        ],
                    category: 'food'
                }
            },
                        {
                location: {
                    lat: 37.554055,
                    lng: 126.92400
                },
                post : {   
                    time: "20190523",
                    tags: [
                        '#hongdae'
                        ],
                    category: 'food'
                }
            }
        ]
        }
    },
    computed: {
        points_() {
            var points 
            this.$axios.get('').then(response=>{
                points = response.data
            })
            return points
        }
    },
    methods: {
        onLoad(vue) {
            this.map = vue.map
        },
        onWindowLoad(that) {
        },
        onMarkerClicked(event) {
        this.info = !this.info;
        console.log(this.hello)

        },
        onMarkerLoaded(vue) {
        this.marker = vue.marker;
        }
    },
    watch: {
        map: function(){
            console.log(this.hello)
        }
    },
    mounted() {
        setInterval(() => this.count++, 1000);
    }
}
</script>

<style>
.map {
    width: 375px;
    height: 812px;
}
</style>
