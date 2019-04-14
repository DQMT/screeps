/*
 *  system config
 */

module.exports = {
    clear: function () {
        Memory.system = undefined;
    },
    /**
     * 
     * @param {*} rooms 
     * @param {*} colonies 
     */
    init: function (rooms, colonies) {
        if (!Memory.system) {
            var system = {};
            system['rooms'] = rooms;
            system['colonies'] = [];
            var limits = {
                workers: 10,
                lorries: 1
            }
            system['limits'] = limits;
            system['sources'] = [];
            if (colonies) {
                system['colonies'] = colonies;
            }
            Memory.system = system;
        }
    },

    registerSources: function () {
        var sources = [];
        var homeSources = Game.rooms[Memory.system['home']].find(FIND_SOURCES);
        for (var i = 0; i < homeSources.length; i++) {
            var resource = {};
            resource[homeSources[i]['id']] = 0;
            sources.push(resource);
        }
        var colonySources = [];
        Memory.system['sources'] = sources;
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