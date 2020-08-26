const selectedMovie = document.getElementById('movie');
const container = document.querySelector('.container');
const count = document.getElementById('count');
const total = document.getElementById('total');
const seats = document.querySelectorAll('.row .seat');

let selectedSeats = JSON.parse(localStorage.getItem('selectedSeats')) || [];
let selectedMovieValue = localStorage.getItem('selectedMovieValue') || 0;

const populateUI = () => {
  [...seats].forEach((seat, index) => {
    if (selectedSeats.indexOf(index) > -1) {
      seat.className = 'seat selected';
    }
  });

  if (selectedMovieValue) {
    selectedMovie.value = selectedMovieValue;
  }

  updateCountAndTotal(selectedSeats.length);
};

const getIndexSeat = (seat) => {
  return [...seats].indexOf(seat);
};

const selectSeat = (seat) => {
  seat.className = 'seat selected';
  selectedSeats.push(getIndexSeat(seat));
};

const unSelectSeat = (seat) => {
  seat.className = 'seat';
  selectedSeats = selectedSeats.filter(
    (selectedSeat) => selectedSeat !== getIndexSeat(seat)
  );
};

const updateCountAndTotal = (numSelectedSeats) => {
  count.innerText = numSelectedSeats;
  total.innerText = numSelectedSeats * +selectedMovie.value;
};

container.addEventListener('click', (e) => {
  if (e.target.className === 'seat') {
    selectSeat(e.target);
  } else if (e.target.className === 'seat selected') {
    unSelectSeat(e.target);
  }

  localStorage.setItem('selectedSeats', JSON.stringify(selectedSeats));
  updateCountAndTotal(selectedSeats.length);
});

selectedMovie.addEventListener('change', () => {
  localStorage.setItem('selectedMovieValue', selectedMovie.value);
  updateCountAndTotal(selectedSeats.length);
});

populateUI();
