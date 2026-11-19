async function updateMetrics() {
    try {
        const stats = await window.tracky.getSystemStats();

        document.getElementById("cpu-value").textContent = stats.cpu;
        document.getElementById("ram-value").textContent = stats.ram;
    } catch (error) {
        console.error("Failed to retrieve system stats:", error);
    }
}

updateMetrics();
setInterval(updateMetrics, 1000);