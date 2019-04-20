var roleScout = require('./role.scout');

module.exports = {
    exeTempJpb: function () {
        var structureSpawn = Game.spawns[constants.MY_SPAWN_NAMES[0]];
        structureSpawn.spawnCreep(roleScout.body(),
            roleScout.newName(),
            { memory: { role: 'repairer' } }
        );
    }
};