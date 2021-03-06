const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photodArray = [];
// Unsplash API
const count = 5;
const apiKey = 'S0HAT8FceCkKeFqjuSL938MvO1yFFj5SphXzcPKyG8g';
const apiUrl =  `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Chck if all images were loaded
function imageLoaded() {
    imagesLoaded++;
    if(imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        count = 30;
    }
}

// Helper function to set Attributes on DOM Elements
function setAttributes(element, attribute) {
    for (const key in attribute){
        element.setAttribute(key,attribute[key])
    }
}


// Create Elements for Links & Photos, Add to DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photodArray.length;
    photodArray.forEach((photo) => {
        // Create <a> to Link to unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        });
        // item.setAttribute('href', photo.links.html);
        // item.setAttribute('target', '_blank');
        // create <img> for phot
        const img = document.createElement('img');
        // img.setAttribute('src', photo.urls.regular);
        // img.setAttribute('alt', photo.alt_description);
        // img.setAttribute('title', photo.alt_description);
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });
        // Event Listener, check when each is finished loading
        img.addEventListener('load', imageLoaded)
        // Put <img> inside <a>, then put both inide imagecontainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);

    });
}
// Get Photos from UnSpalash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photodArray = await response.json();
        displayPhotos();
    } catch (error) {
        // Catch Error Here
    }
}

// check to see if scrolling near bottom of page, Load More Photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotos();
    }
});

// onLoad
getPhotos();