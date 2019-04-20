
module.exports = {
    job:function(){
        var creep = Game.creeps['Driller@1_6109124'];
        console.log(' i am builder now ');
        creep.memory.role= 'builder';
    }
};