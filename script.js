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
            btn.classList.add("bg-[#16a34a]", "text-white");
            manageSpinner(true);
            setTimeout(() => {
            if (dataCategory === "All") {
                displayPlants(allPlants);
            }else{
                const filterPlant = allPlants.filter(data => data.category == dataCategory)
                displayPlants(filterPlant)
            }
        }, 100);
           })
         })
    })

 
  
    const manageSpinner = (status) => {
        const spinner = document.getElementById("spinner");
        const plantList = document.getElementById("plantList");
        if (status) {
            spinner.classList.remove("hidden");
            plantList.classList.add("hidden");
        } else {
            spinner.classList.add("hidden");
            plantList.classList.remove("hidden");
        }
    }
// plants part 
let total = 0;
const plantUrl = `https://openapi.programming-hero.com/api/plants`;
const plantList = document.getElementById('plantList');
manageSpinner(true);
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
                <h2 class="card-title plantName" onclick="loadWordDetail(${plant.id})">${plant.name}</h2>
                <p>${plant.description}</p>
                <div class="flex justify-between w-full">
                  <button class="bg-[#DCFCE7] px-2 py-1 rounded-full">${plant.category}</button>
                  <p class="mr-3 text-right">$ <span class="plantPrice">${plant.price}</span></p>
                </div>
              
                <div class="card-actions">
                  <button class="btn w-full rounded-full bg-[#15803d] add-to-card">Add to Cart</button>
                </div>
              </div>

        `;
            plantList.appendChild(div);

        });
       manageSpinner(false);


        const addToCard = document.querySelectorAll('.add-to-card');
        addToCard.forEach(btn =>{
        btn.addEventListener('click',() => {
            const card = btn.closest('.card'); 
            const plantName = card.querySelector('.plantName').textContent;
            const plantPrice = parseFloat(card.querySelector('.plantPrice').textContent);
            total+=plantPrice;
            alert(`Product Name : ${plantName} and Price : ${plantPrice}`);
            document.getElementById('totalPrice').textContent = total;
            const addCard = document.getElementById('addCard');
            const div = document.createElement('div');
            div.innerHTML = `
            <div class="flex justify-between items-center mx-10 bg-[#F0FDF4] p-2 rounded-md space-y-2 mb-4">
          <div class="">
            <h2>${plantName}</h2>
            <p><span class="currency">$</span> <span class="pre">${plantPrice}</span></p>
          </div>
          <div>
            <h2 class="remove-item">X</h2>
          </div>
        </div>
            `;
            addCard.appendChild(div);

            div.querySelector('.remove-item').addEventListener('click', ()=>{
             div.remove();
             total-=plantPrice;
            document.getElementById('totalPrice').textContent = total;
            })
       })
    })

       
    
    }

    const loadWordDetail = async (id)=>{
        const url = `https://openapi.programming-hero.com/api/plant/${id}`;
        const res = await fetch(url);
        const details = await res.json();
        displayWordDetails(details.plants)
    }

    const displayWordDetails = (words) =>{
        const details = document.getElementById('detailContainer');
        details.innerHTML = `
        <figure class="px-6 pt-6">
        <img src="${words.image}" alt="Tree"
          class="rounded-xl w-full h-48 md:h-56 lg:h-64 object-cover" />
      </figure>
      <div class="card-body">
        <h2 class="card-title plantNames">${words.name}</h2>
        <p>${words.description}</p>
        <div class="flex justify-between w-full">
          <button class="bg-[#DCFCE7] px-2 py-1 rounded-full">${words.category}</button>
          <p class="mr-3 text-right plantPrices">$ ${words.price}</p>
        </div>
        <div class="modal-action">
      <form method="dialog">
        <button class="btn">Close</button>
      </form>
    </div>
        `;
        document.getElementById('word_modal').showModal();
    }

    
   
    