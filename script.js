/* =========================================================
   1. SMOOTH SCROLLING FOR NAVIGATION
   ========================================================= */
// This makes the page slide smoothly when clicking the top menu links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

/* =========================================================
   2. DYNAMIC PROPERTIES DISPLAY (MOCK DATA)
   ========================================================= */
const propertiesContainer = document.querySelector('#properties');

// Placeholder data to show the client how it will look
const mockProperties = [
    {
        title: "Prime Plot in Jagannath Vihar",
        price: "₹ 45,00,000",
        location: "Nuagaon, Bhubaneswar",
        image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=500&q=80" // Placeholder land image
    },
    {
        title: "Commercial Space Ready to Move",
        price: "₹ 20,000 / month",
        location: "Khurdha, Odisha",
        image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=500&q=80" // Placeholder building image
    },
    {
        title: "Residential Land for Investment",
        price: "₹ 32,00,000",
        location: "Bhubaneswar Outskirts",
        image: "https://images.unsplash.com/photo-1524813686514-a57563d77965?w=500&q=80" // Placeholder land image
    }
];

// Function to generate the HTML cards for the properties
function renderProperties(properties) {
    // Clear out the "Coming soon" text from the HTML
    propertiesContainer.innerHTML = '<h2>Featured Properties</h2><div class="property-grid"></div>';
    const grid = propertiesContainer.querySelector('.property-grid');

    properties.forEach(prop => {
        const card = document.createElement('div');
        card.className = 'property-card';
        card.innerHTML = `
            <img src="${prop.image}" alt="${prop.title}">
            <div class="property-info">
                <h3>${prop.title}</h3>
                <p class="location">📍 ${prop.location}</p>
                <p class="price">${prop.price}</p>
                <button class="contact-btn">Enquire Now</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Run the function immediately to show the mock data
renderProperties(mockProperties);


/* =========================================================
   3. SUPABASE INTEGRATION (For later)
   ========================================================= */
/*
  When you set up your Supabase project (just like you did for your fantasy cricket app!), 
  uncomment the code below. Replace the URL and KEY with your new Supabase project details.
*/

/*
const SUPABASE_URL = 'YOUR_SUPABASE_PROJECT_URL';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';

async function fetchPropertiesFromSupabase() {
    try {
        // Assuming you create a table named 'properties' in Supabase
        const response = await fetch(`${SUPABASE_URL}/rest/v1/properties?select=*`, {
            headers: {
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
            }
        });
        const realData = await response.json();
        
        // This will overwrite the mock data with your real Supabase data!
        if(realData.length > 0) {
            renderProperties(realData); 
        }
    } catch (error) {
        console.error("Error fetching properties from Supabase:", error);
    }
}

// fetchPropertiesFromSupabase();
*/