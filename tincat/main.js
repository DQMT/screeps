var system = require('./system');
var supervisor = require('./command.supervisor');

module.exports.loop = function () {
    system.clear();
    system.init(['sim']);
    // system.setColonies(['W5S38','W4S37']);
    system.registerSources();
    system.cleanMemory();

    supervisor.keep();

}