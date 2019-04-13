var roleHarvester = require('role.worker.harvester');
var roleBuilder = require('role.worker.builder');
var roleUpgrader = require('role.worker.upgrader');
var constants = require('constants');
var util = require('util');

/**
 * A worker can be a harvester, a builder or a upgrader, depending on creep.memory.roleState
 * body part need(level 1):               [WORK, CARRY, MOVE]
 * energy cost(level 1):                  200
 */
var WORK_PLAYER = {
    'harvest': roleHarvester,
    'upgrade': roleUpgrader,
    'build': roleBuilder
}

var roleWorker = {
    cost: function (structureSpawn) {
        var totalSpawnEnergyCapacity = structureSpawn.memory['totalSpawnEnergyCapacity'];
        var level = parseInt(totalSpawnEnergyCapacity / 200);
        var levelLimit = Memory.limits['workerLevel'] ? Memory.limits['workerLevel'] : 10;
        level = level > 1 ? level : 1;
        level = level < levelLimit ? level : levelLimit;
        var cost = 200 * level;
        return cost < 200 ? 200 : cost;
    },
    maxLevel: function (structureSpawn) {
        var totalSpawnEnergy = structureSpawn.memory['totalSpawnEnergy'];
        var level = parseInt(totalSpawnEnergy / 200);
        return level > 1 ? level : 1;
    },
    /** @param {StructureSpawn} structureSpawn **/
    spawnBiggestOne: function (structureSpawn, state) {
        var totalSpawnEnergyCapacity = structureSpawn.memory['totalSpawnEnergyCapacity'];
        var level = parseInt(totalSpawnEnergyCapacity / 200);
        var levelLimit = Memory.limits['workerLevel'] ? Memory.limits['workerLevel'] : 10;
        level = level > 1 ? level : 1;
        level = level < levelLimit ? level : levelLimit;
        var body = [];
        for (var i = 0; i < level; i++) {
            body.push(WORK);
            body.push(CARRY);
            body.push(MOVE);
        }
        var newName = 'Worker_' + Game.time + '@' + level;
        var sourceId = util.getMostFreeSourceId;
        if (state) {
            structureSpawn.spawnCreep(body, newName,
                { memory: { role: 'worker', roleState: state, sourceId: sourceId } });
        } else {
            structureSpawn.spawnCreep(body, newName,
                { memory: { role: 'worker', roleState: constants.WORKER_STATE.HARVEST, sourceId: sourceId } });
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