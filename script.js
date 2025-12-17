{\rtf1\ansi\ansicpg1252\cocoartf2639
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 // Variable to store the complete, original list provided by the user\
let originalMovies = [];\
// The list we will actively modify (remove drawn movies from)\
let availableMovies = [];\
\
// DOM element references\
const movieInput = document.getElementById('movie-input');\
const loadListButton = document.getElementById('load-list-button');\
const movieListElement = document.getElementById('movie-list');\
const drawButton = document.getElementById('draw-button');\
const resetButton = document.getElementById('reset-button');\
const selectionResult = document.getElementById('selection-result');\
const selectedTitle = document.getElementById('selected-title');\
const countDisplay = document.getElementById('count-display');\
\
/**\
 * Loads the user-provided text into the movie lists.\
 */\
function loadList() \{\
    // 1. Get the text input and split it by newline, filtering out empty lines.\
    const inputList = movieInput.value\
        .split('\\n')\
        .map(title => title.trim())\
        .filter(title => title.length > 0);\
    \
    if (inputList.length === 0) \{\
        alert("Please enter at least one movie title.");\
        return;\
    \}\
\
    // 2. Set the original and available lists\
    originalMovies = inputList;\
    availableMovies = [...originalMovies];\
    \
    // 3. Enable the draw button\
    drawButton.disabled = false;\
    \
    // 4. Hide the result and reset button if they were showing\
    selectionResult.classList.add('hidden');\
    resetButton.classList.add('hidden');\
    selectedTitle.textContent = '';\
    \
    // 5. Render the new list\
    renderMovieList();\
\}\
\
/**\
 * Renders the current list of available movies to the HTML.\
 */\
function renderMovieList() \{\
    movieListElement.innerHTML = ''; // Clear the current list\
    \
    if (availableMovies.length === 0 && originalMovies.length > 0) \{\
        // Case: All movies drawn\
        movieListElement.innerHTML = '<li class="no-more-movies">All movies have been drawn! Time to watch!</li>';\
        drawButton.disabled = true;\
        drawButton.textContent = 'No Movies Left';\
        resetButton.classList.remove('hidden');\
    \} else if (originalMovies.length === 0) \{\
        // Case: No list loaded yet\
        movieListElement.innerHTML = '<li>Load your list above to start!</li>';\
        drawButton.disabled = true;\
    \} \
    else \{\
        // Case: Movies available\
        availableMovies.forEach(movie => \{\
            const listItem = document.createElement('li');\
            listItem.textContent = movie;\
            movieListElement.appendChild(listItem);\
        \});\
        drawButton.disabled = false;\
        drawButton.textContent = 'Draw a Movie!';\
    \}\
    \
    // Update the count display\
    countDisplay.textContent = availableMovies.length;\
\}\
\
/**\
 * Handles the logic for drawing a movie.\
 */\
function drawMovie() \{\
    if (availableMovies.length === 0) \{\
        return; \
    \}\
\
    // 1. Get a random index\
    const randomIndex = Math.floor(Math.random() * availableMovies.length);\
\
    // 2. Select the movie at that index\
    const drawnMovie = availableMovies[randomIndex];\
\
    // 3. Remove the selected movie from the array\
    availableMovies.splice(randomIndex, 1);\
\
    // 4. Update the result display\
    selectedTitle.textContent = drawnMovie;\
    selectionResult.classList.remove('hidden');\
\
    // 5. Re-render the movie list\
    renderMovieList();\
\}\
\
/**\
 * Resets the available list back to the original list.\
 */\
function resetApp() \{\
    if (originalMovies.length === 0) return;\
    \
    // Copy the original list back to the available list\
    availableMovies = [...originalMovies];\
    \
    // Hide the selection result\
    selectionResult.classList.add('hidden');\
    \
    // Hide the reset button\
    resetButton.classList.add('hidden');\
    \
    // Clear the selected title\
    selectedTitle.textContent = '';\
    \
    // Re-render the list\
    renderMovieList();\
\}\
\
// Attach event listeners\
loadListButton.addEventListener('click', loadList);\
drawButton.addEventListener('click', drawMovie);\
resetButton.addEventListener('click', resetApp);\
\
// Initial call to set up the list when the page loads\
document.addEventListener('DOMContentLoaded', renderMovieList);\
\
// OPTIONAL: Pre-fill the input with an example list\
movieInput.value = `The Grand Budapest Hotel\
Blade Runner 2049\
Eternal Sunshine of the Spotless Mind\
Arrival\
Pulp Fiction\
Inception\
The Social Network\
Spirited Away\
Mad Max: Fury Road`;}