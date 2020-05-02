const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control')

const ticketControl = new TicketControl();

io.on('connection', (client) => {

    client.on('siguienteTicket', (data, callback) => {

        let tickets = ticketControl.siguienteTicket();

        console.log(tickets);
        callback(tickets)
    })


    client.emit('Status', ticketControl.getStatus());



    client.on('atenderTicket', (data, callback) => {

        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: 'El escritorio es necesario.'
            })
        }



        let atender = ticketControl.atenderTicket(data.escritorio);

        console.log(data);

        client.broadcast.emit('Status', ticketControl.getStatus())

        callback(atender);

    });

    client.on('disconnect', () => {
        console.log('Desconexion.');
    })

    // emitir estado actual "estadoActual"



});