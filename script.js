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
   2. DYNAMIC PROPERTIES DISPLAY & MODAL LOGIC
   ========================================================= */
const propertiesContainer = document.querySelector('#properties');

// Expanded Placeholder data with description and dummy video
const mockProperties = [
    {
        id: 1,
        title: "Prime Plot in Jagannath Vihar",
        price: "₹ 45,00,000",
        location: "Nuagaon, Bhubaneswar",
        image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=500&q=80",
        description: "An excellent opportunity to invest in a highly sought-after area. This plot is ready for residential construction with all major utilities (water, electricity) nearby. Close to schools and local markets.",
        video: "https://www.w3schools.com/html/mov_bbb.mp4" 
    },
    {
        id: 2,
        title: "Commercial Space Ready to Move",
        price: "₹ 20,000 / month",
        location: "Khurdha, Odisha",
        image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=500&q=80",
        description: "Perfect for a startup or retail shop. Located on the main road with high foot traffic. Includes dedicated parking space and 24/7 security.",
        video: "https://www.w3schools.com/html/mov_bbb.mp4"
    },
    {
        id: 3,
        title: "Residential Land for Investment",
        price: "₹ 32,00,000",
        location: "Bhubaneswar Outskirts",
        image: "https://images.unsplash.com/photo-1524813686514-a57563d77965?w=500&q=80",
        description: "Secure your future with this rapidly developing land on the outskirts of Bhubaneswar. Excellent road connectivity and future smart-city expansion plans nearby.",
        video: "https://www.w3schools.com/html/mov_bbb.mp4"
    }
];

// Generic functions to open and close any modal by its ID
window.openModalById = function(modalId) {
    document.getElementById(modalId).style.display = "block";
}

window.closeModalById = function(modalId) {
    document.getElementById(modalId).style.display = "none";
    
    // If it's the property modal, pause the video when closed
    if(modalId === 'propertyModal') {
        const video = document.getElementById("modalBody").querySelector('video');
        if (video) video.pause();
    }
}

// Function to open the specific Property Modal and inject data
window.openPropertyModal = function(id) {
    const prop = mockProperties.find(p => p.id === id);
    const modalBody = document.getElementById("modalBody");
    
    modalBody.innerHTML = `
        <div class="modal-details">
            <h2>${prop.title}</h2>
            <p class="location">📍 ${prop.location}</p>
            <p class="price">${prop.price}</p>
            <div class="modal-media">
                <img src="${prop.image}" alt="Main Property Photo">
                <video controls>
                    <source src="${prop.video}" type="video/mp4">
                </video>
            </div>
            <div class="modal-desc">
                <h3>Property Description</h3>
                <p>${prop.description}</p>
            </div>
            <!-- Opens Contact modal from within property modal -->
            <button class="contact-btn" style="width: 200px;" onclick="closeModalById('propertyModal'); openModalById('contactModal');">Contact Manager</button>
        </div>
    `;
    
    openModalById('propertyModal');
}

// Function to generate the HTML cards
function renderProperties(properties) {
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
                <button class="contact-btn" onclick="openPropertyModal(${prop.id})">View Details</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Run the function immediately
renderProperties(mockProperties);

// Close modals when clicking anywhere on the dark background outside the popup
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = "none";
        // Pause video if property modal is closed this way
        if(event.target.id === 'propertyModal') {
            const video = document.getElementById("modalBody").querySelector('video');
            if (video) video.pause();
        }
    }
}


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