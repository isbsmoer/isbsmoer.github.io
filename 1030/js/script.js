const heroVisualData = [
    {
        src: "img/main1.webp",
        alt: "釧路の夕暮れを望む暦の宿のメインビジュアル"
    },
    {
        src: "img/main2.webp",
        alt: "釧路湿原の雄大な自然"
    },
    {
        src: "img/main3.webp",
        alt: "釧路の水平線に沈む夕日"
    }
];

const itemData = [
    {
        title: "展望スイートルーム（Suite Rooms）",
        description: "釧路の街並みや夕日を一望できる、上質なインテリアと広い窓を配したプライベート客室。",
        image: "img/item1.webp"
    },
    {
        title: "季節のローカルディナー（Local Cuisine）",
        description: "道東・釧路の新鮮な海鮮と極上素材の魅力を丁寧に引き出した、創作和洋コース。",
        image: "img/item2.webp"
    },
    {
        title: "絶景の展望スパ＆サウナ（Spa & Sauna）",
        description: "澄んだ外気を感じながら、静かな湯あみとととのい体験を楽しめるリラクゼーション空間。",
        image: "img/item3.webp"
    }
];

const voiceData = [
    {
        name: "佐藤 美咲",
        detail: "北海道 / 30代",
        comment: "夕暮れ時の景色が忘れられません。静かな客室で過ごす時間が、旅の疲れをしっかり癒やしてくれました。",
        avatar: "img/profile1.svg"
    },
    {
        name: "田中 健一",
        detail: "東京都 / 40代",
        comment: "釧路の海鮮を中心にした夕食がとても印象的でした。素材本来の味を楽しめる料理で、ゆっくり味わえます。",
        avatar: "img/profile2.svg"
    },
    {
        name: "Emily W.",
        detail: "シンガポール / 女性",
        comment: "日本の静かな時間を感じられる素敵な宿でした。展望スパから眺める釧路の景色は、心に残る旅の思い出です。",
        avatar: "img/profile1.svg"
    }
];

const faqData = [
    {
        question: "チェックイン・チェックアウトは何時ですか？",
        answer: "チェックインは15:00、チェックアウトは11:00です。事前にご連絡いただければ、お荷物のお預かりも承ります。"
    },
    {
        question: "釧路駅から宿までのアクセスを教えてください。",
        answer: "釧路駅より車で約15分です。事前予約制で無料送迎をご利用いただけます。お電話または予約時にお申し付けください。"
    },
    {
        question: "夕食と朝食は宿でいただけますか？",
        answer: "季節のローカルディナーと朝食をご用意しています。ご予約時に内容をご確認いただけます。"
    },
    {
        question: "食物アレルギーがある場合は対応できますか？",
        answer: "可能な範囲で対応しております。ご予約時、宿泊日の1週間前までに詳しい内容をお知らせください。"
    }
];

const heroImageContainer = document.querySelector(".hero-image");
const heroSection = document.querySelector(".hero");
heroImageContainer.innerHTML = heroVisualData.map((image, index) => `
    <img src="${image.src}" alt="${image.alt}" ${index === 0 ? 'class="active"' : ""}>
`).join("");

const heroImages = Array.from(heroImageContainer.querySelectorAll("img"));
let currentHeroImageIndex = 0;
let heroSlideshowTimer = null;

function showHeroImage(nextIndex) {
    if (nextIndex === currentHeroImageIndex) return;

    const currentImage = heroImages[currentHeroImageIndex];
    const nextImage = heroImages[nextIndex];

    if (window.gsap) {
        gsap.killTweensOf([currentImage, nextImage]);
        gsap.to(currentImage, { opacity: 0, duration: 0.9, ease: "power1.inOut", overwrite: true });
        gsap.fromTo(nextImage, { opacity: 0 }, {
            opacity: 1,
            duration: 0.9,
            ease: "power1.inOut",
            overwrite: true
        });
    } else {
        currentImage.style.opacity = "0";
        nextImage.style.opacity = "1";
    }

    currentImage.classList.remove("active");
    nextImage.classList.add("active");
    currentHeroImageIndex = nextIndex;
}

function showNextHeroImage() {
    showHeroImage((currentHeroImageIndex + 1) % heroImages.length);
}

function startHeroSlideshow() {
    if (heroSlideshowTimer || heroImages.length < 2) return;
    showNextHeroImage();
    heroSlideshowTimer = window.setInterval(showNextHeroImage, 4000);
}

function stopHeroSlideshow() {
    window.clearInterval(heroSlideshowTimer);
    heroSlideshowTimer = null;
}

