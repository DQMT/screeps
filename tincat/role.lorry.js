var constants = require('./constants');
var util = require('./util');
var system = require('./system');

/**
 * A driller
 * body part need: [WORK,WORK,CARRY, MOVE]
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
            if (structure == undefined) {
                structure = creep.room.storage;
            }
            if (structure != undefined) {
                if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(structure);
                }
            } else {
                util.moveToRoom(creep, system.baseRoomNames()[0]);
                // console.log(creep.name + 'cannot find a structure!');
            }
        } else {
            var container = Game.getObjectById(creep.memory.container);
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