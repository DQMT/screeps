/*
 *  system config
 */

module.exports = {
    init: function () {
        if (!Memory.system) {
            var system = {};
            system['home'] = 'W5S37';
            var limits = {
                workers: 10,
                lorries: 1
            }
            system['limits'] = limits;
            Memory.system = system;
        }
    },
    homeRoom: function () {
        return Game.rooms[system['home']];
    },
    cleanMemory: function () {
        for (var name in Memory.creeps) {
            if (!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }
    }
};