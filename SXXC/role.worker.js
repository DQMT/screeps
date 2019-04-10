var roleHarvester = require('role.worker.harvester');
var roleBuilder = require('role.worker.builder');
var roleUpgrader = require('role.worker.upgrader');
var constants = require('constants');

/**
 * A worker can be a harvester, a builder or a upgrader, depending on creep.memory.roleState
 * body part need:           [WORK, WORK, CARRY, CARRY, MOVE, MOVE]
 * energy cost:               400
 */
var WORK_PLAYER = {
    0: roleHarvester,
    1: roleUpgrader,
    2: roleBuilder
}

var roleWorker = {
    cost: 400,

    /** @param {StructureSpawn} structureSpawn **/
    spawnOne: function (structureSpawn, state) {
        var newName = 'Worker_' + Game.time;
        if (state) {
            structureSpawn.spawnCreep([WORK, WORK, CARRY, CARRY, MOVE, MOVE], newName,
                { memory: { role: 'worker', roleState: state } });
        } else {
            structureSpawn.spawnCreep([WORK, WORK, CARRY, CARRY, MOVE, MOVE], newName,
                { memory: { role: 'worker', roleState: constants.WORKER_STATE.HARVEST } });
        }
    },

    /** @param {Creep} creep **/
    run: function (creep) {
        WORK_PLAYER[creep.memory.roleState].run(creep);
    }
};

module.exports = roleWorker;