// Get the HTML elements
const getLocationBtn = document.querySelector('#getLocationBtn');
const removeLocationBtn = document.querySelector('#removeLocationBtn');
const mapDiv = document.querySelector('#map');

// Check if the browser supports Geolocation API
function getLocation() {
	if (navigator.geolocation) {
		// Get the current position of the user
		navigator.geolocation.getCurrentPosition(showPosition);
	} else {
		alert('Geolocation is not supported by this browser.');
	}
}

// Callback function to show the position on the map
function showPosition(position) {
	// Save the latitude and longitude in local storage
    
	localStorage.setItem('lat', position.coords.latitude);
	localStorage.setItem('long', position.coords.longitude);

	// Display the map with the user's location
    /*const mapOptions = {
        center: { lat: position.coords.latitude, lng: position.coords.longitude },
        zoom: 14,
      };
      const map = new google.maps.Map(mapDiv, mapOptions);*/
      
	//const mapUrl = `https://www.google.com/maps/embed/v1/view?key=API_KEY&center=${position.coords.latitude},${position.coords.longitude}&zoom=14`;
	mapDiv.innerHTML = `<iframe src="https://maps.google.com/maps?q=${position.coords.latitude}, ${position.coords.longitude}&z=15&output=embed" width="100%" height="650" frameborder="0" style="border:0"></iframe>`;

	// Disable the "Get Location" button
	getLocationBtn.disabled = true;
}

// Remove the location from local storage
function removeLocation() {
	localStorage.removeItem('lat');
	localStorage.removeItem('long');
	mapDiv.innerHTML = '';

	// Enable the "Get Location" button
	getLocationBtn.disabled = false;
}

// Check if the location is already saved in local storage
if (localStorage.getItem('lat') && localStorage.getItem('long')) {
	// Get the latitude and longitude from local storage
	const lat = localStorage.getItem('lat');
	const long = localStorage.getItem('long');

	// Display the map with the user's location
	const mapUrl = `https://www.google.com/maps/embed/v1/view?key=API_KEY&center=${lat},${long}&zoom=14`;
	mapDiv.innerHTML = `<iframe width="100%" height="100%" frameborder="0" style="border:0" src="${mapUrl}" allowfullscreen></iframe>`;

	// Disable the "Get Location" button
	getLocationBtn.disabled = true;
}

// Add event listeners
getLocationBtn.addEventListener('click', getLocation);
removeLocationBtn.addEventListener('click', removeLocation);