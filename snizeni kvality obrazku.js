
//https://chatgpt.com/c/680f9688-1b24-800b-b6e8-0bbad4a35d31


function downscaleImage(imageDataUrl, targetWidth, callback) {
    const img = new Image();
    img.onload = function () {
      const scaleFactor = targetWidth / img.width;
      const canvas = document.createElement('canvas');
      canvas.width = targetWidth;
      canvas.height = img.height * scaleFactor;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      callback(canvas.toDataURL('image/png')); // ➔ používáme PNG
    };
    img.src = imageDataUrl;
  }
  
  function exportToPDF() {
    const modelViewer = document.getElementById('watchModel');
    const imageData = modelViewer.toDataURL('image/png'); // ➔ také PNG
  
    downscaleImage(imageData, 800, function (smallImageData) { // 800px šířka
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();
  
      doc.addImage(smallImageData, 'PNG', 10, 10, 180, 160); // ➔ formát 'PNG'
      doc.save('Reminek.pdf');
    });
  }
  