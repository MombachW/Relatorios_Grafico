document.getElementById('filterForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const id = document.getElementById('nome').value;
    const data = document.getElementById('data').value;
    fetchAmbientesData(id, data);
});

let chart;

//função que cria o gráfico
function initializeChart() {
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

// chamar dados pelo id e data
function fetchAmbientesData(id, data) {
    const url = `http://localhost:3000/Ambientes/Filtro/${id}?data=${encodeURIComponent(data)}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const ambientes = data.map(amb => `
                <li>
                    ${amb.Nome_Ambiente} - 
                    Temp: ${amb.PV_Temp} / ${amb.SP_Temp}, 
                    Umi: ${amb.PV_Umi} / ${amb.SP_Umi}, 
                    Data: ${amb.Data_Inserido} 
                    Hora: ${amb.Hora}
                </li>`).join('');
            //document.getElementById('ambientesList').innerHTML = `<ul>${ambientes}</ul>`;

            updateChartData(chart, data);
        })
        .catch(error => {
            console.error(error);
        });
}

// função que atualiza dados no grafico
function updateChartData(chart, data) {
    const horas = data.map(amb => amb.Hora);
    const pvsTemp = data.map(amb => amb.PV_Temp);
    const spsTemp = data.map(amb => amb.SP_Temp);
    const pvsUmi = data.map(amb => amb.PV_Umi);
    const spsUmi = data.map(amb => amb.SP_Umi);

    chart.data.labels = horas;
    chart.data.datasets[0].data = pvsTemp;
    chart.data.datasets[1].data = spsTemp;
    chart.data.datasets[2].data = pvsUmi;
    chart.data.datasets[3].data = spsUmi;
    chart.update();
}

//função que usa o quickchart para obter uma imagem do grafico
function getChartUrl() {
    const chartConfig = {
        type: 'line',
        data: chart.data,
        options: chart.options
    };

    const url = `https://quickchart.io/chart?c=${encodeURIComponent(JSON.stringify(chartConfig))}`;
    return url;
}

//função que gera o pdf com o backend
function generatePdf() {
    const select = document.getElementById('nome'); // Obtém o elemento select
    const chartName = select.options[select.selectedIndex].text;
    const chartUrl = getChartUrl();
    window.open(`http://localhost:3000/pdf?chartUrl=${encodeURIComponent(chartUrl)}&chartName=${encodeURIComponent(chartName)}`);
}

document.getElementById('nome').addEventListener('input', function() {
    const input = this.value;

    if (input.length > 2) { // Somente pesquisar se houver mais de 2 caracteres
        fetch(`http://localhost:3000/search?term=${encodeURIComponent(input)}`)
            .then(response => response.json())
            .then(data => {
                const suggestions = document.getElementById('suggestions');
                suggestions.innerHTML = '';
                let dataArray = Object.values(data)
                dataArray.forEach(item => {
                    const li = document.createElement('li');
                    li.textContent = item.nome;
                    suggestions.appendChild(li);
                });
            })
            .catch(error => console.error('Error fetching data:', error));
    }
});


// Inicializa o gráfico ao carregar a página
window.onload = initializeChart;
