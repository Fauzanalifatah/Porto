// Background Music Auto-play
const bgMusic = document.getElementById('bgMusic');
const musicToggleBtn = document.getElementById('musicToggleBtn');
const musicIcon = document.getElementById('musicIcon');

let isMuted = true;

// Set volume awal
bgMusic.volume = 0.3;
bgMusic.muted = true;

// Auto-play music setelah loading selesai
window.addEventListener('load', () => {
    // Coba autoplay
    const playPromise = bgMusic.play();
    
    if (playPromise !== undefined) {
        playPromise.then(() => {
            // Autoplay berhasil
            console.log('Music playing automatically');
        }).catch(error => {
            // Autoplay diblock oleh browser, tampilkan notifikasi
            console.log('Autoplay was prevented. User interaction needed.');
            // Browser modern membutuhkan user interaction untuk autoplay
            // Music akan diplay saat user klik pertama kali di halaman
            document.body.addEventListener('click', () => {
                bgMusic.play();
            }, { once: true });
        });
    }
});

// Toggle mute/unmute
musicToggleBtn.addEventListener('click', () => {
    if (isMuted) {
        bgMusic.muted = false;
        musicIcon.classList.remove('fa-volume-mute');
        musicIcon.classList.add('fa-volume-up');
        musicToggleBtn.classList.remove('muted');
    } else {
        bgMusic.muted = true;
        musicIcon.classList.remove('fa-volume-up');
        musicIcon.classList.add('fa-volume-mute');
        musicToggleBtn.classList.add('muted');
    }
    isMuted = !isMuted;
});

// Loading Screen
window.addEventListener('load', () => {
    const loadingScreen = document.querySelector('.loading-screen');
    
    // Minimum loading time 1.5 detik untuk efek visual yang lebih baik
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        
        // Hapus element loading setelah animasi selesai
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 1500);
});


// Blur Text Animation dengan GSAP
gsap.registerPlugin(ScrollTrigger);

function blurTextAnimation() {
    const heading = document.getElementById('splitTextHeading');
    if (!heading) return;
    const text = heading.textContent;
    heading.innerHTML = '';
    heading.style.display = 'flex';
    heading.style.flexWrap = 'wrap';
    // Split text menjadi words
    const words = text.split(' ');
    words.forEach((word, index) => {
        const span = document.createElement('span');
        span.className = 'blur-word';
        span.textContent = word;
        span.style.display = 'inline-block';
        span.style.marginRight = '0.35em';
        span.style.willChange = 'transform, filter, opacity';
        heading.appendChild(span);
    });
    // Blur animation dengan GSAP
    gsap.fromTo('.blur-word', 
        {
            filter: 'blur(10px)',
            opacity: 0,
            y: -50
        },
        {
            filter: 'blur(0px)',
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
            stagger: 0.35,
            scrollTrigger: {
                trigger: '#splitTextHeading',
                start: 'top 80%',
                end: 'bottom 60%',
                toggleActions: 'play none none reverse'
            },
            onComplete: () => {
                console.log('Blur text animation complete!');
            }
        }
    );
    // Animasi intermediate blur step
    gsap.to('.blur-word', {
        keyframes: [
            { filter: 'blur(5px)', opacity: 0.5, y: 5, duration: 0.35 },
            { filter: 'blur(0px)', opacity: 1, y: 0, duration: 0.35 }
        ],
        stagger: 0.35,
        scrollTrigger: {
            trigger: '#splitTextHeading',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });
}

// Jalankan blur text animation setelah DOM loaded
document.addEventListener('DOMContentLoaded', blurTextAnimation);



// Animasi zoom-in dihapus sesuai permintaan

// Text Change Animation
const textElement = document.getElementById('changingText');
const texts = [
    'UI/UX Designer',
    'Web Designer',
    'Creative Designer',
    'Digital Creator'
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 80;

function typeText() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        textElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 40;
    } else {
        textElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 80;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typingSpeed = 500; // Pause before typing new text
    }
    
    setTimeout(typeText, typingSpeed);
}

