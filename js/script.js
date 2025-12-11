// --- LOADING BAR LOGIC (MUST BE TOP) ---
(function() {
    const bar = document.getElementById('loading-bar');
    let width = 10;
    let interval = setInterval(() => {
        if (width >= 90) clearInterval(interval);
        else { width += Math.random() * 10; if (width > 90) width = 90; bar.style.width = width + '%'; }
    }, 500);

    window.addEventListener('load', () => {
        clearInterval(interval);
        bar.style.width = '100%';
        setTimeout(() => { document.body.classList.add('loaded'); }, 500);
    });
})();

document.addEventListener('DOMContentLoaded', function(){
    
    // --- DATA PROJECT PORTFOLIO ---
    const projects = [
        {
            id: 1, category: 'ads', size: 'col-span-1 md:col-span-2',
            title: "Agridev Ajinomoto", img: "images/portfolio/meta-agridev.jpg", 
            problem: "Sulit menembus pasar petani muda.", solution: "Video Storytelling Soft-Selling di Meta Ads.", result: "🚀 Reach 62k+, CPR Rp 18."
        },
        {
            id: 2, category: 'web', size: 'col-span-1',
            title: "Healthical SIMRS", img: "images/portfolio/web-healthical.jpg", 
            problem: "Data pasien sering hilang.", solution: "Web App SIMRS (Laravel + Vue).", result: "⚡ Efisiensi Admin naik 80%."
        },
        {
            id: 3, category: 'ads', size: 'col-span-1',
            title: "Lariz Property", img: "images/portfolio/meta-lariz.jpg", 
            problem: "Banyak leads sampah (junk).", solution: "Lead Form dengan Filter Gaji & DP.", result: "✅ 116 Leads Valid, 18 Closing."
        },
        {
            id: 4, category: 'web', size: 'col-span-1 md:col-span-2',
            title: "Sahira Hotel", img: "images/portfolio/google-sahira.jpg", 
            problem: "Okupansi weekday rendah.", solution: "Google Search Ads Keyword Korporat.", result: "📅 Booking Corporate naik 150%."
        }
    ];

    // --- DATA VIRTUAL ASSISTANT ---
    const vaServices = {
        'schedule': {
            title: "Manajemen Jadwal", icon: '<i class="ph-fill ph-calendar-check"></i>', desc: "Saya pastikan jadwal kamu rapi, tidak bentrok, dan kamu selalu ingat meeting penting.",
            points: ["Mengatur Google Calendar / Outlook.", "Membuat link Zoom/Google Meet.", "Mengirim reminder H-1 dan H-1 jam.", "Reschedule janji temu."]
        },
        'travel': {
            title: "Travel Planning", icon: '<i class="ph-fill ph-airplane-tilt"></i>', desc: "Tidak perlu pusing bandingin harga tiket atau cari hotel yang nyaman.",
            points: ["Mencari & booking tiket pesawat termurah.", "Riset hotel berdasarkan lokasi & review.", "Membuat itinerary perjalanan rapi.", "Web check-in pesawat."]
        },
        'comm': {
            title: "Komunikasi & Reply", icon: '<i class="ph-fill ph-whatsapp-logo"></i>', desc: "Balesin chat klien atau vendor biar kamu gak dikira sombong/slow respon.",
            points: ["Membalas chat WA bisnis / DM Instagram.", "Menyaring email penting vs spam.", "Follow-up vendor/klien.", "Mengirim broadcast info."]
        },
        'admin': {
            title: "Administrasi & Data", icon: '<i class="ph-fill ph-files"></i>', desc: "Pekerjaan ngetik dan input data yang membosankan, biar saya yang kerjakan.",
            points: ["Input data ke Excel / Google Sheets.", "Transcribe rekaman meeting.", "Membuat invoice sederhana.", "Merapikan file di Google Drive."]
        }
    };

    // --- DATA CORE EXPERTISE ---
    const expertiseData = {
        'meta': {
            title: "Meta Ads Mastery", icon: '<i class="ph-fill ph-meta-logo text-blue-500"></i>',
            desc: "Strategi iklan di Facebook & Instagram untuk mendapatkan Leads dan Sales dengan biaya efisien.",
            points: ["Funneling Strategy (Cold/Warm/Hot)", "Creative Testing A/B", "Pixel & CAPI Tracking Setup", "Retargeting Audience"]
        },
        'google': {
            title: "Google Ads Specialist", icon: '<i class="ph-fill ph-google-logo text-red-500"></i>',
            desc: "Menangkap user yang sedang aktif mencari produk Anda di mesin pencari.",
            points: ["Keyword Research Mendalam", "Search Intent Analysis", "Negative Keywords Filtering", "Conversion Tracking"]
        },
        'web': {
            title: "High-Perf Web Dev", icon: '<i class="ph-fill ph-code text-gold"></i>',
            desc: "Website yang tidak hanya cantik, tapi juga cepat, aman, dan siap untuk SEO.",
            points: ["Speed Optimization (< 2s load)", "SEO Technical Structure", "Responsive Mobile-First", "Easy CMS Management"]
        },
        'automation': {
            title: "Business Automation", icon: '<i class="ph-fill ph-robot text-purple-500"></i>',
            desc: "Menghubungkan aplikasi agar bekerja otomatis tanpa input manual.",
            points: ["Zapier / Make Integration", "Auto-Reply Logic", "CRM Data Flow", "Dashboard Reporting"]
        }
    };

    // --- RENDER PORTFOLIO ---
    const container = document.getElementById('portfolio-container');
    const filterBtns = document.querySelectorAll('.filter-btn');

    function renderProjects(filter = 'all') {
        container.innerHTML = '';
        projects.forEach((item) => {
            if (filter === 'all' || item.category === filter) {
                const card = document.createElement('div');
                card.className = `${item.size} h-64 bg-bento-card border border-bento-border rounded-[2rem] relative overflow-hidden group cursor-pointer hover:border-gold/50 transition-all duration-500 animate-fade-in`;
                card.onclick = () => openPortfolioModal(item);
                card.innerHTML = `
                    <img src="${item.img}" class="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700" onerror="this.src='https://placehold.co/600x400/222/555?text=Project'">
                    <div class="absolute bottom-0 left-0 p-6 w-full">
                        <span class="text-[10px] font-bold uppercase tracking-widest text-gold mb-1 block font-display">${item.category}</span>
                        <h3 class="text-xl font-bold text-white translate-y-2 group-hover:translate-y-0 transition-transform font-display">${item.title}</h3>
                        <p class="text-xs text-muted mt-1 opacity-0 group-hover:opacity-100 transition-opacity">${item.result}</p>
                    </div>`;
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

    // --- MODAL LOGIC ---
    const modal = document.getElementById('info-modal');
    const modalBox = document.getElementById('modal-box');
    const modalImgContainer = document.getElementById('modal-img-container');
    const modalContentContainer = document.getElementById('modal-content-container');
    const modalIcon = document.getElementById('modal-icon');

    // Portfolio Modal
    window.openPortfolioModal = (item) => {
        modalImgContainer.classList.remove('hidden');
        modalContentContainer.className = "w-full md:w-3/5 p-8 md:p-10 overflow-y-auto custom-scrollbar bg-bento-card";
        modalIcon.classList.add('hidden');

        document.getElementById('modal-img').src = item.img;
        document.getElementById('modal-cat').textContent = item.category;
        document.getElementById('modal-title').textContent = item.title;
        document.getElementById('modal-body').innerHTML = `
            <div><strong class="text-white block mb-1">Masalah:</strong> ${item.problem}</div>
            <div><strong class="text-white block mb-1">Solusi:</strong> ${item.solution}</div>
            <div class="bg-bento-bg p-4 rounded-xl border border-bento-border"><strong class="text-gold block mb-1 uppercase text-xs">Hasil:</strong> <span class="text-white font-bold">${item.result}</span></div>`;
        document.getElementById('modal-action').innerHTML = ''; 

        showModal();
    };

    // VA Modal
    window.openVaModal = (key) => {
        const data = vaServices[key];
        setupTextModal(data, "VA Service", "Hire Untuk Ini");
    };

    // Expertise Modal
    window.openExpertiseModal = (key) => {
        const data = expertiseData[key];
        setupTextModal(data, "Core Expertise", "Konsultasi Topik Ini");
    };

    function setupTextModal(data, categoryTitle, btnText) {
        modalImgContainer.classList.add('hidden');
        modalContentContainer.className = "w-full p-8 md:p-12 overflow-y-auto custom-scrollbar bg-bento-card";
        modalIcon.classList.remove('hidden');
        
        document.getElementById('modal-cat').textContent = categoryTitle;
        document.getElementById('modal-title').textContent = data.title;
        modalIcon.innerHTML = data.icon;
        
        const listHtml = data.points.map(pt => `<li class="flex items-start gap-2"><i class="ph-fill ph-check-circle text-gold mt-0.5"></i> ${pt}</li>`).join('');
        
        document.getElementById('modal-body').innerHTML = `
            <p class="text-base text-muted mb-6">${data.desc}</p>
            <div class="bg-bento-bg p-6 rounded-xl border border-bento-border">
                <h4 class="text-xs font-bold uppercase tracking-widest text-white mb-4">Job Scope:</h4>
                <ul class="space-y-3 text-sm text-gray-400">${listHtml}</ul>
            </div>`;
            
        document.getElementById('modal-action').innerHTML = `
            <button onclick="sendWA('Halo Ami, saya tertarik membahas ${data.title}')" class="w-full py-3 bg-white text-black font-bold rounded-xl hover:bg-gold transition shadow-lg">${btnText}</button>`;
        
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
    modal.addEventListener('click', (e) => { if(e.target === modal) closeModal(); });

    // --- CONTACT ACTIONS ---
    window.sendWA = (msg) => {
        const phone = "6285894448143";
        window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
    };

    window.sendEmail = () => {
        window.open(`mailto:kingshisha.indonesia@gmail.com?subject=Inquiry%20from%20Portfolio&body=Halo%20Ami%2C%0A%0ASaya%20tertarik%20untuk...`, '_blank');
    };

    // --- BACK TO TOP ---
    const backToTopBtn = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.remove('opacity-0', 'invisible');
            backToTopBtn.classList.add('opacity-100', 'visible');
        } else {
            backToTopBtn.classList.add('opacity-0', 'invisible');
            backToTopBtn.classList.remove('opacity-100', 'visible');
        }
    });
});