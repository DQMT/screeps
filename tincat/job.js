
module.exports = {
    exeTempJpb: function () {
        var creep = Game.creeps['Upgrader@1_6110940'];
        if (creep.signController(creep.room.controller, "Leave me alone, please.") == ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller);
            creep.memory.busy=true;
            return;
        }
    }
};