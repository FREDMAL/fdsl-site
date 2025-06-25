// Atualizar relógio
function updateRelogio() {
    const now = new Date();
    const diasSemana = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    
    const dia = String(now.getDate()).padStart(2, '0');
    const mes = meses[now.getMonth()];
    const ano = now.getFullYear();
    
    const horas = String(now.getHours()).padStart(2, '0');
    const minutos = String(now.getMinutes()).padStart(2, '0');
    const segundos = String(now.getSeconds()).padStart(2, '0');
    
    document.getElementById('clock-time').textContent = `${horas}:${minutos}:${segundos}`;
    document.getElementById('clock-date').textContent = `${dia} ${mes} ${ano}`;
}

// Atualizar o relógio a cada segundo
setInterval(updateRelogio, 1000);
updateRelogio();

// Simulação de previsão do tempo
function updateWeather() {
    const weatherWidget = document.getElementById('weatherWidget');
    const temp = Math.floor(Math.random() * 10) + 20;
    
    const weatherTypes = [
        { icon: 'fa-sun', text: 'Ensolarado' },
        { icon: 'fa-cloud-sun', text: 'Parcialmente nublado' },
        { icon: 'fa-cloud', text: 'Nublado' },
        { icon: 'fa-cloud-showers-heavy', text: 'Chuvoso' }
    ];
    
    const currentWeather = weatherTypes[Math.floor(Math.random() * weatherTypes.length)];
    
    weatherWidget.querySelector('.weather-temp').textContent = `${temp}°C`;
    weatherWidget.querySelector('.weather-icon i').className = `fas ${currentWeather.icon}`;
    weatherWidget.querySelector('.weather-description').textContent = currentWeather.text;
}

updateWeather();
setInterval(updateWeather, 1800000);

// Player de Músicas Locais
const radioPlayPauseBtn = document.getElementById('radio-playPauseBtn');
const radioVolumeSlider = document.getElementById('radio-volumeSlider');
const nowPlayingElement = document.getElementById('nowPlaying');
const progressBar = document.getElementById('progressBar');
const radioPrevBtn = document.getElementById('radio-prev');
const radioNextBtn = document.getElementById('radio-next');

// Lista de músicas locais (arquivos na pasta /mp3)
const musicList = [
    { title: "Música 1", artist: "Artista 1", file: "musica1.mp3" },
    { title: "Música 2", artist: "Artista 2", file: "musica2.mp3" },
    { title: "Música 3", artist: "Artista 3", file: "musica3.mp3" },
    { title: "Música 4", artist: "Artista 4", file: "musica4.mp3" },
    { title: "Música 5", artist: "Artista 5", file: "musica5.mp3" }
];

let currentSongIndex = 0;
let audio = new Audio();
let isPlaying = false;
let progressUpdateInterval;

// Função para carregar e tocar a música
function loadSong(index) {
    const song = musicList[index];
    audio.src = `mp3/${song.file}`;
    audio.load();
    updateNowPlaying(song.title, song.artist);
    playSong();
}

function playSong() {
    audio.play();
    isPlaying = true;
    radioPlayPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    startProgressUpdate();
}

function pauseSong() {
    audio.pause();
    isPlaying = false;
    radioPlayPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    clearInterval(progressUpdateInterval);
}

function updateNowPlaying(title, artist) {
    nowPlayingElement.innerHTML = `TOCANDO AGORA: <span>${title} - ${artist}</span>`;
}

function startProgressUpdate() {
    clearInterval(progressUpdateInterval);
    progressUpdateInterval = setInterval(() => {
        const progress = (audio.currentTime / audio.duration) * 100;
        progressBar.style.width = `${progress}%`;
        if (progress >= 100) {
            playNextSong();
        }
    }, 1000);
}

function playNextSong() {
    currentSongIndex = (currentSongIndex + 1) % musicList.length;
    loadSong(currentSongIndex);
}

function playPrevSong() {
    currentSongIndex = (currentSongIndex - 1 + musicList.length) % musicList.length;
    loadSong(currentSongIndex);
}

