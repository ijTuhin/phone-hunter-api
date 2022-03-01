// hiding error messages
document.getElementById('error-message1').style.display = 'none';
document.getElementById('error-message2').style.display = 'none';

// -------------------*********** getting results from search box
const getResults = () => {
    const searchBox = document.getElementById('search-box');
    const searchBoxValue = searchBox.value;
    // console.log(searchBox.value, 'search box checked');

    if (searchBoxValue == '') {
        //showing error message for empty search attempt
        document.getElementById('error-message1').style.display = 'block';
        document.getElementById('error-message2').style.display = 'none';
        document.getElementById('result-area').textContent = '';
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
// -------------------*********** displaying searched result
const displayResults = phones => {
    // showing error message for wrong search
    if (phones.status == false) {
        document.getElementById('error-message2').style.display = 'block';
    }
    // getting data from api data array
    const resultArea = document.getElementById('result-area');
    resultArea.textContent = ''; // to remove previous search result
    const phoneData = phones.data;
    phoneData.forEach(phone => {
        document.getElementById('error-message2').style.display = 'none';
        // console.log(phone);
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
                        <button onclick="getDetails('${phone.slug}')" id="detail-button"
                            class="border border-none rounded w-28 p-2 shadow-sm focus:outline-none focus:ring-1 flex justify-between bg-cyan-500/[0.4] hover:bg-cyan-600 hover:text-white">Details
                            <i class="material-icons text-cyan-600 hover:text-white">arrow_forward</i></button>
                    </div>
        </div>
                `;
        resultArea.appendChild(eachResultDiv);
        // console.log(phone.slug);
    })
}


// -------------------*********** getting details from details button

const getDetails = phoneId => {
    // console.log(phoneId);
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayDetails(data));
}
const displayDetails = details => {
    console.log(details.data);
    if (details.data.releaseDate == '') {
        // details.data.releaseDate = '';
        console.log('Israt', details.data.releaseDate, 'Tuhin');
    }
    else {
        // console.log(details.data.releaseDate);
        const detailArea = document.getElementById('display-detail');
        const eachDetails = document.createElement('div');
        eachDetails.classList.add('eachDetail');
        eachDetails.innerHTML = `
        <div class="grid md:grid-cols-3 gap-4 md:mr-40 my-5">
                    <div class="border border-slate-300 md:p-2">
                        <div class=" flex justify-center">
                            <img id="result-image" class="w-80 md:w-96 h-96"
                                src="${details.data.image}" alt="">
                        </div>
                    </div>
                    <div class="border border-slate-300 md:col-span-2 md:p-2">
                        <div>
                            <p id="phone-name" class="text-2xl font-normal md:px-3">${details.data.name}</p>
                            <p id="release-date" class="text-lg font-normal md:px-3">Release date: ${details.data.releaseDate}</p>
                            <hr>
                            <p id="main-feature" class="text-xl font-normal md:px-3">Main features:</p>
                            <div class="text-base">
                                <p class="font-normal md:px-3">Storage: ${details.data.mainFeatures.storage}</p>
                                <p class="font-normal md:px-3">Memory: ${details.data.mainFeatures.memory}</p>
                                <p class="font-normal md:px-3">Display-size: ${details.data.mainFeatures.displaySize}</p>
                                <p class="font-normal md:px-3">Chip-set: ${details.data.mainFeatures.chipSet}</p>
                                <p class="font-normal md:px-3">Sensors:</p>
                            </div>
                            <hr>
                            <p id="others" class="text-xl font-normal md:px-3">Others:</p>
                            <div class="text-base">
                                <p class="font-normal md:px-3">Bluetooth: ${details.data.others.Bluetooth}</p>
                                <p class="font-normal md:px-3">GPS: ${details.data.others.GPS}</p>
                                <p class="font-normal md:px-3">NFC: ${details.data.others.NFC}</p>
                                <p class="font-normal md:px-3">Radio: ${details.data.others.Radio}</p>
                                <p class="font-normal md:px-3">USB: ${details.data.others.USB}</p>
                                <p class="font-normal md:px-3">WLAN: ${details.data.others.WLAN}</p>
                            </div>
                        </div>
                    </div>
        </div>
        `;
        detailArea.appendChild(eachDetails);
    }
}