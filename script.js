// Titles: https://omdbapi.com/?s=thor&page=1&apikey=b6375667
// details: http://www.omdbapi.com/?i=tt3896198&apikey=b6375667

// DOM element set up
const movieSearchBox = document.getElementById('movie-search-box')
const searchList = document.getElementById('search-list')
const resultGrid = document.getElementById('result-grid')

// load movies from API
async function loadMovies(searchTerm) {
    const URL = `https://omdbapi.com/?s=${searchTerm}&page=1&apikey=b6375667`
    const res = await fetch(`${URL}`)
    const data = await res.json()
    // console.log(data.Search);
    if(data.Response == "True") displayMovieList(data.Search);

}

// loadMovies('avengers')

movieSearchBox.addEventListener('keyup', findMovies)

function findMovies() {
    let searchTerm = (movieSearchBox.value).trim()
    // console.log(searchTerm);
    if (searchTerm.length > 0) {
        searchList.classList.remove('hide-search-list')
        loadMovies(searchTerm)
    } else {
        searchList.classList.add('hide-search-list')
    }
}

function displayMovieList(movies) {
    searchList.innerHTML = ''
   
    for (let idx = 0; idx < movies.length; idx++) {
        let movieListItem = document.createElement('div')
        movieListItem.dataset.id = movies[idx].imdbID;
        // movie id in data-id
        movieListItem.classList.add('search-list-item');

        movieListItem.innerHTML = `
        <div class="search-item-info">
            <h3>${movies[idx].Title}</h3>
            <p>${movies[idx].Year}</p>
        </div>
        `

        searchList.appendChild(movieListItem)

        const imgElements = document.querySelectorAll('img')
        imgElements.forEach(img => img.remove())
    }

    loadMovieDetails()
}

function loadMovieDetails() {
    const searchListMovies = searchList.querySelectorAll('.search-list-item')
    searchListMovies.forEach(movie => {
        movie.addEventListener('click', async () => {
            // console.log(movie.dataset.id);
            searchList.classList.add('hide-search-list')
            movieSearchBox.value = ''
            const result = await fetch (`http://www.omdbapi.com/?i=${movie.dataset.id}&apikey=b6375667`)
            const movieDetails = await result.json()
            // console.log(movieDetails);
            displayMovieDetails(movieDetails)
        })
    })
}

function displayMovieDetails(details) {
    resultGrid.innerHTML = `
        <div class="movie-info">
            <h3 class="movie-title">${details.Title}</h3>
            <ul class="movie-misc-info">
                <li class="year">Year: ${details.Year}</li>
                <li class="rated">Ratings: ${details.Rated}</li>
                <li class="released">Released: ${details.Released}</li>
            </ul>
            <p class="genre"><b>Genre:</b> ${details.Genre}</p>
            <p class="writer"><b>Writer:</b> ${details.Writer}</p>
            <p class="actors"><b>Actors:</b> ${details.Actors}</p>
            <p class="plot"><b>Plot:</b> ${details.Plot}</p>
            <p class="language"><b>Language:</b> ${details.Language}</p>
            <p class="awards"><b><i class="fa-solid fa-award" style="color: #fff;"></i></b> ${details.Awards}</p>
    </div>
    `
    const posterElement = document.getElementById('movie-poster')

    if (posterElement) {
        posterElement.remove()
    }
}

window.addEventListener('click', (event) => {
    if (event.target.className != "form-control") {
        searchList.classList
    }
})