/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('util');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
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
        // var rooms = [];
        // Memory.system['bases'].forEach(base => {
        //     rooms.push(base);
        // });
        // Memory.system['colonies'].forEach(colony => {
        //     rooms.push(colony);
        // });

    },
    moveToRoom: function (creep, roomName) {
        if (creep.room.name != roomName) {
            var exit = creep.room.findExitTo(roomName);
            creep.moveTo(creep.pos.findClosestByRange(exit));
        }
    }
};