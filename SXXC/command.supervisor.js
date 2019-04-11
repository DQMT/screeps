var roleWorker = require('role.worker');
var militaryFootman = require('military.footman');
var constants = require('constants');
var util = require('util');
var watchdog = require('command.watchdog');
/**
 * The supervisor make sure every creep work correctly.
 */



var theSupervisor = {
    keepSpawning: function () {
        var structureSpawn = Game.spawns['shaxianxiaochi'];
        var harvesters = Memory.watch['harvesters'];
        var upgraders = Memory.watch['upgraders'];
        var builders = Memory.watch['builders'];
        var totalSpawnEnergy = structureSpawn.memory['totalSpawnEnergy'];
        var totalSpawnEnergyCapacity = structureSpawn.memory['totalSpawnEnergyCapacity'];

        //We can also use StructureSpawn.renewCreep to maintain the needed number of creeps.
        if (harvesters < Memory.limits.harvesters && totalSpawnEnergy >= roleWorker.cost(structureSpawn)) {
            roleWorker.spawnBiggestOne(structureSpawn, constants.WORKER_STATE.HARVEST);
            console.log('spwan a new havester from ' + structureSpawn);
        }
        if (Memory.peace && upgraders < Memory.limits.upgraders && totalSpawnEnergy >= roleWorker.cost(structureSpawn)) {
            roleWorker.spawnBiggestOne(structureSpawn, constants.WORKER_STATE.UPGRADE);
            console.log('spwan a new upgrader from ' + structureSpawn);
        }
        if (Memory.peace && builders < Memory.limits.builders && totalSpawnEnergy >= roleWorker.cost(structureSpawn)) {
            roleWorker.spawnBiggestOne(structureSpawn, constants.WORKER_STATE.BUILD);
            console.log('spwan a new builder from ' + structureSpawn);
        }
        if (Memory.peace && (!structureSpawn.spawning) && harvesters < Memory.limits['upgraders'] && totalSpawnEnergy < totalSpawnEnergyCapacity) {
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
        if (Memory.peace == false) {
            var totalSpawnEnergy = structureSpawn.memory['totalSpawnEnergy'];
            if (totalSpawnEnergy >= militaryFootman.cost(structureSpawn)) {
                militaryFootman.spawnBiggestOne(structureSpawn);
                console.log('spwan a new footman from ' + structureSpawn);
            }
        }
    }

};


module.exports = theSupervisor;