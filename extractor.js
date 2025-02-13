function extractSessions() {
    // Find all divs with the specified class
    const sessionDivs = document.querySelectorAll(
        ".f1-utils-inner-padding-tr--half"
    );

    const eventName = document.querySelector('h2.f1-heading__body.f1-heading').firstChild.textContent.trim();
    const countryName = document.querySelector('h1.font-formula.font-bold.text-left').firstChild.textContent.trim();
    const countryFlagCode = getCountryFlagCode(countryName);
    const eventUrl = window.location.href;

    const imgElement = document.querySelector('a.py-xs img');
    let imgSrc = null;

// Extract the 'src' attribute of the <img> element
    if (imgElement) {
        imgSrc = imgElement.src;
        console.log('Image Source:', imgSrc);
    } else {
        console.log('No matching image found.');
    }

    // Array to store session objects
    const sessions = {
        [eventName]: {
            'sessions': [],
            'extra': []
        },
    };

    // Iterate through each session div
    sessionDivs[0].childNodes[0].childNodes.forEach((sessionDiv) => {
        try {
            // Extract the date components
            const dateDiv = sessionDiv.querySelector(".min-w-16");
            const day = dateDiv.querySelector("span").textContent.trim(); // Day (e.g., 16)
            const month = dateDiv.querySelector(".leading-tight.uppercase").textContent.trim(); // Month (e.g., Mar)
            console.log(month);

            // Extract the session name and time
            const sessionName = sessionDiv.querySelector(".f1-heading__body.block.mb-xxs").textContent.trim(); // Session name (e.g., Race)
            const timeTextArray = sessionDiv.querySelector(".f1-text__micro.text-fs-15px span").textContent.trim().replace(' ', '').split('-'); // Time (e.g., 05:00)

            let dates = [];
            timeTextArray.forEach((timeText) => {
                const [hour, minute] = timeText.split(":").map(Number); // Split time into hours and minutes
                const year = new Date().getFullYear(); // Assume current year
                const utcDate = new Date(Date.UTC(year, getMonthIndex(month), parseInt(day), hour - 1, minute)); // Add 1 hour for CET
                const formattedDate = utcDate.toISOString(); // Convert to ISO string
                dates.push(formattedDate);
            });

            // Create a session object
            const session = {
                date_start: dates[0],
                date_end: dates[1] ?? null,
                sessionName,
            };
            // Add the session object to the array
            sessions[eventName].sessions.push(session);
        } catch (error) {
            console.error(error);
        }
    });

    const extraInfo = {
        country_name: countryName,
        country_flag_code: countryFlagCode,
        event_url: eventUrl,
        image: imgSrc
    };

    sessions[eventName].extra.push(extraInfo);

    let savedSessions = localStorage.getItem("sessions");
    if (savedSessions) {
        let saved = JSON.parse(savedSessions);
        saved = {...saved, ...sessions};
        localStorage.setItem("sessions", JSON.stringify(saved));
    } else {
        localStorage.setItem("sessions", JSON.stringify(sessions));
    }

    // Return the sessions as a JSON string
    return JSON.stringify(sessions, null, 2);
}

// Helper function to convert month abbreviations to indices
function getMonthIndex(monthAbbreviation) {
    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];
    return months.indexOf(monthAbbreviation);
}

