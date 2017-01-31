/* get our elements */
// grab the .player div
const player = document.querySelector('.player');
// grab everything inside the .player div
const video = 
      player.querySelector('.viewer');
const progress =
      player.querySelector('.progress');
const progressBar =
      player.querySelector('.progress__filled');
const toggle =
      player.querySelector('.toggle');
const skipButtons =
      player.querySelectorAll('[data-skip]'); // note: you can put [data-skip] attrib on almost anything
const ranges =
      player.querySelectorAll('.player__slider');

/* Build our functions */
function togglePlay(){
    //if(video.paused){
    //    video.play();
    //} else {
    //    video.pause();
    //}
    const playing = video.paused ? 'play' : 'pause'; // note there is no 'played' property
    video[playing]();
}

// update play button
function updateButton(){
    // check if the event is trigerred
    // console.log('button updated.')
    // update the button icon
    const icon = this.paused ? '►' : '❚❚';
    toggle.textContent = icon;
    
}

// skip buttons
function skip(){
    console.log(this.dataset.skip);
    video.currentTime += parseFloat(this.dataset.skip); // the DOMStrinMap skip value is a string.
}

// Range Sliders
function handleRangeUpdate(){
    //console.log(this.name);
    //console.log(this.value);
    video[this.name] = this.value; // the property we want to update this.name corresponds to 'volume' or 'playbackRate'
}

// Progress Bar
function handleProgress(){
    const percent = (video.currentTime / video.duration) * 100; // currentTime and duration are properties of video
    progressBar.style.flexBasis = `${percent}%`;
    //console.log("it ran");
}

// function for handling scrubbing on progress bar based on progress bar width:
    function scrub(event){
       //console.log(event);
        const scrubTime = (event.offsetX / progress.offsetWidth) * video.duration;
        // update video time
        video.currentTime = scrubTime;
    }

/* Hook up the events listeners */
video.addEventListener('click', togglePlay);

// listen whenever the video is paused so we can update the button
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);

//hook-up the play button
toggle.addEventListener('click', togglePlay);

// for skip func
skipButtons.forEach(button => button.addEventListener('click', skip));

// listen for change on the range inputs
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));

ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

//listen for time updates on the video
video.addEventListener('timeupdate', handleProgress);

//listener for srub
progress.addEventListener('click', scrub);

let mousedown = false;

progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

progress.addEventListener('mousemove', (event) => mousedown && scrub(event));
