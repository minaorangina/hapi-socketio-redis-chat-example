riot.tag('message', '<li class="row" each="{arr}"> <small class="time"> {parent.getTime(t)} </small> <span class="name"> {n} </span> <span class="msg"> {m} </span> <span></span> </li>', function(opts) {

        this.arr = [];

        setTimeout(function(){
            this.arr.concat(opts.messages);

        }, 1000);

        this.leadZero = function(number) {
            return (number < 10) ? '0'+number : number;
        }.bind(this);

        this.getTime = function(timestamp) {
            var t, h, m, s, time;
            t = new Date(timestamp);
            h = this.leadZero(t.getHours());
            m = this.leadZero(t.getMinutes());
            s = this.leadZero(t.getSeconds());
            return '' + h  + ':' + m + ':' + s;
        }.bind(this);
    
});
