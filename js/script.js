// hiding error message
document.getElementById('error-message').style.display = 'none';
// getting results from search box
const getResults = phone => {
    const searchBox = document.getElementById('search-box');
    console.log(searchBox.value, 'search box checked');
    searchBox.value = '';
}