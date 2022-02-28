// hiding error messages
document.getElementById('error-message1').style.display = 'none';
document.getElementById('error-message2').style.display = 'none';

// getting results from search box
const getResults = () => {
    const searchBox = document.getElementById('search-box');
    const searchBoxValue = searchBox.value;
    // console.log(searchBox.value, 'search box checked');

    if (searchBoxValue == '') {
        //showing error message for empty search attempt
        document.getElementById('error-message1').style.display = 'block';
        document.getElementById('error-message2').style.display = 'none';
    }
    else {
        // hiding error message
        document.getElementById('error-message1').style.display = 'none';
        // fetching data from api
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchBoxValue}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displayResults(data));
    }
    // clear the input field
    searchBox.value = '';
}
// displaying searched result
const displayResults = phones => {
    // showing error message for wrong search
    if (phones.status == false) {
        document.getElementById('error-message2').style.display = 'block';
    }
    // getting data from api data array
    const resultArea = document.getElementById('result-area');
    resultArea.textContent = ''; // to remove previous search result
    for (const phone of phones.data) {
        document.getElementById('error-message2').style.display = 'none';
        console.log(phone);
        const eachResultDiv = document.createElement('div');
        eachResultDiv.classList.add('each-result');
        eachResultDiv.innerHTML = `
        <div class="border border-none rounded-lg flex flex-col justify-center bg-slate-50">
                    <!-- Phone image -->
                    <div class="p-3 flex justify-center">
                        <img id="result-image" class="md:w-auto md:h-auto"
                            src="${phone.image}" alt="">
                    </div>
                    <!-- phone name & brand name -->
                    <div>
                        <p id="phone-name" class="text-xl font-normal px-3">${phone.phone_name}</p>
                        <p id="brand-name" class="text-lg font-normal px-3">${phone.brand}</p>
                    </div>
                    <!-- details button -->
                    <div class="p-3 flex justify-start">
                        <button id="detail-button"
                            class="border border-none rounded w-28 p-2 shadow-sm focus:outline-none focus:ring-1 flex justify-between bg-cyan-500/[0.4] hover:bg-cyan-600 hover:text-white">Details
                            <i class="material-icons text-cyan-600 hover:text-white">arrow_forward</i></button>
                    </div>
        </div>
                `;
        resultArea.appendChild(eachResultDiv);
    }

}