// Start the typing animation
if (textElement) {
    setTimeout(typeText, 1000);
}

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking nav links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Gallery Filter Functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        galleryItems.forEach(item => {
            if (filterValue === 'all') {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 10);
            } else {
                if (item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            }
        });
    });
});

// Image Modal Functionality
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');
const modalCaption = document.querySelector('.modal-caption');
const closeModal = document.querySelector('.modal-close');

function openModal(button) {
    const galleryItem = button.closest('.gallery-item');
    const img = galleryItem.querySelector('img');
    const title = galleryItem.querySelector('h3').textContent;
    const description = galleryItem.querySelector('p').textContent;

    modal.style.display = 'block';
    modalImg.src = img.src;
    modalCaption.innerHTML = `<h3>${title}</h3><p>${description}</p>`;
}

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Close modal when clicking outside the image
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Smooth scroll with offset for fixed header
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe gallery items and timeline items
document.querySelectorAll('.gallery-item, .timeline-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = 'all 0.6s ease-out';
    observer.observe(item);
});

// Form Submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        
        // Simulasi pengiriman form
        alert('Terima kasih! Pesan Anda telah dikirim.');
        contactForm.reset();
        
        // Di sini Anda bisa menambahkan logika untuk mengirim data ke server
        // menggunakan fetch atau XMLHttpRequest
    });
}

// Change header background on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.background = 'transparent';
        header.style.boxShadow = 'none';
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    if (hero) {
        hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
    }
});

// Counter animation for stats
const animateCounter = (element, target, duration = 2000) => {
    let current = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
};

// Observe stats section for counter animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.textContent);
                if (!isNaN(target)) {
                    animateCounter(stat, target);
                }
            });
            entry.target.dataset.animated = 'true';
        }
    });
}, { threshold: 0.5 });

const aboutStats = document.querySelector('.about-stats');
if (aboutStats && !aboutStats.querySelector('.stat-link')) {
    statsObserver.observe(aboutStats);
}

// Portfolio Filter Functionality
const portfolioFilterButtons = document.querySelectorAll('.portfolio-filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

portfolioFilterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        portfolioFilterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        const filterValue = button.getAttribute('data-portfolio-filter');

        portfolioItems.forEach(item => {
            if (filterValue === 'all') {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 10);
            } else {
                if (item.getAttribute('data-portfolio-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            }
        });
    });
});

