(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{36:function(e,t,a){e.exports=a.p+"static/media/splash.4cf6d121.jpg"},44:function(e,t,a){e.exports=a(84)},49:function(e,t,a){},79:function(e,t,a){},84:function(e,t,a){"use strict";a.r(t);var l=a(0),n=a.n(l),i=a(31),r=a.n(i),o=(a(49),a(32)),c=a(3),s=a(17),m=a(1),u=a(40),d=a(33),g=a(36),p=a.n(g);var f=function(e){var t=e.splashImages;return n.a.createElement("div",{id:"splashContainer"},n.a.createElement("img",{src:t,style:{minWidth:"100vw",minHeight:"100vh",width:"100%",objectFit:"cover"}}))},h=function(e){var t=void 0;e.width&&e.height&&e.depth?t="".concat(e.width,'" \xd7 ').concat(e.height," \xd7 ").concat(e.depth,'"'):e.width&&e.height&&(t="".concat(e.width,'" \xd7 ').concat(e.height,'"'));var a=[e.title,e.year,e.medium,t];a=a.filter(function(e){return void 0!==e});for(var l=[],i=0;i<a.length;i++)0===i?l.push(n.a.createElement("div",null,n.a.createElement("i",null,a[i]))):(l.push(n.a.createElement("span",null,a[i])),i!==a.length-1&&l.push(n.a.createElement("span",null," \xb7 "," ")));return n.a.createElement("div",{className:"workText",style:{textAlign:"center"}},l.map(function(e){return e}))},v=function(e,t){if(e.moduleWorks){var a=e.moduleWorks.length>0?e.moduleWorks[0]:void 0,l=T(a,t);return[Object(c.a)(l,1)[0]]}},E=function(e,t){if(e.moduleWorks){var a=Object(l.useState)([]),n=Object(c.a)(a,2),i=n[0],r=n[1];return Object(l.useEffect)(function(){var a="OR("+e.moduleWorks.map(function(e){return"RECORD_ID() = '".concat(e,"'")}).join(",")+")";t("Works").select({filterByFormula:a}).eachPage(function(e){r(i.concat(e.map(w)))},function(e){console.log(e)})},[e]),[i]}},T=function(e,t){var a=Object(l.useState)(void 0),n=Object(c.a)(a,2),i=n[0],r=n[1];return Object(l.useEffect)(function(){t("Works").find(e,function(e,t){e?console.error(e):r(w(t))})},[e]),[i]},w=function(e){var t=e.get("Work");return{url:t&&t.length>0?t[0].url:void 0,title:e.get("Title"),year:e.get("Year"),medium:e.get("Medium"),width:e.get("Width"),height:e.get("Height"),depth:e.get("Depth"),description:e.get("Description"),price:e.get("Price"),videourl:e.get("Video URL")}};function x(e){var t=e.module,a=e.base,l=v(t,a),i=Object(c.a)(l,1)[0];return i?n.a.createElement("div",{className:"pageModule"},n.a.createElement("img",{alt:"artwork",className:"workImage",style:{width:"50%",height:"auto"},src:i.url}),t.showWorkTitlesWithinModule&&h(i),t.moduleTitle&&n.a.createElement("div",{class:"workText"},t.moduleTitle),t.moduleText&&n.a.createElement("div",{class:"workText"},t.moduleText)):null}function b(e){var t=e.module,a=e.base,l=v(t,a),i=Object(c.a)(l,1)[0];return i?n.a.createElement("div",{className:"pageModule"},n.a.createElement("img",{alt:"artwork",className:"workImage",style:{width:"75%",height:"auto"},src:i.url}),t.showWorkTitlesWithinModule&&h(i),t.moduleTitle&&n.a.createElement("div",{class:"workText"},t.moduleTitle),t.moduleText&&n.a.createElement("div",{class:"workText"},t.moduleText)):null}function y(e){var t=e.module,a=e.base,l=v(t,a),i=Object(c.a)(l,1)[0];return i?n.a.createElement("div",{className:"pageModule imageFullModule"},n.a.createElement("img",{alt:"artwork",className:"workImage",style:{width:"100%",height:"auto"},src:i.url}),t.showWorkTitlesWithinModule&&h(i),t.moduleTitle&&n.a.createElement("div",{className:"workText"},t.moduleTitle),t.moduleText&&n.a.createElement("div",{className:"workText"},t.moduleText)):null}function k(e){var t=e.module,a=e.base,l=v(t,a),i=Object(c.a)(l,1)[0];return void 0===i?null:n.a.createElement("div",{className:"pageModule imageWithTextModule",style:{flexDirection:"row",alignItems:"center",gap:50}},n.a.createElement("div",{style:{display:"flex",flex:1,flexDirection:"column",alignItems:"center"}},n.a.createElement("img",{alt:"artwork",className:"workImage",style:{width:"100%",height:"auto"},src:i.url}),t.showWorkTitlesWithinModule&&h(i)),n.a.createElement("div",{className:"imageWithTextModuleText",style:{display:"flex",fontSize:18,flex:1,flexDirection:"column",whiteSpace:"pre-wrap"}},t.moduleTitle&&n.a.createElement("div",{class:"workText"},t.moduleTitle),t.moduleText&&n.a.createElement("div",{class:"workText"},t.moduleText)))}function j(e){var t=e.module,a=e.base,l=v(t,a),i=Object(c.a)(l,1)[0];return void 0===i?null:n.a.createElement("div",{className:"pageModule textWithImageModule",style:{flexDirection:"row",alignItems:"center",gap:50}},n.a.createElement("div",{style:{flex:1,fontSize:18,display:"flex",flexDirection:"column",textAlign:"right",alignItems:"flex-end",whiteSpace:"pre-wrap"},className:"imageWithTextModuleText"},t.moduleTitle&&n.a.createElement("div",{class:"workText"},t.moduleTitle),t.moduleText&&n.a.createElement("div",{class:"workText"},t.moduleText)),n.a.createElement("div",{style:{display:"flex",flex:1,flexDirection:"column",alignItems:"center"}},n.a.createElement("img",{alt:"artwork",className:"workImage",style:{width:"100%",height:"auto"},src:i.url}),t.showWorkTitlesWithinModule&&h(i)))}function I(e){var t=e.module;return n.a.createElement("div",{className:"pageModule textModule",style:{flexDirection:"row",alignItems:"flex-start",gap:50}},t.moduleTitle&&n.a.createElement("div",{style:{fontSize:18}},t.moduleTitle),t.moduleText&&n.a.createElement("div",{style:{maxWidth:"70%",fontSize:18,whiteSpace:"pre-wrap"}},t.moduleText))}function O(e){var t=e.module;return n.a.createElement("div",{className:"pageModule linkModule",style:{flexDirection:"row",alignItems:"flex-start",gap:50,marginBottom:10}},t.moduleTitle&&n.a.createElement("a",{href:t.moduleText,style:{fontSize:18},target:"_blank"},t.moduleTitle))}var W=function(e){var t=e.module,a=e.base,l=E(t,a),i=Object(c.a)(l,1)[0];return n.a.createElement("div",{className:"pageModule carouselModule"},n.a.createElement("div",{style:{display:"flex",flexDirection:"row",overflowX:"scroll",maxWidth:"100%",gap:50,justifyContent:"space-between"}},i.map(function(e){return n.a.createElement("div",{style:{display:"flex",minWidth:"60%",flexDirection:"column",justifyContent:"center",alignItems:"center"}},n.a.createElement("img",{alt:"artwork",className:"workImage",src:e.url,style:{maxHeight:"70vh",width:"100%",minHeight:"50vh"}}),t.showWorkTitlesWithinModule&&h(e))})),t.moduleTitle&&n.a.createElement("div",{class:"workText"},t.moduleTitle),t.moduleText&&n.a.createElement("div",{class:"workText"},t.moduleText))};function M(e){var t=e.module,a=e.base,l=E(t,a),i=Object(c.a)(l,1)[0],r=100/i.length-5;return n.a.createElement("div",{className:"pageModule cascadeModule"},n.a.createElement("div",{style:{display:"flex",flexDirection:"row",justifyContent:"space-around",alignItems:"flex-start"}},i.map(function(e,a){return n.a.createElement("div",{className:"cascadeElement",style:{display:"flex",width:"".concat(r,"%"),marginTop:4*r*(i.length-1-a),flexDirection:"column",justifyContent:"center",alignItems:"center"}},n.a.createElement("img",{alt:"artwork",className:"workImage",src:e.url}),t.showWorkTitlesWithinModule&&h(e))})),t.moduleTitle&&n.a.createElement("div",{class:"workText"},t.moduleTitle),t.moduleText&&n.a.createElement("div",{class:"workText"},t.moduleText))}function N(e){var t=e.module,a=e.base,l=E(t,a),i=Object(c.a)(l,1)[0],r=100/i.length-5;return n.a.createElement("div",{className:"pageModule cascadeModule"},n.a.createElement("div",{style:{display:"flex",flexDirection:"row",justifyContent:"space-around",alignItems:"flex-start"}},i.map(function(e,a){return n.a.createElement("div",{className:"cascadeElement",style:{display:"flex",width:"".concat(r,"%"),marginTop:4*r*a,flexDirection:"column",justifyContent:"center",alignItems:"center"}},n.a.createElement("img",{alt:"artwork",className:"workImage",src:e.url}),t.showWorkTitlesWithinModule&&h(e))})),t.moduleTitle&&n.a.createElement("div",{class:"workText"},t.moduleTitle),t.moduleText&&n.a.createElement("div",{class:"workText"},t.moduleText))}function S(e){var t=e.module,a=e.base,l=E(t,a),i=Object(c.a)(l,1)[0];return n.a.createElement("div",{className:"pageModule gridModule"},n.a.createElement("div",{style:{display:"flex",flexDirection:"row",maxWidth:"100%",gap:50,justifyContent:"space-between"}},i.map(function(e){return n.a.createElement("div",{className:"gridElement",style:{display:"flex",flexDirection:"column",flex:1,justifyContent:"center",alignItems:"center"}},n.a.createElement("img",{alt:"artwork",className:"workImage",src:e.url,style:{width:"100%"}}),t.showWorkTitlesWithinModule&&h(e))})),t.moduleTitle&&n.a.createElement("div",{class:"workText"},t.moduleTitle),t.moduleText&&n.a.createElement("div",{class:"workText"},t.moduleText))}function C(e){var t=e.module,a=e.base,l=v(t,a),i=Object(c.a)(l,1)[0];return i?n.a.createElement("div",{className:"pageModule"},n.a.createElement("div",{className:"video",style:{position:"relative",width:"100%",height:0,paddingBottom:"56.25%"}},n.a.createElement("iframe",{style:{position:"absolute",top:0,bottom:0,width:"100%",height:"100%"},src:"".concat(i.videourl,"?autoplay=1&mute=1"),frameborder:"0",allow:"autoplay",allowfullscreen:!0})),t.showWorkTitlesWithinModule&&h(i),t.moduleTitle&&n.a.createElement("div",{class:"workText"},t.moduleTitle),t.moduleText&&n.a.createElement("div",{class:"workText"},t.moduleText)):null}var D=function(e){var t=e.page,a=e.base;console.log(t),console.log(a);var i=Object(l.useState)([]),r=Object(c.a)(i,2),o=r[0],s=r[1];return Object(l.useEffect)(function(){s([]),document.querySelector("#scrollContent")&&(document.querySelector("#page").scrollTop=0),a(t.pageTitle).select({view:"Grid view"}).firstPage(function(e,t){if(e)console.error(e);else{var a=[];t.forEach(function(e){a.push({moduleType:e.get("Module Type"),moduleWorks:e.get("Module Work(s)"),moduleTitle:e.get("Module Title"),moduleText:e.get("Module Text"),showWorkTitlesWithinModule:e.get("Show Work Titles Within Module")})}),s(a)}})},[t.pageTitle]),n.a.createElement("div",{id:"page"},n.a.createElement("div",{id:"scrollContent"},o.map(function(e,t){return"Image Full"===e.moduleType?n.a.createElement(y,{key:e.moduleTitle,module:e,base:a}):"Image Three Quarter"===e.moduleType?n.a.createElement(b,{key:e.moduleTitle,module:e,base:a}):"Image Half"===e.moduleType?n.a.createElement(x,{key:e.moduleTitle,module:e,base:a}):"Carousel"===e.moduleType?n.a.createElement(W,{key:e.moduleTitle,module:e,base:a}):"Image With Text"===e.moduleType?n.a.createElement(k,{key:e.moduleTitle,module:e,base:a}):"Text With Image"===e.moduleType?n.a.createElement(j,{key:e.moduleTitle,module:e,base:a}):"Text"===e.moduleType?n.a.createElement(I,{key:e.moduleTitle,module:e,base:a}):"Link"===e.moduleType?n.a.createElement(O,{key:e.moduleTitle,module:e,base:a}):"Cascade Left"===e.moduleType?n.a.createElement(M,{key:e.moduleTitle,module:e,base:a}):"Cascade Right"===e.moduleType?n.a.createElement(N,{key:e.moduleTitle,module:e,base:a}):"Video"===e.moduleType?n.a.createElement(C,{key:e.moduleTitle,module:e,base:a}):"Grid"===e.moduleType?n.a.createElement(S,{key:e.moduleTitle,module:e,base:a}):null})))};var R=function(e){var t=e.module,a=e.base,l=E(t,a),i=Object(c.a)(l,1)[0];return n.a.createElement("div",{className:"pageModule carouselModule",style:{marginBottom:50}},n.a.createElement("div",{style:{background:"rgb(200, 200, 200)",width:"100%",height:1}}),t.carouselLabel&&n.a.createElement("div",{class:"workText",style:{margin:50}},"\xb7 ",t.carouselLabel," \xb7"),n.a.createElement("div",{style:{alignItems:"flex-start",display:"flex",flexDirection:"row",overflowX:"scroll",maxWidth:"100%",gap:40,justifyContent:"space-between"}},i.map(function(e){return n.a.createElement("div",{style:{display:"flex",minWidth:"40%",flexDirection:"column",justifyContent:"center",alignItems:"center",textAlign:"center",gap:10}},n.a.createElement("img",{alt:"artwork",className:"workImage",src:e.url,style:{maxHeight:"50vh",width:"100%",minHeight:"50vh"}}),t.showWorkTitlesWithinModule&&h(e),e.description&&n.a.createElement("div",{className:"workText",style:{marginBottom:15}},e.description),e.price&&n.a.createElement("div",{className:"workText"},"$",e.price,".00"))})),t.moduleTitle&&n.a.createElement("div",{class:"workText"},t.moduleTitle),t.moduleText&&n.a.createElement("div",{class:"workText"},t.moduleText))};var L=function(e){var t=e.page,a=e.base,i=Object(l.useState)([]),r=Object(c.a)(i,2),o=r[0],s=r[1];return Object(l.useEffect)(function(){a(t.pageTitle).select({view:"Grid view"}).firstPage(function(e,t){if(e)console.error(e);else{var a=[];t.forEach(function(e){a.push({category:e.get("Category"),works:e.get("Works")})}),s(a)}})},[t.pageTitle]),n.a.createElement("div",{id:"page"},n.a.createElement("div",{id:"scrollContent"},n.a.createElement("div",{style:{textAlign:"center",marginBottom:15}},"Price List"),n.a.createElement("div",{style:{textAlign:"center",marginBottom:25}},"Contact me, srticknor@gmail.com, to purchase."),o.map(function(e,t){return n.a.createElement(n.a.Fragment,null,n.a.createElement(R,{module:{carouselLabel:e.category,moduleWorks:e.works,showWorkTitlesWithinModule:!0,showPrices:!0},base:a}))})))},P=a(37);var F=function(e){var t=e.page,a=e.base,i=Object(l.useState)([]),r=Object(c.a)(i,2),o=r[0],s=r[1];return Object(l.useEffect)(function(){a(t.pageTitle).select({view:"Grid view"}).firstPage(function(e,t){if(e)console.error(e);else{var a=[];t.forEach(function(e){a.push(e.get("InstagramID"))}),s(a)}})},[t.pageTitle]),n.a.createElement("div",{id:"page"},n.a.createElement("div",{id:"scrollContent"},n.a.createElement("div",{style:{display:"flex",alignItems:"center",flexDirection:"column"}},o.map(function(e,t){return n.a.createElement("div",{style:{width:500,maxWidth:"100%",overflow:"hidden",marginBottom:20}},n.a.createElement(P.InstagramEmbed,{url:"https://www.instagram.com/p/".concat(e,"/"),width:"100%"}))}))))};var B=function(e){var t=e.menuItems,a=e.siteTitle;return e.isLoading?n.a.createElement("div",{style:{position:"absolute",top:0,bottom:0,left:0,right:0,zIndex:100,display:"flex",justifyContent:"center",alignItems:"center"}},n.a.createElement("div",{class:"lds-circle"},n.a.createElement("div",null))):n.a.createElement("div",{id:"menuContainer"},n.a.createElement("div",{id:"menu"},n.a.createElement(s.b,{className:"menuOption clickable homeMenuOption",to:"/"},a),t.map(function(e,t){return e.showInMenu?e.isLink?n.a.createElement("a",{className:"menuOption clickable",href:e.menuLink,target:"_blank",key:"menu-".concat(e.pageRoute)},n.a.createElement(n.a.Fragment,null,n.a.createElement("span",{className:"menuOptionTitle"},e.pageTitle),e.pageSubtitle&&n.a.createElement(n.a.Fragment,null,n.a.createElement("br",null),n.a.createElement("span",{className:"menuOptionSubtitle"},e.pageSubtitle)))):n.a.createElement(s.b,{className:"menuOption clickable",to:e.pageRoute,key:"menu-".concat(e.pageRoute)},n.a.createElement(n.a.Fragment,null,n.a.createElement("span",{className:"menuOptionTitle"},e.pageTitle),e.pageSubtitle&&n.a.createElement(n.a.Fragment,null,n.a.createElement("br",null),n.a.createElement("span",{className:"menuOptionSubtitle"},e.pageSubtitle)))):null})))};a(79);var A,G=function(e){var t=e.page,a=e.base,i=Object(l.useState)(""),r=Object(c.a)(i,2),o=r[0],s=r[1],m=Object(l.useState)([]),u=Object(c.a)(m,2),d=u[0],g=u[1];return Object(l.useEffect)(function(){a("About").select({view:"Grid view"}).firstPage(function(e,t){var a,l;e?console.error(e):t.forEach(function(e){l=e.get("Bio Image"),a=e.get("Bio"),s(a),g(l)})})},[t.pageTitle]),n.a.createElement("div",{id:"page"},n.a.createElement("div",{id:"scrollContent"},n.a.createElement("div",{className:"pageModule imageWithTextModule",style:{flexDirection:"row",gap:50,alignItems:"flex-start",justifyContent:"center"}},n.a.createElement("div",{style:{display:"flex",flex:.5,flexDirection:"column",width:"100%",alignItems:"center",justifyContent:"center"}},n.a.createElement("img",{alt:"studio portrait",className:"workImage",style:{width:"70%",maxHeight:400,height:"auto"},src:d[0]?d[0].url:""})),n.a.createElement("div",{className:"imageWithTextModuleText",style:{display:"flex",fontSize:18,flex:1,flexDirection:"column"}},o&&n.a.createElement("div",{className:"workText",style:{whiteSpace:"pre-wrap"}},o,n.a.createElement("div",null,n.a.createElement("a",{target:"_blank",rel:"noreferrer",href:"https://www.instagram.com/sammytthebrave/"},"@sammytthebrave")),n.a.createElement("div",null,n.a.createElement("a",{target:"_blank",rel:"noreferrer",href:"https://airtable.com/shr1xUUOkb0Gcs3Uv"},"Join my mailing list")))))))};function z(){var e=Object(l.useState)("Sam Ticknor"),t=Object(c.a)(e,2),i=t[0],r=t[1],g=Object(l.useState)("\ud83d\udd05"),h=Object(c.a)(g,2),v=h[0],E=h[1],T=Object(l.useState)([]),w=Object(c.a)(T,2),x=(w[0],w[1],Object(l.useState)([])),b=Object(c.a)(x,2),y=b[0],k=b[1],j=Object(l.useState)(!0),I=Object(c.a)(j,2),O=I[0],W=I[1],M=Object(l.useState)(""),N=Object(c.a)(M,2),S=N[0],C=(N[1],a(80));C.configure({endpointUrl:"https://api.airtable.com",apiKey:"keyCVfnd8GGLw029l"});var R=C.base("appf9UorVjkfwZqAo");Object(l.useEffect)(function(){R("About").select({view:"Grid view"}).firstPage(function(e,t){var a,l;e?console.error(e):(t.forEach(function(e){a=e.get("Site Title"),l=e.get("Emoji Favicon")}),r(a),E(l))}),R("Index").select({view:"Grid view"}).firstPage(function(e,t){if(e)console.error(e);else{var a=[];t.forEach(function(e){var t=e.get("Page Title"),l=e.get("Page Subtitle"),n=t.replaceAll(" ","-").toLowerCase(),i=e.get("Price List"),r=e.get("Instagram"),o=e.get("About Page"),c=e.get("Show In Menu"),s=e.get("Link"),m=""!=s;if(i){var u={pageTitle:t,pageSubtitle:l,pageRoute:n,pageIsPriceList:i,showInMenu:c};a.push(u)}else if(o){var d={pageTitle:t,pageSubtitle:l,pageRoute:n,pageIsAboutPage:o,showInMenu:c};a.push(d)}else r?a.push({pageTitle:t,pageSubtitle:l,pageRoute:n,pageIsInstagramEmbed:r,showInMenu:c}):m?a.push({pageTitle:t,pageSubtitle:l,pageRoute:n,isLink:m,menuLink:s,showInMenu:c}):a.push({pageTitle:t,pageSubtitle:l,pageRoute:n,showInMenu:c})}),k(a),W(!1)}})},[]);var P=Object(u.a)(A||(A=Object(o.a)(["\n    body {\n      ","\n    }\n  "])),function(e){return e.globalCss});return console.log(y),n.a.createElement(s.a,{basename:"/",key:window.location.pathname},n.a.createElement(d.a,null,n.a.createElement("title",null,i),n.a.createElement("link",{rel:"icon",href:"data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>".concat(v,"</text></svg>"),sizes:"16x16"})),n.a.createElement(P,{globalCss:S}),n.a.createElement(B,{siteTitle:i,menuItems:y,isLoading:O}),n.a.createElement(m.c,{key:window.location.pathname},y.map(function(e){return e.pageIsAboutPage?n.a.createElement(m.a,{key:"".concat(e.pageRoute),path:"".concat(e.pageRoute),element:n.a.createElement(G,{base:R,page:e})}):e.pageIsPriceList?n.a.createElement(m.a,{key:"".concat(e.pageRoute),path:"".concat(e.pageRoute),element:n.a.createElement(L,{base:R,page:e})}):e.pageIsInstagramEmbed?n.a.createElement(m.a,{key:"".concat(e.pageRoute),path:"".concat(e.pageRoute),element:n.a.createElement(F,{base:R,page:e})}):(console.log(e.pageRoute),n.a.createElement(m.a,{key:"".concat(e.pageRoute),path:"".concat(e.pageRoute),element:n.a.createElement(D,{base:R,page:e})}))}),n.a.createElement(m.a,{path:"/",element:n.a.createElement(f,{splashImages:p.a})})))}var H=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,85)).then(function(t){var a=t.getCLS,l=t.getFID,n=t.getFCP,i=t.getLCP,r=t.getTTFB;a(e),l(e),n(e),i(e),r(e)})};r.a.render(n.a.createElement(n.a.StrictMode,null,n.a.createElement(z,null)),document.getElementById("root")),H()}},[[44,1,2]]]);