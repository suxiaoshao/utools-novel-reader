(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-78ed4808"],{"129f":function(e,t){e.exports=Object.is||function(e,t){return e===t?0!==e||1/e===1/t:e!=e&&t!=t}},4070:function(e,t,n){},"4e22":function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"router",attrs:{id:"search"}},[n("el-container",{staticStyle:{height:"100%"}},[n("el-header",[n("my-navigation",{attrs:{"active-index":"0"},on:{"created-method":e.created_method,"after-save":function(e){}}})],1),n("el-main",[n("div",{staticStyle:{"text-align":"center"}},[n("h4",{staticClass:"title"},[e._v("搜索:"+e._s(this.$route.query.name))])]),n("span",{staticStyle:{"font-size":"18px"}},[e._v("选择源网站")]),n("el-select",{staticStyle:{"margin-left":"10px"},attrs:{placeholder:"选择网站源"},on:{change:e.typeChange},model:{value:e.selected_type,callback:function(t){e.selected_type=t},expression:"selected_type"}},e._l(e.config,(function(e,t){return n("el-option",{key:t,attrs:{label:e.name,value:t}})})),1),n("el-link",{staticStyle:{"margin-left":"10px","font-size":"18px"},attrs:{underline:!1,icon:"el-icon-link"},on:{click:e.openUrl}},[e._v("前往源网站 ")]),n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticStyle:{width:"100%","margin-top":"20px"},attrs:{data:e.search_list,border:"",stripe:!0}},[n("el-table-column",{scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-link",{attrs:{underline:!1},on:{click:function(n){return e.go_to_novel(t.row.novel_id)}}},[e._v(e._s(t.row.name)+" ")])]}}])},[n("template",{slot:"header"},[e._v("小说名")])],2),n("el-table-column",{attrs:{prop:"author",label:"作者"}}),n("el-table-column",{scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-link",{attrs:{underline:!1},on:{click:function(n){return e.go_to_content(t.row.novel_id,t.row.latest_chapter_id)}}},[e._v(" "+e._s(t.row.latest_chapter_name)+" ")])]}}])},[n("template",{slot:"header"},[e._v("最后章节")])],2),n("el-table-column",{attrs:{prop:"update_time",label:"更新时间"}})],1)],1)],1)],1)},i=[],r=(n("b0c0"),n("ac1f"),n("841c"),n("f11d")),o=(n("4d63"),n("25f0"),n("466d"),n("5319"),n("5deb"));function s(e,t,n){"0"!==e&&l(t,n,e)}function l(e,t,a){t.loading=!0,t.search_list=[];var i=o[a].search.url.replace("{##search_name##}",e),r=o[a].encoding;window.getHtml(i,r,(function(e){var i=o[a]["search"],r=i.li,s=i.novel_id,l=i.author,c=i.latest_chapter_id,d=i.update_time,u=i.novel_id_regex,h=i.latest_chapter_id_regex;t.loading=!1;var m=n("02cc"),p=m.load(e,{decodeEntities:!1});p(r).each((function(e,n){var a=p.load(p.html(n),{decodeEntities:!1,xmlMode:!0}),i=a(s).text(),r=a(s).attr("href"),o=a(l).text(),m=a(c).text(),f=a(c).attr("href"),_=a(d).text();void 0!==r&&(r=r.match(RegExp(u)).groups["id"],f=f.match(RegExp(h)).groups["id"],t.search_list.push({name:i,novel_id:r,author:o,latest_chapter_name:m,latest_chapter_id:f,update_time:_}))}))}))}var c={search:s},d={name:"search",components:{"my-navigation":r["a"]},data:function(){return{search_name:"",loading:!1,search_list:[],config:{},selected_type:""}},methods:{search:function(){""!==this.$route.query.name&&void 0!==this.$route.query.name&&c.search(this.type,String(this.$route.query.name),this)},go_to_novel:function(e){this.myHistory.addNewItem({name:"novel",params:{nid:e},query:{type:String(this.type)}})},go_to_content:function(e,t){this.myHistory.addNewItem({name:"content",params:{nid:e,cid:t},query:{type:String(this.type)}})},created_method:function(){var e=this;this.config=o,this.plugin_enter(),this.selected_type=this.type,window.utools.setSubInput((function(t){var n=t.text;e.search_name=n}),"搜索在线小说",!0),document.onkeydown=function(t){"Enter"===t.key&&e.myHistory.addNewItem({name:"search",query:{name:e.search_name,type:String(e.type)}})},void 0!==this.$route.query.name&&this.search()},plugin_enter:function(){var e=this;window.utools.onPluginEnter((function(t){var n=t.code,a=(t.type,t.payload);t.optional;"search"===n?(e.myHistory.addNewItem({name:"search",query:{type:e.type}}),window.utools.setSubInput((function(t){var n=t.text;e.search_name=n}),"搜索在线小说",!0)):"bookshelf"===n?e.myHistory.addNewItem({name:"bookshelf"}):"read_novel"===n&&e.myHistory.addNewItem({name:"read_file",query:{path:a[0].path}})}))},openUrl:function(){window.utools.shellOpenExternal(this.config[this.selected_type].url)},typeChange:function(e){this.myHistory.addNewItem({name:"search",query:{name:this.search_name,type:e}})}},computed:{type:function(){return this.$route.query.type}},created:function(){this.created_method()},watch:{$route:"search"}},u=d,h=(n("edfc"),n("2877")),m=Object(h["a"])(u,a,i,!1,null,"1211cd4a",null);t["default"]=m.exports},"841c":function(e,t,n){"use strict";var a=n("d784"),i=n("825a"),r=n("1d80"),o=n("129f"),s=n("14c3");a("search",1,(function(e,t,n){return[function(t){var n=r(this),a=void 0==t?void 0:t[e];return void 0!==a?a.call(t,n):new RegExp(t)[e](String(n))},function(e){var a=n(t,e,this);if(a.done)return a.value;var r=i(e),l=String(this),c=r.lastIndex;o(c,0)||(r.lastIndex=0);var d=s(r,l);return o(r.lastIndex,c)||(r.lastIndex=c),null===d?-1:d.index}]}))},edfc:function(e,t,n){"use strict";var a=n("4070"),i=n.n(a);i.a},f11d:function(e,t,n){"use strict";var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"Navigation"},[n("el-menu",{attrs:{"default-active":e.activeIndex,mode:"horizontal"},on:{select:e.select}},[e._l(e.navigation_item,(function(t,a){return n("el-menu-item",{key:a,attrs:{index:String(a)}},[e._v(e._s(t.name)+" ")])})),n("el-link",{staticStyle:{float:"right",height:"60px"},attrs:{index:"setting",underline:!1},on:{click:function(t){e.dialogVisible=!0}}},[n("i",{staticClass:"el-icon-s-tools",staticStyle:{"font-size":"20px","align-self":"center"}})]),n("el-link",{staticStyle:{float:"right",height:"60px"},attrs:{index:"setting",underline:!1},on:{click:function(t){return e.$emit("created-method")}}},[n("i",{staticClass:"el-icon-refresh-right",staticStyle:{"font-size":"20px","align-self":"center","margin-right":"6px"}})])],2),n("my-setting",{attrs:{"dialog-visible":e.dialogVisible},on:{"close-dialog":function(t){e.dialogVisible=!1},"after-save":function(t){return e.$emit("after-save")}}})],1)},i=[],r=n("f49f"),o={name:"Navigation",components:{"my-setting":r["a"]},data:function(){return{navigation_item:[{name:"搜索",path:{name:"search",query:{type:"1"}}},{name:"书架",path:{name:"bookshelf"}},{name:"读取文件",path:{name:"read_file"}},{name:"测试",path:{name:"text"}}],dialogVisible:!1}},props:{activeIndex:String},methods:{select:function(e){this.myHistory.addNewItem(this.navigation_item[e].path)}}},s=o,l=n("2877"),c=Object(l["a"])(s,a,i,!1,null,"f75ecf92",null);t["a"]=c.exports}}]);