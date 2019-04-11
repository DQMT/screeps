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
        var state = {
            0: 'harvest',
            1: 'upgrade',
            1: 'build',
        }
        for(var name in Memory.creeps) {
            if(Game.creeps[name]) {
                var old = Game.creeps[name].roleState;
                var newState = state[old];
                console.log('old = '+old+ ' new ='+newState);
                Game.creeps[name].state=newState;
            }
        }

        if (!Memory.limits) {
            var limits;
            if (!param) {
                limits = {
                    harvesters: 3,
                    upgraders: 3,
                    builders: 3
                }
            } else {
                limits = param;
            }
            Memory.limits = limits
        }
        if (!Memory.sourceManage) {
            console.log(JSON.stringify(Game.rooms));
            Memory.sourceManage = {

            }
            Object.keys(Game.rooms).forEach(key=>{
                // Memory.sourceManage
            });
            
        }
    },
    setLimits: function (limits) {
        Memory.limits = limits;
    },
    decreaseLimit(item) {
        var val = Memory.limits[item] - 1;
        Memory.limits[item] = val > 0 ? val : 0;
    },
    increaseLimit(item) {
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

    }

};