// hiding error messages
document.getElementById('error-message1').style.display = 'none';
document.getElementById('error-message2').style.display = 'none';

// -------------------*********** getting results from search box **************------------------------
const getResults = () => {
    const searchBox = document.getElementById('search-box');
    const searchBoxValue = searchBox.value;

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
// -------------------*********** displaying the searched result **************------------------------
const displayResults = phones => {
    const resultArea = document.getElementById('result-area');
    resultArea.textContent = '';
    const detailArea = document.getElementById('display-detail');
    // to remove previous search result
    detailArea.textContent = '';
    // showing error message for wrong data search
    if (phones.status == false) {
        document.getElementById('error-message2').style.display = 'block';
    }
    // getting data from api data array
    const phoneData = phones.data;
    const phoneDataFirst20 = phoneData.slice(0, 20);
    phoneDataFirst20.forEach(phone => {
        document.getElementById('error-message2').style.display = 'none';
        const eachResultDiv = document.createElement('div');
        eachResultDiv.classList.add('each-result');
        eachResultDiv.innerHTML = `
            <div class="text-white shadow-xl shadow-slate-400/60 md:hover:scale-90 hover:scale-90 transition duration-500 ease-in-out border flex flex-col justify-center bg-slate-50">
                    <!-- Phone image -->
                    <div class="bg-white px-3 py-8 flex justify-center">
                        <img id="result-image" class="md:w-auto md:h-auto"
                            src="${phone.image}" alt="">
                    </div>
                    <div class="bg-slate-600 pb-2 border border-slate-600">
                    <!-- phone name & brand name -->
                    <div class="pt-4">
                        <p id="phone-name" class="text-xl font-normal px-3 pl-3">${phone.phone_name}</p>
                        <p id="brand-name" class="text-lg font-normal px-3 pl-3">${phone.brand}</p>
                    </div>
                    <!-- details button -->
                    <div class="p-3 pl-3 flex justify-start">
                        <a href="#top-section" class="no-underline">
                            <button onclick="getDetails('${phone.slug}')" id="detail-button"
                            class="border border-none rounded w-28 p-2 shadow-sm focus:outline-none focus:ring-1 flex justify-between bg-cyan-400/[0.4] hover:bg-cyan-500/[0.4] hover:text-white">Details
                            <i class="material-icons text-white">arrow_forward</i></button>
                        </a>
                    </div>
                    </div>
            </div>
        `;
        resultArea.appendChild(eachResultDiv);
    })
}


// ---------------------*********** getting details from details button **************------------------------
const getDetails = phoneId => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayDetails(data));
}
// -------------------------************** displaying details on ui **************---------------------------
const displayDetails = details => {
    const detailArea = document.getElementById('display-detail');
    detailArea.textContent = '';
    const eachDetails = document.createElement('div');
    eachDetails.classList.add('eachDetail');
    detailArea.appendChild(eachDetails);

    // for no releaseDate & no other info
    if (details.data.releaseDate == '' && details.data.others == undefined) {
        eachDetails.innerHTML = `
                <div class="grid md:grid-cols-3 gap-0 mt-5 mb-12">
                    <div class="border md:rounded-l-xl md:rounded-tr-none rounded-t-xl border-none bg-slate-50 md:p-2 p-3 flex md:justify-center justify-start content-center">
                        <img id="result-image" class="w-auto py-8 h-auto" src="${details.data.image}" alt="">
                    </div>
                    <div class="border border-none md:col-span-2 md:p-2 p-2">
                            <p id="phone-name" class="text-2xl font-normal md:px-3 p-2">${details.data.name}</p>
                            <p id="release-date" class="text-lg font-normal md:px-3 p-2">No release date found</p>
                            <hr>
                            <div class="text-lg font-base md:px-3 p-2">
                            <p id="main-feature" class="text-xl font-normal">Main features:</p>
                                <p>Storage: <span class="text-sm">${details.data.mainFeatures.storage}</span></p>
                                <p>Memory: <span class="text-sm">${details.data.mainFeatures.memory}</span></p>
                                <p>Display-size: <span class="text-sm">${details.data.mainFeatures.displaySize}</span></p>
                                <p>Chip-set: <span class="text-sm">${details.data.mainFeatures.chipSet}</span></p>
                                <p>Sensors: <span class="text-sm"> ${details.data.mainFeatures.sensors}</span></p>
                            </div>
                    </div>
                </div>
            `;
    }

    // for no releaseDate info
    else if (details.data.releaseDate == '') {
        console.log('Israt', details.data.releaseDate, 'Tuhin');
        eachDetails.innerHTML = `
                <div class="grid md:grid-cols-3 gap-0 mt-5 mb-12">
                    <div class="border md:rounded-l-xl md:rounded-tr-none rounded-t-xl border-none bg-slate-50 md:p-2 p-3 flex md:justify-center justify-start content-center">
                        <img id="result-image" class="w-auto py-8 h-auto" src="${details.data.image}" alt="">
                    </div>
                    <div class="border border-none md:col-span-2 md:p-2 p-2">
                            <p id="phone-name" class="text-2xl font-normal md:px-3 p-2">${details.data.name}</p>
                            <p id="release-date" class="text-lg font-normal md:px-3 p-2">No release date found</p>
                            <hr>
                            <div class="text-lg font-base md:px-3 p-2">
                            <p id="main-feature" class="text-xl font-normal">Main features:</p>
                                <p>Storage: <span class="text-sm">${details.data.mainFeatures.storage}</span></p>
                                <p>Memory: <span class="text-sm">${details.data.mainFeatures.memory}</span></p>
                                <p>Display-size: <span class="text-sm">${details.data.mainFeatures.displaySize}</span></p>
                                <p>Chip-set: <span class="text-sm">${details.data.mainFeatures.chipSet}</span></p>
                                <p>Sensors: <span class="text-sm"> ${details.data.mainFeatures.sensors}</span></p>
                            </div>
                            <hr>
                            <div class="text-lg font-base md:px-3 px-2 pt-0">
                            <p id="others" class="text-xl font-normal">Others:</p>
                                <p>Bluetooth: <span class="text-sm">${details.data.others.Bluetooth}</span></p>
                                <p>GPS: <span class="text-sm">${details.data.others.GPS}</span></p>
                                <p>NFC: <span class="text-sm">${details.data.others.NFC}</span></p>
                                <p>Radio: <span class="text-sm">${details.data.others.Radio}</span></p>
                                <p>USB: <span class="text-sm">${details.data.others.USB}</span></p>
                                <p>WLAN: <span class="text-sm">${details.data.others.WLAN}</span></p>
                            </div>
                    </div>
                </div>
            `;
    }

    // for no other info
    else if (details.data.others == undefined) {
        console.log('Others item not found');
        eachDetails.innerHTML = `
                <div class="grid md:grid-cols-3 gap-0 mt-5 mb-12">
                    <div class="border md:rounded-l-xl md:rounded-tr-none rounded-t-xl border-none bg-slate-50 md:p-2 p-3 flex md:justify-center justify-start content-center">
                        <img id="result-image" class="w-auto py-8 h-auto" src="${details.data.image}" alt="">
                    </div>
                    <div class="border border-none md:col-span-2 md:p-2 p-2">
                            <p id="phone-name" class="text-2xl font-normal md:px-3 p-2">${details.data.name}</p>
                            <p id="release-date" class="text-lg font-normal md:px-3 p-2">Release date: ${details.data.releaseDate}</p>
                            <hr>
                            <div class="text-lg font-base md:px-3 p-2">
                            <p id="main-feature" class="text-xl font-normal">Main features:</p>
                                <p>Storage: <span class="text-sm">${details.data.mainFeatures.storage}</span></p>
                                <p>Memory: <span class="text-sm">${details.data.mainFeatures.memory}</span></p>
                                <p>Display-size: <span class="text-sm">${details.data.mainFeatures.displaySize}</span></p>
                                <p>Chip-set: <span class="text-sm">${details.data.mainFeatures.chipSet}</span></p>
                                <p>Sensors: <span class="text-sm"> ${details.data.mainFeatures.sensors}</span></p>
                            </div>
                    </div>
                </div>
            `;
    }
    // for all info
    else {
        eachDetails.innerHTML = `
                <div class="shadow-l-2xl grid md:grid-cols-3 gap-0 mt-5 mb-12">
                    <div class="border md:rounded-l-xl md:rounded-tr-none rounded-t-xl border-none bg-slate-50 md:p-2 p-3 flex md:justify-center justify-start content-center">
                        <img id="result-image" class="w-auto py-8 h-auto" src="${details.data.image}" alt="">
                    </div>
                    <div class="border border-none md:col-span-2 md:p-2 p-2">
                            <p id="phone-name" class="text-2xl font-normal md:px-3 p-2">${details.data.name}</p>
                            <p id="release-date" class="text-lg font-normal md:px-3 p-2">Release date: ${details.data.releaseDate}</p>
                            <hr>
                            <div class="text-lg font-base md:px-3 p-2">
                            <p id="main-feature" class="text-xl font-normal">Main features:</p>
                                <p>Storage: <span class="text-sm">${details.data.mainFeatures.storage}</span></p>
                                <p>Memory: <span class="text-sm">${details.data.mainFeatures.memory}</span></p>
                                <p>Display-size: <span class="text-sm">${details.data.mainFeatures.displaySize}</span></p>
                                <p>Chip-set: <span class="text-sm">${details.data.mainFeatures.chipSet}</span></p>
                                <p>Sensors: <span class="text-sm">${details.data.mainFeatures.sensors}</span></p>
                            </div>
                            <hr>
                            <div class="text-lg font-base md:px-3 px-2 pt-0">
                            <p id="others" class="text-xl font-normal">Others:</p>
                                <p>Bluetooth: <span class="text-sm">${details.data.others.Bluetooth}</span></p>
                                <p>GPS: <span class="text-sm">${details.data.others.GPS}</span></p>
                                <p>NFC: <span class="text-sm">${details.data.others.NFC}</span></p>
                                <p>Radio: <span class="text-sm">${details.data.others.Radio}</span></p>
                                <p>USB: <span class="text-sm">${details.data.others.USB}</span></p>
                                <p>WLAN: <span class="text-sm"> ${details.data.others.WLAN}</span></p>
                            </div>
                    </div>
                </div>
            `;
    }

}