function getStartedBtn() {
    const isLoggedIn = false

    if (isLoggedIn) {
        window.location.href = 'addRoundup.html'
    } else {
        window.location.href = 'signIn.html?getStarted=true'
    }
}

function goToHowItWorks() {
    window.location.href = 'howItWorks.html'
}