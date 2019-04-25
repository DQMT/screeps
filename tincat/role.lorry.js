var constants = require('./constants');
var util = require('./util');
var system = require('./system');

/**
 * A Lorry
 * body part need: [CARRY, MOVE]
 * memory: {"source":[sourceId]}
 */

var roleLorry = {
    level: function () {
        return 3;
    },
    cost: function () {
        return 100 * this.level();
    },
    body: function () {
        var body = [];
        var level = this.level();
        for (var i = 0; i < level; i++) {
            body.push(CARRY);
        }
        for (var i = 0; i < level; i++) {
            body.push(MOVE);
        }
        return body;
    },
    newName: function () {
        return 'Lorry@' + this.level() + '_' + Game.time;
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
            if (!structure) {
                structure = creep.room.storage;
            }
            if (structure) {
                if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(structure);
                }
            } else {
                util.walkAroundInRoom(creep);
                // console.log(creep.name + 'cannot find a structure!');
            }
        } else {
            var source = Game.getObjectById(creep.memory.source);
            var container = source.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                filter: (s) => (s.structureType == STRUCTURE_CONTAINER && s.store['energy'] > 0)
            });
            if (!container) {
                container = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                    filter: (s) => (s.structureType == STRUCTURE_CONTAINER)
                });
            }
            if (creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(container, { visualizePathStyle: { stroke: constants.STROKE_COLOR.LORRY } });
            }
        }
    }

}

module.exports = roleLorry;