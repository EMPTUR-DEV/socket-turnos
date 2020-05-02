var socket = io();





socket.on('Status', function(status) {


    if (status.atendidos.length === 0) {
        var tickets = [];
        alert('No hay tickets')
    } else {
        console.log(status.atendidos);
        var tickets = status.atendidos;
    }

    var audio = new Audio('../audio/new-ticket.mp3');
    audio.play();
    console.log(tickets);
    actualizarHTMLTicket(tickets);


});



//ultimos 4 on




var actualizarHTMLTicket = function(tickets) {

    console.log(tickets);


    for (var i = 1; i <= tickets.length; i++) {

        var s = tickets[i - 1];

        console.log(s);

        ticket = "#lblTicket" + i
        desk = '#lblEscritorio' + i
        if (s) {
            $(ticket).text('Ticket ' + s.numero);
            $(desk).text('Escritorio ' + s.escritorio);
        } else {
            $(ticket).text('');
            $(desk).text('');
        }
    }

}