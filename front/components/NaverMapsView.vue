<template>
    <naver-maps class="map"
    :height="812"
    :width="375"
    :mapOptions="mapOptions"
    :initLayers="['BACKGROUND', 'BACKGROUND_DETAIL', 'BYCYCLE', 'CADASTRAL', 'CTT', 'HIKING_TRAIL', 'PANORAMA', 'POI_KOREAN', 'TRANSIT']"
    >
    <hotplace-marker v-for="(point, i) in points" :key="i" :point="point"></hotplace-marker>
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
            }
        ]
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

<style>
.map {
    width: 375px;
    height: 812px;
}
</style>
