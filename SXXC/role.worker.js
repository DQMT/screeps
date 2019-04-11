var roleHarvester = require('role.worker.harvester');
var roleBuilder = require('role.worker.builder');
var roleUpgrader = require('role.worker.upgrader');
var constants = require('constants');

/**
 * A worker can be a harvester, a builder or a upgrader, depending on creep.memory.roleState
 * body part need(level 1):               [WORK, CARRY, MOVE]
 * energy cost(level 1):                  200
 */
var WORK_PLAYER = {
    0: roleHarvester,
    1: roleUpgrader,
    2: roleBuilder
}

var roleWorker = {
    cost: function (structureSpawn) {
        var totalSpawnEnergyCapacity = structureSpawn.memory['totalSpawnEnergyCapacity'];
        var cost = 200 * parseInt(totalSpawnEnergyCapacity / 200);
        return cost < 200 ? 200 : cost;
    },

    /** @param {StructureSpawn} structureSpawn **/
    spawnBiggestOne: function (structureSpawn, state) {
        var totalSpawnEnergyCapacity = structureSpawn.memory['totalSpawnEnergyCapacity'];
        var level = parseInt(totalSpawnEnergyCapacity / 200);
        level = level > 1 ? level : 1;
        var body = [];
        for (var i = 0; i < level; i++) {
            body.push(WORK);
            body.push(CARRY);
            body.push(MOVE);
        }
        var newName = 'Worker_' + Game.time;
        if (state) {
            structureSpawn.spawnCreep(body, newName,
                { memory: { role: 'worker', roleState: state } });
        } else {
            structureSpawn.spawnCreep(body, newName,
                { memory: { role: 'worker', roleState: constants.WORKER_STATE.HARVEST } });
        }
    },

    /** @param {StructureSpawn} structureSpawn **/
    spawnOne: function (structureSpawn, state) {
        var newName = 'Worker_' + Game.time;
        if (state) {
            structureSpawn.spawnCreep([WORK, CARRY, MOVE], newName,
                { memory: { role: 'worker', roleState: state } });
        } else {
            structureSpawn.spawnCreep([WORK, CARRY, MOVE], newName,
                { memory: { role: 'worker', roleState: constants.WORKER_STATE.HARVEST } });
        }
    },

    /** @param {Creep} creep **/
    run: function (creep) {
        WORK_PLAYER[creep.memory.roleState].run(creep);
    }
};

module.exports = roleWorker;