<message>
    <li class='row' each={arr}>
        <small class='time'> {parent.getTime(t)}  </small>
        <span class='name'> {n}  </span>
        <span class='msg'>  {m} </span>
    </li>

    <script>

        this.arr = [{m: "m", t: "t", n: "n"}];

        setTimeout(function(){
            this.arr.concat(opts.messages);
            this.update();
            console.log(this);
        }.bind(this), 1000);


        leadZero(number) {
            return (number < 10) ? '0'+number : number;
        }

        getTime(timestamp) {
            var t, h, m, s, time;
            t = new Date(timestamp);
            h = this.leadZero(t.getHours());
            m = this.leadZero(t.getMinutes());
            s = this.leadZero(t.getSeconds());
            return '' + h  + ':' + m + ':' + s;
        }
    </script>

</message>
