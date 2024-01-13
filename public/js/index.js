let nb = 1

setInterval(function () {
    const text = document.querySelector('.animated-text-in')
    text.classList.remove('animated-text-in')
    text.classList.add('animated-text-out')

    nb++

    if (nb > 5) {
        nb = 1
    }

    const id = `an-t-${nb}`

    const text2 = document.getElementById(id)
    text2.classList.remove('animated-text-out')
    text2.classList.add('animated-text-in')

}, 2000)