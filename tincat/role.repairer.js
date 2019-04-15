var constants = require('./constants');
var util = require('./util');


var roleRepairer = {
    level: function () {
        return 1;
    },
    cost: function () {
        return 350;
    },
    body: function () {
        return [WORK, CARRY, CARRY, MOVE, MOVE, MOVE];
    },
    newName: function () {
        return 'Repairer@' + this.level() + '_' + Game.time;
    },

    run: function (creep) {
        if (creep.memory.repairing && creep.carry.energy == 0) {
            creep.memory.repairing = false;
            creep.say('harvest');
        }
        if (!creep.memory.repairing && creep.carry.energy == creep.carryCapacity) {
            creep.memory.repairing = true;
            creep.say('repair');
        }
        if (creep.memory.repairing) {
            var structure;
            if (creep.memory.target) {
                structure = Game.getObjectById(creep.memory.target);
            } else {
                structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: object => (object.structureType != STRUCTURE_WALL && object.structureType != STRUCTURE_RAMPART && object.hits < object.hitsMax)
                        || (object.structureType == STRUCTURE_WALL && object.hits < 10000)
                        || (object.structureType == STRUCTURE_RAMPART && object.hits < 10000)
                });
            }
            if (structure != undefined) {
                if (creep.repair(structure) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(structure, { visualizePathStyle: { stroke: constants.STROKE_COLOR.BUILD } });
                }
            } else {
                if (creep.memory.roomName && creep.room.name != creep.memory.roomName) {
                    util.moveToRoom(creep, creep.memory.roomName);
                } else {
                    util.beforeMoveToAnotherRoom(creep);
                    util.moveToAnotherRoom(creep);
                }
                return;
            }
        } else {
            var source;
            if (creep.memory.source) {
                source = Game.getObjectById(creep.memory.source);
            } else {
                source = creep.pos.findClosestByPath(FIND_SOURCES, {
                    filter: s => s.energy > 0
                });
            }
            if (!source) {
                util.beforeMoveToAnotherRoom(creep);
                util.moveToAnotherRoom(creep);
                return;
            }
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, { visualizePathStyle: { stroke: constants.STROKE_COLOR.HARVEST } });
            }
        }
    }

}

module.exports = roleRepairer;