var system = require('./system');

module.exports.loop = function () {
    system.init();
    system.cleanMemory();

    watchdog.watch();
    supervisor.keepSpawning();
    supervisor.keepDefence();
    supervisor.urge();

    // var creep = Game.creeps['cla'];
    // var target = creep.room.controller;
    // if (creep.reserveController(target) == ERR_NOT_IN_RANGE) {
    //     creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
    // }
}