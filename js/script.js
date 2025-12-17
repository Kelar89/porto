document.addEventListener('DOMContentLoaded', function(){
    
    // ============================================
    // 1. LOADER SYSTEM LOGIC (FIXED)
    // ============================================
    const loadingScreen = document.getElementById('loading-screen');
    const mainContent = document.getElementById('main-content');
    const counterElement = document.getElementById('loader-counter');
    
    // Logic: Update Angka 0 - 100 dalam 5 detik
    let count = 0;
    let counterInterval = setInterval(() => {
        if(count >= 100) {
            clearInterval(counterInterval);
            if(counterElement) counterElement.innerText = "100";
            
            // Selesai Loading -> Hapus Layar
            setTimeout(() => {
                if(loadingScreen) {
                    loadingScreen.style.opacity = '0';
                    loadingScreen.style.pointerEvents = 'none'; 
                    setTimeout(() => loadingScreen.remove(), 800);
                }
                if(mainContent) mainContent.classList.remove('opacity-0');
            }, 500); 
            
        } else {
            count++;
            if(counterElement) counterElement.innerText = count;
        }
    }, 45); // Speed counter

    // SAFETY FALLBACK: Paksa masuk setelah 5.5 detik jika macet
    setTimeout(() => {
        if(loadingScreen && loadingScreen.parentNode) {
            loadingScreen.style.opacity = '0';
            loadingScreen.style.pointerEvents = 'none';
            setTimeout(() => loadingScreen.remove(), 700);
        }
        if(mainContent) mainContent.classList.remove('opacity-0');
    }, 5500);

    // ============================================
    // 2. DATA CONTENT & LOGIC
    // ============================================
    const projects = [
        { id: 1, category: 'ads', size: 'col-span-1 md:col-span-2', title: "Agridev Ajinomoto", img: "images/portfolio/meta-agridev.jpg", problem: "Pasar petani muda sulit ditembus.", solution: "Video Storytelling Soft-Selling.", result: "🚀 Reach 62k+, CPR Rp 18." },
        { id: 2, category: 'web', size: 'col-span-1', title: "Healthical SIMRS", img: "images/portfolio/web-healthical.jpg", problem: "Data pasien sering hilang.", solution: "Web App SIMRS Terintegrasi.", result: "⚡ Efisiensi Admin naik 80%." },
        { id: 3, category: 'ads', size: 'col-span-1', title: "Lariz Property", img: "images/portfolio/meta-lariz.jpg", problem: "Banyak leads sampah.", solution: "Lead Form Filter Gaji.", result: "✅ 116 Leads Valid." },
        { id: 4, category: 'web', size: 'col-span-1 md:col-span-2', title: "Sahira Hotel", img: "images/portfolio/google-sahira.jpg", problem: "Okupansi weekday rendah.", solution: "Google Search Ads B2B.", result: "📅 Booking Corp naik 150%." }
    ];

    const vaServices = {
        'schedule': { title: "Manajemen Jadwal", icon: '<i class="ph-fill ph-calendar-check"></i>', desc: "Jadwal rapi, anti bentrok.", points: ["Google Calendar", "Zoom Link", "Reminder"] },
        'travel': { title: "Travel Planning", icon: '<i class="ph-fill ph-airplane-tilt"></i>', desc: "Urus tiket & hotel.", points: ["Booking Tiket", "Itinerary", "Check-in"] },
        'comm': { title: "Komunikasi", icon: '<i class="ph-fill ph-whatsapp-logo"></i>', desc: "Balas chat fast response.", points: ["Reply WA", "Filter Email", "Broadcast"] },
        'admin': { title: "Administrasi", icon: '<i class="ph-fill ph-files"></i>', desc: "Input data & rekap.", points: ["Excel Entry", "Invoice", "File Management"] }
    };

    const docServices = {
        'pdf': { title: "PDF Service", icon: '<i class="ph-fill ph-file-pdf"></i>', desc: "Edit & Rapikan PDF.", points: ["Merge/Split", "Compress", "Convert"] },
        'cv': { title: "CV & Compro", icon: '<i class="ph-fill ph-user-rectangle"></i>', desc: "Desain dokumen profesional.", points: ["CV ATS", "Company Profile", "PPT"] },
        'form': { title: "Digital Form", icon: '<i class="ph-fill ph-list-checks"></i>', desc: "Formulir online rapi.", points: ["Google Form", "Integrasi Sheet", "Kuesioner"] },
        'maps': { title: "Gmaps Opt.", icon: '<i class="ph-fill ph-map-pin"></i>', desc: "Optimasi lokasi bisnis.", points: ["Verifikasi", "Keyword Lokal", "Review"] }
    };

    const expertiseData = {
        'meta': { title: "Meta Ads", icon: '<i class="ph-fill ph-meta-logo text-blue-500"></i>', desc: "Iklan FB & IG Efektif.", points: ["Funneling", "A/B Testing", "Pixel"] },
        'google': { title: "Google Ads", icon: '<i class="ph-fill ph-google-logo text-red-500"></i>', desc: "Iklan Pencarian.", points: ["Keyword Research", "Search Intent", "Tracking"] },
        'web': { title: "Web Dev", icon: '<i class="ph-fill ph-code text-gold"></i>', desc: "Website Cepat.", points: ["Speed Opt", "SEO", "Responsive"] },
        'automation': { title: "Automation", icon: '<i class="ph-fill ph-robot text-purple-500"></i>', desc: "Sistem Otomatis.", points: ["Zapier", "Auto-Reply", "CRM"] }
    };

    // --- RENDER ---
    const container = document.getElementById('portfolio-container');
    const filterBtns = document.querySelectorAll('.filter-btn');

    function renderProjects(filter = 'all') {
        if(!container) return;
        container.innerHTML = '';
        projects.forEach(item => {
            if (filter === 'all' || item.category === filter) {
                const card = document.createElement('div');
                card.className = `${item.size} h-64 bg-bento-card border border-bento-border rounded-[2rem] relative overflow-hidden group cursor-pointer hover:border-gold/50 transition-all duration-500 animate-fade-in`;
                card.onclick = () => openPortfolioModal(item);
                card.innerHTML = `<img src="${item.img}" class="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700" onerror="this.src='https://placehold.co/600x400/222/555?text=Project'"><div class="absolute bottom-0 left-0 p-6 w-full"><span class="text-[10px] font-bold uppercase tracking-widest text-gold mb-1 block font-display">${item.category}</span><h3 class="text-xl font-bold text-white translate-y-2 group-hover:translate-y-0 transition-transform font-display">${item.title}</h3><p class="text-xs text-muted mt-1 opacity-0 group-hover:opacity-100 transition-opacity">${item.result}</p></div>`;
                container.appendChild(card);
            }
        });
    }
    renderProjects();

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderProjects(btn.dataset.filter);
        });
    });

    // --- MODAL ---
    const modal = document.getElementById('info-modal');
    const modalBox = document.getElementById('modal-box');
    const modalImgContainer = document.getElementById('modal-img-container');
    const modalContentContainer = document.getElementById('modal-content-container');
    const modalIcon = document.getElementById('modal-icon');

    window.openPortfolioModal = (item) => {
        modalImgContainer.classList.remove('hidden');
        modalContentContainer.className = "w-full md:w-3/5 p-8 md:p-10 overflow-y-auto custom-scrollbar bg-bento-card";
        modalIcon.classList.add('hidden');
        document.getElementById('modal-img').src = item.img;
        document.getElementById('modal-cat').textContent = item.category;
        document.getElementById('modal-title').textContent = item.title;
        document.getElementById('modal-body').innerHTML = `<div><strong class="text-white block mb-1">Masalah:</strong> ${item.problem}</div><div><strong class="text-white block mb-1">Solusi:</strong> ${item.solution}</div><div class="bg-bento-bg p-4 rounded-xl border border-bento-border mt-4"><strong class="text-gold block mb-1 uppercase text-xs">Hasil:</strong> <span class="text-white font-bold">${item.result}</span></div>`;
        document.getElementById('modal-action').innerHTML = '';
        showModal();
    };

    window.openVaModal = (key) => { setupTextModal(vaServices[key], "VA Service", "Hire Untuk Ini"); };
    window.openDocModal = (key) => { setupTextModal(docServices[key], "Document Service", "Bantu Saya"); };
    window.openExpertiseModal = (key) => { setupTextModal(expertiseData[key], "Core Expertise", "Konsultasi Topik Ini"); };

    function setupTextModal(data, cat, btnText) {
        modalImgContainer.classList.add('hidden');
        modalContentContainer.className = "w-full p-8 md:p-12 overflow-y-auto custom-scrollbar bg-bento-card";
        modalIcon.classList.remove('hidden');
        document.getElementById('modal-cat').textContent = cat;
        document.getElementById('modal-title').textContent = data.title;
        modalIcon.innerHTML = data.icon;
        const list = data.points.map(p => `<li class="flex items-start gap-2 text-muted"><i class="ph-fill ph-check-circle text-gold mt-0.5"></i> ${p}</li>`).join('');
        document.getElementById('modal-body').innerHTML = `<p class="text-base text-white mb-6">${data.desc}</p><div class="bg-bento-bg p-6 rounded-xl border border-bento-border"><ul class="space-y-3 text-sm">${list}</ul></div>`;
        document.getElementById('modal-action').innerHTML = `<button onclick="sendWA('${data.title}')" class="w-full py-3 bg-white text-black font-bold rounded-xl hover:bg-gold transition shadow-lg">${btnText}</button>`;
        showModal();
    }

    function showModal() {
        modal.classList.remove('hidden');
        void modal.offsetWidth;
        modal.classList.add('flex');
        setTimeout(() => modalBox.classList.add('active'), 10);
    }
    
    window.closeModal = () => {
        modalBox.classList.remove('active');
        setTimeout(() => { modal.classList.remove('flex'); modal.classList.add('hidden'); }, 300);
    };
    if(modal) modal.addEventListener('click', (e) => { if(e.target === modal) closeModal(); });

    window.sendWA = (msg) => { window.open(`https://wa.me/6285894448143?text=${encodeURIComponent(msg)}`, '_blank'); };
    window.sendEmail = () => { window.open(`mailto:kingshisha.indonesia@gmail.com?subject=Inquiry&body=Halo...`, '_blank'); };
    
    const backToTopBtn = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) { backToTopBtn.classList.remove('opacity-0', 'invisible'); backToTopBtn.classList.add('opacity-100', 'visible'); }
        else { backToTopBtn.classList.add('opacity-0', 'invisible'); backToTopBtn.classList.remove('opacity-100', 'visible'); }
    });
});