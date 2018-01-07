<template>
    <div id="test">
    <scroller 
        v-model="pullUpDownStatus"
        :lock-x="lockX" 
        :use-pulldown="true" 
        :use-pullup="true" 
        :pulldown-config="pulldownConfig"
        :pullup-config = "pullupConfig"
        @on-scroll="scroll"
        @on-scroll-bottom="onScrollBottom"
        @on-pulldown-loading="pullDownLoading"
        @on-pullup-loading="pullUpLoading"
        ref="scroller"
        class="scroll"
    >
        <template>
            <group id="list">
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
                <!-- {{pullUpDownStatus}} -->
            </group>
            <load-more v-show="loadMoreStatus.show" :show-loading="loadMoreStatus.showLoading" :tip="loadMoreStatus.tip" class="loadMore"></load-more>
        </template>

    </scroller>


  </div>
</template>
<script>
import {Cell,CellFormPreview,Group,CellBox,Scroller,LoadMore} from 'vux'
export default {
    name:"scroll-list",
    components:{
        CellFormPreview,
        Cell,     
        Group,
        CellBox,
        Scroller,
        LoadMore
    },
    created(){
        console.log('created');
        this.getPageData(0);
    },
    mounted(){
        console.log('mounted');
        this.$nextTick(
            ()=>{
                this.$refs.scroller.reset({top:0});
            }
        );
        
    },
    beforeUpdate(){
        console.log('beforeUpdate');
    },
    updated(){
        console.log('updated');
        // this.showSize();
        // this.$refs.scroller.reset({top:0},100,"ease-out");
         
    },
    props:{
        lockX:{
            type:Boolean,
            default:true
        }
    },
    data(){
        return {
            infoList: [],
            pagination: {
                page: 0,
                limit: 6,
                total: 3
            },
            pullUpDownStatus: {
                pulldownStatus: 'default',
                pullupStatus: 'default'
            },
            pulldownConfig:{
                content: '下拉刷新',
                height: 60,
                autoRefresh: false,
                downContent: '下拉刷新',
                upContent: '放开刷新',
                loadingContent: '刷新中...',
                clsPrefix: 'xs-plugin-pulldown-'
            },
            pullupConfig:{
                content: '上拉加载',
                pullUpHeight: 60,
                height: 40,
                autoRefresh: false,
                downContent: '放开加载',
                upContent: '上拉加载',
                loadingContent: '',
                clsPrefix: 'xs-plugin-pullup-'
            },
            loadMoreStatus:{
                tip:"",
                tipNpData:"没有更多数据了",
                tipLoading:"正在加载",
                showLoading:true,
                show:true,
            }
        }
    },
    watch:{
        pullUpDownStatus:{
            handler:function(val,oldval){
                if(val.pullupStatus=="loading"){
                    this.loadMoreStatus.show=true;
                    this.loadMoreStatus.showLoading=true; 
                }
                console.log(val,oldval);
                if(val.pullupStatus =="disabled"){
                    console.log(val,oldval);
                    console.log(this)
                    // this.$nextTick(() => {
                    //     this.$refs.scroller.reset({top:100},100,"ease-out");
                    // });
                }
            }
        }
    },
    methods:{
        //获取页面数据
        getPageData(pageNum,callback,url='/src/assets/data/infoList'){
            let _self = this;
            _self.loadMoreStatus.tip= _self.loadMoreStatus.tipLoading;   
            _self.axios.get(url+pageNum).then((response) => {
                    var data = JSON.parse(response.data.replace(/\s/g,''));
                    if(pageNum==0){
                        _self.infoList = data.infoList;
                        _self.pagination = data.pagination;               
                    } else {
                        _self.infoList.push(...data.infoList);
                    }
                    _self.loadMoreStatus.show=false;
                    _self.loadMoreStatus.showLoading=false;                  
                    _self.$refs.scroller.donePulldown();
                    _self.$refs.scroller.donePullup();             
                    if(callback) callback();
                })
        },
        //下拉刷新
        refreshPageDate(){
            let _self = this
            this.loadMoreStatus.show=false;
            this.$refs.scroller.enablePullup();
            this.$refs.scroller.donePullup();   
            setTimeout(()=>{
                this.getPageData(0)
                },1000);  
            // //重置页面滚动距离
            // _self.$nextTick(() => {
            //     _self.$refs.scroller.reset({top:0})
            //     });
        },
        //上拉加载
        loadMore(){
            let _self = this;
            let pageNum = ++_self.pagination.page;
            console.log(pageNum,_self.pagination.page,_self.pagination.total);
            if(pageNum >= _self.pagination.total){
                _self.$refs.scroller.disablePullup();
                _self.loadMoreStatus.show=true;
                _self.loadMoreStatus.showLoading=false;
                _self.loadMoreStatus.tip=_self.loadMoreStatus.tipNpData;
                return;
            }
            setTimeout(()=>{
                this.getPageData(pageNum)
                },1000); 
            // //重置页面滚动距离
            // _self.$nextTick(() => {
            //     _self.$refs.scroller.reset({top:0})
            //     });       
            // _self.axios.get(url+pageNum).then((response) => {
            //         var data = JSON.parse(response.data.replace(/\s/g,''));
            //         _self.infoList.push(...data.infoList);
            //         _self.$refs.scroller.donePullup();
            //         if(callback) callback();
            //     })
        },
        showSize(){
            let list = document.getElementById('list');
            console.log("offsetHeight%s,scrollHeight%s,clientHeight%s,getComputedStyle.height%s",list.offsetHeight,list.scrollHeight,list.clientHeight,getComputedStyle(list,null).height);
            console.log(list.offsetHeight,list.scrollHeight,list.clientHeight,getComputedStyle(list,null).height);
            let style = getComputedStyle(list,null);
            console.log(parseInt(style.height.replace('px','')));
            // for (let item of Object.keys(style)) {
            //     console.log(item,style[item]);
            // }
        },
        scroll(position){
            // console.log("on-scroll",position);
        },
        pullDownLoading(){
            console.log('on-pull-down-loading');
            this.refreshPageDate();       
        },
        pullUpLoading(){
            console.log('on-pull-up-loading');
            // setTimeout(()=>{this.$refs.scroller.donePullup();},2000);
             this.loadMore();

            
        },
        onScrollBottom(){
            // console.log('on-scroll-bottom');
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
.xs-plugin-pullup-container{
    /* outline:2px solid red; */
    line-height:50px;
    height:50px;
}
/* .loadMore{
    border:2px solid rgb(120, 120, 190);
    height:60px;
} */
.scroll{
    border:2px solid red;
}
</style>
