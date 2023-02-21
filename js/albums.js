let container = document.querySelector(`.album`);

let search = new URLSearchParams(window.location.search);
let i = search.get(`i`);
let album = albums[i];

if(!album) {
    renderError();
} else {
    renderAlbumInfo();
    renderTracks();
    renderAudio();
}

function renderError() {
    container.innerHTML = `Undefined album`;
}
function renderAlbumInfo() {
    container.innerHTML = `
    <div class="card mb-3">
      <div class="row">
          <div class="col-4">
              <img src="${album.img}" alt="" class="img-fluid rounded-start">
          </div>
          <div class="col-8">
              <div class="card-body">
                 <h5 class="card-title">${album.title}</h5>
                 <p class="card-text">${album.description}</p>
                 <p class="card-text"><small class="text-muted">Альбом был написан в ${album.year} году</small></p>
              </div>
          </div>
      </div>
    </div>
    `
}
function renderTracks() {
    let playlist = document.querySelector(`.playlist`);
    let tracks = album.tracks;
    for (let i = 0; i < tracks.length; i++) {
        let track = tracks[i];
        playlist.innerHTML += `
            <li class="list-group-item d-flex align-items-center track" id="${track.id}">
                <div class="me-3 d-flex justify-content-center" style="width: 30px;">
                <svg fill="#000000" height="27px" width="27px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
                        viewBox="0 0 60 60" xml:space="preserve">
                <g>
                    <path d="M45.563,29.174l-22-15c-0.307-0.208-0.703-0.231-1.031-0.058C22.205,14.289,22,14.629,22,15v30
                        c0,0.371,0.205,0.711,0.533,0.884C22.679,45.962,22.84,46,23,46c0.197,0,0.394-0.059,0.563-0.174l22-15
                        C45.836,30.64,46,30.331,46,30S45.836,29.36,45.563,29.174z M24,43.107V16.893L43.225,30L24,43.107z"/>
                    <path d="M30,0C13.458,0,0,13.458,0,30s13.458,30,30,30s30-13.458,30-30S46.542,0,30,0z M30,58C14.561,58,2,45.439,2,30
                        S14.561,2,30,2s28,12.561,28,28S45.439,58,30,58z"/>
                </g>
                </svg>
                </div>
                <div>
                  <div>${track.title}</div>
                  <div class="text-secondary">${track.author}</div>
                </div>
                <div class="ms-auto">${track.time}</div>
                <audio class="audio" src="${track.src}"></audio>
            </li>
        `
    }
}
function renderAudio() {
    let trackNodes = document.querySelectorAll(`.track`);
    let audioTime = document.querySelectorAll(`.ms-auto`);
    let tracks = album.tracks;
    let currID = null;
    for (let i = 0; i < trackNodes.length; i++) {
      let node = trackNodes[i];
      let track = tracks[i];
      let id = node.id;
      let audio = node.querySelector(`.audio`); 
      node.addEventListener(`click`, () => {
        if (currID !== id) {
            currID = id;
            audio.currentTime = 0;
            for (let j = 0; j < trackNodes.length; j++) {
                let trackNode = trackNodes[j];
                let timeAudio = audioTime[j];
                let audioNode = trackNode.querySelector(`.audio`);
                if (trackNode.isPlaying) {
                    trackNode.isPlaying = false;
                    audioNode.pause();
                    timeAudio.innerHTML = track.time;
                }
            }
            node.isPlaying = true;
            audio.play();
            updateProgress();
        } else { 
            if (node.isPlaying) {
                node.isPlaying = false;
                audio.pause();
            } else {
                node.isPlaying = true;
                audio.play();
                updateProgress();
            }
        }
      });
    }
}

function updateProgress() {
    if (node.isPlaying) {
      let time = getTime(audio.currentTime);
      if(timeNode.innerHTML != time) {
        timeNode.innerHTML = time;
      }
      requestAnimationFrame(updateProgress);
    }
}

function getTime(time){
    let currentSeconds = Math.floor(time);
    let minutes = Math.floor(currentSeconds / 60);
    let seconds = Math.floor(currentSeconds % 60);

    if (minutes < 10) {
        minutes = minutes;
    }
    if (seconds < 10) {
        seconds = '0' + seconds;
    }
    return `${minutes}:${seconds}`;
}