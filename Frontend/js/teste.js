import {Chart, registerables} from 'chart.js';

Chart.register(...registerables);


function initializeChart() {
    console.log("abriu");
    const ctx = document.getElementById('ambientesChart').getContext('2d');
    if (!chart) {
        chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [],
                datasets: [
                    {
                        label: 'PV Temp',
                        data: [],
                        borderColor: 'rgba(0, 255, 0, 1)',
                        backgroundColor: 'rgba(0, 255, 0, 0.2)',
                        fill: false,
                    },
                    {
                        label: 'SP Temp',
                        data: [],
                        borderColor: 'rgba(255,102,0, 1)',
                        backgroundColor: 'rgba(255,102,0, 0.2)',
                        fill: false,
                    },
                    {
                        label: 'PV Umi',
                        data: [],
                        borderColor: 'rgba(0, 212, 2, 1)',
                        backgroundColor: 'rgba(0, 212, 2, 0.2)',
                        fill: false,
                    },
                    {
                        label: 'SP Umi',
                        data: [],
                        borderColor: 'rgba(0, 128, 128, 1)',
                        backgroundColor: 'rgba(0, 128, 128, 0.2)',
                        fill: false,
                    },
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Horario'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Valores'
                        }
                    }
                }
            }
        });
    }
}


window.onload = initializeChart;