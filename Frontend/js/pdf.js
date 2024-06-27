import { jsPDF } from "jspdf";

// Default export is a4 paper, portrait, using millimeters for units
function pdf() {
    const doc = new jsPDF();

    doc.text("Hello world!", 10, 10);
    doc.save("a4.pdf");
}

module.exports = pdf;
