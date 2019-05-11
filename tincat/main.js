var system = require('./system');
var supervisor = require('./command.supervisor');
var watchdog = require('./command.watchdog');
var job = require('./job');

module.exports.loop = function () {
    // system.clear();
    // job.exeTempJpb();
    // job.exeOnceOn();
    // job.exeOnceJob();
    system.init(['E47N38']);
    system.cleanMemory();
    system.setLimits({
        harvesters: 10,
        upgraders: 4,
        builders: 6,
        repairers: 0,
        mrhandys: 1,
        miners: 0
    });
    system.setMaxBinds('5bbcafcb9099fc012e63b33d', 4);
    system.setMaxBinds('5bbcafcb9099fc012e63b33e', 4);
    system.setMaxBinds('5bbcafdc9099fc012e63b4ca', 4);
    system.setMaxBinds('5bbcafdc9099fc012e63b4c8', 5);
    // system.setMaxDrills('5bbcabeb9099fc012e634810',1,0,1,0);
    // system.setMaxDrills('5bbcabeb9099fc012e634811',1,0,1,0);
    watchdog.watchEverything();
    supervisor.keepTower();
    supervisor.keepDefence();
    supervisor.keepSpawning(true);
    supervisor.urge();
}