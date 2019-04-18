var system = require('./system');
var supervisor = require('./command.supervisor');
var watchdog = require('./command.watchdog');

module.exports.loop = function () {
    // system.clear();
    system.init(['W17N44']);
    system.cleanMemory();
    system.setLimits({
        harvesters: 0,
        upgraders: 3,
        builders: 0,
        repairers: 1,
        mrhandys:0
    });
    // system.setMaxBinds('5bbcabeb9099fc012e634811',9);
    system.setMaxDrills('5bbcabeb9099fc012e634810',1,0,1,0);
    system.setMaxDrills('5bbcabeb9099fc012e634811',1,0,1,0);
    watchdog.watchEverything();
    supervisor.keep();
    supervisor.keepDefence();
    supervisor.urge();
}