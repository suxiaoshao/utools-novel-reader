(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1f8123b3"],{"0480":function(e,t,a){"use strict";var n=a("0f53"),i=a.n(n);i.a},"0f53":function(e,t,a){},"466d":function(e,t,a){"use strict";var n=a("d784"),i=a("825a"),r=a("50c4"),o=a("1d80"),s=a("8aa5"),l=a("14c3");n("match",1,(function(e,t,a){return[function(t){var a=o(this),n=void 0==t?void 0:t[e];return void 0!==n?n.call(t,a):new RegExp(t)[e](String(a))},function(e){var n=a(t,e,this);if(n.done)return n.value;var o=i(e),d=String(this);if(!o.global)return l(o,d);var c=o.unicode;o.lastIndex=0;var _,u=[],m=0;while(null!==(_=l(o,d))){var p=String(_[0]);u[m]=p,""===p&&(o.lastIndex=s(d,r(o.lastIndex),c)),m++}return 0===m?null:u}]}))},"4de4":function(e,t,a){"use strict";var n=a("23e7"),i=a("b727").filter,r=a("1dde"),o=a("ae40"),s=r("filter"),l=o("filter");n({target:"Array",proto:!0,forced:!s||!l},{filter:function(e){return i(this,e,arguments.length>1?arguments[1]:void 0)}})},"65f0":function(e,t,a){var n=a("861d"),i=a("e8b5"),r=a("b622"),o=r("species");e.exports=function(e,t){var a;return i(e)&&(a=e.constructor,"function"!=typeof a||a!==Array&&!i(a.prototype)?n(a)&&(a=a[o],null===a&&(a=void 0)):a=void 0),new(void 0===a?Array:a)(0===t?0:t)}},8196:function(e,t,a){"use strict";a.d(t,"e",(function(){return s})),a.d(t,"g",(function(){return d})),a.d(t,"f",(function(){return c})),a.d(t,"j",(function(){return _})),a.d(t,"c",(function(){return u})),a.d(t,"h",(function(){return m})),a.d(t,"a",(function(){return p})),a.d(t,"b",(function(){return g})),a.d(t,"i",(function(){return f})),a.d(t,"d",(function(){return h}));a("4de4"),a("d81d"),a("ac1f"),a("466d"),a("5319");var n=a("5c96"),i=a("fa95");function r(e,t){if("0"!==t){var a=i["a"][t].novel_id_to_url;return a.replace("{##novel_id##}",e)}return e}function o(e,t){if("0"!==t){var a=i["a"][t].url_to_novel_id;return e.match(a).groups["id"]}return e}function s(){return window.utools.db.get("setting")}function l(){return s().remind}function d(){return s().style}function c(){return s().keyboard}function _(e){var t=s(),a=window.utools.db.put(e);return a.hasOwnProperty("error")&&a["error"]?(t.remind.settings_saved_remind>=2&&Object(n["Notification"])({title:"错误",message:"保存设置失败",duration:0,type:"error"}),!1):(t.remind.settings_saved_remind>=3&&Object(n["Notification"])({title:"成功",message:"保存设置成功",type:"success"}),!0)}function u(){return window.utools.db.allDocs().filter((function(e){return"setting"!==e._id})).map((function(e){return e._id=o(e._id,e.type),e}))}function m(e,t){e=r(e,t);var a=window.utools.db.remove(e),i=l();return a.hasOwnProperty("error")&&a["error"]?(i.collect_remind>=2&&Object(n["Notification"])({title:"错误",message:"移除书架失败",duration:0,type:"error"}),!1):(i.collect_remind>=3&&Object(n["Notification"])({title:"成功",message:"移除书架成功",type:"success"}),!0)}function p(e){e._id=r(e._id,e.type);var t=window.utools.db.put(e),a=l();return t.hasOwnProperty("error")&&t["error"]?(a.collect_remind>=2&&Object(n["Notification"])({title:"错误",message:"加入书架失败",duration:0,type:"error"}),!1):(a.collect_remind>=3&&Object(n["Notification"])({title:"成功",message:"加入书架成功",type:"success"}),!0)}function g(e,t){e=r(e,t);var a=window.utools.db.get(e);return null!==a}function f(e){e._id=r(e._id,e.type);var t=window.utools.db.put(e),a=l();t.hasOwnProperty("error")&&t["error"]?a.update_reading_section>=2&&Object(n["Notification"])({title:"错误",message:"更新最后阅读章节失败",duration:0,type:"error"}):a.update_reading_section>=3&&Object(n["Message"])({showClose:!0,message:"更新最后阅读章节成功",type:"success"})}function h(e,t){e=r(e,t);var a=window.utools.db.get(e);return a._id=o(a._id,t),a}},b727:function(e,t,a){var n=a("0366"),i=a("44ad"),r=a("7b0b"),o=a("50c4"),s=a("65f0"),l=[].push,d=function(e){var t=1==e,a=2==e,d=3==e,c=4==e,_=6==e,u=5==e||_;return function(m,p,g,f){for(var h,v,b=r(m),y=i(b),k=n(p,g,3),w=o(y.length),x=0,$=f||s,O=t?$(m,w):a?$(m,0):void 0;w>x;x++)if((u||x in y)&&(h=y[x],v=k(h,x,b),e))if(t)O[x]=v;else if(v)switch(e){case 3:return!0;case 5:return h;case 6:return x;case 2:l.call(O,h)}else if(c)return!1;return _?-1:d||c?c:O}};e.exports={forEach:d(0),map:d(1),filter:d(2),some:d(3),every:d(4),find:d(5),findIndex:d(6)}},d81d:function(e,t,a){"use strict";var n=a("23e7"),i=a("b727").map,r=a("1dde"),o=a("ae40"),s=r("map"),l=o("map");n({target:"Array",proto:!0,forced:!s||!l},{map:function(e){return i(this,e,arguments.length>1?arguments[1]:void 0)}})},f49f:function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"setting"},[a("el-dialog",{attrs:{title:"设置",visible:e.dialogVisible,width:"70%","before-close":e.dialog_close},on:{"update:visible":function(t){e.dialogVisible=t}}},[a("el-tabs",{attrs:{type:"card"},model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},[a("el-tab-pane",{attrs:{label:"快捷键",name:"first"}},[a("el-form",{ref:"setting_data",attrs:{model:e.setting_data}},[a("el-form-item",[a("el-switch",{attrs:{"inactive-text":"使用快捷键打开上下章"},model:{value:e.setting_data.keyboard.using_keyboard,callback:function(t){e.$set(e.setting_data.keyboard,"using_keyboard",t)},expression:"setting_data.keyboard.using_keyboard"}})],1),a("el-form-item",{directives:[{name:"show",rawName:"v-show",value:e.setting_data.keyboard.using_keyboard,expression:"setting_data.keyboard.using_keyboard"}]},[a("el-row",{attrs:{gutter:2}},[a("el-col",{attrs:{span:5}},[a("el-popover",{attrs:{placement:"top-start",width:"200",trigger:"hover",content:"鼠标点击输入框，输入框亮起时即可输入你想要的快捷键,目前只支持一个键"}},[a("span",{staticStyle:{"font-size":"15px"},attrs:{slot:"reference"},slot:"reference"},[e._v(" 上章快捷键"),a("i",{staticClass:"el-icon-question",staticStyle:{"font-size":"1em"}})])])],1),a("el-col",{attrs:{span:17}},[a("el-input",{attrs:{readonly:""},on:{blur:e.cleared_to_monitor,focus:e.listen_previous_chapter},model:{value:e.setting_data.keyboard.pre_key,callback:function(t){e.$set(e.setting_data.keyboard,"pre_key",t)},expression:"setting_data.keyboard.pre_key"}})],1)],1)],1),a("el-form-item",{directives:[{name:"show",rawName:"v-show",value:e.setting_data.keyboard.using_keyboard,expression:"setting_data.keyboard.using_keyboard"}]},[a("el-row",{attrs:{gutter:2}},[a("el-col",{attrs:{span:5}},[a("el-popover",{attrs:{placement:"top-start",width:"200",trigger:"hover",content:"鼠标点击输入框，输入框亮起时即可输入你想要的快捷键,目前只支持一个键"}},[a("span",{staticStyle:{"font-size":"15px"},attrs:{slot:"reference"},slot:"reference"},[e._v(" 下章快捷键"),a("i",{staticClass:"el-icon-question",staticStyle:{"font-size":"1em"}})])])],1),a("el-col",{attrs:{span:17}},[a("el-input",{attrs:{readonly:""},on:{blur:e.cleared_to_monitor,focus:e.listen_next_chapter},model:{value:e.setting_data.keyboard.next_key,callback:function(t){e.$set(e.setting_data.keyboard,"next_key",t)},expression:"setting_data.keyboard.next_key"}})],1)],1)],1),a("el-form-item",{directives:[{name:"show",rawName:"v-show",value:e.setting_data.keyboard.using_keyboard,expression:"setting_data.keyboard.using_keyboard"}]},[a("el-row",{attrs:{gutter:2}},[a("el-col",{attrs:{span:5}},[a("el-popover",{attrs:{placement:"top-start",width:"200",trigger:"hover",content:"鼠标点击输入框，输入框亮起时即可输入你想要的快捷键,目前只支持一个键"}},[a("span",{staticStyle:{"font-size":"15px"},attrs:{slot:"reference"},slot:"reference"},[e._v(" 滚动快捷键"),a("i",{staticClass:"el-icon-question",staticStyle:{"font-size":"1em"}})])])],1),a("el-col",{attrs:{span:17}},[a("el-input",{attrs:{readonly:""},on:{blur:e.cleared_to_monitor,focus:e.listen_scroll},model:{value:e.setting_data.keyboard.scroll_key,callback:function(t){e.$set(e.setting_data.keyboard,"scroll_key",t)},expression:"setting_data.keyboard.scroll_key"}})],1)],1)],1),a("el-form-item",{directives:[{name:"show",rawName:"v-show",value:e.setting_data.keyboard.using_keyboard,expression:"setting_data.keyboard.using_keyboard"}]},[a("el-row",{attrs:{gutter:2}},[a("el-col",{attrs:{span:5}},[a("el-popover",{attrs:{placement:"top-start",width:"200",trigger:"hover",content:"设置滚动长度，数字越大滚动远，最大1000"}},[a("span",{staticStyle:{"font-size":"15px"},attrs:{slot:"reference"},slot:"reference"},[e._v(" 滚动长度"),a("i",{staticClass:"el-icon-question",staticStyle:{"font-size":"1em"}})])])],1),a("el-col",{attrs:{span:17}},[a("el-input-number",{attrs:{min:1,max:1e3},model:{value:e.setting_data.keyboard.scroll_distance,callback:function(t){e.$set(e.setting_data.keyboard,"scroll_distance",t)},expression:"setting_data.keyboard.scroll_distance"}})],1)],1)],1),a("el-form-item",{directives:[{name:"show",rawName:"v-show",value:e.setting_data.keyboard.using_keyboard,expression:"setting_data.keyboard.using_keyboard"}]},[a("el-row",{attrs:{gutter:2}},[a("el-col",{attrs:{span:5}},[a("el-popover",{attrs:{placement:"top-start",width:"200",trigger:"hover",content:"设置滚动速度，数字越大滚动越慢，为0时立即滚动，最大20"}},[a("span",{staticStyle:{"font-size":"15px"},attrs:{slot:"reference"},slot:"reference"},[e._v(" 滚动速度"),a("i",{staticClass:"el-icon-question",staticStyle:{"font-size":"1em"}})])])],1),a("el-col",{attrs:{span:17}},[a("el-input-number",{attrs:{min:0,max:20},model:{value:e.setting_data.keyboard.scroll_speed,callback:function(t){e.$set(e.setting_data.keyboard,"scroll_speed",t)},expression:"setting_data.keyboard.scroll_speed"}})],1)],1)],1)],1)],1),a("el-tab-pane",{attrs:{label:"提醒",name:"second"}},[a("el-form",{ref:"setting_data",attrs:{model:e.setting_data}},[a("el-form-item",{attrs:{label:"收藏提醒 "}},[a("el-radio",{attrs:{label:1},model:{value:e.setting_data.remind.collect_remind,callback:function(t){e.$set(e.setting_data.remind,"collect_remind",t)},expression:"setting_data.remind.collect_remind"}},[e._v("都不提醒")]),a("el-radio",{attrs:{label:2},model:{value:e.setting_data.remind.collect_remind,callback:function(t){e.$set(e.setting_data.remind,"collect_remind",t)},expression:"setting_data.remind.collect_remind"}},[e._v("只有失败提醒")]),a("el-radio",{attrs:{label:3},model:{value:e.setting_data.remind.collect_remind,callback:function(t){e.$set(e.setting_data.remind,"collect_remind",t)},expression:"setting_data.remind.collect_remind"}},[e._v("都提醒")])],1),a("el-form-item",{attrs:{label:"章节更新提醒 "}},[a("el-radio",{attrs:{label:1},model:{value:e.setting_data.remind.update_reading_section,callback:function(t){e.$set(e.setting_data.remind,"update_reading_section",t)},expression:"setting_data.remind.update_reading_section"}},[e._v("都不提醒")]),a("el-radio",{attrs:{label:2},model:{value:e.setting_data.remind.update_reading_section,callback:function(t){e.$set(e.setting_data.remind,"update_reading_section",t)},expression:"setting_data.remind.update_reading_section"}},[e._v("只有失败提醒")]),a("el-radio",{attrs:{label:3},model:{value:e.setting_data.remind.update_reading_section,callback:function(t){e.$set(e.setting_data.remind,"update_reading_section",t)},expression:"setting_data.remind.update_reading_section"}},[e._v("都提醒")])],1),a("el-form-item",{attrs:{label:"设置保存提醒 "}},[a("el-radio",{attrs:{label:1},model:{value:e.setting_data.remind.settings_saved_remind,callback:function(t){e.$set(e.setting_data.remind,"settings_saved_remind",t)},expression:"setting_data.remind.settings_saved_remind"}},[e._v("都不提醒")]),a("el-radio",{attrs:{label:2},model:{value:e.setting_data.remind.settings_saved_remind,callback:function(t){e.$set(e.setting_data.remind,"settings_saved_remind",t)},expression:"setting_data.remind.settings_saved_remind"}},[e._v("只有失败提醒")]),a("el-radio",{attrs:{label:3},model:{value:e.setting_data.remind.settings_saved_remind,callback:function(t){e.$set(e.setting_data.remind,"settings_saved_remind",t)},expression:"setting_data.remind.settings_saved_remind"}},[e._v("都提醒")])],1)],1)],1),a("el-tab-pane",{attrs:{label:"阅读外观",name:"third"}},[a("el-form",{ref:"setting_data",attrs:{model:e.setting_data}},[a("el-form-item",{attrs:{label:"主题"}},[a("el-select",{attrs:{placeholder:"主题"},model:{value:e.setting_data.style.theme,callback:function(t){e.$set(e.setting_data.style,"theme",t)},expression:"setting_data.style.theme"}},[a("el-option",{attrs:{label:"基础",value:"base-theme"}}),a("el-option",{attrs:{label:"护眼",value:"yellow-theme"}}),a("el-option",{attrs:{label:"暗色",value:"gray-theme"}})],1)],1),a("el-form-item",{attrs:{label:"字体大小"}},[a("el-input-number",{attrs:{min:1,max:40},model:{value:e.setting_data.style.font_size,callback:function(t){e.$set(e.setting_data.style,"font_size",t)},expression:"setting_data.style.font_size"}})],1),a("el-form-item",{attrs:{label:"间隔大小"}},[a("el-input-number",{attrs:{min:1,max:40},model:{value:e.setting_data.style.line_height,callback:function(t){e.$set(e.setting_data.style,"line_height",t)},expression:"setting_data.style.line_height"}})],1)],1)],1)],1),a("div",{staticClass:"dialog-footer",staticStyle:{"text-align":"center"},attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"primary"},on:{click:e.save_settings}},[e._v("保存")]),a("el-button",{attrs:{type:"danger"},on:{click:e.restore_settings}},[e._v("取消")])],1)],1)],1)},i=[],r=a("8196"),o=a("2b0e"),s=o["default"].extend({name:"setting",data:function(){return{setting_data:{_id:"setting",keyboard:{using_keyboard:!1,pre_key:"ArrowLeft",next_key:"ArrowRight",scroll_key:" ",scroll_distance:150,scroll_speed:5},remind:{collect_remind:3,update_reading_section:3,settings_saved_remind:3},style:{theme:"base-theme",font_size:18,line_height:25},version:"0.1.2",_rev:""},activeName:"first"}},props:{dialogVisible:Boolean},methods:{dialog_close:function(){this.$emit("close-dialog")},listen_previous_chapter:function(){var e=this;document.onkeydown=function(t){t.key!==e.setting_data.keyboard.scroll_key&&t.key!==e.setting_data.keyboard.next_key?e.setting_data.keyboard.pre_key=t.key:e.$message({showClose:!0,message:"两个快捷键不能相同",type:"error"})}},listen_next_chapter:function(){var e=this;document.onkeydown=function(t){t.key!==e.setting_data.keyboard.pre_key&&t.key!==e.setting_data.keyboard.scroll_key?e.setting_data.keyboard.next_key=t.key:e.$message({showClose:!0,message:"两个快捷键不能相同",type:"error"})}},listen_scroll:function(){var e=this;document.onkeydown=function(t){t.key!==e.setting_data.keyboard.pre_key&&t.key!==e.setting_data.keyboard.next_key?e.setting_data.keyboard.scroll_key=t.key:e.$message({showClose:!0,message:"两个快捷键不能相同",type:"error"})}},cleared_to_monitor:function(){document.onkeydown=null},save_settings:function(){Object(r["j"])(this.setting_data),this.setting_data=Object(r["e"])(),this.$emit("after-save"),this.$emit("close-dialog")},restore_settings:function(){this.setting_data=Object(r["e"])(),this.$emit("close-dialog")}},created:function(){this.setting_data=Object(r["e"])()}}),l=s,d=(a("0480"),a("2877")),c=Object(d["a"])(l,n,i,!1,null,"455a3410",null);t["a"]=c.exports},fa95:function(e,t,a){"use strict";a.d(t,"b",(function(){return n}));a("ac1f"),a("466d");function n(e,t,a){var n=e(t).attr("href");if(void 0===n)return null;var i=n.match(a);return null===i||void 0===i.groups?null:i.groups["id"]}var i={1:{encoding:"utf-8",url:"https://www.meegoq.com",name:"米趣小说网",novel_id_to_url:"https://www.meegoq.com/info{##novel_id##}.html",url_to_novel_id:"info(?<id>\\d+)\\.html",search:{url:"https://www.meegoq.com/search.htm?keyword={##search_name##}",li:"body > section > div.left > section > ul > li",novel_id:"span.n2 > a",author:"span.a2 > a",latest_chapter_id:"span.c2 > a",latest_chapter_id_regex:"_(?<id>\\d+).html",update_time:"span.t",novel_id_regex:"info(?<id>\\d+)\\.html"},novel:{directory:{url:"https://www.meegoq.com/book{##novel_id##}.html",chapter_id:"body > section > article > ul > li > a",chapter_id_regex:"_(?<id>\\d+).html",slice_left:9,slice_right:!1},info:{url:"https://www.meegoq.com/info{##novel_id##}.html",name:"body > section > div.left > article.info > header > h1",author:"body > section > div.left > article.info > p.detail.pt20 > i:nth-child(1) > a",last_update_time:"body > section > div.left > article.info > p:nth-child(4) > i",latest_chapter_id:"body > section > div.left > article.info > p:nth-child(5) > i > a",latest_chapter_id_regex:"_(?<id>\\d+).html"}},content:{url:"https://www.meegoq.com/book/{##novel_id##}_{##chapter_id##}.html",chapter_name:"body > article > header > h1",novel_name:"body > article > header > div > span:nth-child(1) > a",pre_chapter_id:"body > article > div.operate > ul > li:nth-child(1) > a",pre_chapter_id_regex:"_(?<id>\\d+).html",next_chapter_id:"body > article > div.operate > ul > li.last > a",next_chapter_id_regex:"_(?<id>\\d+).html",content:"#content",content_split:"　　"}},2:{name:"笔趣阁1",url:"https://www.kuxiaoshuo.com/",encoding:"gbk",novel_id_to_url:"https://www.kuxiaoshuo.com/{##novel_id##}/",url_to_novel_id:"com\\/(?<id>.*?)\\/",search:{url:"https://www.kuxiaoshuo.com/modules/article/search.php?searchkey={##search_name##}",li:"#hotcontent > table > tbody > tr",novel_id:"td:nth-child(1) > a",author:"td:nth-child(3)",latest_chapter_id:"td:nth-child(2) > a",latest_chapter_id_regex:"\\/(?<id>\\d+).html",update_time:"td:nth-child(5)",novel_id_regex:"com\\/(?<id>.*?)\\/"},novel:{directory:{url:"https://www.kuxiaoshuo.com/{##novel_id##}/",chapter_id:"#list > dl > dd > a",chapter_id_regex:"\\/(?<id>\\d+).html",slice_left:9,slice_right:!1},info:{url:"https://www.kuxiaoshuo.com/{##novel_id##}/",name:"#info > h1",author:"#info > p:nth-child(2)",last_update_time:"#info > p:nth-child(4)",latest_chapter_id:"#list > dl > dd:nth-child(2) > a",latest_chapter_id_regex:"\\/(?<id>\\d+).html"}},content:{url:"https://www.kuxiaoshuo.com/{##novel_id##}/{##chapter_id##}.html",chapter_name:"#wrapper > div.content_read > div > div.bookname > h1",novel_name:"#wrapper > div.content_read > div > div.con_top > a:nth-child(4)",pre_chapter_id:"#wrapper > div.content_read > div > div.bookname > div.bottem1 > a:nth-child(3)",pre_chapter_id_regex:"\\/(?<id>\\d+).html",next_chapter_id:"#wrapper > div.content_read > div > div.bookname > div.bottem1 > a:nth-child(5)",next_chapter_id_regex:"\\/(?<id>\\d+).html",content:"#content",content_split:"　　"}}};t["a"]=i}}]);