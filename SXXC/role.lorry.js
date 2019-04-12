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
        if (creep.memory.working == true && creep.carry.energy == 0) {
            creep.memory.working = false;
        }
        else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
            creep.memory.working = true;
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
                    creep.moveTo(structure);
                }
            }
        }
        else {
            const droppedEnergy = creep.pos.findClosestByRange(FIND_DROPPED_ENERGY);
            if (droppedEnergy) {
                if (creep.pickup(droppedEnergy) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(droppedEnergy);
                }
            } else {
                let container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: s => s.structureType == STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] > 0
                });
                if (container == undefined) {
                    container = creep.room.storage;
                }
                if (container != undefined) {
                    if (creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(container);
                    }
                }
            }

        }
    },
    /** @param {StructureSpawn} structureSpawn **/
    spawnOne: function (structureSpawn) {
        var newName = 'Lorry_' + Game.time;
        structureSpawn.spawnCreep([CARRY, MOVE, MOVE], newName,
            { memory: { role: 'lorry'} });

    },

}