var roleWorker = require('role.worker');
var roleLorry = require('role.lorry');
var militaryFootman = require('military.footman');
var constants = require('constants');
var util = require('util');

/**
 * The supervisor make sure every creep work correctly.
 */
var theSupervisor = {
    keepSpawning: function () {
        var structureSpawn = Game.spawns['shaxianxiaochi'];
        if (Game.time % 30 == 0) {
            var claimers = _.filter(Game.creeps, (creep) => creep.memory.role == 'claimer');
            if (claimers) {
                for (var i = 0; i < claimers.length; i++) {
                    structureSpawn.renewCreep(claimers[i]);
                }
            }
        }
        var harvesters = Memory.watch['harvesters'];
        var upgraders = Memory.watch['upgraders'];
        var builders = Memory.watch['builders'];
        var lorries = Memory.watch['lorries'];
        var totalSpawnEnergy = structureSpawn.memory['totalSpawnEnergy'];
        var totalSpawnEnergyCapacity = structureSpawn.memory['totalSpawnEnergyCapacity'];


        //We can also use StructureSpawn.renewCreep to maintain the needed number of creeps.
        if (harvesters < Memory.limits.harvesters && totalSpawnEnergy >= roleWorker.cost(structureSpawn)) {
            roleWorker.spawnBiggestOne(structureSpawn, constants.WORKER_STATE.HARVEST);
            console.log('spwan a new havester from ' + structureSpawn);
            return;
        }
        if (Memory.peace && (!structureSpawn.spawning) && Memory.limits['harvesters'] < 4 && totalSpawnEnergy < totalSpawnEnergyCapacity) {
            util.setLimit('harvesters', 4);
            return;
        }

        if (Memory.peace && upgraders < Memory.limits.upgraders && totalSpawnEnergy >= roleWorker.cost(structureSpawn)) {
            roleWorker.spawnBiggestOne(structureSpawn, constants.WORKER_STATE.UPGRADE);
            console.log('spwan a new upgrader from ' + structureSpawn);
        }
        if (Memory.peace && builders < Memory.limits.builders && totalSpawnEnergy >= roleWorker.cost(structureSpawn)) {
            roleWorker.spawnBiggestOne(structureSpawn, constants.WORKER_STATE.BUILD);
            console.log('spwan a new builder from ' + structureSpawn);
        }
        if (Memory.peace && lorries < Memory.limits.lorries && totalSpawnEnergy >= roleLorry.cost(structureSpawn)) {
            roleLorry.spawnOne(structureSpawn);
            console.log('spwan a new lorry from ' + structureSpawn);
        }

        if (
            Memory.limits['builders'] < Memory.limits['upgraders']
            &&
            (structureSpawn.room.find(FIND_CONSTRUCTION_SITES).length ||
                structureSpawn.room.find(FIND_STRUCTURES, { filter: object => object.hits < object.hitsMax }).length)
            && Memory.peace
            && (!structureSpawn.spawning)
        ) {
            util.setLimit('builders', 4);
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
            if (creep.memory.role == 'lorry') {
                roleLorry.run(creep);
            }
        }
    },

    keepDefence: function () {
        var structureSpawn = Game.spawns['shaxianxiaochi'];
        var towers = structureSpawn.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (
                    structure.structureType == STRUCTURE_TOWER
                );
            }
        });
        if (towers.length) {
            for (var i = 0; i < towers.length; i++) {
                var tower = towers[i];
                var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
                if (closestHostile) {
                    tower.attack(closestHostile);
                }
                var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => structure.hits < structure.hitsMax
                });
                if (closestDamagedStructure) {
                    tower.repair(closestDamagedStructure);
                }
            }
        }

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