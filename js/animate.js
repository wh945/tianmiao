/**
 * Created by wenhong on 2016/10/28.
 */
(function () {
    function animate(ele,target,duration,callback) {
        var effect = {
            Linear : function (t,b,c,d) {
                return b + t/d*c;
            }
        };
        duration = duration || 2000;
        var time = 0;
        var interval = 10;
        var begin = {};
        var change = {};
        for (var key in target){
            begin[key] = utils.css(ele,key);
            change[key] = target[key] - begin[key];
        }
        if (ele.timer){
            window.clearInterval(ele.timer);
        }
        ele.timer = window.setInterval(function () {
            time += interval;
            if (time>=duration){
                window.clearInterval(ele.timer);
                utils.css(ele,target);
                if (typeof callback == 'function'){
                    callback.call(ele);
                }
                return;
            }
            for (var key in change){
                if (change[key]){
                    var val = effect.Linear(time,begin[key],change[key],duration);
                    utils.css(ele,key,val);
                }
            }
        },interval)
    }
    window.animate = animate;
})();




