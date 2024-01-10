document.querySelectorAll('select').forEach(select => {
    select.addEventListener('change', () => {
        console.log('select change')
        select.closest('form').submit();
    })
})