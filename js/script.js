// hiding error messages
document.getElementById('error-message1').style.display = 'none';
document.getElementById('error-message2').style.display = 'none';

// getting results from search box
const getResults = () => {
    const searchBox = document.getElementById('search-box');
    const searchBoxValue = searchBox.value;
    // console.log(searchBox.value, 'search box checked');

    //showing error message for empty search attempt
    if (searchBoxValue == '') {
        document.getElementById('error-message1').style.display = 'block';
    }
    // clear the input field
    searchBox.value = '';
    // fetching data from api
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchBoxValue}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayResults(data));
}
// displaying searched result
const displayResults = phone => {
    // console.log(phone.status);
    // showing error message for wrong search
    if (phone.status == false) {
        document.getElementById('error-message2').style.display = 'block';
    }
}