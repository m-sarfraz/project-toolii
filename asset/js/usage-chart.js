// Usage Overview Chart Implementation
document.addEventListener('DOMContentLoaded', function () {
    const ctx = document.getElementById('usageChart');

    if (!ctx) return;

    // Generate wavy data similar to the screenshot
    const generateWavyData = (baseValue, amplitude, points) => {
        const data = [];
        for (let i = 0; i < points; i++) {
            const wave1 = Math.sin(i * 0.5) * amplitude;
            const wave2 = Math.sin(i * 0.3 + 1) * (amplitude * 0.5);
            const noise = (Math.random() - 0.5) * (amplitude * 0.3);
            data.push(baseValue + wave1 + wave2 + noise);
        }
        return data;
    };

    const labels = ['1/9', '2/9', '3/9', '4/9', '5/9', '6/9', '7/9', '8/9', '9/9', '10/9', '11/9', '12/9'];

    // Existing lines
    const upperLineData = generateWavyData(750, 80, 12);
    const lowerLineData = generateWavyData(550, 40, 12);

    // 🔥 NEW — Error line data
    const errorLineData = generateWavyData(300, 30, 12);

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Total Usage',
                    data: upperLineData,
                    borderColor: '#8b5cf6',
                    backgroundColor: 'rgba(139, 92, 246, 0.1)',
                    borderWidth: 2,
                    tension: 0.4,
                    pointRadius: 0,
                    pointHoverRadius: 4,
                    pointHoverBackgroundColor: '#8b5cf6',
                    pointHoverBorderColor: '#fff',
                    pointHoverBorderWidth: 2,
                    fill: false
                },
                {
                    label: 'Allocated Usage',
                    data: lowerLineData,
                    borderColor: '#c4b5fd',
                    backgroundColor: 'rgba(196, 181, 253, 0.1)',
                    borderWidth: 2,
                    tension: 0.4,
                    pointRadius: 0,
                    pointHoverRadius: 4,
                    pointHoverBackgroundColor: '#c4b5fd',
                    pointHoverBorderColor: '#fff',
                    pointHoverBorderWidth: 2,
                    fill: false
                },

                // 🔥 NEW ERROR LINE (RED)
                {
                    label: 'Errors',
                    data: errorLineData,
                    borderColor: '#ef4444', // red-500
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    borderWidth: 2,
                    tension: 0.4,
                    pointRadius: 0,
                    pointHoverRadius: 4,
                    pointHoverBackgroundColor: '#ef4444',
                    pointHoverBorderColor: '#fff',
                    pointHoverBorderWidth: 2,
                    fill: false
                }
            ]
        },

        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                intersect: false,
                mode: 'index'
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    titleColor: '#111827',
                    bodyColor: '#6b7280',
                    borderColor: '#e5e7eb',
                    borderWidth: 1,
                    padding: 12,
                    displayColors: true,
                    callbacks: {
                        label: function (context) {
                            return context.dataset.label + ': ' + Math.round(context.parsed.y);
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 1000,
                    ticks: {
                        stepSize: 200,
                        color: '#6b7280',
                        font: { size: 12 },
                        callback: function (value) {
                            return value.toLocaleString();
                        }
                    },
                    grid: {
                        color: '#f5f5f5',
                        drawBorder: false
                    }
                },
                x: {
                    ticks: {
                        color: '#6b7280',
                        font: { size: 12 }
                    },
                    grid: {
                        display: false,
                        drawBorder: false
                    }
                }
            }
        }
    });
});
