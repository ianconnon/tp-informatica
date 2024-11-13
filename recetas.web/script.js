document.addEventListener('DOMContentLoaded', loadRecipes);

function loadRecipes() {
    fetch('recetas.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(recipe => createRecipeCard(recipe));
        })
        .catch(error => console.error("Error loading recipes:", error));
}

function containerOpacity(status){
    const container = document.querySelector('.container');
    if (status === "off"){
        container.style.opacity = .3;
        container.style.transition = "all 1s";
    }
    else
    {
        container.style.opacity = 1;
        container.style.transition = "all 1s";
    }
}

function createRecipeCard(recipe) {
    const container = document.querySelector('.container');

    // Crear el contenedor de la receta
    const recipeDiv = document.createElement('div');
    recipeDiv.classList.add('recipe');

    // Título
    const title = document.createElement('h2');
    title.textContent = recipe.titulo;
    recipeDiv.appendChild(title);

    // Imagen
    const img = document.createElement('img');
    img.src = recipe.imagen;
    img.alt = recipe.titulo;
    recipeDiv.appendChild(img);

    // Botón para mostrar detalles
    const button = document.createElement('button');
    button.textContent = "Ver Ingredientes e Instrucciones";
    button.addEventListener('click', () => showMessage(recipe));
    recipeDiv.appendChild(button);

    // Agregar la receta al contenedor principal
    container.appendChild(recipeDiv);
}

function showMessage(recipe) {
    const message = document.getElementById('message');
    const messageText = document.getElementById('message-text');

    // Actualizar el contenido del mensaje
    let content = `<h3>Ingredientes:</h3><ul>`;
    recipe.ingredientes.forEach(ing => content += `<li>${ing}</li>`);
    content += `</ul><h3>Instrucciones:</h3><p>${recipe.instrucciones}</p>`;

    messageText.innerHTML = content;
    message.style.display = 'block';
    containerOpacity("off");

}

// Cerrar el mensaje al hacer clic en el botón de cierre
document.getElementById('close-btn').addEventListener('click', () => {
    const message = document.getElementById('message');
    containerOpacity("on");
    message.style.display = 'none';
});
