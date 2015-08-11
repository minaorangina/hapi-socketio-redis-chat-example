<message>
  <li class='row' each={messages}>
    <!-- parent gives 'li' access to 'message' functions -->
    <small class='time'> {parent.getTime(t)}  </small>
    <span class='name'> {n}  </span>
    <span class='msg'>  {m} </span>
  </li>

  <script>
    this.messages = opts.messages;

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

    this.on('mount', opts.scrollToBottom); 

  </script>
</message>
