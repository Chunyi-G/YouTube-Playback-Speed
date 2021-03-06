// Re-set playback speed if the setting changes
browser.storage.onChanged.addListener((settings) => {
    console.info("Extension settings changed.")
    console.info("Changed values")
    for (key in settings) {
        console.info(`\t${key}: ${settings[key]["newValue"]}`)
    }

    if ("playback_speed" in settings) {
        setPlaybackSpeed()
    }

    if ("loop" in settings) {
        setLoop()
    }
})

// Set the playback speed
function setPlaybackSpeed() {
    function onGot(val) {
        let videoElementList = document.getElementsByTagName("video")
        if (videoElementList.length > 0)
        {
            console.info(`Set playback speed.  It is ${val["playback_speed"]}.`)
            videoElementList[0].playbackRate=val["playback_speed"] || 1
        }
    }

    function onError(err) {
        console.error(`Error: ${err}`)
    }

    let getValue = browser.storage.sync.get("playback_speed")
    getValue.then(onGot, onError)
}

function setLoop(){
    function onGot(val) {
        let videoElementList = document.getElementsByTagName("video")
        if (videoElementList.length > 0)
        {
            console.info(`Set Loop.  It is ${val["loop"]}.`)
            videoElementList[0].loop=val["loop"] || false
        }
    }

    function onError(err) {
        console.error(`Error: ${err}`)
    }

    let getValue = browser.storage.sync.get("loop")
    getValue.then(onGot, onError)
}

setPlaybackSpeed()
setLoop()