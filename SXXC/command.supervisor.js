var roleWorker = require('role.worker');
var militaryFootman = require('military.footman');

/**
 * The supervisor make sure every creep work correctly.
 */
var theSupervisor = {
    keepSpawning: function () {
        var workers = _.filter(Game.creeps, (creep) => creep.memory.role == 'worker');
        //console.log('workers: ' + workers.length);
        //We can also use StructureSpawn.renewCreep to maintain the needed number of creeps.
        if (workers.length < 3 && Game.spawns['shaxianxiaochi'].energy > roleWorker.cost) {
            roleWorker.spawnOne(Game.spawns['shaxianxiaochi']);
            console.log('spwan a new ' + role + ' from ' + structureSpawn);
        }
    },

    keepWorking: function(){
        for(var name in Game.creeps) {
            var creep = Game.creeps[name];
            if (creep.memory.role == 'worker') {
                roleWorker.run(creep);
            }
        }
    },

    keepDefence: function (structureSpawn) {
        var targets = structureSpawn.room.find(FIND_HOSTILE_CREEPS);
        if (targets.length > 0 && structureSpawn.energy >= militaryFootman.cost) {
            militaryFootman.spawnOne(structureSpawn);
        }
    }

};


module.exports = theSupervisor;