// Portfolio Detail Modal
const portfolioData = {
    1: {
        badge: 'WEB DESIGN',
        image: 'portofolio/Gambar 1.jpeg',
        title: 'Desain Website Modern dengan UI/UX Design Terkini',
        date: '7 Mei 2025',
        content: `
            <p>Mahasiswa Program Studi Bisnis Digital, Fakultas Ekonomi dan Bisnis, Universitas Negeri Makassar mengembangkan website modern dengan menggunakan teknologi terkini dalam UI/UX Design.</p>
            <p>Proyek ini dirancang dengan mengembangkan platfrom "Satu Jejak" yang dimana membahasa tentang jual beli catatan dan disini bertujuan untuk memajukan dunia teknologi dan membuka peluang baru dalam bidang edukasi digital.</p>
            <p>Keunggulan yang kalian bisa dapat disini yaitu bukan hanya tentang pengetahuan akan tetapi kalian juga bisa mendapatkan uang saku.</p>
        `
    },
    2: {
        badge: 'PENGHARGAAN',
        image: 'portofolio/Gambar 2.jpeg',
        title: 'UAS Digital Marketing Days, Best Social Media "PureLyfe"',
        date: '7 Desember 2025',
        content: `
            <p>Kami meraih penghargaan sebagai "Best Social Media" dalam rangka Uas Digital Marketing Days dengan nama instagram yaitu @PureLyfe dan disini kami sangat senang karena dari ada banyak hal yang kami korbankan seperti, waktu, ide, dan tenaga. PureLyfe ini memiliki tiga anggota yang dimana kami saling bekerja sama untuk mencapai tujuan ini. Saya Muhammaad Fauzan Ali Fatah ada juga 2 anggota saya yang bernama Andi Syarafina Muslim & Nurul Azizah Syahputri Sudirman</p>
            
            <div style="margin: 2rem 0; text-align: center;">
                <img src="artikel/Gambar 1 (2).jpeg" alt="Digital Marketing Event" style="width: 50%; border-radius: 12px; margin-bottom: 1rem;">
            </div>
            
            <p>Produk yang kami persentasi yaitu Edible Cup yang dimana ini adalah inovasi terbaru dalam kemasan gelas yang ramah lingkungan dan dapat dimakan. Ini direncanakan dipakai untuk menggantikan gelas plastik sekali pakai yang berdampak negatif terhadap lingkungan.</p>
            
            <div style="margin: 2rem 0; text-align: center;">
                <img src="artikel/Gambar 2 (2).jpeg" alt="Team Presentation" style="width: 50%; border-radius: 10px;">
            </div>
            
            <p>Ini juga terdapat teman saya yang menjuarai pada Digital Marketing Days dengan ide mereka yaitu "KaryaGuna" yang dimana ini adalah platfrom untuk tukang tukang yang ingin mencari pekerjaan dengan mudah dan cepat atau bisa dibilang aplikasi jasa online yang ingin dikerjakan perabot rumah pelanggan.</p> 
        `
    },
    3: {
        badge: 'PENGHARGAAN',
        image: 'portofolio/Gambar 3 (Tampilan Awal).png',
        title: 'Team Tigital Raih Penghargaan Best Video 2 di National Business Plan Competition 2025 FISH-H',
        date: '7-9 Mei 2025',
        content: `
            <p>Tim mahasiswa dari Program Studi Bisnis Digital, Fakultas Ekonomi dan Bisnis (FEB) Universitas Negeri Makassar (UNM) kembali menorehkan prestasi di kancah nasional. Tim yang beranggotakan Andi Sifa Ramadani, Miskatul Jannah, dan Muhammad Fauzan Ali Fatah berhasil meraih penghargaan Best Video 2 dalam ajang National Business Plan Competition Business Project 5.0.</p>
            
            <div style="margin: 2rem 0; text-align: center;">
                <img src="portofolio/Gambar 3 (Dalam).jpeg" alt="" style="width: 70%; border-radius: 12px; margin-bottom: 1rem;">
            </div>
            
            <p>Kompetisi bergengsi ini diselenggarakan oleh HIMANIS FIS-H UNM (Himpunan Mahasiswa Ilmu Administrasi FIS-H UNM) dan berlangsung pada tanggal 7 sampai 9 Mei 2025. Acara ini merupakan wadah bagi mahasiswa seluruh Indonesia untuk mengembangkan ide bisnis inovatif dan mempresentasikannya.</p>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin: 2rem 0;">
                <div style="text-align: center; height: 100%;">
                    <img src="portofolio/Gambar 3 (Dalam 1).jpeg" alt="Team Presentation 1" style="width: 100%; height: 100%; object-fit: cover; border-radius: 10px;">
                </div>
                <div style="text-align: center; display: flex; flex-direction: column; gap: 1.5rem; height: 100%;">
                    <img src="portofolio/Gambar 3 (Dalam 3).jpeg" alt="Team Presentation 2" style="width: 100%; height: calc(50% - 0.75rem); object-fit: cover; border-radius: 10px;">
                    <img src="portofolio/Gambar 3 (Dalam 4).jpeg" alt="Team Presentation 3" style="width: 100%; height: calc(50% - 0.75rem); object-fit: cover; border-radius: 10px;">
                </div>
            </div>
            
            <p>Karya video yang dikembangkan oleh tim UNM ini dinilai memiliki kualitas presentasi dan kreativitas visual yang luar biasa, sehingga mampu menarik perhatian dewan juri dan mengungguli peserta dari berbagai perguruan tinggi lainnya.</p> 
        
            <div style="margin: 2rem 0; text-align: center;">
                <img src="portofolio/Gambar 3 (Dalam 2).jpeg" alt="Team Presentation" style="width: 50%; border-radius: 10px;">
            </div>

             <p>Adapun team dari UNM yang lolos dalam mengikuti lomba National Business Plan Competition 2025 FISH-H dari beberapa prodi, jurusan dan angkatan</p> 
        
        `
    },
    4: {
        badge: 'WEB DESIGN',
        image: 'gambar/portfolio4.jpg',
        title: 'E-Commerce Platform dengan Full Stack Development',
        date: '1 Januari 2026',
        content: `
            <p>Pengembangan platform e-commerce lengkap dengan sistem manajemen produk, keranjang belanja, payment gateway, dan dashboard admin.</p>
            <p>Platform ini dibangun menggunakan teknologi full stack modern: React untuk frontend, Node.js/Express untuk backend, dan MongoDB sebagai database. Sistem keamanan mencakup enkripsi data, secure payment processing, dan user authentication.</p>
            <p>Fitur unggulan termasuk real-time inventory management, order tracking, customer review system, dan analytics dashboard untuk pemilik toko.</p>
        `
    },
    5: {
        badge: 'GRAPHIC DESIGN',
        image: 'gambar/portfolio5.jpg',
        title: 'Event Poster Design untuk Konser Musik dan Festival',
        date: '28 Desember 2025',
        content: `
            <p>Desain poster event untuk konser musik dan festival dengan visual yang eye-catching dan informasi yang jelas.</p>
            <p>Proses desain menggabungkan typography yang bold, color scheme yang vibrant, dan komposisi yang dinamis untuk menarik perhatian target audience. Desain disesuaikan untuk berbagai format mulai dari print hingga digital marketing.</p>
            <p>Package termasuk poster utama, flyer, banner social media, dan merchandise design.</p>
        `
    }
};

