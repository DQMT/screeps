var system = require('./system');
var supervisor = require('./command.supervisor');
var watchdog = require('./command.watchdog');
var job = require('./job');

module.exports.loop = function () {
    // system.clear();
    system.init(['E47N38']);
    system.cleanMemory();
    system.setLimits({
        harvesters: 3,
        upgraders: 3,
        builders: 0,
        repairers: 1,
        mrhandys:0
    });
    system.setMaxBinds('5bbcafcb9099fc012e63b33d',3);
    system.setMaxBinds('5bbcafcb9099fc012e63b33e',2);
    // system.setMaxDrills('5bbcabeb9099fc012e634810',1,0,1,0);
    // system.setMaxDrills('5bbcabeb9099fc012e634811',1,0,1,0);
    watchdog.watchEverything();
    supervisor.keep(true);
    supervisor.keepDefence();
    supervisor.urge();
}