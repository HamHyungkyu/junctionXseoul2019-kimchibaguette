<template>
    <div>
        <div style="display: flex;">
            <p style="height: 62px;">chameleon</p>
            <el-button @click="changehash()">#</el-button>
        </div>
        <div class="main-container">
            <div class="main-container-item" v-show="hash==''">
                <GmapMap class="map"
                :center="center"
                :zoom="zoom"
                :options="mapOptions"
                style="width: 375px; height: 750px"
                @dragend="fetchData"
                @zoom_changed="fetchData"
                @bounds_changed="boundsChanged"
                @tilesloaded="fetchData"
                >
                    <GmapCluster :maxZoom=17 :calculator="makerCalculator">
                        <hotplace-marker  v-for="(point, i) in points" :key="i" :point="point"></hotplace-marker>
                    </GmapCluster>
                </GmapMap>
            </div>
            <div class="main-container-item">
                <hashtags :tags="tags"></hashtags>
            </div>
        </div>
    </div>
</template>

<script>
import HotplaceMarker from '@/components/HotplaceMarker'
import Hashtags from '@/components/Hashtags'

export default {
    components: {
        HotplaceMarker,
        Hashtags
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
        points: [],
        hash: ''
        }
    },
    methods: {
        changehash() {
            if(this.hash == 'hash') {
                this.hash = ''
            } else {
                this.hash = 'hash'
            }
        },
        onMarkerLoaded(vue) {
        this.marker = vue.marker;
        },
        fetchData(){      
            this.$axios.get('http://106.10.50.27:5000/pin?x1=' + this.bound.ia.j + '&y1=' + this.bound.na.j 
            + '&x2=' + this.bound.ia.l + '&y2=' + this.bound.na.l).then(response=>{
                this.points = response.data
                this.muergeSameSpots()
                this.$store.commit('cleanPoints', this.points)
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
        },
        muergeSameSpots(){
            this.points.map(point=>{
                point.location.lat = Math.round(point.location.lat * 10000)/10000
                point.location.lng = Math.round(point.location.lng * 10000)/10000
                return point
            })
            var temp ={}
            for(var point of this.points){
                var key = String(point.location.lng) + "," + String(point.location.lat)
                if(temp[key] == undefined){
                    temp[key] = point
                }
                else{
                    temp[key].post.num += point.post.num
                }
            }
            this.points = []
            for(var i in temp){
                this.points.push(temp[i])
            }
        }
    },
    computed:{
        tags : function () { 
            var tags = {}
            for( var point of this.points){
                for(var tag in point.post.tags){
                    if(tags[tag] != undefined){
                        tags[tag] += point.post.tags[tag]
                    }
                    else{
                        tags[tag] = 1
                    }
                }
            }
            return tags
        }
    }
}
</script>

<style>
.main-container {
    height: 750px;
    width: 200%;
    overflow: hidden;
    display: flex;
    flex-flow: row nowrap;
}

.main-container-item {
    height: 750px;
    width: 100vw;
    
    transform: translate(0, 0);
    transition: transform 300ms;
}

.main-container-item.hash {
    -webkit-transform: translate(-100vw, 0);
    transform: translate(-100vw, 0);
}
</style>
