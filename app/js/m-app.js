
// @codekit-prepend "m-data.js"

var MselectedHS = undefined;
var mImgList = [["./assets/images/mobile-set1.jpg",M_1],["./assets/images/mobile-set2.jpg",M_2],["./assets/images/mobile-set3.jpg",M_3],["./assets/images/mobile-set4.jpg",M_4]];
var unitWidth = 324;
var unitHeight = 576;
TweenLite.defaultEase = Linear.easeNone;
var Mcanvas = document.querySelector("#canvas-m");
var mContext = Mcanvas.getContext("2d");
var mresolution = window.devicePixelRatio || 1;
var mvw, mvh, mcx, mcy;


   
// window.addEventListener("mresize", mresize);

function thisThisM (selectedItem,imgLoc,imgData,start,end, callBackFunc) {

    var dummyObject = {
        frame: 0,
        x: -unitWidth / 2,
        y: -unitHeight / 2
    };


    var sprite = new Image();
    sprite.onload = startPleaseM;
    sprite.src = imgLoc;

    function startPleaseM() {

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

        mContext.save();
        mContext.clearRect(0, 0, mvw, mvh);
        mContext.translate(mcx, mcy);
        mContext.drawImage(sprite, f.x, f.y, f.w, f.h, x, y, f.w, f.h);
        mContext.restore();
    }

    function sendBack () {callBackFunc (selectedItem);}

} // end of thisThisM  --------------------------


function mresize() {  
    mvw = unitWidth;
    mvh = unitHeight;
        
    mcx = mvw / 2;
    mcy = mvh / 2;

    Mcanvas.width  = mvw * mresolution;
    Mcanvas.height = mvh * mresolution;

    Mcanvas.style.width  = mvw + "px";
    Mcanvas.style.height = mvh + "px"; 

    mContext.scale(mresolution, mresolution);
}

thisThisM (0,mImgList[0][0],mImgList[0][1],0,0,undefined);



function closePanelM (itemNumber) {
    shomwHideM ("show");
    var currentCloseBtn = document.getElementById("m-closeBtn-" + itemNumber);
    var currentDescription = document.getElementById("m-d-" + itemNumber);
    TweenMax.fromTo([currentDescription,currentCloseBtn],0.3,{alpha:1},{delay:0,autoAlpha:0});
    thisThisM (MselectedHS, mImgList[MselectedHS][0],mImgList[MselectedHS][1],mImgList[MselectedHS][1].length - 1,0,undefined);
    MselectedHS = undefined;
}


function openPanelM (itemNumber) {

    shomwHideM ("hide");

    var currentCloseBtn = document.getElementById("m-closeBtn-" + itemNumber);
    currentCloseBtn.style.visibility = "visible";
    TweenMax.fromTo(currentCloseBtn,0.5,{scale:0.5,alpha:0},{delay:1,alpha:1,scale:1});

    var currentDescription = document.getElementById("m-d-" + itemNumber);
    currentDescription.style.visibility = "visible";
    TweenMax.fromTo(currentDescription,0.5,{alpha:0},{delay:1,alpha:1});

    if (MselectedHS == undefined) {
        MselectedHS = itemNumber;
        thisThisM (MselectedHS, mImgList[MselectedHS][0],mImgList[MselectedHS][1],0,mImgList[MselectedHS][1].length - 1,cbfunc);
    }
    else {
        thisThisM (MselectedHS, mImgList[MselectedHS][0],mImgList[MselectedHS][1],mImgList[MselectedHS][1].length - 1,0,cbfunc);

        function cbfunc (whichOne) {
           // console.log("this is done yo " + whichOne);
            MselectedHS = itemNumber;
            thisThisM (MselectedHS, mImgList[MselectedHS][0],mImgList[MselectedHS][1],0,mImgList[MselectedHS][1].length - 1,doNothing);
        }
    }
} // end of openPanelM

function shomwHideM (whichOne) {
    if (whichOne == "show") {
        for (var i = 0; i < 4; i++) {
            var tempBtn = document.getElementById("m-hs-" + i);
            tempBtn.style.visibility = "visible";
            TweenMax.fromTo(tempBtn,0.5,{alpha:0,scale:0.5},{delay:1,alpha:1,scale:1});
        }
    }
    else {
        for (var i = 0; i < 4; i++) {
            var tempBtn = document.getElementById("m-hs-" + i);
            TweenMax.fromTo(tempBtn,0.3,{alpha:1,scale:1},{alpha:0,scale:0,onComplete:hide, onCompleteParams:[tempBtn]});
        }

        function hide (whichOne) {
            whichOne.style.visibility = "hidden";
        }
    }
}  // end of shomwHideM

  

function doNothing () {
    //console.log("what the ...");
}

function startMobile () {
    $( document ).ready(function() {

        var promises = [];
    
        for (var i = 0; i < mImgList.length; i++) {
        (function(url, promise) {
            var img = new Image();
            img.onload = function() {promise.resolve();};
            img.src = url;
        })(mImgList[i][0], promises[i] = $.Deferred());
        }
        $.when.apply($, promises).done(function() {
        letsGetStarted ();
        });
    
        function letsGetStarted () {
            document.getElementById("m-interactive-container").style.display = "block";
            mresize();
            
            $( "#m-hs-0" ).click(function() {openPanelM(0);});
            $( "#m-hs-1" ).click(function() {openPanelM(1);});
            $( "#m-hs-2" ).click(function() {openPanelM(2);});
            $( "#m-hs-3" ).click(function() {openPanelM(3);});
        
            $( "#m-closeBtn-0" ).click(function() {closePanelM (0);});
            $( "#m-closeBtn-1" ).click(function() {closePanelM (1);});
            $( "#m-closeBtn-2" ).click(function() {closePanelM (2);});
            $( "#m-closeBtn-3" ).click(function() {closePanelM (3);});
        }
    
    });    
}

startMobile ();


