const { execFile } = require("child_process");

function getGPUUsage() {
    return new Promise((resolve, reject) => {
        const script = `
            $samples = (Get-Counter '\\GPU Engine(*)\\Utilization Percentage').CounterSamples
            
            $usage = $samples |
                Where-Object {
                    $_.InstanceName -match 'luid_0x00000000_0x0000f9d7' -and
                    $_.InstanceName -match 'engtype_3d$'
                } |
                Measure-Object -Property CookedValue -Sum
                
            [math]::Round($usage.Sum, 2)
        `;

        execFile(
            "powershell.exe",
            ["-NoProfile", "-NonInteractive", "-Command", script],
            { timeout: 15000 },
            (error, stdout, stderr) => {
                if (error) {
                    console.error("Powershell stderr:", stderr);
                    console.error("Powershell error:", error);
                    reject(error);
                    return;
                }

                const output = stdout.trim();

                if(!output) {
                    reject(new Error("PowerShell returned empty GPU data"));
                    return;
                }

                const usage = Number(output);

                if (!Number.isFinite(usage)) {
                    reject(new Error(`Invalid GPU usage value: ${output}`));
                    return;
                }

                resolve(Math.min(100, Math.max(0, usage)));
            }
        );
    });
}

module.exports = { getGPUUsage };