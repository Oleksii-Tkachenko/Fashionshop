// webp support

function testWebP(callback) {
    var webP = new Image();
    webP.onload = webP.onerror = function () {
        callback(webP.height == 2);
    };
    webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";

}

testWebP(function (support) {
    if (support == true) {
        document.querySelector('body').classList.add('webp');
    } else {
        document.querySelector('body').classList.add('no-webp');
    }

});

// timer

class Countdown{
    constructor(id) {
        this.timer = document.getElementById(id);
        this.expireDate = this.addDays(new Date(), 100); // adding 100 days to expire
        this.main();
        setInterval(this.main.bind(this), 1000);
    }
    addDays(date, days) {
        const copy = new Date(Number(date))
        copy.setDate(date.getDate() + days)
        return copy
    }
    main(){
        this.getTime("getDay",".days");
        this.getTime("getHours",".hours");
        this.getTime("getMinutes",".minutes");
        this.getTime("getSeconds",".seconds");
    }
    getTime(methodName, cssClass) {
        let today = new Date(),
            timeLeft = this.expireDate - today,
            place = this.timer.querySelector(cssClass),
            time = null;
            if (methodName == "getDay") {
                time = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            } else if (methodName == "getHours") {
                time = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)); 
            } else if (methodName == "getMinutes") {
                time = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            } else if (methodName == "getSeconds") {
                time = Math.floor((timeLeft % (1000 * 60)) / 1000);
            }
        place.innerText = time < 10 ? `0${time}` : time;
    }
}
let countdown1 = new Countdown("timer");

// icons hover

(function(){
    let image = document.querySelectorAll("[data-image]");

    [...image].forEach((item)=>{
        let alt = item.getAttribute("alt");
        item.addEventListener('mouseover', ()=>{
            item.setAttribute("src", `img/icons/${alt}_alt.svg`);
        });
        item.addEventListener('mouseout', ()=>{
            item.setAttribute("src", `img/icons/${alt}.svg`);
        });
    });
}());

// scroll up

function showUpArrow() {
    if (document.documentElement.scrollWidth >= 1000){
        if(window.pageYOffset  >= 2500){
                $('.pageup').fadeIn();
            }  else {
                $('.pageup').fadeOut();
            }
    } else {
        $('.pageup').css("display", "none");
    }
    
}

window.addEventListener('scroll', showUpArrow);

// Slider

$('.main-wrapper__slider').slick({
    speed: 1200,
    prevArrow: '<button type="button" class="slick-prev"><img src="img/icons/chevron-left-solid.svg" alt="arrow left"></button>',
    nextArrow: '<button type="button" class="slick-next"><img src="img/icons/chevron-right-solid.svg" alt="arrow right"></button>',
    dots: true,
    swipe: true,
    responsive: [
        {
            breakpoint: 600,
            settings: {
                arrows: false
            }
        }
    ]
});


// Slider photos

$('.photos').slick({
    centerMode: true,
    prevArrow: '<button type="button" class="slick-prev"><img src="img/icons/chevron-left-solid_o.svg" alt="arrow left"></button>',
    nextArrow: '<button type="button" class="slick-next"><img src="img/icons/chevron-right-solid_o.svg" alt="arrow right"></button>',
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 300,
    accessebility: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    swipe: true,
    responsive: [
      {
        breakpoint: 1900,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          infinite: true,
          accessebility: true
        }
      },
      {
        breakpoint: 1700,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          infinite: true,
          accessebility: true
        }
      },
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          accessebility: true,
          centerMode: false
        }
      },
      {
        breakpoint: 750,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          accessebility: true,
          infinite: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true
        }
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true
        }
      }
    ]
  });


// Slider arrow fadeIn/Out

let rightArrowStatus = 0;
let leftArrowStatus = 0;
$('.slick-next').css('display', 'none');
$('.slick-prev').css('display', 'none');
const slider = $('.slider-wrapper');
slider.on('mousemove', (event)=>{
    let screenWidth = document.querySelector('.slider-wrapper').scrollWidth,
        screenZoneRight = Math.abs(screenWidth*0.25),
        screenZoneLeft = Math.abs(screenWidth*0.75);
    if (event.clientX > screenZoneLeft && rightArrowStatus === 0) {
        $('.slick-next').fadeIn();
        rightArrowStatus = 1;
    } else if (event.clientX < screenZoneLeft && rightArrowStatus === 1) {
        $('.slick-next').fadeOut();
        rightArrowStatus = 0;
    }
    if (event.clientX < screenZoneRight && leftArrowStatus === 0) {
        $('.slick-prev').fadeIn();
        leftArrowStatus = 1;
    } else if (event.clientX > screenZoneRight && leftArrowStatus === 1) {
        $('.slick-prev').fadeOut();
        leftArrowStatus = 0;
    }
});

// Drordown-menu

const dropdownMenu = document.querySelector('.dropdown__menu'),
    dropdownToggle = document.querySelector('.dropdown__toggle');
let dropdownStatus = 0;
function showMenu(event) {
    if (dropdownStatus===0) {
        dropdownMenu.style.display = "block";
        dropdownStatus = 1;
    } else {
        dropdownMenu.style.display = "";
        dropdownStatus = 0;
    }
}

dropdownToggle.onclick = showMenu;


document.addEventListener('click', (event)=>{
    if (dropdownStatus===1 && (event.target != dropdownMenu) && (event.target != dropdownToggle)) {
        dropdownMenu.style.display = "";
        dropdownStatus = 0;
    }
});

// Accordion

const cardButton = document.querySelectorAll('.card__header');
    let prevCard = null;
    cardButton.forEach((button)=>{
        let card = button.nextElementSibling;
        button.addEventListener('click', ()=> {
            if ($(button).attr('data-show')==0) {
                $(card).slideDown();
                $(button).attr('data-show', 1);
                if (prevCard) {
                    $(prevCard).slideUp();
                    $(prevCard).prev().attr('data-show', 0);
                }
                prevCard = card;
            } else {
                $(card).slideUp();
                $(button).attr('data-show', 0);
                prevCard = null;
            }        
        });

    });

// Disclaimer

$(".disclaimer").click(function() {
    $(this).css("display", "none");
    $("body").css("overflow", "visible");
});
