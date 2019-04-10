/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('util');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
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
        var hash = this.getHashCode(creep.id);
        var index = (hash % targets.length);
        return targets[index];
    }

};