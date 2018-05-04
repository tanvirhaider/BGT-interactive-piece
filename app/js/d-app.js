
// @codekit-prepend "d-data.js"

/*
  Willow Studios Inc.
  developer: Tanvir Haider 
  contact info:  contact@willow.studio
  Happy to help with any development and Animation
  --------------------------------------------------------------------------------------------
   
               
                            
                                        contact@willow.studio                                       
                                       HappyToDevelopAnything:)                                     
                                     webGL./. | .|  |- |+ ..SVG|                                    
                                    .CSS  +. .+  |  |  |:    htm|                                   
                                    :21|  |. .|  |  |  |:     747                                   
                                    :MM.  |. .|  |  |  O: .|  NM|                                   
                             .......|MM.  |. .|  |  |  |: .|  NMy.......                            
                          .|aftereffects  |. .|  |  |  |:  |  CanvasAnima||                         
                        .|CREATOR|::|::|. |. .|  |  |  |;  |  |  .||S|:GREAT.                       
                        |MN: .  || .|  0. |. .|  |  |  |#  |  |. |: .|   .dMd                       
                        NM|  0. :|  |  |  |. .|  |  |  |C  |  |  /| .|    :MM|                      
                       .MM|  |  :|  |  |  |. .|  |  |  |+  |  |  /| .|  : .MM/                      
                       .MM|  |  :|  |  |  |. .|  |  |  |+  |  |  /| .|  y..MM/                      
              ../||||||yMM/  |  :|  |  | .|. .|  O  |  |:  |  |  /| .|  | .MMh||||||+|.             
            .+646.824.6777.  |  :|  |  | ||. .|  |  |  |:  +  |  /| .|  | .yyyyhyyhdNMN|.           
           .dMm/|  |. |. .|  |  :|  |  | .|      |  |  |:     |  /| .|  |  || :+ .:  :hMN|          
           |MN. |. |. |.  |  |  :|  |  |  .      |  :  |:     |  /- .|  |  +. .| .y  /.hMd          
           dMh  |  |. |.  |  |  ..  |  |         .     .-     -  /-  |  |  +. .|  |  | +MM          
           dMh  |  |. |.  |  |   .ydmddmddh|+.          .+|hhddddddy .  |  +. .|  |  | +MM.         
           dMh  |  |. |.  O  |   .||d||d||ymMMh.      -dMMdy|||||||+    |  +. .|  |  O +MM.         
           hM|  .  |. ..  |  |      |  |    -dMN-    /MMy.              |  +. .|  |    /MN          
            .      |.     |  .      |  |     .mMm   .NMh                |  +. .|  |.    ..          
                   .      |         :  |      sMM.  :MM/                |     .|  .                 
                          |            |      |MM.  :MM/                |     .|                    
                          |            |      oMM.  :MM/                .     .|                    
                          .            .  +y/ oMM.  :MM/                                        
                                          ymy oMM.  :MM/                                            
                           -o-   /o-   /+.:s: oMM.  :MM+   .+/   .+/   .+-                          
                           :Nd  :NNd. -Nm.hNy oMM.  :MM+   .dN: .dNN/  hN/                          
                            yN+ dmoNo hN/ hNy oMM.  :MM+    :Nh +Nsmd./Nh                           
                            .mmoNo dm+Ny  hNy sMM.  :MM+.oyo.sN+md.+Nodm/                           
                             /NNd. :NNm.  hNy sMM.  :MM//MMM+.dNN/ .dNN+                            
                              .+.   .+/   -+- -o/   .++..:+/. .+/   .+/ 
                              
                              
  --------------------------------------------------------------------------------------------
*/



var selectedHS = undefined;
var imgList = [["./assets/images/desktop-set1.jpg",D_1],["./assets/images/desktop-set2.jpg",D_2],["./assets/images/desktop-set3.jpg",D_3],["./assets/images/desktop-set4.jpg",D_4]];
TweenLite.defaultEase = Linear.easeNone;
var canvas = document.querySelector("#canvas");
var context = canvas.getContext("2d");
var resolution = window.devicePixelRatio || 1;
var vw, vh, cx, cy;



function tweenThis (selectedItem,imgLoc,imgData,start,end, callBackFunc) {

    var dummyObject = {
        frame: 0,
        x: -960 / 2,
        y: -540 / 2
    };


    var sprite = new Image();
    sprite.onload = startPlease;
    sprite.src = imgLoc;

    function startPlease() {

        var timeLine;

        if (callBackFunc != undefined){

            timeLine = new TimelineMax(
            { 
            onUpdate: update, 
            onUpdateParams:[imgData], 
            onComplete:sendBack 
            }).fromTo(dummyObject, 1, { 
            frame: start, 
            roundProps: "frame", 
            repeat: 0 
            },{ frame: end, roundProps: "frame", repeat: 0 }, 0
            );
        }
        else {
            timeLine = new TimelineMax(
            { 
            onUpdate: update, 
            onUpdateParams:[imgData]
            }).fromTo(dummyObject, 1, { 
            frame: start, 
            roundProps: "frame", 
            repeat: 0 
            },{ frame: end, roundProps: "frame", repeat: 0 }, 0
            );
        }
    }

    function update(imgSeq) {
        var frame = imgSeq[dummyObject.frame];
       // console.log(dummyObject.frame);

        var f = frame.frame;
        var s = frame.spriteSourceSize;

        var x = dummyObject.x + s.x;
        var y = dummyObject.y + s.y;

        context.save();
        context.clearRect(0, 0, vw, vh);
        context.translate(cx, cy);
        context.drawImage(sprite, f.x, f.y, f.w, f.h, x, y, f.w, f.h);
        context.restore();
    }

    function sendBack () {callBackFunc (selectedItem);}

} // end of TweenThis  --------------------------


