const Service = require('node-windows').Service;

// Crie um novo objeto Service
const svc = new Service({
    name: 'MenuFoodingApi',
    description: 'Menu Fooding API',
    script: './src/index.js'
});

// Evento de instalação do serviço
svc.on('install', function () {
    svc.start();
});

// Instale o serviço
svc.install();