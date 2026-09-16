// Toggle Menu Mobile
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileTeamLink = document.getElementById('mobile-team-link');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

mobileTeamLink.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
});

// ==========================================
// 1. KONFIGURASI FIREBASE (WAJIB DISESUAIKAN)
// ==========================================
const firebaseConfig = {
    apiKey: "AIzaSyB5riZD9OxYN0vQEIgEANxWznp_WzSawb8",
    authDomain: "fixselesai-fde60.firebaseapp.com",
    databaseURL: "https://fixselesai-fde60-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "fixselesai-fde60",
    storageBucket: "fixselesai-fde60.firebasestorage.app",
        messagingSenderId: "666302669881",
    appId: "1:666302669881:web:b65fdba496c55d015199e8"
};

// Inisialisasi Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// ==========================================
// 2. INISIALISASI MAPS INTERAKTIF (LEAFLET JS)
// ==========================================
const defaultLat = -7.73919;
const defaultLng = 112.1429;

const map = L.map('map').setView([defaultLat, defaultLng], 15);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

let marker = L.marker([defaultLat, defaultLng]).addTo(map)
    .bindPopup('<b>Lokasi Alat Saat Ini</b>')
    .openPopup();

// ==========================================
// 3. PENGAMBILAN DATA REAL-TIME DARI FIREBASE
// ==========================================
database.ref('tracker').on('value', (snapshot) => {
    const data = snapshot.val();
    const statusBadge = document.getElementById('connection-status');
    
    if (data && data.lat && data.lng) {
        const lat = parseFloat(data.lat);
        const lng = parseFloat(data.lng);

        document.getElementById('latitude').innerText = lat;
        document.getElementById('longitude').innerText = lng;
        
        statusBadge.innerText = "Terhubung";
        statusBadge.className = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-100";

        const waktuSekarang = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + " WIB";
        document.getElementById('timestamp').innerText = waktuSekarang;

        marker.setLatLng([lat, lng]);
        map.panTo([lat, lng]);
    } else {
        statusBadge.innerText = "Data Kosong";
        statusBadge.className = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-100";
    }
}, (error) => {
    console.error("Firebase Error: ", error);
    const statusBadge = document.getElementById('connection-status');
    statusBadge.innerText = "Error Koneksi";
    statusBadge.className = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-100";
});