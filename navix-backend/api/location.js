const { db } = require('../lib/firebaseAdmin');

// Path node di Realtime Database tempat data lokasi disimpan.
// Sesuaikan dengan struktur database Firebase kamu.
const LOCATION_PATH = 'devices/navix/location';

module.exports = async function handler(req, res) {
  // CORS dasar — sesuaikan origin jika frontend di-hosting di domain lain
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-api-key');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'GET') {
      // Frontend dashboard memanggil ini untuk menampilkan lokasi terbaru.
      const snapshot = await db.ref(LOCATION_PATH).once('value');
      const data = snapshot.val();

      if (!data) {
        return res.status(404).json({ error: 'Belum ada data lokasi' });
      }

      return res.status(200).json({
        lat: data.lat,
        lng: data.lng,
        accuracy: data.accuracy ?? null,
        updatedAt: data.updatedAt ?? null,
      });
    }

    if (req.method === 'POST') {
      // Endpoint ini dipakai perangkat pengirim GPS untuk update lokasi.
      // Dilindungi API key server-side, BUKAN key Firebase client.
      const apiKey = req.headers['x-api-key'];
      if (!apiKey || apiKey !== process.env.DEVICE_API_KEY) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const { lat, lng, accuracy } = req.body || {};
      if (typeof lat !== 'number' || typeof lng !== 'number') {
        return res.status(400).json({ error: 'lat dan lng wajib berupa angka' });
      }

      await db.ref(LOCATION_PATH).set({
        lat,
        lng,
        accuracy: accuracy ?? null,
        updatedAt: Date.now(),
      });

      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: 'Method tidak didukung' });
  } catch (err) {
    console.error('Firebase error:', err);
    return res.status(500).json({ error: 'Terjadi kesalahan server' });
  }
};
