var constants = require('./constants');
var util = require('./util');
var system = require('./system');

var roleHarvester = {
    level: function () {
        return 3;
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
        return 'Harvester@' + this.level() + '_' + Game.time;
    },
    enough: function () {
        return Memory.watch['harvesters'] > 4 || Memory.watch['harvesters'] >= Memory.limits.harvesters;

    },
    run: function (creep) {
        if (creep.memory.updating) {
            if (creep.carry.energy == 0) {
                creep.memory.updating = false;
                creep.memory.transfering = false;
                creep.say('harvest');
                return;
            } else {
                var controller = creep.room.controller;
                creep.say('upgrade!');
                if (creep.upgradeController(controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(controller, { visualizePathStyle: { stroke: constants.STROKE_COLOR.UPGRADE } });
                }
                return;
            }
        }
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
            if (structure && structure.structureType == STRUCTURE_TOWER) {
                var nc = util.getNearestCreep(structure, 'harvester');
                if (nc.id != creep.id) {
                    structure = undefined;
                }
            }
            if (structure == undefined) {
                structure = creep.room.storage;
            }
            if (structure != undefined) {
                if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(structure);
                }
            } else {
                if (system.canUpgrade(creep)) {
                    creep.memory.updating = true;
                    return;
                }
                // console.log(creep.name + 'cannot find a structure!');
                util.moveToRoom(creep, system.baseRoomNames()[0]);
            }
        } else {
            var source = Game.getObjectById(creep.memory.source);
            if (!source) {
                util.moveToAnotherRoom(creep);
                return;
            }
            if (source.energy == 0) {
                source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
            }
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, { visualizePathStyle: { stroke: constants.STROKE_COLOR.HARVEST } });
            }
        }
    }

}

module.exports = roleHarvester;