$( document ).ready(function() {
  var socket = io(); // initialise socket.io connection
  var messageStore = [];
  
  function loadMessages() {
    $.get('/load', function(data){
      // each element in data will be passed into renderMessage as msg
      data.forEach(renderMessage);
      riot.mount( "message", { messages: messageStore, scrollToBottom: scrollToBottom});
    })
  }

  /**
   * renders messages to the DOM
   * calls riot.update to tell riot something has changed
   */
  function renderMessage(msg) {
    msg = JSON.parse(msg);
    messageStore.push(msg);
    riot.update();
    return;
  }  

  // keeps latest message at the bottom of the screen
  // http://stackoverflow.com/a/11910887/2870306
  function scrollToBottom () {
    $(window).scrollTop($('#messages').height());
    console.log("height", $('#messages').height()); 
  }

  window.onresize = function(){
    scrollToBottom();
  }

  socket.on('chat:messages:latest', function(msg) {
    renderMessage(msg);
    scrollToBottom();
  });

  socket.on('chat:people:new', function(name) {
    $('#joiners').show();
    $('#joined').text(name)
    $('#joiners').fadeOut(5000);
  });


  $('form').submit(function() {
    if(!Cookies.get('name') || Cookies.get('name').length < 1 || Cookies.get('name') === 'null') {
      getName();
      return false;
    } else {
      var msg  = $('#m').val();
      socket.emit('io:message', sanitise(msg));
      $('#m').val(''); // clear message form ready for next/new message
      return false;
    }
  });

  function getName() {
    // prompt for person's name before allowing to post
    var name = Cookies.get('name');
    if(!name) {
      name = window.prompt("What is your name/handle?");
      Cookies.set('name', name);
    }
    socket.emit('io:name', name);
    $( "#m" ).focus(); // focus cursor on the message input
    return name;
  }

  function sanitise(txt) {
    if(txt.indexOf("<") > -1 || txt.indexOf(">") > -1) {
      txt = 'tries to inject : ' +  txt.replace(/</g, "&lt").replace(/>/g, "&gt");
    }
    return txt;
  }

  getName();
  loadMessages();

});

