<template>
    <GmapMap class="map"
    :center="center"
    :zoom="zoom"
    :options="mapOptions"
    style="width: 375px; height: 667px"
    @dragend="fetchData"
    @zoom_changed="fetchData"
    @bounds_changed="boundsChanged"
    >
    <GmapCluster maxZoom="17" :calculator="makerCalculator">
    <hotplace-marker  v-for="(point, i) in points" :key="i" :point="point"></hotplace-marker>
    </GmapCluster>
    </GmapMap>
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
        bound: null,
        center: {
            lat: 37.554055,
            lng: 126.922452,
        },
        zoom: 17,
        mapOptions: {
            zoomControl: true,
            mapTypeControl: false,
            scaleControl: false,
            streetViewControl: false,
            rotateControl: false,
            fullscreenControl: false,
            disableDefaultUi: false
        },
        points: [
            {
                location: {
                    lat: 37.554055,
                    lng: 126.922452
                },
                addr : '마포구 동교로',
                post : {   
                    num : 1,
                    tags: 
                        {'#hongdae': 4}
                    ,
                }
            }
            ,
                        {
                location: {
                    lat: 37.554055,
                    lng: 126.92400
                },
                addr : '마포구 동교로',
                post : {   
                    num : 2,
                    tags: 
                        {'#hongdae': 4}
                    ,
                }
            }
        ]
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
        },
        fetchData(){
            this.$axios.get('http://106.10.50.27:5000/pin?x1=' + this.bound.ia.j + '&y1=' + this.bound.na.j 
            + '&x2=' + this.bound.ia.l + '&y2=' + this.bound.na.l).then(response=>{
                this.points = response.data
            })
        },
        boundsChanged(bound){
            this.bound = bound
        },
        makerCalculator(markers, numStyles) {
            var index = 0;
            var count = 0
            for( var marker of markers){
                count += parseInt(marker.label)
            }
            var dv = count;
            while (dv !== 0) {
                dv = parseInt(dv / 10, 10);
                index++;
            }

            index = Math.min(index, numStyles)
            return {
                text: count,
                index: index
            }
        }
    }
}
</script>

<style>
.map {
    width: 375px;
    height: 812px;
}
</style>
