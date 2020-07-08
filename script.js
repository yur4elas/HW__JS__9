const DOG_IMG = 'https://api.thedogapi.com/v1/images/search';
const CAT_IMG = 'https://api.thecatapi.com/v1/images/search';
const changeAnimals = document.querySelectorAll('.change-animals');
const animalDiv = document.querySelector('.animal');
const choiceResultDiv = document.querySelector('.result-choice');
const btnCange = document.querySelector('.buttons-change');
const dogDiv = document.querySelector('.dog');
const catDiv = document.querySelector('.cat');
const contentDog = document.querySelector('.content-dog');
const contentCat = document.querySelector('.content-cat');
const likeButtons = document.querySelectorAll('.btn-like');
const dislikeButtons = document.querySelectorAll('.btn-dislike');
const resultBtn = document.querySelectorAll('.btn-result');
const mainMenu = document.querySelectorAll('.mainMenu');
// const mainMenu2 = document.querySelectorAll('.mainMenu2');

let arrLike = [];
let arrDislike = [];

let img = document.createElement('img');
img.classList.add('image');

function thisApi(animalLink) {
   fetch(animalLink)
      .then(Response => {
         Response.json()
            .then(data => {
               if (animalLink === DOG_IMG) {
                  img.src = data[0].url
                  img.alt = 'dog';
               } else if (animalLink === CAT_IMG) {
                  img.src = data[0].url
                  img.alt = 'cat';
               };
            });
      });
};

changeAnimals.forEach(element => {
   element.addEventListener('click', val => {
      if (val.target.value === 'dogs') {
         addContent(DOG_IMG, dogDiv, contentDog);
      } else if (val.target.value === 'cats') {
         addContent(CAT_IMG, catDiv, contentCat);
      }
   })
});

function addContent(animalLink, animal, contentAnimal) {
   thisApi(animalLink);
   btnCange.classList.add('hide');
   animalDiv.classList.add('show-flex');
   animal.classList.add('show-block');
   contentAnimal.appendChild(img);

   likeButtons.forEach(element => {
      element.addEventListener('click', () => {
         thisApi(animalLink);
         arrLike.push(img.src);
         console.log(`arrLike = ${arrLike}`);
         document.querySelector('.content-like').innerHTML += `<img src ="${img.src}" alt="like"> `;
      });
   });

   dislikeButtons.forEach(element => {
      element.addEventListener('click', () => {
         thisApi(animalLink);
         arrDislike.push(img.src);
         document.querySelector('.content-dislike').innerHTML += `<img src ="${img.src}" alt="dislike"> `;
         console.log(`arrDislike = ${arrDislike}`);
      });
   });

   resultBtn.forEach(element => {
      element.addEventListener('click', () => {
         if (arrLike.length !== 0 || arrDislike.length !== 0) {
            animalDiv.classList.remove('show-flex');
            choiceResultDiv.classList.add('show-flex');
            let resLike = '';
            let resDislike = '';
            resLike = arrLike.length;
            resDislike = arrDislike.length;
            if (arrDislike.length === 0) {
               document.querySelector('.dislikes').classList.add('hide');
            } else if (arrLike.length === 0) {
               document.querySelector('.likes').classList.add('hide');
            }
            document.querySelector('.result-like').innerHTML = `Нравиться - ${resLike} фото`;
            document.querySelector('.result-dislike').innerHTML = `Не нравиться - ${resDislike} фото`;
         } else {
            alert('Вы еще ничего не оценили!');
         };
      });
   });
};
// mainMenu.forEach(element => {
//    element.addEventListener('click', () => {
//       document.querySelector('.result-like').innerHTML = '';
//       document.querySelector('.result-dislike').innerHTML = '';
//       arrLike = [];
//       arrDislike = [];
//       btnCange.classList.remove('hide');
//       choiceResultDiv.classList.remove('show-flex');
//       dogDiv.classList.remove('show-block');
//       catDiv.classList.remove('show-block');
//       animalDiv.classList.remove('show-flex');
//       document.querySelector('.content-like').innerHTML = '';
//       document.querySelector('.content-dislike').innerHTML = '';
//    });
// });