function getCountryFlagCode(countryName) {
    let countries = [
        {
            "country_name": "Afghanistan",
            "flag_code": "&#127462;&#127467;"
        },
        {
            "country_name": "Aland Islands",
            "flag_code": "&#127462;&#127485;"
        },
        {
            "country_name": "Albania",
            "flag_code": "&#127462;&#127473;"
        },
        {
            "country_name": "Algeria",
            "flag_code": "&#127465;&#127487;"
        },
        {
            "country_name": "American Samoa",
            "flag_code": "&#127462;&#127480;"
        },
        {
            "country_name": "Andorra",
            "flag_code": "&#127462;&#127465;"
        },
        {
            "country_name": "Angola",
            "flag_code": "&#127462;&#127476;"
        },
        {
            "country_name": "Anguilla",
            "flag_code": "&#127462;&#127470;"
        },
        {
            "country_name": "Antarctica",
            "flag_code": "&#127462;&#127478;"
        },
        {
            "country_name": "Antigua & Barbuda",
            "flag_code": "&#127462;&#127468;"
        },
        {
            "country_name": "Argentina",
            "flag_code": "&#127462;&#127479;"
        },
        {
            "country_name": "Armenia",
            "flag_code": "&#127462;&#127474;"
        },
        {
            "country_name": "Aruba",
            "flag_code": "&#127462;&#127484;"
        },
        {
            "country_name": "Ascension Island",
            "flag_code": "&#127462;&#127464;"
        },
        {
            "country_name": "Australia",
            "flag_code": "&#127462;&#127482;"
        },
        {
            "country_name": "Austria",
            "flag_code": "&#127462;&#127481;"
        },
        {
            "country_name": "Azerbaijan",
            "flag_code": "&#127462;&#127487;"
        },
        {
            "country_name": "Bahamas",
            "flag_code": "&#127463;&#127480;"
        },
        {
            "country_name": "Bahrain",
            "flag_code": "&#127463;&#127469;"
        },
        {
            "country_name": "Bangladesh",
            "flag_code": "&#127463;&#127465;"
        },
        {
            "country_name": "Barbados",
            "flag_code": "&#127463;&#127463;"
        },
        {
            "country_name": "Belarus",
            "flag_code": "&#127463;&#127486;"
        },
        {
            "country_name": "Belgium",
            "flag_code": "&#127463;&#127466;"
        },
        {
            "country_name": "Belize",
            "flag_code": "&#127463;&#127487;"
        },
        {
            "country_name": "Benin",
            "flag_code": "&#127463;&#127471;"
        },
        {
            "country_name": "Bermuda",
            "flag_code": "&#127463;&#127474;"
        },
        {
            "country_name": "Bhutan",
            "flag_code": "&#127463;&#127481;"
        },
        {
            "country_name": "Bolivia",
            "flag_code": "&#127463;&#127476;"
        },
        {
            "country_name": "Bosnia & Herzegovina",
            "flag_code": "&#127463;&#127462;"
        },
        {
            "country_name": "Botswana",
            "flag_code": "&#127463;&#127484;"
        },
        {
            "country_name": "Bouvet Island",
            "flag_code": "&#127463;&#127483;"
        },
        {
            "country_name": "Brazil",
            "flag_code": "&#127463;&#127479;"
        },
        {
            "country_name": "British Virgin Islands",
            "flag_code": "&#127483;&#127468;"
        },
        {
            "country_name": "Brunei",
            "flag_code": "&#127463;&#127475;"
        },
        {
            "country_name": "Bulgaria",
            "flag_code": "&#127463;&#127468;"
        },
        {
            "country_name": "Burkina Faso",
            "flag_code": "&#127463;&#127467;"
        },
        {
            "country_name": "Burundi",
            "flag_code": "&#127463;&#127470;"
        },
        {
            "country_name": "Cambodia",
            "flag_code": "&#127472;&#127469;"
        },
        {
            "country_name": "Cameroon",
            "flag_code": "&#127464;&#127474;"
        },
        {
            "country_name": "Canada",
            "flag_code": "&#127464;&#127462;"
        },
        {
            "country_name": "Canary Islands",
            "flag_code": "&#127470;&#127464;"
        },
        {
            "country_name": "Cape Verde",
            "flag_code": "&#127464;&#127483;"
        },
        {
            "country_name": "Caribbean Netherlands",
            "flag_code": "&#127463;&#127478;"
        },
        {
            "country_name": "Cayman Islands",
            "flag_code": "&#127472;&#127486;"
        },
        {
            "country_name": "Central African Republic",
            "flag_code": "&#127464;&#127467;"
        },
        {
            "country_name": "Ceuta & Melilla",
            "flag_code": "&#127466;&#127462;"
        },
        {
            "country_name": "Chad",
            "flag_code": "&#127481;&#127465;"
        },
        {
            "country_name": "Chile",
            "flag_code": "&#127464;&#127473;"
        },
        {
            "country_name": "China",
            "flag_code": "&#127464;&#127475;"
        },
        {
            "country_name": "Christmas Island",
            "flag_code": "&#127464;&#127485;"
        },
        {
            "country_name": "Clipperton Island",
            "flag_code": "&#127464;&#127477;"
        },
        {
            "country_name": "Cocos Islands",
            "flag_code": "&#127464;&#127464;"
        },
        {
            "country_name": "Colombia",
            "flag_code": "&#127464;&#127476;"
        },
        {
            "country_name": "Comoros",
            "flag_code": "&#127472;&#127474;"
        },
        {
            "country_name": "Cook Islands",
            "flag_code": "&#127464;&#127472;"
        },
        {
            "country_name": "Costa Rica",
            "flag_code": "&#127464;&#127479;"
        },
        {
            "country_name": "Croatia",
            "flag_code": "&#127469;&#127479;"
        },
        {
            "country_name": "Cuba",
            "flag_code": "&#127464;&#127482;"
        },
        {
            "country_name": "Curacao",
            "flag_code": "&#127464;&#127484;"
        },
        {
            "country_name": "Cyprus",
            "flag_code": "&#127464;&#127486;"
        },
        {
            "country_name": "Czechia",
            "flag_code": "&#127464;&#127487;"
        },
        {
            "country_name": "Denmark",
            "flag_code": "&#127465;&#127472;"
        },
        {
            "country_name": "Diego Garcia",
            "flag_code": "&#127465;&#127468;"
        },
        {
            "country_name": "Djibouti",
            "flag_code": "&#127465;&#127471;"
        },
        {
            "country_name": "Dominica",
            "flag_code": "&#127465;&#127474;"
        },
        {
            "country_name": "Dominican Republic",
            "flag_code": "&#127465;&#127476;"
        },
        {
            "country_name": "Ecuador",
            "flag_code": "&#127466;&#127464;"
        },
        {
            "country_name": "Egypt",
            "flag_code": "&#127466;&#127468;"
        },
        {
            "country_name": "El Salvador",
            "flag_code": "&#127480;&#127483;"
        },
        {
            "country_name": "Equatorial Guinea",
            "flag_code": "&#127468;&#127478;"
        },
        {
            "country_name": "Eritrea",
            "flag_code": "&#127466;&#127479;"
        },
        {
            "country_name": "Estonia",
            "flag_code": "&#127466;&#127466;"
        },
        {
            "country_name": "Eswatini",
            "flag_code": "&#127480;&#127487;"
        },
        {
            "country_name": "Ethiopia",
            "flag_code": "&#127466;&#127481;"
        },
        {
            "country_name": "European Union",
            "flag_code": "&#127466;&#127482;"
        },
        {
            "country_name": "Falkland Islands",
            "flag_code": "&#127467;&#127472;"
        },
        {
            "country_name": "Faroe Islands",
            "flag_code": "&#127467;&#127476;"
        },
        {
            "country_name": "Fiji",
            "flag_code": "&#127467;&#127471;"
        },
        {
            "country_name": "Finland",
            "flag_code": "&#127467;&#127470;"
        },
        {
            "country_name": "France",
            "flag_code": "&#127467;&#127479;"
        },
        {
            "country_name": "French Guiana",
            "flag_code": "&#127468;&#127467;"
        },
        {
            "country_name": "French Polynesia",
            "flag_code": "&#127477;&#127467;"
        },
        {
            "country_name": "Gabon",
            "flag_code": "&#127468;&#127462;"
        },
        {
            "country_name": "Gambia",
            "flag_code": "&#127468;&#127474;"
        },
        {
            "country_name": "Georgia",
            "flag_code": "&#127468;&#127466;"
        },
        {
            "country_name": "Germany",
            "flag_code": "&#127465;&#127466;"
        },
        {
            "country_name": "Ghana",
            "flag_code": "&#127468;&#127469;"
        },
        {
            "country_name": "Gibraltar",
            "flag_code": "&#127468;&#127470;"
        },
        {
            "country_name": "Greece",
            "flag_code": "&#127468;&#127479;"
        },
        {
            "country_name": "Greenland",
            "flag_code": "&#127468;&#127473;"
        },
        {
            "country_name": "Grenada",
            "flag_code": "&#127468;&#127465;"
        },
        {
            "country_name": "Guadeloupe",
            "flag_code": "&#127468;&#127477;"
        },
        {
            "country_name": "Guam",
            "flag_code": "&#127468;&#127482;"
        },
        {
            "country_name": "Guatemala",
            "flag_code": "&#127468;&#127481;"
        },
        {
            "country_name": "Guernsey",
            "flag_code": "&#127468;&#127468;"
        },
        {
            "country_name": "Guinea",
            "flag_code": "&#127468;&#127475;"
        },
        {
            "country_name": "Guinea-Bissau",
            "flag_code": "&#127468;&#127484;"
        },
        {
            "country_name": "Guyana",
            "flag_code": "&#127468;&#127486;"
        },
        {
            "country_name": "Haiti",
            "flag_code": "&#127469;&#127481;"
        },
        {
            "country_name": "Heard & McDonald Islands",
            "flag_code": "&#127469;&#127474;"
        },
        {
            "country_name": "Honduras",
            "flag_code": "&#127469;&#127475;"
        },
        {
            "country_name": "Hong Kong",
            "flag_code": "&#127469;&#127472;"
        },
        {
            "country_name": "Hungary",
            "flag_code": "&#127469;&#127482;"
        },
        {
            "country_name": "Iceland",
            "flag_code": "&#127470;&#127480;"
        },
        {
            "country_name": "India",
            "flag_code": "&#127470;&#127475;"
        },
        {
            "country_name": "Indonesia",
            "flag_code": "&#127470;&#127465;"
        },
        {
            "country_name": "Iran",
            "flag_code": "&#127470;&#127479;"
        },
        {
            "country_name": "Iraq",
            "flag_code": "&#127470;&#127478;"
        },
        {
            "country_name": "Ireland",
            "flag_code": "&#127470;&#127466;"
        },
        {
            "country_name": "Isle of Man",
            "flag_code": "&#127470;&#127474;"
        },
        {
            "country_name": "Israel",
            "flag_code": "&#127470;&#127473;"
        },
        {
            "country_name": "Italy",
            "flag_code": "&#127470;&#127481;"
        },
        {
            "country_name": "Jamaica",
            "flag_code": "&#127471;&#127474;"
        },
        {
            "country_name": "Japan",
            "flag_code": "&#127471;&#127477;"
        },
        {
            "country_name": "Jersey",
            "flag_code": "&#127471;&#127466;"
        },
        {
            "country_name": "Jordan",
            "flag_code": "&#127471;&#127476;"
        },
        {
            "country_name": "Kazakhstan",
            "flag_code": "&#127472;&#127487;"
        },
        {
            "country_name": "Kenya",
            "flag_code": "&#127472;&#127466;"
        },
        {
            "country_name": "Kiribati",
            "flag_code": "&#127472;&#127470;"
        },
        {
            "country_name": "Kosovo",
            "flag_code": "&#127485;&#127472;"
        },
        {
            "country_name": "Kuwait",
            "flag_code": "&#127472;&#127484;"
        },
        {
            "country_name": "Kyrgyzstan",
            "flag_code": "&#127472;&#127468;"
        },
        {
            "country_name": "Laos",
            "flag_code": "&#127473;&#127462;"
        },
        {
            "country_name": "Latvia",
            "flag_code": "&#127473;&#127483;"
        },
        {
            "country_name": "Lebanon",
            "flag_code": "&#127473;&#127463;"
        },
        {
            "country_name": "Lesotho",
            "flag_code": "&#127473;&#127480;"
        },
        {
            "country_name": "Liberia",
            "flag_code": "&#127473;&#127479;"
        },
        {
            "country_name": "Libya",
            "flag_code": "&#127473;&#127486;"
        },
        {
            "country_name": "Liechtenstein",
            "flag_code": "&#127473;&#127470;"
        },
        {
            "country_name": "Lithuania",
            "flag_code": "&#127473;&#127481;"
        },
        {
            "country_name": "Luxembourg",
            "flag_code": "&#127473;&#127482;"
        },
        {
            "country_name": "Macao",
            "flag_code": "&#127474;&#127476;"
        },
        {
            "country_name": "Macedonia",
            "flag_code": "&#127474;&#127472;"
        },
        {
            "country_name": "Madagascar",
            "flag_code": "&#127474;&#127468;"
        },
        {
            "country_name": "Malawi",
            "flag_code": "&#127474;&#127484;"
        },
        {
            "country_name": "Malaysia",
            "flag_code": "&#127474;&#127486;"
        },
        {
            "country_name": "Maldives",
            "flag_code": "&#127474;&#127483;"
        },
        {
            "country_name": "Mali",
            "flag_code": "&#127474;&#127473;"
        },
        {
            "country_name": "Malta",
            "flag_code": "&#127474;&#127481;"
        },
        {
            "country_name": "Marshall Islands",
            "flag_code": "&#127474;&#127469;"
        },
        {
            "country_name": "Martinique",
            "flag_code": "&#127474;&#127478;"
        },
        {
            "country_name": "Mauritania",
            "flag_code": "&#127474;&#127479;"
        },
        {
            "country_name": "Mauritius",
            "flag_code": "&#127474;&#127482;"
        },
        {
            "country_name": "Mayotte",
            "flag_code": "&#127486;&#127481;"
        },
        {
            "country_name": "Mexico",
            "flag_code": "&#127474;&#127485;"
        },
        {
            "country_name": "Micronesia",
            "flag_code": "&#127467;&#127474;"
        },
        {
            "country_name": "Moldova",
            "flag_code": "&#127474;&#127465;"
        },
        {
            "country_name": "Monaco",
            "flag_code": "&#127474;&#127464;"
        },
        {
            "country_name": "Mongolia",
            "flag_code": "&#127474;&#127475;"
        },
        {
            "country_name": "Montenegro",
            "flag_code": "&#127474;&#127466;"
        },
        {
            "country_name": "Montserrat",
            "flag_code": "&#127474;&#127480;"
        },
        {
            "country_name": "Morocco",
            "flag_code": "&#127474;&#127462;"
        },
        {
            "country_name": "Mozambique",
            "flag_code": "&#127474;&#127487;"
        },
        {
            "country_name": "Myanmar",
            "flag_code": "&#127474;&#127474;"
        },
        {
            "country_name": "Namibia",
            "flag_code": "&#127475;&#127462;"
        },
        {
            "country_name": "Nauru",
            "flag_code": "&#127475;&#127479;"
        },
        {
            "country_name": "Nepal",
            "flag_code": "&#127475;&#127477;"
        },
        {
            "country_name": "Netherlands",
            "flag_code": "&#127475;&#127473;"
        },
        {
            "country_name": "New Caledonia",
            "flag_code": "&#127475;&#127464;"
        },
        {
            "country_name": "New Zealand",
            "flag_code": "&#127475;&#127487;"
        },
        {
            "country_name": "Nicaragua",
            "flag_code": "&#127475;&#127470;"
        },
        {
            "country_name": "Niger",
            "flag_code": "&#127475;&#127466;"
        },
        {
            "country_name": "Nigeria",
            "flag_code": "&#127475;&#127468;"
        },
        {
            "country_name": "Niue",
            "flag_code": "&#127475;&#127482;"
        },
        {
            "country_name": "Norfolk Island",
            "flag_code": "&#127475;&#127467;"
        },
        {
            "country_name": "North Korea",
            "flag_code": "&#127472;&#127477;"
        },
        {
            "country_name": "Northern Mariana Islands",
            "flag_code": "&#127474;&#127477;"
        },
        {
            "country_name": "Norway",
            "flag_code": "&#127475;&#127476;"
        },
        {
            "country_name": "Oman",
            "flag_code": "&#127476;&#127474;"
        },
        {
            "country_name": "Pakistan",
            "flag_code": "&#127477;&#127472;"
        },
        {
            "country_name": "Palau",
            "flag_code": "&#127477;&#127484;"
        },
        {
            "country_name": "Palestinian Territories",
            "flag_code": "&#127477;&#127480;"
        },
        {
            "country_name": "Panama",
            "flag_code": "&#127477;&#127462;"
        },
        {
            "country_name": "Papua New Guinea",
            "flag_code": "&#127477;&#127468;"
        },
        {
            "country_name": "Paraguay",
            "flag_code": "&#127477;&#127486;"
        },
        {
            "country_name": "Peru",
            "flag_code": "&#127477;&#127466;"
        },
        {
            "country_name": "Philippines",
            "flag_code": "&#127477;&#127469;"
        },
        {
            "country_name": "Pitcairn Islands",
            "flag_code": "&#127477;&#127475;"
        },
        {
            "country_name": "Poland",
            "flag_code": "&#127477;&#127473;"
        },
        {
            "country_name": "Portugal",
            "flag_code": "&#127477;&#127481;"
        },
        {
            "country_name": "Puerto Rico",
            "flag_code": "&#127477;&#127479;"
        },
        {
            "country_name": "Qatar",
            "flag_code": "&#127478;&#127462;"
        },
        {
            "country_name": "Romania",
            "flag_code": "&#127479;&#127476;"
        },
        {
            "country_name": "Russia",
            "flag_code": "&#127479;&#127482;"
        },
        {
            "country_name": "Rwanda",
            "flag_code": "&#127479;&#127484;"
        },
        {
            "country_name": "Samoa",
            "flag_code": "&#127484;&#127480;"
        },
        {
            "country_name": "San Marino",
            "flag_code": "&#127480;&#127474;"
        },
        {
            "country_name": "Saudi Arabia",
            "flag_code": "&#127480;&#127462;"
        },
        {
            "country_name": "Senegal",
            "flag_code": "&#127480;&#127475;"
        },
        {
            "country_name": "Serbia",
            "flag_code": "&#127479;&#127480;"
        },
        {
            "country_name": "Seychelles",
            "flag_code": "&#127480;&#127464;"
        },
        {
            "country_name": "Sierra Leone",
            "flag_code": "&#127480;&#127473;"
        },
        {
            "country_name": "Singapore",
            "flag_code": "&#127480;&#127468;"
        },
        {
            "country_name": "Sint Maarten",
            "flag_code": "&#127480;&#127485;"
        },
        {
            "country_name": "Slovakia",
            "flag_code": "&#127480;&#127472;"
        },
        {
            "country_name": "Slovenia",
            "flag_code": "&#127480;&#127470;"
        },
        {
            "country_name": "Solomon Islands",
            "flag_code": "&#127480;&#127463;"
        },
        {
            "country_name": "Somalia",
            "flag_code": "&#127480;&#127476;"
        },
        {
            "country_name": "South Africa",
            "flag_code": "&#127487;&#127462;"
        },
        {
            "country_name": "South Korea",
            "flag_code": "&#127472;&#127479;"
        },
        {
            "country_name": "South Sudan",
            "flag_code": "&#127480;&#127480;"
        },
        {
            "country_name": "Spain",
            "flag_code": "&#127466;&#127480;"
        },
        {
            "country_name": "Sri Lanka",
            "flag_code": "&#127473;&#127472;"
        },
        {
            "country_name": "St. Barthelemy",
            "flag_code": "&#127463;&#127473;"
        },
        {
            "country_name": "St. Helena",
            "flag_code": "&#127480;&#127469;"
        },
        {
            "country_name": "St. Kitts & Nevis",
            "flag_code": "&#127472;&#127475;"
        },
        {
            "country_name": "St. Lucia",
            "flag_code": "&#127473;&#127464;"
        },
        {
            "country_name": "St. Martin",
            "flag_code": "&#127474;&#127467;"
        },
        {
            "country_name": "St. Pierre & Miquelon",
            "flag_code": "&#127477;&#127474;"
        },
        {
            "country_name": "St. Vincent & Grenadines",
            "flag_code": "&#127483;&#127464;"
        },
        {
            "country_name": "Sudan",
            "flag_code": "&#127480;&#127465;"
        },
        {
            "country_name": "Suriname",
            "flag_code": "&#127480;&#127479;"
        },
        {
            "country_name": "Svalbard & Jan Mayen",
            "flag_code": "&#127480;&#127471;"
        },
        {
            "country_name": "Sweden",
            "flag_code": "&#127480;&#127466;"
        },
        {
            "country_name": "Switzerland",
            "flag_code": "&#127464;&#127469;"
        },
        {
            "country_name": "Syria",
            "flag_code": "&#127480;&#127486;"
        },
        {
            "country_name": "Taiwan",
            "flag_code": "&#127481;&#127484;"
        },
        {
            "country_name": "Tajikistan",
            "flag_code": "&#127481;&#127471;"
        },
        {
            "country_name": "Tanzania",
            "flag_code": "&#127481;&#127487;"
        },
        {
            "country_name": "Thailand",
            "flag_code": "&#127481;&#127469;"
        },
        {
            "country_name": "Timor-Leste",
            "flag_code": "&#127481;&#127473;"
        },
        {
            "country_name": "Togo",
            "flag_code": "&#127481;&#127468;"
        },
        {
            "country_name": "Tokelau",
            "flag_code": "&#127481;&#127472;"
        },
        {
            "country_name": "Tonga",
            "flag_code": "&#127481;&#127476;"
        },
        {
            "country_name": "Trinidad & Tobago",
            "flag_code": "&#127481;&#127481;"
        },
        {
            "country_name": "Tristan da Cunha",
            "flag_code": "&#127481;&#127462;"
        },
        {
            "country_name": "Tunisia",
            "flag_code": "&#127481;&#127475;"
        },
        {
            "country_name": "Turkey",
            "flag_code": "&#127481;&#127479;"
        },
        {
            "country_name": "Turkmenistan",
            "flag_code": "&#127481;&#127474;"
        },
        {
            "country_name": "Turks & Caicos Islands",
            "flag_code": "&#127481;&#127464;"
        },
        {
            "country_name": "Tuvalu",
            "flag_code": "&#127481;&#127483;"
        },
        {
            "country_name": "U.S. Outlying Islands",
            "flag_code": "&#127482;&#127474;"
        },
        {
            "country_name": "U.S. Virgin Islands",
            "flag_code": "&#127483;&#127470;"
        },
        {
            "country_name": "Uganda",
            "flag_code": "&#127482;&#127468;"
        },
        {
            "country_name": "Ukraine",
            "flag_code": "&#127482;&#127462;"
        },
        {
            "country_name": "United Arab Emirates",
            "flag_code": "&#127462;&#127466;"
        },
        {
            "country_name": "United Kingdom",
            "flag_code": "&#127468;&#127463;"
        },
        {
            "country_name": "United States",
            "flag_code": "&#127482;&#127480;"
        },
        {
            "country_name": "Uruguay",
            "flag_code": "&#127482;&#127486;"
        },
        {
            "country_name": "Uzbekistan",
            "flag_code": "&#127482;&#127487;"
        },
        {
            "country_name": "Vanuatu",
            "flag_code": "&#127483;&#127482;"
        },
        {
            "country_name": "Vatican City",
            "flag_code": "&#127483;&#127462;"
        },
        {
            "country_name": "Venezuela",
            "flag_code": "&#127483;&#127466;"
        },
        {
            "country_name": "Vietnam",
            "flag_code": "&#127483;&#127475;"
        },
        {
            "country_name": "Wallis & Futuna",
            "flag_code": "&#127484;&#127467;"
        },
        {
            "country_name": "Western Sahara",
            "flag_code": "&#127466;&#127469;"
        },
        {
            "country_name": "Yemen",
            "flag_code": "&#127486;&#127466;"
        },
        {
            "country_name": "Zambia",
            "flag_code": "&#127487;&#127474;"
        },
        {
            "country_name": "Zimbabwe",
            "flag_code": "&#127487;&#127484;"
        }
    ];

    return countries.find(country => country.country_name === countryName)?.flag_code ?? null;
}

console.log(extractSessions());