// Event listeners
radioPlayPauseBtn.addEventListener('click', () => {
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

radioVolumeSlider.addEventListener('input', () => {
    audio.volume = radioVolumeSlider.value;
});

radioPrevBtn.addEventListener('click', playPrevSong);
radioNextBtn.addEventListener('click', playNextSong);

// Carregar a primeira música
loadSong(0);

// Formulário de contato
const contactForm = document.getElementById('contactForm');
const confirmationPage = document.getElementById('confirmationPage');
const newMessageBtn = document.getElementById('newMessageBtn');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    setTimeout(function() {
        contactForm.style.display = 'none';
        confirmationPage.style.display = 'block';
    }, 1000);
});

newMessageBtn.addEventListener('click', function() {
    contactForm.reset();
    contactForm.style.display = 'block';
    confirmationPage.style.display = 'none';
});

// Scroll suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            document.querySelectorAll('nav a').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
        }
    });
});

// Destaque de seção ativa
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= (sectionTop - 100)) {
            currentSection = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('nav a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
});

// Sistema de pagamento
const comprarBtns = document.querySelectorAll('.comprar-btn');
const paymentModal = document.getElementById('paymentModal');
const closeModal = document.getElementById('closeModal');
const paymentOptions = document.querySelectorAll('.payment-option');
const pixPayment = document.getElementById('pixPayment');
const cartaoPayment = document.getElementById('cartaoPayment');
const modalProduct = document.getElementById('modal-product');
const modalQuantity = document.getElementById('modal-quantity');
const modalTotal = document.getElementById('modal-total');
const confirmPix = document.getElementById('confirmPix');

comprarBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        const product = this.getAttribute('data-product');
        const price = parseFloat(this.getAttribute('data-price'));
        
        modalProduct.value = product;
        modalQuantity.value = 1;
        updateTotal(price, 1);
        
        paymentModal.style.display = 'flex';
        
        paymentOptions.forEach(option => {
            option.classList.remove('active');
            if (option.classList.contains('pix')) {
                option.classList.add('active');
            }
        });
        
        pixPayment.classList.add('active');
        cartaoPayment.classList.remove('active');
    });
});

closeModal.addEventListener('click', function() {
    paymentModal.style.display = 'none';
});

window.addEventListener('click', function(e) {
    if (e.target === paymentModal) {
        paymentModal.style.display = 'none';
    }
});

modalQuantity.addEventListener('input', function() {
    const product = modalProduct.value;
    const quantity = this.value;
    const price = getPriceForProduct(product);
    updateTotal(price, quantity);
});

paymentOptions.forEach(option => {
    option.addEventListener('click', function() {
        const method = this.getAttribute('data-method');
        
        paymentOptions.forEach(opt => opt.classList.remove('active'));
        this.classList.add('active');
        
        pixPayment.classList.remove('active');
        cartaoPayment.classList.remove('active');
        
        if (method === 'pix') {
            pixPayment.classList.add('active');
        } else if (method === 'cartao') {
            cartaoPayment.classList.add('active');
        }
    });
});

confirmPix.addEventListener('click', function() {
    const name = document.getElementById('customer-name').value;
    const address = document.getElementById('customer-address').value;
    const product = document.getElementById('modal-product').value;
    const quantity = document.getElementById('modal-quantity').value;
    const total = document.getElementById('modal-total').value;
    
    const message = `Olá, acabei de fazer um pedido!\n\n*Nome:* ${name}\n*Endereço:* ${address}\n*Produto:* ${product}\n*Quantidade:* ${quantity}\n*Total:* ${total}\n\nPor favor, confirme o pedido.`;
    const whatsappUrl = `https://wa.me/5569984439632?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
    paymentModal.style.display = 'none';
});

function getPriceForProduct(product) {
    if (product === "Blocos Estruturais") return 5000;
    if (product === "Blocos de Canaletas") return 5;
    if (product === "Blocos Pavers") return 3000;
    return 0;
}

function updateTotal(price, quantity) {
    const total = price * quantity;
    modalTotal.value = `R$ ${total.toFixed(2).replace('.', ',')}`;
}
