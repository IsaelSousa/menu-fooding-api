const Service = require('node-windows').Service;

// Crie um novo objeto Service
const svc = new Service({
    name: 'MenuFoodingApi',
    description: 'Menu Fooding API',
    script: './src/index.js'
});

// Evento de desinstalação do serviço
svc.on('uninstall', function () {
    console.log('Serviço removido com sucesso!');
});

// Desinstale o serviço
svc.uninstall();