function MarkerClusterer(e,t,r,s,o,i,a){this.extend(MarkerClusterer,google.maps.OverlayView),this.map_=e,this.markers_=[],this.markerContents_=[],this.showingMarker_=o,this.locale=i||"en",this.infowindow_=s,this.clusters_=[],this.sizes=[53,56,66,78,90],this.styles_=[],this.ready_=!1;var n=a||{};this.gridSize_=n.gridSize||60,this.minClusterSize_=n.minimumClusterSize||2,this.maxZoom_=n.maxZoom||null,this.styles_=n.styles||[],this.imagePath_=n.imagePath||this.MARKER_CLUSTER_IMAGE_PATH_,this.imageExtension_=n.imageExtension||this.MARKER_CLUSTER_IMAGE_EXTENSION_,this.zoomOnClick_=!0,void 0!=n.zoomOnClick&&(this.zoomOnClick_=n.zoomOnClick),this.averageCenter_=!1,void 0!=n.averageCenter&&(this.averageCenter_=n.averageCenter),this.setupStyles_(),this.setMap(e),this.prevZoom_=this.map_.getZoom();var l=this;google.maps.event.addListener(this.map_,"zoom_changed",function(){var e=l.map_.mapTypes[l.map_.getMapTypeId()].maxZoom,t=l.map_.getZoom();0>t||t>e||l.prevZoom_!=t&&(l.prevZoom_=l.map_.getZoom(),l.resetViewport())}),google.maps.event.addListener(this.map_,"idle",function(){l.redraw()}),t&&t.length&&this.addMarkers(t,r,!1)}function Cluster(e){this.markerClusterer_=e,this.map_=e.getMap(),this.gridSize_=e.getGridSize(),this.minClusterSize_=e.getMinClusterSize(),this.averageCenter_=e.isAverageCenter(),this.center_=null,this.markers_=[],this.markerIndex_=[],this.bounds_=null,this.clusterIcon_=new ClusterIcon(this,e.getStyles(),e.getGridSize())}function ClusterIcon(e,t,r){e.getMarkerClusterer().extend(ClusterIcon,google.maps.OverlayView),this.styles_=t,this.padding_=r||0,this.cluster_=e,this.center_=null,this.map_=e.getMap(),this.div_=null,this.sums_=null,this.visible_=!1,this.showingInfo_=!1,this.setMap(this.map_);var s=this;google.maps.event.addListener(this.map_,"mousedown",function(){s.showingInfo_&&(s.cluster_.markerClusterer_.infowindow_.close(),s.cluster_.markerClusterer_.showingMarker_="",s.showingInfo_=!1)})}MarkerClusterer.prototype.MARKER_CLUSTER_IMAGE_PATH_="//google-maps-utility-library-v3.googlecode.com/svn/trunk/markerclusterer/images/m1",MarkerClusterer.prototype.MARKER_CLUSTER_IMAGE_EXTENSION_="png",MarkerClusterer.prototype.extend=function(e,t){return function(e){for(var t in e.prototype)this.prototype[t]=e.prototype[t];return this}.apply(e,[t])},MarkerClusterer.prototype.onAdd=function(){this.setReady_(!0)},MarkerClusterer.prototype.draw=function(){},MarkerClusterer.prototype.setupStyles_=function(){if(!this.styles_.length)for(var e,t=0;e=this.sizes[t];t++)this.styles_.push({url:this.imagePath_+"."+this.imageExtension_,width:53,height:52})},MarkerClusterer.prototype.fitMapToMarkers=function(){for(var e,t=this.getMarkers(),r=new google.maps.LatLngBounds,s=0;e=t[s];s++)r.extend(e.getPosition());this.map_.fitBounds(r)},MarkerClusterer.prototype.setStyles=function(e){this.styles_=e},MarkerClusterer.prototype.getStyles=function(){return this.styles_},MarkerClusterer.prototype.isZoomOnClick=function(){return this.zoomOnClick_},MarkerClusterer.prototype.isAverageCenter=function(){return this.averageCenter_},MarkerClusterer.prototype.getMarkers=function(){return this.markers_},MarkerClusterer.prototype.getTotalMarkers=function(){return this.markers_.length},MarkerClusterer.prototype.setMaxZoom=function(e){this.maxZoom_=e},MarkerClusterer.prototype.getMaxZoom=function(){return this.maxZoom_||this.map_.mapTypes[this.map_.getMapTypeId()].maxZoom},MarkerClusterer.prototype.calculator_=function(e,t){for(var r=0,s=e.length,o=s;0!==o;)o=parseInt(o/10,10),r++;return r=Math.min(r,t),{text:s,index:r}},MarkerClusterer.prototype.setCalculator=function(e){this.calculator_=e},MarkerClusterer.prototype.getCalculator=function(){return this.calculator_},MarkerClusterer.prototype.addMarkers=function(e,t,r){for(var s,o=0;s=e[o];o++)this.pushMarkerTo_(s,t[o]);r||this.redraw()},MarkerClusterer.prototype.pushMarkerTo_=function(e,t){if(e.isAdded=!1,e.draggable){var r=this;google.maps.event.addListener(e,"dragend",function(){e.isAdded=!1,r.repaint()})}this.markers_.push(e),this.markerContents_.push(t)},MarkerClusterer.prototype.addMarker=function(e,t){this.pushMarkerTo_(e),t||this.redraw()},MarkerClusterer.prototype.removeMarker_=function(e){var t=-1;if(this.markers_.indexOf)t=this.markers_.indexOf(e);else for(var r,s=0;r=this.markers_[s];s++)if(r==e){t=s;break}return-1==t?!1:(this.markers_.splice(t,1),this.markerContents_.splice(t,1),!0)},MarkerClusterer.prototype.removeMarker=function(e,t){var r=this.removeMarker_(e);return!t&&r?(this.resetViewport(),this.redraw(),!0):!1},MarkerClusterer.prototype.removeMarkers=function(e,t){for(var r,s=!1,o=0;r=e[o];o++){var i=this.removeMarker_(r);s=s||i}return!t&&s?(this.resetViewport(),this.redraw(),!0):void 0},MarkerClusterer.prototype.setReady_=function(e){this.ready_||(this.ready_=e,this.createClusters_())},MarkerClusterer.prototype.getTotalClusters=function(){return this.clusters_.length},MarkerClusterer.prototype.getMap=function(){return this.map_},MarkerClusterer.prototype.setMap=function(e){this.map_=e},MarkerClusterer.prototype.getGridSize=function(){return this.gridSize_},MarkerClusterer.prototype.setGridSize=function(e){this.gridSize_=e},MarkerClusterer.prototype.getMinClusterSize=function(){return this.minClusterSize_},MarkerClusterer.prototype.setMinClusterSize=function(e){this.minClusterSize_=e},MarkerClusterer.prototype.getExtendedBounds=function(e){var t=this.getProjection(),r=new google.maps.LatLng(e.getNorthEast().lat(),e.getNorthEast().lng()),s=new google.maps.LatLng(e.getSouthWest().lat(),e.getSouthWest().lng()),o=t.fromLatLngToDivPixel(r);o.x+=this.gridSize_,o.y-=this.gridSize_;var i=t.fromLatLngToDivPixel(s);i.x-=this.gridSize_,i.y+=this.gridSize_;var a=t.fromDivPixelToLatLng(o),n=t.fromDivPixelToLatLng(i);return e.extend(a),e.extend(n),e},MarkerClusterer.prototype.isMarkerInBounds_=function(e,t){return t.contains(e.getPosition())},MarkerClusterer.prototype.clearMarkers=function(){this.resetViewport(!0),this.markers_=[],this.markerContents_=[]},MarkerClusterer.prototype.resetViewport=function(e){for(var t,r=0;t=this.clusters_[r];r++)t.remove();for(var s,r=0;s=this.markers_[r];r++)s.isAdded=!1,e&&s.setMap(null);this.clusters_=[]},MarkerClusterer.prototype.repaint=function(){var e=this.clusters_.slice();this.clusters_.length=0,this.resetViewport(),this.redraw(),window.setTimeout(function(){for(var t,r=0;t=e[r];r++)t.remove()},0)},MarkerClusterer.prototype.redraw=function(){this.createClusters_()},MarkerClusterer.prototype.distanceBetweenPoints_=function(e,t){if(!e||!t)return 0;var r=6371,s=(t.lat()-e.lat())*Math.PI/180,o=(t.lng()-e.lng())*Math.PI/180,i=Math.sin(s/2)*Math.sin(s/2)+Math.cos(e.lat()*Math.PI/180)*Math.cos(t.lat()*Math.PI/180)*Math.sin(o/2)*Math.sin(o/2),a=2*Math.atan2(Math.sqrt(i),Math.sqrt(1-i)),n=r*a;return n},MarkerClusterer.prototype.addToClosestCluster_=function(e,t){for(var r,s=4e4,o=null,i=(e.getPosition(),0);r=this.clusters_[i];i++){var a=r.getCenter();if(a){var n=this.distanceBetweenPoints_(a,e.getPosition());s>n&&(s=n,o=r)}}if(o&&o.isMarkerInClusterBounds(e))o.addMarker(e,t);else{var r=new Cluster(this);r.addMarker(e,t),this.clusters_.push(r)}},MarkerClusterer.prototype.createClusters_=function(){if(this.ready_)for(var e,t=new google.maps.LatLngBounds(this.map_.getBounds().getSouthWest(),this.map_.getBounds().getNorthEast()),r=this.getExtendedBounds(t),s=0;e=this.markers_[s];s++)!e.isAdded&&this.isMarkerInBounds_(e,r)&&showingMarker!=e.getTitle()&&this.addToClosestCluster_(e,s)},Cluster.prototype.isMarkerAlreadyAdded=function(e){if(this.markers_.indexOf)return-1!=this.markers_.indexOf(e);for(var t,r=0;t=this.markers_[r];r++)if(t==e)return!0;return!1},Cluster.prototype.addMarker=function(e,t){if(this.isMarkerAlreadyAdded(e))return!1;if(this.center_){if(this.averageCenter_){var r=this.markers_.length+1,s=(this.center_.lat()*(r-1)+e.getPosition().lat())/r,o=(this.center_.lng()*(r-1)+e.getPosition().lng())/r;this.center_=new google.maps.LatLng(s,o),this.calculateBounds_()}}else this.center_=e.getPosition(),this.calculateBounds_();e.isAdded=!0,this.markers_.push(e),this.markerIndex_.push(t);var i=this.markers_.length;if(i<this.minClusterSize_&&e.getMap()!=this.map_&&(e.setMap(this.map_),e.get("label").setMap(this.map_)),i==this.minClusterSize_)for(var a=0;i>a;a++)this.markers_[a].get("label").setMap(null),this.markers_[a].setMap(null);return i>=this.minClusterSize_&&(e.setMap(null),e.get("label").setMap(null)),this.updateIcon(),!0},Cluster.prototype.getMarkerClusterer=function(){return this.markerClusterer_},Cluster.prototype.getBounds=function(){for(var e,t=new google.maps.LatLngBounds(this.center_,this.center_),r=this.getMarkers(),s=0;e=r[s];s++)t.extend(e.getPosition());return t},Cluster.prototype.remove=function(){this.clusterIcon_.remove(),this.markers_.length=0,delete this.markers_,delete this.markerIndex_},Cluster.prototype.getSize=function(){return this.markers_.length},Cluster.prototype.getMarkers=function(){return this.markers_},Cluster.prototype.getCenter=function(){return this.center_},Cluster.prototype.calculateBounds_=function(){var e=new google.maps.LatLngBounds(this.center_,this.center_);this.bounds_=this.markerClusterer_.getExtendedBounds(e)},Cluster.prototype.isMarkerInClusterBounds=function(e){return this.bounds_.contains(e.getPosition())},Cluster.prototype.getMap=function(){return this.map_},Cluster.prototype.updateIcon=function(){var e=this.map_.getZoom(),t=this.markerClusterer_.getMaxZoom();if(e>t)for(var r,s=0;r=this.markers_[s];s++)r.setMap(this.map_);else{if(this.markers_.length<this.minClusterSize_)return void this.clusterIcon_.hide();var o=this.markerClusterer_.getStyles().length,i=this.markerClusterer_.getCalculator()(this.markers_,o);this.clusterIcon_.setCenter(this.center_),this.clusterIcon_.setSums(i),this.clusterIcon_.show()}},ClusterIcon.prototype.triggerClusterClick=function(){var e=this.cluster_.getMarkerClusterer(),t=e.locale||"en";google.maps.event.trigger(e,"clusterclick",this.cluster_);for(var r,s=!0,o=this.cluster_.getMarkers(),i=o[0].getPosition(),a=1;r=o[a];a++)r.getPosition().equals(i)||(s=!1);if(s)if(this.showingInfo_)this.cluster_.markerClusterer_.infowindow_.close(),this.cluster_.markerClusterer_.showingMarker_="",this.showingInfo_=!1;else{this.cluster_.markerClusterer_.showingMarker_=o[0].getTitle(),this.showingInfo_=!0;var n="<div id='map_bubble'><img class='bubble-loader-gif' src='https://s3.amazonaws.com/sharetribe/assets/ajax-loader-grey.gif'></div>";this.cluster_.markerClusterer_.infowindow_.setContent(n);for(var r,l=[],a=0;r=o[a];a++)l.push(this.cluster_.markerClusterer_.markerContents_[this.cluster_.markerIndex_[a]]);$.get("/"+t+"/listing_bubble_multiple/"+l.join(","),function(e){function t(e,t,r,s){e>0?r.removeClass("disabled"):r.addClass("disabled"),t-1>e?s.removeClass("disabled"):s.addClass("disabled")}function r(e){_.text(e+1)}function s(e,t,r){r.css({left:-1*e*t+"px"})}function i(e,o,i,a,n){return function(l){t(l,e,i,a),s(l,o,n),r(l)}}$("#map_bubble").html(e);var a=0,n=o.length,u=$(".bubble-navi-left"),h=$(".bubble-navi-right"),p=$(".bubble-multi-content"),_=$(".buble-navi-selected-item"),d=$(".buble-navi-total-items");d.text(l.length);var c=200;p.width(c*n);var g=i(n,c,u,h,p);u.on("click",function(){var e=0;a=Math.max(a-1,e),g(a)}),h.on("click",function(){var e=n-1;a=Math.min(a+1,e),g(a)}),g(a,n,c,u,h,p)}),this.cluster_.markerClusterer_.infowindow_.setMaxHeight(180),this.cluster_.markerClusterer_.infowindow_.setMinHeight(180),this.cluster_.markerClusterer_.infowindow_.open(this.map_,o[0])}else if(e.isZoomOnClick()){var u=this.map_.getZoom();this.map_.fitBounds(this.cluster_.getBounds()),this.map_.getZoom()-u>2&&this.map_.setZoom(u+2)}},ClusterIcon.prototype.onAdd=function(){if(this.div_=document.createElement("DIV"),this.visible_){var e=this.getPosFromLatLng_(this.center_);this.div_.style.cssText=this.createCss(e),this.div_.innerHTML=this.sums_.text}var t=this.getPanes();t.overlayMouseTarget.appendChild(this.div_);var r=this;google.maps.event.addDomListener(this.div_,"click",function(){r.triggerClusterClick()})},ClusterIcon.prototype.getPosFromLatLng_=function(e){var t=this.getProjection().fromLatLngToDivPixel(e);return t.x-=parseInt(this.width_/2,10),t.y-=parseInt(this.height_/2,10),t},ClusterIcon.prototype.draw=function(){if(this.visible_){var e=this.getPosFromLatLng_(this.center_);this.div_.style.top=e.y+"px",this.div_.style.left=e.x+"px"}},ClusterIcon.prototype.hide=function(){this.div_&&(this.div_.style.display="none"),this.visible_=!1},ClusterIcon.prototype.show=function(){if(this.div_){var e=this.getPosFromLatLng_(this.center_);this.div_.style.cssText=this.createCss(e),this.div_.style.display=""}this.visible_=!0},ClusterIcon.prototype.remove=function(){this.setMap(null)},ClusterIcon.prototype.onRemove=function(){this.div_&&this.div_.parentNode&&(this.hide(),this.div_.parentNode.removeChild(this.div_),this.div_=null)},ClusterIcon.prototype.setSums=function(e){this.sums_=e,this.text_=e.text,this.index_=e.index,this.div_&&(this.div_.innerHTML=e.text),this.useStyle()},ClusterIcon.prototype.useStyle=function(){var e=Math.max(0,this.sums_.index-1);e=Math.min(this.styles_.length-1,e);var t=this.styles_[e];this.url_=t.url,this.height_=t.height,this.width_=t.width,this.textColor_=t.textColor,this.anchor_=t.anchor,this.textSize_=t.textSize,this.backgroundPosition_=t.backgroundPosition},ClusterIcon.prototype.setCenter=function(e){this.center_=e},ClusterIcon.prototype.createCss=function(e){var t=[];t.push("background-image:url("+this.url_+");");var r=this.backgroundPosition_?this.backgroundPosition_:"0 0";t.push("background-position:"+r+";"),"object"==typeof this.anchor_?(t.push("number"==typeof this.anchor_[0]&&this.anchor_[0]>0&&this.anchor_[0]<this.height_?"height:"+(this.height_-this.anchor_[0])+"px; padding-top:"+this.anchor_[0]+"px;":"height:"+this.height_+"px; line-height:"+this.height_+"px;"),t.push("number"==typeof this.anchor_[1]&&this.anchor_[1]>0&&this.anchor_[1]<this.width_?"width:"+(this.width_-this.anchor_[1])+"px; padding-left:"+this.anchor_[1]+"px;":"width:"+this.width_+"px; text-align:center;")):t.push("height:"+this.height_+"px; line-height:"+this.height_+"px; width:"+this.width_+"px; text-align:center;");var s=this.textColor_?this.textColor_:"white",o=this.textSize_?this.textSize_:11;return t.push("cursor:pointer; top:"+e.y+"px; left:"+e.x+"px; color:"+s+"; position:absolute; font-size:"+o+"px; font-family:Arial,sans-serif; font-weight:bold"),t.join("")},window.MarkerClusterer=MarkerClusterer,MarkerClusterer.prototype.addMarker=MarkerClusterer.prototype.addMarker,MarkerClusterer.prototype.addMarkers=MarkerClusterer.prototype.addMarkers,MarkerClusterer.prototype.clearMarkers=MarkerClusterer.prototype.clearMarkers,MarkerClusterer.prototype.fitMapToMarkers=MarkerClusterer.prototype.fitMapToMarkers,MarkerClusterer.prototype.getCalculator=MarkerClusterer.prototype.getCalculator,MarkerClusterer.prototype.getGridSize=MarkerClusterer.prototype.getGridSize,MarkerClusterer.prototype.getExtendedBounds=MarkerClusterer.prototype.getExtendedBounds,MarkerClusterer.prototype.getMap=MarkerClusterer.prototype.getMap,MarkerClusterer.prototype.getMarkers=MarkerClusterer.prototype.getMarkers,MarkerClusterer.prototype.getMaxZoom=MarkerClusterer.prototype.getMaxZoom,MarkerClusterer.prototype.getStyles=MarkerClusterer.prototype.getStyles,MarkerClusterer.prototype.getTotalClusters=MarkerClusterer.prototype.getTotalClusters,MarkerClusterer.prototype.getTotalMarkers=MarkerClusterer.prototype.getTotalMarkers,MarkerClusterer.prototype.redraw=MarkerClusterer.prototype.redraw,MarkerClusterer.prototype.removeMarker=MarkerClusterer.prototype.removeMarker,MarkerClusterer.prototype.removeMarkers=MarkerClusterer.prototype.removeMarkers,MarkerClusterer.prototype.resetViewport=MarkerClusterer.prototype.resetViewport,MarkerClusterer.prototype.repaint=MarkerClusterer.prototype.repaint,MarkerClusterer.prototype.setCalculator=MarkerClusterer.prototype.setCalculator,MarkerClusterer.prototype.setGridSize=MarkerClusterer.prototype.setGridSize,MarkerClusterer.prototype.setMaxZoom=MarkerClusterer.prototype.setMaxZoom,MarkerClusterer.prototype.onAdd=MarkerClusterer.prototype.onAdd,MarkerClusterer.prototype.draw=MarkerClusterer.prototype.draw,Cluster.prototype.getCenter=Cluster.prototype.getCenter,Cluster.prototype.getSize=Cluster.prototype.getSize,Cluster.prototype.getMarkers=Cluster.prototype.getMarkers,ClusterIcon.prototype.onAdd=ClusterIcon.prototype.onAdd,ClusterIcon.prototype.draw=ClusterIcon.prototype.draw,ClusterIcon.prototype.onRemove=ClusterIcon.prototype.onRemove;