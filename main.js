
const loadData = async () => {
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        renderContent(data);
    } catch (error) {
        console.error("Failed to load content", error);
    }
};

const renderContent = (data) => {

    document.getElementById('hero-headline').innerHTML = `Mastery in Every <br><span class="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-teal-200">Drop & Drain.</span>`;
    document.getElementById('hero-subheadline').textContent = data.hero.subheadline;
    document.getElementById('hero-rating-text').textContent = `${data.company.rating} (${data.company.reviewCount} Reviews)`;
    

    document.getElementById('about-title').textContent = data.about.title;
    document.getElementById('about-desc').textContent = data.about.description;
    

    document.getElementById('contact-address').textContent = data.company.address;
    document.getElementById('contact-phone').textContent = data.company.phone;
    document.getElementById('contact-hours').textContent = data.company.hours;
    

    const servicesContainer = document.getElementById('services-grid');
    data.services.forEach(service => {
        const iconMap = {
            'wrench': 'wrench',
            'flame': 'flame',
            'droplets': 'droplets',
            'siren': 'siren'
        };
        
        const card = document.createElement('div');
        card.className = "service-card bg-white p-8 rounded-2xl shadow-sm border border-gray-100 group hover:border-teal-200";
        card.innerHTML = `
            <div class="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center text-teal-600 mb-6 group-hover:bg-teal-500 group-hover:text-white transition-colors duration-300">
                <i data-lucide="${iconMap[service.icon]}" class="h-6 w-6"></i>
            </div>
            <h3 class="text-xl font-bold text-slate-900 mb-3">${service.title}</h3>
            <p class="text-gray-600 leading-relaxed text-sm">${service.description}</p>
        `;
        servicesContainer.appendChild(card);
    });


    const reviewsContainer = document.getElementById('reviews-grid');
    data.reviews.forEach(review => {
        const stars = Array(5).fill(0).map((_, i) => 
            `<i data-lucide="star" class="h-4 w-4 ${i < review.stars ? 'fill-current text-gold-500' : 'text-slate-700'}"></i>`
        ).join('');

        const card = document.createElement('div');
        card.className = "bg-slate-800 p-8 rounded-2xl border border-slate-700";
        card.innerHTML = `
            <div class="flex gap-1 mb-4">${stars}</div>
            <p class="text-slate-300 text-lg mb-6 italic">"${review.text}"</p>
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center text-white font-bold text-sm">
                    ${review.author.charAt(0)}
                </div>
                <div>
                    <h4 class="font-bold text-white text-sm">${review.author}</h4>
                    <span class="text-slate-500 text-xs">Verified Customer</span>
                </div>
            </div>
        `;
        reviewsContainer.appendChild(card);
    });


    lucide.createIcons();
    initAnimations();
};

const initAnimations = () => {
    gsap.registerPlugin(ScrollTrigger);


    gsap.utils.toArray('section').forEach(section => {
        gsap.from(section.children, {
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                toggleActions: "play none none reverse"
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out"
        });
    });


    gsap.from("#hero-headline", { y: 30, opacity: 0, duration: 1, delay: 0.2, ease: "power3.out" });
    gsap.from("#hero-subheadline", { y: 20, opacity: 0, duration: 1, delay: 0.4, ease: "power3.out" });
};


const setupMobileMenu = () => {
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    
    btn.addEventListener('click', () => {
        menu.classList.toggle('hidden');
    });


    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.add('hidden');
        });
    });
};

document.addEventListener('DOMContentLoaded', () => {
    loadData();
    setupMobileMenu();
});