function resize() {  
    vw = 960;
    vh = 540;
        
    cx = vw / 2;
    cy = vh / 2;

    canvas.width  = vw * resolution;
    canvas.height = vh * resolution;

    canvas.style.width  = vw + "px";
    canvas.style.height = vh + "px"; 

    context.scale(resolution, resolution);
}





function closePanel (itemNumber) {
    showHideHS ("show");
    var currentCloseBtn = document.getElementById("closeBtn-" + itemNumber);
    var currentDescription = document.getElementById("d-" + itemNumber);
    TweenMax.fromTo([currentDescription,currentCloseBtn],0.3,{alpha:1},{delay:0,autoAlpha:0});
    tweenThis (selectedHS, imgList[selectedHS][0],imgList[selectedHS][1],imgList[selectedHS][1].length - 1,0,undefined);
    selectedHS = undefined;
}


function openPanel (itemNumber) {

    showHideHS ("hide");

    var currentCloseBtn = document.getElementById("closeBtn-" + itemNumber);
    currentCloseBtn.style.visibility = "visible";
    TweenMax.fromTo(currentCloseBtn,0.5,{scale:0.5,alpha:0},{delay:1,alpha:1,scale:1});

    var currentDescription = document.getElementById("d-" + itemNumber);
    currentDescription.style.visibility = "visible";
    TweenMax.fromTo(currentDescription,0.5,{alpha:0,x:"+5"},{delay:1,alpha:1,x:"-15"});

    if (selectedHS == undefined) {
        selectedHS = itemNumber;
        tweenThis (selectedHS, imgList[selectedHS][0],imgList[selectedHS][1],0,imgList[selectedHS][1].length - 1,cbfunc);
    }
    else {
        tweenThis (selectedHS, imgList[selectedHS][0],imgList[selectedHS][1],imgList[selectedHS][1].length - 1,0,cbfunc);

        function cbfunc (whichOne) {
           // console.log("this is done yo " + whichOne);
            selectedHS = itemNumber;
            tweenThis (selectedHS, imgList[selectedHS][0],imgList[selectedHS][1],0,imgList[selectedHS][1].length - 1,doNothing);
        }
    }
} // end of OpenPanel

function showHideHS (whichOne) {
    if (whichOne == "show") {
        for (var i = 0; i < 4; i++) {
            var tempBtn = document.getElementById("hs-" + i);
            tempBtn.style.visibility = "visible";
            TweenMax.fromTo(tempBtn,0.5,{alpha:0,scale:0.5},{delay:1,alpha:1,scale:1});
        }
    }
    else {
        for (var i = 0; i < 4; i++) {
            var tempBtn = document.getElementById("hs-" + i);
            TweenMax.fromTo(tempBtn,0.3,{alpha:1,scale:1},{alpha:0,scale:0,onComplete:hide, onCompleteParams:[tempBtn]});
        }

        function hide (whichOne) {
            whichOne.style.visibility = "hidden";
        }
    }
}  // end of ShowHideHS

  

function doNothing () {
    //console.log("what the ...");
}


function startDesktop () {
    $( document ).ready(function() {

        var promises = [];
    
        for (var i = 0; i < imgList.length; i++) {
        (function(url, promise) {
            var img = new Image();
            img.onload = function() {promise.resolve();};
            img.src = url;
        })(imgList[i][0], promises[i] = $.Deferred());
        }
        $.when.apply($, promises).done(function() {
        letsGetStarted ();
        tweenThis (0,imgList[0][0],imgList[0][1],0,0,undefined);
        });
    
        function letsGetStarted () {
            resize();
            document.getElementById("d-interactive-container").style.display = "block";
    
            $( "#hs-0" ).click(function() {openPanel(0);});
            $( "#hs-1" ).click(function() {openPanel(1);});
            $( "#hs-2" ).click(function() {openPanel(2);});
            $( "#hs-3" ).click(function() {openPanel(3);});
        
            $( "#closeBtn-0" ).click(function() {closePanel (0);});
            $( "#closeBtn-1" ).click(function() {closePanel (1);});
            $( "#closeBtn-2" ).click(function() {closePanel (2);});
            $( "#closeBtn-3" ).click(function() {closePanel (3);});
        }
    
    });
        
}


startDesktop ();



