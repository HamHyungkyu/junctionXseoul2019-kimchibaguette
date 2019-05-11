<template>
    <div>
        <GmapMarker :position="point.location" :label="String(point.post.num)" :clickable="true" @click="onMarkerClicked"/>
        <GmapInfoWindow :opened="info" @closeclick="info=false" :position="point.location">
           <el-row>
               <el-col>  
                   <h3>{{ point.name }}</h3>
                </el-col> 
            </el-row>    
            <el-row>
                <el-col>{{place.formatted_address}}</el-col>
            </el-row>     
        </GmapInfoWindow>
    </div>
</template>
<script>
export default {
    props: ['point'],
    data: function(){
        return {
            info: false,
            marker : '',
            place:{}
        }
    },
    methods: {
        onLoad(vue) {
            this.marker = vue.marker
        },
        onWindowLoad(that) {
        },
        onMarkerClicked: function(vue){
            this.info = true
        },
        onMarkerLoaded: function(vue){
            this.marker = vue.marker
        }
    },
    created() {
        this.$axios.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' 
            + this.point.location.lat + ',' + this.point.location.lng 
            +'&key=AIzaSyCRfZVReuq7z6dmpTsjJcjTb1SOzHVsaN8').then(response=>{
                var place = response.data.results[0]
                console.log(place.place_id)
                this.$axios.get('http://106.10.50.27:5000/map?placeid=' + place.place_id ).then(response2 =>{
                    this.place = response2.data.result
                })
            })
    },
}
</script>
