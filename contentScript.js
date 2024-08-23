// Function to detect if the user is on a mobile device
function isMobile() {
    return /Mobi|Android/i.test(navigator.userAgent);
  }
  
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
      container.style.alignItems = 'center';
  
      // Create the canvas element
      const canvas = document.createElement('canvas');
      canvas.id = 'drawingCanvas';
      canvas.width = 400;
      canvas.height = 400;
      canvas.style.border = '2px solid black';
      canvas.style.backgroundColor = 'white';
      container.appendChild(canvas);
  
      // Create the clear button
      const clearButton = document.createElement('button');
      clearButton.id = 'clearCanvasButton';
      clearButton.innerText = 'Clear';
      clearButton.style.marginTop = '10px';
      container.appendChild(clearButton);
  
      // Append the container after the keyword element
      keywordElement.parentElement.appendChild(container);
  
      const ctx = canvas.getContext('2d');
      ctx.lineWidth = 4;
  
      // Adjust stroke color based on device type
      if (isMobile()) {
        ctx.strokeStyle = 'white';  // White strokes for mobile (against dark background)
      } else {
        ctx.strokeStyle = 'black';  // Black strokes for desktop
      }
  
      let drawing = false;
  
      // Handling mouse events for desktop
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
  
      // Handling touch events for mobile
      canvas.addEventListener('touchstart', (e) => {
        e.preventDefault(); // Prevent scrolling
        const touch = e.touches[0];
        const rect = canvas.getBoundingClientRect();
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;
        drawing = true;
        ctx.beginPath();
        ctx.moveTo(x, y);
      });
  
      canvas.addEventListener('touchmove', (e) => {
        e.preventDefault(); // Prevent scrolling
        if (drawing) {
          const touch = e.touches[0];
          const rect = canvas.getBoundingClientRect();
          const x = touch.clientX - rect.left;
          const y = touch.clientY - rect.top;
          ctx.lineTo(x, y);
          ctx.stroke();
        }
      });
  
      canvas.addEventListener('touchend', () => {
        drawing = false;
      });
  
      // Clear canvas on button click
      clearButton.addEventListener('click', () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      });
  
    } else {
      console.log('Keyword element not found.');
    }
  }
  
  // Inject the canvas on page load and when the URL hash changes
  function init() {
    injectCanvas(); // Try to inject the canvas right away
    window.addEventListener('hashchange', injectCanvas); // Re-inject canvas when the hash changes
  }
  
  // Run the initialization function on page load
  window.addEventListener('load', init);
  