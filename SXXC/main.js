var supervisor = require('command.supervisor');
var watchdog = require('command.watchdog');
var util = require('util');

module.exports.loop = function () {
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    util.init({
        harvesters: 3,
        upgraders: 3,
        builders: 4
    });
    // util.setLimits({
    //     harvesters: 6,
    //     upgraders: 5,
    //     builders: 4
    // });
    watchdog.watch();
    supervisor.keepSpawning();
    supervisor.keepDefence();
    supervisor.urge();
   
}