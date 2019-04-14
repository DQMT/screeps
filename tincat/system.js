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
    init: function (bases, colonies) {
        if (!Memory.system) {
            var system = {};
            system['bases'] = bases;
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
        Memory.system['bases'].forEach(base => {
            var ss = Game.rooms[base].find(FIND_SOURCES);
            for (var i = 0; i < ss.length; i++) {
                var resource = {};
                resource[ss[i]['id']] = {
                    'maxBinds': 3, 'binds': 0
                };
                sources.push(resource);
            }
        })
        Memory.system['colonies'].forEach(base => {
            var ss = Game.rooms[base].find(FIND_SOURCES);
            for (var i = 0; i < ss.length; i++) {
                var resource = {};
                resource[ss[i]['id']] = {
                    'maxBinds': 3, 'binds': 0
                };
                sources.push(resource);
            }
        })
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