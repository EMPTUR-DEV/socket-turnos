//  Conection command

var socket = io();

var label = $('#lblNuevoTicket');

socket.on('connect', function() {

    console.log('Conectado al server');

    socket.on('Status', function(status) {

        label.text(status.actual);
    });

});


socket.on('disconnect', function() {

    console.log('Desconectado del server');

});



$('button').on('click', function() {

    socket.emit('siguienteTicket', null, function(siguienteTicket) {
        label.text(siguienteTicket);
    });

})