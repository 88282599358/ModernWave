var timeout;
const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

function firstPageAnimation() {
    var t1 = gsap.timeline();

    t1.from("#nav", {
        y: -10,
        opacity: 0,
        duration: 1.5,
        ease: Expo.easeInOut,
    })
        .to('.boundingelem', {
            y: 0,
            duration: 1.5,
            delay: -1,
            ease: Expo.easeInOut,
            stagger: 0.2,
        })

        .from('#headfooter', {
            y: -10,
            opacity: 0,
            duration: 1.5,
            delay: -1,
            ease: Expo.easeInOut,
        })
}

function circlefold() {
    var xscale = 1;
    var yscale = 1

    var xprev = 0;
    var yprev = 0;

    window.addEventListener("mousemove", function (dets) {
        // gsap.clamp(): it need max and min value and if the value goes greater or lesser than max or min it will take to max and min value which we provided it
        // gsap.utils.clamp(100, 200, 2.5) now value is less than 100 so, it will take it to it's minimum value i.e. 100

        // var xdiff = dets.clientX - xprev
        // var ydiff = dets.clientY - yprev

        // it will clear all the timeout until mouse stop moving
        clearTimeout(timeout)

        xscale = gsap.utils.clamp(0.9, 1.2, dets.clientX - xprev)
        yscale = gsap.utils.clamp(0.9, 1.2, dets.clientY - yprev)

        xprev = dets.clientX
        yprev = dets.clientY

        // console.log(xdiff, ydiff);
        circleMouseFollower(xscale, yscale)

        // this is for when the cursor is stop
        // so everytime the setTimeout will come
        // so to clear it we used the clearTimeout() at line no 46 
        timeout = setTimeout(function () {
            document.querySelector(
                "#minicircle"
            ).style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1))`;
        }, 100);
    })
}

function circleMouseFollower(xscale, yscale) {
    window.addEventListener("mousemove", function (dets) {
        document.querySelector(
            "#minicircle"
        ).style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;
    });
}

function imageAnimation() {

    document.querySelectorAll('.elem').forEach(function (elem) {
        var rotate = 0
        var diffrotate = 0

        elem.addEventListener("mouseleave", function (dets) {
            gsap.to(elem.querySelector("img"), {
                opacity: 0,
                ease: Power3,
                duration: 0.5,
            });
        });

        elem.addEventListener('mousemove', function (dets) {
            // console.log(elem.getBoundingClientRect());

            // to get dist the diff between from top and the element 
            var diff = dets.clientY - elem.getBoundingClientRect().top
            diffrotate = dets.clientX - rotate
            rotate = dets.clientX

            gsap.to(elem.querySelector("img"), {
                opacity: 1,
                ease: Power1,
                top: diff,
                left: dets.clientX,
                rotate: gsap.utils.clamp(-20, 20, diffrotate * 0.5),
            })
        })
    })
}

function videoAnimation() {

    document.querySelectorAll('.elem').forEach(function (elem) {
        var rotate = 0
        var diffrotate = 0

        elem.addEventListener("mouseleave", function (dets) {
            gsap.to(elem.querySelector("video"), {
                opacity: 0,
                ease: Power3,
                duration: 0.5,
            });
        });

        elem.addEventListener('mousemove', function (dets) {
            // console.log(elem.getBoundingClientRect());

            // to get dist the diff between from top and the element 
            var diff = dets.clientY - elem.getBoundingClientRect().top
            diffrotate = dets.clientX - rotate
            rotate = dets.clientX

            gsap.to(elem.querySelector("video"), {
                opacity: 1,
                ease: Power1,
                top: diff,
                left: dets.clientX,
                rotate: gsap.utils.clamp(-20, 20, diffrotate * 0.5),
            })
        })
    })
}

function clockUpdate() {
    let clockElement = document.getElementById('clock');
    const now = new Date
    const hours = now.getHours()
    const minutes = now.getMinutes()
    const seconds = now.getSeconds()
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes
    const formattedSeconds = seconds < 10 ? '0' + seconds : seconds
    const isAm = hours < 12 || hours === 24;
    const amPm = isAm ? 'am' : 'pm'
    const timezone = 'IST';

    const timeString = `${formattedHours}:${formattedMinutes}:${formattedSeconds} ${amPm} ${timezone}`
    clockElement.innerText = timeString;
}
setInterval(clockUpdate, 1000);


function hoverImage() {
    let image = document.querySelector('#imageabout img')

    image.addEventListener('mouseenter', function () {
        rotationTween = gsap.to(image, {
            duration: 1,
            rotation: 360,
            repeat: -1,
            ease: "none"
        })
    })
    image.addEventListener('mouseleave', () => {
        rotationTween.kill();

        gsap.to(image, {
            duration: 1,
            rotation: 0
        });
    });
}

function menuAnim() {
    // document.addEventListener('DOMContentLoaded', function () {
    //     const menu = document.getElementById('menu');
    //     const navlist = document.querySelector('.navlist');

    //     menu.addEventListener('click', function () {
    //         navlist.classList.toggle('active');
    //     });
    // });

    document.addEventListener('DOMContentLoaded', function() {
        const menu = document.getElementById('menu');
        const navlist = document.getElementById('navlist');
        let isMenuVisible = false;

        menu.addEventListener('click', function() {
            if (isMenuVisible) {
                gsap.to(navlist, { duration: 0.5, height: 0, onComplete: () => navlist.classList.remove('show') });
            } else {
                navlist.classList.add('show');
                gsap.fromTo(navlist, { height: 0 }, { duration: 0.5, height: 'auto' });
            }
            isMenuVisible = !isMenuVisible;
        });
    });
}

//  Function Calling
circleMouseFollower()
firstPageAnimation()
circlefold()
imageAnimation()
videoAnimation()
clockUpdate()
hoverImage()
menuAnim()