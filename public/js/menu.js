const currentUrl = window.location.pathname;

document.querySelectorAll('.menu a').forEach((item) => {
    if (currentUrl == item.getAttribute('href')) {
        item.classList.add('active');
    }
})