console.info("Extension JS loaded")

function saveOptions(e) {
    console.debug(e)

    let elemInput = document.getElementById("speed_input")
    let newValue = elemInput.value

    let loop = false;

    if(document.getElementById("loop_input").checked == true){
        loop = true;
    }

    e.preventDefault()
    browser.storage.sync.set({
        "playback_speed": newValue,
        "loop": loop
    })

    console.info(`Set saved playback speed to ${newValue}.`)
    console.info(`Set saved playback speed to ${loop}.`)
    window.close()
}

function restoreOptions() {
    let speedInput = document.getElementById("speed_input")
    let loopInput = document.getElementById("loop_input")

    function onPlaybackGot(val) {
        console.debug(val)
        console.info(`Retrieved saved playback speed.  It is ${val["playback_speed"]}.`)
        speedInput.value = val["playback_speed"] || 1
    }

    function onPlaybackError(err) {
        console.error(`Error: ${err}`)
    }

    function onLoopGot(val) {
        console.debug(val)
        console.info(`Retrieved saved Loop.  It is ${val["loop"]}.`)
        loopInput.checked = val["loop"] || false
    }

    function onLoopError(err) {
        console.error(`Error: ${err}`)
    }

    let getPlaybackValue = browser.storage.sync.get("playback_speed")
    getPlaybackValue.then(onPlaybackGot, onPlaybackError)

    let getLoopValue = browser.storage.sync.get("loop")
    getLoopValue.then(onLoopGot, onLoopError)
}


document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);