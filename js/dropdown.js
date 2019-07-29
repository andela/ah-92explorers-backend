const dropdown = document.querySelector('.dropdown');
const dropdownLinks = document.querySelector('.dropdown-links');
const dropdownLi = document.querySelectorAll('.dropdown-links li')
const notifCount = document.querySelector('.notif-count')
const notifDrop = document.querySelector('.notifications-drop')
dropdown.onclick = (e) => {
    dropdownLinks.style.display = 'inline-grid'
}
Array.from(dropdownLi).map((e) => {
    e.onclick = (el) => {
        dropdownLinks.style.display = 'none';
    }
})

window.onclick = (e) => {
    if (e.target.className === 'dropdown-links') {
        dropdownLinks.style.display = 'none';
    }

    if (e.target.className === 'notifications-drop') {
        notifDrop.style.display = 'none';
    }
}

notifCount.onclick = (e) => {
    notifDrop.style.display = 'block'
}