// Check Network Status
function checkNetwork() {
  const networkInfo = navigator.connection || navigator.webkitConnection;
  if (networkInfo) {
    const type = networkInfo.effectiveType;
    document.getElementById('network-status').textContent =
      `Connection Type: ${type}`;

    if (type === '2g' || type === 'slow-2g' || type === 'cellular') {
      alert('Warning: You are on a slow or metered network.');
    }
  } else {
    document.getElementById('network-status').textContent = 'Network Information API not supported.';
  }
}

// Draw on Canvas
function drawMap(lat, lon) {
  const canvas = document.getElementById('mapCanvas');
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#87ceeb';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#ff0000';
  ctx.beginPath();
  const x = canvas.width / 2;
  const y = canvas.height / 2;
  ctx.arc(x, y, 10, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#000';
  ctx.fillText(`Lat: ${lat.toFixed(2)}`, x - 30, y + 30);
  ctx.fillText(`Lon: ${lon.toFixed(2)}`, x - 30, y + 45);
}

// Get Location
function fetchLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      document.getElementById('latitude').textContent = lat;
      document.getElementById('longitude').textContent = lon;

      drawMap(lat, lon);
    }, error => {
      alert('Unable to fetch location.');
    });
  } else {
    alert('Geolocation API not supported.');
  }
}

// Initialize
checkNetwork();
fetchLocation();
