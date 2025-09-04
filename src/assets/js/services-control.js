document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('myForm');
  const tableBody = document.getElementById('tableBody');
  const imageInput = document.getElementById('image');
  let editRow = null; 
  let imageCatch = null;

  // Fayl seçildikdə şəkili oxu
  imageInput.addEventListener('change', function () {
    const file = this.files[0]; 
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        imageCatch = e.target.result; // Base64 şəkil
      }
      reader.readAsDataURL(file);
    }
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const icon = document.getElementById('icon').value;
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;

    if (editRow) {
      // Edit olunmuş row-u yenilə
      editRow.children[0].textContent = icon;
      editRow.children[1].textContent = title;
      editRow.children[2].textContent = description;
      if (imageCatch) {
        editRow.children[3].querySelector('img').src = imageCatch;
      }
      editRow = null;
    } else {
      // Yeni row əlavə et
      const tr = document.createElement('tr');
      tr.classList.add('hover:bg-gray-50');

      tr.innerHTML = `
        <td class="px-4 py-2 text-center text-gray-700">${icon}</td>
        <td class="px-4 py-2 text-center text-gray-700">${title}</td>
        <td class="px-4 py-2 text-center text-gray-700">${description}</td>
        <td class="px-4 py-2 text-center text-gray-700">
          ${imageCatch ? `<img src="${imageCatch}" alt="preview" class="w-16 h-16 object-cover mx-auto rounded">` : "No Image"}
        </td>
        <td class="px-4 py-2 text-center text-gray-700">
          <button class="font-bold hover:text-blue-700 mr-2 px-3 py-1 rounded edit-btn">
            Edit
          </button>
          <button class="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-800 hover:text-white delete-btn">
            Delete
          </button>
        </td>
      `;

      tableBody.appendChild(tr);

      // Delete düyməsi
      tr.querySelector('.delete-btn').addEventListener('click', () => {
        tr.remove();
      });

      // Edit düyməsi
      tr.querySelector('.edit-btn').addEventListener('click', () => {
        document.getElementById('icon').value = tr.children[0].textContent;
        document.getElementById('title').value = tr.children[1].textContent;
        document.getElementById('description').value = tr.children[2].textContent;
        editRow = tr;
      });
    }

    // Formu təmizlə
    form.reset();
    imageCatch = null; // Resetdən sonra faylı sıfırla
  });
});
