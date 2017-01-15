var navWrap = document.getElementsByClassName('navWrap')[0];
var divs = navWrap.getElementsByClassName('div1');
for(var i=0;i<divs.length;i++){
    divs[i].onclick=a1;
    divs[i].t=1760+500*i;
}
function a1(){
    //window.clearInterval(timer);
    var speed=50;
    var that=this;
    if (this.timer){
        window.clearInterval(that.timer);
    }
    this.timer=window.setInterval(function(){
        var curScrollTop=utils.win('scrollTop');
        //console.log(curScrollTop);
        if(curScrollTop-speed>that.t){
            curScrollTop-=speed;
        }else if(curScrollTop+speed<that.t){
            curScrollTop+=speed;
        }else{
            curScrollTop=utils.win('scrollTop',that.t);
            window.clearInterval(that.timer);
            return;
        }
        utils.win('scrollTop',curScrollTop);
    },10);
}