heroSection.addEventListener("mouseenter", startHeroSlideshow);
heroSection.addEventListener("mouseleave", stopHeroSlideshow);

const itemList = document.getElementById("item-list");
itemList.innerHTML = itemData.map((item) => `
    <article class="item-card">
        <img src="${item.image}" alt="${item.title}">
        <div class="item-card-content">
            <h3>${item.title}</h3>
            <p>${item.description}</p>
        </div>
    </article>
`).join("");

const voiceList = document.getElementById("voice-list");
voiceList.innerHTML = voiceData.map((voice) => `
    <article class="voice-card">
        <div class="voice-profile">
            <img src="${voice.avatar}" alt="">
            <div>
                <strong>${voice.name}</strong>
                <span>${voice.detail}</span>
            </div>
        </div>
        <p>${voice.comment}</p>
    </article>
`).join("");

const faqList = document.getElementById("faq-list");
faqList.innerHTML = faqData.map((faq, index) => `
    <div class="faq-item">
        <button class="faq-question" type="button" aria-expanded="false" aria-controls="faq-answer-${index}">
            ${faq.question}
        </button>
        <div class="faq-answer" id="faq-answer-${index}">
            <p>${faq.answer}</p>
        </div>
    </div>
`).join("");

document.querySelectorAll(".faq-question").forEach((button) => {
    button.addEventListener("click", () => {
        const item = button.closest(".faq-item");
        const isOpen = item.classList.toggle("open");
        button.setAttribute("aria-expanded", String(isOpen));
    });
});

const menuButton = document.querySelector(".menu-button");
const globalNav = document.querySelector(".global-nav");

menuButton.addEventListener("click", () => {
    const isOpen = globalNav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
});

globalNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        globalNav.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
    });
});

if (window.gsap && window.ScrollTrigger && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    gsap.registerPlugin(ScrollTrigger);

    gsap.timeline({ defaults: { ease: "power3.out" } })
        .from(".site-header", { y: -30, opacity: 0, duration: 0.8 })
        .from(".hero-image img", { scale: 1.08, duration: 1.8 }, "-=0.5")
        .from(".hero .eyebrow", { y: 20, opacity: 0, duration: 0.8 }, "-=1.2")
        .from(".hero h1", { y: 35, opacity: 0, duration: 1 }, "-=0.7")
        .from(".hero-text", { y: 25, opacity: 0, duration: 0.8 }, "-=0.6")
        .from(".hero .button", { y: 20, opacity: 0, duration: 0.8 }, "-=0.5");

    gsap.utils.toArray(".section-heading, .intro h2, .intro > p:last-child").forEach((element) => {
        gsap.from(element, {
            y: 45,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: element,
                start: "top 82%",
                once: true
            }
        });
    });

    gsap.set(".feature-card", { clearProps: "transform" });

    gsap.from(".item-card", {
        y: 55,
        opacity: 0,
        duration: 0.9,
        stagger: 0.14,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".item-grid",
            start: "top 82%",
            once: true
        }
    });

    gsap.from(".voice-card", {
        x: 45,
        opacity: 0,
        duration: 0.8,
        stagger: 0.14,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".voice-grid",
            start: "top 82%",
            once: true
        }
    });

    gsap.from(".faq-item", {
        y: 25,
        opacity: 0,
        duration: 0.65,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".faq-list",
            start: "top 85%",
            once: true
        }
    });

    gsap.from(".booking h2, .booking .button", {
        y: 35,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".booking",
            start: "top 78%",
            once: true
        }
    });

    gsap.to(".hero-image img", {
        yPercent: 10,
        ease: "none",
        scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: true
        }
    });

    requestAnimationFrame(() => {
        ScrollTrigger.refresh();
    });

    const marquee = document.querySelector(".hero-marquee-track");
    const marqueeItems = marquee.querySelectorAll(".hero-marquee-item");
    const groupWidth = marqueeItems[0].getBoundingClientRect().width;
    let marqueeX = 0;
    let marqueeDirection = -1;
    let marqueeVelocity = 0;

    ScrollTrigger.create({
        trigger: ".hero",
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
            marqueeVelocity = gsap.utils.clamp(-1, 1, Math.abs(self.getVelocity()) / 1800);
            marqueeDirection = self.direction > 0 ? -1 : 1;
        }
    });

    gsap.ticker.add(() => {
        const baseSpeed = 0.65;
        marqueeX += marqueeDirection * baseSpeed * (1 + marqueeVelocity * 3.5);
        marqueeX = gsap.utils.wrap(-groupWidth, 0, marqueeX);
        gsap.set(marquee, { x: marqueeX });
        marqueeVelocity *= 0.94;
    });
}
