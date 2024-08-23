
// Function to inject the drawing canvas on the front of the card
function injectCanvas() {
    // Check if the canvas is already injected
    if (document.getElementById('drawingCanvas')) {
      console.log('Canvas already injected. Skipping injection.');
      return; // Exit the function if the canvas is already injected
    }
  
    const keywordElement = document.querySelector('.plain.kanji-keyword');
    
    if (keywordElement) {
      console.log('Keyword element found:', keywordElement);
  
      // Create the drawing container
      const container = document.createElement('div');
      container.id = 'drawingContainer';
      container.style.marginTop = '20px';
      container.style.display = 'flex';
      container.style.flexDirection = 'column';
      container.style.alignItems = 'center'; // Center the canvas and button
  
      // Create the canvas element
      const canvas = document.createElement('canvas');
      canvas.id = 'drawingCanvas';
      canvas.width = 400;
      canvas.height = 400;
      canvas.style.border = '2px solid black';
      canvas.style.backgroundColor = 'white'; // Set background color to white
      container.appendChild(canvas);
  
      // Create the clear button
      const clearButton = document.createElement('button');
      clearButton.id = 'clearCanvasButton';
      clearButton.innerText = 'Clear';
      clearButton.style.marginTop = '10px';
      clearButton.style.padding = '5px 10px';
      clearButton.style.backgroundColor = '#f0f0f0';
      clearButton.style.border = '1px solid #ccc';
      clearButton.style.cursor = 'pointer';
      container.appendChild(clearButton);
  
      // Append the container after the keyword element
      keywordElement.parentElement.appendChild(container);
  
      const ctx = canvas.getContext('2d');
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 4;
  
      let drawing = false;
  
      canvas.addEventListener('mousedown', (e) => {
        drawing = true;
        ctx.beginPath();
        ctx.moveTo(e.offsetX, e.offsetY);
      });
  
      canvas.addEventListener('mousemove', (e) => {
        if (drawing) {
          ctx.lineTo(e.offsetX, e.offsetY);
          ctx.stroke();
        }
      });
  
      canvas.addEventListener('mouseup', () => {
        drawing = false;
      });
  
      canvas.addEventListener('mouseleave', () => {
        drawing = false;
      });
  
      clearButton.addEventListener('click', () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      });
  
    } else {
      console.log('Keyword element not found.');
    }
  }
  
  // Detect if on the front of the card and inject the canvas
  function detectFrontCard() {
    const url = window.location.href;
  
    if (url.includes('/review#')) {
      console.log('Front of card detected. Injecting canvas.');
      injectCanvas();
    } else {
      console.log('Not the front of a card.');
    }
  }
  
  // Run the detection function initially and add a listener for hash changes (indicating a new card)
  window.addEventListener('hashchange', detectFrontCard);
  window.addEventListener('load', detectFrontCard);
  window.addEventListener('DOMContentLoaded', detectFrontCard);
  detectFrontCard();
  