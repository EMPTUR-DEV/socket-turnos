var socket = io();


var searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')) {
    window.location = 'index.html'
    throw new Error('El escritorio es necesario');
}

var escritorio = searchParams.get('escritorio');


let nuevoTicket = function(escritorio) {
    socket.emit('atenderTicket', { escritorio: escritorio }, function(ticket) {
        console.log('Ticket ' + ticket);
        $('#ticket').text(ticket);
    });
}



$('#escritorio').text('Escritorio ' + escritorio);





$('#atender').on('click', function() {
    nuevoTicket(escritorio)
})