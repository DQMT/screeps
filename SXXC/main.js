var supervisor = require('command.supervisor');

module.exports.loop = function () {
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    // console.log('Upgrader: ' + upgraders.length +' Harvester: '+harvesters.length);

    //We can also use StructureSpawn.renewCreep to maintain the needed number of creeps.
    if(upgraders.length + harvesters.length < 10 && Game.spawns['shaxianxiaochi'].energy >200) {
        var newName = 'Harvester' + Game.time;
        console.log('Spawning new harvester: ' + newName);
        Game.spawns['shaxianxiaochi'].spawnCreep([WORK,CARRY,MOVE], newName, 
            {memory: {role: 'harvester'}});
    }
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        supervisor.urge(creep);
    }
}