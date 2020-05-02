const fs = require('fs')


class Ticket {

    constructor(numero, escritorio) {

        this.numero = numero;
        this.escritorio = escritorio;

    }
}


class TicketControl {

    constructor() {

        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ticketsAtendidos = [];

        let data = require('../data/data.json');

        if (data.hoy === this.hoy) {
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ticketsAtendidos = data.ticketsAtendidos;

        } else {
            this.reiniciarConteo();
        }

    }

    siguienteTicket() {

        this.ultimo += 1;

        let ticket = new Ticket(this.ultimo, null);

        this.tickets.push(ticket);

        this.grabarArchivo();

        return `${this.getStatus().actual}`


    }

    getStatus() {
        let estado = {
            actual: this.ultimo,
            atendidos: this.ticketsAtendidos
        }
        return estado
    }

    grabarArchivo() {

        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ticketsAtendidos: this.ticketsAtendidos
        };
        let jsonDataString = JSON.stringify(jsonData);

        fs.writeFileSync('./server/data/data.json', jsonDataString);

    }

    atenderTicket(escritorio) {
        if (this.tickets.length === 0) return 'No hay tickets';

        let numeroTicket = this.tickets[0].numero;

        this.tickets.shift();

        let atender = new Ticket(numeroTicket, escritorio);

        this.ticketsAtendidos.unshift(atender);


        if (this.ticketsAtendidos.length > 4) {
            this.ticketsAtendidos.splice(-1, 1) // Elimino el último
        }
        console.log('Ultimos');
        console.log(this.ticketsAtendidos);

        this.grabarArchivo();

        return atender.numero;
    }

    reiniciarConteo() {

        this.ultimo = 0;
        this.tickets = [];
        this.ticketsAtendidos = [];

        console.log('Se ha inicializado el conteo');
        this.grabarArchivo();

    }


}

module.exports = {
    TicketControl,
}