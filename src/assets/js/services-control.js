document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('myForm');
  const tableBody = document.getElementById('tableBody');
  let editRow = null; // Edit ediləcək row-u saxlamaq üçün

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const icon = document.getElementById('icon').value;
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const imageFile = document.getElementById('image').files[0];
    const imageName = imageFile ? imageFile.name : "No file";

    if (editRow) {
        // Əgər edit mövcuddursa, mövcud row-u yenilə
        editRow.children[0].textContent = icon;
        editRow.children[1].textContent = title;
        editRow.children[2].textContent = description;
        editRow.children[3].textContent = imageName;
        editRow = null; // edit bitdi
    } else {
        // Yeni row əlavə et
        const tr = document.createElement('tr');
        tr.classList.add('hover:bg-gray-50');

        tr.innerHTML = `
          <td class="px-4 py-2 border">${icon}</td>
          <td class="px-4 py-2 border">${title}</td>
          <td class="px-4 py-2 border">${description}</td>
          <td class="px-4 py-2 border">${imageName}</td>
          <td class="px-4 py-2 border">
            <button class="text-blue-500 hover:text-blue-700 mr-2 edit-btn">Edit</button>
            <button class="text-red-500 hover:text-red-700 delete-btn"  style="background-color: red;color: wheat;padding: 0.5rem; border-radius: 0.5rem;">Delete</button>
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
            editRow = tr; // edit üçün row-u saxla
        });
    }

    // Formu təmizlə
    form.reset();
  });
});
