/**handles:convertkit-admin-quicktags,et-jquery-visible-viewport,et-core-common**/
for(let t in convertkit_quicktags)convertKitQuickTagRegister(convertkit_quicktags[t]);function convertKitQuickTagRegister(o){QTags.addButton("convertkit-"+o.name,o.title,function(){fetch(convertkit_admin_tinymce.ajaxurl+"/"+o.name+"/quicktags",{method:"GET",headers:{"X-WP-Nonce":convertkit_admin_tinymce.nonce}}).then(function(t){return t.json()}).then(function(t){convertKitQuickTagsModal.open();var e=document.querySelector("div.convertkit-quicktags-modal div.media-modal.wp-core-ui"),i=e.querySelector("div.media-frame-title"),n=e.querySelector("div.media-frame-toolbar div.media-toolbar");e.style.width=o.modal.width+"px",e.style.height=o.modal.height+i.offsetHeight+n.offsetHeight+"px",document.querySelector("#convertkit-quicktags-modal .media-frame-title h1").textContent=o.title,document.querySelector("#convertkit-quicktags-modal .media-frame-content").innerHTML=t,convertKitTabsInit(),convertKitColorInputInit(),convertKitConditionallyDisplayTinyMCEModalFields(),convertKitConditionalFieldsInit(),convertKitRefreshResourcesInitEventListeners()}).catch(function(t){console.error(t)})})}
/*
Copyright (c) 2012 Digital Fusion, http://teamdf.com/

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
!function(t){var i=t(window);t.fn.visible=function(t,e,o){if(!(this.length<1)){var r=this.length>1?this.eq(0):this,n=r.get(0),f=i.width(),h=i.height(),o=o?o:"both",l=e===!0?n.offsetWidth*n.offsetHeight:!0;if("function"==typeof n.getBoundingClientRect){var g=n.getBoundingClientRect(),u=g.top>=0&&g.top<h,s=g.bottom>0&&g.bottom<=h,c=g.left>=0&&g.left<f,a=g.right>0&&g.right<=f,v=t?u||s:u&&s,b=t?c||a:c&&a;if("both"===o)return l&&v&&b;if("vertical"===o)return l&&v;if("horizontal"===o)return l&&b}else{var d=i.scrollTop(),p=d+h,w=i.scrollLeft(),m=w+f,y=r.offset(),z=y.top,B=z+r.height(),C=y.left,R=C+r.width(),j=t===!0?B:z,q=t===!0?z:B,H=t===!0?R:C,L=t===!0?C:R;if("both"===o)return!!l&&p>=q&&j>=d&&m>=L&&H>=w;if("vertical"===o)return!!l&&p>=q&&j>=d;if("horizontal"===o)return!!l&&m>=L&&H>=w}}}}(jQuery);

(t=>{t(function(){var e=navigator.userAgent,a,i=e.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))/i)||[],o="",r="";switch(/trident/i.test(i[0])?o="ie":"Chrome"===i[0]&&null!==(a=e.match(/\b(OPR|Edge)/))&&(o=a[0].replace("OPR","opera")),o=(o=""===o?"standalone"in window.navigator&&!window.navigator.standalone?"uiwebview":i[0]&&""!==i[0]?i[0]:navigator.appName:o).toLowerCase()){case"msie":r="ie";break;case"firefox":r="gecko";break;default:r=o}e.match(/iPhone/)&&(r+=" iphone"),t("body").addClass(r)})})(jQuery);