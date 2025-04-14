const carousel = document.querySelector(".carousel > ul")
const header = document.querySelector("header")
const logo = document.querySelector(".logo")
const firstPtScroll = document.querySelector("#first-part")
const secPtScroll = document.querySelector("#second-part")
const upEvents = document.querySelector(".slider > ul")
const slideBtns = document.querySelectorAll(".slider-control > span")
const slideCont = document.querySelectorAll("[data-slide]")
const openImages = document.querySelectorAll("figure img")

const thumbsup = document.querySelectorAll(".thumbs-up")
const thumbsdown = document.querySelectorAll(".thumbs-down")


const form = document.querySelector("form")
const submitBtn = document.querySelector(".send")
const fName = document.querySelector("[data-fname]")
const SName = document.querySelector("[data-sname]")
const email = document.querySelector("[data-email]")
const address = document.querySelector("[data-address]")
const comment = document.querySelector("[data-comment]")


const main = document.querySelector("main")
const hero = document.querySelector(".hero")
const events = document.querySelector(".events")
const register = document.querySelector(".register")
const calendar = document.querySelector(".calendar")

const termCard = document.querySelector(".term-card")
const term = document.querySelector(".term")

const preloader = document.querySelector(".preloader")

let isDisliked = false
let dislikeCount = 0
let isLiked = false
let likeCount = 0

if (thumbsup) {
    thumbsup.forEach(tup => {

        tup.addEventListener("click", () => {
            if (!isLiked) {
                let upVote = tup.nextElementSibling
                tup.classList.add("up-solid")
                likeCount++
                isLiked = true
                upVote.innerText = likeCount
            } else {
                let upVote = tup.nextElementSibling
                tup.classList.remove("up-solid")
                likeCount--
                isLiked = false
                upVote.innerText = likeCount
                
            }
        })
    })
}
if (thumbsdown) {
    thumbsdown.forEach(tdown => {
        tdown.addEventListener("click", () => {
            if (!isDisliked) {
                let downVote = tdown.nextElementSibling
                tdown.classList.add("down-solid")
                dislikeCount++
                isDisliked = true
                downVote.innerText = dislikeCount
            } else {
                let downVote = tdown.nextElementSibling
                tdown.classList.remove("down-solid")
                dislikeCount--
                isDisliked = false
                downVote.innerText = dislikeCount
    
            }
        })

    })
}

if(form) {
    submitBtn.addEventListener("click", () => {
        // e.preventDefault()
        const infoHolder = {
            firstName: fName.value,
            secondName: SName.value,
            email: email.value,
            address: address.value,
            comment: comment.value
        }
        localStorage.setItem(email.value, JSON.stringify(infoHolder))
    })
}


window.addEventListener("load", () => {
    // setTimeout(() => {
    preloader.style.display = "none"
    // }, 1000);
})


if(term) {
    term.addEventListener("click", () => {
        termCard.classList.add("visible")
        document.body.classList.add("no-scroll")
    })
    termCard.addEventListener("click", () => {
        document.body.classList.remove("no-scroll")
        termCard.classList.remove("visible")
    })
}

slideBtns.forEach( btn => {
    btn.addEventListener("click", (e) => {
        upEvents.scrollLeft = e.target.id == "first-part" ? -(upEvents.offsetWidth) : (upEvents.offsetWidth)
        if(e.target.id == "first-part") {
            firstPtScroll.classList.add("active")
            secPtScroll.classList.remove("active")
        } else {
            secPtScroll.classList.add("active")
            firstPtScroll.classList.remove("active")
        }
    })
})

// window.addEventListener("scroll", ()=>{
//     if( window.scrollY < hero.clientHeight) {
//         main.style.background = "#eaf5fe"
//     } else if(window.scrollY > (hero.clientHeight) && window.scrollY < (events.clientHeight + hero.clientHeight)) {
//         main.style.background = "#dcccfd"
//     } else if(window.scrollY > (events.clientHeight + hero.clientHeight) && window.scrollY < (events.clientHeight + hero.clientHeight + calendar.clientHeight - 200)) {
//         main.style.background = "#dfe1df"
//     } else {
//         main.style.background = "#fff"
//     }
// })



if(carousel) {
    carousel.addEventListener("mousemove", (e) => {
        carousel.scrollTo((e.clientX - 250), 0)
    })
}

// intersection observers
const scrollWatcher = document.createElement("div")
scrollWatcher.setAttribute("data-scroll-watcher", "")

header.before(scrollWatcher)


const contentObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        entry.isIntersecting ? entry.target.classList.add("glide") : entry.target.classList.remove("glide")
    })
}, {rootMargin: "-10%"})

const headerObserver = new IntersectionObserver((entries) => {
    header.classList.toggle("hanging", !entries[0].isIntersecting)
    entries[0].isIntersecting ? logo.setAttribute("src", "assets/logo-white.png") : logo.setAttribute("src", "assets/logo-dark.png")
})

slideCont.forEach(par => {
    contentObserver.observe(par)
})
headerObserver.observe(scrollWatcher)