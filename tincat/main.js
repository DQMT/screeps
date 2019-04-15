var system = require('./system');
var supervisor = require('./command.supervisor');
var watchdog = require('./command.watchdog');

module.exports.loop = function () {
    // system.clear();
    system.init(['W5S37'],['W5S38','W4S37']);
    system.cleanMemory();
    system.setLimits({
        harvesters: 20,
        upgraders: 3,
        builders: 4,
        repairers: 2,
        mrhandys:1
    });
    system.setMaxBinds('5bbcacae9099fc012e63600f',5);
    system.setMaxBinds('5bbcacae9099fc012e636010',5);
    watchdog.watchEverything();
    supervisor.keep();
    supervisor.urge();
}