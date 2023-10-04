//import images back-end//

const imagesContainer = document.querySelector('.gallery')

function createWorkFigure(work) {
  const figure = document.createElement('figure')
  const figureCaption = document.createElement('figcaption')
  const figureImage = document.createElement('img')

  figureImage.src = work.imageUrl
  figureImage.alt = work.title
  figureCaption.innerHTML = work.title
  figure.setAttribute('data-id', work.id);
  figure.setAttribute('category-id', work.categoryId)
  
  figure.appendChild(figureImage)
  figure.appendChild(figureCaption)    

  return figure;
}

fetch('http://localhost:5678/api/works')
  .then((response) => response.json())
  .then((data) => {
    data.forEach((work) => {
      const figure = createWorkFigure(work);
      imagesContainer.appendChild(figure);
    });
  });

//filtres//

function filtreobjet(){
    const element = document.querySelectorAll('div.gallery figure');
    elements.forEach((element)=>{
        const categoryId = element.getAttribute('category-id');
        if (categoryId === '1'){
            element.style.display = 'block';
        }else {
            element.style.display = 'none';
        }
    });
}

var bouton = document.getElementById('btnObjet');
bouton.addEventListener('click',filtreobjet);

function filtreappartement () {
    const element = document.querySelectorAll ('div.gallery figure');
    elements.forEach((element)=>{
        const categoryId = element.getAttribute('category-id');
        if (categoryId === '2'){
            element.style.display = 'block';
        }else {
            element.style.display = 'none';
        }
    });
}

var bouton = document.getElementById('btnAppartement');
bouton.addEventListener('click',filtreappartement);

function filtrehotel (){
    const element = document.querySelectorAll('div.gallery figure');
    elements.forEach((element)=>{
        const categoryId = element.getAttribute('category-id');
        if (categoryId === '3'){
            element.style.display = 'block';
        }else {
            element.style.display = 'none';
        }
})
}
var bouton = document.getElementById('btnHotelRestaurant');
bouton.addEventListener('click' filtrehotel);