const galleryData = {
    1: {
        badge: 'PERJALANAN',
        image: 'gambar/gallery1.jpg',
        title: 'Perjalanan ke Candi Borobudur yang Menakjubkan',
        date: '20 Desember 2025',
        content: `
            <p>Perjalanan ke Candi Borobudur, salah satu keajaiban dunia yang terletak di Jawa Tengah. Candi Buddha terbesar di dunia ini menawarkan pengalaman spiritual dan arsitektur yang luar biasa.</p>
            <p>Kunjungan dimulai pagi hari untuk menyaksikan sunrise yang spektakuler dari atas candi. Arsitektur megah dengan relief yang menceritakan kisah Buddha dan detail ukiran yang memukau membuat perjalanan ini tak terlupakan.</p>
            <p>Pengalaman ini tidak hanya tentang wisata, tetapi juga pembelajaran budaya dan sejarah Indonesia yang kaya.</p>
        `
    },
    2: {
        badge: 'KELUARGA',
        image: 'gambar/gallery2.jpg',
        title: 'Berkumpul Bersama Keluarga Tercinta di Hari Raya',
        date: '15 Desember 2025',
        content: `
            <p>Momen berkumpul bersama keluarga tercinta di hari raya Idul Fitri. Tradisi silaturahmi dan berbagi kebahagiaan bersama orang-orang terkasih.</p>
            <p>Acara dimulai dengan shalat Ied bersama di masjid, dilanjutkan dengan kumpul keluarga di rumah. Menu makanan tradisional, ketupat, opor ayam, dan rendang menghiasi meja makan.</p>
            <p>Kehangatan kebersamaan dan tawa canda bersama keluarga menjadi momen yang sangat berharga dan dinanti-nantikan setiap tahun.</p>
        `
    },
    3: {
        badge: 'TEMAN',
        image: 'gambar/gallery3.jpg',
        title: 'Momen Kebersamaan Bersama Sahabat',
        date: '10 Desember 2025',
        content: `
            <p>Reuni dengan sahabat lama yang sudah lama tidak bertemu. Momen penuh tawa, berbagi cerita, dan mengenang masa-masa indah bersama.</p>
            <p>Pertemuan di kafe favorit dengan suasana yang nyaman menjadi tempat yang tepat untuk catching up. Berbagi pengalaman hidup, pencapaian, dan rencana masa depan membuat persahabatan semakin erat.</p>
            <p>Persahabatan sejati tidak lekang oleh waktu dan jarak. Meskipun sibuk dengan urusan masing-masing, kami selalu meluangkan waktu untuk bertemu dan saling mendukung.</p>
        `
    },
    4: {
        badge: 'ACARA',
        image: 'gambar/gallery4.jpg',
        title: 'Acara Spesial Perayaan yang Berkesan',
        date: '5 Desember 2025',
        content: `
            <p>Perayaan ulang tahun yang berkesan dengan tema elegant garden party. Acara dihadiri oleh keluarga dan teman-teman terdekat.</p>
            <p>Dekorasi outdoor dengan lampu-lampu fairy lights, bunga segar, dan setup meja yang cantik menciptakan suasana yang magical. Menu makanan dan kue ulang tahun yang lezat menjadi highlights acara.</p>
            <p>Momen spesial ini dipenuhi dengan kebahagiaan, ucapan selamat, dan doa-doa baik dari orang-orang terkasih. Dokumentasi foto dan video professional memastikan kenangan ini tersimpan dengan indah.</p>
        `
    },
    5: {
        badge: 'PERJALANAN',
        image: 'gambar/gallery5.jpg',
        title: 'Petualangan Baru Eksplorasi Tempat Baru',
        date: '1 Desember 2025',
        content: `
            <p>Petualangan eksplorasi ke destinasi wisata tersembunyi yang belum banyak dikunjungi wisatawan. Pemandangan alam yang masih alami dan udara yang segar.</p>
            <p>Perjalanan dimulai dengan trekking melalui hutan dan persawahan, dilanjutkan dengan menyusuri sungai kecil yang jernih. Destinasi akhir adalah air terjun yang indah dengan kolam alami yang bisa digunakan untuk berenang.</p>
            <p>Pengalaman ini mengajarkan untuk lebih menghargai keindahan alam Indonesia dan pentingnya menjaga kelestarian lingkungan untuk generasi mendatang.</p>
        `
    },
    6: {
        badge: 'KELUARGA',
        image: 'gambar/gallery6.jpg',
        title: 'Kenangan Bersama Orang Terkasih',
        date: '25 November 2025',
        content: `
            <p>Momen berharga bersama orang tua dan saudara di rumah kampung halaman. Kenangan masa kecil dan kehangatan keluarga yang tak tergantikan.</p>
            <p>Mengunjungi tempat-tempat yang penuh kenangan, bermain di halaman rumah, dan makan bersama hidangan favorit keluarga. Cerita-cerita lama yang diceritakan kembali membawa nostalgia yang mendalam.</p>
            <p>Waktu bersama keluarga adalah investasi paling berharga. Setiap momen, setiap tawa, dan setiap percakapan menciptakan kenangan yang akan diingat selamanya.</p>
        `
    }
};

