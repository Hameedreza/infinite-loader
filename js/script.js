const imageContainer = document.querySelector('.image-container');
const loader = document.querySelector('.loader');

let count = 10;
const apiKey= '4QNnh16-plUsonlvppr3rKt-ylqRjAv2jEv-_qybfAM';
let unsplshURL = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}&topics=Architecture,People`;

let photosArray = [];
let imagesLoaded = 0;
let totalImages = 0;
let ready = false;


// Check if all images were loaded
const imageLoaded = ()=>{
  imagesLoaded++;
  if(imagesLoaded === totalImages){
    ready = true;
    loader.hidden = true;
    count = 30;
  }
}


const getPhotos = async()=>{
  try{
    const response = await(await fetch(unsplshURL)).json();
    photosArray = response;
  } catch(e){
    console.log({error : e});
  }
  return photosArray;
}


/**
 * Helper funciont to set atrributes on DOM Elemnts(DRY)
 */

function setAttributes(elemnt , atrributes) {
  for(let key in atrributes){
    elemnt.setAttribute(key , atrributes[key]);
  }
}

const displayPhotos = async()=>{
  await   getPhotos();
  imagesLoaded = 0;
  totalImages = photosArray.length;
  photosArray.forEach(photo=>{
    // Create <a> to link to Unsplash
    const item = document.createElement('a');
    setAttributes(item , {
      href : photo.links.html,
      target : '_blank'
    });
    // Create <img> for photo
    const img = document.createElement('img');
    setAttributes(img , {
      src : photo.urls.regular,
      alt : photo.alt_description,
      title : photo.alt_description
    });

    img.addEventListener('load' , imageLoaded);
    // Put <img> inside <a> , then Put both inside imageContainer Element
    item.appendChild(img);
    imageContainer.appendChild(item);
  })
}


// Check to see if scrolling near bottom of the page , Load more photos
window.addEventListener('scroll' , (e)=>{
  if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
    displayPhotos();
    ready = false;
  }
})



displayPhotos();