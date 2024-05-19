document.getElementById('getAmbienteByIdForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const id = document.getElementById('ambienteId').value;
    fetch(`http://localhost:3000/Ambientes/${id}`)
    .then(response => response.json())
    .then(data => {
        if (data.length > 0) {
            const ambiente = data[0];
            document.getElementById('ambienteDetails').innerText = `Detalhes do Ambiente: Nome: ${ambiente.Nome_Ambiente}, PV Temp: ${ambiente.PV_Temp}, SP Temp: ${ambiente.SP_Temp}, PV Umi: ${ambiente.PV_Umi}, SP Umi: ${ambiente.SP_Umi}, Data e Hora: ${ambiente.Data_Hora}`;
        } else {
            document.getElementById('ambienteDetails').innerText = 'Ambiente não encontrado';
        }
    })
    .catch(error => {
        document.getElementById('ambienteDetails').innerText = 'Erro ao buscar o ambiente: ' + error;
    });
});

function fetchAmbientes() {
    fetch('http://localhost:3000/Ambientes')
    .then(response => response.json())
    .then(data => {
        const ambientes = data.map(amb => `<li>${amb.Nome_Ambiente} - Temp: ${amb.PV_Temp} / ${amb.SP_Temp}, Umi: ${amb.PV_Umi} / ${amb.SP_Umi}, Data: ${amb.Data_Hora}</li>`).join('');
        document.getElementById('ambientesList').innerHTML = `<ul>${ambientes}</ul>`;
    })
    .catch(error => {
        document.getElementById('ambientesList').innerText = 'Erro ao buscar ambientes: ' + error;
    });
}

// Carregar ambientes ao carregar a página
window.onload = fetchAmbientes;
