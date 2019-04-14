var system = require('./system');
var supervisor = require('./command.supervisor');

module.exports.loop = function () {
    // system.clear();
    system.init(['sim']);
    system.cleanMemory();

    supervisor.keep();
    supervisor.urge();

}