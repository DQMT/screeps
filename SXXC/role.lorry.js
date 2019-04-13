var util = require('util');
var constants = require('constants');

/**
 * A lorry continously pickup energy and transfer energy to your structures
 * body part need: [CARRY, MOVE, MOVE]
 */

var roleLorry = {
    cost: function (structureSpawn) {
        return 150;
    },
    /** @param {Creep} creep */
    run: function (creep) {
        if (creep.memory.working && creep.carry.energy == 0) {
            creep.memory.working = false;
            creep.say('DI DI DI!');
        }
        else if (!creep.memory.working && creep.carry.energy == creep.carryCapacity) {
            creep.memory.working = true;
            creep.say('DU DU DU!');
        }

        if (creep.memory.working == true) {
            var structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                filter: (s) => (s.structureType == STRUCTURE_SPAWN
                    || s.structureType == STRUCTURE_EXTENSION
                    || s.structureType == STRUCTURE_TOWER
                    || s.structureType == STRUCTURE_STORAGE)
                    && s.energy < s.energyCapacity
            });

            if (structure != undefined) {
                if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(structure, { visualizePathStyle: { stroke: constants.STROKE_COLOR.LORRY } });
                }
            }
        }
        else {
            const droppedEnergy = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
            if (droppedEnergy) {
                creep.say('droppedEnergy');
                if (creep.pickup(droppedEnergy) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(droppedEnergy, { visualizePathStyle: { stroke: constants.STROKE_COLOR.LORRY } });
                }
            } else {
                var tombStone = creep.pos.findClosestByRange(FIND_TOMBSTONES);
                if (tombStone) {
                    creep.say('tombStone');
                    if (creep.withdraw(tombStone) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(tombStone, { visualizePathStyle: { stroke: constants.STROKE_COLOR.LORRY } });
                    }
                } else {
                    let container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                        filter: s => s.structureType == STRUCTURE_CONTAINER
                    });
                    if (container == undefined) {
                        container = creep.room.storage;
                    }
                    if (container != undefined) {
                        creep.say('container or storage');
                        if (creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE || creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_ENOUGH_RESOURCES) {
                            creep.moveTo(container, { visualizePathStyle: { stroke: constants.STROKE_COLOR.LORRY } });
                        }
                    }
                }
            }

        }
    },
    /** @param {StructureSpawn} structureSpawn **/
    spawnOne: function (structureSpawn) {
        var newName = 'Lorry_' + Game.time;
        structureSpawn.spawnCreep([CARRY, MOVE, MOVE], newName,
            { memory: { role: 'lorry' } });

    },

}
module.exports = roleLorry;