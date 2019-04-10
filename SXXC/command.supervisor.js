var roleWorker = require('role.worker');
var militaryFootman = require('military.footman');

/**
 * The supervisor make sure every creep work correctly.
 */
var theSupervisor = {
    keepSpawning: function () {
        var workers = _.filter(Game.creeps, (creep) => creep.memory.role == 'worker');
        var havesters = _.filter(workers, (creep) => creep.memory.roleState == roleWorker.state.HARVEST);
        var upgraders = _.filter(workers, (creep) => creep.memory.roleState == roleWorker.state.UPGRADE);
        var builders = _.filter(workers, (creep) => creep.memory.roleState == roleWorker.state.BUILD);
        //console.log('workers: ' + workers.length);
        //We can also use StructureSpawn.renewCreep to maintain the needed number of creeps.
        if (havesters.length < 15 && Game.spawns['shaxianxiaochi'].energy > roleWorker.cost) {
            roleWorker.spawnOne(Game.spawns['shaxianxiaochi'], roleWorker.state.HARVEST);
            console.log('spwan a new havester from ' + structureSpawn);
        }
        if (upgraders.length < 10 && Game.spawns['shaxianxiaochi'].energy > roleWorker.cost) {
            roleWorker.spawnOne(Game.spawns['shaxianxiaochi'], roleWorker.state.UPGRADE);
            console.log('spwan a new upgrader from ' + structureSpawn);
        }
        if (builders.length < 5 && Game.spawns['shaxianxiaochi'].energy > roleWorker.cost) {
            roleWorker.spawnOne(Game.spawns['shaxianxiaochi'], roleWorker.state.BUILD);
            console.log('spwan a new builder from ' + structureSpawn);
        }
    },

    urge: function () {
        for (var name in Game.creeps) {
            var creep = Game.creeps[name];
            if (creep.memory.role == 'worker') {
                roleWorker.run(creep);
            }
            if (creep.memory.role == 'footman') {
                militaryFootman.run(creep);
            }
        }
    },

    keepDefence: function () {
        var structureSpawn = Game.spawns['shaxianxiaochi'];
        var targets = structureSpawn.room.find(FIND_HOSTILE_CREEPS);
        if (targets.length > 0 && structureSpawn.energy >= militaryFootman.cost) {
            militaryFootman.spawnOne(structureSpawn);
            console.log('spwan a new footman from ' + structureSpawn);
        }
    }

};


module.exports = theSupervisor;