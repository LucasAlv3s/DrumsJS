const playingClass = 'playing';
crashRide = document.getElementById('crash-ride');
hitHatTop = document.getElementById('hihat-top');

const animateCrashOrRide = () => {
    crashRide.style.transform = 'rotate(0deg) scale(1.5)';
};

const animateHitHatClosed = () => {
    hitHatTop.style.top = '175px';
};

const playSound = e => {
    const keyCode = e.keyCode;
    keyElement = document.querySelector(`div[data-key="${keyCode}"]`);
    if(!keyElement) return;

    const audioElement = document.querySelector(`audio[data-key="${keyCode}"]`);
    audioElement.currentTime = 0;
    audioElement.play();

    switch(keyCode){
        case 69:
        case 82:
            animateCrashOrRide();
            break;
        case 75:
        case 73:
            animateHitHatClosed();
            break;
    }

    keyElement.classList.add(playingClass);
}

const removeCrashRideTransition = e => {
    if(e.propertyName !== 'transform')  return;

    e.target.style.transform = 'rotate(-7.3deg) scale(1.5)';
}

const removeHitHatTopTransition = e => {
    if(e.propertyName !== 'top')  return;

    e.target.style.top = '165px';
}

const removeKeyTransition = e => {
    if(e.propertyName !== 'transform')  return;

    e.target.classList.remove(playingClass);
}

const drumKeys = Array.from(document.querySelectorAll('.key'));
drumKeys.forEach(key => {
    key.addEventListener('transitionend', removeKeyTransition);
})

crashRide.addEventListener('transitionend', removeCrashRideTransition);
hitHatTop.addEventListener('transitionend', removeHitHatTopTransition);

window.addEventListener('keydown', playSound);