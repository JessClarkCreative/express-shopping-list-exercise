document.addEventListener('DOMContentLoaded', () => {
    const itemList = document.getElementById('itemList');
    const itemForm = document.getElementById('itemForm');

    // Function to fetch and display items
    async function fetchItems() {
        const response = await fetch('/items');
        const data = await response.json();
        itemList.innerHTML = '';

        data.items.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.name}: $${item.price}`;
            itemList.appendChild(li);
        });
    }

    // Handle form submission
    itemForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const name = document.getElementById('itemName').value;
        const price = document.getElementById('itemPrice').value;

        await fetch('/items', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, price }),
        });

        itemForm.reset();
        fetchItems();
    });

    // Initial fetch of items
    fetchItems();
});
