(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6396ec54"],{f11d:function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"Navigation"},[n("el-menu",{attrs:{"default-active":t.activeIndex,mode:"horizontal"},on:{select:t.select}},[t._l(t.navigation_item,(function(e,i){return n("el-menu-item",{key:i,attrs:{index:String(i)}},[t._v(t._s(e.name)+" ")])})),n("el-link",{staticStyle:{float:"right",height:"60px"},attrs:{index:"setting",underline:!1},on:{click:function(e){t.dialogVisible=!0}}},[n("i",{staticClass:"el-icon-s-tools",staticStyle:{"font-size":"20px","align-self":"center"}})]),n("el-link",{staticStyle:{float:"right",height:"60px"},attrs:{index:"setting",underline:!1},on:{click:function(e){return t.$emit("created-method")}}},[n("i",{staticClass:"el-icon-refresh-right",staticStyle:{"font-size":"20px","align-self":"center","margin-right":"6px"}})])],2),n("my-setting",{attrs:{"dialog-visible":t.dialogVisible},on:{"close-dialog":function(e){t.dialogVisible=!1},"after-save":function(e){return t.$emit("after-save")}}})],1)},a=[],l=n("f49f"),o={name:"Navigation",components:{"my-setting":l["a"]},data:function(){return{navigation_item:[{name:"搜索",path:{name:"search",query:{type:"1"}}},{name:"书架",path:{name:"bookshelf"}},{name:"读取文件",path:{name:"read_file"}},{name:"测试",path:{name:"text"}}],dialogVisible:!1}},props:{activeIndex:String},methods:{select:function(t){this.myHistory.addNewItem(this.navigation_item[t].path)}}},s=o,c=n("2877"),r=Object(c["a"])(s,i,a,!1,null,"f75ecf92",null);e["a"]=r.exports},ff9b:function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"router",attrs:{id:"text"}},[n("el-container",{staticStyle:{height:"100%"}},[n("el-header",[n("my-navigation",{attrs:{"active-index":"3"},on:{"created-method":t.created_method}})],1),n("el-main",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}]},[n("el-input",{attrs:{placeholder:"url地址"},model:{value:t.url,callback:function(e){t.url=e},expression:"url"}}),n("el-select",{staticStyle:{"margin-top":"10px"},attrs:{placeholder:"编码方式"},model:{value:t.encoding,callback:function(e){t.encoding=e},expression:"encoding"}},t._l(t.options,(function(t,e){return n("el-option",{key:e,attrs:{label:t,value:t}})})),1),n("el-input",{staticStyle:{"margin-top":"10px"},attrs:{placeholder:"选择器"},model:{value:t.select,callback:function(e){t.select=e},expression:"select"}}),n("el-button",{staticStyle:{"margin-top":"10px"},on:{click:t.getHtml}},[t._v("获取")]),t._l(t.html_list,(function(e,i){return n("div",{key:i,domProps:{innerHTML:t._s(e)}})})),t._l(t.html_list,(function(e,i){return n("div",{key:i},[t._v(t._s(e))])})),n("el-button",{on:{click:t.text}},[t._v("text")])],2)],1)],1)},a=[],l=n("f11d"),o=n("a18c"),s={name:"text",data:function(){return{url:"",select:"",html_list:[],encoding:"utf-8",options:["utf-8","gbk","gb2312"]}},components:{"my-navigation":l["a"]},methods:{getHtml:function(){var t=this;window.getHtml(this.url,this.encoding,(function(e){console.log(e);var i=n("02cc"),a=i.load(e,{decodeEntities:!1});t.html_list=[],a(t.select).each((function(e,n){var i=a(n);console.log(a.html(i)),t.html_list.push(a.html(i))}))}))},created_method:function(){var t=this;window.utools.setSubInput((function(e){var n=e.text;t.myHistory.addNewItem({name:"search",query:{name:n,type:"1"}})}),"搜索在线小说"),window.utools.subInputBlur(),document.onkeydown=void 0},text:function(){o["a"].push({name:"search",query:{type:"1"}}).then((function(t){console.log(t)}))}},created:function(){this.created_method()}},c=s,r=n("2877"),u=Object(r["a"])(c,i,a,!1,null,null,null);e["default"]=u.exports}}]);