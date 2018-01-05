<template>
    <div class="test">
    <group>
        <!-- <cell
            v-for="(il,index) in infoList"
            :title="il.title"
            :is-link = "il.hasContent"
            :border-intent="false"
            :arrow-direction="il.showContent1 ? 'up' : 'down'"
            @click.native="il.showContent1 = !il.showContent1;" :has-content="il.hasContent" 
            :next-content-type = "il.nextContentType"></cell>
            <p :class="{'slide':true,'animate':showContent1}" >{{content}}<br/><br/></p>
        <template v-if="il.hasContent">
            <cell-form-preview v-if="il.nextContentType == 1 && il.showContent1" :list="il.list"></cell-form-preview>
            <cell-box v-if="il.nextContentType == 2 && il.showContent1" >{{il.content}}</cell-box>
        </template>                 -->
        <template v-for="(il,index) in infoList">
            <cell
                :title="il.title"
                :is-link = "il.hasContent"
                :border-intent="false"
                :arrow-direction="il.showContent1 ? 'up' : 'down'"
                :has-content="il.hasContent"
                :next-content-type = "il.nextContentType"
                @click.native="il.showContent1 = !il.showContent1"></cell>
            <template v-if="il.hasContent">
                <cell-form-preview v-if="il.nextContentType == 1 && il.showContent1" :list="il.list"></cell-form-preview>
                <cell-box v-if="il.nextContentType == 2 && il.showContent1" >{{il.content}}</cell-box>
            </template>  
        </template>

    </group>
  </div>
</template>
<script>
import {Cell,CellFormPreview,Group,CellBox} from 'vux'
export default {
    components:{
        CellFormPreview,
        Cell,     
        Group,
        CellBox
    },
    beforeCreate(){
        console.log('created');
        this.axios.get('/src/assets/data/infoList').then((response) => {
            var data = JSON.parse(response.data.replace(/\s/g,''));
            console.log(data);
            this.infoList = data.infoList
            })
    },
    data(){
        return {

            
        }
    },
    method:{
        getData(url){
            Vue.axios.get(api).then((response) => {
            console.log(response.data)
            })
        }
    }
}
</script>
<style>
.slide {
  padding: 0 20px;
  box-sizing:border-box;
  overflow: hidden;
  max-height: 0;
  transition: all .5s cubic-bezier(0, 1, 0, 1) -.1s;
}
.animate {
    max-height: 9999px;
    transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
    transition-delay: 0s;
}
</style>
