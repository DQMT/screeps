var constants = require('./constants');
var system = require('./system');



var roleUpgrader = {
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
                var bases = system.baseRoomNames();
                console.log(bases);
                structure = Game.rooms[bases[0]].controller;
            }
            if (structure != undefined) {
                if (creep.upgradeController(structure) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(structure, { visualizePathStyle: { stroke: constants.STROKE_COLOR.UPGRADE } });
                }
            } else {
                console.log(creep.name + 'cannot find a structure!');
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