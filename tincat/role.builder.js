var constants = require('./constants');
var util = require('./util');


var roleBuilder = {
    level: function () {
        return 3;
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
        return 'Builder@' + this.level() + '_' + Game.time;
    },

    run: function (creep) {
        if (creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('harvest');
        }
        if (!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
            creep.say('building');
        }
        if (creep.memory.building) {
            var structure;
            if (creep.memory.target) {
                structure = Game.getObjectById(creep.memory.target);
            } else {
                structure = creep.pos.findClosestByPath(FIND_MY_CONSTRUCTION_SITES);
            }
            if (structure != undefined) {
                if (creep.build(structure) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(structure, { visualizePathStyle: { stroke: constants.STROKE_COLOR.BUILD } });
                }
            } else {
                if (creep.memory.roomName && creep.room.name != creep.memory.roomName) {
                    util.moveToRoom(creep, creep.memory.roomName);
                } else {
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
                util.moveToAnotherRoom(creep);
                return;
            }
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, { visualizePathStyle: { stroke: constants.STROKE_COLOR.HARVEST } });
            }
        }
    }

}

module.exports = roleBuilder;