function openPortfolioDetail(id) {
    const data = portfolioData[id];
    const modal = document.getElementById('detailModal');
    
    document.getElementById('detailBadge').textContent = data.badge;
    document.getElementById('detailImage').src = data.image;
    document.getElementById('detailTitle').textContent = data.title;
    document.getElementById('detailDate').innerHTML = `<i class="far fa-calendar"></i> ${data.date}`;
    document.getElementById('detailContent').innerHTML = data.content;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function openGalleryDetail(id) {
    const data = galleryData[id];
    const modal = document.getElementById('detailModal');
    
    document.getElementById('detailBadge').textContent = data.badge;
    document.getElementById('detailImage').src = data.image;
    document.getElementById('detailTitle').textContent = data.title;
    document.getElementById('detailDate').innerHTML = `<i class="far fa-calendar"></i> ${data.date}`;
    document.getElementById('detailContent').innerHTML = data.content;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeDetailModal() {
    const modal = document.getElementById('detailModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close detail modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('detailModal');
    if (event.target === modal) {
        closeDetailModal();
    }
}

// ==================== FAQ ACCORDION ====================
document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close other open items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
    
    // Optional: Open first FAQ by default
    if (faqItems.length > 0) {
        faqItems[0].classList.add('active');
    }
});

// ==================== BLOG CAROUSEL NAVIGATION ====================
document.addEventListener('DOMContentLoaded', () => {
    const blogPrev = document.getElementById('blogPrev');
    const blogNext = document.getElementById('blogNext');
    const blogGrid = document.getElementById('blogGrid');
    const blogItems = document.querySelectorAll('.blog-item');
    
    let currentBlogIndex = 0;
    
    function updateBlogVisibility() {
        blogItems.forEach((item, index) => {
            if (window.innerWidth <= 768) {
                // Mobile: show one at a time
                item.style.display = index === currentBlogIndex ? 'block' : 'none';
            } else {
                // Desktop: show all
                item.style.display = 'block';
            }
        });
    }
    
    blogNext.addEventListener('click', () => {
        if (currentBlogIndex < blogItems.length - 1) {
            currentBlogIndex++;
        } else {
            currentBlogIndex = 0;
        }
        updateBlogVisibility();
    });
    
    blogPrev.addEventListener('click', () => {
        if (currentBlogIndex > 0) {
            currentBlogIndex--;
        } else {
            currentBlogIndex = blogItems.length - 1;
        }
        updateBlogVisibility();
    });
    
    // Initial setup
    updateBlogVisibility();
    
    // Update on window resize
    window.addEventListener('resize', updateBlogVisibility);
});

// Hero Gallery Image Switcher with Continuous Infinite Loop
document.addEventListener('DOMContentLoaded', () => {
    const thumbnails = document.querySelectorAll('.gallery-thumbnail:not(.clone)');
    const allThumbnails = document.querySelectorAll('.gallery-thumbnail');
    const mainImage = document.getElementById('heroMainImage');
    const gallery = document.querySelector('.hero-gallery');
    let currentPosition = 0;
    const thumbnailWidth = 160 + 24; // width + gap
    const totalOriginal = thumbnails.length;
    const totalAll = allThumbnails.length;

    // Click thumbnail to change background image and slide gallery
    allThumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', () => {
            // Remove active class from all thumbnails
            allThumbnails.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked thumbnail
            thumbnail.classList.add('active');
            
            // Change main background image with fade effect
            const newImage = thumbnail.getAttribute('data-image');
            mainImage.style.opacity = '0';
            
            setTimeout(() => {
                mainImage.src = newImage;
                mainImage.style.opacity = '1';
            }, 300);

            // Move gallery forward by one position with smooth transition
            currentPosition++;
            const slideAmount = currentPosition * thumbnailWidth;
            gallery.style.transition = 'transform 0.5s ease';
            gallery.style.transform = `translateX(-${slideAmount}px)`;

            // Seamless reset when reaching the end of clones
            if (currentPosition >= totalOriginal) {
                setTimeout(() => {
                    // Disable transition for instant jump
                    gallery.style.transition = 'none';
                    currentPosition = 0;
                    gallery.style.transform = `translateX(0px)`;
                    
                    // Re-enable transition after jump
                    setTimeout(() => {
                        gallery.style.transition = 'transform 0.5s ease';
                    }, 20);
                }, 500);
            }
        });
    });

    // Add smooth transition to main image
    if (mainImage) {
        mainImage.style.transition = 'opacity 0.3s ease';
    }
});
