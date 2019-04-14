var util = require('util');
var constants = require('constants');
/**
 * A harvester continously harvest energy and transfer energy to your structures
 * body part need: [WORK, CARRY, MOVE]
 */


function getEnergyContainers(creep) {
    var targets;

    targets = Game.rooms['W5S37'].find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (
                structure.structureType == STRUCTURE_SPAWN ||
                structure.structureType == STRUCTURE_EXTENSION ||
                structure.structureType == STRUCTURE_TOWER
            ) && util.needEnergy(structure)

        }
    });
    if (targets.length > 0) {
        return targets;
    }
    targets = Game.rooms['W5S37'].find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (
                structure.structureType == STRUCTURE_CONTAINER ||
                structure.structureType == STRUCTURE_STORAGE
            ) && util.needEnergy(structure)

        }
    });
    return targets;
}

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function (creep) {
        if (creep.memory.transfering && creep.carry.energy == 0) {
            creep.memory.transfering = false;
            creep.memory.structure = null;
            creep.say('harvest');
        }
        if (!creep.memory.transfering && creep.carry.energy == creep.carryCapacity) {
            creep.memory.transfering = true;
            creep.memory.source = null;
            creep.say('transfer');
        }
        if (creep.memory.transfering) {//transfer
            var structure;
            if (creep.memory.structure == null || (structure = Game.getObjectById(creep.memory.structure)) == null || !util.needEnergy(structure)) {
                var targets = getEnergyContainers(creep);
                if (targets.length > 0) {
                    creep.memory.structure = targets[0]['id'];
                    structure = targets[0];
                } else {
                    console.log(creep.name + ' cannot find a structure to transfer');
                    util.increaseFreeTicks(creep);
                    if (util.isFree(creep)) {
                        util.decreaseLimitTo1('harvesters');
                        if (Memory.fullUpgraders) {
                            creep.say('I am dead now!');
                            creep.suicide();
                        } else {
                            creep.say('I am upgrader now!');
                            creep.memory.roleState = constants.WORKER_STATE.UPGRADE;
                        }
                    }
                }
            }
            if (structure) {
                if (!util.needEnergy(structure)) {
                    creep.memory.structure = null;
                    return;
                }
                util.resetFreeTicks(creep);
                if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(structure, { visualizePathStyle: { stroke: constants.STROKE_COLOR.TRANSFER } });
                }
            }
        } else {//harvest
            var source;
            if (!creep.memory.source || (source = Game.getObjectById(creep.memory.source)) == null || source.energy == 0) {
                var target = util.getHashedTarget(creep, util.getEnergySources(creep));
                if (!target) {
                    console.log(creep.name + ' cannot find a source');
                    return;
                }
                creep.memory.source = target['id'];
                source = target;
            }
            util.resetFreeTicks(creep);
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, { visualizePathStyle: { stroke: constants.STROKE_COLOR.HARVEST } });
            }

        }
    },
    leisure: function (creep) {
        var targets = getEnergyContainers(creep);
        if (targets.length == 0 && creep.carry.energy == creep.carryCapacity) {
            return true;
        } else {
            return false;
        }
    }
};

module.exports = roleHarvester;