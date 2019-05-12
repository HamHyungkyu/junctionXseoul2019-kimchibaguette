<template>
    <div>
        <GmapMarker :position="point.location" :label="String(point.post.num)" :clickable="true" @click="onMarkerClicked"/>
        <GmapInfoWindow :opened="info" @closeclick="info=false" :position="point.location">
           <el-row>
               <el-col>  
                   <h3>{{ point.name }}</h3>
                </el-col> 
            </el-row>
            <!-- <img style="width=100px" :src="point.img.image_url"/>    -->
            <el-row>
                <el-col>{{point.addr}}</el-col>
            </el-row>    
            <el-row>
                <img style="width : 219px" :src="point.image_url[0]">
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
            place:{},
            activeNames: [],
            weekday_text: ["not supported"],
        }
    },
    methods: {
        onMarkerClicked: function(vue){
            this.info = true
            console.log(this.place)
        },
        onMarkerLoaded: function(vue){
            this.marker = vue.marker
        }
    },
    watch: {
        point: function(){
            this.info = false
            this.activeNames = []
            this.$axios.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' 
                + this.point.location.lat + ',' + this.point.location.lng 
                +'&key=AIzaSyCRfZVReuq7z6dmpTsjJcjTb1SOzHVsaN8').then(response=>{
                    var place = response.data.results[0]
                    this.$axios.get('http://106.10.50.27:5000/map?placeid=' + place.place_id ).then(response2 =>{
                        this.place = response2.data.result
                        if(this.place != undefined && this.place.opening_hours != undefined)
                            this.weekday_text = this.place.opening_hours.weekday_text
                })
        })
        }
    },
    computed:  {
       weekday_text: function(){
           console.log(this.place)
       
       }
    },
}
</script>
