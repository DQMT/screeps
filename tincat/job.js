
module.exports = {
    exeTempJpb: function () {
        if (creep.name == 'Upgrader@1_6110940') {
            if (creep.signController(creep.room.controller, "Leave me alone, please.") == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
                return;
            }
        }
    }
};