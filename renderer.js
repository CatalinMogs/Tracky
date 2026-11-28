function formatSpeed(bytes) {
    if (bytes >= 1024 * 1024) {
        return (bytes / (1024 * 1024)).toFixed(2) + " MB/s";
    }

    if (bytes >= 1024) {
        return (bytes / 1024).toFixed(2) + " KB/s";
    }

    return Math.round(bytes) + " B/s"
}

async function updateMetrics() {
    try {
        const stats = await window.tracky.getSystemStats();

        document.getElementById("cpu-value").textContent = stats.cpu;
        document.getElementById("ram-value").textContent = stats.ram;
        document.getElementById("download-value").textContent = formatSpeed(stats.download);
        document.getElementById("upload-value").textContent = formatSpeed(stats.upload);
    } catch (error) {
        console.error("Failed to retrieve system stats:", error);
    }
}

async function testGPU() {
    try {
        const gpus = await window.tracky.getGPUInfo();

        console.log("Tracky GPU information:", gpus);
    } catch (error) {
        console.error("GPU detection failed:", error);
    }
}

testGPU();
updateMetrics();
setInterval(updateMetrics, 1000);