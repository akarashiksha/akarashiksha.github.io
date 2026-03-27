import React, { useState, useEffect } from 'react';
import { 
  Menu, X, Car, MapPin, Calendar, Search, 
  Phone, Mail, Map, UserCheck, ShieldCheck, 
  Route, HeadphonesIcon, ChevronRight, Instagram
} from 'lucide-react';

// --- STYLES UNTUK PRELOADER ANIMASI ---
const customStyles = `
  @keyframes drive {
    0% { transform: translateX(-150%); }
    50% { transform: translateX(50vw); }
    100% { transform: translateX(150vw); }
  }
  .animate-drive {
    animation: drive 2.5s ease-in-out infinite;
  }
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
  
  /* TAMBAHAN ANIMASI SMOOTH */
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(40px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in-up {
    animation: fadeInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
  }
  .opacity-0-init {
    opacity: 0;
  }
  .delay-100 { animation-delay: 100ms; }
  .delay-200 { animation-delay: 200ms; }
  .delay-300 { animation-delay: 300ms; }
  .delay-400 { animation-delay: 400ms; }
`;

export default function App() {
  const [loading, setLoading] = useState(true);
  const [activePage, setActivePage] = useState('beranda');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Preloader Timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500); // Tampil selama 2.5 detik
    return () => clearTimeout(timer);
  }, []);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo(0, 0);
    setIsMobileMenuOpen(false);
  }, [activePage]);

  // Fungsi untuk menangani gambar error (Fallback ke Unsplash jika link Cloudinary mati)
  const handleImageError = (e, fallbackUrl) => {
    e.target.src = fallbackUrl;
  };

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-blue-50">
        <style>{customStyles}</style>
        <div className="relative w-full overflow-hidden flex flex-col items-center">
          <div className="text-blue-600 mb-4 font-bold text-xl tracking-wider">Mempersiapkan Perjalanan...</div>
          <div className="w-full relative h-16 border-b-4 border-gray-800 flex items-end pb-1">
            <div className="absolute animate-drive flex items-center">
              <Car size={48} className="text-blue-600" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 flex flex-col">
      <style>{customStyles}</style>

      {/* HEADER / NAVBAR */}
      <header className="sticky top-0 z-40 bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div 
              className="flex items-center cursor-pointer" 
              onClick={() => setActivePage('beranda')}
            >
              <img 
                src="https://res.cloudinary.com/ddtgjvetf/image/upload/v1774539827/logo_ecwum7.png" 
                alt="Permata Lombok Transport Logo" 
                className="h-12 w-auto object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
              <span className="hidden ml-2 text-xl font-bold text-blue-700">Permata Lombok</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {['beranda', 'tentang', 'layanan', 'kontak'].map((page) => (
                <button
                  key={page}
                  onClick={() => setActivePage(page)}
                  className={`capitalize font-medium transition-colors ${
                    activePage === page 
                      ? 'text-blue-600 border-b-2 border-blue-600 pb-1' 
                      : 'text-gray-600 hover:text-blue-500'
                  }`}
                >
                  {page}
                </button>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-600 hover:text-blue-600 focus:outline-none p-2"
              >
                {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Panel */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-lg">
            <div className="px-4 pt-2 pb-6 space-y-2">
              {['beranda', 'tentang', 'layanan', 'kontak'].map((page) => (
                <button
                  key={page}
                  onClick={() => setActivePage(page)}
                  className={`block w-full text-left px-4 py-3 rounded-lg capitalize font-medium ${
                    activePage === page 
                      ? 'bg-blue-50 text-blue-600' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="flex-grow">
        {activePage === 'beranda' && <Beranda setActivePage={setActivePage} handleImageError={handleImageError} />}
        {activePage === 'tentang' && <Tentang />}
        {activePage === 'layanan' && <Layanan handleImageError={handleImageError} />}
        {activePage === 'kontak' && <Kontak />}
      </main>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Permata Lombok Transport</h3>
              <p className="text-sm text-slate-400 mb-4">
                Mitra perjalanan tepercaya Anda untuk menjelajahi keindahan pulau Lombok dengan nyaman dan aman.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Kontak Kami</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center"><Phone size={16} className="mr-3 text-blue-400" /> +62 89 876-543-210</li>
                <li className="flex items-center"><Mail size={16} className="mr-3 text-blue-400" /> permatalomboktransport@gmail.com</li>
                <li className="flex items-center"><Instagram size={16} className="mr-3 text-blue-400" /> @permatalomboktransport</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Alamat</h4>
              <div className="flex items-start">
                <MapPin size={20} className="mr-3 mt-1 text-blue-400 flex-shrink-0" />
                <p className="text-sm leading-relaxed">
                  Kekalik Jl. Swasembada No.133,<br/>
                  Karang Pule, Kec. Mataram,<br/>
                  Kota Mataram, Nusa Tenggara Barat,<br/>
                  83115.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
            <p>Copyright © 2026 Permata Lombok Transport. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* =========================================================================
   KOMPONEN HALAMAN
   ========================================================================= */

// --- HALAMAN BERANDA ---
function Beranda({ setActivePage, handleImageError }) {
  return (
    <div className="relative">
      {/* HERO SECTION */}
      <div className="relative h-[80vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        {/* Background Image dengan efek zoom lambat */}
        <div className="absolute inset-0 z-0 scale-105 animate-[pulse_20s_ease-in-out_infinite_alternate]">
          <img 
            src="https://res.cloudinary.com/ddtgjvetf/image/upload/v1774539832/hero_uup9wl.jpg" 
            alt="Pesona Lombok" 
            className="w-full h-full object-cover"
            onError={(e) => handleImageError(e, "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?auto=format&fit=crop&q=80")}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/60 via-black/40 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-50/90"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center mt-[-5vh]">
          <div className="text-center w-full">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white mb-6 drop-shadow-xl tracking-tight animate-fade-in-up opacity-0-init">
              PERMATA LOMBOK
            </h1>
            <h2 className="text-lg sm:text-xl md:text-2xl text-blue-50/90 font-medium drop-shadow-md animate-fade-in-up opacity-0-init delay-100 max-w-2xl mx-auto">
              Jelajahi Pesona Lombok dengan Nyaman, Fleksibel, dan Terpercaya
            </h2>
            
            {/* CTA Button Pengganti Widget */}
            <button 
              onClick={() => setActivePage('layanan')}
              className="mt-10 px-8 py-4 sm:px-10 sm:py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold text-lg shadow-xl shadow-blue-600/30 transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center mx-auto space-x-3 animate-fade-in-up opacity-0-init delay-200 group"
            >
              <span>Lihat Layanan Kami</span>
              <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Quick Info Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 mt-[-10vh] relative z-20">
        <div className="flex flex-col md:flex-row items-center justify-between bg-white/80 backdrop-blur-xl rounded-3xl p-8 sm:p-10 shadow-xl border border-white/50 animate-fade-in-up opacity-0-init delay-300 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500">
          <div className="mb-6 md:mb-0 md:mr-8 text-center md:text-left">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Mengapa Memilih Kami?</h3>
            <p className="text-gray-600 text-lg">Pengalaman lokal otentik dengan armada prima yang menjamin kenyamanan liburan Anda di Lombok.</p>
          </div>
          <button 
            onClick={() => setActivePage('tentang')}
            className="flex items-center justify-center bg-gray-50 hover:bg-blue-50 text-blue-600 px-6 py-3 rounded-2xl font-semibold transition-colors whitespace-nowrap group w-full md:w-auto"
          >
            Pelajari Selengkapnya <ChevronRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}

// --- HALAMAN TENTANG KAMI ---
function Tentang() {
  const keunggulan = [
    {
      icon: <UserCheck size={32} />,
      title: "Pengemudi Sebagai Local Storyteller",
      desc: "Supir ramah, warga lokal berwawasan budaya Sasak, pemberi rekomendasi hidden gems kuliner, dan siap bantu foto untuk momen liburan Anda.",
      delay: ""
    },
    {
      icon: <ShieldCheck size={32} />,
      title: "Garansi Kendaraan Prima dan Wangi",
      desc: "SOP kebersihan ketat, mobil dijamin bersih, nyaman, dan AC berfungsi maksimal sebelum menjemput Anda.",
      delay: "delay-100"
    },
    {
      icon: <Map size={32} />,
      title: "Fleksibilitas Rute",
      desc: "Kebebasan menyesuaikan atau mengubah rute secara spontan. Liburan Anda, aturan Anda.",
      delay: "delay-200"
    },
    {
      icon: <HeadphonesIcon size={32} />,
      title: "Layanan Konsultasi 24/7",
      desc: "Customer Service siaga memantau dan memberi solusi cepat untuk perubahan jadwal atau keadaan darurat.",
      delay: "delay-300"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="text-center mb-20 animate-fade-in-up opacity-0-init">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">Tentang Kami</h2>
        <div className="w-24 h-1.5 bg-blue-600 mx-auto rounded-full mb-8"></div>
        <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-600 leading-relaxed">
          Lebih dari sekadar transportasi. Kami adalah mitra lokal yang siap menjadikan perjalanan Anda di Lombok penuh makna, nyaman, dan tak terlupakan.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
        {keunggulan.map((item, index) => (
          <div 
            key={index} 
            className={`group bg-white p-8 md:p-10 rounded-3xl shadow-sm hover:shadow-2xl border border-gray-100 hover:border-blue-100 hover:-translate-y-2 transition-all duration-500 flex flex-col sm:flex-row items-start gap-6 animate-fade-in-up opacity-0-init ${item.delay}`}
          >
            <div className="bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white p-5 rounded-2xl flex-shrink-0 transition-colors duration-500">
              {item.icon}
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed text-base">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- HALAMAN LAYANAN KAMI ---
function Layanan({ handleImageError }) {
  const airportTransfer = [
    { tujuan: "Kuta Mandalika & Sekitar", harga: "Rp 150.000" },
    { tujuan: "Kota Mataram", harga: "Rp 200.000" },
    { tujuan: "Senggigi", harga: "Rp 250.000" },
    { tujuan: "Pelabuhan Bangsal", harga: "Rp 300.000" },
    { tujuan: "Senaru", harga: "Rp 450.000" },
  ];

  const rentCar = [
    { mobil: "Toyota Avanza", kapasitas: "4 Orang", harga: "Rp 500.000" },
    { mobil: "Toyota Innova Reborn", kapasitas: "6 Orang", harga: "Rp 800.000" },
    { mobil: "Toyota Hiace Commuter", kapasitas: "14 Orang", harga: "Rp 1.200.000" },
    { mobil: "Toyota Alphard VIP", kapasitas: "-", harga: "Rp 2.500.000" },
  ];

  const paketWisata = [
    { nama: "Sasak Mandalika Tour", rute: "Desa Adat Sade – Pantai Kuta Mandalika – Sirkuit Mandalika – Bukit Merese – Pantai Tanjung Aan", harga: "Rp 600.000" },
    { nama: "Air Terjun Eksotis", rute: "Air Terjun Sendang Gile – Masjid Kuno Bayan – Sunset di Pantai Senggigi", harga: "Rp 700.000" },
    { nama: "Pantai Pasir Putih", rute: "Pelabuhan Tanjung Luar - Pink Beach - Pulau Pasir - Gili Petelu", harga: "Rp 800.000" },
    { nama: "Pesona Gili Trawangan", rute: "Bukit Malimbu – Pelabuhan Bangsal – Hutan Kera Pusuk", harga: "Rp 900.000" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="text-center mb-20 animate-fade-in-up opacity-0-init">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">Layanan Kami</h2>
        <div className="w-24 h-1.5 bg-blue-600 mx-auto rounded-full mb-8"></div>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">Solusi transportasi dan wisata terbaik yang disesuaikan dengan kebutuhan Anda.</p>
      </div>

      <div className="space-y-12 md:space-y-20">
        
        {/* Kategori 1: Airport Transfer */}
        <div className="group bg-white rounded-3xl shadow-sm hover:shadow-2xl border border-gray-100 overflow-hidden transition-all duration-500 animate-fade-in-up opacity-0-init">
          <div className="grid grid-cols-1 lg:grid-cols-5">
            <div className="lg:col-span-2 relative h-72 lg:h-auto overflow-hidden">
              <img 
                src="https://res.cloudinary.com/ddtgjvetf/image/upload/v1774539825/bandara_r6nw3z.jpg" 
                alt="Airport Transfer" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                onError={(e) => handleImageError(e, "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80")}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent flex items-end p-8">
                <h3 className="text-3xl font-bold text-white tracking-wide">Airport Transfer</h3>
              </div>
            </div>
            <div className="lg:col-span-3 p-6 md:p-10">
              <div className="space-y-2">
                {airportTransfer.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center p-4 hover:bg-gray-50 rounded-2xl transition-colors">
                    <div className="flex items-center">
                      <div className="bg-blue-100 text-blue-600 p-2 rounded-lg mr-4 flex-shrink-0">
                        <MapPin size={20} />
                      </div>
                      <span className="font-medium text-gray-700 text-sm sm:text-base">Bandara <span className="mx-1 sm:mx-2 text-gray-400">→</span> {item.tujuan}</span>
                    </div>
                    <span className="font-bold text-blue-600 whitespace-nowrap ml-2 text-sm sm:text-base bg-blue-50 px-3 py-1.5 rounded-lg">{item.harga}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Kategori 2: Driver Rentcar */}
        <div className="group bg-white rounded-3xl shadow-sm hover:shadow-2xl border border-gray-100 overflow-hidden transition-all duration-500 animate-fade-in-up opacity-0-init delay-100">
          <div className="grid grid-cols-1 lg:grid-cols-5">
            <div className="lg:col-span-2 relative h-72 lg:h-auto lg:order-last overflow-hidden">
              <img 
                src="https://res.cloudinary.com/ddtgjvetf/image/upload/v1774539828/alpard_cbbmm9.png" 
                alt="Driver Rentcar" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                onError={(e) => handleImageError(e, "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80")}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent flex items-end p-8">
                <h3 className="text-3xl font-bold text-white tracking-wide">Sewa Mobil + Supir</h3>
              </div>
            </div>
            <div className="lg:col-span-3 p-6 md:p-10 lg:border-r border-gray-100">
              <div className="space-y-2">
                {rentCar.map((item, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 hover:bg-gray-50 rounded-2xl transition-colors">
                    <div className="flex items-start sm:items-center">
                      <div className="bg-blue-100 text-blue-600 p-2 rounded-lg mr-4 mt-1 sm:mt-0 flex-shrink-0">
                        <Car size={20} />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800">{item.mobil}</h4>
                        {item.kapasitas !== "-" && (
                          <p className="text-sm text-gray-500 mt-0.5 flex items-center">
                            <UserCheck size={14} className="mr-1.5" /> Kapasitas: {item.kapasitas}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="mt-3 sm:mt-0 sm:text-right ml-14 sm:ml-0">
                      <span className="font-bold text-blue-600 text-base sm:text-lg bg-blue-50 px-3 py-1.5 rounded-lg inline-block">{item.harga} <span className="text-sm font-normal text-gray-500 bg-transparent">/ Hari</span></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Kategori 3: Paket Wisata */}
        <div className="group bg-white rounded-3xl shadow-sm hover:shadow-2xl border border-gray-100 overflow-hidden transition-all duration-500 animate-fade-in-up opacity-0-init delay-200">
          <div className="grid grid-cols-1 lg:grid-cols-5">
            <div className="lg:col-span-2 relative h-72 lg:h-auto overflow-hidden">
              <img 
                src="https://res.cloudinary.com/ddtgjvetf/image/upload/v1774539827/gili_wdawwj.jpg" 
                alt="Paket Wisata Lombok" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                onError={(e) => handleImageError(e, "https://images.unsplash.com/photo-1573790387438-4da905039392?auto=format&fit=crop&q=80")}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent flex items-end p-8">
                <h3 className="text-3xl font-bold text-white tracking-wide">Paket Wisata Harian</h3>
              </div>
            </div>
            <div className="lg:col-span-3 p-6 md:p-10">
              <div className="space-y-4">
                {paketWisata.map((item, idx) => (
                  <div key={idx} className="p-5 hover:bg-gray-50 rounded-2xl transition-colors border border-transparent hover:border-gray-100">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-start mb-3 gap-3">
                      <h4 className="font-bold text-lg text-gray-900">{item.nama}</h4>
                      <span className="font-bold text-blue-600 bg-blue-50 px-4 py-1.5 rounded-lg self-start whitespace-nowrap">{item.harga}</span>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed flex items-start">
                      <Route size={18} className="text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                      {item.rute}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

// --- HALAMAN KONTAK ---
function Kontak() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="text-center mb-16 animate-fade-in-up opacity-0-init">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">Hubungi Kami</h2>
        <div className="w-24 h-1.5 bg-blue-600 mx-auto rounded-full mb-8"></div>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">Tim kami selalu sedia 24/7 untuk membantu merencanakan perjalanan impian Anda.</p>
      </div>

      <div className="bg-white rounded-[2rem] shadow-2xl shadow-blue-900/5 border border-gray-100 overflow-hidden animate-fade-in-up opacity-0-init delay-100">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Info Section */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white p-10 md:p-14 relative overflow-hidden">
            {/* Dekorasi Background */}
            <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl"></div>
            
            <h3 className="text-3xl font-bold mb-10 relative z-10">Informasi Kontak</h3>
            <div className="space-y-8 relative z-10">
              <div className="flex items-start group">
                <div className="bg-white/10 p-4 rounded-2xl mr-5 group-hover:bg-white/20 transition-colors duration-300">
                  <Phone size={24} className="text-blue-100" />
                </div>
                <div>
                  <p className="text-blue-200 text-sm font-medium mb-1">WhatsApp / Telepon</p>
                  <p className="font-semibold text-xl tracking-wide">+62 89 876-543-210</p>
                </div>
              </div>
              <div className="flex items-start group">
                <div className="bg-white/10 p-4 rounded-2xl mr-5 group-hover:bg-white/20 transition-colors duration-300">
                  <Instagram size={24} className="text-blue-100" />
                </div>
                <div>
                  <p className="text-blue-200 text-sm font-medium mb-1">Instagram</p>
                  <p className="font-semibold text-lg tracking-wide">@permatalomboktransport</p>
                </div>
              </div>
              <div className="flex items-start group">
                <div className="bg-white/10 p-4 rounded-2xl mr-5 group-hover:bg-white/20 transition-colors duration-300">
                  <Mail size={24} className="text-blue-100" />
                </div>
                <div>
                  <p className="text-blue-200 text-sm font-medium mb-1">Email</p>
                  <p className="font-semibold text-lg">permatalomboktransport@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start group">
                <div className="bg-white/10 p-4 rounded-2xl mr-5 group-hover:bg-white/20 transition-colors duration-300">
                  <MapPin size={24} className="text-blue-100" />
                </div>
                <div>
                  <p className="text-blue-200 text-sm font-medium mb-1">Alamat Kantor</p>
                  <p className="font-semibold leading-relaxed">
                    Kekalik Jl. Swasembada No.133,<br/>
                    Karang Pule, Kec. Mataram,<br/>
                    Kota Mataram, NTB 83115.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Quick Action Section */}
          <div className="p-10 md:p-14 flex flex-col justify-center bg-gray-50">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Pesan Sekarang</h3>
            <p className="text-gray-600 mb-10 text-lg leading-relaxed">
              Pemesanan paling cepat dan mudah dilakukan melalui WhatsApp. Kami akan langsung merespon untuk mengonfirmasi jadwal Anda.
            </p>
            <a 
              href="https://wa.me/6289876543210" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full bg-[#25D366] hover:bg-[#1ebd59] text-white font-bold py-5 px-6 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-xl shadow-green-500/20 hover:shadow-green-500/40 hover:-translate-y-1 transform text-lg"
            >
              <Phone size={24} className="mr-3" /> Chat Via WhatsApp
            </a>
            <p className="text-sm text-center text-gray-500 mt-6 bg-gray-200/50 py-3 rounded-xl">
              *Tersedia layanan konsultasi gratis 24/7
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
