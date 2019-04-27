var constants = require('./constants');
var system = require('./system');
var util = require('./util');


var roleUpgrader = {
    level: function () {
        return 2;
    },
    cost: function () {
        return 200 * this.level();
    },
    body: function () {
        var body = [];
        var level = this.level();
        for (var i = 0; i < level; i++) {
            body.push(WORK);
        }
        for (var i = 0; i < level; i++) {
            body.push(CARRY);
        }
        for (var i = 0; i < level; i++) {
            body.push(MOVE);
        }
        return body;
    },
    newName: function () {
        return 'Upgrader@' + this.level() + '_' + Game.time;
    },

    run: function (creep) {
        if (creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
            creep.say('harvest');
        }
        if (!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
            creep.memory.upgrading = true;
            creep.say('upgrade');
        }
        if (creep.memory.upgrading) {
            var structure;
            if (creep.memory.target) {
                structure = Game.getObjectById(creep.memory.target);
            } else {
                structure = creep.room.controller;
            }
            if (structure != undefined) {
                if (creep.upgradeController(structure) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(structure, { visualizePathStyle: { stroke: constants.STROKE_COLOR.UPGRADE } });
                }
            } else {
                console.log(creep.name + 'cannot find a structure!');
                util.moveToAnotherRoom(creep);
            }
        } else {
            var source;
            if (creep.memory.source) {
                source = Game.getObjectById(creep.memory.source);
            } else {
                source = creep.pos.findClosestByPath(FIND_SOURCES, {
                    filter: s.energy > 0
                });
            }
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, { visualizePathStyle: { stroke: constants.STROKE_COLOR.HARVEST } });
            }
        }
    }
}

module.exports = roleUpgrader;