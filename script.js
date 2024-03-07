console.log("Welcome to Spotify");

let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let myProgressBar = document.getElementById('progressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songDuration = document.getElementById('songDuration');
myProgressBar.value = 0;

let songs = [
    {songName: "Warriyo - Mortals [NCS Release]", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Cielo - Huma-Huma", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "DEAF KEV - Invincible [NCS Release]-320k", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Different Heaven & EH!DE - My Heart [NCS Release]", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Janji-Heroes-Tonight-feat-Johnning-NCS-Release", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Rabba - Salam-e-Ishq", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"},
    {songName: "Sakhiyaan - Salam-e-Ishq", filePath: "songs/7.mp3", coverPath: "covers/7.jpg"},
    {songName: "Bhula Dena - Salam-e-Ishq", filePath: "songs/8.mp3", coverPath: "covers/8.jpg"},
    {songName: "Tumhari Kasam - Salam-e-Ishq", filePath: "songs/9.mp3", coverPath: "covers/9.jpg"},
    {songName: "Na Jaana - Salam-e-Ishq", filePath: "songs/10.mp3", coverPath: "covers/10.jpg"},
]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 

    // Get the icon next to the timestamp
    let songItemPlay = element.getElementsByClassName("songItemPlay")[0];
    
    // Add event listener to play the song
    songItemPlay.addEventListener('click', () => {
        playSong(i);
    });

    // Update the timestamp for each song
    let audio = new Audio(songs[i].filePath);
    audio.addEventListener('loadedmetadata', () => {
        let totalMinutes = Math.floor(audio.duration / 60);
        let totalSeconds = Math.floor(audio.duration % 60);
        if (totalSeconds < 10) {
            totalSeconds = '0' + totalSeconds; // Add leading zero if seconds is less than 10
        }
        let totalTime = `${totalMinutes}:${totalSeconds}`;
        element.querySelector('.timestamp').textContent = totalTime;
    });
});

function playSong(index) {
    songIndex = index;
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    gif.style.opacity = 1;
}

// Update the progress bar and song duration continuously
audioElement.addEventListener('timeupdate', () => {
    let currentMinutes = Math.floor(audioElement.currentTime / 60);
    let currentSeconds = Math.floor(audioElement.currentTime % 60);
    if (currentSeconds < 10) {
        currentSeconds = '0' + currentSeconds; // Add leading zero if seconds is less than 10
    }
    let currentTime = `${currentMinutes}:${currentSeconds}`;

    let totalMinutes = Math.floor(audioElement.duration / 60);
    let totalSeconds = Math.floor(audioElement.duration % 60);
    if (totalSeconds < 10) {
        totalSeconds = '0' + totalSeconds; // Add leading zero if seconds is less than 10
    }
    let totalTime = `${totalMinutes}:${totalSeconds}`;

    songDuration.innerText = `${currentTime}/${totalTime}`;

    // Update Seekbar
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100); 
    myProgressBar.value = progress;
});

//play pause button
masterPlay.addEventListener('click', ()=>{
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.toggle('fa-circle-play'); // Toggle between play and pause icons
        masterPlay.classList.toggle('fa-circle-pause'); // Toggle between play and pause icons
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.toggle('fa-circle-pause'); // Toggle between play and pause icons
        masterPlay.classList.toggle('fa-circle-play'); 
        gif.style.opacity = 0;// Toggle between play and pause icons
    }
});

// Listen to Events
myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
});

document.getElementById('forward').addEventListener('click', ()=>{
    if(songIndex >= 9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    playSong(songIndex);
});

document.getElementById('backward').addEventListener('click', ()=>{
    if(songIndex <= 0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    playSong(songIndex);
});
