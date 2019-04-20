var system = require('./system');
var supervisor = require('./command.supervisor');
var watchdog = require('./command.watchdog');
var job = require('./job');

module.exports.loop = function () {
    // system.clear();
    // job.exeTempJpb();
    system.init(['E47N38']);
    system.cleanMemory();
    system.setLimits({
        harvesters: 5,
        upgraders: 3,
        builders: 3,
        repairers: 0,
        mrhandys:0
    });
    system.setMaxBinds('5bbcafcb9099fc012e63b33d',4);
    system.setMaxBinds('5bbcafcb9099fc012e63b33e',5);
    // system.setMaxDrills('5bbcabeb9099fc012e634810',1,0,1,0);
    // system.setMaxDrills('5bbcabeb9099fc012e634811',1,0,1,0);
    watchdog.watchEverything();
    supervisor.keep(true);
    supervisor.keepDefence();
    supervisor.urge();
}