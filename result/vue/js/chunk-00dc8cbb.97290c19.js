(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-00dc8cbb"],{1276:function(e,t,n){"use strict";var i=n("d784"),r=n("44e7"),a=n("825a"),o=n("1d80"),s=n("4840"),c=n("8aa5"),l=n("50c4"),d=n("14c3"),u=n("9263"),g=n("d039"),h=[].push,f=Math.min,p=4294967295,_=!g((function(){return!RegExp(p,"y")}));i("split",2,(function(e,t,n){var i;return i="c"=="abbc".split(/(b)*/)[1]||4!="test".split(/(?:)/,-1).length||2!="ab".split(/(?:ab)*/).length||4!=".".split(/(.?)(.?)/).length||".".split(/()()/).length>1||"".split(/.?/).length?function(e,n){var i=String(o(this)),a=void 0===n?p:n>>>0;if(0===a)return[];if(void 0===e)return[i];if(!r(e))return t.call(i,e,a);var s,c,l,d=[],g=(e.ignoreCase?"i":"")+(e.multiline?"m":"")+(e.unicode?"u":"")+(e.sticky?"y":""),f=0,_=new RegExp(e.source,g+"g");while(s=u.call(_,i)){if(c=_.lastIndex,c>f&&(d.push(i.slice(f,s.index)),s.length>1&&s.index<i.length&&h.apply(d,s.slice(1)),l=s[0].length,f=c,d.length>=a))break;_.lastIndex===s.index&&_.lastIndex++}return f===i.length?!l&&_.test("")||d.push(""):d.push(i.slice(f)),d.length>a?d.slice(0,a):d}:"0".split(void 0,0).length?function(e,n){return void 0===e&&0===n?[]:t.call(this,e,n)}:t,[function(t,n){var r=o(this),a=void 0==t?void 0:t[e];return void 0!==a?a.call(t,r,n):i.call(String(r),t,n)},function(e,r){var o=n(i,e,this,r,i!==t);if(o.done)return o.value;var u=a(e),g=String(this),h=s(u,RegExp),m=u.unicode,y=(u.ignoreCase?"i":"")+(u.multiline?"m":"")+(u.unicode?"u":"")+(_?"y":"g"),v=new h(_?u:"^(?:"+u.source+")",y),b=void 0===r?p:r>>>0;if(0===b)return[];if(0===g.length)return null===d(v,g)?[g]:[];var x=0,k=0,w=[];while(k<g.length){v.lastIndex=_?k:0;var S,N=d(v,_?g:g.slice(k));if(null===N||(S=f(l(v.lastIndex+(_?0:k)),g.length))===x)k=c(g,k,m);else{if(w.push(g.slice(x,k)),w.length===b)return w;for(var I=1;I<=N.length-1;I++)if(w.push(N[I]),w.length===b)return w;k=x=S}}return w.push(g.slice(x)),w}]}),!_)},"1efa":function(e,t,n){"use strict";n.r(t);var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"router",attrs:{id:"content"}},[n("el-container",{staticStyle:{height:"100%"}},[n("el-header",{attrs:{height:"40px"}},[n("my-header",{attrs:{name:e.novel_name+"-"+e.chapter_name},on:{"created-method":e.created_method,"after-save":e.get_setting_info}})],1),n("el-main",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],class:e.style.theme,attrs:{id:"main"}},[n("div",{staticStyle:{"text-align":"center","margin-bottom":"10px"}},[n("h4",{staticClass:"title",attrs:{id:"title"}},[e._v(e._s(e.chapter_name))])]),n("div",{staticStyle:{"text-align":"center"}},[n("p",{staticStyle:{"margin-block-end":"0"}},[n("span",{directives:[{name:"show",rawName:"v-show",value:-1!==e.pre_cid,expression:"pre_cid!==-1"}],staticStyle:{"margin-right":"10px"}},[n("i",{staticClass:"el-icon-caret-left"}),n("el-link",{attrs:{target:"_blank",underline:!1,type:"gray-theme"===e.style.theme?"info":"default"},on:{click:function(t){return e.go_to_content(e.nid,e.pre_cid)}}},[e._v("上一章")])],1),n("span",{staticStyle:{"margin-right":"10px"}},[n("i",{staticClass:"el-icon-menu"}),n("el-link",{attrs:{target:"_blank",underline:!1,type:"gray-theme"===e.style.theme?"info":"default"},on:{click:function(t){return e.go_to_novel(e.nid)}}},[e._v("目录")])],1),n("span",{directives:[{name:"show",rawName:"v-show",value:-1!==e.next_cid,expression:"next_cid!==-1"}],staticStyle:{"margin-right":"10px"}},[n("i",{staticClass:"el-icon-caret-right"}),n("el-link",{attrs:{target:"_blank",underline:!1,type:"gray-theme"===e.style.theme?"info":"default"},on:{click:function(t){return e.go_to_content(e.nid,e.next_cid)}}},[e._v("下一章")])],1)])]),n("div",{staticClass:"content",style:"line-height: "+(e.style.fort_size+e.style.line_height)+"px;"},e._l(e.content_list,(function(t,i){return n("p",{key:i,style:"font-size:"+e.style.fort_size+"px;"},[e._v(" "+e._s(t)+" ")])})),0),n("div",{staticStyle:{"text-align":"center"}},[n("p",{staticStyle:{"margin-block-start":"0"}},[n("span",{directives:[{name:"show",rawName:"v-show",value:-1!==e.pre_cid,expression:"pre_cid!==-1"}],staticStyle:{"margin-right":"10px"}},[n("i",{staticClass:"el-icon-caret-left"}),n("el-link",{attrs:{target:"_blank",underline:!1,type:"gray-theme"===e.style.theme?"info":"default"},on:{click:function(t){return e.go_to_content(e.nid,e.pre_cid)}}},[e._v("上一章")])],1),n("span",{staticStyle:{"margin-right":"10px"}},[n("i",{staticClass:"el-icon-menu"}),n("el-link",{attrs:{target:"_blank",underline:!1,type:"gray-theme"===e.style.theme?"info":"default"},on:{click:function(t){return e.go_to_novel(e.nid)}}},[e._v("目录")])],1),n("span",{directives:[{name:"show",rawName:"v-show",value:-1!==e.next_cid,expression:"next_cid!==-1"}],staticStyle:{"margin-right":"10px"}},[n("i",{staticClass:"el-icon-caret-right"}),n("el-link",{attrs:{target:"_blank",underline:!1,type:"gray-theme"===e.style.theme?"info":"default"},on:{click:function(t){return e.go_to_content(e.nid,e.next_cid)}}},[e._v("下一章")])],1)])])])],1)],1)},r=[],a=(n("ac1f"),n("5319"),n("99af"),n("4de4"),n("4160"),n("d81d"),n("fb6a"),n("b0c0"),n("a9e3"),n("d3b7"),n("4d63"),n("25f0"),n("466d"),n("1276"),n("159b"),n("9558"));function o(e,t,n,i){switch(e){case"1":s(t,n,i);break;case"0":c(t,n,i);break}}function s(e,t,n){n.loading=!0,n.axios.get("https://www.meegoq.com/book/".concat(e,"_").concat(t,".html")).then((function(e){n.loading=!1;var t=(new n.xmldom.DOMParser).parseFromString(e.data);n.chapter_name=n.xpath.select("/html/body/article/header/h1/text()",t)[0].toString(),n.novel_name=n.xpath.select("/html/body/article/header/div/span[1]/a/text()",t)[0].toString(),n.content_list=[],n.pre_cid=n.xpath.select1("/html/body/article/div[2]/ul/li[1]/a/@href",t).value.match(Object(a["a"])(/_([0-9]+).html/,{id:1})),null===n.pre_cid?n.pre_cid=-1:n.pre_cid=n.pre_cid.groups["id"],n.next_cid=n.xpath.select1("/html/body/article/div[2]/ul/li[6]/a/@href",t).value.match(Object(a["a"])(/_([0-9]+).html/,{id:1})),null===n.next_cid?n.next_cid=-1:n.next_cid=n.next_cid.groups["id"];var i=n.xpath.select('//*[@id="content"]/text()',t);i.forEach((function(e){var t=/^　*$/;t.test(e.toString())||n.content_list.push(e.toString())})),n.update_reading_section()})).catch((function(e){n.loading=!1,console.log(e)}))}function c(e,t,n){var i=window.utools.db.get(e);if(null===i)n.$notify({title:"错误",message:"没有此章节,三秒后将返回",duration:0,type:"error"}),window.setTimeout((function(){n.$router.go(-1)}),3e3);else{var r;if(n.novel_name=i.name,n.chapter_name=i.directory_list[Number(t)].name,i.is_regex){var a=new RegExp(i.regex,"g");r=i.content.split(a)[Number(t)+1]}else r=i.content.slice(Number(t)*Number(i.split_num),(Number(t)+1)*Number(i.split_num));n.content_list=r.split(/\r\n|\n/).filter((function(e){return""!==e})).map((function(e){return/^( +|　+).*$/.test(String(e))?e.replace(/ +/,"　　"):"　　"+e})),n.pre_cid=Number(t)-1,i.directory_list.length===Number(t)+1?n.next_cid=-1:n.next_cid=Number(t)+1,n.update_reading_section()}}var l={get_content:o},d=n("71c2"),u={name:"content",components:{"my-header":d["a"]},mounted:function(){this.created_method()},data:function(){return{loading:!1,novel_name:"",chapter_name:"",content_list:[],pre_cid:-1,next_cid:-1,remind:{collect_remind:3,update_reading_section:3,settings_saved_remind:3},style:{theme:"base-theme",fort_size:18,line_height:25}}},methods:{go_back:function(){this.$router.go(-1)},get_text_and_info:function(){l.get_content(this.type,this.nid,this.cid,this)},go_to_novel:function(e){this.$router.push({name:"novel",params:{nid:e},query:{type:String(this.type)}})},go_to_content:function(e,t){this.$router.replace({name:"content",params:{nid:e,cid:t},query:{type:String(this.type)}}),this.get_text_and_info()},update_reading_section:function(){var e=window.utools.db.get(this.nid);if(null!==e){e["read_chapter"]={cid:this.cid,name:this.chapter_name};var t=window.utools.db.put(e);t.hasOwnProperty("error")&&t["error"]?this.remind.update_reading_section>=2&&this.$notify({title:"错误",message:"更新最后阅读章节失败",duration:0,type:"error"}):this.remind.update_reading_section>=3&&this.$message({showClose:!0,message:"更新最后阅读章节成功",type:"success"})}document.getElementById("main").scrollTop=0},get_setting_info:function(){var e=this;this.remind=window.utools.db.get("setting").remind,this.style=window.utools.db.get("setting").style;var t=window.utools.db.get("setting");t.keyborad.using_keyboard?document.onkeydown=function(n){if(n.key===t.keyborad.pre_key)-1!==e.pre_cid?e.go_to_content(e.nid,e.pre_cid):e.$message({showClose:!0,message:"没有上一章啦",type:"error"});else if(n.key===t.keyborad.next_key)-1!==e.next_cid?e.go_to_content(e.nid,e.next_cid):e.$message({showClose:!0,message:"没有下一章啦",type:"error"});else if(n.key===t.keyborad.scroll_key)for(var i=0;i<t.keyborad.scroll_distance;i++)setTimeout((function(){document.getElementById("main").scrollTop+=1}),t.keyborad.scroll_speed*i)}:document.onkeydown=void 0},created_method:function(){var e=this;window.utools.setSubInput((function(t){var n=t.text;e.$router.push({name:"search",query:{name:n,type:"1"}})}),"搜索在线小说"),this.remind=window.utools.db.get("setting").remind,this.style=window.utools.db.get("setting").style;var t=window.utools.db.get("setting");this.get_text_and_info(),t.keyborad.using_keyboard?document.onkeydown=function(n){switch(n.key){case t.keyborad.pre_key:-1!==e.pre_cid?e.go_to_content(e.nid,e.pre_cid):e.$message({showClose:!0,message:"没有上一章啦",type:"error"});break;case t.keyborad.next_key:-1!==e.next_cid?e.go_to_content(e.nid,e.next_cid):e.$message({showClose:!0,message:"没有下一章啦",type:"error"});break;case t.keyborad.scroll_key:for(var i=0;i<t.keyborad.scroll_distance;i++)setTimeout((function(){document.getElementById("main").scrollTop+=1}),t.keyborad.scroll_speed*i);break}}:document.onkeydown=void 0,window.utools.subInputBlur()}},computed:{nid:function(){return this.$route.params.nid},cid:function(){return this.$route.params.cid},type:function(){return this.$route.query.type}}},g=u,h=(n("a88b"),n("2877")),f=Object(h["a"])(g,i,r,!1,null,"7fd778a8",null);t["default"]=f.exports},"3b3e":function(e,t,n){},"4de4":function(e,t,n){"use strict";var i=n("23e7"),r=n("b727").filter,a=n("1dde"),o=n("ae40"),s=a("filter"),c=o("filter");i({target:"Array",proto:!0,forced:!s||!c},{filter:function(e){return r(this,e,arguments.length>1?arguments[1]:void 0)}})},5899:function(e,t){e.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},"58a8":function(e,t,n){var i=n("1d80"),r=n("5899"),a="["+r+"]",o=RegExp("^"+a+a+"*"),s=RegExp(a+a+"*$"),c=function(e){return function(t){var n=String(i(t));return 1&e&&(n=n.replace(o,"")),2&e&&(n=n.replace(s,"")),n}};e.exports={start:c(1),end:c(2),trim:c(3)}},"71c2":function(e,t,n){"use strict";var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"header"}},[n("el-col",{attrs:{span:"20"}},[n("el-page-header",{staticStyle:{height:"40px"},on:{back:e.go_back}},[n("span",{staticStyle:{"font-size":"15px"},attrs:{slot:"title"},slot:"title"},[e._v(" 返回 ")]),n("template",{staticStyle:{"font-size":"20px"},slot:"content"},[e._v(e._s(e.name)+" ")])],2)],1),n("el-col",{staticStyle:{height:"40px"},attrs:{span:"4"}},[n("el-link",{staticStyle:{float:"right",height:"100%"},attrs:{index:"setting",underline:!1},on:{click:function(t){e.dialogVisible=!0}}},[n("i",{staticClass:"el-icon-s-tools",staticStyle:{"font-size":"20px","align-self":"center"}})]),n("el-link",{staticStyle:{float:"right",height:"100%"},attrs:{index:"setting",underline:!1},on:{click:function(t){return e.$emit("created-method")}}},[n("i",{staticClass:"el-icon-refresh-right",staticStyle:{"font-size":"20px","align-self":"center","margin-right":"6px"}})])],1),n("my-setting",{attrs:{"dialog-visible":e.dialogVisible},on:{"close-dialog":function(t){e.dialogVisible=!1},"after-save":function(t){return e.$emit("after-save")}}})],1)},r=[],a=n("f49f"),o={name:"header",components:{"my-setting":a["a"]},methods:{go_back:function(){this.$router.go(-1)}},data:function(){return{dialogVisible:!1}},props:{name:String}},s=o,c=n("2877"),l=Object(c["a"])(s,i,r,!1,null,"340cc26e",null);t["a"]=l.exports},"99af":function(e,t,n){"use strict";var i=n("23e7"),r=n("d039"),a=n("e8b5"),o=n("861d"),s=n("7b0b"),c=n("50c4"),l=n("8418"),d=n("65f0"),u=n("1dde"),g=n("b622"),h=n("2d00"),f=g("isConcatSpreadable"),p=9007199254740991,_="Maximum allowed index exceeded",m=h>=51||!r((function(){var e=[];return e[f]=!1,e.concat()[0]!==e})),y=u("concat"),v=function(e){if(!o(e))return!1;var t=e[f];return void 0!==t?!!t:a(e)},b=!m||!y;i({target:"Array",proto:!0,forced:b},{concat:function(e){var t,n,i,r,a,o=s(this),u=d(o,0),g=0;for(t=-1,i=arguments.length;t<i;t++)if(a=-1===t?o:arguments[t],v(a)){if(r=c(a.length),g+r>p)throw TypeError(_);for(n=0;n<r;n++,g++)n in a&&l(u,g,a[n])}else{if(g>=p)throw TypeError(_);l(u,g++,a)}return u.length=g,u}})},a88b:function(e,t,n){"use strict";var i=n("3b3e"),r=n.n(i);r.a},a9e3:function(e,t,n){"use strict";var i=n("83ab"),r=n("da84"),a=n("94ca"),o=n("6eeb"),s=n("5135"),c=n("c6b6"),l=n("7156"),d=n("c04e"),u=n("d039"),g=n("7c73"),h=n("241c").f,f=n("06cf").f,p=n("9bf2").f,_=n("58a8").trim,m="Number",y=r[m],v=y.prototype,b=c(g(v))==m,x=function(e){var t,n,i,r,a,o,s,c,l=d(e,!1);if("string"==typeof l&&l.length>2)if(l=_(l),t=l.charCodeAt(0),43===t||45===t){if(n=l.charCodeAt(2),88===n||120===n)return NaN}else if(48===t){switch(l.charCodeAt(1)){case 66:case 98:i=2,r=49;break;case 79:case 111:i=8,r=55;break;default:return+l}for(a=l.slice(2),o=a.length,s=0;s<o;s++)if(c=a.charCodeAt(s),c<48||c>r)return NaN;return parseInt(a,i)}return+l};if(a(m,!y(" 0o1")||!y("0b1")||y("+0x1"))){for(var k,w=function(e){var t=arguments.length<1?0:e,n=this;return n instanceof w&&(b?u((function(){v.valueOf.call(n)})):c(n)!=m)?l(new y(x(t)),n,w):x(t)},S=i?h(y):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),N=0;S.length>N;N++)s(y,k=S[N])&&!s(w,k)&&p(w,k,f(y,k));w.prototype=v,v.constructor=w,o(r,m,w)}},d81d:function(e,t,n){"use strict";var i=n("23e7"),r=n("b727").map,a=n("1dde"),o=n("ae40"),s=a("map"),c=o("map");i({target:"Array",proto:!0,forced:!s||!c},{map:function(e){return r(this,e,arguments.length>1?arguments[1]:void 0)}})},fb6a:function(e,t,n){"use strict";var i=n("23e7"),r=n("861d"),a=n("e8b5"),o=n("23cb"),s=n("50c4"),c=n("fc6a"),l=n("8418"),d=n("b622"),u=n("1dde"),g=n("ae40"),h=u("slice"),f=g("slice",{ACCESSORS:!0,0:0,1:2}),p=d("species"),_=[].slice,m=Math.max;i({target:"Array",proto:!0,forced:!h||!f},{slice:function(e,t){var n,i,d,u=c(this),g=s(u.length),h=o(e,g),f=o(void 0===t?g:t,g);if(a(u)&&(n=u.constructor,"function"!=typeof n||n!==Array&&!a(n.prototype)?r(n)&&(n=n[p],null===n&&(n=void 0)):n=void 0,n===Array||void 0===n))return _.call(u,h,f);for(i=new(void 0===n?Array:n)(m(f-h,0)),d=0;h<f;h++,d++)h in u&&l(i,d,u[h]);return i.length=d,i}})}}]);
//# sourceMappingURL=chunk-00dc8cbb.97290c19.js.map