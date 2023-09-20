const apiKey = '7d72e2c36f7a4075bb4de4a48c25f983';
let country = "America";
let city = "Los Angeles";
let country_capital = "Washington";
let ip = generateRandomIP();

function getRayID() {
    let hexId = '';
    for (let i = 0; i < 16; i++) {
        hexId += Math.floor(Math.random() * 16).toString(16);
    }
    return hexId;
}

function getIP() {
    return fetch('https://api.ipgeolocation.io/getip')
        .then(response => response.json())
        .then(data => data.ip)
        .catch(error => {
            console.error('Error fetching IP:', error);
            return ip; // Return the default value in case of an error
        });
}

function generateRandomIP() {
    const segment1 = Math.floor(Math.random() * 256);
    const segment2 = Math.floor(Math.random() * 256);
    const segment3 = Math.floor(Math.random() * 256);
    const segment4 = Math.floor(Math.random() * 256);

    return `${segment1}.${segment2}.${segment3}.${segment4}`;
}

function getGeoLocation(ipAddress) {
    return fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}&ip=${ipAddress}`)
        .then(response => response.json())
        .then(data => {
            const country = data.country_name;
            const country_capital = data.country_capital;
            const city = data.city;

            if (city !== null) {
                return city;
            } else if (country_capital !== null) {
                return country_capital;
            } else {
                return country;
            }
        })
        .catch(error => {
            console.error('Error fetching geoLocation:', error);
            return city; // Return the default value in case of an error
        });
}

window.onload = async function () {
    document.getElementById('ray-id').innerText = getRayID();
    const ipElement = document.getElementById('cf-footer-ip');
    const cityElement = document.getElementById('city');

    try {
        ip = await getIP();
        const geoLocation = await getGeoLocation(ip);
        cityElement.innerText = geoLocation;
        ipElement.innerText = ip;
    } catch (error) {
        console.error(error);
    }
};

document.addEventListener('DOMContentLoaded', function () {
    const redirectButton = document.getElementById('cf-footer-ip');

    redirectButton.addEventListener('click', function () {
        // Replace 'https://example.com' with the URL you want to redirect to.
        window.location.href = 'https://nextcloud.inecdote.com/index.php/login';
    });

    // Uncomment the line below to show the hidden button after a delay.
    // redirectButton.style.display = 'block'; // or 'inline-block' for inline style
});
