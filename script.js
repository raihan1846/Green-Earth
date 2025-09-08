// category list show 
const url = `https://openapi.programming-hero.com/api/categories`;
const classList = document.getElementById('categoryList');
fetch(url)
.then(res => res.json())
.then(data => {
    const categories = data.categories;
    categories.forEach(category => {
        const li = document.createElement('li');
        li.innerHTML = `
        <button class="w-full text-left px-4 py-2 rounded-md hover:bg-[#16a34a] hover:text-white transition-colors">
            ${category.category_name}
          </button>
        `;
        classList.appendChild(li);
    });
})