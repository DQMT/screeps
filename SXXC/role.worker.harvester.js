var util = require('util');
var constants = require('constants');
/**
 * A harvester continously harvest energy and transfer energy to your structures
 * body part need: [WORK, CARRY, MOVE]
 */
function getEnergySources(creep) {
    var targets = creep.room.find(FIND_SOURCES, {
        filter: (source) => {
            return source.energy > 0;
        }
    });
    return targets;
}

function getEnergyContainers(creep) {
    var targets = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return structure.energy < structure.energyCapacity && (
                structure.structureType == STRUCTURE_TOWER ||
                structure.structureType == STRUCTURE_SPAWN ||
                structure.structureType == STRUCTURE_EXTENSION ||
                structure.structureType == STRUCTURE_CONTAINER ||
                structure.structureType == STRUCTURE_ROAD
            );
        }
    });
    return targets;
}

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function (creep) {
        var source, structure;
        if (!creep.memory.source || (source = Game.getObjectById(creep.memory.source)) == null) {
            var target = util.getHashedTarget(creep, getEnergySources(creep));
            if (!target) {
                console.log(creep.name+' cannot find a source');
                return;
            }
            creep.memory.source = target.id;
            source = target;
        }
        if (!creep.memory.structure || (structure = Game.getObjectById(creep.memory.structure)) == null) {
            var targets = getEnergyContainers(creep);
            if (targets.length > 0) {
                creep.memory.structure = targets[0].id;
                structure = targets[0];
            } else {
                console.log(creep.name+' cannot find a structure to transfer');
                util.decreaseLimitTo1('harvesters');
                if(Memory.fullUpgraders){
                    creep.say('I am dead now!');
                    creep.suicide();
                }else{
                    creep.say('I am upgrader now!');
                    creep.memory.roleState = constants.WORKER_STATE.UPGRADE;
                }
                
            }
        }

        if (creep.carry.energy < creep.carryCapacity) {
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' } });
            }
        } else {
            if (structure) {
                if (structure.energy == structure.energyCapacity) {
                    creep.memory.structure = null;
                    return;
                }
                if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(structure, { visualizePathStyle: { stroke: '#ffffff' } });
                }
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