var constants = require('./constants');
var util = require('./util');
var system = require('./system');


var roleBuilder = {
    level: function () {
        return 2;
    },
    cost: function () {
        return 300 * this.level();
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
            if (creep.memory.source) {
                var source = Game.getObjectById(creep.memory.source);
                if (source && source.room.name != creep.room.name) {
                    source = creep.pos.findClosestByPath(FIND_SOURCES);
                    system.unbindSource(creep.memory.source);
                    system.bindSource(source.id);
                }
            }
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
                structure = util.findMySite();
                if (structure) {
                    util.moveToRoom(creep, structure.room.name);
                    return;
                }
                // console.log(creep.name + 'cannot find a structure!');
                if (system.canUpgrade(creep)) {
                    var controller = creep.room.controller;
                    creep.say('upgrade!');
                    if (creep.upgradeController(controller) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(controller, { visualizePathStyle: { stroke: constants.STROKE_COLOR.UPGRADE } });
                    }
                    return;
                }
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
                source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE, {
                    filter: s => s.energy > 0
                });
            }
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

module.exports = roleBuilder;