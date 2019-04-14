var system = require('./system');
var supervisor = require('./command.supervisor');
var watchdog = require('./command.watchdog');

module.exports.loop = function () {
    // system.clear();
    system.init(['sim']);
    system.cleanMemory();
    watchdog.watch();
    supervisor.keep();
    supervisor.urge();

}