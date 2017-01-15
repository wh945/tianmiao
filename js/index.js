
var banner = utils.getElesByClass('banner')[0];
var bannerInner = utils.getElesByClass('bannerInner',banner)[0];
var focusList = utils.children(banner,'ul')[0];
var left = utils.getElesByClass('left',banner)[0];
var right = utils.getElesByClass('right',banner)[0];
var imgs = bannerInner.getElementsByTagName('img');
var lis = focusList.getElementsByTagName('li');

(function () {
    var xhr = new XMLHttpRequest();
    xhr.open('get','data.txt?_='+Math.random(),false);
    xhr.onreadystatechange = function () {
        if (xhr.readyState ==4 && xhr.status == 200){
            data = utils.jsonParse(xhr.responseText);
        }
    };
    xhr.send(null);
})();


(function () {
    var str = '';
    var str1 = '';
    for (var i=0;i<data.length;i++){
        str += '<div><img src="" realSrc="'+data[i].src+'"></div>';
        str1 += i==0?'<li class="selected"></li>' : '<li></li>';
    }
    bannerInner.innerHTML = str;
    focusList.innerHTML = str1;
})();

(function () {
    for (var i=0;i<imgs.length;i++){
        (function (i) {
            var curImg = imgs[i];
            var tempImg = new Image();
            tempImg.src = curImg.getAttribute('realSrc');
            tempImg.onload = function () {
                curImg.src = this.src;
                utils.css(curImg,'display','block');
                if (i==0){
                    utils.css(curImg.parentNode,'zIndex',1);
                    animate(curImg.parentNode,{opacity:1},500);
                }
            };
        })(i);
    }
})();

var timer = window.setInterval(autoMove,2000);
var step = 0;
function autoMove() {
    step++;
    if (step == data.length){
        step = 0;
    }
    setImg();
}

function setImg() {
    for (var i=0;i<imgs.length;i++){
        var curImg = imgs[i];
            if (i===step){
                utils.css(curImg.parentNode,'zIndex',1);
                animate(curImg.parentNode,{opacity:1},500,function () {
                    var siblings = utils.siblings(this);
                    for (var j=0;j<siblings.length;j++){
                        utils.css(siblings[j],'opacity',0);
                    }
                })
            }else {
                utils.css(curImg.parentNode,'zIndex',0);
            }
    }
    for (var i=0;i<lis.length;i++){
        lis[i].className = i === step ? 'selected' : '';
    }
}
banner.onmouseover = function () {
  window.clearInterval(timer);
};
banner.onmouseout = function () {
  timer = window.setInterval(autoMove,2000);
};
for (var i=0;i<lis.length;i++){
    var curLi = lis[i];
     curLi.index = i;
    curLi.onclick = function () {
        step== this.index;
        autoMove();
    }
};

var navWrap = document.getElementsByClassName('navWrap')[0];
var headerTop = document.getElementsByClassName('headerTop')[0];
(function () {
    window.onscroll = function () {
        var curScroll = utils.win('scrollTop');
        var speed = 800;
        if (curScroll < speed){
            navWrap.style.display = 'none';
            headerTop.style.display = 'none';
        }else {
            navWrap.style.display = 'block';
            headerTop.style.display = 'block';
        }
    };
})();




   