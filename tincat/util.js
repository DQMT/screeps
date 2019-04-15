/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('util');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
    findIndexInArray: function (array, item) {
        for (var i = 0; i < array.length; i++) {
            if (array[i] == item) {
                return i;
            }
        }
        return -1;
    },
    findNextInArray: function (array, item) {
        var i = this.findIndexInArray(array, item);
        if (i < array.length - 1) {
            return array[i + 1];
        } else {
            return array[0];
        }
    },
    moveToAnotherRoom: function (creep) {
        if (creep.memory.endRoom) {
            this.moveToRoom(creep, endRoom);
            return;
        }
        var rooms = ['W4S37', 'W5S38', 'W5S37'];
        var startRoom = creep.room.name;
        var endRoom = this.findNextInArray(rooms, startRoom);
        creep.memory.endRoom = endRoom;
        this.moveToRoom(creep, endRoom);
    },
    moveToRoom: function (creep, roomName) {
        if (creep.room.name != roomName) {
            var exit = creep.room.findExitTo(roomName);
            creep.moveTo(creep.pos.findClosestByRange(exit));
        }
    }
};