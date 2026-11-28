const si = require("systeminformation");

async function getGPUInfo() {
    const graphics = await si.graphics();

    return graphics.controllers
        .filter(gpu => gpu.vendor && gpu.bus === "PCI")
        .map(gpu => ({
            name: gpu.model || "Unknown GPU",
            vendor: gpu.vendor,
            vram: gpu.vram,
            vramDynamic: gpu.vramDynamic
        }));
}

async function getSystemStats() {
    const cpu = await si.currentLoad();
    const memory = await si.mem();
    const network = await si.networkStats()

    const download = network.reduce(
        (total, adapter) => total + (adapter.rx_sec || 0), 0
    );

    const upload = network.reduce(
        (total, adapter) => total + (adapter.tx_sec || 0), 0
    );

    return {
        cpu: Math.round(cpu.currentLoad),
        ram: Math.round((memory.used / memory.total) * 100),
        download: download,
        upload: upload
    };
}

module.exports = { getSystemStats, getGPUInfo };