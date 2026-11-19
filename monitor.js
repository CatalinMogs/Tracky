const si = require("systeminformation");

async function getSystemStats() {
    const cpu = await si.currentLoad();
    const memory = await si.mem();

    return {
        cpu: Math.round(cpu.currentLoad),
        ram: Math.round((memory.used / memory.total) * 100)
    };
}

module.exports = { getSystemStats };