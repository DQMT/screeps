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
            var sources = [];
            //init source
            Memory.system['bases'].forEach(base => {
                var ss = Game.rooms[base].find(FIND_SOURCES);
                for (var i = 0; i < ss.length; i++) {
                    var resource = {
                        'id': ss[i]['id'],
                        'maxBinds': 3,
                        'binds': 0
                    };
                    sources.push(resource);
                }
            })
            Memory.system['colonies'].forEach(colony => {
                var ss = Game.rooms[colony].find(FIND_SOURCES);
                for (var i = 0; i < ss.length; i++) {
                    var resource = {
                        'id': ss[i]['id'],
                        'maxBinds': 3,
                        'binds': 0
                    };
                    sources.push(resource);
                }
            })
            Memory.system['sources'] = sources;
        }
    },
    bases: function () {
        var bases = [];
        Memory.system['bases'].forEach(b => bases.push(Game.rooms[b]));
        return bases;
    },
    colonyRoomNames:function(){
        return  Memory.system['colonies'];
    },
    availableStructureSpawns(needEnergy) {
        var need = needEnergy ? needEnergy : 0;
        var spawns = [];
        for (const i in Game.spawns) {
            var s = Game.spawns[i];
            if (!s.spawning && s.room.energyAvailable >= need) {
                spawns.push(s);
            }
        }
        return spawns;
    },
    availableSources: function () {
        var sources = [];
        Memory.system.sources.forEach(s => {
            if (s['binds'] < s['maxBinds']) {
                sources.push(s['id']);
            }
        })
        return sources;
    },
    bindSource: function (sourceId) {
        var sources = Memory.system['sources'];
        sources.forEach(s => {
            if (s['id'] == sourceId) {
                s['binds'] = s['binds'] + 1;
            }
        });
        Memory.system['sources'] = sources;
        console.log('add bind ' + sourceId);
        console.log('add bind ' + JSON.stringify(Memory.system['sources']));
    },
    unbindSource: function(sourceId){
        var sources = Memory.system['sources'];
        sources.forEach(s => {
            if (s['id'] == sourceId) {
                s['binds'] = s['binds'] - 1;
            }
        });
        Memory.system['sources'] = sources;
        console.log('remove bind ' + sourceId);
        console.log('remove bind ' + JSON.stringify(Memory.system['sources']));
    },
    cleanMemory: function () {
        for (var name in Memory.creeps) {
            if (!Game.creeps[name]) {
                var sourceId = Memory.creeps[name].source;
                this.unbindSource(sourceId);
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }
    }
};