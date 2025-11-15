/**
 * File JavaScript Utama (VERSI FINAL - SEMUA FITUR)
 * 1. Logika Preloader
 * 2. Pemuat Komponen (Navbar, Footer)
 * 3. Menu Mobile
 * 4. Navigasi Aktif (Active Nav)
 * 5. Animasi Fade-in (Intersection Observer)
 * 6. Lightbox (Pop-up Gambar)
 * 7. Tombol Melayang (WA & Scroll-to-Top)
 * 8. Notifikasi Dummy
 * 9. Logika CTA Kontekstual (Frictionless Funnel)
 * 10. (BARU) Logika Footer Interaktif
 */

document.addEventListener("DOMContentLoaded", function() {

    // --- 1. LOGIKA PRELOADER ---
    const preloader = document.getElementById('preloader');
    const body = document.body;
    
    // Tampilkan body after preloader selesai (dipanggil di window.onload)
    function showContent() {
        if (preloader) {
            preloader.classList.add('hidden');
        }
        body.classList.add('loaded');
    }

    // Tunggu semua aset (gambar, css, js) selesai dimuat
    window.onload = function() {
        // Beri jeda 500ms agar animasi preloader-bar selesai
        setTimeout(showContent, 500); 
    };

    /**
     * --- 2. PEMUAT KOMPONEN ---
     * Fungsi generik untuk memuat komponen HTML dari file eksternal
     */
    function loadComponent(componentPath, targetId, callback) {
        fetch(componentPath)
            .then(response => {
                if (!response.ok) throw new Error(`Gagal memuat ${componentPath}. Status: ${response.status}`);
                return response.text();
            })
            .then(data => {
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.innerHTML = data;
                    if (callback) callback(); 
                }
            })
            .catch(error => {
                console.error('Error memuat komponen:', error);
            });
    }

    /**
     * --- 4. NAVIGASI AKTIF ---
     * Fungsi untuk menandai link navigasi yang aktif
     */
    function initializeActiveNav() {
        const currentPath = window.location.pathname.split('/').pop();
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

        navLinks.forEach(link => {
            const linkPath = link.getAttribute('href').split('/').pop();
            
            if ((currentPath === 'index.html' || currentPath === '') && (linkPath === 'index.html' || linkPath === '')) {
                link.classList.add('active');
            } else if (linkPath !== '' && currentPath === linkPath) {
                link.classList.add('active');
            }
        });
    }

    /**
     * --- 3. MENU MOBILE ---
     * Fungsi untuk menginisialisasi fungsionalitas Navbar (Menu Mobile + Nav Aktif)
     */
    function initializeNavbar() {
        const navbarToggler = document.querySelector('.navbar-toggler');
        const navbarNav = document.querySelector('.navbar-nav');
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

        if (navbarToggler && navbarNav) {
            navbarToggler.addEventListener('click', () => {
                navbarNav.classList.toggle('active');
                const isExpanded = navbarToggler.getAttribute('aria-expanded') === 'true';
                navbarToggler.setAttribute('aria-expanded', !isExpanded);
            });
            
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    if (navbarNav.classList.contains('active')) {
                        navbarNav.classList.remove('active');
                        navbarToggler.setAttribute('aria-expanded', 'false');
                    }
                });
            });
        }
        // Panggil fungsi active nav SETELAH navbar dimuat
        initializeActiveNav();
    }

    /**
     * --- 5. ANIMASI FADE-IN ---
     * Fungsi untuk menginisialisasi observer animasi fade-in
     */
    function initializeFadeInObserver() {
        const sectionsToAnimate = document.querySelectorAll('.stats-section, .portfolio-preview-section, .usp-section, .skills-section, .experience-section, .pricing-section, .contact-section, .case-study-content-section, .case-study-nav, .comparison-section, .testimonial-section');
        const options = {
            root: null, 
            rootMargin: '0px',
            threshold: 0.1 
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, options);

        sectionsToAnimate.forEach(section => {
            observer.observe(section);
        });
    }

    /**
     * --- 6. LIGHTBOX ---
     * Fungsi untuk membuat & menyuntikkan HTML Lightbox
     */
    function initializeLightbox() {
        const lightbox = document.createElement('div');
        lightbox.id = 'image-lightbox';
        lightbox.classList.add('lightbox');
        const closeButton = document.createElement('span');
        closeButton.classList.add('lightbox-close');
        closeButton.innerHTML = '&times;';
        const image = document.createElement('img');
        image.classList.add('lightbox-content');
        lightbox.appendChild(closeButton);
        lightbox.appendChild(image);
        document.body.appendChild(lightbox);

        function closeLightbox() {
            lightbox.classList.remove('active');
        }

        closeButton.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', e => (e.target === lightbox) && closeLightbox());
    }

    /**
     * --- 6. LIGHTBOX (Klik Gambar) ---
     * Fungsi untuk membuat gambar di studi kasus agar bisa diklik
     */
    function initializeClickableImages() {
        const lightbox = document.getElementById('image-lightbox');
        if (!lightbox) return;
        const lightboxImage = lightbox.querySelector('.lightbox-content');
        const images = document.querySelectorAll('.case-study-image-wrapper img');

        images.forEach(img => {
            img.classList.add('clickable-image');
            img.addEventListener('click', function() {
                lightboxImage.setAttribute('src', img.getAttribute('src'));
                lightbox.classList.add('active');
            });
        });
    }

    /**
     * --- 7. TOMBOL MELAYANG (HTML) ---
     * Fungsi untuk menyuntikkan tombol (WA & Scroll-to-Top)
     */
    function injectFloatingButtons() {
        // 1. Buat Tombol WA Melayang
        const waButton = document.createElement('a');
        waButton.id = 'floating-wa-button';
        waButton.classList.add('floating-button', 'wa-button');
        waButton.href = 'https://wa.me/6285894448143?text=Halo%20Umar,%20saya%20tertarik%20dengan%20jasa%20Hybrid%20Marketing%20&%20IT%20Anda.';
        waButton.target = '_blank';
        waButton.setAttribute('aria-label', 'Chat di WhatsApp');
        waButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-whatsapp" viewBox="0 0 16 16"><path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.1-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/></svg>`;
        
        // 2. Buat Tombol Scroll-to-Top
        const scrollTopButton = document.createElement('button');
        scrollTopButton.id = 'scroll-to-top-button';
        scrollTopButton.classList.add('floating-button', 'scroll-to-top');
        scrollTopButton.setAttribute('aria-label', 'Kembali ke atas');
        scrollTopButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-up" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"/></svg>`;
        
        document.body.appendChild(waButton);
        document.body.appendChild(scrollTopButton);
    }

    /**
     * --- 7. TOMBOL MELAYANG (Logika) ---
     * Fungsi untuk logika scroll (menampilkan tombol Scroll-to-Top)
     */
    function initializeScrollFeatures() {
        const scrollTopButton = document.getElementById('scroll-to-top-button');
        if (!scrollTopButton) return;

        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) { 
                scrollTopButton.classList.add('visible');
            } else {
                scrollTopButton.classList.remove('visible');
            }
        });

        scrollTopButton.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    /**
     * --- 8. NOTIFIKASI DUMMY ---
     */
    const dummyNotifications = [
        "Andi B. dari Jakarta baru saja memesan <strong>Paket Hybrid</strong>.",
        "Siti H. dari Surabaya baru saja memulai <strong>Konsultasi Google Ads</strong>.",
        "Budi P. dari Bandung baru saja mendaftar <strong>Audit SEO Teknis</strong>.",
        "Rian D. baru saja memesan <strong>Paket Ads Management</strong>.",
        "Dewi L. dari Medan baru saja memulai <strong>Konsultasi Meta Ads</strong>.",
        "Eka W. dari Bekasi baru saja memesan <strong>Paket IT Maintenance</strong>.",
        "Putra S. baru saja mendaftar <strong>Audit SEO Teknis</strong>.",
        "Lina M. dari Tangerang baru saja memesan <strong>Paket Hybrid</strong>.",
        "Agus R. baru saja memulai <strong>Konsultasi Google Ads</strong>.",
        "Fitri A. dari Depok baru saja memesan <strong>Paket Ads Management</strong>.",
        "Yusuf K. baru saja memesan <strong>Paket IT Maintenance</strong>.",
        "Nadia F. dari Semarang baru saja memulai <strong>Konsultasi Meta Ads</strong>.",
        "Rahmat H. baru saja mendaftar <strong>Audit SEO Teknis</strong>.",
        "Wulan S. dari Palembang baru saja memesan <strong>Paket Hybrid</strong>.",
        "Indra G. baru saja memulai <strong>Konsultasi Google Ads</strong>.",
        "Rina J. dari Makassar baru saja memesan <strong>Paket Ads Management</strong>.",
        "Doni M. baru saja memesan <strong>Paket IT Maintenance</strong>.",
        "Ratna P. baru saja mendaftar <strong>Audit SEO Teknis</strong>.",
        "Fajar N. dari Jakarta baru saja memulai <strong>Konsultasi Meta Ads</strong>.",
        "Dian K. dari Surabaya baru saja memesan <strong>Paket Hybrid</strong>.",
        "Bayu A. dari Bandung baru saja memulai <strong>Konsultasi Google Ads</strong>.",
        "Mega C. baru saja mendaftar <strong>Audit SEO Teknis</strong>.",
        "Reza F. dari Medan baru saja memesan <strong>Paket Ads Management</strong>.",
        "Chandra T. baru saja memesan <strong>Paket IT Maintenance</strong>.",
        "Tari L. dari Bekasi baru saja memulai <strong>Konsultasi Meta Ads</strong>.",
        "Gilang R. baru saja memesan <strong>Paket Hybrid</strong>.",
        "Vina P. dari Tangerang baru saja mendaftar <strong>Audit SEO Teknis</strong>.",
        "Handoko S. baru saja memulai <strong>Konsultasi Google Ads</strong>.",
        "Sari W. dari Depok baru saja memesan <strong>Paket Ads Management</strong>.",
        "Dimas A. dari Jakarta baru saja memesan <strong>Paket IT Maintenance</strong>."
    ];

    // Fungsi untuk menyuntikkan HTML notifikasi
    function injectDummyNotification() {
        const notification = document.createElement('div');
        notification.id = 'dummy-notification';
        notification.classList.add('dummy-notification');
        notification.innerHTML = `
            <div class="notification-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                </svg>
            </div>
            <div class="notification-content">
                <p id="notification-text"></p>
                <span class="notification-time">beberapa detik yang lalu</span>
            </div>
        `;
        document.body.appendChild(notification);
    }

    // Fungsi untuk menampilkan & mengulang notifikasi
    function showRandomNotification() {
        const notification = document.getElementById('dummy-notification');
        const textElement = document.getElementById('notification-text');
        if (!notification || !textElement) return;

        const randomIndex = Math.floor(Math.random() * dummyNotifications.length);
        textElement.innerHTML = dummyNotifications[randomIndex];
        
        notification.classList.add('visible');
        
        setTimeout(() => notification.classList.remove('visible'), 4000); // 4 detik terlihat

        const nextInterval = Math.floor(Math.random() * (15000 - 8000 + 1)) + 8000;
        setTimeout(showRandomNotification, nextInterval);
    }

    /**
     * --- 9. LOGIKA CTA KONTEKSTUAL (Frictionless Funnel) ---
     */
    function initializeContextualWA() {
        const WA_BASE_URL = "https://wa.me/6285894448143";
        const path = window.location.pathname;
        const pageTitleElement = document.querySelector('h1');
        
        if (!pageTitleElement) return; // Keluar jika tidak ada H1

        const pageTitle = pageTitleElement.innerText.trim();
        let prefillText = "";

        // Tentukan pre-fill text berdasarkan halaman
        if (path.includes('/insights/')) {
            prefillText = `Halo Umar, saya baru membaca artikel Anda tentang "${pageTitle}". Saya tertarik untuk berdiskusi.`;
        } else if (path.includes('/portfolio/')) {
            prefillText = `Halo Umar, saya baru melihat studi kasus Anda tentang "${pageTitle}". Saya tertarik untuk membahas strategi serupa untuk bisnis saya.`;
        } else if (document.body.classList.contains('about-page')) {
            prefillText = `Halo Umar, saya baru melihat halaman 'Tentang Saya' Anda dan tertarik untuk konsultasi.`;
        } else if (document.body.classList.contains('home-page')) {
            prefillText = `Halo Umar, saya baru membaca hook Anda di website: "${pageTitle}". Saya mengalami masalah serupa dan tertarik untuk konsultasi.`;
        }

        // Temukan semua tombol CTA kontekstual di halaman
        const ctaButtons = document.querySelectorAll('.cta-contextual-wa');
        
        if (ctaButtons.length > 0 && prefillText !== "") {
            const encodedText = encodeURIComponent(prefillText);
            ctaButtons.forEach(button => {
                button.href = `${WA_BASE_URL}?text=${encodedText}`;
                button.target = "_blank"; // Pastikan terbuka di tab baru
            });
        }
    }

    /**
     * --- 10. (BARU) LOGIKA FOOTER INTERAKTIF ---
     */
    function initializeInteractiveFooter() {
        const footer = document.getElementById('footer-interactive');
        const spotlight = footer ? footer.querySelector('.footer-spotlight') : null;

        if (!footer || !spotlight) {
            // console.log('Footer interaktif tidak ditemukan, membatalkan.');
            return;
        }

        footer.addEventListener('mousemove', (e) => {
            const rect = footer.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Update posisi spotlight via CSS custom property
            footer.style.setProperty('--spotlight-x', `${x}px`);
            footer.style.setProperty('--spotlight-y', `${y}px`);
        });
    }


    // --- EKSEKUSI SEMUA FUNGSI ---

    // 1. Muat Komponen
    const navbarPlaceholder = document.getElementById('navbar-placeholder');
    if (navbarPlaceholder) {
        const navbarPath = navbarPlaceholder.getAttribute('data-component-path') || 'components/_navbar.html';
        loadComponent(navbarPath, 'navbar-placeholder', initializeNavbar); // initializeNavbar memanggil activeNav
    }

    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
        const footerPath = footerPlaceholder.getAttribute('data-component-path') || 'components/_footer.html';
        // (PERUBAHAN): Panggil initializeInteractiveFooter HANYA SETELAH footer dimuat
        loadComponent(footerPath, 'footer-placeholder', initializeInteractiveFooter);
    }

    // 2. Inisialisasi Fitur Halaman
    initializeFadeInObserver();
    initializeLightbox();
    initializeClickableImages();
    injectFloatingButtons();
    initializeScrollFeatures();
    initializeContextualWA(); // Panggil fungsi CTA Kontekstual

    // 3. Mulai Notifikasi Dummy (setelah preloader selesai & ada jeda)
    body.classList.contains('loaded') 
        ? setTimeout(() => { injectDummyNotification(); setTimeout(showRandomNotification, 5000); }, 1000)
        : window.addEventListener('load', () => setTimeout(() => { injectDummyNotification(); setTimeout(showRandomNotification, 5000); }, 1000));
});