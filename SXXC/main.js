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
        harvesters: 5,
        upgraders: 3,
        builders: 2
    });
    setLimits({
        harvesters: 5,
        upgraders: 5,
        builders: 5
    });
    supervisor.keepSpawning();
    supervisor.keepDefence();
    supervisor.urge();
   
}