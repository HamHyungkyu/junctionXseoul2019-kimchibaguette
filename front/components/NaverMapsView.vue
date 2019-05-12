<template>
    <div style="height: 100vh; overflow-x: hidden;">
        <div style="display: flex; overflow:hidden;">
            <img src="/logo.png" style="width: 250px; height: 85px;">
            <el-button v-show="hash==''" circle style="font-weight: bold; font-size: 15px; border-color: #ff686b; outline: none; margin-right: 5px; margin-left: 70px; margin-top:22.5px; width: 40px; height: 40px;" @click="changehash()">#</el-button>
            <el-button v-show="hash!=''" circle style="font-weight: bold; font-size: 15px; border-color: #ff686b; outline: none; margin-right: 5px; margin-left: 70px; margin-top:22.5px; width: 40px; height: 40px;" @click="changehash()">&lt;</el-button>
        </div>
        <div class="main-container" style="overflow:hidden" v-show="hash !='detail'">
            <div class="main-container-item" v-show="hash==''">
                <GmapMap class="map"
                :center="center"
                :zoom="zoom"
                :options="mapOptions"
                style="width: 375px; height: 650px"
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
            <div v-show="hash=='hash'" class="main-container-item">
                <hashtags :tags="tags"></hashtags>
            </div>
        </div>
        <div v-show="hash == 'detail'" style="overflow: auto; min-height: calc(100vh - 85px);">
            <detail-page></detail-page>
        </div>
        <div v-show="hash != 'detail'" style="height: 77px; display: flex; padding: 15px 10px; padding-bottom: 0px; overflow: hidden;">
            <el-button icon="el-icon-menu" style="width: 40px; height: 40px; margin: 5px 10px;" circle></el-button>
            <el-button @click="changehashdetail()" style="margin: 0px 30px; font-weight: bold; color: white; background-color: #ff686b; border-radius: 25px;width: 175px; height: 50px;"> {{ points.length }} TRENDY PLACES</el-button>
            <el-button icon="el-icon-s-tools" style="width: 40px; height: 40px; margin: 5px 10px;" circle></el-button>
        </div>
    </div>
</template>

<script>
import HotplaceMarker from '@/components/HotplaceMarker'
import Hashtags from '@/components/Hashtags'
import DetailPage from '@/components/DetailPage'

export default {
    components: {
        HotplaceMarker,
        Hashtags,
        DetailPage
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
            if(this.hash != 'hash' && this.hash != 'detail') {
                this.hash = 'hash'
            } else {
                this.hash = ''
            }
        },
        changehashdetail() {
            this.hash = 'detail'
        },
        onMarkerLoaded(vue) {
        this.marker = vue.marker;
        },
        fetchData(){
            this.$store.commit('cleanPoints')
            this.$axios.get('http://106.10.50.27:5000/pin?x1=' + this.bound.ia.j + '&y1=' + this.bound.na.j 
            + '&x2=' + this.bound.ia.l + '&y2=' + this.bound.na.l).then(response=>{
                this.points = response.data
                this.muergeSameSpots()
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
            console.log(tags)
            return tags
        }
    }
}
</script>

<style>
.main-container {
    height: 650px;
    width: 200%;
    overflow: hidden;
    display: flex;
    flex-flow: row nowrap;
}

.main-container-item {
    height: 650px;
    width: 100vw;
    
    transform: translate(0, 0);
    transition: transform 300ms;
}

.main-container-item.hash {
    -webkit-transform: translate(-100vw, 0);
    transform: translate(-100vw, 0);
}

</style>
