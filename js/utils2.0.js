/**
 * Created by zy on 2016/10/23.
 */
var utils = (function () {
    var isStanderBrowser = !!window.getComputedStyle;

    function listToArray(likeAry){
        try{
            return Array.prototype.slice.call(likeAry)
        }catch(e){
            var ary = [];
            for(var i=0;i<ary.length;i++){
                ary.push(likeAry[i])
            }
            return ary;
        }
    }

    function jsonParse(jsonstr) {
        return 'JSON' in window?JSON.parse(jsonstr):eval('('+jsonstr+')')
    }

    function getRandom(n,m) {
        n=Number[n];
        m=Number[m];
        if(isNaN(n)||isNaN(m)){
            return Math.round()
        }
        if(n>m){
            var temp = n;
            n = m;
            m = temp;
        }
        return Math.round(Math.random()*(m-n)+n)
    }

    function offset(ele){
        var l = null;
        var t = null;
        l +=ele.offsetLeft;
        t +=ele.offsetTop;
        var par = ele.offsetParent;
        while(par){
            if(window.navigator.userAgent.indexOf('MSIE')===-1){
                l +=par.clientLeft;
                t +=par.clientTop;
            }
            l +=par.offsetLeft;
            t +=par.offsetTop;
            par = par.offsetParent;
        }
        return {left:l,top:t};
    }

    function win(attr,val) {
        if(typeof val !='undefined' ){
            document.documentElement[attr]= val;
            document.body[attr]=val;
        }
        return document.documentElement[attr]||document.body[attr];
    }

    function children(ele,tagName){
        var ary = [];
        if(isStanderBrowser){
            ary = this.listToArray(ele.children)
        }else{
            var child = ele.childNodes;
            for(var i=0;i<child.length;i++){
                if(child[i].nodeType == 1){
                    ary.push(child[i])
                }
            }
        }

        if(typeof tagName == 'string'){
            for(var i=0;i<ary.length;i++){
                if(ary[i].nodeName !== tagName.toUpperCase()){
                    ary.splice(i,1);
                    i--;
                }
            }
        }
        return ary;
    }

    function prev(ele){
        if(isStanderBrowser){
            return ele.previousElementSibling;
        }
        var pre = ele.previousSibling;
        while (pre && pre.nodeType !==1){
            pre = pre.previousSibling;
        }
        return pre;
    }

    function next(ele){
        if(isStanderBrowser){
            return ele.nextElementSibling;
        }
        var next = ele.nextSibling;
        while (next && next.nodeType != 1){
            next = next.nextSibling;
        }
        return next;
    }

    function prevAll(ele) {

        var ary = [];
        var pre = ele.previousSibling;
        while(pre){
            if(pre.nodeType == 1){
                ary.unshift(pre);
            }
            pre = pre.previousSibling;
        }
        return ary;
    }

    function nextAll(ele) {
        var ary = [];
        var next = ele.nextSibling;
        while(next){
            ary.push(next);
            next = this.nextSibling;
        }
        return ary;

    }

    function firstEleChild(ele) {
        if(isStanderBrowser){
            return ele.firstElementChild;
        }
        var allEleChilds = this.children(ele);
        return allEleChilds.length>0 ? allEleChilds[0] : null;
    }

    function lastEleChild(ele) {
        if(isStanderBrowser){
            return ele.lastElementChild;
        }
        var allEleChilds = this.children(ele);
        return allEleChilds.length>0 ? allEleChilds[allEleChilds.length-1] : null;
    }

    function siblings(ele) {
        return this.prevAll(ele).concat(this.nextAll(ele));
    }

    function sibling(ele) {
        var ary = [];
        var prev = this.prev(ele);
        var next = this.next(ele);
        prev ? ary.push(prev) : void 0;
        next ? ary.next(next) : void 0;
        return ary;
    }

    function index(ele) {
        return this.prevAll(ele).length;
    }

    function append(ele,container) {
        container.appendChild(ele);
    }

    function prepend(ele,container) {
        var first = this.firstEleChild(container);
        first ? container.insertBefore(ele,first) : container.appendChild(ele);
    }

    function insertBefore(oldEle,newEle) {
        oldEle.parentNode.insertBefore(newEle,oldEle);
    }

    function insertAfter(oldEle,newEle) {
        var next = this.next(oldEle);
        next ? oldEle.parentNode.insertBefore(newEle,next) : oldEle.parentNode.appendChild(newEle);
    }

    function hasClass(ele,strClass) {
        var reg = new RegExp('(^| +)'+ strClass + '( +|$)');
        return reg.test(ele.className);
    }

    function addClass(ele,strClass) {
        var strClassAry = strClass.replace(/^ +| +$/g,'').split(/ +/);
        //[c5,c6]
        for(var i=0;i<strClassAry.length;i++){

            var curClass = strClassAry[i];
            if(!this.hasClass(ele,curClass)){
                ele.className += '' + curClass;
            }
        }
    }

    function removeClass(ele,strClass) {
        var strClassAry = strClass.replace(/^ +| +$/g,'').split(/ +/);
        for(var i=0;i<strClassAry.length;i++){
            var curClass = strClassAry[i];


            while(this.hasClass(ele,curClass)){//包含这个类才移除

                var reg = new RegExp('(^| +?)'+curClass+"( +|$)",'g');
                ele.className = ele.className.replace(reg,' ');
            }
        }
    }

    function getElesByClass(strClass,context) {

        context = context || document;
        if(isStanderBrowser){
            return this.listToArray(context.getElementsByClassName(strClass));
        }

        var tags = context.getElementsByTagName('*');
        var strClassAry = strClass.replace(/^ +| +$/g,'').split(/ +/);
        var ary = [];
        for(var i=0;i<tags.length;i++){
            var curTag = tags[i];
            var curTagOk = true;
            for(var j=0;j<strClassAry.length;j++){
                var curClass = strClassAry[j];
                var reg = new RegExp('(^| +)'+curClass+'( +|$)');//
                if(!reg.test(curTag.className)){
                    curTagOk = false;
                    break;
                }
            }
            if(curTagOk){
                ary.push(curTag);
            }
        }
        return ary;
    }

    function getCss(ele,attr) {
        var val = null;
        if(isStanderBrowser){
            val = window.getComputedStyle(ele,null)[attr];
        }else {
            if (attr == 'opacity') {
                val = ele.currentStyle.filter;
                var reg = /alpha\(opacity=(\d+(?:\.\d+)?)\)/;
                val = reg.test(val) ? reg.exec(val)[1] / 100 : 1;
            } else {
                val = ele.currentStyle[attr];
            }
        }
        var reg = /-?\d+(\.\d+)?(px|pt|em|rem|deg)?/;
        if(reg.test(val)){
            val = parseFloat(val);
        }
        return val;
    }

    function setCss(ele,attr,val) {
        if(attr == 'opacity'){
            ele.style.opacity = val;
            ele.style.filter = 'alpha(opacity='+val*100+')';
            return;
        }
        if(attr == 'float'){
            ele.style.cssFloat = val;
            ele.style.styleFloat = val;
            return;
        }
        var reg = /width|height|left|top|right|bottom|(margin|padding)(Left|Top|Right|Bottom)?/;
        if(reg.test(attr)){
            if(!isNaN(val)){
                val += 'px';
            }
        }
        ele.style[attr] = val;
    }

    function setGroupCss(ele,obj) {//设置一组样式
        //obj没有传参数，obj就是一个undefined
        obj = obj  ||  [];
      if((obj).toString() == '[object Object]'){
          //如果这个条件符合那么obj必然是｛a：1｝的对象
          // ｛width ：100 ，height ：200｝
          for(var key in obj){
              if(obj.hasOwnProperty(key)){//保证是私有属性
                  setCss(ele,key,obj[key]);
              }
          }
      }
    }
    
    function css(ele) {
        //如果第二个参数是字符串，那么需要判断第三个参数有没有。如果有那么就是设置样式，如果没有就是获取样式
        //如果第二个参数是一个对象，那么是来设置批量样式的
        var secondParam = arguments[1];
        var thirdParam = arguments[2];//undefined
        if(typeof secondParam == 'string'){
            if(typeof thirdParam !== 'undefined'){
                setCss(ele,secondParam,thirdParam);
                return;
            }
            return getCss(ele,secondParam);
        }
        //必须保证toString方法不能报错
        secondParam = secondParam || [];
        if((secondParam).toString() == '[object Object]'){
            setGroupCss(ele,secondParam);
        }
    }



    /*function css(ele) {
        var secondParam = arguments[1];
        var thirdParam = arguments[2];//undefined
        if(typeof secondParam == 'string'){
            if(typeof thirdParam !== 'undefined'){
                setCss.call(ele,secondParam,thirdParam);
                return;
            }
            return getCss.call(ele,secondParam);
        }
        secondParam = secondParam || [];
        if((secondParam).toString() == '[object Object]'){
            setGroupCss.call(ele,secondParam);
        }
    }*/

    /* function css(ele) {
        var secondParam = arguments[1];
        var thirdParam = arguments[2];
        if(typeof secondParam == 'string'){
            if(typeof thirdParam !== 'undefined'){
                setCss.apply(ele,secondParam,thirdParam);
                return;
            }
            return getCss.apply(ele,secondParam);
        }
        secondParam = secondParam || [];
        if((secondParam).toString() == '[object Object]'){
            setGroupCss.apply(ele,secondParam);
        }
    }*/

    return {
        listToArray : listToArray,
        jsonParse : jsonParse,
        getRandom : getRandom,
        offset : offset,
        win : win,
        children : children,
        prev : prev,
        next : next,
        prevAll : prevAll,
        nextAll : nextAll,
        firstEleChild : firstEleChild,
        lastEleChild : lastEleChild,
        siblings : siblings,
        sibling : sibling,
        index : index,
        append : append,
        prepend : prepend,
        insertBefore : insertBefore,
        insertAfter : insertAfter,
        hasClass : hasClass,
        addClass : addClass,
        removeClass : removeClass,
        // setGroupCss : setGroupCss,
        // getCss : getCss,
        // setCss : setCss,
        css : css,
        getElesByClass : getElesByClass
    }

})();



