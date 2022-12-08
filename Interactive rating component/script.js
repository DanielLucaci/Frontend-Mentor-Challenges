const ratings = document.querySelectorAll(".rating li");
let selectedRating = null;

const submitBtn = document.querySelector(".submit-btn");

const ratingState = document.querySelector('.state.rating-state');
const thankYouState = document.querySelector('.state.thank-you-state');
const ratingValueSpan = document.querySelector('span.rating-value');

ratings.forEach(rating => {
    rating.addEventListener('click', () => {
        if(selectedRating !== null) { 
            selectedRating.classList.remove('active');
        }
        if(selectedRating === rating) {
            selectedRating.classList.remove('active'); 
            selectedRating = null;
        } else {
            (selectedRating = rating).classList.add('active');
        }
    })
})

submitBtn.addEventListener('click', () => {
    if(selectedRating === null) // No rating was selected 
        return;
    
    ratingState.classList.add('disabled');
    thankYouState.classList.remove('disabled');

    // Get the rating
    ratingValueSpan.innerHTML = selectedRating.innerHTML.trim();
})