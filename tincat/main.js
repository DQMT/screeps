var system = require('./system');
var supervisor = require('./command.supervisor');
var watchdog = require('./command.watchdog');

module.exports.loop = function () {
    system.clear();
    system.init(['W17N44']);
    system.cleanMemory();
    system.setLimits({
        harvesters: 5,
        upgraders: 3,
        builders: 1,
        repairers: 0,
        mrhandys:0
    });
    // system.setMaxBinds('5bbcac9e9099fc012e635dce',5);
    watchdog.watchEverything();
    supervisor.keep();
    supervisor.keepDefence();
    supervisor.urge();
}