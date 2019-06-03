// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import router from './router'

// 引入VUEX
import Vuex from 'vuex';
Vue.use(Vuex);

// 引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 注册全局组件


import mheader from "./components/public-components/Header.vue";
Vue.component("mheader", mheader);


import pagination from "./components/public-components/pagination.vue";
Vue.component("pagination", pagination);

import progress1 from "./components/public-components/progress.vue";
Vue.component("progress1", progress1);

import title1 from "./components/public-components/title1.vue";
Vue.component("title1", title1);

import title2 from "./components/public-components/title2.vue";
Vue.component("title2", title2);

import title3 from "./components/public-components/title3.vue";
Vue.component("title3", title3);

import text1 from "./components/public-components/text.vue";
Vue.component("text1", text1);

import timeline from "./components/public-components/timeline.vue";
Vue.component("timeline", timeline);

import table1 from "./components/public-components/table.vue";
Vue.component("table1", table1);

import store from './store/store.js'


// // 公用暂时放在这
// import $ from 'jquery';
// let dragFlag = false;
// let dragItem = null;
// Vue.directive('drag', {
//   bind: function(el, binding, vnode){
//     $(el).on("mousedown", function(e){
//       console.log(e);
//       dragFlag = true;
//       dragItem = $(el).clone();
//     });
//     console.log(el, binding, vnode);
//     // el.onmousedown = function(event){
//     //   console.log(event);
//     //   dragFlag = true;
//     // };    
//   }
// });
// window.onmousemove = function(event){
//   if(dragFlag){
//     console.log(event);
//     dragItem.css({
//       position: "fixed",
//       left: event.clientX,
//       top: event.clientY,
//     }).appendTo("#app");
//   }
// };
// window.onmouseup = function(event){
//   console.log(event);
//   if(dragFlag){    
//     dragItem.remove();
//   }
//   dragFlag = false;
//   dragItem = null;
// }

// // 公用 end





Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  // router,
  store,
  components: { 
    App
  },
  template: '<App/>'
});



