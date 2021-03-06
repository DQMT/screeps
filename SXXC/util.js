/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('util');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
    init: function (param) {
        if (!Memory.log) {
            Memory.log = [];
        }
        if (!Memory.limits) {
            var limits;
            if (!param) {
                limits = {
                    harvesters: 3,
                    upgraders: 3,
                    builders: 3,
                    lorries: 1
                }
            } else {
                limits = param;
            }
            Memory.limits = limits
        }
        if (!Memory.sourceManage) {
            Memory.sourceManage = {
            }
            Object.keys(Game.rooms).forEach(key => {
                console.log(key);
                var sources = Game.rooms[key].find(FIND_SOURCES);
                var obj = {};
                sources.forEach(source => {
                    console.log('room = ' + key + ' source = ' + JSON.stringify(source));
                    obj[source.id] = 0;
                })
                Memory.sourceManage[key] = obj;
            });
        }
    },
    setLimits: function (limits) {
        Memory.limits = limits;
    },
    setLimit: function (item, limit) {
        console.log('setLimit : ' + item + ' = ' + limit);
        Memory.limits[item] = limit;
    },
    decreaseLimit(item) {
        console.log('decreaseLimit : ' + item);
        var val = Memory.limits[item] - 1;
        Memory.limits[item] = val > 0 ? val : 0;
    },
    decreaseLimitTo1(item) {
        console.log('decreaseLimitTo1 : ' + item);
        var val = Memory.limits[item] - 1;
        Memory.limits[item] = val > 1 ? val : 1;
    },
    increaseLimit(item) {
        console.log('increaseLimit : ' + item);
        var val = Memory.limits[item] + 1;
        Memory.limits[item] = val < 5 ? val : 5;
    },
    randomNum: function (minNum, maxNum) {
        switch (arguments.length) {
            case 1:
                return parseInt(Math.random() * minNum + 1, 10);
                break;
            case 2:
                return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
                break;
            default:
                return 0;
                break;
        }
    },
    getHashCode: function (str, caseSensitive) {
        if (!caseSensitive) {
            str = str.toLowerCase();
        }
        var hash = 1315423911, i, ch;
        for (i = str.length - 1; i >= 0; i--) {
            ch = str.charCodeAt(i);
            hash ^= ((hash << 5) + ch + (hash >> 2));
        }
        return (hash & 0x7FFFFFFF);
    },

    /** @param {Creep} creep **/
    nearestSource: function (creep) {
        var sources = creep.room.find(FIND_SOURCES);
    },

    /** @param {Creep} creep **/
    getHashedTarget: function (creep, targets) {
        if (creep && creep.id) {
            var hash = this.getHashCode(creep.id);
            var index = (hash % targets.length);
            return targets[index];
        }
        return null;

    },
    getMostFreeSourceId: function (creep) {
        var sourceMap = Memory.sourceManage[creep.room.id];
        var sourceId;
        var min = 10000;
        Object.keys(sourceMap).forEach(key => {
            if (sourceMap[key] < min) {
                sourceId = key;
                min = sourceMap[key];
            }
        });
        sourceMap[sourceId] = min + 1;
        Memory.sourceManage[creep.room.id] = sourceMap;
        return sourceId;
    },

    getMostFreeSource: function (creep) {
        return Game.getObjectById(getMostFreeSourceId(creep));
    },

    increaseFreeTicks: function (creep) {
        if (!creep.memory.freeTicks) {
            creep.memory.freeTicks = 1;
        } else {
            creep.memory.freeTicks = creep.memory.freeTicks + 1;
        }
    },

    resetFreeTicks: function (creep) {
        creep.memory.freeTicks = 0;
    },

    isFree: function (creep, tolerance) {
        if (!tolerance) {
            tolerance = 10;
        }
        return creep.memory.freeTicks > tolerance;
    },
    needEnergy: function (structrue) {
        if (!structrue) {
            return false;
        }
        if (structrue.energy != null && structrue.energy != undefined) {
            return structrue.energy < structrue.energyCapacity;
        }
        return structrue.store['energy'] < structrue.storeCapacity;
    },
    getEnergySources: function (creep, colony) {
        if(!colony){
            var ss = ['5bbcac9d9099fc012e635dc9','5bbcac9d9099fc012e635dca','5bbcacae9099fc012e63600f','5bbcacae9099fc012e636010'];
            var targets = [];
            ss.forEach(s=>targets.push(Game.getObjectById(s)));
            return targets;
        }
        if (colony && Game.rooms['W5S38']) {
            if (Game.rooms['W5S38']) {
                targets = Game.rooms['W5S38'].find(FIND_SOURCES, {
                    filter: (source) => {
                        return source.energy > 0;
                    }
                });
            }
            if (!targets.length > 0) {
                targets = creep.room.find(FIND_SOURCES, {
                    filter: (source) => {
                        return source.energy > 0;
                    }
                });
            }
            return targets;
        } else {
            targets = creep.room.find(FIND_SOURCES, {
                filter: (source) => {
                    return source.energy > 0;
                }
            });
            if (Game.rooms['W5S38']) {
                if (!targets || targets.length == 0) {
                    targets = Game.rooms['W5S38'].find(FIND_SOURCES, {
                        filter: (source) => {
                            return source.energy > 0;
                        }
                    });
                    if (targets.length > 0) {
                        creep.say('long distance source!');
                    }
                }
            }
            return targets;
        }

    },
    moveToAnotherRoom: function (creep) {
        var currentRoom = creep.room.name;
        switch (currentRoom) {
            case 'W5S37':
                this.moveToRoom(creep, 'W4S37');
                break;
            case 'W4S37':
                this.moveToRoom(creep, 'W5S38');
                break;
            case 'W5S38':
                this.moveToRoom(creep, 'W5S37');
                break;
        }
    },
    moveToRoom: function (creep, roomName) {
        if (creep.room.name != roomName) {
            var exit = creep.room.findExitTo(roomName);
            creep.moveTo(creep.pos.findClosestByRange(exit));
        }
    }
};