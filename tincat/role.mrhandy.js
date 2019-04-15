var util = require('./util');
var constants = require('./constants');

var roleMrhandy = {
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
        return 'MrHandy@' + this.level() + '_' + Game.time;
    },
    /** @param {Creep} creep */
    run: function (creep) {
        if (creep.memory.recycling && creep.carry.energy == 0) {
            creep.memory.recycling = false;
            creep.say('DU,gathering!');

        }
        else if (!creep.memory.recycling && creep.carry.energy == creep.carryCapacity) {
            creep.memory.recycling = true;
            creep.say('DI,recycling!');
        }
        if (creep.memory.recycling) {
            var container = creep.room.storage;
            if (container) {
                if (creep.transfer(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(container, { visualizePathStyle: { stroke: constants.STROKE_COLOR.LORRY } });
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
            var target = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
            if (target) {
                creep.say('droppedEnergy!');
                if (creep.pickup(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, { visualizePathStyle: { stroke: constants.STROKE_COLOR.LORRY } });

                }
                return;
            }
            target = creep.pos.findClosestByRange(FIND_TOMBSTONES);
            if (target) {
                creep.say('tombstone!');//todo: other resource type
                if (creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, { visualizePathStyle: { stroke: constants.STROKE_COLOR.LORRY } });
                }
                return;
            }
            util.beforeMoveToAnotherRoom(creep);
            util.moveToAnotherRoom(creep);
            return;
        }
    }

}
module.exports = roleMrhandy;