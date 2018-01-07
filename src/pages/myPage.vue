<template>
    <div class="myPage">
        <tab :line-width="2" v-model="selected">
            <tab-item 
                v-for="item in tabItems" 
                :key="item.id"
                @on-item-click="changeList"
            >
                {{item.title}}
            </tab-item>
        </tab>
        <keep-alive :exclude="'scroll-list'">
            <component :is = "currentView"></component>
        </keep-alive>
        
        <!-- <scroll-list :lockX="false" v-if="selected==0"></scroll-list>
        <scroll-list v-if="selected==1"></scroll-list>
        <scroll-list v-if="selected==2"></scroll-list>
        <scroll-list v-if="selected==3"></scroll-list> -->
    </div>
</template>
<script>
import {Tab,TabItem} from 'vux'
import ScrollList from '../components/ScrollList.vue'
import Hello from '../components/HelloFromVux.vue'
export default {
    components:{
        Tab,
        TabItem,
        ScrollList,
        Hello
    },
    data(){
        return {
            selected:0,
            currentView:"ScrollList",
            tabItems:[
                {id:0,title:'待处理'},
                {id:1,title:'待支付'},
                {id:2,title:'待交付'},
                {id:3,title:'已完成'},
            ]
        }
    },
    methods:{
        changeList(){

        }
    },
    updated(){
        // console.log(this.selected);
    }
}
</script>

