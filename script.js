// Wait for DOM to fully load
document.addEventListener("DOMContentLoaded", function () {
    const cardsContainer = document.querySelector(".cards"); // The container where cards are added
    const addButton = document.querySelectorAll(".btn-light"); // Add buttons in modal
    const modalInputs = document.querySelectorAll(".modal-body input"); // Input fields in modal
    const searchInput = document.querySelector("#myInput"); // Search input field

    // Event listener for "Add" button
    addButton.forEach((btn) => {
        btn.addEventListener("click", function (event) {
            event.preventDefault(); // Prevent any default action

            const heading = modalInputs[0].value.trim(); // First input: Heading
            const description = modalInputs[1].value.trim(); // Second input: Description

            if (heading && description) { // Check if inputs are not empty
                // Create a new card dynamically
                const newCard = document.createElement("div");
                newCard.className = "card";

                newCard.innerHTML = `
                    <div class="card-body" style="justify-content: flex-start; width:18vw;" data-autohide="false">
                        <button type="button" style="font-size: 45px; align-self: end; margin-top: -15px;" 
                            class="ml-2 mb-1 close" aria-label="Close">&times;</button>
                        <h5 class="card-title">${heading}</h5>
                        <p class="card-text">${description}</p>
                    </div>
                `;

                // Append the new card to the cards container
                cardsContainer.appendChild(newCard);

                // Attach an event listener to the close button to remove the card
                const closeButton = newCard.querySelector(".close");
                closeButton.addEventListener("click", function () {
                    newCard.remove(); // Remove the card from the DOM
                });

                // Clear input fields after adding
                modalInputs[0].value = "";
                modalInputs[1].value = "";

                // Close the modal
                $('#myModal').modal('hide');
            } else {
                alert("Please enter both Heading and Description.");
            }
        });
    });

    // Event listener for search input
    searchInput.addEventListener("input", function () {
        const query = searchInput.value.toLowerCase().trim(); // Get search query in lowercase
        const cards = cardsContainer.querySelectorAll(".card"); // Get all cards

        cards.forEach((card) => {
            const cardTitle = card.querySelector(".card-title").textContent.toLowerCase(); // Card title text

            // Check if the card title matches the search query
            if (cardTitle.includes(query)) {
                card.style.visibility = "visible"; // Make the card visible
                card.style.opacity = "1"; // Fully opaque for smooth transitions
                card.style.transition = "opacity 0.3s ease"; // Add a fade-in effect
            } else {
                card.style.visibility = "hidden"; // Hide the card but keep its space
                card.style.opacity = "0"; // Fully transparent for smooth transitions
                card.style.transition = "opacity 0.3s ease"; // Add a fade-out effect
            }
        });
    });
});
