const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("tracky", {
    getSystemStats: () => ipcRenderer.invoke("get-system-stats"),
    getGPUInfo: () => ipcRenderer.invoke("get-gpu-info"),
    getGPUUsage: () => ipcRenderer.invoke("get-gpu-usage")
});