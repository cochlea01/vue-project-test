<template>
  <div>
    <div class="vux-demo">
      <img class="logo" src="../assets/vux_logo.png"  @click = "run2">
      <h1> </h1>
    </div>
    <group title="cell demo">
      <cell title="VUX" value="cool" is-link></cell>
    </group>
  </div>
</template>

<script>
import { Group, Cell } from 'vux'

export default {
  components: {
    Group,
    Cell
  },
  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      msg: 'Hello World!'
    }
  },
  methods:{
    run(){
        // 显示
        this.$vux.alert.show({
        title: 'alert测试',
        content: 'Do you agree?',
        onShow () {
            console.log('Plugin: I\'m showing')
        },
        onHide () {
            console.log('Plugin: I\'m hiding')
        }
        })
    },
    run2(){
        // 显示
        this.$vux.toast.show({
        text: 'Loading'
        })
    }
  }
}
</script>

<style>
.vux-demo {
  text-align: center;
}
.logo {
  width: 100px;
  height: 100px
}
</style>
