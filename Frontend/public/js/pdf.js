const { jsPDF } = window.jspdf;

function getBase64ImageFromURL(url, callback) {
  var img = new Image();
  img.crossOrigin = 'Anonymous';
  img.onload = function() {
    var canvas = document.createElement('CANVAS');
    var ctx = canvas.getContext('2d');
    var dataURL;
    canvas.height = this.naturalHeight;
    canvas.width = this.naturalWidth;
    ctx.drawImage(this, 0, 0);
    dataURL = canvas.toDataURL('image/png');
    callback(dataURL);
  };
  img.src = url;
}

function downloadPDF() {
  const pdfChart = document.getElementById('ambientesChart');
  const pdfChartImage = pdfChart.toDataURL('image/jpeg', 1);

  const InstallLogoPath = 'img/Logo_Install.png';
  const NutrizaLogoPath = 'img/Friato_Alimentos.png';

  const select = document.getElementById('nome');
  const indice = select.selectedIndex;
  const Ambiente = select.options[indice].text;
  const date = new Date().toISOString().slice(0, 10);
  const title1 = `Relatório Temperatura e Umidade - ${Ambiente}`;
  const data = `Dia: ${date}`;

  let pdf = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4'
  });

  pdf.setFontSize(15);
  pdf.text(title1, 60, 17);
  pdf.text(data, 60, 22);

  getBase64ImageFromURL(InstallLogoPath, function(InstallLogo) {
    pdf.addImage(InstallLogo, 'PNG', 5, 10, 50, 15);

    getBase64ImageFromURL(NutrizaLogoPath, function(NutrizaLogo) {
      pdf.addImage(NutrizaLogo, 'PNG', 260, 10, 30, 15);

      pdf.addImage(pdfChartImage, 'PNG', 23, 35, 251, 130);
      pdf.text('Observações:_____________________________________________________________________________', 15, 178);
      pdf.text('_________________________________________________________________________________________', 15, 193);
      pdf.text('Validação Garantia da Qualidade', 107, 200);

      pdf.save('Relatório ' + Ambiente + ' ' + date + '.pdf');
    });
  });
}

document.getElementById('downloadButton').addEventListener('click', downloadPDF);
