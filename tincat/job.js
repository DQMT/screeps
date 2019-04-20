var roleScout = require('./role.scout');
var constants = require('./constants');

module.exports = {
    exeTempJpb: function () {
        // var structureSpawn = Game.spawns[constants.MY_SPAWN_NAMES[0]];
        // structureSpawn.spawnCreep(roleScout.body(),
        //     roleScout.newName(),
        //     { memory: { role: 'scout' } }
        // );
        
        var scouts = _.filter(Game.creeps, (creep) => creep.memory.role == 'scout');
        scouts.forEach(element => {
            element.memory.roomName='E48N38';
            element.moveTo(47,18);
        });
    }
};