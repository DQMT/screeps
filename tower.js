var tower = {
    defendOrRepair: function (roomName) {
        var hostiles = Game.rooms[roomName].find(FIND_HOSTILE_CREEPS);
        if (hostiles.length > 0) {
            var username = hostiles[0].owner.username;
            Game.notify(`User ${username} spotted in room ${roomName}`);
            var towers = Game.rooms[roomName].find(
                FIND_MY_STRUCTURES, { filter: { structureType: STRUCTURE_TOWER } });
            towers.forEach(tower => tower.attack(hostiles[0]));
        } else {
            var damagedStructures = Game.rooms[roomName].find(FIND_STRUCTURES, {
                filter: object => (object.structureType != STRUCTURE_WALL && object.hits < object.hitsMax)
                    || (object.structureType == STRUCTURE_WALL && object.hits < 15000)
            });
            if (damagedStructures.length > 0) {
                var towers = Game.rooms[roomName].find(
                    FIND_MY_STRUCTURES, { filter: { structureType: STRUCTURE_TOWER } });
                towers.forEach(tower => tower.repair(damagedStructures[0]));
            }

        }
    }
}

module.exports = tower;