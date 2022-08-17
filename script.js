const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=fb97c1e330a2ce9962d78ed8dece3df5&page=1";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";

const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?api_key=fb97c1e330a2ce9962d78ed8dece3df5&query="';

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
const home = document.getElementById("home");
//get initial movies
getMovies(API_URL);

async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();

  showMovies(data.results);

  function showMovies(movies) {
    main.innerHTML = "";

    movies.forEach((movie) => {
      const { title, poster_path, vote_average, overview } = movie;

      const movieEl = document.createElement("div");
      movieEl.classList.add("movie");

      movieEl.innerHTML = `
        <img
          src="${IMG_PATH + poster_path}"
          alt="${title}"
        />
        <div class="movie-info">
          <h3>${title}</h3>
          <span class="${getClassByRate(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
          <div class="insideHeader">
          <h3 id="overview-head">Overview 
          </h3>
          <a href='https://www.youtube.com/results?search_query=${title}' target="_blank">
          <i class="fa-brands fa-youtube"></i>
          </a>
          </div>
          ${overview}
        </div>
        `;
      main.appendChild(movieEl);
    });
  }
}
function getClassByRate(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

home.addEventListener("click", (e) => {
  window.location.reload();
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value;

  if (searchTerm && searchTerm !== "") {
    getMovies(SEARCH_API + searchTerm);
    search.value = "";
  } else {
    window.location.reload();
  }
});
