var system = require('./system');
var supervisor = require('./command.supervisor');
var watchdog = require('./command.watchdog');

module.exports.loop = function () {
    // system.clear();
    system.init(['W5S37'],['W5S38','W4S37']);
    system.cleanMemory();
    system.setLimits({
        harvesters: 20,
        upgraders: 6,
        builders: 3,
        repairers: 2,
        mrhandys:1
    });
    system.setMaxBinds('5bbcac9e9099fc012e635dce',5);
    system.setMaxBinds('5bbcac9e9099fc012e635dcf',5);
    system.setMaxBinds('5bbcacae9099fc012e63600f',7);
    system.setMaxBinds('5bbcacae9099fc012e636010',7);
    watchdog.watchEverything();
    supervisor.keep();
    supervisor.keepDefence();
    supervisor.urge();
}