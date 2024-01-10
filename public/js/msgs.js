window.onload = function() {
    console.log('msgs.js loaded');
    const msgsElement = document.querySelector('.msgs');
    if (msgsElement) {
        msgsElement.scrollTop = msgsElement.scrollHeight;
    }
};
