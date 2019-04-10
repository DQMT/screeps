var supervisor = require('command.supervisor');
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
    //     harvesters: 5,
    //     upgraders: 2,
    //     builders: 2
    // });
    supervisor.keepSpawning();
    supervisor.keepDefence();
    supervisor.urge();
   
}