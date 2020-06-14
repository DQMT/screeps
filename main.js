var roleUpgrader = require('./upgrader');

module.exports.loop = function () {
    let creepCount = Object.getOwnPropertyNames(Game.creeps).length;
    Memory.creepCount = creepCount;
    console.log('we have '+ Memory.creepCount  + ' creeps!');
    Game.spawns['Hospital1'].spawnCreep([WORK, CARRY, MOVE], 'Worker'+ Game.time);
    for(const i in Game.creeps) {
        roleUpgrader.run(Game.creeps[i]);
    }
   
}