var system = require('./system');
var supervisor = require('./command.supervisor');
var watchdog = require('./command.watchdog');

module.exports.loop = function () {
    // system.clear();
    system.init(['W17N44']);
    system.cleanMemory();
    system.setLimits({
        harvesters: 3,
        upgraders: 1,
        builders: 2,
        repairers: 0,
        mrhandys:0
    });
    system.setMaxBinds('5bbcabeb9099fc012e634811',9);
    watchdog.watchEverything();
    supervisor.keep();
    supervisor.urge();
}