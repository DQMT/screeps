var constants = require('./constants');



var roleHarvester = {
    level: function () {
        return 1;
    },
    cost: function () {
        return 200;
    },
    body: function () {
        return [WORK, CARRY, MOVE];
    },
    newName: function () {
        return 'Harvester@' + this.level() + '_' + Game.time;
    },

    run: function (creep) {
        if (creep.memory.transfering && creep.carry.energy == 0) {
            creep.memory.transfering = false;
            creep.say('harvest');
        }
        if (!creep.memory.transfering && creep.carry.energy == creep.carryCapacity) {
            creep.memory.transfering = true;
            creep.say('transfer');
        }
        if (creep.memory.transfering) {
            var structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                filter: (s) => (s.structureType == STRUCTURE_SPAWN
                    || s.structureType == STRUCTURE_EXTENSION
                    || s.structureType == STRUCTURE_TOWER)
                    && s.energy < s.energyCapacity
            });
            if (structure == undefined) {
                structure = creep.room.storage;
            }
            if (structure != undefined) {
                if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(structure);
                }
            }else{
                console.log(creep.name + 'cannot find a structure!');
            }
        } else {
            var source = Game.getObjectById(creep.memory.source);
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, { visualizePathStyle: { stroke: constants.STROKE_COLOR.HARVEST } });
            }
        }
    }

}

module.exports = roleHarvester;