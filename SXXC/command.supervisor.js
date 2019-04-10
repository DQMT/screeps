var roleWorker = require('role.worker');
var militaryFootman = require('military.footman');
var constants = require('constants');
var util = require('util');
/**
 * The supervisor make sure every creep work correctly.
 */



var theSupervisor = {
    keepSpawning: function () {
        var structureSpawn = Game.spawns['shaxianxiaochi'];
        var workers = _.filter(Game.creeps, (creep) => creep.memory.role == 'worker');
        var harvesters = _.filter(workers, (creep) => creep.memory.roleState == constants.WORKER_STATE.HARVEST);
        var upgraders = _.filter(workers, (creep) => creep.memory.roleState == constants.WORKER_STATE.UPGRADE);
        var builders = _.filter(workers, (creep) => creep.memory.roleState == constants.WORKER_STATE.BUILD);

        if (Game.time % 10 == 0) {
            console.log('workers: ' + workers.length +
                '\nharvesters: ' + harvesters.length +
                '\nupgraders: ' + upgraders.length +
                '\nbuilders: ' + builders.length);
            console.log('limits: ' + JSON.stringify(Memory.limits));
        }
        //We can also use StructureSpawn.renewCreep to maintain the needed number of creeps.
        if (harvesters.length < Memory.limits.harvesters && structureSpawn.energy > roleWorker.cost) {
            roleWorker.spawnOne(structureSpawn, constants.WORKER_STATE.HARVEST);
            console.log('spwan a new havester from ' + structureSpawn);
        }
        if (upgraders.length < Memory.limits.upgraders && structureSpawn.energy > roleWorker.cost) {
            roleWorker.spawnOne(structureSpawn, constants.WORKER_STATE.UPGRADE);
            console.log('spwan a new upgrader from ' + structureSpawn);
        }
        if (builders.length < Memory.limits.builders && structureSpawn.energy > roleWorker.cost) {
            roleWorker.spawnOne(structureSpawn, constants.WORKER_STATE.BUILD);
            console.log('spwan a new builder from ' + structureSpawn);
        }
        if((!structureSpawn.spawning) && harvesters.length==Memory.limits['harvesters'] && structureSpawn.energy < structureSpawn.energyCapacity){
            util.increaseLimit('harvesters');
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
            console.log('targets left : ' + targets.length);
        }
    }

};


module.exports = theSupervisor;