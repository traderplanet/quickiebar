function QuickieBar(){var e=jQuery,t=this;t.previewingOnAdminPage=!1;t.preventHidingWithCloseButton=!1;t.options={bar_uuid:0,bar_height:"regular",new_tab:"enabled",placement:"top",devices:"all",attribution:"hidden",alignment:"leftright",sticky:"enabled",animation:"slidein",button_style:"rounded",close_button_visibility:"onhover",color_bar_background:"#56C4C3",color_bar_text:"#FFFFFF",color_button_background:"#062332",color_button_text:"#FFFFFF",bar_text:"Get the most powerful conversion dropdown for Wordpress {{arrow-right}}",button_text:"FREE DOWNLOAD {{download}}",destination:"http://quickiebar.com",fixed_compatibility:"off"};t.init=function(n){n&&e.each(n,function(e,n){t.options[e]=n})};t.initAndShowBar=function(e,n){if(n){t.previewingOnAdminPage=!0;t.preventHidingWithCloseButton=!0}t.init(e);t.createBar();t.bindEventsToBar();t.show()};t.prepareBarOrButtonText=function(t,n){if(!t||t=="")return"";n&&e("body").width()<900&&(t=t.replace(/{{(.*?)(-right)(.*?)}}/g,""));return t.replace(/{{(.*?)}}/g,'&nbsp;<i class="fa fa-$1"></i>&nbsp;')};t.getQuickieBarTopLevelClasses=function(){var e="";e+="qb-bar_height-"+t.options.bar_height+" ";e+="qb-sticky-"+(t.options.fixed_compatibility=="on"?"enabled":t.options.sticky)+" ";e+="qb-placement-"+t.options.placement+" ";e+="qb-attribution-"+t.options.attribution+" ";e+="qb-alignment-"+t.options.alignment+" ";e+="qb-button_style-"+t.options.button_style+" ";e+="qb-close_button_visibility-"+t.options.close_button_visibility+" ";t.previewingOnAdminPage&&(e+="qb-admin-preview ");return e};t.craftHtml=function(){var e=t.options.bar_text?t.prepareBarOrButtonText(t.options.bar_text,!0):t.prepareBarOrButtonText("Bar Text goes here {{long-arrow-right}}",!0),n=t.options.button_text?t.prepareBarOrButtonText(t.options.button_text):"BUTTON TEXT";$qbHtml="";$qbHtml+='<div id="quickiebar" class="qb '+t.getQuickieBarTopLevelClasses()+'" style="background:'+t.options.color_bar_background+';">';$qbHtml+='<div class="hover-background-overlay"></div>';$qbHtml+='<a href="http://quickiebar.com/" target="_blank"><div class="qb-attribution '+(GetLuminance(t.options.color_bar_background)>200?"qb-attribution-dark":"")+'"></div></a>';$qbHtml+='<div class="wrap">';$qbHtml+='<div class="qb-wrap">';$qbHtml+='<span class="bar-text" style="color:'+t.options.color_bar_text+';">'+e+"</span>";$qbHtml+='<span class="bar-button" style="color:'+t.options.color_button_text+";background:"+t.options.color_button_background+";border-color:"+t.options.color_button_text+';">'+n+"</span>";$qbHtml+="</div>";$qbHtml+="</div>";$qbHtml+='<div class="qb-close-button '+(GetLuminance(t.options.color_bar_background)>200?"qb-close-button-dark":"")+'"><i class="fa fa-times-circle-o"></i></div>';$qbHtml+='<a href="'+t.options.destination+'" '+(t.options.new_tab=="enabled"?'target="_blank"':"")+' class="link-overlay"></a>';$qbHtml+='<div class="qb-close-bar"><i class="fa fa-chevron-up"></i></div>';$qbHtml+="</div>";return $qbHtml};t.createBar=function(){$page=t.getPage();$page.before(t.craftHtml())};t.hideAndDestroyBar=function(){t.hide(0,function(){e("#quickiebar.qb").remove()})};t.bindEventsToBar=function(){e("#quickiebar.qb").on("mouseover",function(){e(".qb-attribution").stop().addClass("visible");e(".qb-close-button").stop().addClass("visible")}).on("mouseout",function(){e(".qb-attribution").stop().removeClass("visible");e(".qb-close-button").stop().removeClass("visible")});e(".qb-close-bar,.qb-close-button").click(function(){if(t.preventHidingWithCloseButton)return;t.hide()});e("#quickiebar.qb").click(function(){t.trackConversion()})};t.getPage=function(){return t.previewingOnAdminPage?e("html > body"):e("html > body")};t.getFixedHeader=function(){return e("#masthead")?e("#masthead"):e("header")?e("header"):e(".site-header")?e(".site-header").first():!1};t.show=function(){$page=t.getPage();$qbHeight=e("#quickiebar").height();$slideIn=t.options.animation==="slidein";if((t.options.fixed_compatibility=="on"||t.options.sticky=="enabled"||t.options.placement=="bottom"||t.previewingOnAdminPage)&&e("body").width()>900)if(t.options.placement=="top"){if($slideIn)$page.addClass("qb-disable-animation").animate({"padding-top":$qbHeight},300,"swing",function(){$page.removeClass("qb-disable-animation")});else{$page.addClass("qb-disable-animation");$page.css("padding-top",$qbHeight);setTimeout(function(){$page.removeClass("qb-disable-animation")},20)}if(t.options.fixed_compatibility=="on"){$fixedHeader=t.getFixedHeader();$fixedHeader&&($slideIn?$fixedHeader.animate({"margin-top":$qbHeight},300,"swing"):$fixedHeader.css("margin-top",$qbHeight))}}else t.options.placement==="bottom"&&$page.css("margin-bottom",$qbHeight);$slideIn?e("#quickiebar").stop().slideDown(300):e("#quickiebar").stop().show()};t.hide=function(n,r){typeof n=="undefined"&&(n=200);t.previewingOnAdminPage;$page=t.getPage();$page.addClass("qb-disable-animation").animate({"padding-top":0,"margin-bottom":0},n,"swing",function(){$page.removeClass("qb-disable-animation")});e("#quickiebar").stop().slideUp(n,function(){typeof r=="function"&&r()});if(t.options.fixed_compatibility=="on"&&t.options.placement=="top"){$fixedHeader=t.getFixedHeader();$fixedHeader&&($slideIn?$fixedHeader.animate({"margin-top":0},300,"swing"):$fixedHeader.css("margin-top",0))}};t.fetchBar=function(t){e.ajax({type:"POST",url:ajaxurl,data:{action:"qb_public_ajax",endpoint:"get_bar",qb_public_nonce:QB_GLOBALS.QB_PUBLIC_NONCE},success:function(e){t(e)},dataType:"json"})};t.getUserUuid=function(){var e=QBGetCookie("qb_user_uuid");if(!e){e=QBGenerateUuid();QBSetCookie("qb_user_uuid",e,7)}return e};t.getBarViews=function(){var e=QBGetCookie("qb_bar_views"),t;if(!e){t=[];QBSetCookie("qb_bar_views",JSON.stringify(t),7)}else t=JSON.parse(QBGetCookie("qb_bar_views"));return t};t.getBarConversions=function(){var e=QBGetCookie("qb_bar_conversions"),t;if(!e){t=[];QBSetCookie("qb_bar_conversions",JSON.stringify(t),7)}else t=JSON.parse(QBGetCookie("qb_bar_conversions"));return t};t.resetAllTracking=function(){QBDeleteCookie("qb_user_uuid");QBDeleteCookie("qb_bar_views");QBDeleteCookie("qb_bar_conversions")};t.trackView=function(){var n=t.options.bar_uuid,r=t.getBarViews();if(n==0)return;r.indexOf(n)<0&&e.ajax({type:"POST",url:ajaxurl,data:{action:"qb_public_ajax",endpoint:"save_view",user_uuid:t.getUserUuid(),bar_uuid:n,qb_public_nonce:QB_GLOBALS.QB_PUBLIC_NONCE},success:function(){r.push(n);QBSetCookie("qb_bar_views",JSON.stringify(r),7)},dataType:"json"})};t.trackConversion=function(){var n=t.options.bar_uuid,r=t.getBarConversions();if(n==0)return;r.indexOf(n)<0&&e.ajax({type:"POST",url:ajaxurl,data:{action:"qb_public_ajax",endpoint:"save_conversion",user_uuid:t.getUserUuid(),bar_uuid:n,qb_public_nonce:QB_GLOBALS.QB_PUBLIC_NONCE},success:function(){r.push(n);QBSetCookie("qb_bar_conversions",JSON.stringify(r),7)},dataType:"json"})}}function QBSetCookie(e,t,n){var r=new Date;r.setTime(r.getTime()+n*24*60*60*1e3);var i="expires="+r.toUTCString();document.cookie=e+"="+t+"; "+i+"; path=/"}function QBGetCookie(e){e+="=";var t=document.cookie.split(";");for(var n=0;n<t.length;n++){var r=t[n];while(r.charAt(0)==" ")r=r.substring(1);if(r.indexOf(e)==0)return r.substring(e.length,r.length)}return!1}function QBDeleteCookie(e){QBGetCookie(e)&&QBSetCookie(e,"",-1)}function QBGenerateUuid(){var e=[],t="0123456789abcdef";for(var n=0;n<13;n++)e[n]=t.substr(Math.floor(Math.random()*16),1);return e.join("")}function ColorLuminance(e,t){e=String(e).replace(/[^0-9a-f]/gi,"");e.length<6&&(e=e[0]+e[0]+e[1]+e[1]+e[2]+e[2]);t=t||0;var n="#",r,i;for(i=0;i<3;i++){r=parseInt(e.substr(i*2,2),16);r=Math.round(Math.min(Math.max(0,r+r*t),255)).toString(16);n+=("00"+r).substr(r.length)}return n}function GetLuminance(e){var t=e.substring(1),n=parseInt(t,16),r=n>>16&255,i=n>>8&255,s=n>>0&255,o=.2126*r+.7152*i+.0722*s;return o}jQuery(document).ready(function(e){if(location.hash.indexOf("qbhide")>-1||location.href.indexOf("wp-admin/admin.php")>-1)return;qb=new QuickieBar;qb.fetchBar(function(t){if(!t)return;if(t.debug_mode=="on"&&location.hash.indexOf("qbshow")==-1)return;if(t.fixed_compatibility=="on"&&e("body").width()<900)return;qb.initAndShowBar(t);qb.trackView()})});