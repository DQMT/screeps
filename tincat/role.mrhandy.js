var util = require('./util');
var constants = require('./constants');
var system = require('./system');

var roleMrhandy = {
    level: function () {
        return 1;
    },
    cost: function () {
        return 350 * this.level();
    },
    body: function () {
        var body = [];
        var level = this.level();
        for (var i = 0; i < level; i++) {
            body.push(WORK);
        }
        for (var i = 0; i < level; i++) {
            body.push(CARRY);
            body.push(CARRY);
        }
        for (var i = 0; i < level; i++) {
            body.push(MOVE);
            body.push(MOVE);
            body.push(MOVE);
        }
        return body;
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
            if (!container) {
                container = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                    filter: (s) => (s.structureType == STRUCTURE_SPAWN
                        || s.structureType == STRUCTURE_EXTENSION
                        || s.structureType == STRUCTURE_TOWER)
                        && s.energy < s.energyCapacity
                });
            }
            if (container) {
                if (creep.transfer(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(container, { visualizePathStyle: { stroke: constants.STROKE_COLOR.LORRY } });
                }
                return;
            }
            if (system.singleRoom()) {
                util.walkAroundInRoom(creep);
                return;
            }
            if (creep.memory.roomName && creep.room.name != creep.memory.roomName) {
                util.moveToRoom(creep, creep.memory.roomName);
            } else {
                util.moveToAnotherRoom(creep);
            }
            return;
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
            var container = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                filter: (s) => (s.structureType == STRUCTURE_CONTAINER)
                    && s.energy < s.energyCapacity
            });
            if (system.singleRoom()) {
                util.walkAroundInRoom(creep);
            } else {
                util.moveToAnotherRoom(creep);
            }
        }
    },


}
module.exports = roleMrhandy;