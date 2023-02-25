<template>
  <div class="app">

        <Editor v-model="state" :formData="formData"></Editor>
    <!--    <router-view/>-->
  </div>

</template>


<script>

import { ref ,provide} from 'vue';
import data from '../data.json';
import Editor from '../components/editor';
import {registerConfig as config} from '../utils/editor-config';
import Range from '../utils/Range.jsx'


import myvideo from "@/components/myvideo";
const fileList2=[];
export default {
  fileList2,
  components:{
    Editor,
    Range,
    Image,

    myvideo

  },
  methods:{

    previewFile(file) {
      let reader
      if (file) {
        // 创建流对象
        reader = new FileReader()
        reader.readAsDataURL(file)
      }
      // 捕获 转换完毕
      reader.onload = function(e) {
        // 转换后的base64就在e.target.result里面,直接放到img标签的src属性即可
        document.querySelector('el-image').src = e.target.result
        console.log(11111);
      }
    }



  },
  setup(){
    const state = ref(data);
    provide('config',config); // 将组件的配置直接传值

    const formData = ref({
      username:'zfjg',
      password:123,
      start:0,
      end:100
    })

    return {
      state,
      formData,

    }
  },


}


</script>

<style lang="scss">
.app{
  position:fixed;
  top:20px;
  left:20px;
  right:20px;
  bottom:20px;
}
</style>
