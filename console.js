function Console() {
    this.data = "Console";
    this.logs = [];
    this.append = function (s) {
        this.logs.push(s);
    };
    this.log = function () {
        if (this.logs) {
            this.logs.forEach(e => console.log('[LOG]' + e));
        }
    };
    this.clear = function () {
        this.logs = [];
    };
}

Console.getInstance = (function () {
    var instance;
    return function () {
        instance = instance ? instance : new Console;
        return instance;
    }
})();

module.exports = Console.getInstance();