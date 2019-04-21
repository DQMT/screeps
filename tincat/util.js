var constants = require('./constants');

module.exports = {
    signWords: function () {
        return 'Fools die… as you well know.';
    },
    findIndexInArray: function (array, item) {
        for (var i = 0; i < array.length; i++) {
            if (array[i] == item) {
                return i;
            }
        }
        return -1;
    },
    removeInArray: function (array, item) {
        var n = [];
        array.forEach(e => {
            if (e != item) {
                n.push(e);
            }
        })
        return n;
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
        if (creep.memory.endRoom) {
            var er = Game.rooms[creep.memory.endRoom];
            if (er) {
                if (creep.signController(er.controller, constants.SIGN_WORDS) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(er.controller);
                    return;
                } else {
                    creep.memory.endRoom = undefined;
                    return;
                }
            }
            this.moveToRoom(creep, er);
        } else {
            var rooms = constants.MY_ROOM_NAMES;
            creep.memory.endRoom = this.findNextInArray(rooms, creep.room.name);
        }
    },
    moveToRoom: function (creep, roomName) {
        if (creep.room.name != roomName) {
            var exit = creep.room.findExitTo(roomName);
            creep.moveTo(creep.pos.findClosestByRange(exit));
        }
    },
    randomDirection: function () {
        var i = parseInt(8 * Math.random()) + 1;
        return i;

    },
    walkAroundInRoom: function (creep) {
        creep.move(this.randomDirection());
    }
};