document.addEventListener('DOMContentLoaded', async () => {
    const vehicleGrid = document.getElementById('vehicleGrid');
    const searchInput = document.getElementById('searchInput');
    let vehiclesData = [];

    // Cargar vehículos desde articles.json
    const loadVehicles = async () => {
        try {
            const response = await fetch('articles.json');
            vehiclesData = await response.json();
            filterAndDisplayVehicles();
        } catch (error) {
            console.error("Error al cargar los datos:", error);
        }
    };

    // Filtrar y mostrar vehículos según la búsqueda
    const filterAndDisplayVehicles = () => {
        const query = searchInput.value.toLowerCase();
        const filteredVehicles = vehiclesData.filter(vehicle => {
            return (
                vehicle.title.toLowerCase().includes(query) ||
                vehicle.brand.toLowerCase().includes(query) ||
                vehicle.location.toLowerCase().includes(query)
            );
        });
        displayVehicles(filteredVehicles);
    };

    // Mostrar vehículos en el grid o mensaje de "No hay resultados"
    const displayVehicles = (vehicles) => {
        vehicleGrid.innerHTML = '';

        if (vehicles.length === 0) {
            vehicleGrid.innerHTML = `<p class="no-results">No hay resultados para la búsqueda.</p>`;
            return;
        }

        vehicles.forEach(vehicle => {
            const vehicleCard = document.createElement('div');
            vehicleCard.classList.add('vehicle-card');
            vehicleCard.innerHTML = `
                <img src="${vehicle.image}" alt="${vehicle.title}">
                <div class="vehicle-card-body">
                    <h3 class="vehicle-card-title">${vehicle.title}</h3>
                    <p class="vehicle-card-brand">${vehicle.brand}</p>
                    <p class="vehicle-card-description">${vehicle.description}</p>
                    <p class="vehicle-card-price">${vehicle.price}</p>
                    <p class="vehicle-card-location">Ubicación: ${vehicle.location}</p>
                </div>
            `;
            vehicleCard.addEventListener('click', () => showCarDetails(vehicle));
            vehicleGrid.appendChild(vehicleCard);
        });
    };

    // Evento de búsqueda
    searchInput.addEventListener('input', filterAndDisplayVehicles);

    // Cargar los vehículos al inicio
    loadVehicles();
});

// Función para mostrar el modal con los detalles del vehículo
function showCarDetails(vehicle) {
    document.getElementById("car-name").innerText = vehicle.title;
    document.getElementById("car-description").innerText = vehicle.description;
    document.getElementById("car-brand").innerText = vehicle.brand;
    document.getElementById("car-price").innerText = vehicle.price;
    document.getElementById("car-image").src = vehicle.image;

    // Mostrar el modal
    document.getElementById("car-modal").style.display = "flex";
}

// Función para cerrar el modal
function closeModal() {
    document.getElementById("car-modal").style.display = "none";
}
