/**
 * Created by wenhong on 2016/11/14.
 */
var navWrap = document.getElementsByClassName('navWrap')[0];
var navEnd = navWrap.getElementsByClassName('navEnd')[0];
var speed = 50;
navEnd.onclick = function () {
    console.log('111');
    var that = this;
    this.timer = window.setInterval(function () {
        var curScroll = utils.win('scrollTop');
        console.log(curScroll);
        if (curScroll <=0){
            window.clearInterval(that.timer);
            utils.win('scrollTop',0);
            return;
        }
        curScroll -= speed;
        utils.win('scrollTop',curScroll);
    },10)
};