import React, { useState, useEffect, useRef } from 'react';
import { 
  Car, 
  Menu, 
  X, 
  MapPin, 
  Phone, 
  Instagram, 
  Mail, 
  ShieldCheck, 
  Map, 
  Headset, 
  MessageCircle,
  ArrowRight,
  CheckCircle2,
  CalendarDays,
  Star
} from 'lucide-react';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Preloader effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Sticky Header & Scroll Observer for Animations
  useEffect(() => {
    if (loading) return;

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    // Intersection Observer for scroll reveal
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const hiddenElements = document.querySelectorAll('.reveal');
    hiddenElements.forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, [loading]);

  // Smooth scroll handler
  const scrollToSection = (id) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Penyesuaian offset navbar mengambang
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 bg-[#0f172a] flex items-center justify-center overflow-hidden transition-opacity duration-500">
        <style>
          {`
            @keyframes pulse-ring {
              0% { transform: scale(0.8); opacity: 0.5; }
              100% { transform: scale(1.3); opacity: 0; }
            }
            .loader-ring::before {
              content: '';
              position: absolute;
              left: 0; top: 0;
              width: 100%; height: 100%;
              border-radius: 50%;
              box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7);
              animation: pulse-ring 1.5s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
            }
          `}
        </style>
        <div className="relative w-24 h-24 flex items-center justify-center loader-ring bg-blue-600/20 rounded-full backdrop-blur-sm">
          <Car size={40} className="text-blue-500 animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-slate-800 overflow-x-hidden selection:bg-blue-200 selection:text-blue-900">
      
      {/* Global CSS for Animations */}
      <style>
        {`
          .reveal {
            opacity: 0;
            transform: translateY(40px);
            transition: all 0.8s cubic-bezier(0.5, 0, 0, 1);
          }
          .reveal.is-visible {
            opacity: 1;
            transform: translateY(0);
          }
          .delay-100 { transition-delay: 100ms; }
          .delay-200 { transition-delay: 200ms; }
          .delay-300 { transition-delay: 300ms; }
          .delay-400 { transition-delay: 400ms; }
        `}
      </style>

      {/* HEADER - Floating Glassmorphism Navigation */}
      <header 
        className={`fixed w-full z-40 transition-all duration-500 ${
          scrolled ? 'top-4 px-4 md:px-8' : 'top-0 px-0'
        }`}
      >
        <div className={`mx-auto max-w-7xl transition-all duration-500 ${
          scrolled 
            ? 'bg-white/80 backdrop-blur-md shadow-lg shadow-blue-900/5 rounded-full px-6 py-3 border border-white/50' 
            : 'bg-transparent px-6 py-6'
        }`}>
          <div className="flex justify-between items-center">
            {/* Logo Kiri */}
            <div 
              className="cursor-pointer flex items-center gap-2 group"
              onClick={() => scrollToSection('beranda')}
            >
              <img 
                src="https://res.cloudinary.com/ddtgjvetf/image/upload/v1774539827/logo_ecwum7.png" 
                alt="Permata Lombok Transport Logo" 
                className={`transition-all duration-300 object-contain ${scrolled ? 'h-8' : 'h-12 drop-shadow-lg filter brightness-0 invert'}`}
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = 'https://via.placeholder.com/150x50?text=PERMATA+LOMBOK';
                }}
              />
            </div>

            {/* Desktop Menu Kanan */}
            <nav className="hidden md:flex items-center gap-8 font-medium">
              {['Beranda', 'Tentang', 'Layanan'].map((item) => (
                <button 
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())} 
                  className={`text-sm tracking-wide hover:text-blue-500 transition-colors relative group ${scrolled ? 'text-slate-600' : 'text-white'}`}
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full"></span>
                </button>
              ))}
              <button 
                onClick={() => scrollToSection('kontak')} 
                className="bg-blue-600 text-white px-6 py-2.5 rounded-full hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/30 transition-all active:scale-95 text-sm tracking-wide font-semibold"
              >
                Hubungi Kami
              </button>
            </nav>

            {/* Mobile Menu Toggle */}
            <button 
              className={`md:hidden focus:outline-none ${scrolled ? 'text-slate-800' : 'text-white'}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        <div className={`md:hidden absolute top-full left-4 right-4 mt-2 bg-white/95 backdrop-blur-xl shadow-2xl rounded-2xl border border-slate-100 overflow-hidden transition-all duration-300 origin-top ${isMobileMenuOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'}`}>
          <div className="flex flex-col p-4 space-y-2">
            {['Beranda', 'Tentang', 'Layanan', 'Kontak'].map((item) => (
              <button 
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())} 
                className="text-left px-4 py-3 text-slate-700 font-medium hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-colors"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section id="beranda" className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Zoom Effect */}
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 bg-cover bg-center animate-[kenburns_20s_ease-in-out_infinite_alternate]"
            style={{ 
              backgroundImage: `url('https://res.cloudinary.com/ddtgjvetf/image/upload/v1774539832/hero_uup9wl.jpg')`,
              transform: 'scale(1.1)' 
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/40 to-slate-900/90 mix-blend-multiply"></div>
        </div>
        
        <div className="container mx-auto px-6 md:px-12 relative z-20 text-white flex flex-col items-center text-center mt-20">
          <div className="reveal">
            <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-full text-xs font-semibold mb-8 tracking-widest uppercase shadow-2xl">
              <Star size={14} className="text-yellow-400" fill="currentColor"/> Premium Travel Experience
            </span>
          </div>
          
          <h1 className="reveal delay-100 text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-[1.1] tracking-tight">
            Eksplorasi <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              Tanpa Batas
            </span>
          </h1>
          
          <p className="reveal delay-200 text-lg md:text-2xl font-light text-slate-300 mb-12 max-w-2xl">
            Jelajahi pesona tersembunyi Pulau Lombok dengan armada premium, rute fleksibel, dan kearifan cerita lokal.
          </p>
          
          <div className="reveal delay-300 flex flex-col sm:flex-row gap-5 w-full sm:w-auto">
            <button 
              onClick={() => scrollToSection('layanan')} 
              className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-full font-bold transition-all hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] active:scale-95 flex items-center justify-center gap-3 group"
            >
              Lihat Layanan 
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <a 
              href="https://wa.me/6289876543210" 
              target="_blank" rel="noreferrer"
              className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white px-8 py-4 rounded-full font-bold transition-all active:scale-95 flex items-center justify-center gap-3"
            >
              <MessageCircle size={20} /> Konsultasi Gratis
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 opacity-70 animate-bounce">
          <span className="text-white text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-[1px] h-8 bg-white/50"></div>
        </div>
      </section>

      {/* SECTION: TENTANG KAMI */}
      <section id="tentang" className="py-24 relative z-30 bg-white">
        <div className="container mx-auto px-6 md:px-12 max-w-7xl">
          <div className="text-center max-w-2xl mx-auto mb-16 reveal">
            <h2 className="text-blue-600 font-bold tracking-wider uppercase text-sm mb-3">Mengapa Memilih Kami</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900">Lebih Dari Sekadar Perjalanan</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                icon: MessageCircle, color: 'text-blue-600', bg: 'bg-blue-50', 
                title: 'Local Storyteller', 
                desc: 'Supir warga lokal berwawasan budaya Sasak, ahli hidden gems, dan fotografer dadakan Anda.',
                delay: 'delay-100'
              },
              { 
                icon: ShieldCheck, color: 'text-emerald-600', bg: 'bg-emerald-50', 
                title: 'Garansi Prima', 
                desc: 'Armada selalu bersih, wangi, dan AC maksimal sebelum menjemput Anda. SOP ketat!',
                delay: 'delay-200'
              },
              { 
                icon: Map, color: 'text-orange-600', bg: 'bg-orange-50', 
                title: 'Rute Fleksibel', 
                desc: 'Ubah tujuan secara spontan. Kebebasan penuh menjelajahi Lombok sesuai mood Anda.',
                delay: 'delay-300'
              },
              { 
                icon: Headset, color: 'text-purple-600', bg: 'bg-purple-50', 
                title: 'Support 24/7', 
                desc: 'Tim kami selalu siaga memantau dan membantu jika ada perubahan jadwal atau darurat.',
                delay: 'delay-400'
              }
            ].map((feature, idx) => (
              <div key={idx} className={`reveal ${feature.delay} group p-8 rounded-3xl bg-slate-50 hover:bg-white border border-slate-100 hover:border-slate-200 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] transition-all duration-500`}>
                <div className={`w-14 h-14 ${feature.bg} ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:-translate-y-2 group-hover:shadow-lg transition-all duration-300`}>
                  <feature.icon size={28} strokeWidth={1.5} />
                </div>
                <h4 className="text-xl font-bold mb-3 text-slate-900">{feature.title}</h4>
                <p className="text-slate-500 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION: LAYANAN KAMI */}
      <section id="layanan" className="py-24 bg-slate-50">
        <div className="container mx-auto px-6 md:px-12 max-w-7xl">
          <div className="mb-16 md:flex md:justify-between md:items-end reveal">
            <div className="max-w-2xl">
              <h2 className="text-blue-600 font-bold tracking-wider uppercase text-sm mb-3">Layanan Kami</h2>
              <h3 className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight">Solusi Mobilitas & Wisata Anda</h3>
            </div>
            <p className="text-slate-500 mt-4 md:mt-0 max-w-sm text-sm">Pilih layanan yang paling sesuai dengan kebutuhan liburan atau kunjungan bisnis Anda di Lombok.</p>
          </div>

          <div className="space-y-12">
            
            {/* 1. Airport Transfer */}
            <div className="reveal group bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-slate-200/60 hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-500 flex flex-col lg:flex-row">
              <div className="lg:w-[45%] h-72 lg:h-auto relative overflow-hidden">
                <img 
                  src="https://res.cloudinary.com/ddtgjvetf/image/upload/v1774539825/bandara_r6nw3z.jpg" 
                  alt="Airport Transfer" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent flex items-end p-8">
                  <div className="text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="bg-blue-600 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase mb-3 inline-block">Antar Jemput</span>
                    <h3 className="text-3xl font-bold">Airport Transfer</h3>
                  </div>
                </div>
              </div>
              <div className="lg:w-[55%] p-8 lg:p-12">
                <p className="text-slate-500 mb-8 text-sm leading-relaxed">Layanan penjemputan dan pengantaran dari Bandara Internasional Lombok (ZAM) menuju berbagai destinasi utama dengan nyaman dan tepat waktu.</p>
                <div className="space-y-3">
                  {[
                    { route: 'Kuta Mandalika & Sekitar', price: '150K' },
                    { route: 'Kota Mataram', price: '200K' },
                    { route: 'Area Senggigi', price: '250K' },
                    { route: 'Pelabuhan Bangsal', price: '300K' },
                    { route: 'Senaru (Rinjani)', price: '450K' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-transparent hover:border-slate-200 hover:bg-white transition-colors group/item">
                      <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 group-hover/item:bg-blue-600 group-hover/item:text-white transition-colors">
                            <MapPin size={14} />
                         </div>
                         <span className="font-semibold text-slate-700">{item.route}</span>
                      </div>
                      <div className="font-bold text-slate-900 bg-white shadow-sm px-4 py-1.5 rounded-full text-sm group-hover/item:text-blue-600 transition-colors">Rp {item.price}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 2. Driver Rentcar */}
            <div className="reveal group bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-slate-200/60 hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-500 flex flex-col lg:flex-row-reverse">
              <div className="lg:w-[45%] h-72 lg:h-auto relative overflow-hidden bg-slate-100 flex items-center justify-center p-8">
                {/* Fallback image manipulation to fit better */}
                <img 
                  src="https://res.cloudinary.com/ddtgjvetf/image/upload/v1774539828/alpard_cbbmm9.png" 
                  alt="Driver Rentcar" 
                  className="w-full h-auto max-h-full object-contain group-hover:scale-110 drop-shadow-2xl transition-transform duration-700 ease-out"
                  onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'; e.target.className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"; }}
                />
                 <div className="absolute top-6 right-6">
                    <span className="bg-slate-900 text-white px-4 py-2 rounded-full text-xs font-bold tracking-wide uppercase shadow-lg backdrop-blur-md bg-opacity-80">Include BBM & Driver</span>
                </div>
              </div>
              <div className="lg:w-[55%] p-8 lg:p-12">
                <h3 className="text-3xl font-bold text-slate-900 mb-4">Sewa Mobil Premium</h3>
                <p className="text-slate-500 mb-8 text-sm leading-relaxed">Nikmati perjalanan eksklusif dengan pilihan armada terbaik kami. Harga tertera adalah tarif per hari (12 Jam).</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { name: 'Toyota Avanza', cap: '4 Kursi', price: '500K' },
                    { name: 'Innova Reborn', cap: '6 Kursi', price: '800K' },
                    { name: 'Hiace Commuter', cap: '14 Kursi', price: '1.2M' },
                    { name: 'Toyota Alphard', cap: 'VIP', price: '2.5M' },
                  ].map((car, idx) => (
                    <div key={idx} className="p-6 rounded-2xl border border-slate-200 bg-white hover:border-blue-500 hover:shadow-md transition-all relative overflow-hidden group/card cursor-pointer">
                      <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-slate-50 rounded-lg group-hover/card:bg-blue-50 transition-colors text-slate-400 group-hover/card:text-blue-500">
                          <Car size={20} />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-2 py-1 rounded-md">{car.cap}</span>
                      </div>
                      <h5 className="font-bold text-lg text-slate-800 mb-1">{car.name}</h5>
                      <div className="flex items-end gap-1">
                        <span className="text-2xl font-black text-blue-600">Rp {car.price}</span>
                        <span className="text-xs text-slate-400 mb-1">/hari</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 3. Paket Wisata */}
            <div className="reveal group bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-slate-200/60 hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-500 flex flex-col lg:flex-row">
              <div className="lg:w-[45%] h-72 lg:h-auto relative overflow-hidden">
                <img 
                  src="https://res.cloudinary.com/ddtgjvetf/image/upload/v1774539827/gili_wdawwj.jpg" 
                  alt="Paket Wisata Lombok" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'; }}
                />
                 <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent flex items-end p-8">
                  <div className="text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-3xl font-bold">Paket Wisata Harian</h3>
                    <p className="text-slate-300 text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">Jelajahi keindahan alam dan budaya Sasak.</p>
                  </div>
                </div>
              </div>
              <div className="lg:w-[55%] p-8 lg:p-12">
                <div className="space-y-4">
                  {[
                    { name: 'Sasak Mandalika Tour', price: '600K', route: 'Desa Sade – Pantai Kuta – Sirkuit Mandalika – Bukit Merese – Tanjung Aan' },
                    { name: 'Air Terjun Eksotis', price: '700K', route: 'Sendang Gile – Masjid Kuno Bayan – Sunset Pantai Senggigi' },
                    { name: 'Pantai Pasir Putih', price: '800K', route: 'Tanjung Luar - Pink Beach - Pulau Pasir - Gili Petelu' },
                    { name: 'Pesona Gili Trawangan', price: '900K', route: 'Bukit Malimbu – Pelabuhan Bangsal – Hutan Kera Pusuk' },
                  ].map((tour, idx) => (
                    <div key={idx} className="p-5 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-[0_10px_30px_-15px_rgba(0,0,0,0.1)] hover:border-blue-100 transition-all cursor-pointer group/tour">
                      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-2">
                        <h5 className="font-bold text-lg text-slate-800 group-hover/tour:text-blue-600 transition-colors flex items-center gap-2">
                           <CalendarDays size={18} className="text-slate-400" />
                           {tour.name}
                        </h5>
                        <div className="inline-flex items-center justify-center bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-bold text-sm">
                          Rp {tour.price}
                        </div>
                      </div>
                      <p className="text-slate-500 text-sm leading-relaxed pl-7">
                        {tour.route}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER & KONTAK */}
      <footer id="kontak" className="bg-[#0b1325] text-white pt-20 pb-8 relative overflow-hidden">
        {/* Dekoratif Background */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
          <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-[2rem] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between mb-20 shadow-2xl reveal">
             <div className="mb-6 md:mb-0">
               <h3 className="text-3xl font-bold text-white mb-2">Siap Mulai Perjalanan Anda?</h3>
               <p className="text-blue-100 text-lg">Konsultasikan kebutuhan transport & wisata Anda sekarang.</p>
             </div>
             <a href="https://wa.me/6289876543210" target="_blank" rel="noreferrer" className="bg-white text-blue-600 hover:bg-slate-50 px-8 py-4 rounded-full font-bold transition-all shadow-lg active:scale-95 flex items-center gap-3 whitespace-nowrap">
                <MessageCircle size={24} /> Chat WhatsApp Kami
             </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
            
            {/* Brand Info */}
            <div className="lg:col-span-5 space-y-6">
              <img 
                src="https://res.cloudinary.com/ddtgjvetf/image/upload/v1774539827/logo_ecwum7.png" 
                alt="Permata Lombok Transport Logo" 
                className="h-14 w-auto object-contain filter brightness-0 invert opacity-90"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
              <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
                Menghadirkan pengalaman mobilitas premium di Pulau Lombok. Armada terawat, supir berdedikasi, dan rute perjalanan fleksibel untuk kenyamanan maksimal Anda.
              </p>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-3">
              <h4 className="text-lg font-bold mb-6 text-white tracking-wide">Navigasi</h4>
              <ul className="space-y-3 text-slate-400">
                {['Beranda', 'Tentang', 'Layanan'].map(item => (
                   <li key={item}>
                     <button onClick={() => scrollToSection(item.toLowerCase())} className="hover:text-white transition-colors flex items-center gap-2 group">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                        {item}
                     </button>
                   </li>
                ))}
              </ul>
            </div>

            {/* Kontak Info */}
            <div className="lg:col-span-4">
              <h4 className="text-lg font-bold mb-6 text-white tracking-wide">Hubungi Kami</h4>
              <ul className="space-y-4 text-slate-400">
                <li>
                  <a href="https://wa.me/6289876543210" target="_blank" rel="noreferrer" className="flex items-start gap-3 hover:text-white transition group">
                    <Phone size={20} className="text-blue-500 mt-0.5" />
                    <span>+62 89 876-543-210 <br/><span className="text-xs text-slate-500">Fast Response WhatsApp</span></span>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center gap-3 hover:text-white transition group">
                    <Instagram size={20} className="text-pink-500" />
                    <span>@permatalomboktransport</span>
                  </a>
                </li>
                <li>
                  <div className="flex items-start gap-3 mt-4 pt-4 border-t border-slate-800">
                    <MapPin size={24} className="text-red-500 mt-1 flex-shrink-0" />
                    <p className="text-sm leading-relaxed text-slate-400">
                      Jl. Swasembada No.133, Karang Pule, Kec. Mataram, Kota Mataram, Nusa Tenggara Barat, 83115.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            
          </div>

          {/* Copyright */}
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
            <p>© 2026 Permata Lombok Transport. All Rights Reserved.</p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
              <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
