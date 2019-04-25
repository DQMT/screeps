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
        harvesters: 14,
        upgraders: 2,
        builders: 6,
        repairers: 0,
        mrhandys:1
    });
    system.setMaxBinds('5bbcafcb9099fc012e63b33d',4);
    system.setMaxBinds('5bbcafcb9099fc012e63b33e',5);
    system.setMaxBinds('5bbcafdc9099fc012e63b4ca',5);
    system.setMaxBinds('5bbcafdc9099fc012e63b4c8',5);


    // system.setMaxDrillsAndLorries('5bbcafcb9099fc012e63b33d',1,2);
    // system.setMaxDrillsAndLorries('5bbcafcb9099fc012e63b33e',1,2);
    // system.setMaxDrillsAndLorries('5bbcafdc9099fc012e63b4ca',1,2);
    // system.setMaxDrillsAndLorries('5bbcafdc9099fc012e63b4c8',1,2);
    
    watchdog.watchEverything();
    supervisor.keepTower();
    supervisor.keepDefence();
    supervisor.keepSpawning(true);
    supervisor.urge();
}