/**
 * 1. Вибрати поле для гри.  -ok-
 * 2. Заповнити ігрове поле карточками(тегами <li>).
 * 3. Зробити клік по карткам.
 * 4. Зробити перегортання карток:
 *      - розміщаємо картинки для кожної карти;
 *      - показуємо картинку.
 * 5. Якщо вибрано 2 карти - перевіряємо на співпадіння:
 *      - якщо карти спавпадають, то видаляємо картки;
 *      - перегорнути всі вибрані картки.
 * 6. Якщо всі картки видалені, вивести вікно з перезапуском гри.
 * 7. При кліці на кнопку перезапуску оновлюємо сторінку.
 */
var deletedCards = 0;

var btnLvl1 = document.querySelector('#lvl-1');

var btnLvl2 = document.querySelector('#lvl-2');

var btnLvl3 = document.querySelector('#lvl-3');

var cardsField1 = document.querySelector("#cards1");

var cardsField2 = document.querySelector("#cards2");

var cardsField3 = document.querySelector("#cards3");

var resetBlock = document.querySelector("#reset");

var btnReset = document.querySelector('#reset-btn');

var images = "";

var countCards = "";

var lvl = 1;

var cardsField = "";
if(btnLvl1.classList.contains('action')){
    lvl =1;
} else if(btnLvl2.classList.contains('action')){
    lvl = 2;
} else if (btnLvl3.classList.contains('action')){
    lvl = 3;
}



var images1 = [
    1,2,3,4,
    5,6,7,8,
    1,2,3,4,
    5,6,7,8
]

var images2 = [
    1,2,3,4,5,6,
    7,8,9,10,11,12,
    13,14,15,16,17,18,
    1,2,3,4,5,6,
    7,8,9,10,11,12,
    13,14,15,16,17,18
]

var images3 = [
    1,2,3,4,5,6,7,8,9,
    10,11,12,13,14,15,16,17,18,
    19,20,21,22,23,24,25,26,27,
    1,2,3,4,5,6,7,8,9,
    10,11,12,13,14,15,16,17,18,
    19,20,21,22,23,24,25,26,27
]

switch (lvl) {
    case 1:
      cardsField = cardsField1;
      images = shuffle(images1);
      countCards = 16;
      for (var i = 0; i < countCards; i = i + 1) {
        var li = document.createElement("li");
        li.id = i;
        cardsField1.appendChild(li);
      }
      break;
    case 2:
      cardsField = cardsField2;
      images = shuffle(images2);
      countCards = 36;
      for (var i = 0; i < countCards; i = i + 1) {
        var li = document.createElement("li");
        li.id = i;
        cardsField2.appendChild(li);
      }
      break;
    case 3:
      cardsField = cardsField3;
      images = shuffle(images3);
      countCards = 54;
      for (var i = 0; i < countCards; i = i + 1) {
        var li = document.createElement("li");
        li.id = i;
        cardsField3.appendChild(li);
      }
      break;
  }

var selected = [];

var pause = false;



/**
*/




cardsField.onclick = function(event){
    
        if(pause == false){
            var element = event.target;
                if(element.tagName == "LI" && element.className != "active"){
                selected.push(element);
                element.className = "active"
                var img;
                switch(lvl){
                    case 1:
                        img = images1[element.id];
                        break;
                    case 2:
                        img = images2[element.id];
                        break;
                    case 3:
                        img = images3[element.id];
                        break
                }
                element.style.backgroundImage = "url(images/" + img +".png)";
                    if(selected.length == 2){
                    pause = true;
                        if (images[selected[0].id] == images[selected[1].id]){
                        selected[0].style.visibility = "hidden";
                        selected[1].style.visibility = "hidden";
                        deletedCards = deletedCards + 2;
                        }
                    setTimeout(refreshCards, 600) 
            
                    }
                }
        }
    
}

function refreshCards(){
    for(var i = 0; i < countCards; i = i + 1){
        cardsField.children[i].className = "";
        cardsField.children[i].style.backgroundImage = 'url("images/back.png")';
        if(deletedCards == countCards){
            resetBlock.style.display = "block";
        }
        selected = [];
        pause = false;
    }
}

btnReset.onclick = function(){
    location.reload();
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // Пока остаются элементы для перестановки
    while (currentIndex !== 0) {
      // Выбираем случайный индекс
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // Меняем текущий элемент с выбранным случайным элементом
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }