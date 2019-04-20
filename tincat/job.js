var roleScout = require('./role.scout');
var constants = require('./constants');
var util = require('./util');

module.exports = {
    exeTempJpb: function () {
        // var structureSpawn = Game.spawns[constants.MY_SPAWN_NAMES[0]];
        // structureSpawn.spawnCreep(roleScout.body(),
        //     roleScout.newName(),
        //     { memory: { role: 'scout' } }
        // );

        var scouts = _.filter(Game.creeps, (creep) => creep.memory.role == 'scout');
        scouts.forEach(element => {
            element.memory.roomName = 'E48N38';
            element.moveTo(47, 18);
        });

        var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
        repairers.forEach(e => {
            e.memory.busy = true;
            if (e.room.name != 'E48N38') {
                util.moveToRoom(e, 'E48N38');
            }else{
                var target = Game.getObjectById('5cb9eb8264eeab642c5fb25b');
                e.dismantle(target);
            }
        });
        

    }
};