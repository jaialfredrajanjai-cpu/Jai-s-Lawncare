// ===================================
// APPOINTMENT BOX FUNCTION
// ===================================
function showContactDetails() {
    let infoBox = document.getElementById("contactDetails");
    let actionButton = document.getElementById("revealBtn");

    infoBox.style.display = "block";
    actionButton.innerText = "Info Revealed Below!";
    actionButton.style.backgroundColor = "#78909c";
    actionButton.disabled = true;
}

// ===================================
// REVIEWS WITH STAR SYSTEM FUNCTIONS
// ===================================

let currentRating = 0; // Tracks the star rating selected by the user

// Run automatically when page loads
window.addEventListener("DOMContentLoaded", function() {
    displayReviews();
});

// Handles color changes when clicking stars in the form
function setRating(rating) {
    currentRating = rating;
    let stars = document.querySelectorAll(".star-input");
    
    // Loop through all 5 stars to color them correctly
    stars.forEach(function(star, index) {
        if (index < rating) {
            star.classList.add("selected");
        } else {
            star.classList.remove("selected");
        }
    });

    document.getElementById("ratingValueText").innerText = "(" + rating + " Stars)";
}

function addReview() {
    let nameInput = document.getElementById("reviewerName");
    let textInput = document.getElementById("reviewText");

    // Enforce that a star rating must be picked
    if (currentRating === 0) {
        alert("Please pick a star rating before submitting!");
        return;
    }

    if (nameInput.value.trim() === "" || textInput.value.trim() === "") {
        alert("Please fill in both your name and a review!");
        return;
    }

    // Save name, text, AND rating
    let newReview = {
        name: nameInput.value,
        text: textInput.value,
        rating: currentRating
    };

    let savedReviews = JSON.parse(localStorage.getItem("lawnReviews")) || [];
    savedReviews.push(newReview);
    localStorage.setItem("lawnReviews", JSON.stringify(savedReviews));

    // Reset the form fields and star selections back to zero
    nameInput.value = "";
    textInput.value = "";
    currentRating = 0;
    setRating(0);
    document.getElementById("ratingValueText").innerText = "(Select Stars)";

    displayReviews();
}

function displayReviews() {
    let container = document.getElementById("reviewsContainer");
    let savedReviews = JSON.parse(localStorage.getItem("lawnReviews")) || [];

    container.innerHTML = "";

    savedReviews.forEach(function(review) {
        let reviewDiv = document.createElement("div");
        reviewDiv.className = "single-review";
        
        // Generate the matching amount of gold star symbols text
        let starSymbols = "";
        let ratingCount = review.rating || 5; // Default to 5 if old test review has no rating
        for (let i = 0; i < ratingCount; i++) {
            starSymbols += "★";
        }
        
        reviewDiv.innerHTML = 
            "<strong>" + review.name + "</strong>" +
            "<div class='review-stars'>" + starSymbols + "</div>" +
            "<p>" + review.text + "</p>";
        
        container.insertBefore(reviewDiv, container.firstChild);
    });
}