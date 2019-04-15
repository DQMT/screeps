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
    fixEdge(creep) {
        if (creep.pos.y == 0 || creep.pos.y == 0 || creep.pos.y == 0 || creep.pos.y == 0) {
            creep.move(BOTTOM);
            return;
        }
    },
    moveToAnotherRoom: function (creep) {

        if (creep.memory.endRoom && creep.memory.endRoom != creep.room.name) {
            // console.log('endRoom = '+creep.memory.endRoom+' now = '+creep.room.name);
            if (Game.rooms[creep.memory.endRoom]) {
                creep.moveTo(Game.rooms[creep.memory.endRoom].controller);
            } else {
                this.moveToRoom(creep, creep.memory.endRoom);
            }
            return;
        }
        // console.log('endRoom = '+creep.memory.endRoom+' now = '+creep.room.name);
        var rooms = ['W4S37', 'W5S38', 'W5S37'];
        var startRoom = creep.room.name;
        var endRoom = this.findNextInArray(rooms, startRoom);
        creep.memory.endRoom = endRoom;
        creep.moveTo(Game.rooms[creep.memory.endRoom].controller);
        // this.moveToRoom(creep, endRoom);
    },
    moveToRoom: function (creep, roomName) {
        if (creep.room.name != roomName) {
            var exit = creep.room.findExitTo(roomName);
            creep.moveTo(creep.pos.findClosestByRange(exit));
        }
    }
};