var supervisor = require('command.supervisor');

module.exports.loop = function () {
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    supervisor.keepSpawning();
    supervisor.keepDefence();
    supervisor.urge();
   
}