var system = require('./system');
var supervisor = require('./command.supervisor');
var watchdog = require('./command.watchdog');

module.exports.loop = function () {
    // system.clear();
    system.init(['sim']);
    system.cleanMemory();
    system.setLimits({
        harvesters: 5,
        upgraders: 2,
        builders: 2,
        repairers: 2,
        mrhandys:1
    });
    watchdog.watchEverything();
    supervisor.keep();
    supervisor.urge();
}