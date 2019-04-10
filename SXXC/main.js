var supervisor = require('command.supervisor');

module.exports.loop = function () {
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    var workers = _.filter(Game.creeps, (creep) => creep.memory.role == 'worker');
    console.log('workers: ' + workers.length);

    //We can also use StructureSpawn.renewCreep to maintain the needed number of creeps.
    if(workers.length < 3 && Game.spawns['shaxianxiaochi'].energy >200) {
        supervisor.spawn(Game.spawns['shaxianxiaochi'],'worker');
    }
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        supervisor.urge(creep);
    }
}