// category list show 
const url = `https://openapi.programming-hero.com/api/categories`;
const classList = document.getElementById('categoryList');
let allPlants = [];
fetch(url)
    .then(res => res.json())
    .then(data => {
        const categories = data.categories;
        categories.forEach(category => {
            const li = document.createElement('li');
            li.innerHTML = `
        <button data-category="${category.category_name}" class="w-full text-left px-4 py-2 rounded-md hover:bg-[#16a34a] hover:text-white transition-colors">
            ${category.category_name}
          </button>
        `;
            classList.appendChild(li);
        });
        classList.querySelectorAll("button").forEach(btn=>{
           btn.addEventListener('click', (e)=>{
            const dataCategory = btn.getAttribute("data-category");

            // active button 
            if(e.target.tagName === "BUTTON"){
             classList.querySelectorAll("button").forEach(btn =>{
                btn.classList.remove("bg-[#16a34a]", "text-white")
             })
            }
            btn.classList.add("bg-[#16a34a]", "text-white")

            if (dataCategory === "All") {
                displayPlants(allPlants);
            }else{
                const filterPlant = allPlants.filter(data => data.category == dataCategory)
                displayPlants(filterPlant)
            }
           })
         })
    })

 
// plants part 

const plantUrl = `https://openapi.programming-hero.com/api/plants`;
const plantList = document.getElementById('plantList');
fetch(plantUrl)
    .then(res => res.json())
    .then(data => {
        allPlants = data.plants;
        displayPlants(allPlants)
    })
    function displayPlants(plants) {
        plantList.innerHTML = "";
        plants.forEach(plant => {
            const div = document.createElement('div');
            div.classList.add("card", "bg-base-100", "shadow-sm")
            div.innerHTML = `
               <figure class="px-6 pt-6">
                <img src="${plant.image}" alt="Tree"
                  class="rounded-xl w-full h-48 md:h-56 lg:h-64 object-cover" />
              </figure>
              <div class="card-body">
                <h2 class="card-title">${plant.name}</h2>
                <p>${plant.description}</p>
                <div class="flex justify-between w-full">
                  <button class="bg-[#DCFCE7] px-2 py-1 rounded-full">${plant.category}</button>
                  <p class="mr-3 text-right">$ ${plant.price}</p>
                </div>
              
                <div class="card-actions">
                  <button class="btn w-full rounded-full bg-[#15803d]">Add to Cart</button>
                </div>
              </div>

        `;
            plantList.appendChild(div);

        })
    }