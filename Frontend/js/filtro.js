

function autoComplete(ambiente) {
    const ambientes = ['Antecâmara 01 Matéria Prima', 'Antecâmara 02 Matéria Prima', 'Antecâmara 03 Produto Acabado', 'Antecâmara 04 Produto Acabado', 'Área De Preparo 01',
        'Área De Preparo 02', 'Área Produção Empanados', 'Área Produção Hamburguer', 'Barreira Sanitária 01', 'Barreira Sanitária 02', 'Barreira Sanitária 03', 'Barreira Sanitária 04',
        'Caldeira', 'Câmara De Materia Prima 01', 'Câmara De Materia Prima 02', 'Câmara De Materia Prima 03', 'Câmara De Resfriamento Intermediário', 'Câmara Produto Acabado 01',
        'Câmara Produto Acabado 02', 'Câmara Produto Acabado 03', 'Corredor De Acesso Preparação De Massa', 'Corredor Lateral Produto Acabado', 'Cozinha Mezanino',
        'Depósito Embalagem Primária', 'Depósito Embalagem Secundária', 'Embalagem Primária Emp E Hamb', 'Embalagem Secundária Emp E Hamb 01', 'Embalagem Secundária Emp E Hamb 02',
        'Expedição 01 Produto Acabado', 'Expedição 02 Produto Acabado', 'Geradores', 'Girofreezer 01 Jbt', 'Girofreezer Madef', 'Preparação De Massa 01', 'Preparação De Massa 02',
        'Recebimento Matéria Prima 01', 'Refeitório Colorido', 'Refeitório Visitantes', 'Retirada De Resíduos', 'Sala De Descanso 01', 'Sala De Descanso 02', 'Sala De Descanso 03',
        'Sala De Descanso 04', 'Sala De Máquinas', 'Sala De Paineis 01', 'Sala De Paineis 02', 'Sala De Paineis 03', 'Subestação'];
    return ambientes.filter((valor) => {
        const valorMinusculo = valor.toLowerCase();
        const ambienteMinusculo = ambiente.toLowerCase().startsWith();

        return valorMinusculo.includes(ambienteMinusculo);
    });


}

const campo = document.querySelector('.campo');
const sugestoes = document.querySelector('.sugestoes');

campo.addEventListener('input', ({ target }) => {
    const dadosDoCampo = target.value;
    if (dadosDoCampo.length) {
        const autoCompleteValores = autoComplete(dadosDoCampo);
        sugestoes.innerHTML = `
          ${autoCompleteValores.map((value) => {
            return (
                `<li>${value}</li>`
            )
        }).join('')}
         `
    }
});


