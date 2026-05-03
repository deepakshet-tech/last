import { useState, useEffect, useRef } from "react";

// ─── SCROLL REVEAL HOOK ───────────────────────────────────────────────────────
const useReveal = (threshold = 0.15) => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          obs.unobserve(el);
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
};

// ─── ANIMATED COUNTER ─────────────────────────────────────────────────────────
const AnimatedCounter = ({ target, suffix = "", prefix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          obs.unobserve(el);
          let start = 0;
          const duration = 1800;
          const step = (timestamp) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);
  return (
    <span ref={ref}>
      {prefix}
      {count.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
};

// ─── GLOBAL STYLES ────────────────────────────────────────────────────────────
const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=Montserrat:wght@300;400;500;600;700&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --brand: rgba(90,55,25,1);
      --brand1: rgba(90,55,25,0.7);
      --brand2: rgba(90,55,25,0.45);
      --brand3: rgba(90,55,25,0.25);
      --brand4: rgba(90,55,25,0.12);
      --brand5: rgba(90,55,25,0.04);
      --white: #fff;
      --off: #fafaf8;
      --sale-bg: rgba(90,55,25,0.08);
      --sale-text: rgba(90,55,25,1);
      --green: #2b872f;
      --red: #d24343;
      --grey-light: #f5f0eb;
    }

    html, body, #root {
      width: 100%;
      min-width: 100%;
      margin: 0;
      background: #fff;
    }
    html { min-height: 100%; }
    html, body {
      font-family: 'Montserrat', sans-serif;
      font-size: 14px;
      background: #fff;
      color: #111;
    }
    body {
      min-height: 100vh;
      overscroll-behavior: none;
      overflow-x: hidden;
    }
    #root { min-height: 100vh; }
    a { text-decoration: none; color: inherit; }
    button { font-family: 'Montserrat', sans-serif; cursor: pointer; }
    img { max-width: 100%; display: block; }

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(24px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes fadeLeft {
      from { opacity: 0; transform: translateX(-32px); }
      to   { opacity: 1; transform: translateX(0); }
    }
    @keyframes fadeRight {
      from { opacity: 0; transform: translateX(32px); }
      to   { opacity: 1; transform: translateX(0); }
    }
    @keyframes scaleIn {
      from { opacity: 0; transform: scale(0.88); }
      to   { opacity: 1; transform: scale(1); }
    }
    @keyframes slideInRight {
      from { transform: translateX(100%); }
      to   { transform: translateX(0); }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      33%  { transform: translateY(-14px) rotate(3deg); }
      66%  { transform: translateY(-7px) rotate(-2deg); }
    }
    @keyframes pulse {
      0%, 100% { transform: scale(1); opacity: 1; }
      50%  { transform: scale(1.06); opacity: 0.85; }
    }
    @keyframes shimmer {
      0%   { background-position: -200% center; }
      100% { background-position: 200% center; }
    }
    @keyframes gradientShift {
      0%   { background-position: 0% 50%; }
      50%  { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    @keyframes spin {
      from { transform: rotate(0deg); }
      to   { transform: rotate(360deg); }
    }
    @keyframes bounceIn {
      0%   { opacity: 0; transform: scale(0.3); }
      50%  { transform: scale(1.08); }
      70%  { transform: scale(0.96); }
      100% { opacity: 1; transform: scale(1); }
    }
    @keyframes ripple {
      0%   { transform: scale(0); opacity: 0.6; }
      100% { transform: scale(4); opacity: 0; }
    }
    @keyframes typewriter {
      from { width: 0; }
      to   { width: 100%; }
    }
    @keyframes countUp {
      from { opacity: 0; transform: translateY(10px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes starTwinkle {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.4; transform: scale(0.7); }
    }
    @keyframes particleDrift {
      0%   { transform: translateY(0) translateX(0) rotate(0deg); opacity: 0.7; }
      100% { transform: translateY(-120px) translateX(40px) rotate(360deg); opacity: 0; }
    }

    /* ── Intersection-triggered reveal classes ── */
    .reveal {
      opacity: 0;
      transform: translateY(28px);
      transition: opacity 0.65s ease, transform 0.65s ease;
    }
    .reveal.visible { opacity: 1; transform: translateY(0); }
    .reveal-left {
      opacity: 0;
      transform: translateX(-36px);
      transition: opacity 0.65s ease, transform 0.65s ease;
    }
    .reveal-left.visible { opacity: 1; transform: translateX(0); }
    .reveal-right {
      opacity: 0;
      transform: translateX(36px);
      transition: opacity 0.65s ease, transform 0.65s ease;
    }
    .reveal-right.visible { opacity: 1; transform: translateX(0); }
    .reveal-scale {
      opacity: 0;
      transform: scale(0.9);
      transition: opacity 0.6s ease, transform 0.6s ease;
    }
    .reveal-scale.visible { opacity: 1; transform: scale(1); }

    ::-webkit-scrollbar { width: 4px; height: 4px; }
    ::-webkit-scrollbar-track { background: var(--brand4); }
    ::-webkit-scrollbar-thumb { background: var(--brand2); border-radius: 3px; }

    /* ── Layout utility ── */
    .page-container {
      width: 100%;
      padding: 0 24px;
      box-sizing: border-box;
    }
    @media (max-width: 600px) {
      .page-container { padding: 0 12px; }
    }

    /* ── Navbar ── */
    .navbar-outer {
      width: 100%;
      background: #fff;
      border-bottom: 1px solid var(--brand4);
      position: sticky;
      top: 0;
      z-index: 100;
    }
    .navbar-inner {
      width: 100%;
      padding: 0 24px;
      height: 64px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-sizing: border-box;
    }
    .navbar-logo {
      flex: 0 0 auto;
      cursor: pointer;
      text-align: left;
    }
    .navbar-links {
      flex: 1 1 auto;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0;
    }
    .navbar-icons {
      flex: 0 0 auto;
      display: flex;
      align-items: center;
      gap: 2px;
    }
    .subnav-inner {
      width: 100%;
      padding: 0 24px;
      display: flex;
      align-items: center;
      gap: 0;
      box-sizing: border-box;
    }
    @media (max-width: 768px) {
      .navbar-links { display: none; }
      .navbar-inner { padding: 0 12px; }
      .subnav-inner { padding: 0 12px; }
      .page-container { padding: 0 12px; }
    }

    .nav-link {
      background: none; border: none; cursor: pointer;
      font-family: 'Montserrat', sans-serif; font-weight: 600; font-size: 11px;
      letter-spacing: 0.8px; text-transform: uppercase;
      padding: 8px 13px;
      border-bottom: 2px solid transparent;
      transition: color 0.2s, border-color 0.2s;
      color: rgba(90,55,25,0.5);
      white-space: nowrap;
    }
    .nav-link:hover, .nav-link.active {
      color: var(--brand);
      border-bottom-color: var(--brand);
    }
    .subnav-btn {
      background: none; border: none; cursor: pointer;
      font-family: 'Montserrat', sans-serif; font-weight: 600; font-size: 10.5px;
      color: rgba(0,0,0,0.65); padding: 10px 14px; white-space: nowrap;
      border-bottom: 2px solid transparent; transition: all 0.2s;
    }
    .subnav-btn:hover {
      color: var(--brand);
      border-bottom-color: var(--brand);
    }
    .subnav-btn.active {
      color: var(--brand);
      border-bottom-color: var(--brand);
    }
    /* ── Product grids ── */
    .product-grid-4 {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;
    }
    @media (max-width: 900px) {
      .product-grid-4 { grid-template-columns: repeat(2, 1fr); }
    }
    @media (max-width: 480px) {
      .product-grid-4 { grid-template-columns: repeat(2, 1fr); gap: 10px; }
    }
    /* ── Card button ── */
    .card-btn {
      width: 100%; padding: 10px 0; border: 1.5px solid var(--brand);
      background: #fff; color: var(--brand);
      font-family: 'Montserrat', sans-serif; font-weight: 700; font-size: 10px;
      letter-spacing: 1.5px; text-transform: uppercase; border-radius: 2px;
      cursor: pointer; transition: all 0.22s ease;
    }
    .card-btn:hover { background: var(--brand); color: #fff; }
    .card-btn.added { background: var(--brand); color: #fff; }
    .product-img { transition: transform 0.45s ease; }
    .product-card:hover .product-img { transform: scale(1.06); }
  `}</style>
);

// ─── DATA ─────────────────────────────────────────────────────────────────────
const PRODUCTS = {
  Rings: [
    {
      id: 1,
      name: "High Gold Plated Floral Ring",
      price: 549,
      mrp: 1498,
      img: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500&q=85",
      tag: "Extra 50% OFF",
    },
    {
      id: 2,
      name: "Diamond Studded Adjustable Ring",
      price: 599,
      mrp: 1111,
      img: "https://www.candere.com/media/jewellery/images/C001952__1.jpeg",
      tag: "Extra 50% OFF",
    },
    {
      id: 3,
      name: "Gold Plated Stone Ring",
      price: 449,
      mrp: 1199,
      img: "https://kinclimg3.bluestone.com/f_jpg,c_scale,w_828,q_80,b_rgb:f0f0f0/giproduct/BIDG0319R180_YAA18DIG6XXXXXXXX_ABCD00-PICS-00001-1024-66194.png",
      tag: "Extra 50% OFF",
    },
    {
      id: 4,
      name: "Micro Gold Twisted Band Ring",
      price: 399,
      mrp: 999,
      img: "https://kinclimg9.bluestone.com/f_jpg,c_scale,w_828,q_80,b_rgb:f0f0f0/giproduct/BICM0339R06_YAA18DIG6XXXXXXXX_ABCD00-PICS-00001-1024-68695.png",
      tag: "Extra 50% OFF",
    },
    {
      id: 21,
      name: "Classic Pearl Finger Ring",
      price: 329,
      mrp: 899,
      img: "https://cdn-media.glamira.com/media/product/newgeneration/view/1/sku/MEN3/diamond/diamond-Brillant_AAA/alloycolour/yellow.jpg",
      tag: "Extra 50% OFF",
    },
    {
      id: 22,
      name: "Antique Gold Cocktail Ring",
      price: 699,
      mrp: 1799,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQLxf4ZuVgSRs-OFhQyEFl9h9Cucrot883KQ&s.jpeg",
      tag: "Extra 50% OFF",
    },

    //----------------
    {
      id: 1,
      name: "High Gold Plated Floral Ring",
      price: 549,
      mrp: 1498,
      img: "https://kinclimg4.bluestone.com/f_jpg,c_scale,w_1024,q_80,b_rgb:f0f0f0/giproduct/BIRS0388R34_YAA18DIG6XXXXXXXX_ABCD00-BP-PICS-00001-1024-80796.png",
      tag: "Extra 50% OFF",
    },
    {
      id: 2,
      name: "Diamond Studded Adjustable Ring",
      price: 599,
      mrp: 1111,
      img: "https://www.rnarayanjewellers.com/cdn/shop/products/Circa-18kt-Gold-Diamond-Ring-1.jpg",
      tag: "Extra 50% OFF",
    },
    {
      id: 3,
      name: "Gold Plated Stone Ring",
      price: 449,
      mrp: 1199,
      img: "https://i.pinimg.com/236x/b8/91/e3/b891e3acdaaf8d98491e28131e865298.jpg",
      tag: "Extra 50% OFF",
    },
    {
      id: 4,
      name: "Micro Gold Twisted Band Ring",
      price: 399,
      mrp: 999,
      img: "https://sencowebfiles.s3.ap-south-1.amazonaws.com/products/HX1hhKJcWumidzI0VghMD15anv9w52Zj8uD3PMDi.jpeg",
      tag: "Extra 50% OFF",
    },
    {
      id: 21,
      name: "Classic Pearl Finger Ring",
      price: 329,
      mrp: 899,
      img: "https://m.media-amazon.com/images/I/718B2IPDNxL._AC_UY1100_.jpg",
      tag: "Extra 50% OFF",
    },
    {
      id: 22,
      name: "Antique Gold Cocktail Ring",
      price: 699,
      mrp: 1799,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzEZkYx0I54eAN8tUmU-8wpssi2B4JldBvSA&s.jpeg",
      tag: "Extra 50% OFF",
    },
    {
      id: 1,
      name: "High Gold Plated Floral Ring",
      price: 549,
      mrp: 1498,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3hTE2O-c_JCEmI3KnzigtDdiDWYwsJ2wlPA&s.png",
      tag: "Extra 50% OFF",
    },
    {
      id: 2,
      name: "Diamond Studded Adjustable Ring",
      price: 599,
      mrp: 1111,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTocz9FbiASYGzlt_hZbBbkOKrHNwObOyFStA&s.jpg",
      tag: "Extra 50% OFF",
    },
    {
      id: 3,
      name: "Gold Plated Stone Ring",
      price: 449,
      mrp: 1199,
      img: "https://5.imimg.com/data5/SELLER/Default/2024/12/474774342/ZF/FT/MR/29287787/aniva-r-5-1.jpg",
      tag: "Extra 50% OFF",
    },
    {
      id: 4,
      name: "Micro Gold Twisted Band Ring",
      price: 399,
      mrp: 999,
      img: "https://5.imimg.com/data5/SELLER/Default/2021/12/IH/JE/CR/70241119/dsc04070.JPG",
      tag: "Extra 50% OFF",
    },
    {
      id: 21,
      name: "Classic Pearl Finger Ring",
      price: 329,
      mrp: 899,
      img: "https://gandaramjewellers.com/wp-content/uploads/Traditinal-Gold-Ring-For-Women-205.jpg",
      tag: "Extra 50% OFF",
    },
    {
      id: 22,
      name: "Antique Gold Cocktail Ring",
      price: 699,
      mrp: 1799,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6b3RuVgCkozXsjQILymSAgTPkv2AaS6ztbA&s.jpg",
      tag: "Extra 50% OFF",
    },
    {
      id: 1,
      name: "High Gold Plated Floral Ring",
      price: 549,
      mrp: 1498,
      img: "https://sehgalgold.com/wp-content/uploads/2023/05/11r-1.jpg",
      tag: "Extra 50% OFF",
    },
    {
      id: 2,
      name: "Diamond Studded Adjustable Ring",
      price: 599,
      mrp: 1111,
      img: "https://images-static.nykaa.com/media/catalog/product/1/a/1a83fecNF-NISCKA-000976-076GPTWR_3.jpg",
      tag: "Extra 50% OFF",
    },

    //---------------
  ],
  Necklaces: [
    {
      id: 5,
      name: "High Gold Plated Long Bahubali Chain",
      price: 549,
      mrp: 1149,
      img: "https://m.media-amazon.com/images/I/71d3NFbWo0L._AC_UY1100_.jpg",
      tag: "Extra 50% OFF",
    },
    {
      id: 6,
      name: "Gold Plated Pearl Necklace Set",
      price: 699,
      mrp: 1998,
      img: "https://m.media-amazon.com/images/I/81s23uB2cLL._AC_UY1100_.jpg",
      tag: "Extra 50% OFF",
    },
    {
      id: 7,
      name: "Diamond Studded Long Chain",
      price: 649,
      mrp: 2500,
      img: "https://m.media-amazon.com/images/I/51NYDdz-rXL._AC_UY1100_.jpg",
      tag: "Extra 50% OFF",
    },
    {
      id: 8,
      name: "Micro Gold Fancy Chain",
      price: 599,
      mrp: 2100,
      img: "https://m.media-amazon.com/images/I/91LZMSJJ3UL._AC_UY1100_.jpg",
      tag: "Extra 50% OFF",
    },
    {
      id: 23,
      name: "Layered Kundan Necklace",
      price: 899,
      mrp: 2400,
      img: "https://m.media-amazon.com/images/I/51NYDdz-rXL._AC_UY1100_.jpg",
      tag: "Extra 50% OFF",
    },
    {
      id: 24,
      name: "Gold Beaded Choker Necklace",
      price: 479,
      mrp: 1199,
      img: "https://m.media-amazon.com/images/I/71gZFlFVmzL.jpg",
      tag: "Extra 50% OFF",
    },
    {
      id: 94,
      name: "High Gold Plated Long Bahubali Chain",
      price: 549,
      mrp: 1149,
      img: "https://m.media-amazon.com/images/I/71OOlA0jYEL._AC_UY1100_.jpg",
      tag: "Extra 50% OFF",
    },
    {
      id: 95,
      name: "Gold Plated Pearl Necklace Set",
      price: 699,
      mrp: 1998,
      img: "https://d25g9z9s77rn4i.cloudfront.net/uploads/product/194/1737539642_bdac2baf411a5259c0b3.jpg",
      tag: "Extra 50% OFF",
    },
    {
      id: 96,
      name: "Diamond Studded Long Chain",
      price: 649,
      mrp: 2500,
      img: "https://i.etsystatic.com/22562645/r/il/b5dd45/2575344729/il_570xN.2575344729_prll.jpg",
      tag: "Extra 50% OFF",
    },
    {
      id: 97,
      name: "Micro Gold Fancy Chain",
      price: 599,
      mrp: 2100,
      img: "https://assets.myntassets.com/assets/images/27346266/2024/2/2/5a501c84-387a-45a7-a8ee-6c8ef2d093a21706867572618JewellerySet1.jpg",
      tag: "Extra 50% OFF",
    },
    {
      id: 98,
      name: "Layered Kundan Necklace",
      price: 899,
      mrp: 2400,
      img: "https://akshayagold.in/wp-content/uploads/2023/01/021.png",
      tag: "Extra 50% OFF",
    },
    {
      id: 100,
      name: "Gold Beaded Choker Necklace",
      price: 479,
      mrp: 1199,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT42eKTnQcl80b5A7N7tMovjEzrkNTvoiOdig&s.jpg",
      tag: "Extra 50% OFF",
    },
    {
      id: 101,
      name: "Layered Kundan Necklace",
      price: 899,
      mrp: 2400,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmy99d_i-SJEAUEvPnsspIIlszFRe9um_Z6A&s.jpg",
      tag: "Extra 50% OFF",
    },
    {
      id: 102,
      name: "Gold Beaded Choker Necklace",
      price: 479,
      mrp: 1199,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRiN6o584wasw_3usTe-WDZPyz6HHdQGMpoA&s.jpg",
      tag: "Extra 50% OFF",
    },

    //-------
    {
      id: 101,
      name: "Layered Kundan Necklace",
      price: 899,
      mrp: 2400,
      img: "https://vilvajewels.com/cdn/shop/files/VIL08568.jpg",
      tag: "Extra 50% OFF",
    },
    {
      id: 102,
      name: "Gold Beaded Choker Necklace",
      price: 479,
      mrp: 1199,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBOAqXzgwMN-hMiWfou7pjEufX6VObbnwuUA&s.jpg",
      tag: "Extra 50% OFF",
    },
  ],
  Bracelets: [
    {
      id: 9,
      name: "Gold Plated Adjustable Bracelet",
      price: 599,
      mrp: 2198,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_gO1x3IH_FdFUEZkmkHWYkUC0iHTeXEAlrQ&s.jpg",
      tag: "Extra 50% OFF",
    },
    {
      id: 10,
      name: "Butterfly Charm Bracelet",
      price: 580,
      mrp: 2100,
      img: "https://5.imimg.com/data5/ECOM/Default/2024/3/402709403/KI/EA/DH/11885699/1-gram-gold-plated-diamond-casual-design-bracelet-ladies-style-a228-soni-fashion-621.jpg",
      tag: "Extra 50% OFF",
    },
    {
      id: 11,
      name: "High Gold Stone Bangle Bracelet",
      price: 549,
      mrp: 2100,
      img: "https://5.imimg.com/data5/ECOM/Default/2024/3/402708807/FV/NG/NA/11885699/1-gram-gold-plated-heart-shape-superior-quality-bracelet-ladies-style-a284-soni-fashion-246-500x500.jpg",
      tag: "Extra 50% OFF",
    },
    {
      id: 25,
      name: "Rose Gold Charm Bracelet",
      price: 449,
      mrp: 1499,
      img: "https://5.imimg.com/data5/ECOM/Default/2024/3/402708804/RM/MY/PK/11885699/1-gram-gold-plated-heart-shape-superior-quality-bracelet-ladies-style-a284-soni-fashion-770-500x500.jpg",
      tag: "Extra 50% OFF",
    },
    {
      id: 26,
      name: "Crystal Bangle Set of 4",
      price: 699,
      mrp: 1999,
      img: "https://5.imimg.com/data5/ECOM/Default/2023/11/362314659/XU/OA/QX/11885699/1-gram-gold-plated-heart-shape-diamond-designer-bracelet-lady-style-a210-ladies-soni-858.jpg",
      tag: "Extra 50% OFF",
    },
    //----------------
    {
      id: 9,
      name: "Gold Plated Adjustable Bracelet",
      price: 599,
      mrp: 2198,
      img: "https://caratsutra.in/cdn/shop/products/Screenshot_2022-03-05-21-03-38-56_1c337646f29875672b5a61192b9010f9.jpg",
      tag: "Extra 50% OFF",
    },
    {
      id: 10,
      name: "Butterfly Charm Bracelet",
      price: 580,
      mrp: 2100,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpIoLcyX3y2N0HZa5TucAvBz1X0FNNEiHA5w&s.jpg",
      tag: "Extra 50% OFF",
    },
    {
      id: 11,
      name: "High Gold Stone Bangle Bracelet",
      price: 549,
      mrp: 2100,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHDaY9QOaEpQ2Fsrko2JJN4YYnlp51KWKCVw&s.png",
      tag: "Extra 50% OFF",
    },
    {
      id: 25,
      name: "Rose Gold Charm Bracelet",
      price: 449,
      mrp: 1499,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlyDaX5qrjqQYmpdTxvBCtwSUSc7BYxe1rNA&s.jpg",
      tag: "Extra 50% OFF",
    },
    {
      id: 26,
      name: "Crystal Bangle Set of 4",
      price: 699,
      mrp: 1999,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYJaaBY9qOaoa4HQPW48PE7xpFGNC0ekWwnA&s.png",
      tag: "Extra 50% OFF",
    },
    {
      id: 9,
      name: "Gold Plated Adjustable Bracelet",
      price: 599,
      mrp: 2198,
      img: "https://www.fashioncrab.com/wp-content/uploads/2023/10/White-Heart-Anti-Tarnish-Bracelet-Rose-Gold-01.jpg",
      tag: "Extra 50% OFF",
    },
    {
      id: 10,
      name: "Butterfly Charm Bracelet",
      price: 580,
      mrp: 2100,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxxr1P98rlI-u4RdiHWm11qZ_NQHfKapacEA&s.jpg",
      tag: "Extra 50% OFF",
    },
    {
      id: 11,
      name: "High Gold Stone Bangle Bracelet",
      price: 549,
      mrp: 2100,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaytMvFl812cl1T8m90mlTo9eb7nou6gXQ2g&s.jpeg",
      tag: "Extra 50% OFF",
    },
    {
      id: 25,
      name: "Rose Gold Charm Bracelet",
      price: 449,
      mrp: 1499,
      img: "https://images.jdmagicbox.com/quickquotes/images_main/second-hand-men-gold-bracelets-jewellery-for-party-wear-2220151642-jqnrbq18.jpg",
      tag: "Extra 50% OFF",
    },
    {
      id: 26,
      name: "Crystal Bangle Set of 4",
      price: 699,
      mrp: 1999,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdE34rISzRSQCxCq6K8s_QecFOGriFRf7AIw&s.jpg",
      tag: "Extra 50% OFF",
    },
    {
      id: 26,
      name: "Crystal Bangle Set of 4",
      price: 699,
      mrp: 1999,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLXlbgm7p2OPa-5f5Ep1F7BOLf4O9Z115b3w&s.png",
      tag: "Extra 50% OFF",
    },
    //--------
    {
      id: 26,
      name: "Crystal Bangle Set of 4",
      price: 699,
      mrp: 1999,
      img: "https://carltonlondon.co.in/cdn/shop/files/fjb4523_3.jpg",
      tag: "Extra 50% OFF",
    },
    {
      id: 26,
      name: "Crystal Bangle Set of 4",
      price: 699,
      mrp: 1999,
      img: "https://img.tatacliq.com/images/i17//437Wx649H/MP000000022210770_437Wx649H_202405102112091.jpeg",
      tag: "Extra 50% OFF",
    },
    {
      id: 26,
      name: "Crystal Bangle Set of 4",
      price: 699,
      mrp: 1999,
      img: "https://images.meesho.com/images/products/645209276/rcfox_512.webp?width=512.png",
      tag: "Extra 50% OFF",
    },
    {
      id: 26,
      name: "Crystal Bangle Set of 4",
      price: 699,
      mrp: 1999,
      img: "https://s.alicdn.com/@sc04/kf/H66c60d35f5b54db3954bf627159d0ba9A.jpg",
      tag: "Extra 50% OFF",
    },
  ],
  Earrings: [
    {
      id: 12,
      name: "Gold Plated Crystal Drop Earrings",
      price: 449,
      mrp: 1499,
      img: "https://img.tatacliq.com/images/i19//437Wx649H/MP000000023531489_437Wx649H_202409040109041.jpeg",
      tag: "Extra 50% OFF",
    },
    {
      id: 13,
      name: "Diamond Studded Floral Studs",
      price: 399,
      mrp: 1199,
      img: "https://www.shreehari.co/media/catalog/product/cache/57db4a1e37f9bcfcae47c0bfd2b59438/w/e/wer215rbw_-_1a.png",
      tag: "Extra 50% OFF",
    },
    {
      id: 14,
      name: "High Gold Jhumka Earrings",
      price: 549,
      mrp: 2100,
      img: "https://www.ambery.in/live/img/business_product/4kLN8StW1A_20230509180345.jpg",
      tag: "Extra 50% OFF",
    },
    {
      id: 27,
      name: "Pearl Drop Dangle Earrings",
      price: 379,
      mrp: 999,
      img: "https://img.tatacliq.com/images/i4/450Wx545H/MP000000003837475_450Wx545H_20181025212335.jpeg",
      tag: "Extra 50% OFF",
    },
    {
      id: 28,
      name: "Gold Hoop Statement Earrings",
      price: 499,
      mrp: 1599,
      img: "https://m.media-amazon.com/images/I/71SJYa3LyfL._AC_UY1100_.jpg",
      tag: "Extra 50% OFF",
    },

    //---------
    {
      id: 103,
      name: "Gold Plated Crystal Drop Earrings",
      price: 449,
      mrp: 1499,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEeYFqaaCoGYE0puSCI8ttJCYKIN82qiLEgA&s.jpg",
      tag: "Extra 50% OFF",
    },
    {
      id: 104,
      name: "Diamond Studded Floral Studs",
      price: 399,
      mrp: 1199,
      img: "https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dw677f6639/images/hi-res/511069SOEAGA00_1.jpg",
      tag: "Extra 50% OFF",
    },
    {
      id: 105,
      name: "High Gold Jhumka Earrings",
      price: 549,
      mrp: 2100,
      img: "https://rukmini1.flixcart.com/image/1500/1500/xif0q/earring/4/o/l/na-vfj2428erg-10-vighnaharta-original-imahfprwszcptytf.jpeg",
      tag: "Extra 50% OFF",
    },
    {
      id: 106,
      name: "Pearl Drop Dangle Earrings",
      price: 379,
      mrp: 999,
      img: "https://assets.ajio.com/medias/sys_master/root/20240417/54O1/661ff95205ac7d77bb1478b3/-473Wx593H-467259283-gold-MODEL.jpg",
      tag: "Extra 50% OFF",
    },
    {
      id: 107,
      name: "Gold Hoop Statement Earrings",
      price: 499,
      mrp: 1599,
      img: "https://assets.ajio.com/medias/sys_master/root/20240524/dYDC/6650b22905ac7d77bb78a00b/-473Wx593H-6006973660-multi-MODEL.jpg",
      tag: "Extra 50% OFF",
    },
    {
      id: 108,
      name: "Diamond Studded Floral Studs",
      price: 399,
      mrp: 1199,
      img: "https://img.tatacliq.com/images/i17//437Wx649H/MP000000022210932_437Wx649H_202405102117565.jpeg",
      tag: "Extra 50% OFF",
    },
    {
      id: 109,
      name: "High Gold Jhumka Earrings",
      price: 549,
      mrp: 2100,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSryBH1vTNfQmuztyZzRAZ-0Z-T7qZO6tjFwQ&s.png",
      tag: "Extra 50% OFF",
    },
    {
      id: 110,
      name: "Pearl Drop Dangle Earrings",
      price: 379,
      mrp: 999,
      img: "https://i.pinimg.com/236x/1a/85/57/1a8557756f03a4c1be3af4dc960d3baa.jpg",
      tag: "Extra 50% OFF",
    },
    {
      id: 111,
      name: "Gold Hoop Statement Earrings",
      price: 499,
      mrp: 1599,
      img: "https://www.dazzlesjewellery.in/cdn/shop/files/IMG_2638_83ca4948-6d4a-4196-af06-990c4cb4c16f.jpg",
      tag: "Extra 50% OFF",
    },
    //-----
    {
      id: 110,
      name: "Pearl Drop Dangle Earrings",
      price: 379,
      mrp: 999,
      img: "https://purplesecret.in/cdn/shop/files/10_8.jpg",
      tag: "Extra 50% OFF",
    },
    {
      id: 111,
      name: "Gold Hoop Statement Earrings",
      price: 499,
      mrp: 1599,
      img: "https://www.chidambaramgoldcovering.com/image/cache/catalog/ChidambaramGoldCovering/earrings/er4052-new-two-gram-gold-stud-earring-shop-online-1a-850x1000.jpg",
      tag: "Extra 50% OFF",
    },
  ],
  Bangles: [
    {
      id: 30,
      name: "Gold Plated Kundan Bangle Set",
      price: 799,
      mrp: 2199,
      img: "https://img.tatacliq.com/images/i11/437Wx649H/MP000000017922672_437Wx649H_202306131409061.jpeg",
      tag: "Extra 50% OFF",
    },
    {
      id: 31,
      name: "Antique Finish Floral Bangle",
      price: 549,
      mrp: 1499,
      img: "https://img.tatacliq.com/images/i11/437Wx649H/MP000000017922666_437Wx649H_202306131409071.jpeg",
      tag: "Extra 50% OFF",
    },
    {
      id: 32,
      name: "High Gold Stone Bangle Set of 6",
      price: 699,
      mrp: 1999,
      img: "https://img.tatacliq.com/images/i11/1348Wx2000H/MP000000017922409_1348Wx2000H_202306131359101.jpeg",
      tag: "Extra 50% OFF",
    },
    {
      id: 33,
      name: "Micro Gold Twist Bangle Pair",
      price: 449,
      mrp: 1199,
      img: "https://img.tatacliq.com/images/i11/450Wx545H/MP000000017922399_450Wx545H_202306131359011.jpeg",
      tag: "Extra 50% OFF",
    },
    {
      id: 34,
      name: "Pearl Inlay Wide Bangle",
      price: 899,
      mrp: 2500,
      img: "https://img.tatacliq.com/images/i11/450Wx545H/MP000000017922664_450Wx545H_202306131409031.jpeg",
      tag: "Extra 50% OFF",
    },
    {
      id: 35,
      name: "Diamond Cut Gold Bangle",
      price: 599,
      mrp: 1799,
      img: "https://m.media-amazon.com/images/I/81JTJwH8SRL._AC_UY1100_.jpg",
      tag: "Extra 50% OFF",
    },
    //-----------------------------
    {
      id: 118,
      name: "Antique Finish Floral Bangle",
      price: 549,
      mrp: 1499,
      img: "https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dw550e0ab3/images/hi-res/510115VEA2A00.jpg",
      tag: "Extra 50% OFF",
    },
    {
      id: 119,
      name: "High Gold Stone Bangle Set of 6",
      price: 699,
      mrp: 1999,
      img: "https://svtmjewels.com/cdn/shop/files/SV-107-0182-_2.jpg",
      tag: "Extra 50% OFF",
    },
    {
      id: 120,
      name: "Micro Gold Twist Bangle Pair",
      price: 449,
      mrp: 1199,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQd2Lst1HElvRVJ-5ZIj7xXjikNZfG3vrQcQ&s.jpg",
      tag: "Extra 50% OFF",
    },
    {
      id: 121,
      name: "Pearl Inlay Wide Bangle",
      price: 899,
      mrp: 2500,
      img: "https://estele.co/cdn/shop/products/7B3A4507.jpg",
      tag: "Extra 50% OFF",
    },
    {
      id: 122,
      name: "Diamond Cut Gold Bangle",
      price: 599,
      mrp: 1799,
      img: "https://m.media-amazon.com/images/I/71upVNz0SJL._SY535_.jpg",
      tag: "Extra 50% OFF",
    },
    {
      id: 123,
      name: "Micro Gold Twist Bangle Pair",
      price: 449,
      mrp: 1199,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBKJDSsZjICw69kCMtIA4sR-9wTTj53BQ9MA&s.jpg",
      tag: "Extra 50% OFF",
    },
    {
      id: 124,
      name: "Pearl Inlay Wide Bangle",
      price: 899,
      mrp: 2500,
      img: "https://assets.myntassets.com/w_360,q_50,,dpr_2,fl_progressive,f_webp/assets/images/18341666/2022/5/19/1741061c-731c-4eb7-bad0-68d7fab373971652971129107ShiningDivaSetOf6StylishGoldPlatedBangles2.jpg",
      tag: "Extra 50% OFF",
    },
    {
      id: 125,
      name: "Diamond Cut Gold Bangle",
      price: 599,
      mrp: 1799,
      img: "https://assets.myntassets.com/w_360,q_50,,dpr_2,fl_progressive,f_webp/assets/images/2024/SEPTEMBER/24/03MAAKfQ_3d15372f229a4259ba8ae0386b0fabb9.jpg",
      tag: "Extra 50% OFF",
    },
    {
      id: 124,
      name: "Pearl Inlay Wide Bangle",
      price: 899,
      mrp: 2500,
      img: "https://d25g9z9s77rn4i.cloudfront.net/uploads/product/1178/1673964631_b7b27a1eac58ac0399d9.jpg",
      tag: "Extra 50% OFF",
    },
    {
      id: 125,
      name: "Diamond Cut Gold Bangle",
      price: 599,
      mrp: 1799,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9KEn1e6iNQ6Uw6krHG1cxTST3znMW54FOXw&s.jpg",
      tag: "Extra 50% OFF",
    },
  ],
  Chains: [
    {
      id: 40,
      name: "Rope Chain Gold Plated 24 inch",
      price: 599,
      mrp: 1599,
      img: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=500&q=85",
      tag: "Extra 50% OFF",
    },
    {
      id: 41,
      name: "Box Link Gold Chain 22 inch",
      price: 699,
      mrp: 1999,
      img: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=500&q=85",
      tag: "Extra 50% OFF",
    },
    {
      id: 42,
      name: "Figaro Chain High Gold 20 inch",
      price: 549,
      mrp: 1499,
      img: "https://img.tatacliq.com/images/i17//437Wx649H/MP000000022105679_437Wx649H_202405020512271.jpeg",
      tag: "Extra 50% OFF",
    },
    {
      id: 43,
      name: "Curb Chain Gold Plated Mens",
      price: 849,
      mrp: 2299,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTupnD-F6Zgh-IzWESZW6Znm9QmAbJj2eCcAg&s.jpg",
      tag: "Extra 50% OFF",
    },
    {
      id: 44,
      name: "Singapore Chain Micro Gold",
      price: 479,
      mrp: 1299,
      img: "https://img.tatacliq.com/images/i17//1348Wx2000H/MP000000022105647_1348Wx2000H_202405020511332.jpeg",
      tag: "Extra 50% OFF",
    },
    {
      id: 45,
      name: "Herringbone Flat Chain 18 inch",
      price: 649,
      mrp: 1799,
      img: "https://m.media-amazon.com/images/I/517SaNNNGTL._AC_UY1100_.jpg",
      tag: "Extra 50% OFF",
    },
    {
      id: 46,
      name: "Fully collymative chain",
      price: 643,
      mrp: 2465,
      img: "https://i.etsystatic.com/10176016/r/il/7b15b7/3490498076/il_570xN.3490498076_r2y5.jpg",
      tag: "Extra 30% OFF",
    },
    //------------------------
    {
      id: 126,
      name: "Rope Chain Gold Plated 24 inch",
      price: 599,
      mrp: 1599,
      img: "https://images-static.nykaa.com/media/catalog/product/5/b/5bbbf7dnykfbl0000643_1.jpg",
      tag: "Extra 50% OFF",
    },
    {
      id: 127,
      name: "Box Link Gold Chain 22 inch",
      price: 699,
      mrp: 1999,
      img: "https://salty.co.in/cdn/shop/files/NS14480-G_Model_20_281_29.jpg?v=1773355935&width=1080.jpg",
      tag: "Extra 50% OFF",
    },
    {
      id: 128,
      name: "Figaro Chain High Gold 20 inch",
      price: 549,
      mrp: 1499,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaxdJn9Efry2n5Diwtrb8G6YRoRzJnSfB4wA&s.jpg",
      tag: "Extra 50% OFF",
    },
    {
      id: 129,
      name: "Curb Chain Gold Plated Mens",
      price: 849,
      mrp: 2299,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyJmojoctKmDDBKRUpghK6_oNDx2DIdi0tsQ&s.jpg",
      tag: "Extra 50% OFF",
    },
    {
      id: 130,
      name: "Singapore Chain Micro Gold",
      price: 479,
      mrp: 1299,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT75JzLFqDX5WvmWFXO1CSrwHDiOh2eKaJESA&s.png",
      tag: "Extra 50% OFF",
    },
    {
      id: 131,
      name: "Herringbone Flat Chain 18 inch",
      price: 649,
      mrp: 1799,
      img: "https://i.pinimg.com/736x/a1/c2/f1/a1c2f1bf5dd3b4f926e3634a207dc6e2.jpg",
      tag: "Extra 50% OFF",
    },
    {
      id: 132,
      name: "Fully collymative chain",
      price: 643,
      mrp: 2465,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjKBIuMW6RaqhQm7zIHAxw1xArF1BSmkXRlA&s.jpg",
      tag: "Extra 30% OFF",
    },
    {
      id: 131,
      name: "Herringbone Flat Chain 18 inch",
      price: 649,
      mrp: 1799,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_Xx_QYH6heLRy2xGG3b-fZ1xrhcfzqoFweA&s.jpeg",
      tag: "Extra 50% OFF",
    },
    {
      id: 132,
      name: "Fully collymative chain",
      price: 643,
      mrp: 2465,
      img: "https://images.jdmagicbox.com/quickquotes/images_main/mens-gold-chain-18-inch-22-kt-2222773161-8esgejp9.jpg",
      tag: "Extra 30% OFF",
    },
  ],
  FestiveCombos: [
    {
      id: 50,
      name: "Diwali Glow Set – Necklace + Earrings",
      price: 999,
      mrp: 2799,
      img: "https://images.jdmagicbox.com/quickquotes/images_main/oxidized-silver-jewellery-set-2227016774-ucyujkdi.jpg",
      tag: "FESTIVE DEAL",
    },
    {
      id: 51,
      name: "Navratri Bridal Combo – Full Set",
      price: 1499,
      mrp: 4199,
      img: "https://rukmini1.flixcart.com/image/1500/1500/xif0q/jewellery-set/p/l/j/-original-imahfvf4prbha3d7.jpeg?q=70",
      tag: "FESTIVE DEAL",
    },
    {
      id: 52,
      name: "Wedding Season Combo – 5 Piece Set",
      price: 1799,
      mrp: 4999,
      img: "https://m.media-amazon.com/images/I/71j6wZtI4-L._AC_UY1100_.jpg",
      tag: "FESTIVE DEAL",
    },
    {
      id: 53,
      name: "Eid Special Gold Plated Combo",
      price: 1199,
      mrp: 3299,
      img: "https://m.media-amazon.com/images/I/91Yy2XC2lrL._AC_UY1100_.jpg",
      tag: "FESTIVE DEAL",
    },
    {
      id: 54,
      name: "Teej Bangles + Ring Combo",
      price: 799,
      mrp: 2199,
      img: "https://m.media-amazon.com/images/I/71V2wqakqmL._AC_UY1100_.jpg",
      tag: "FESTIVE DEAL",
    },
    {
      id: 55,
      name: "Puja Season Necklace Combo",
      price: 1099,
      mrp: 2999,
      img: "https://m.media-amazon.com/images/I/618MuGq3FCL._AC_UY1100_.jpg",
      tag: "FESTIVE DEAL",
    },
    //-------------------------
    {
      id: 134,
      name: "Diwali Glow Set – Necklace + Earrings",
      price: 999,
      mrp: 2799,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLN4a-FzRvjni3YgZLPTiFjSj8nvMHXxqV3A&s.jpg",
      tag: "FESTIVE DEAL",
    },
    {
      id: 135,
      name: "Navratri Bridal Combo – Full Set",
      price: 1499,
      mrp: 4199,
      img: "https://m.media-amazon.com/images/I/71+APuD2yZL._AC_UY1100_.jpg",
      tag: "FESTIVE DEAL",
    },
    {
      id: 136,
      name: "Wedding Season Combo – 5 Piece Set",
      price: 1799,
      mrp: 4999,
      img: "https://5.imimg.com/data5/ECOM/Default/2024/5/416908813/ZI/OU/UE/11885699/lns-634-2.jpg",
      tag: "FESTIVE DEAL",
    },
    {
      id: 137,
      name: "Eid Special Gold Plated Combo",
      price: 1199,
      mrp: 3299,
      img: "https://5.imimg.com/data5/ECOM/Default/2024/12/471804106/GP/CX/YO/11885699/eye-catchingdesigngoldplatednecklacesetforwomen-01d1abc5-1a36-4cb8-9496-7fd7216fa4a7-250x250.jpg",
      tag: "FESTIVE DEAL",
    },
    {
      id: 138,
      name: "Teej Bangles + Ring Combo",
      price: 799,
      mrp: 2199,
      img: "https://5.imimg.com/data5/ECOM/Default/2023/5/311306858/VI/EW/DY/11885699/lns-232-3-2ab0e220-494f-41b0-b47d-c21dea044dbe.jpg",
      tag: "FESTIVE DEAL",
    },
    {
      id: 139,
      name: "Puja Season Necklace Combo",
      price: 1099,
      mrp: 2999,
      img: "https://m.media-amazon.com/images/I/81vX-5o-ftL._AC_UY1100_.jpg",
      tag: "FESTIVE DEAL",
    },
    {
      id: 140,
      name: "Teej Bangles + Ring Combo",
      price: 799,
      mrp: 2199,
      img: "https://m.media-amazon.com/images/I/51bAMuMOA9L._AC_UY1100_.jpg",
      tag: "FESTIVE DEAL",
    },
    {
      id: 141,
      name: "Puja Season Necklace Combo",
      price: 1099,
      mrp: 2999,
      img: "https://images.meesho.com/images/products/607984003/i70n8_512.webp?width=512.jpg",
      tag: "FESTIVE DEAL",
    },
    {
      id: 140,
      name: "Teej Bangles + Ring Combo",
      price: 799,
      mrp: 2199,
      img: "https://toomthekari.com/wp-content/uploads/2025/09/Spiral-Viral-Golden-and-Silver-Bracelets.png",
      tag: "FESTIVE DEAL",
    },
    {
      id: 141,
      name: "Puja Season Necklace Combo",
      price: 1099,
      mrp: 2999,
      img: "https://images.meesho.com/images/products/659948205/dub04_512.jpg",
      tag: "FESTIVE DEAL",
    },
  ],
  Mangalsutra: [
    {
      id: 60,
      name: "Traditional Black Bead Mangalsutra",
      price: 699,
      mrp: 1999,
      img: "https://5.imimg.com/data5/ANDROID/Default/2022/4/PN/XO/NC/128315483/product-jpeg-500x500.jpg",
      tag: "Extra 50% OFF",
    },
    {
      id: 61,
      name: "Short Diamond Pendant Mangalsutra",
      price: 849,
      mrp: 2399,
      img: "https://rukminim3.flixcart.com/image/824/972/xif0q/mangalsutra-tanmaniya/k/j/d/jh8318-jewar-mandi-original-imahc7dhutcv9dgb.jpeg",
      tag: "Extra 50% OFF",
    },
    {
      id: 62,
      name: "Long Chain Tanmaniya Style",
      price: 999,
      mrp: 2799,
      img: "https://rukmini1.flixcart.com/image/1500/1500/xif0q/mangalsutra-tanmaniya/d/s/x/c5p265-dency-original-imahh29yjmfqxnhk.jpeg",
      tag: "Extra 50% OFF",
    },
    {
      id: 63,
      name: "Modern Solitaire Mangalsutra",
      price: 1199,
      mrp: 3299,
      img: "https://cdn3.imitationbazaar.com/p/1440x/1740486617113.jpeg",
      tag: "Extra 50% OFF",
    },
    {
      id: 64,
      name: "Layered Beaded Mangalsutra Set",
      price: 799,
      mrp: 2199,
      img: "https://m.media-amazon.com/images/I/81I2wEnmLZL._AC_UY1100_.jpg",
      tag: "Extra 50% OFF",
    },
    {
      id: 65,
      name: "Gold Plated Dual Tone Mangalsutra",
      price: 649,
      mrp: 1799,
      img: "https://www.gehnabox.com/cdn/shop/files/GMS766866_800x.jpg",
      tag: "Extra 50% OFF",
    },
    //-------
    {
      id: 142,
      name: "Traditional Black Bead Mangalsutra",
      price: 699,
      mrp: 1999,
      img: "https://rukminim2.flixcart.com/image/480/640/xif0q/shopsy-mangalsutra-tanmaniya/k/o/b/ms-gold-no-03-yes-rohit-fashion-original-imagwgp3absukszy.jpeg",
      tag: "Extra 50% OFF",
    },
    {
      id: 145,
      name: "Short Diamond Pendant Mangalsutra",
      price: 849,
      mrp: 2399,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScip8ejfH8NyOm3DKNvcDYN8mlpMi9MkH1NA&s.jpeg",
      tag: "Extra 50% OFF",
    },
    {
      id: 146,
      name: "Long Chain Tanmaniya Style",
      price: 999,
      mrp: 2799,
      img: "https://images.meesho.com/images/products/517279243/kdojx_512.jpg",
      tag: "Extra 50% OFF",
    },
    {
      id: 147,
      name: "Modern Solitaire Mangalsutra",
      price: 1199,
      mrp: 3299,
      img: "https://images.meesho.com/images/products/550305484/ojqfc_512.jpg",
      tag: "Extra 50% OFF",
    },
    {
      id: 148,
      name: "Layered Beaded Mangalsutra Set",
      price: 799,
      mrp: 2199,
      img: "https://images.meesho.com/images/products/468079998/6hil6_512.webp?width=512.jpg",
      tag: "Extra 50% OFF",
    },
    {
      id: 149,
      name: "Gold Plated Dual Tone Mangalsutra",
      price: 649,
      mrp: 1799,
      img: "https://assets.ajio.com/medias/sys_master/root/20250630/6rin/6862992fb13fc54edde2be79/brado_jewellery_gold-toned_women_gold-plated_mangalsutra_with_earrings.jpg",
      tag: "Extra 50% OFF",
    },
    {
      id: 150,
      name: "Layered Beaded Mangalsutra Set",
      price: 799,
      mrp: 2199,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTV-pfGQOltSqdzAPcgtNi72reij8gclyV8gA&s.jpeg",
      tag: "Extra 50% OFF",
    },
    {
      id: 151,
      name: "Gold Plated Dual Tone Mangalsutra",
      price: 649,
      mrp: 1799,
      img: "https://m.media-amazon.com/images/I/A1sil3BXLvL._AC_UY1100_.jpg",
      tag: "Extra 50% OFF",
    },
    {
      id: 150,
      name: "Layered Beaded Mangalsutra Set",
      price: 799,
      mrp: 2199,
      img: "https://d25g9z9s77rn4i.cloudfront.net/uploads/product/1447/1717161366_9bce614e38b7cd6fabc6.png",
      tag: "Extra 50% OFF",
    },
    {
      id: 151,
      name: "Gold Plated Dual Tone Mangalsutra",
      price: 649,
      mrp: 1799,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1OHJBTm0eeCZejKCVugNvvJFdsGGb0dWHRg&s.png",
      tag: "Extra 50% OFF",
    },
  ],
  Watches: [
    {
      id: 70,
      name: "Gold Bracelet Analogue Ladies Watch",
      price: 1299,
      mrp: 3499,
      img: "https://cpimg.tistatic.com/6758514/b/4/timesquartz-wrist-watch-for-men.jpg",
      tag: "Extra 50% OFF",
    },
    {
      id: 71,
      name: "Rose Gold Mesh Band Watch",
      price: 1499,
      mrp: 3999,
      img: "https://s.alicdn.com/@sc04/kf/H8bf002e58c364992b9533509a4c7c23dQ/Hot-Selling-Wristwatch-for-Men-Stainless-Steel-Watch-Male-Business-IP-Gold-Plating-Black-Cool-Design-38MM-With-Date.jpg_300x300.jpg",
      tag: "Extra 50% OFF",
    },
    {
      id: 72,
      name: "Diamond Studded Dress Watch",
      price: 1799,
      mrp: 4799,
      img: "https://cpimg.tistatic.com/6758516/b/4/timesquartz-wrist-watch-for-men.jpg",
      tag: "Extra 50% OFF",
    },
    {
      id: 73,
      name: "Classic Chain Link Watch Gold",
      price: 999,
      mrp: 2799,
      img: "https://m.media-amazon.com/images/I/61mxB7OKadL._AC_UY1000_.jpg",
      tag: "Extra 50% OFF",
    },
    {
      id: 74,
      name: "Floral Dial Bangle Watch",
      price: 1199,
      mrp: 3199,
      img: "https://m.media-amazon.com/images/I/511d6HCF5LL._AC_UY350_.jpg",
      tag: "Extra 50% OFF",
    },
    {
      id: 75,
      name: "Minimalist Gold Slim Watch",
      price: 1099,
      mrp: 2999,
      img: "https://m.media-amazon.com/images/S/aplus-media/sc/24377773-9556-469c-88fd-6c5ad4236495.__CR0,0,1600,1600_PT0_SX300_V1___.jpg",
      tag: "Extra 50% OFF",
    },
    {
      id: 76,
      name: "Gold Bracelet Analogue Ladies Watch",
      price: 4333,
      mrp: 6854,
      img: "https://m.media-amazon.com/images/I/61+MuxZJIbL._AC_UY1000_.jpg",
      tag: "Extra 50% OFF",
    },
    {
      id: 77,
      name: "Rose Gold Mesh Band Watch",
      price: 1499,
      mrp: 3999,
      img: "https://m.media-amazon.com/images/I/61-MzuhTENL._SX522_.jpg",
      tag: "Extra 50% OFF",
    },
    {
      id: 78,
      name: "Diamond Studded Dress Watch",
      price: 1799,
      mrp: 4799,
      img: "https://m.media-amazon.com/images/I/81q7uEjiE6L._AC_UY1000_.jpg",
      tag: "Extra 50% OFF",
    },
    {
      id: 79,
      name: "Classic Chain Link Watch Gold",
      price: 999,
      mrp: 2799,
      img: "https://images-static.nykaa.com/media/catalog/product/3/7/37114cc1216386_1.jpg",
      tag: "Extra 50% OFF",
    },
    {
      id: 80,
      name: "Floral Dial Bangle Watch",
      price: 1199,
      mrp: 3199,
      img: "https://m.media-amazon.com/images/I/611sfRog+8L._AC_UY1000_.jpg",
      tag: "Extra 50% OFF",
    },
    {
      id: 81,
      name: "Minimalist Gold Slim Watch",
      price: 1099,
      mrp: 2999,
      img: "https://m.media-amazon.com/images/I/71ePB5nbwDL._AC_UY1000_.jpg",
      tag: "Extra 50% OFF",
    },
    {
      id: 82,
      name: "Floral Dial Bangle Watch",
      price: 1199,
      mrp: 3199,
      img: "https://m.media-amazon.com/images/I/61bBnKPeRLL._AC_UY1000_.jpg",
      tag: "Extra 50% OFF",
    },
    {
      id: 83,
      name: "Minimalist Gold Slim Watch",
      price: 1099,
      mrp: 2999,
      img: "https://rukmini1.flixcart.com/image/1500/1500/jx0prbk0/watch/u/q/j/stylish-black-golden-steel-belt-stylish-watch-royal-time-original-imafhkgyc4rpdsv4.jpeg",
      tag: "Extra 50% OFF",
    },
    {
      id: 82,
      name: "Floral Dial Bangle Watch",
      price: 1199,
      mrp: 3199,
      img: "https://static.vecteezy.com/system/resources/thumbnails/048/783/886/small/gold-watch-on-transparent-background-genereted-ai-free-png.png",
      tag: "Extra 50% OFF",
    },
    {
      id: 83,
      name: "Minimalist Gold Slim Watch",
      price: 1099,
      mrp: 2999,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2T-2dxbUH5tbsjcv2s_krA7ow4nYBNK-k-A&s.jpeg",
      tag: "Extra 50% OFF",
    },
  ],
};

const BRIDAL = [
  {
    id: 1,
    name: "Duchess Bridal Set",
    price: "From ₹8,500",
    mrp: "₹17,000",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZqfkNyDhWzYVfleiGvqqK4j9Ftw05BGUT-g&s.jpg",
    subtitle: "For the timeless bride",
  },
  {
    id: 2,
    name: "Blossom Bridal Suite",
    price: "From ₹5,200",
    mrp: "₹10,400",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfChw6jVgGlHPfGXMNvWlXIy6_De1eWAUOgQ&s.jpg",
    subtitle: "Floral romance in gold",
  },
  {
    id: 3,
    name: "Midnight Bridal Collection",
    price: "From ₹11,000",
    mrp: "₹22,000",
    img: "https://4.imimg.com/data4/UI/RV/MY-6914093/bridal-bangles-500x500.jpg",
    subtitle: "Sapphire and diamond luxury",
  },
  {
    id: 4,
    name: "Heritage Bridal Set",
    price: "From ₹14,000",
    mrp: "₹28,000",
    img: "https://img.tatacliq.com/images/i20//437Wx649H/MP000000024280667_437Wx649H_202411010200301.jpeg",
    subtitle: "Generational heirloom quality",
  },
  {
    id: 5,
    name: "Rajwadi Bridal Suite",
    price: "From ₹9,500",
    mrp: "₹19,000",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNVScExm1ulxMtGEagIylz33nf90VSetX8wTm6K2L0VA&s.jpg",
    subtitle: "Royal Rajasthani opulence",
  },
  {
    id: 6,
    name: "Minimalist Bridal Edit",
    price: "From ₹4,800",
    mrp: "₹9,600",
    img: "https://i.shgcdn.com/4c0871d3-2f53-40d9-bbbd-1b831a59ac6d/-/format/auto/-/preview/3000x3000/-/quality/lighter/.png",
    subtitle: "Modern bride, timeless gold",
  },
  {
    id: 5,
    name: "Rajwadi Bridal Suite",
    price: "From ₹9,500",
    mrp: "₹19,000",
    img: "https://images.meesho.com/images/products/405237836/egr9r_512.webp?width=512.jpg",
    subtitle: "Royal Rajasthani opulence",
  },
  {
    id: 6,
    name: "Minimalist Bridal Edit",
    price: "From ₹4,800",
    mrp: "₹9,600",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZ703r6KaUUr63LKe66j01R97AcgaEJq-dXqUXgCHJuA&s.jpeg",
    subtitle: "Modern bride, timeless gold",
  },
];

const TESTIMONIALS = [
  {
    name: "Priya Mehta",
    city: "Mumbai",
    text: "Absolutely gorgeous quality! The necklace I ordered looks way more expensive than what I paid. Delivered in 3 days. 10/10!",
    stars: 5,
  },
  {
    name: "Sunita Rathod",
    city: "Rajkot",
    text: "Shets Jewellers is my go-to for every festival. The Navratri combo was stunning and received so many compliments!",
    stars: 5,
  },
  {
    name: "Anjali Sharma",
    city: "Ahmedabad",
    text: "Custom order for my wedding was handled so professionally. The earrings were exactly what I imagined. Highly recommended.",
    stars: 5,
  },
  {
    name: "Kavita Patel",
    city: "Surat",
    text: "Cash on delivery option is very convenient. The gold plated ring is beautiful and hasn't tarnished even after 3 months.",
    stars: 5,
  },
  {
    name: "Deepa Joshi",
    city: "Vadodara",
    text: "Best bridal jewellery at this price point in India. The Duchess set turned heads at my reception. Worth every rupee!",
    stars: 5,
  },
  {
    name: "Reena Bhanushali",
    city: "Jamnagar",
    text: "Fast delivery, great packaging, and the product quality is excellent. The jhumkas are my favourite pair now!",
    stars: 5,
  },
];

const getDiscount = (price, mrp) => Math.round(((mrp - price) / mrp) * 100);

// Sub-nav category to PRODUCTS key mapping
const SUBNAV_MAP = {
  BANGLES: "Bangles",
  RINGS: "Rings",
  CHAIN: "Chains",
  "FESTIVE COMBOS": "FestiveCombos",
  MANGALSUTRA: "Mangalsutra",
  WATCHES: "Watches",
  NECKLACE: "Necklaces",
  EARRINGS: "Earrings",
  BRACELETS: "Bracelets",
};

// ─── SEARCH MODAL ─────────────────────────────────────────────────────────────
const SEARCH_SUGGESTIONS = {
  ring: ["Gold Ring", "Diamond Ring", "Adjustable Ring", "Floral Ring"],
  necklace: [
    "Necklace Set",
    "Pearl Necklace",
    "Long Chain Necklace",
    "Bahubali Chain",
  ],
  earring: [
    "Jhumka Earrings",
    "Stud Earrings",
    "Drop Earrings",
    "Hoop Earrings",
  ],
  bangle: [
    "Gold Bangle Set",
    "Stone Bangle",
    "Kundan Bangle",
    "Twisted Bangle",
  ],
  bracelet: [
    "Charm Bracelet",
    "Gold Bracelet",
    "Butterfly Bracelet",
    "Bangle Bracelet",
  ],
  chain: ["Gold Chain", "Rope Chain", "Box Chain", "Figaro Chain"],
  mangalsutra: [
    "Black Bead Mangalsutra",
    "Diamond Mangalsutra",
    "Long Chain Mangalsutra",
  ],
  watch: ["Gold Watch", "Rose Gold Watch", "Diamond Watch", "Bangle Watch"],
  bridal: ["Bridal Set", "Bridal Necklace", "Bridal Earrings", "Bridal Combo"],
  gold: ["Gold Ring", "Gold Chain", "Gold Bangle", "Gold Necklace"],
};

const TRENDING = [
  "Jhumka Earrings",
  "Mangalsutra",
  "Bridal Set",
  "Gold Bangle",
  "Pearl Necklace",
  "Diamond Ring",
];
const CATEGORIES_QUICK = [
  { label: "Rings", emoji: "💍" },
  { label: "Necklaces", emoji: "📿" },
  { label: "Earrings", emoji: "✨" },
  { label: "Bangles", emoji: "🌸" },
  { label: "Watches", emoji: "⌚" },
  { label: "Bridal", emoji: "👰" },
];

const SearchModal = ({ onClose, onViewProduct }) => {
  const [query, setQuery] = useState("");
  const [recent, setRecent] = useState(["Gold Ring", "Jhumka"]);
  const allProducts = Object.values(PRODUCTS).flat();

  // Smart filtering: match name words
  const results =
    query.length > 1
      ? allProducts
          .filter((p) => p.name.toLowerCase().includes(query.toLowerCase()))
          .slice(0, 8)
      : [];

  // Autocomplete suggestions based on keyword
  const suggestions =
    query.length > 0
      ? Object.entries(SEARCH_SUGGESTIONS)
          .filter(
            ([key]) =>
              key.startsWith(query.toLowerCase()) ||
              query.toLowerCase().includes(key)
          )
          .flatMap(([, vals]) => vals)
          .filter((s) => s.toLowerCase().includes(query.toLowerCase()))
          .slice(0, 5)
      : [];

  useEffect(() => {
    const fn = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, []);

  const handleSearch = (term) => {
    setQuery(term);
    setRecent((prev) => [term, ...prev.filter((r) => r !== term)].slice(0, 5));
  };

  const handleSelect = (product) => {
    setRecent((prev) =>
      [product.name, ...prev.filter((r) => r !== product.name)].slice(0, 5)
    );
    onViewProduct(product);
    onClose();
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: 70,
      }}
    >
      <div
        onClick={onClose}
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.5)",
          backdropFilter: "blur(4px)",
        }}
      />
      <div
        style={{
          position: "relative",
          width: "94%",
          maxWidth: 600,
          background: "#fff",
          borderRadius: 12,
          overflow: "hidden",
          boxShadow: "0 32px 80px rgba(0,0,0,0.25)",
          animation: "fadeUp 0.22s ease",
        }}
      >
        {/* ── Search Input Bar ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "14px 18px",
            borderBottom: "1px solid var(--brand4)",
            gap: 10,
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            style={{ color: "var(--brand)", flexShrink: 0 }}
          >
            <path
              d="M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM20 20l-3-3"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && results[0]) handleSelect(results[0]);
            }}
            placeholder="Search rings, necklaces, bangles, bridal sets..."
            style={{
              flex: 1,
              border: "none",
              outline: "none",
              fontSize: 14,
              fontFamily: "Montserrat",
              color: "#111",
              background: "transparent",
            }}
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "var(--brand2)",
                fontSize: 18,
                lineHeight: 1,
                padding: "0 4px",
              }}
            >
              ×
            </button>
          )}
          <button
            onClick={onClose}
            style={{
              background: "var(--brand5)",
              border: "1px solid var(--brand4)",
              borderRadius: 4,
              padding: "5px 10px",
              cursor: "pointer",
              fontSize: 11,
              fontWeight: 600,
              color: "var(--brand)",
              fontFamily: "Montserrat",
            }}
          >
            ESC
          </button>
        </div>

        <div style={{ maxHeight: 480, overflowY: "auto" }}>
          {/* ── Autocomplete suggestions (while typing, before results) ── */}
          {query.length > 0 &&
            suggestions.length > 0 &&
            results.length === 0 && (
              <div style={{ padding: "12px 18px 4px" }}>
                <p
                  style={{
                    fontSize: 9.5,
                    fontWeight: 700,
                    color: "var(--brand2)",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    marginBottom: 8,
                  }}
                >
                  Suggestions
                </p>
                {suggestions.map((s) => (
                  <div
                    key={s}
                    onClick={() => handleSearch(s)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "9px 10px",
                      borderRadius: 6,
                      cursor: "pointer",
                      transition: "background 0.12s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "var(--brand5)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "transparent")
                    }
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      style={{ color: "var(--brand2)", flexShrink: 0 }}
                    >
                      <path
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                    <span style={{ fontSize: 13, color: "#333" }}>{s}</span>
                  </div>
                ))}
              </div>
            )}

          {/* ── Search Results ── */}
          {results.length > 0 && (
            <div>
              <p
                style={{
                  fontSize: 9.5,
                  fontWeight: 700,
                  color: "var(--brand2)",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  padding: "14px 18px 6px",
                }}
              >
                {results.length} Result{results.length !== 1 ? "s" : ""} for "
                {query}"
              </p>
              {results.map((p) => (
                <div
                  key={p.id}
                  onClick={() => handleSelect(p)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    padding: "10px 18px",
                    cursor: "pointer",
                    borderBottom: "1px solid var(--brand4)",
                    transition: "background 0.12s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "var(--brand5)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "#fff")
                  }
                >
                  <img
                    src={p.img}
                    alt={p.name}
                    style={{
                      width: 48,
                      height: 48,
                      objectFit: "cover",
                      borderRadius: 6,
                      flexShrink: 0,
                      border: "1px solid var(--brand4)",
                    }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        color: "#111",
                        marginBottom: 3,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {p.name}
                    </p>
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 8 }}
                    >
                      <span
                        style={{
                          fontSize: 13,
                          fontWeight: 700,
                          color: "var(--brand)",
                        }}
                      >
                        ₹{p.price}
                      </span>
                      <span
                        style={{
                          fontSize: 11,
                          color: "rgba(0,0,0,0.3)",
                          textDecoration: "line-through",
                        }}
                      >
                        ₹{p.mrp}
                      </span>
                      <span
                        style={{
                          fontSize: 9,
                          fontWeight: 700,
                          color: "var(--sale-text)",
                          background: "var(--sale-bg)",
                          padding: "1px 5px",
                          borderRadius: 2,
                        }}
                      >
                        {p.tag}
                      </span>
                    </div>
                  </div>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    style={{ color: "var(--brand2)", flexShrink: 0 }}
                  >
                    <path
                      d="M9 18l6-6-6-6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              ))}
            </div>
          )}

          {/* ── No results ── */}
          {query.length > 1 &&
            results.length === 0 &&
            suggestions.length === 0 && (
              <div style={{ textAlign: "center", padding: "32px 20px" }}>
                <div style={{ fontSize: 36, marginBottom: 10 }}>🔍</div>
                <p
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: "var(--brand)",
                    marginBottom: 6,
                  }}
                >
                  No results for "{query}"
                </p>
                <p style={{ fontSize: 12, color: "var(--brand2)" }}>
                  Try "ring", "necklace", "bangle" or browse categories below
                </p>
              </div>
            )}

          {/* ── Default state: no query ── */}
          {query.length === 0 && (
            <div style={{ padding: "16px 18px 20px" }}>
              {/* Recent */}
              {recent.length > 0 && (
                <div style={{ marginBottom: 20 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 10,
                    }}
                  >
                    <p
                      style={{
                        fontSize: 9.5,
                        fontWeight: 700,
                        color: "var(--brand2)",
                        letterSpacing: "2px",
                        textTransform: "uppercase",
                      }}
                    >
                      Recent Searches
                    </p>
                    <span
                      onClick={() => setRecent([])}
                      style={{
                        fontSize: 10,
                        color: "var(--brand)",
                        cursor: "pointer",
                        fontWeight: 600,
                      }}
                    >
                      Clear
                    </span>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {recent.map((r) => (
                      <span
                        key={r}
                        onClick={() => handleSearch(r)}
                        style={{
                          padding: "6px 13px",
                          border: "1px solid var(--brand4)",
                          borderRadius: 20,
                          fontSize: 11,
                          cursor: "pointer",
                          color: "#444",
                          background: "#fafaf8",
                          display: "flex",
                          alignItems: "center",
                          gap: 5,
                          transition: "all 0.15s",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.background = "var(--brand5)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.background = "#fafaf8")
                        }
                      >
                        <svg
                          width="11"
                          height="11"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>
                        {r}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Trending */}
              <div style={{ marginBottom: 20 }}>
                <p
                  style={{
                    fontSize: 9.5,
                    fontWeight: 700,
                    color: "var(--brand2)",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    marginBottom: 10,
                  }}
                >
                  🔥 Trending Now
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {TRENDING.map((tag) => (
                    <span
                      key={tag}
                      onClick={() => handleSearch(tag)}
                      style={{
                        padding: "6px 14px",
                        border: "1px solid var(--brand3)",
                        borderRadius: 20,
                        fontSize: 11,
                        cursor: "pointer",
                        color: "var(--brand)",
                        background: "var(--brand5)",
                        fontWeight: 500,
                        transition: "all 0.15s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "var(--brand)";
                        e.currentTarget.style.color = "#fff";
                        e.currentTarget.style.borderColor = "var(--brand)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "var(--brand5)";
                        e.currentTarget.style.color = "var(--brand)";
                        e.currentTarget.style.borderColor = "var(--brand3)";
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div>
                <p
                  style={{
                    fontSize: 9.5,
                    fontWeight: 700,
                    color: "var(--brand2)",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    marginBottom: 10,
                  }}
                >
                  Browse Categories
                </p>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: 8,
                  }}
                >
                  {CATEGORIES_QUICK.map((cat) => (
                    <div
                      key={cat.label}
                      onClick={() => handleSearch(cat.label)}
                      style={{
                        padding: "10px 8px",
                        border: "1px solid var(--brand4)",
                        borderRadius: 8,
                        textAlign: "center",
                        cursor: "pointer",
                        transition: "all 0.15s",
                        background: "#fafaf8",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "var(--brand5)";
                        e.currentTarget.style.borderColor = "var(--brand3)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "#fafaf8";
                        e.currentTarget.style.borderColor = "var(--brand4)";
                      }}
                    >
                      <div style={{ fontSize: 20, marginBottom: 4 }}>
                        {cat.emoji}
                      </div>
                      <p
                        style={{
                          fontSize: 11,
                          fontWeight: 600,
                          color: "var(--brand)",
                        }}
                      >
                        {cat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── CART DRAWER ──────────────────────────────────────────────────────────────
const CartDrawer = ({
  items,
  onClose,
  onRemove,
  onClear,
  onPlaceOrder,
  user,
  onOpenAuth,
}) => {
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const total = items.reduce(
    (sum, item) => sum + (typeof item.price === "number" ? item.price : 0),
    0
  );

  useEffect(() => {
    const fn = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, []);

  const handleCheckout = () => {
    const orderId = "SJ" + Math.floor(100000 + Math.random() * 900000);
    const deliveryDate = new Date(
      Date.now() + 4 * 24 * 60 * 60 * 1000
    ).toLocaleDateString("en-IN", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
    const date = new Date().toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    const details = {
      orderId,
      deliveryDate,
      date,
      total,
      count: items.length,
      name: user.name,
      items: [...items],
    };
    setOrderDetails(details);
    setOrderPlaced(true);
    onPlaceOrder(details);
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 998,
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      <div
        onClick={onClose}
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.4)",
          backdropFilter: "blur(2px)",
        }}
      />
      <div
        style={{
          position: "relative",
          width: 390,
          maxWidth: "96vw",
          background: "#fff",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          boxShadow: "-8px 0 40px rgba(0,0,0,0.15)",
          animation: "slideInRight 0.28s ease",
        }}
      >
        {/* ── ORDER CONFIRMED screen ── */}
        {orderPlaced ? (
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "32px 28px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: "50%",
                background: "#e8f5e9",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 20,
                fontSize: 36,
              }}
            >
              ✅
            </div>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 700,
                fontSize: 26,
                color: "var(--brand)",
                marginBottom: 8,
              }}
            >
              Order Confirmed!
            </h2>
            <p
              style={{
                fontSize: 13,
                color: "#333",
                marginBottom: 20,
                lineHeight: 1.7,
              }}
            >
              Thank you, <strong>{orderDetails?.name}</strong>! Your order has
              been placed successfully.
            </p>
            <div
              style={{
                width: "100%",
                background: "var(--brand5)",
                border: "1px solid var(--brand4)",
                borderRadius: 8,
                padding: "16px 18px",
                marginBottom: 20,
                textAlign: "left",
              }}
            >
              {[
                { label: "Order ID", value: orderDetails?.orderId },
                {
                  label: "Items Ordered",
                  value: `${orderDetails?.count} item${
                    orderDetails?.count !== 1 ? "s" : ""
                  }`,
                },
                { label: "Amount Paid", value: `₹${orderDetails?.total}` },
                {
                  label: "Estimated Delivery",
                  value: orderDetails?.deliveryDate,
                },
                { label: "Delivery To", value: user?.email },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "7px 0",
                    borderBottom: "1px solid var(--brand4)",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      fontSize: 10,
                      color: "var(--brand2)",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    {label}
                  </span>
                  <span
                    style={{ fontSize: 12, fontWeight: 600, color: "#111" }}
                  >
                    {value}
                  </span>
                </div>
              ))}
            </div>
            <div
              style={{
                background: "#e8f5e9",
                border: "1px solid #c8e6c9",
                borderRadius: 6,
                padding: "12px 16px",
                width: "100%",
                marginBottom: 20,
                fontSize: 12,
                color: "#2e7d32",
                lineHeight: 1.6,
              }}
            >
              📱 A confirmation has been sent to <strong>{user?.email}</strong>.
              Track your order via WhatsApp: <strong>+91 76006 59791</strong>
            </div>
            <button
              onClick={onClose}
              style={{
                width: "100%",
                padding: "13px",
                background: "var(--brand)",
                color: "#fff",
                border: "none",
                fontFamily: "Montserrat",
                fontWeight: 700,
                fontSize: 11,
                letterSpacing: "2px",
                textTransform: "uppercase",
                borderRadius: 3,
                cursor: "pointer",
              }}
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            {/* Header */}
            <div
              style={{
                padding: "18px 20px 14px",
                borderBottom: "1px solid var(--brand4)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <h2
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 700,
                    fontSize: 22,
                    color: "var(--brand)",
                  }}
                >
                  Your Bag
                </h2>
                <p
                  style={{ fontSize: 11, color: "var(--brand2)", marginTop: 2 }}
                >
                  {items.length} item{items.length !== 1 ? "s" : ""}
                </p>
              </div>
              <button
                onClick={onClose}
                style={{
                  background: "none",
                  border: "1px solid var(--brand4)",
                  borderRadius: "50%",
                  width: 32,
                  height: 32,
                  cursor: "pointer",
                  fontSize: 18,
                  color: "var(--brand1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                ×
              </button>
            </div>

            {/* Items list */}
            <div style={{ flex: 1, overflowY: "auto", padding: "10px 20px" }}>
              {items.length === 0 ? (
                <div style={{ textAlign: "center", paddingTop: 64 }}>
                  <div style={{ fontSize: 52, marginBottom: 14 }}>🛍️</div>
                  <p
                    style={{
                      fontSize: 15,
                      fontWeight: 600,
                      color: "var(--brand)",
                      marginBottom: 6,
                    }}
                  >
                    Your bag is empty
                  </p>
                  <p style={{ fontSize: 12, color: "var(--brand2)" }}>
                    Add some beautiful jewellery!
                  </p>
                </div>
              ) : (
                items.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      gap: 12,
                      padding: "12px 0",
                      borderBottom: "1px solid var(--brand4)",
                    }}
                  >
                    <img
                      src={item.img}
                      alt={item.name}
                      style={{
                        width: 58,
                        height: 58,
                        objectFit: "cover",
                        borderRadius: 6,
                        flexShrink: 0,
                        border: "1px solid var(--brand4)",
                      }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p
                        style={{
                          fontSize: 12,
                          fontWeight: 600,
                          color: "#111",
                          marginBottom: 3,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {item.name}
                      </p>
                      <p
                        style={{
                          fontSize: 13,
                          fontWeight: 700,
                          color: "var(--brand)",
                        }}
                      >
                        ₹{item.price}
                      </p>
                      {item.tag && (
                        <span
                          style={{
                            fontSize: 9,
                            fontWeight: 700,
                            color: "var(--sale-text)",
                            background: "var(--sale-bg)",
                            padding: "1px 5px",
                            borderRadius: 2,
                            marginTop: 3,
                            display: "inline-block",
                          }}
                        >
                          {item.tag}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => onRemove(idx)}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "var(--brand2)",
                        fontSize: 18,
                        padding: "0 4px",
                        flexShrink: 0,
                        alignSelf: "flex-start",
                        transition: "color 0.15s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "var(--red)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "var(--brand2)")
                      }
                    >
                      ×
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div
                style={{
                  padding: "16px 20px",
                  borderTop: "1px solid var(--brand4)",
                  background: "#fafaf8",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 4,
                  }}
                >
                  <span style={{ fontSize: 12, color: "var(--brand1)" }}>
                    Subtotal ({items.length} items)
                  </span>
                  <span
                    style={{ fontSize: 15, fontWeight: 700, color: "#111" }}
                  >
                    ₹{total}
                  </span>
                </div>
                <p
                  style={{
                    fontSize: 10,
                    color: "var(--green)",
                    marginBottom: 14,
                    fontWeight: 600,
                  }}
                >
                  ✓ Free delivery on this order · COD available
                </p>

                {/* NOT LOGGED IN — show login prompt */}
                {!user ? (
                  <div>
                    <div
                      style={{
                        background: "#fff8e1",
                        border: "1px solid #ffe082",
                        borderRadius: 6,
                        padding: "12px 14px",
                        marginBottom: 12,
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 10,
                      }}
                    >
                      <span style={{ fontSize: 18, flexShrink: 0 }}>🔒</span>
                      <div>
                        <p
                          style={{
                            fontSize: 12,
                            fontWeight: 700,
                            color: "#e65100",
                            marginBottom: 3,
                          }}
                        >
                          Please login to place your order
                        </p>
                        <p
                          style={{
                            fontSize: 11,
                            color: "#bf360c",
                            lineHeight: 1.5,
                          }}
                        >
                          Create an account or sign in to securely checkout and
                          track your order.
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        onClose();
                        onOpenAuth();
                      }}
                      style={{
                        width: "100%",
                        padding: "13px",
                        background: "var(--brand)",
                        color: "#fff",
                        border: "none",
                        fontFamily: "Montserrat",
                        fontWeight: 700,
                        fontSize: 11,
                        letterSpacing: "2px",
                        textTransform: "uppercase",
                        borderRadius: 3,
                        cursor: "pointer",
                        marginBottom: 8,
                      }}
                    >
                      Login / Sign Up to Checkout
                    </button>
                    <button
                      onClick={onClear}
                      style={{
                        width: "100%",
                        padding: "9px",
                        background: "none",
                        color: "var(--brand2)",
                        border: "1px solid var(--brand4)",
                        fontFamily: "Montserrat",
                        fontWeight: 600,
                        fontSize: 10,
                        letterSpacing: "1px",
                        textTransform: "uppercase",
                        borderRadius: 3,
                        cursor: "pointer",
                      }}
                    >
                      Clear Bag
                    </button>
                  </div>
                ) : (
                  /* LOGGED IN — show checkout */
                  <div>
                    <div
                      style={{
                        background: "#e8f5e9",
                        border: "1px solid #c8e6c9",
                        borderRadius: 6,
                        padding: "8px 12px",
                        marginBottom: 12,
                        fontSize: 11,
                        color: "#2e7d32",
                        fontWeight: 600,
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                      }}
                    >
                      <span>✓</span> Ordering as <strong>{user.name}</strong>
                    </div>
                    <button
                      onClick={handleCheckout}
                      style={{
                        width: "100%",
                        padding: "13px",
                        background: "var(--brand)",
                        color: "#fff",
                        border: "none",
                        fontFamily: "Montserrat",
                        fontWeight: 700,
                        fontSize: 11,
                        letterSpacing: "2px",
                        textTransform: "uppercase",
                        borderRadius: 3,
                        cursor: "pointer",
                        marginBottom: 8,
                      }}
                    >
                      Place Order — ₹{total}
                    </button>
                    <button
                      onClick={onClear}
                      style={{
                        width: "100%",
                        padding: "9px",
                        background: "none",
                        color: "var(--brand2)",
                        border: "1px solid var(--brand4)",
                        fontFamily: "Montserrat",
                        fontWeight: 600,
                        fontSize: 10,
                        letterSpacing: "1px",
                        textTransform: "uppercase",
                        borderRadius: 3,
                        cursor: "pointer",
                      }}
                    >
                      Clear Bag
                    </button>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

// ─── LOGIN / PROFILE MODAL ────────────────────────────────────────────────────
const AuthModal = ({
  onClose,
  user,
  onLogin,
  onLogout,
  orders,
  wishlist,
  onRemoveWishlist,
}) => {
  const [mode, setMode] = useState(user ? "profile" : "login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [reviewForm, setReviewForm] = useState({
    product: "",
    rating: 5,
    comment: "",
  });
  const [reviews, setReviews] = useState([]);
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      label: "Home",
      line1: "12, MG Road",
      line2: "Rajkot, Gujarat – 360005",
      phone: "+91 98765 43210",
      default: true,
    },
  ]);
  const [newAddr, setNewAddr] = useState({
    label: "",
    line1: "",
    line2: "",
    phone: "",
  });
  const [addingAddr, setAddingAddr] = useState(false);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  useEffect(() => {
    setMode(user ? "profile" : "login");
  }, [user]);
  useEffect(() => {
    const fn = (e) =>
      e.key === "Escape" &&
      (mode === "profile"
        ? onClose()
        : mode === "login" || mode === "signup"
        ? onClose()
        : setMode("profile"));
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [mode]);

  const handleLogin = () => {
    const errs = {};
    if (!form.email) errs.email = "Email is required";
    if (!form.password) errs.password = "Password is required";
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    const name = form.email
      .split("@")[0]
      .replace(/[._]/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
    onLogin({
      name,
      email: form.email,
      avatar: name[0].toUpperCase(),
      joinDate: new Date().toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
      }),
    });
    setSuccess("Login successful! Welcome back.");
    setTimeout(() => {
      setSuccess("");
      setMode("profile");
    }, 1200);
  };

  const handleSignup = () => {
    const errs = {};
    if (!form.name) errs.name = "Name is required";
    if (!form.email) errs.email = "Email is required";
    if (!form.password || form.password.length < 6)
      errs.password = "Password must be 6+ characters";
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    onLogin({
      name: form.name,
      email: form.email,
      avatar: form.name[0].toUpperCase(),
      joinDate: new Date().toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
      }),
    });
    setSuccess("Account created! Welcome to Shets Jewellers 🎉");
    setTimeout(() => {
      setSuccess("");
      setMode("profile");
    }, 1500);
  };

  const submitReview = () => {
    if (!reviewForm.product || !reviewForm.comment) return;
    setReviews((prev) => [
      {
        ...reviewForm,
        id: Date.now(),
        date: new Date().toLocaleDateString("en-IN"),
      },
      ...prev,
    ]);
    setReviewForm({ product: "", rating: 5, comment: "" });
    setSuccess("Review submitted! Thank you.");
    setTimeout(() => setSuccess(""), 2000);
  };

  const saveAddress = () => {
    if (!newAddr.label || !newAddr.line1) return;
    setAddresses((prev) => [
      ...prev,
      { ...newAddr, id: Date.now(), default: false },
    ]);
    setNewAddr({ label: "", line1: "", line2: "", phone: "" });
    setAddingAddr(false);
  };

  const deleteAddress = (id) =>
    setAddresses((prev) => prev.filter((a) => a.id !== id));
  const setDefault = (id) =>
    setAddresses((prev) => prev.map((a) => ({ ...a, default: a.id === id })));

  // shared input style
  const inp = (err) => ({
    width: "100%",
    padding: "10px 12px",
    border: `1px solid ${err ? "var(--red)" : "var(--brand4)"}`,
    borderRadius: 3,
    fontFamily: "Montserrat",
    fontSize: 12,
    outline: "none",
    boxSizing: "border-box",
  });
  const lbl = {
    display: "block",
    fontSize: 9.5,
    fontWeight: 700,
    color: "var(--brand1)",
    letterSpacing: "1.5px",
    textTransform: "uppercase",
    marginBottom: 5,
  };

  const subModes = ["orders", "wishlist", "addresses", "reviews"];

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
      }}
    >
      <div
        onClick={onClose}
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.5)",
          backdropFilter: "blur(3px)",
        }}
      />
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: subModes.includes(mode) ? 520 : 420,
          background: "#fff",
          borderRadius: 12,
          overflow: "hidden",
          boxShadow: "0 24px 80px rgba(0,0,0,0.25)",
          animation: "fadeUp 0.25s ease",
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* ── Header ── */}
        <div
          style={{
            background: "var(--brand)",
            padding: "22px 24px 18px",
            flexShrink: 0,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            {subModes.includes(mode) && (
              <button
                onClick={() => setMode("profile")}
                style={{
                  background: "rgba(255,255,255,0.15)",
                  border: "none",
                  borderRadius: "50%",
                  width: 28,
                  height: 28,
                  cursor: "pointer",
                  color: "#fff",
                  fontSize: 16,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                ←
              </button>
            )}
            <div
              style={{
                flex: 1,
                textAlign: subModes.includes(mode) ? "left" : "center",
              }}
            >
              {!subModes.includes(mode) && (
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 10px",
                    fontSize: 20,
                    fontWeight: 700,
                    color: "#fff",
                  }}
                >
                  {user ? user.avatar : "👤"}
                </div>
              )}
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 20,
                  fontWeight: 700,
                  color: "#fff",
                  lineHeight: 1.2,
                }}
              >
                {mode === "profile"
                  ? `Hello, ${user?.name}!`
                  : mode === "orders"
                  ? "My Orders"
                  : mode === "wishlist"
                  ? "My Wishlist"
                  : mode === "addresses"
                  ? "My Addresses"
                  : mode === "reviews"
                  ? "My Reviews"
                  : mode === "login"
                  ? "Welcome Back"
                  : "Create Account"}
              </p>
              {mode === "profile" && (
                <p
                  style={{
                    fontSize: 11,
                    color: "rgba(255,255,255,0.7)",
                    marginTop: 2,
                  }}
                >
                  {user?.email}
                </p>
              )}
            </div>
            <button
              onClick={onClose}
              style={{
                background: "rgba(255,255,255,0.15)",
                border: "none",
                borderRadius: "50%",
                width: 28,
                height: 28,
                cursor: "pointer",
                fontSize: 16,
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              ×
            </button>
          </div>
        </div>

        {/* ── Scrollable body ── */}
        <div style={{ overflowY: "auto", flex: 1, padding: "20px 24px 24px" }}>
          {success && (
            <div
              style={{
                background: "#e8f5e9",
                border: "1px solid #c8e6c9",
                borderRadius: 6,
                padding: "10px 14px",
                marginBottom: 16,
                fontSize: 12,
                color: "#2e7d32",
                fontWeight: 600,
                textAlign: "center",
              }}
            >
              ✓ {success}
            </div>
          )}

          {/* ═══ PROFILE HOME ═══ */}
          {mode === "profile" && user && (
            <div>
              <div
                style={{
                  background: "var(--brand5)",
                  border: "1px solid var(--brand4)",
                  borderRadius: 8,
                  padding: "14px 16px",
                  marginBottom: 16,
                }}
              >
                {[
                  ["Full Name", user.name],
                  ["Email", user.email],
                  ["Member Since", user.joinDate],
                  ["Status", "Gold Member ✨"],
                ].map(([k, v]) => (
                  <div
                    key={k}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "7px 0",
                      borderBottom: "1px solid var(--brand4)",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 700,
                        color: "var(--brand2)",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                      }}
                    >
                      {k}
                    </span>
                    <span
                      style={{ fontSize: 12, fontWeight: 600, color: "#111" }}
                    >
                      {v}
                    </span>
                  </div>
                ))}
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 10,
                  marginBottom: 16,
                }}
              >
                {[
                  {
                    icon: "📦",
                    label: "My Orders",
                    mode: "orders",
                    count: orders.length,
                  },
                  {
                    icon: "❤️",
                    label: "Wishlist",
                    mode: "wishlist",
                    count: wishlist.length,
                  },
                  {
                    icon: "🏠",
                    label: "Addresses",
                    mode: "addresses",
                    count: addresses.length,
                  },
                  {
                    icon: "⭐",
                    label: "My Reviews",
                    mode: "reviews",
                    count: reviews.length,
                  },
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => setMode(item.mode)}
                    style={{
                      background: "var(--brand5)",
                      border: "1px solid var(--brand4)",
                      borderRadius: 8,
                      padding: "14px 10px",
                      cursor: "pointer",
                      textAlign: "center",
                      transition: "all 0.18s",
                      fontFamily: "Montserrat",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "var(--brand4)";
                      e.currentTarget.style.borderColor = "var(--brand3)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "var(--brand5)";
                      e.currentTarget.style.borderColor = "var(--brand4)";
                    }}
                  >
                    <div style={{ fontSize: 24, marginBottom: 6 }}>
                      {item.icon}
                    </div>
                    <p
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        color: "var(--brand)",
                        marginBottom: 2,
                      }}
                    >
                      {item.label}
                    </p>
                    <p style={{ fontSize: 10, color: "var(--brand2)" }}>
                      {item.count} item{item.count !== 1 ? "s" : ""}
                    </p>
                  </button>
                ))}
              </div>

              <button
                onClick={() => {
                  onLogout();
                  onClose();
                }}
                style={{
                  width: "100%",
                  padding: "11px",
                  background: "#fff",
                  color: "var(--red)",
                  border: "1.5px solid var(--red)",
                  fontFamily: "Montserrat",
                  fontWeight: 700,
                  fontSize: 11,
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  borderRadius: 3,
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "var(--red)";
                  e.currentTarget.style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#fff";
                  e.currentTarget.style.color = "var(--red)";
                }}
              >
                Sign Out
              </button>
            </div>
          )}

          {/* ═══ MY ORDERS ═══ */}
          {mode === "orders" && (
            <div>
              {orders.length === 0 ? (
                <div style={{ textAlign: "center", padding: "40px 0" }}>
                  <div style={{ fontSize: 48, marginBottom: 12 }}>📦</div>
                  <p
                    style={{
                      fontWeight: 600,
                      fontSize: 14,
                      color: "var(--brand)",
                      marginBottom: 6,
                    }}
                  >
                    No orders yet
                  </p>
                  <p style={{ fontSize: 12, color: "var(--brand2)" }}>
                    Your placed orders will appear here
                  </p>
                </div>
              ) : (
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 12 }}
                >
                  {orders.map((order, i) => (
                    <div
                      key={i}
                      style={{
                        border: "1px solid var(--brand4)",
                        borderRadius: 8,
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          background: "var(--brand5)",
                          padding: "10px 14px",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          borderBottom: "1px solid var(--brand4)",
                        }}
                      >
                        <div>
                          <p
                            style={{
                              fontSize: 11,
                              fontWeight: 700,
                              color: "var(--brand)",
                            }}
                          >
                            Order #{order.orderId}
                          </p>
                          <p
                            style={{
                              fontSize: 10,
                              color: "var(--brand2)",
                              marginTop: 2,
                            }}
                          >
                            {order.date}
                          </p>
                        </div>
                        <span
                          style={{
                            fontSize: 9,
                            fontWeight: 700,
                            background: "#e8f5e9",
                            color: "#2e7d32",
                            padding: "3px 10px",
                            borderRadius: 12,
                            border: "1px solid #c8e6c9",
                          }}
                        >
                          CONFIRMED
                        </span>
                      </div>
                      <div style={{ padding: "12px 14px" }}>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 8,
                            marginBottom: 10,
                          }}
                        >
                          {order.items.map((item, j) => (
                            <div
                              key={j}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 10,
                              }}
                            >
                              <img
                                src={item.img}
                                alt={item.name}
                                style={{
                                  width: 40,
                                  height: 40,
                                  objectFit: "cover",
                                  borderRadius: 4,
                                  border: "1px solid var(--brand4)",
                                  flexShrink: 0,
                                }}
                              />
                              <div style={{ flex: 1, minWidth: 0 }}>
                                <p
                                  style={{
                                    fontSize: 11,
                                    fontWeight: 600,
                                    color: "#111",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  {item.name}
                                </p>
                                <p
                                  style={{
                                    fontSize: 11,
                                    color: "var(--brand)",
                                    fontWeight: 700,
                                  }}
                                >
                                  ₹{item.price}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            paddingTop: 8,
                            borderTop: "1px solid var(--brand4)",
                          }}
                        >
                          <p style={{ fontSize: 11, color: "var(--brand2)" }}>
                            Est. delivery:{" "}
                            <strong style={{ color: "#111" }}>
                              {order.deliveryDate}
                            </strong>
                          </p>
                          <p
                            style={{
                              fontSize: 12,
                              fontWeight: 700,
                              color: "var(--brand)",
                            }}
                          >
                            ₹{order.total}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ═══ WISHLIST ═══ */}
          {mode === "wishlist" && (
            <div>
              {wishlist.length === 0 ? (
                <div style={{ textAlign: "center", padding: "40px 0" }}>
                  <div style={{ fontSize: 48, marginBottom: 12 }}>❤️</div>
                  <p
                    style={{
                      fontWeight: 600,
                      fontSize: 14,
                      color: "var(--brand)",
                      marginBottom: 6,
                    }}
                  >
                    Wishlist is empty
                  </p>
                  <p style={{ fontSize: 12, color: "var(--brand2)" }}>
                    Click ❤️ on any product to save it here
                  </p>
                </div>
              ) : (
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 10 }}
                >
                  {wishlist.map((item, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        padding: "10px 12px",
                        border: "1px solid var(--brand4)",
                        borderRadius: 8,
                        background: "var(--brand5)",
                      }}
                    >
                      <img
                        src={item.img}
                        alt={item.name}
                        style={{
                          width: 52,
                          height: 52,
                          objectFit: "cover",
                          borderRadius: 6,
                          flexShrink: 0,
                          border: "1px solid var(--brand4)",
                        }}
                      />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p
                          style={{
                            fontSize: 12,
                            fontWeight: 600,
                            color: "#111",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            marginBottom: 3,
                          }}
                        >
                          {item.name}
                        </p>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                          }}
                        >
                          <span
                            style={{
                              fontSize: 13,
                              fontWeight: 700,
                              color: "var(--brand)",
                            }}
                          >
                            ₹{item.price}
                          </span>
                          <span
                            style={{
                              fontSize: 11,
                              color: "rgba(0,0,0,0.3)",
                              textDecoration: "line-through",
                            }}
                          >
                            ₹{item.mrp}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => onRemoveWishlist(i)}
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          fontSize: 18,
                          color: "var(--red)",
                          padding: "4px",
                          flexShrink: 0,
                        }}
                        title="Remove"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ═══ ADDRESSES ═══ */}
          {mode === "addresses" && (
            <div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  marginBottom: 14,
                }}
              >
                {addresses.map((addr) => (
                  <div
                    key={addr.id}
                    style={{
                      border: `1.5px solid ${
                        addr.default ? "var(--brand)" : "var(--brand4)"
                      }`,
                      borderRadius: 8,
                      padding: "12px 14px",
                      background: addr.default ? "var(--brand5)" : "#fff",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        marginBottom: 6,
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                        }}
                      >
                        <span style={{ fontSize: 13 }}>🏠</span>
                        <span
                          style={{
                            fontSize: 12,
                            fontWeight: 700,
                            color: "var(--brand)",
                          }}
                        >
                          {addr.label}
                        </span>
                        {addr.default && (
                          <span
                            style={{
                              fontSize: 9,
                              fontWeight: 700,
                              color: "var(--brand)",
                              background: "var(--brand4)",
                              padding: "2px 7px",
                              borderRadius: 10,
                            }}
                          >
                            DEFAULT
                          </span>
                        )}
                      </div>
                      <div style={{ display: "flex", gap: 6 }}>
                        {!addr.default && (
                          <button
                            onClick={() => setDefault(addr.id)}
                            style={{
                              fontSize: 9,
                              fontWeight: 700,
                              color: "var(--brand)",
                              background: "none",
                              border: "1px solid var(--brand4)",
                              borderRadius: 4,
                              padding: "3px 8px",
                              cursor: "pointer",
                              fontFamily: "Montserrat",
                            }}
                          >
                            SET DEFAULT
                          </button>
                        )}
                        <button
                          onClick={() => deleteAddress(addr.id)}
                          style={{
                            fontSize: 9,
                            fontWeight: 700,
                            color: "var(--red)",
                            background: "none",
                            border: "1px solid #ffcdd2",
                            borderRadius: 4,
                            padding: "3px 8px",
                            cursor: "pointer",
                            fontFamily: "Montserrat",
                          }}
                        >
                          REMOVE
                        </button>
                      </div>
                    </div>
                    <p style={{ fontSize: 12, color: "#444", lineHeight: 1.6 }}>
                      {addr.line1}
                    </p>
                    <p style={{ fontSize: 12, color: "#444", lineHeight: 1.6 }}>
                      {addr.line2}
                    </p>
                    {addr.phone && (
                      <p
                        style={{
                          fontSize: 11,
                          color: "var(--brand2)",
                          marginTop: 4,
                        }}
                      >
                        📞 {addr.phone}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {addingAddr ? (
                <div
                  style={{
                    border: "1px solid var(--brand4)",
                    borderRadius: 8,
                    padding: "14px",
                    background: "var(--brand5)",
                  }}
                >
                  <p
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: "var(--brand)",
                      marginBottom: 12,
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    New Address
                  </p>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 10,
                    }}
                  >
                    <div>
                      <label style={lbl}>Label (e.g. Home / Office)</label>
                      <input
                        value={newAddr.label}
                        onChange={(e) =>
                          setNewAddr((p) => ({ ...p, label: e.target.value }))
                        }
                        style={inp(false)}
                        placeholder="Home"
                      />
                    </div>
                    <div>
                      <label style={lbl}>Address Line 1</label>
                      <input
                        value={newAddr.line1}
                        onChange={(e) =>
                          setNewAddr((p) => ({ ...p, line1: e.target.value }))
                        }
                        style={inp(false)}
                        placeholder="Street / Society / Flat No."
                      />
                    </div>
                    <div>
                      <label style={lbl}>City, State – Pincode</label>
                      <input
                        value={newAddr.line2}
                        onChange={(e) =>
                          setNewAddr((p) => ({ ...p, line2: e.target.value }))
                        }
                        style={inp(false)}
                        placeholder="Rajkot, Gujarat – 360005"
                      />
                    </div>
                    <div>
                      <label style={lbl}>Phone</label>
                      <input
                        value={newAddr.phone}
                        onChange={(e) =>
                          setNewAddr((p) => ({ ...p, phone: e.target.value }))
                        }
                        style={inp(false)}
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button
                        onClick={saveAddress}
                        style={{
                          flex: 1,
                          padding: "10px",
                          background: "var(--brand)",
                          color: "#fff",
                          border: "none",
                          fontFamily: "Montserrat",
                          fontWeight: 700,
                          fontSize: 10,
                          letterSpacing: "1.5px",
                          textTransform: "uppercase",
                          borderRadius: 3,
                          cursor: "pointer",
                        }}
                      >
                        Save Address
                      </button>
                      <button
                        onClick={() => setAddingAddr(false)}
                        style={{
                          flex: 1,
                          padding: "10px",
                          background: "#fff",
                          color: "var(--brand2)",
                          border: "1px solid var(--brand4)",
                          fontFamily: "Montserrat",
                          fontWeight: 600,
                          fontSize: 10,
                          textTransform: "uppercase",
                          borderRadius: 3,
                          cursor: "pointer",
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setAddingAddr(true)}
                  style={{
                    width: "100%",
                    padding: "11px",
                    background: "#fff",
                    color: "var(--brand)",
                    border: "1.5px dashed var(--brand3)",
                    fontFamily: "Montserrat",
                    fontWeight: 700,
                    fontSize: 11,
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                    borderRadius: 6,
                    cursor: "pointer",
                  }}
                >
                  + Add New Address
                </button>
              )}
            </div>
          )}

          {/* ═══ REVIEWS ═══ */}
          {mode === "reviews" && (
            <div>
              {/* Write review */}
              <div
                style={{
                  border: "1px solid var(--brand4)",
                  borderRadius: 8,
                  padding: "14px",
                  marginBottom: 16,
                  background: "var(--brand5)",
                }}
              >
                <p
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: "var(--brand)",
                    marginBottom: 12,
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  Write a Review
                </p>
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 10 }}
                >
                  <div>
                    <label style={lbl}>Product Name</label>
                    <input
                      value={reviewForm.product}
                      onChange={(e) =>
                        setReviewForm((p) => ({
                          ...p,
                          product: e.target.value,
                        }))
                      }
                      style={inp(false)}
                      placeholder="e.g. High Gold Jhumka Earrings"
                    />
                  </div>
                  <div>
                    <label style={lbl}>Rating</label>
                    <div style={{ display: "flex", gap: 6 }}>
                      {[1, 2, 3, 4, 5].map((n) => (
                        <button
                          key={n}
                          onClick={() =>
                            setReviewForm((p) => ({ ...p, rating: n }))
                          }
                          style={{
                            fontSize: 22,
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            opacity: n <= reviewForm.rating ? 1 : 0.3,
                            transition: "opacity 0.15s",
                          }}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label style={lbl}>Your Review</label>
                    <textarea
                      value={reviewForm.comment}
                      onChange={(e) =>
                        setReviewForm((p) => ({
                          ...p,
                          comment: e.target.value,
                        }))
                      }
                      rows={3}
                      style={{ ...inp(false), resize: "vertical" }}
                      placeholder="Share your experience with this product..."
                    />
                  </div>
                  <button
                    onClick={submitReview}
                    style={{
                      padding: "10px",
                      background: "var(--brand)",
                      color: "#fff",
                      border: "none",
                      fontFamily: "Montserrat",
                      fontWeight: 700,
                      fontSize: 10,
                      letterSpacing: "1.5px",
                      textTransform: "uppercase",
                      borderRadius: 3,
                      cursor: "pointer",
                    }}
                  >
                    Submit Review
                  </button>
                </div>
              </div>

              {/* Past reviews */}
              {reviews.length === 0 ? (
                <div style={{ textAlign: "center", padding: "20px 0" }}>
                  <p style={{ fontSize: 12, color: "var(--brand2)" }}>
                    No reviews yet. Be the first to share your experience!
                  </p>
                </div>
              ) : (
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 10 }}
                >
                  {reviews.map((r) => (
                    <div
                      key={r.id}
                      style={{
                        border: "1px solid var(--brand4)",
                        borderRadius: 8,
                        padding: "12px 14px",
                        background: "#fff",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          marginBottom: 6,
                        }}
                      >
                        <p
                          style={{
                            fontSize: 12,
                            fontWeight: 700,
                            color: "var(--brand)",
                          }}
                        >
                          {r.product}
                        </p>
                        <p style={{ fontSize: 10, color: "var(--brand2)" }}>
                          {r.date}
                        </p>
                      </div>
                      <div style={{ display: "flex", gap: 1, marginBottom: 6 }}>
                        {[1, 2, 3, 4, 5].map((n) => (
                          <span
                            key={n}
                            style={{
                              fontSize: 13,
                              color: n <= r.rating ? "#F5A623" : "#ddd",
                            }}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <p
                        style={{
                          fontSize: 12,
                          color: "#444",
                          lineHeight: 1.6,
                          fontStyle: "italic",
                        }}
                      >
                        "{r.comment}"
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ═══ LOGIN FORM ═══ */}
          {mode === "login" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <label style={lbl}>Email Address</label>
                <input
                  value={form.email}
                  onChange={set("email")}
                  type="email"
                  placeholder="you@example.com"
                  style={inp(errors.email)}
                />
                {errors.email && (
                  <p
                    style={{ fontSize: 10, color: "var(--red)", marginTop: 4 }}
                  >
                    {errors.email}
                  </p>
                )}
              </div>
              <div>
                <label style={lbl}>Password</label>
                <input
                  value={form.password}
                  onChange={set("password")}
                  type="password"
                  placeholder="Enter your password"
                  style={inp(errors.password)}
                />
                {errors.password && (
                  <p
                    style={{ fontSize: 10, color: "var(--red)", marginTop: 4 }}
                  >
                    {errors.password}
                  </p>
                )}
              </div>
              <button
                onClick={handleLogin}
                style={{
                  padding: "13px",
                  background: "var(--brand)",
                  color: "#fff",
                  border: "none",
                  fontFamily: "Montserrat",
                  fontWeight: 700,
                  fontSize: 11,
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  borderRadius: 3,
                  cursor: "pointer",
                  marginTop: 4,
                }}
              >
                Sign In
              </button>
              <p
                style={{
                  textAlign: "center",
                  fontSize: 12,
                  color: "var(--brand2)",
                }}
              >
                Don't have an account?{" "}
                <span
                  onClick={() => {
                    setMode("signup");
                    setErrors({});
                  }}
                  style={{
                    color: "var(--brand)",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Sign Up
                </span>
              </p>
            </div>
          )}

          {/* ═══ SIGNUP FORM ═══ */}
          {mode === "signup" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <label style={lbl}>Full Name</label>
                <input
                  value={form.name}
                  onChange={set("name")}
                  placeholder="Your full name"
                  style={inp(errors.name)}
                />
                {errors.name && (
                  <p
                    style={{ fontSize: 10, color: "var(--red)", marginTop: 4 }}
                  >
                    {errors.name}
                  </p>
                )}
              </div>
              <div>
                <label style={lbl}>Email Address</label>
                <input
                  value={form.email}
                  onChange={set("email")}
                  type="email"
                  placeholder="you@example.com"
                  style={inp(errors.email)}
                />
                {errors.email && (
                  <p
                    style={{ fontSize: 10, color: "var(--red)", marginTop: 4 }}
                  >
                    {errors.email}
                  </p>
                )}
              </div>
              <div>
                <label style={lbl}>Password</label>
                <input
                  value={form.password}
                  onChange={set("password")}
                  type="password"
                  placeholder="Minimum 6 characters"
                  style={inp(errors.password)}
                />
                {errors.password && (
                  <p
                    style={{ fontSize: 10, color: "var(--red)", marginTop: 4 }}
                  >
                    {errors.password}
                  </p>
                )}
              </div>
              <button
                onClick={handleSignup}
                style={{
                  padding: "13px",
                  background: "var(--brand)",
                  color: "#fff",
                  border: "none",
                  fontFamily: "Montserrat",
                  fontWeight: 700,
                  fontSize: 11,
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  borderRadius: 3,
                  cursor: "pointer",
                  marginTop: 4,
                }}
              >
                Create Account
              </button>
              <p
                style={{
                  textAlign: "center",
                  fontSize: 12,
                  color: "var(--brand2)",
                }}
              >
                Already have an account?{" "}
                <span
                  onClick={() => {
                    setMode("login");
                    setErrors({});
                  }}
                  style={{
                    color: "var(--brand)",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Sign In
                </span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── ANNOUNCEMENT BAR ─────────────────────────────────────────────────────────
const AnnouncementBar = () => {
  const [timeLeft, setTimeLeft] = useState({ h: 5, m: 24, s: 3 });
  useEffect(() => {
    const t = setInterval(() => {
      setTimeLeft((prev) => {
        let { h, m, s } = prev;
        s--;
        if (s < 0) {
          s = 59;
          m--;
        }
        if (m < 0) {
          m = 59;
          h--;
        }
        if (h < 0) return { h: 0, m: 0, s: 0 };
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);
  const pad = (n) => String(n).padStart(2, "0");
  return (
    <div style={{ background: "var(--brand)", padding: "9px 16px" }}>
      <div
        className="page-container"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        <span
          style={{
            fontWeight: 700,
            fontSize: 11,
            color: "#fff",
            letterSpacing: "0.5px",
          }}
        >
          🔥 MEGA SALE — Hurry Up, Shop Now!
        </span>
        <span
          style={{
            width: 4,
            height: 4,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.5)",
            display: "inline-block",
          }}
        />
        <span style={{ fontWeight: 800, fontSize: 12, color: "#FFD700" }}>
          Extra 50% OFF
        </span>
        <span
          style={{
            width: 4,
            height: 4,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.5)",
            display: "inline-block",
          }}
        />
        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            fontSize: 11,
            color: "#FFD700",
            fontWeight: 700,
          }}
        >
          ⏱ {pad(timeLeft.h)}:{pad(timeLeft.m)}:{pad(timeLeft.s)}
        </span>
        <span
          style={{
            width: 4,
            height: 4,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.5)",
            display: "inline-block",
          }}
        />
        <span style={{ fontSize: 11, color: "rgba(255,255,255,0.85)" }}>
          Code: <strong style={{ color: "#FFD700" }}>SHETS50</strong> | Free
          Delivery above ₹499
        </span>
      </div>
    </div>
  );
};

// ─── NAVBAR ───────────────────────────────────────────────────────────────────
const Navbar = ({
  page,
  setPage,
  cartCount,
  setCollectionsTab,
  onSearchOpen,
  onCartOpen,
  onProfileOpen,
  user,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const navLinks = ["Home", "Collections", "Bridal", "Custom Order", "Contact"];
  const subNavItems = [
    "HOME",
    "BANGLES",
    "RINGS",
    "CHAIN",
    "FESTIVE COMBOS",
    "MANGALSUTRA",
    "WATCHES",
    "NECKLACE",
    "EARRINGS",
    "BRACELETS",
  ];

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const handleSubNav = (item) => {
    if (item === "HOME") {
      setPage("Home");
      return;
    }
    const tabKey = SUBNAV_MAP[item];
    if (tabKey) {
      setCollectionsTab(tabKey);
      setPage("Collections");
    }
  };

  return (
    <div
      className="navbar-outer"
      style={{ boxShadow: scrolled ? "0 2px 16px rgba(90,55,25,0.1)" : "none" }}
    >
      <AnnouncementBar />

      {/* ── Main Navbar Row ── */}
      <div className="navbar-inner">
        {/* LEFT — Logo */}
        <div className="navbar-logo" onClick={() => setPage("Home")}>
          <span
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 700,
              fontSize: 26,
              color: "var(--brand)",
              letterSpacing: "4px",
              display: "block",
              lineHeight: 1,
            }}
          >
            SHETS
          </span>
          <span
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 500,
              fontSize: 8,
              color: "var(--brand2)",
              letterSpacing: "5px",
              textTransform: "uppercase",
              display: "block",
              marginTop: 2,
            }}
          >
            JEWELLERS
          </span>
        </div>

        {/* CENTER — Nav links */}
        <nav className="navbar-links">
          {navLinks.map((l) => (
            <button
              key={l}
              className={`nav-link ${page === l ? "active" : ""}`}
              onClick={() => setPage(l)}
            >
              {l}
            </button>
          ))}
        </nav>

        {/* RIGHT — Icons */}
        <div className="navbar-icons">
          {/* Search */}
          <button
            onClick={onSearchOpen}
            style={{
              background: "none",
              border: "none",
              padding: "9px 8px",
              color: "var(--brand1)",
              display: "flex",
              alignItems: "center",
              borderRadius: 4,
              transition: "color 0.2s",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--brand)")}
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--brand1)")
            }
            title="Search"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM20 20l-3-3"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Profile */}
          <button
            onClick={onProfileOpen}
            style={{
              background: "none",
              border: "none",
              padding: "6px 8px",
              color: "var(--brand1)",
              display: "flex",
              alignItems: "center",
              borderRadius: 4,
              transition: "all 0.2s",
              cursor: "pointer",
              gap: 6,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--brand)")}
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--brand1)")
            }
            title={user ? user.name : "Account"}
          >
            {user ? (
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: "var(--brand)",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 12,
                  fontWeight: 700,
                }}
              >
                {user.avatar}
              </div>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>

          {/* Cart */}
          <button
            onClick={onCartOpen}
            title="Cart"
            style={{
              background: "none",
              border: "none",
              padding: "9px 8px",
              color: "var(--brand1)",
              display: "flex",
              alignItems: "center",
              position: "relative",
              borderRadius: 4,
              transition: "color 0.2s",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--brand)")}
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--brand1)")
            }
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {cartCount > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: 4,
                  right: 4,
                  background: "var(--brand)",
                  color: "#fff",
                  borderRadius: "50%",
                  width: 14,
                  height: 14,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 8,
                  fontWeight: 800,
                }}
              >
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* ── Sub Nav — single scrollable row (original style) ── */}
      <div
        style={{
          borderTop: "1px solid var(--brand4)",
          background: "#fff",
          overflowX: "auto",
        }}
      >
        <div
          style={{
            display: "flex",
            padding: "0 24px",
            minWidth: "max-content",
            gap: "65px",
          }}
        >
          {subNavItems.map((item) => (
            <button
              key={item}
              onClick={() => handleSubNav(item)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "Montserrat",
                fontWeight: 600,
                fontSize: 11,
                color: "rgba(0,0,0,0.7)",
                padding: "10px 14px",
                whiteSpace: "nowrap",
                borderBottom: "2px solid transparent",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--brand)";
                e.currentTarget.style.borderBottomColor = "var(--brand)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "rgba(0,0,0,0.7)";
                e.currentTarget.style.borderBottomColor = "transparent";
              }}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── PRODUCT CARD ─────────────────────────────────────────────────────────────
const ProductCard = ({
  product,
  onAdd,
  onView,
  user,
  onOpenAuth,
  isWishlisted,
  onToggleWishlist,
}) => {
  const [adding, setAdding] = useState(false);
  const [loginPrompt, setLoginPrompt] = useState(false);
  const disc = getDiscount(product.price, product.mrp);
  const wishlisted = isWishlisted ? isWishlisted(product.id) : false;

  const handleAdd = (e) => {
    e.stopPropagation();
    if (!user) {
      setLoginPrompt(true);
      setTimeout(() => setLoginPrompt(false), 2500);
      return;
    }
    onAdd(product);
    setAdding(true);
    setTimeout(() => setAdding(false), 1500);
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    if (!user) {
      onOpenAuth && onOpenAuth();
      return;
    }
    onToggleWishlist && onToggleWishlist(product);
  };

  return (
    <div
      className="product-card"
      style={{
        background: "#fff",
        border: "1px solid var(--brand4)",
        borderRadius: 6,
        overflow: "hidden",
        transition: "box-shadow 0.25s, border-color 0.25s, transform 0.25s",
        display: "flex",
        flexDirection: "column",
        animation: "fadeUp 0.5s ease both",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 6px 24px rgba(90,55,25,0.13)";
        e.currentTarget.style.borderColor = "var(--brand3)";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.borderColor = "var(--brand4)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
      onClick={() => onView && onView(product)}
    >
      <div style={{ position: "relative", overflow: "hidden", flexShrink: 0 }}>
        {/* Tag */}
        <div
          style={{
            position: "absolute",
            top: 8,
            left: 8,
            zIndex: 2,
            background:
              product.tag === "FESTIVE DEAL"
                ? "var(--brand)"
                : "var(--sale-bg)",
            color: product.tag === "FESTIVE DEAL" ? "#fff" : "var(--sale-text)",
            fontSize: 9,
            fontWeight: 700,
            padding: "3px 8px",
            borderRadius: 2,
            letterSpacing: "0.5px",
          }}
        >
          {product.tag}
        </div>
        {/* Wishlist heart */}
        <button
          onClick={handleWishlist}
          style={{
            position: "absolute",
            top: 6,
            right: 6,
            zIndex: 2,
            background: "rgba(255,255,255,0.9)",
            border: "none",
            borderRadius: "50%",
            width: 28,
            height: 28,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            fontSize: 15,
            lineHeight: 1,
            boxShadow: "0 1px 4px rgba(0,0,0,0.12)",
            transition: "transform 0.2s",
          }}
          title={wishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "scale(1.15)")
          }
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          {wishlisted ? "❤️" : "🤍"}
        </button>
        <div
          style={{
            paddingBottom: "100%",
            position: "relative",
            overflow: "hidden",
            background: "#f5f0eb",
          }}
        >
          <img
            src={product.img}
            alt={product.name}
            className="product-img"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        </div>
      </div>

      <div style={{ padding: "12px 12px 8px", flex: 1 }}>
        <p
          style={{
            fontSize: 12,
            fontWeight: 500,
            color: "#222",
            lineHeight: 1.45,
            marginBottom: 8,
            minHeight: 34,
          }}
        >
          {product.name}
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            flexWrap: "wrap",
          }}
        >
          <span style={{ fontWeight: 700, fontSize: 15, color: "#111" }}>
            ₹{product.price}
          </span>
          <span
            style={{
              fontWeight: 400,
              fontSize: 11,
              color: "rgba(0,0,0,0.32)",
              textDecoration: "line-through",
            }}
          >
            ₹{product.mrp}
          </span>
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              color: "var(--sale-text)",
              background: "var(--sale-bg)",
              padding: "1px 6px",
              borderRadius: 2,
            }}
          >
            {disc}% OFF
          </span>
        </div>
      </div>

      <div style={{ padding: "0 12px 12px" }}>
        {loginPrompt ? (
          <div
            style={{
              background: "#fff8e1",
              border: "1px solid #ffe082",
              borderRadius: 3,
              padding: "8px 10px",
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontSize: 10,
                fontWeight: 700,
                color: "#e65100",
                marginBottom: 4,
              }}
            >
              🔒 Please login to add items
            </p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenAuth && onOpenAuth();
              }}
              style={{
                fontSize: 10,
                fontWeight: 700,
                color: "var(--brand)",
                background: "none",
                border: "none",
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              Login / Sign Up →
            </button>
          </div>
        ) : (
          <button
            className={`card-btn ${adding ? "added" : ""}`}
            onClick={handleAdd}
          >
            {adding ? "✓ Added" : "Add to Bag"}
          </button>
        )}
      </div>
    </div>
  );
};

// ─── TRUST MARKERS ────────────────────────────────────────────────────────────
const TrustMarkers = () => (
  <div
    style={{
      background: "var(--brand5)",
      borderTop: "1px solid var(--brand4)",
      borderBottom: "1px solid var(--brand4)",
      padding: "14px 0",
    }}
  >
    <div
      className="page-container"
      style={{
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "10px 0",
      }}
    >
      {[
        { icon: "🚚", text: "Delivered in 3–5 days" },
        { icon: "💵", text: "Cash on Delivery" },
        { icon: "↩️", text: "Easy Returns – 3 days" },
        { icon: "⭐", text: "5,00,000+ Happy Orders" },
        { icon: "🔒", text: "100% Secure Payments" },
      ].map((item, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 16 }}>{item.icon}</span>
          <span
            style={{ fontSize: 11, fontWeight: 600, color: "var(--brand1)" }}
          >
            {item.text}
          </span>
        </div>
      ))}
    </div>
  </div>
);

// ─── TESTIMONIALS ─────────────────────────────────────────────────────────────
const TestimonialsSection = () => (
  <div
    style={{
      background: "var(--brand5)",
      padding: "56px 0",
      borderTop: "1px solid var(--brand4)",
    }}
  >
    <div className="page-container">
      <div style={{ marginBottom: 36 }}>
        <p
          style={{
            fontSize: 10,
            letterSpacing: "4px",
            color: "var(--brand2)",
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          What our customers say
        </p>
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 700,
            fontSize: 28,
            color: "var(--brand)",
          }}
        >
          Happy Stories
        </h2>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 16,
        }}
      >
        {TESTIMONIALS.map((t, i) => (
          <div
            key={i}
            style={{
              background: "#fff",
              border: "1px solid var(--brand4)",
              borderRadius: 6,
              padding: "20px",
              animation: `fadeUp 0.5s ${i * 0.08}s ease both`,
            }}
          >
            <div style={{ display: "flex", gap: 2, marginBottom: 10 }}>
              {[...Array(t.stars)].map((_, si) => (
                <span key={si} style={{ color: "#F5A623", fontSize: 13 }}>
                  ★
                </span>
              ))}
            </div>
            <p
              style={{
                fontSize: 12,
                color: "#444",
                lineHeight: 1.75,
                marginBottom: 14,
                fontStyle: "italic",
              }}
            >
              "{t.text}"
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: "var(--brand4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 14,
                  flexShrink: 0,
                  color: "var(--brand)",
                  fontWeight: 700,
                }}
              >
                {t.name[0]}
              </div>
              <div>
                <p
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: "var(--brand)",
                  }}
                >
                  {t.name}
                </p>
                <p style={{ fontSize: 10, color: "var(--brand2)" }}>{t.city}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ─── PAGE: HOME ───────────────────────────────────────────────────────────────
const HomePage = ({
  setPage,
  onAddToCart,
  setCollectionsTab,
  user,
  onOpenAuth,
  wishlist,
  onToggleWishlist,
  isWishlisted,
}) => {
  const featured = [...PRODUCTS.Rings, ...PRODUCTS.Necklaces].slice(0, 8);

  const categories = [
    {
      name: "BANGLES",
      img: "https://www.griiham.in/cdn/shop/files/Gold-Plated-Set-of-6-bangles-Designer-Bangles-Griiham.jpg",
      tab: "Bangles",
    },
    {
      name: "CHAINS",
      img: "https://d25g9z9s77rn4i.cloudfront.net/uploads/product/1095/1655891866_b700d796c7c491e41f4c.png",
      tab: "Chains",
    },
    {
      name: "EARRINGS",
      img: "https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dw677f6639/images/hi-res/511069SOEAGA00_1.jpg",
      tab: "Earrings",
    },
    {
      name: "BRACELETS",
      img: "https://d25g9z9s77rn4i.cloudfront.net/uploads/product/229/1657886878_a04e45e53fd9ac167f31.jpg",
      tab: "Bracelets",
    },
    {
      name: "NECKLACES",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTczAIyESUVrZnr2AYYIsIq5XsVlUdlPstFxQ&s.jpeg",
      tab: "Necklaces",
    },
    {
      name: "RINGS",
      img: "https://www.tanishq.co.in/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dw78538bb2/images/hi-res/511920FCMAA00.jpg",
      tab: "Rings",
    },
    {
      name: "MANGALSUTRA",
      img: "https://d25g9z9s77rn4i.cloudfront.net/uploads/product/1404/1768020799_3eb22cfbef73cbb4ab71.jpg",
      tab: "Mangalsutra",
    },
    {
      name: "WATCHES",
      img: "https://m.media-amazon.com/images/I/71O9w2eWomL._AC_UY1000_.jpg",
      tab: "Watches",
    },
  ];

  const handleCategoryClick = (tab) => {
    setCollectionsTab(tab);
    setPage("Collections");
  };

  return (
    <div>
      {/* Hero */}
      <div
        style={{
          background: `linear-gradient(135deg, rgba(90,55,25,0.93) 0%, rgba(60,35,10,0.85) 100%), url('https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1600&q=85') center/cover`,
          minHeight: 480,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: "80px 24px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Floating particles */}
        {["💍", "✨", "💎", "🌸", "👑", "⭐", "🔮", "🌟"].map((emoji, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              fontSize: 16 + (i % 3) * 6,
              opacity: 0.18,
              top: `${10 + ((i * 11) % 80)}%`,
              left: `${5 + ((i * 13) % 88)}%`,
              animation: `float ${5 + i}s ${i * 0.8}s ease-in-out infinite`,
              pointerEvents: "none",
            }}
          >
            {emoji}
          </div>
        ))}
        {/* Animated rings */}
        {[300, 200, 120].map((size, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: size,
              height: size,
              borderRadius: "50%",
              border: `1px solid rgba(255,255,255,${0.04 + i * 0.02})`,
              animation: `spin ${20 + i * 10}s linear infinite`,
              top: "50%",
              left: "50%",
              marginTop: -size / 2,
              marginLeft: -size / 2,
            }}
          />
        ))}
        <div style={{ position: "relative", zIndex: 2 }}>
          <p
            style={{
              fontWeight: 500,
              fontSize: 10,
              letterSpacing: "6px",
              color: "rgba(255,215,0,0.85)",
              textTransform: "uppercase",
              marginBottom: 18,
              animation: "fadeIn 1s ease",
            }}
          >
            ◆ 25+ Years of Excellence ◆
          </p>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 700,
              fontSize: "clamp(36px,7vw,82px)",
              color: "#fff",
              letterSpacing: "-1px",
              lineHeight: 1.05,
              marginBottom: 16,
              animation: "fadeUp 0.9s 0.15s ease both",
            }}
          >
            Elegance Redefined
          </h1>
          <p
            style={{
              fontWeight: 400,
              fontSize: 13,
              color: "rgba(255,255,255,0.72)",
              marginBottom: 36,
              maxWidth: 440,
              lineHeight: 1.9,
              animation: "fadeUp 0.9s 0.28s ease both",
            }}
          >
            5,00,000+ happy orders · Premium jewellery at affordable prices ·
            Free shipping across India
          </p>
          <div
            style={{
              display: "flex",
              gap: 14,
              flexWrap: "wrap",
              justifyContent: "center",
              animation: "fadeUp 0.9s 0.4s ease both",
            }}
          >
            <button
              onClick={() => setPage("Collections")}
              style={{
                background: "#fff",
                color: "var(--brand)",
                border: "none",
                padding: "14px 36px",
                fontFamily: "Montserrat",
                fontWeight: 700,
                fontSize: 11,
                letterSpacing: "2px",
                textTransform: "uppercase",
                borderRadius: 4,
                cursor: "pointer",
                boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                transition: "transform 0.25s, box-shadow 0.25s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform =
                  "translateY(-3px) scale(1.03)";
                e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.28)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.2)";
              }}
            >
              Shop Now
            </button>
            <button
              onClick={() => setPage("Bridal")}
              style={{
                background: "transparent",
                color: "#fff",
                border: "2px solid rgba(255,255,255,0.55)",
                padding: "12px 36px",
                fontFamily: "Montserrat",
                fontWeight: 600,
                fontSize: 11,
                letterSpacing: "2px",
                textTransform: "uppercase",
                borderRadius: 4,
                cursor: "pointer",
                transition: "all 0.25s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.12)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.9)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.55)";
              }}
            >
              Bridal Collection
            </button>
          </div>
          {/* Live stats */}
          <div
            style={{
              display: "flex",
              gap: 32,
              justifyContent: "center",
              marginTop: 36,
              animation: "fadeUp 0.9s 0.55s ease both",
            }}
          >
            {[
              { n: 500000, s: "+", l: "Happy Orders" },
              { n: 25, s: "+", l: "Years" },
              { n: 50, s: "%", l: "Off Today" },
            ].map((st, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 26,
                    fontWeight: 700,
                    color: "#FFD700",
                    lineHeight: 1,
                  }}
                >
                  <AnimatedCounter target={st.n} suffix={st.s} />
                </p>
                <p
                  style={{
                    fontSize: 9,
                    color: "rgba(255,255,255,0.6)",
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    marginTop: 4,
                  }}
                >
                  {st.l}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <TrustMarkers />

      {/* Categories */}
      <div style={{ padding: "56px 0 0" }}>
        <div className="page-container">
          <div style={{ marginBottom: 28 }}>
            <p
              style={{
                fontSize: 10,
                letterSpacing: "4px",
                color: "var(--brand2)",
                textTransform: "uppercase",
                marginBottom: 8,
              }}
            >
              Browse
            </p>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 700,
                fontSize: 28,
                color: "var(--brand)",
              }}
            >
              Shop by Category
            </h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
              gap: 14,
            }}
          >
            {categories.map((cat, i) => (
              <div
                key={i}
                onClick={() => handleCategoryClick(cat.tab)}
                style={{
                  position: "relative",
                  borderRadius: 6,
                  overflow: "hidden",
                  cursor: "pointer",
                  aspectRatio: "1",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  animation: `fadeUp 0.5s ${i * 0.06}s ease both`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.04)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 24px rgba(90,55,25,0.18)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <img
                  src={cat.img}
                  alt={cat.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to top, rgba(60,30,5,0.82) 0%, transparent 55%)",
                  }}
                />
                <p
                  style={{
                    position: "absolute",
                    bottom: 12,
                    left: 0,
                    right: 0,
                    textAlign: "center",
                    fontWeight: 700,
                    fontSize: 10.5,
                    letterSpacing: "2px",
                    color: "#fff",
                    textTransform: "uppercase",
                  }}
                >
                  {cat.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bestsellers */}
      <div style={{ padding: "56px 0" }}>
        <div className="page-container">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginBottom: 24,
            }}
          >
            <div>
              <p
                style={{
                  fontSize: 10,
                  letterSpacing: "4px",
                  color: "var(--brand2)",
                  textTransform: "uppercase",
                  marginBottom: 6,
                }}
              >
                Top Picks
              </p>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 700,
                  fontSize: 28,
                  color: "var(--brand)",
                  lineHeight: 1,
                }}
              >
                Bestsellers
              </h2>
            </div>
            <button
              onClick={() => setPage("Collections")}
              style={{
                background: "none",
                border: "1.5px solid var(--brand)",
                color: "var(--brand)",
                padding: "8px 20px",
                borderRadius: 3,
                fontFamily: "Montserrat",
                fontWeight: 700,
                fontSize: 10,
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--brand)";
                e.currentTarget.style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "none";
                e.currentTarget.style.color = "var(--brand)";
              }}
            >
              View All
            </button>
          </div>
          <div className="product-grid-4">
            {featured.map((p, i) => (
              <div key={p.id} style={{ animationDelay: `${i * 0.06}s` }}>
                <ProductCard
                  product={p}
                  onAdd={onAddToCart}
                  onView={() => {}}
                  user={user}
                  onOpenAuth={onOpenAuth}
                  isWishlisted={isWishlisted}
                  onToggleWishlist={onToggleWishlist}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Free Gift Banner */}
      <div style={{ padding: "0 0 56px" }}>
        <div className="page-container">
          <div
            style={{
              background: "var(--brand)",
              borderRadius: 6,
              padding: "28px 36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 20,
            }}
          >
            <div>
              <p
                style={{
                  fontWeight: 800,
                  fontSize: 17,
                  color: "#fff",
                  marginBottom: 6,
                }}
              >
                🎁 FREE GIFT on orders above ₹999
              </p>
              <p
                style={{
                  fontWeight: 400,
                  fontSize: 12,
                  color: "rgba(255,255,255,0.78)",
                  lineHeight: 1.6,
                }}
              >
                Get a FREE Gold Plated Pearl Chain worth ₹399 — added
                automatically to your order!
              </p>
            </div>
            <button
              onClick={() => setPage("Collections")}
              style={{
                background: "#FFD700",
                color: "var(--brand)",
                border: "none",
                padding: "13px 30px",
                fontFamily: "Montserrat",
                fontWeight: 800,
                fontSize: 11,
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                borderRadius: 3,
                cursor: "pointer",
                flexShrink: 0,
                transition: "transform 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.04)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              Claim Now
            </button>
          </div>
        </div>
      </div>

      {/* Festive Combos Strip */}
      <div
        style={{
          background: "var(--sale-bg)",
          padding: "56px 0",
          borderTop: "1px solid var(--brand4)",
        }}
      >
        <div className="page-container">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginBottom: 28,
            }}
          >
            <div>
              <p
                style={{
                  fontSize: 10,
                  letterSpacing: "4px",
                  color: "var(--brand2)",
                  textTransform: "uppercase",
                  marginBottom: 8,
                }}
              >
                Special Deals
              </p>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 700,
                  fontSize: 28,
                  color: "var(--brand)",
                }}
              >
                Festive Combos
              </h2>
            </div>
            <button
              onClick={() => {
                setCollectionsTab("FestiveCombos");
                setPage("Collections");
              }}
              style={{
                background: "var(--brand)",
                color: "#fff",
                border: "none",
                padding: "10px 22px",
                fontFamily: "Montserrat",
                fontWeight: 700,
                fontSize: 10,
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                borderRadius: 3,
                cursor: "pointer",
              }}
            >
              View All
            </button>
          </div>
          <div className="product-grid-4">
            {PRODUCTS.FestiveCombos.slice(0, 4).map((p, i) => (
              <div key={p.id} style={{ animationDelay: `${i * 0.07}s` }}>
                <ProductCard
                  product={p}
                  onAdd={onAddToCart}
                  onView={() => {}}
                  user={user}
                  onOpenAuth={onOpenAuth}
                  isWishlisted={isWishlisted}
                  onToggleWishlist={onToggleWishlist}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <TestimonialsSection />
    </div>
  );
};

// ─── PAGE: COLLECTIONS ────────────────────────────────────────────────────────
const CollectionsPage = ({
  onAddToCart,
  onViewProduct,
  activeTab,
  setActiveTab,
  user,
  onOpenAuth,
  wishlist,
  onToggleWishlist,
  isWishlisted,
}) => {
  const [sort, setSort] = useState("Popularity");

  const tabs = [
    { key: "Rings" },
    { key: "Necklaces" },
    { key: "Earrings" },
    { key: "Bracelets" },
    { key: "Bangles" },
    { key: "Chains" },
    { key: "FestiveCombos" },
    { key: "Mangalsutra" },
    { key: "Watches" },
  ];

  const products = PRODUCTS[activeTab] || [];

  const sorted = [...products].sort((a, b) => {
    if (sort === "Price: Low to High") return a.price - b.price;
    if (sort === "Price: High to Low") return b.price - a.price;
    return 0;
  });

  const currentLabel =
    tabs.find((t) => t.key === activeTab)?.label || activeTab;

  return (
    <div style={{ width: "100%", paddingBottom: 60, boxSizing: "border-box" }}>
      {/* ── Tab bar — full bleed edge to edge ── */}
      <div
        style={{
          width: "100%",
          borderBottom: "2px solid var(--brand4)",
          background: "#fff",
          overflowX: "auto",
        }}
      >
        <div
          style={{
            display: "flex",
            padding: "0 24px",
            minWidth: "max-content",
          }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "Montserrat",
                fontWeight: 600,
                fontSize: 11,
                color:
                  activeTab === tab.key ? "var(--brand)" : "rgba(0,0,0,0.45)",
                padding: "14px 20px",
                whiteSpace: "nowrap",
                borderBottom:
                  activeTab === tab.key
                    ? "2px solid var(--brand)"
                    : "2px solid transparent",
                marginBottom: "-2px",
                transition: "all 0.2s",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Page content with padding ── */}
      <div style={{ padding: "24px 24px 0", boxSizing: "border-box" }}>
        {/* Breadcrumb + sort row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: 20,
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <div>
            <p
              style={{ fontSize: 11, color: "var(--brand2)", marginBottom: 6 }}
            >
              Home ›{" "}
              <strong style={{ color: "var(--brand)" }}>Collections</strong> ›{" "}
              {currentLabel}
            </p>
            <h1
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 700,
                fontSize: 26,
                color: "var(--brand)",
                lineHeight: 1,
              }}
            >
              {currentLabel}
            </h1>
            <p style={{ fontSize: 11, color: "var(--brand2)", marginTop: 4 }}>
              {sorted.length} products
            </p>
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            style={{
              border: "1px solid var(--brand4)",
              background: "#fff",
              padding: "8px 14px",
              fontFamily: "Montserrat",
              fontSize: 11,
              fontWeight: 600,
              color: "var(--brand)",
              borderRadius: 3,
              cursor: "pointer",
              outline: "none",
            }}
          >
            {[
              "Popularity",
              "Price: Low to High",
              "Price: High to Low",
              "Newest First",
            ].map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </div>

        {/* Product grid — 4 per row */}
        <div key={activeTab} className="product-grid-4">
          {sorted.map((product, i) => (
            <div key={product.id} style={{ animationDelay: `${i * 0.04}s` }}>
              <ProductCard
                product={product}
                onAdd={onAddToCart}
                onView={onViewProduct}
                user={user}
                onOpenAuth={onOpenAuth}
                isWishlisted={isWishlisted}
                onToggleWishlist={onToggleWishlist}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── PAGE: PRODUCT DETAIL ─────────────────────────────────────────────────────
const ProductDetailPage = ({
  product,
  onAddToCart,
  onBack,
  user,
  onOpenAuth,
}) => {
  const [mainImg, setMainImg] = useState(0);
  const [size, setSize] = useState("Free Size");
  const [added, setAdded] = useState(false);
  const [loginPrompt, setLoginPrompt] = useState(false);
  const disc = getDiscount(product.price, product.mrp);
  // The original code was appending Unsplash-specific parameters to all image URLs,
  // which would break if the image was not hosted on Unsplash.
  // To fix "image not found", we will use the base image URL for all thumbnails.
  // If different image variations are desired, they should be provided as separate URLs in the product data.
  const imgs = Array(4).fill(product.img); // Use the main image for all thumbnails

  const handleAdd = () => {
    if (!user) {
      setLoginPrompt(true);
      setTimeout(() => setLoginPrompt(false), 3000);
      return;
    }
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div
      className="page-container"
      style={{ paddingTop: 28, paddingBottom: 60 }}
    >
      <p
        style={{
          fontSize: 11,
          color: "var(--brand2)",
          marginBottom: 20,
          cursor: "pointer",
        }}
        onClick={onBack}
      >
        ← Back to Collections
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)",
          gap: 48,
          alignItems: "start",
        }}
      >
        {/* Images */}
        <div>
          <div
            style={{
              borderRadius: 6,
              overflow: "hidden",
              marginBottom: 12,
              border: "1px solid var(--brand4)",
              aspectRatio: "1",
              background: "#f5f0eb",
            }}
          >
            <img
              src={imgs[mainImg]}
              alt={product.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                display: "block",
              }}
            />
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {imgs.map((img, i) => (
              <div
                key={i}
                onClick={() => setMainImg(i)}
                style={{
                  flex: 1,
                  aspectRatio: "1",
                  borderRadius: 4,
                  overflow: "hidden",
                  cursor: "pointer",
                  border: `2px solid ${
                    mainImg === i ? "var(--brand)" : "var(--brand4)"
                  }`,
                  transition: "border-color 0.2s",
                }}
              >
                <img
                  src={img}
                  alt=""
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Details */}
        <div>
          <p
            style={{
              fontSize: 10,
              color: "var(--brand2)",
              letterSpacing: "3px",
              textTransform: "uppercase",
              marginBottom: 10,
            }}
          >
            SHETS JEWELLERS
          </p>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 600,
              fontSize: 26,
              color: "#111",
              marginBottom: 18,
              lineHeight: 1.3,
            }}
          >
            {product.name}
          </h1>

          <div style={{ marginBottom: 18 }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
              <span style={{ fontWeight: 800, fontSize: 30, color: "#000" }}>
                ₹{product.price}
              </span>
              <span
                style={{
                  fontWeight: 400,
                  fontSize: 14,
                  color: "rgba(0,0,0,0.3)",
                  textDecoration: "line-through",
                }}
              >
                ₹{product.mrp}
              </span>
              <span
                style={{
                  fontWeight: 700,
                  fontSize: 12,
                  color: "var(--sale-text)",
                  background: "var(--sale-bg)",
                  padding: "3px 8px",
                  borderRadius: 2,
                }}
              >
                {disc}% OFF
              </span>
            </div>
            <p
              style={{
                fontSize: 11,
                color: "var(--green)",
                marginTop: 6,
                fontWeight: 600,
              }}
            >
              ✓ You save ₹{product.mrp - product.price}
            </p>
          </div>

          <div
            style={{
              border: "1px dashed var(--green)",
              padding: "10px 14px",
              borderRadius: 4,
              marginBottom: 22,
              background: "#f8fff8",
            }}
          >
            <p style={{ fontSize: 11, color: "var(--green)", fontWeight: 600 }}>
              🏷 Apply code <strong>SHETS50</strong> for extra 50% off at
              checkout
            </p>
          </div>

          <div style={{ marginBottom: 22 }}>
            <p
              style={{
                fontSize: 10,
                fontWeight: 700,
                color: "var(--brand1)",
                textTransform: "uppercase",
                letterSpacing: "1px",
                marginBottom: 10,
              }}
            >
              Select Size
            </p>
            <div style={{ display: "flex", gap: 8 }}>
              {["Free Size"].map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  style={{
                    minWidth: 90,
                    padding: "10px 18px",
                    border: `1.5px solid ${
                      size === s ? "var(--brand)" : "var(--brand4)"
                    }`,
                    background: size === s ? "var(--brand5)" : "#fff",
                    color: size === s ? "var(--brand)" : "#111",
                    fontFamily: "Montserrat",
                    fontWeight: 600,
                    fontSize: 11,
                    borderRadius: 3,
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {loginPrompt ? (
            <div
              style={{
                background: "#fff8e1",
                border: "1px solid #ffe082",
                borderRadius: 6,
                padding: "14px 16px",
                marginBottom: 14,
                display: "flex",
                alignItems: "flex-start",
                gap: 10,
              }}
            >
              <span style={{ fontSize: 20 }}>🔒</span>
              <div>
                <p
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#e65100",
                    marginBottom: 5,
                  }}
                >
                  Please login to add items to your bag
                </p>
                <button
                  onClick={onOpenAuth}
                  style={{
                    padding: "8px 20px",
                    background: "var(--brand)",
                    color: "#fff",
                    border: "none",
                    fontFamily: "Montserrat",
                    fontWeight: 700,
                    fontSize: 10,
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    borderRadius: 3,
                    cursor: "pointer",
                  }}
                >
                  Login / Sign Up
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={handleAdd}
              style={{
                width: "100%",
                padding: "15px",
                background: added ? "#2b872f" : "var(--brand)",
                color: "#fff",
                border: "none",
                fontFamily: "Montserrat",
                fontWeight: 700,
                fontSize: 12,
                letterSpacing: "2.5px",
                textTransform: "uppercase",
                borderRadius: 3,
                cursor: "pointer",
                transition: "background 0.3s",
                marginBottom: 14,
              }}
            >
              {added ? "✓ Added to Bag!" : "Add to Bag"}
            </button>
          )}

          <div
            style={{
              border: "1px solid var(--brand4)",
              borderRadius: 4,
              overflow: "hidden",
              marginBottom: 22,
            }}
          >
            {[
              { icon: "🚚", text: "Delivered in 3–5 day" },
              { icon: "💵", text: "Cash on Delivery available" },
              { icon: "↩️", text: "Easy Returns within 3 days" },
            ].map((t, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "12px 16px",
                  borderBottom: i < 2 ? "1px solid var(--brand4)" : "none",
                  background: i % 2 === 0 ? "#fff" : "var(--brand5)",
                }}
              >
                <span style={{ fontSize: 16 }}>{t.icon}</span>
                <span
                  style={{
                    fontSize: 11,
                    color: "var(--brand1)",
                    fontWeight: 500,
                  }}
                >
                  {t.text}
                </span>
              </div>
            ))}
          </div>

          <div
            style={{
              border: "1px solid var(--brand4)",
              borderRadius: 4,
              padding: "18px 20px",
            }}
          >
            <p
              style={{
                fontWeight: 700,
                fontSize: 12,
                color: "var(--brand)",
                marginBottom: 14,
                letterSpacing: "0.5px",
                textTransform: "uppercase",
              }}
            >
              Product Details
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "12px 24px",
              }}
            >
              {[
                ["Plating", "High Gold"],
                ["Stone", "AD Diamond"],
                ["Occasion", "Daily Wear"],
                ["Items", "1 Piece"],
                ["Brand", "Shets Jewellers"],
                ["Origin", "India"],
              ].map(([k, v]) => (
                <div key={k}>
                  <p
                    style={{
                      fontSize: 10,
                      color: "rgba(0,0,0,0.38)",
                      marginBottom: 3,
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    {k}
                  </p>
                  <p style={{ fontSize: 12, fontWeight: 600, color: "#222" }}>
                    {v}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── BRIDAL CARD (standalone so hooks are legal) ──────────────────────────────
const BridalCard = ({ item, onAddToCart, user, onOpenAuth }) => {
  const [hovered, setHovered] = useState(false);
  const [added, setAdded] = useState(false);
  const [loginPrompt, setLoginPrompt] = useState(false);

  const handleAdd = () => {
    if (!user) {
      setLoginPrompt(true);
      setTimeout(() => setLoginPrompt(false), 2500);
      return;
    }
    onAddToCart(item);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#fff",
        border: `1px solid ${hovered ? "var(--brand3)" : "var(--brand4)"}`,
        borderRadius: 8,
        overflow: "hidden",
        boxShadow: hovered
          ? "0 10px 32px rgba(90,55,25,0.15)"
          : "0 2px 8px rgba(90,55,25,0.04)",
        transition: "all 0.3s",
      }}
    >
      <div style={{ position: "relative", overflow: "hidden" }}>
        <div
          style={{
            paddingBottom: "65%",
            position: "relative",
            background: "#f5f0eb",
          }}
        >
          <img
            src={item.img}
            alt={item.name}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              transform: hovered ? "scale(1.05)" : "scale(1)",
              transition: "transform 0.5s ease",
            }}
          />
        </div>
        <div
          style={{
            position: "absolute",
            top: 10,
            left: 10,
            background: "var(--brand)",
            color: "#fff",
            fontSize: 9,
            fontWeight: 700,
            padding: "3px 10px",
            borderRadius: 2,
            letterSpacing: "0.5px",
          }}
        >
          BRIDAL SPECIAL · 50% OFF
        </div>
      </div>
      <div style={{ padding: "18px 20px 20px" }}>
        <p
          style={{
            fontSize: 10,
            color: "var(--brand2)",
            marginBottom: 5,
            fontStyle: "italic",
          }}
        >
          {item.subtitle}
        </p>
        <h3
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 700,
            fontSize: 20,
            color: "var(--brand)",
            marginBottom: 12,
            lineHeight: 1.2,
          }}
        >
          {item.name}
        </h3>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 16,
          }}
        >
          <span style={{ fontWeight: 800, fontSize: 16 }}>{item.price}</span>
          <span
            style={{
              fontSize: 12,
              color: "rgba(0,0,0,0.32)",
              textDecoration: "line-through",
            }}
          >
            {item.mrp}
          </span>
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              color: "var(--sale-text)",
              background: "var(--sale-bg)",
              padding: "2px 7px",
              borderRadius: 2,
            }}
          >
            50% OFF
          </span>
        </div>
        {loginPrompt ? (
          <div
            style={{
              background: "#fff8e1",
              border: "1px solid #ffe082",
              borderRadius: 3,
              padding: "8px 10px",
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontSize: 10,
                fontWeight: 700,
                color: "#e65100",
                marginBottom: 4,
              }}
            >
              🔒 Please login to add items
            </p>
            <button
              onClick={onOpenAuth}
              style={{
                fontSize: 10,
                fontWeight: 700,
                color: "var(--brand)",
                background: "none",
                border: "none",
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              Login / Sign Up →
            </button>
          </div>
        ) : (
          <button
            onClick={handleAdd}
            style={{
              width: "100%",
              padding: "11px 0",
              border: `1.5px solid ${added ? "var(--green)" : "var(--brand)"}`,
              background: added ? "var(--green)" : "#fff",
              color: added ? "#fff" : "var(--brand)",
              fontFamily: "Montserrat",
              fontWeight: 700,
              fontSize: 10,
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              borderRadius: 3,
              cursor: "pointer",
              transition: "all 0.25s",
            }}
          >
            {added ? "✓ Added to Bag" : "Enquire / Add to Bag"}
          </button>
        )}
      </div>
    </div>
  );
};

// ─── PAGE: BRIDAL ─────────────────────────────────────────────────────────────
const BridalPage = ({ onAddToCart, user, onOpenAuth }) => {
  return (
    <div
      style={{
        width: "100%",
        padding: "28px 24px 60px",
        boxSizing: "border-box",
      }}
    >
      <p style={{ fontSize: 11, color: "var(--brand2)", marginBottom: 14 }}>
        Home › <strong style={{ color: "var(--brand)" }}>Bridal</strong>
      </p>
      <div
        style={{
          textAlign: "center",
          marginBottom: 40,
          padding: "48px 24px",
          background: `linear-gradient(135deg, rgba(90,55,25,0.06), rgba(90,55,25,0.02))`,
          border: "1px solid var(--brand4)",
          borderRadius: 8,
        }}
      >
        <p
          style={{
            fontSize: 10,
            color: "var(--brand2)",
            letterSpacing: "5px",
            textTransform: "uppercase",
            marginBottom: 14,
          }}
        >
          For Your Special Day
        </p>
        <h1
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 700,
            fontSize: 36,
            color: "var(--brand)",
            marginBottom: 12,
          }}
        >
          Bridal Collections
        </h1>
        <p
          style={{
            fontSize: 13,
            color: "var(--brand1)",
            maxWidth: 500,
            margin: "0 auto",
            lineHeight: 1.9,
          }}
        >
          Curated suites designed for the most precious moments of your life.
          Each set crafted with love, for the bride who deserves the best.
        </p>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 20,
        }}
      >
        {BRIDAL.map((item) => (
          <BridalCard
            key={item.id}
            item={item}
            onAddToCart={onAddToCart}
            user={user}
            onOpenAuth={onOpenAuth}
          />
        ))}
      </div>
    </div>
  );
};

// ─── FORM FIELD ───────────────────────────────────────────────────────────────
const Field = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  textarea,
}) => {
  const [focused, setFocused] = useState(false);
  const shared = {
    width: "100%",
    padding: "11px 14px",
    border: `1px solid ${focused ? "var(--brand)" : "var(--brand4)"}`,
    borderRadius: 3,
    fontFamily: "Montserrat",
    fontSize: 12,
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
    background: "#fff",
    color: "#111",
    resize: textarea ? "vertical" : "none",
    boxShadow: focused ? "0 0 0 3px var(--brand5)" : "none",
  };
  return (
    <div>
      <label
        style={{
          display: "block",
          fontSize: 9.5,
          fontWeight: 700,
          color: "var(--brand1)",
          letterSpacing: "1.5px",
          textTransform: "uppercase",
          marginBottom: 7,
        }}
      >
        {label}
      </label>
      {textarea ? (
        <textarea
          rows={4}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          style={shared}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          style={shared}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      )}
    </div>
  );
};

// ─── PAGE: CUSTOM ORDER ───────────────────────────────────────────────────────
const CustomOrderPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    description: "",
    budget: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    setActiveStep(["name", "email", "description", "budget"].indexOf(k) + 1);
  };

  const r1 = useReveal();
  const r2 = useReveal();
  const r3 = useReveal();
  const r4 = useReveal();

  const steps = [
    {
      icon: "✍️",
      title: "Share Your Vision",
      desc: "Tell us about the design, style and occasion you have in mind.",
    },
    {
      icon: "💎",
      title: "Master Craftsmen",
      desc: "Our artisans with 25+ years of experience bring your idea to life.",
    },
    {
      icon: "📦",
      title: "Delivered to You",
      desc: "Your bespoke piece arrives safely, ready to be cherished forever.",
    },
  ];

  return (
    <div style={{ width: "100%", overflow: "hidden" }}>
      {/* ── Animated Hero Banner ── */}
      <div
        style={{
          background:
            "linear-gradient(135deg, rgba(90,55,25,0.96) 0%, rgba(60,30,8,0.92) 100%)",
          padding: "60px 24px 50px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Floating decorative circles */}
        {[
          { size: 180, top: "-40px", left: "-40px", delay: "0s", dur: "6s" },
          { size: 120, top: "20px", right: "-20px", delay: "2s", dur: "8s" },
          { size: 80, bottom: "-20px", left: "30%", delay: "1s", dur: "7s" },
        ].map((c, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: c.size,
              height: c.size,
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.08)",
              top: c.top,
              left: c.left,
              right: c.right,
              bottom: c.bottom,
              animation: `float ${c.dur} ${c.delay} ease-in-out infinite`,
            }}
          />
        ))}
        {/* Floating jewel emojis */}
        {["💍", "✨", "💎", "🌸", "👑"].map((emoji, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              fontSize: 20,
              opacity: 0.2,
              top: `${15 + i * 15}%`,
              left: `${8 + i * 18}%`,
              animation: `particleDrift ${4 + i}s ${
                i * 0.7
              }s ease-in-out infinite`,
            }}
          >
            {emoji}
          </div>
        ))}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            animation: "fadeUp 0.8s ease",
          }}
        >
          <p
            style={{
              fontSize: 10,
              letterSpacing: "6px",
              color: "rgba(255,215,0,0.8)",
              textTransform: "uppercase",
              marginBottom: 14,
            }}
          >
            ✦ Bespoke Service ✦
          </p>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 700,
              fontSize: "clamp(28px,5vw,52px)",
              color: "#fff",
              marginBottom: 14,
              lineHeight: 1.1,
            }}
          >
            Custom Order Request
          </h1>
          <p
            style={{
              fontSize: 13,
              color: "rgba(255,255,255,0.72)",
              maxWidth: 420,
              margin: "0 auto",
              lineHeight: 1.9,
            }}
          >
            Tell us your vision and our master jewellers will craft something
            extraordinary, just for you.
          </p>
        </div>
      </div>

      {/* ── How it Works ── */}
      <div
        style={{
          background: "var(--brand5)",
          borderBottom: "1px solid var(--brand4)",
          padding: "44px 24px",
        }}
      >
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div
            ref={r1}
            className="reveal"
            style={{ textAlign: "center", marginBottom: 32 }}
          >
            <p
              style={{
                fontSize: 10,
                letterSpacing: "4px",
                color: "var(--brand2)",
                textTransform: "uppercase",
                marginBottom: 8,
              }}
            >
              The Process
            </p>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 700,
                fontSize: 26,
                color: "var(--brand)",
              }}
            >
              How It Works
            </h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 20,
            }}
          >
            {steps.map((step, i) => (
              <div
                key={i}
                ref={useReveal()}
                className="reveal"
                style={{ transitionDelay: `${i * 0.15}s` }}
              >
                <div
                  style={{
                    background: "#fff",
                    border: "1px solid var(--brand4)",
                    borderRadius: 12,
                    padding: "28px 20px",
                    textAlign: "center",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    animation: `fadeUp 0.6s ${i * 0.15}s ease both`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-6px)";
                    e.currentTarget.style.boxShadow =
                      "0 12px 32px rgba(90,55,25,0.14)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "none";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: "50%",
                      background: "var(--brand)",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 24,
                      margin: "0 auto 16px",
                      animation: `pulse 3s ${i * 0.5}s ease-in-out infinite`,
                    }}
                  >
                    {step.icon}
                  </div>
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      background: "var(--sale-bg)",
                      color: "var(--brand)",
                      fontSize: 11,
                      fontWeight: 800,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 12px",
                    }}
                  >
                    {i + 1}
                  </div>
                  <p
                    style={{
                      fontWeight: 700,
                      fontSize: 13,
                      color: "var(--brand)",
                      marginBottom: 8,
                    }}
                  >
                    {step.title}
                  </p>
                  <p
                    style={{
                      fontSize: 11,
                      color: "var(--brand1)",
                      lineHeight: 1.7,
                    }}
                  >
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Form ── */}
      <div style={{ padding: "48px 24px 60px" }}>
        <div style={{ width: "100%", maxWidth: 640, margin: "0 auto" }}>
          <p style={{ fontSize: 11, color: "var(--brand2)", marginBottom: 24 }}>
            Home ›{" "}
            <strong style={{ color: "var(--brand)" }}>Custom Order</strong>
          </p>

          {submitted ? (
            <div
              ref={r2}
              className="reveal-scale"
              style={{
                textAlign: "center",
                padding: "56px 32px",
                border: "1px solid var(--brand3)",
                borderRadius: 16,
                background: "var(--brand5)",
                animation: "bounceIn 0.7s ease",
              }}
            >
              <div
                style={{
                  fontSize: 64,
                  marginBottom: 20,
                  animation: "bounceIn 0.8s 0.2s ease both",
                }}
              >
                🎉
              </div>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 700,
                  fontSize: 28,
                  color: "var(--brand)",
                  marginBottom: 12,
                }}
              >
                Request Received!
              </h2>
              <p
                style={{
                  fontSize: 13,
                  color: "var(--brand1)",
                  lineHeight: 1.9,
                  marginBottom: 20,
                }}
              >
                Our team will reach out to{" "}
                <strong>{form.email || "you"}</strong> within 24 hours via
                WhatsApp or email.
              </p>
              <div
                style={{ display: "flex", gap: 8, justifyContent: "center" }}
              >
                {["📞", "✉️", "💬"].map((e, i) => (
                  <div
                    key={i}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      background: "var(--brand)",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 18,
                      animation: `bounceIn 0.5s ${0.4 + i * 0.15}s ease both`,
                      opacity: 0,
                    }}
                  >
                    {e}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div
              ref={r3}
              className="reveal"
              style={{
                background: "#fff",
                border: "1px solid var(--brand4)",
                borderRadius: 12,
                padding: "32px",
                boxShadow: "0 4px 24px rgba(90,55,25,0.06)",
              }}
            >
              {/* Progress dots */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 8,
                  marginBottom: 28,
                }}
              >
                {[1, 2, 3, 4].map((n) => (
                  <div
                    key={n}
                    style={{
                      width: n <= activeStep ? 24 : 8,
                      height: 8,
                      borderRadius: 4,
                      background:
                        n <= activeStep ? "var(--brand)" : "var(--brand4)",
                      transition: "all 0.4s ease",
                    }}
                  />
                ))}
              </div>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 20 }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 16,
                  }}
                >
                  <Field
                    label="Your Name"
                    value={form.name}
                    onChange={set("name")}
                    placeholder="Full name"
                  />
                  <Field
                    label="Email Address"
                    type="email"
                    value={form.email}
                    onChange={set("email")}
                    placeholder="you@example.com"
                  />
                </div>
                <Field
                  label="Design Description"
                  textarea
                  value={form.description}
                  onChange={set("description")}
                  placeholder="Describe your dream piece — style, occasion, inspirations..."
                />
                <Field
                  label="Budget Range"
                  value={form.budget}
                  onChange={set("budget")}
                  placeholder="e.g. ₹2,000 – ₹5,000"
                />
                <button
                  onClick={() => {
                    if (form.name && form.email) setSubmitted(true);
                  }}
                  style={{
                    padding: "14px",
                    background: "var(--brand)",
                    color: "#fff",
                    border: "none",
                    fontFamily: "Montserrat",
                    fontWeight: 700,
                    fontSize: 11,
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    borderRadius: 6,
                    cursor: "pointer",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    boxShadow: "0 4px 16px rgba(90,55,25,0.3)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow =
                      "0 8px 24px rgba(90,55,25,0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "none";
                    e.currentTarget.style.boxShadow =
                      "0 4px 16px rgba(90,55,25,0.3)";
                  }}
                >
                  Submit Request ✨
                </button>
              </div>
            </div>
          )}

          {/* WhatsApp strip */}
          <div
            ref={r4}
            className="reveal"
            style={{
              marginTop: 20,
              padding: "18px 22px",
              background: "linear-gradient(135deg, #e8f5e9, #f1f8e9)",
              border: "1px solid #c8e6c9",
              borderRadius: 12,
              display: "flex",
              alignItems: "center",
              gap: 16,
              animation: "fadeUp 0.6s 0.4s ease both",
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                background: "#25D366",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 22,
                flexShrink: 0,
                animation: "pulse 2s ease-in-out infinite",
              }}
            >
              💬
            </div>
            <div>
              <p
                style={{
                  fontWeight: 700,
                  fontSize: 13,
                  color: "#2e7d32",
                  marginBottom: 4,
                }}
              >
                Prefer WhatsApp?
              </p>
              <p style={{ fontSize: 12, color: "#388e3c", lineHeight: 1.6 }}>
                Chat with us: <strong>+91 76006 59791</strong> · Mon–Fri, 10 AM
                – 6 PM
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── PAGE: CONTACT ────────────────────────────────────────────────────────────
const ContactPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    date: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [hoveredInfo, setHoveredInfo] = useState(null);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const r1 = useReveal();
  const r2 = useReveal();
  const r3 = useReveal();
  const r4 = useReveal();

  const contactInfo = [
    {
      icon: "📍",
      label: "Address",
      value:
        "Shrinathji Imitation, Pushkardham Main Road,\nKalawad Road, Rajkot – 360005, Gujarat",
      color: "#ff6b6b",
    },
    {
      icon: "📞",
      label: "Phone / WhatsApp",
      value: "+91 8618713231",
      color: "#25D366",
    },
    {
      icon: "✉️",
      label: "Email",
      value: "shets@jewellers.com",
      color: "#4285F4",
    },
    {
      icon: "🕐",
      label: "Store Hours",
      value: "Mon–Fri: 10 AM – 6 PM\nSun: By appointment only",
      color: "#F5A623",
    },
  ];

  return (
    <div style={{ width: "100%", overflow: "hidden" }}>
      {/* ── Animated Hero ── */}
      <div
        style={{
          background:
            "linear-gradient(135deg, rgba(90,55,25,0.95), rgba(50,25,5,0.9))",
          padding: "52px 24px 44px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {["💎", "✨", "💍", "🌸", "⭐", "👑"].map((e, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              fontSize: 18,
              opacity: 0.15,
              top: `${10 + i * 14}%`,
              left: `${5 + i * 16}%`,
              animation: `float ${5 + i}s ${i * 0.6}s ease-in-out infinite`,
            }}
          >
            {e}
          </div>
        ))}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            animation: "fadeUp 0.8s ease",
          }}
        >
          <p
            style={{
              fontSize: 10,
              letterSpacing: "6px",
              color: "rgba(255,215,0,0.8)",
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            ✦ Get in Touch ✦
          </p>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 700,
              fontSize: "clamp(26px,5vw,48px)",
              color: "#fff",
              marginBottom: 10,
            }}
          >
            Contact & Appointments
          </h1>
          <p
            style={{
              fontSize: 13,
              color: "rgba(255,255,255,0.7)",
              maxWidth: 400,
              margin: "0 auto",
            }}
          >
            We'd love to hear from you. Visit us or book an appointment.
          </p>
        </div>
      </div>

      {/* ── Stats bar ── */}
      <div style={{ background: "var(--brand)", padding: "20px 24px" }}>
        <div
          style={{
            maxWidth: 900,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: 16,
            textAlign: "center",
          }}
        >
          {[
            { val: 25, suffix: "+", label: "Years" },
            { val: 500000, suffix: "+", label: "Happy Customers" },
            { val: 50, suffix: "%", label: "Off Today" },
            { val: 3, suffix: "-5", label: "Day Delivery" },
          ].map((s, i) => (
            <div
              key={i}
              style={{ animation: `fadeUp 0.6s ${i * 0.1}s ease both` }}
            >
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 28,
                  fontWeight: 700,
                  color: "#FFD700",
                }}
              >
                <AnimatedCounter target={s.val} suffix={s.suffix} />
              </p>
              <p
                style={{
                  fontSize: 10,
                  color: "rgba(255,255,255,0.7)",
                  fontWeight: 600,
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                }}
              >
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div
        className="page-container"
        style={{ paddingTop: 48, paddingBottom: 60 }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 48,
            alignItems: "start",
          }}
        >
          {/* ── Info side ── */}
          <div>
            <div ref={r1} className="reveal-left">
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 700,
                  fontSize: 24,
                  color: "var(--brand)",
                  marginBottom: 24,
                  paddingBottom: 12,
                  borderBottom: "2px solid var(--brand4)",
                }}
              >
                Shets Jewellers
              </h2>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 14,
                marginBottom: 28,
              }}
            >
              {contactInfo.map(({ icon, label, value, color }, i) => (
                <div
                  key={label}
                  ref={useReveal()}
                  className="reveal-left"
                  style={{ transitionDelay: `${i * 0.12}s` }}
                  onMouseEnter={() => setHoveredInfo(i)}
                  onMouseLeave={() => setHoveredInfo(null)}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: 14,
                      padding: "14px 16px",
                      borderRadius: 10,
                      border: `1px solid ${
                        hoveredInfo === i ? color + "44" : "var(--brand4)"
                      }`,
                      background: hoveredInfo === i ? color + "08" : "#fff",
                      transition: "all 0.3s",
                      cursor: "default",
                      transform: hoveredInfo === i ? "translateX(4px)" : "none",
                    }}
                  >
                    <div
                      style={{
                        width: 42,
                        height: 42,
                        borderRadius: 10,
                        background:
                          hoveredInfo === i ? color + "18" : "var(--brand5)",
                        border: `1px solid ${
                          hoveredInfo === i ? color + "44" : "var(--brand4)"
                        }`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 18,
                        flexShrink: 0,
                        transition: "all 0.3s",
                        animation:
                          hoveredInfo === i
                            ? "pulse 1s ease-in-out infinite"
                            : "none",
                      }}
                    >
                      {icon}
                    </div>
                    <div>
                      <p
                        style={{
                          fontSize: 9,
                          fontWeight: 700,
                          color: hoveredInfo === i ? color : "var(--brand2)",
                          letterSpacing: "2px",
                          textTransform: "uppercase",
                          marginBottom: 5,
                          transition: "color 0.3s",
                        }}
                      >
                        {label}
                      </p>
                      <p
                        style={{
                          fontSize: 12,
                          color: "#444",
                          lineHeight: 1.75,
                          whiteSpace: "pre-line",
                        }}
                      >
                        {value}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Social */}
            <div ref={r2} className="reveal-left">
              <p
                style={{
                  fontSize: 9,
                  fontWeight: 700,
                  color: "var(--brand2)",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  marginBottom: 12,
                }}
              >
                Follow Us
              </p>
              <div style={{ display: "flex", gap: 10 }}>
                {[
                  { label: "📘 Facebook", color: "#1877F2" },
                  { label: "📸 Instagram", color: "#E1306C" },
                  { label: "▶ YouTube", color: "#FF0000" },
                ].map((s, i) => (
                  <button
                    key={i}
                    style={{
                      background: "var(--brand5)",
                      border: "1px solid var(--brand4)",
                      color: "var(--brand)",
                      padding: "8px 14px",
                      fontSize: 10,
                      fontWeight: 600,
                      borderRadius: 6,
                      cursor: "pointer",
                      fontFamily: "Montserrat",
                      transition: "all 0.2s",
                      animation: `fadeUp 0.5s ${0.5 + i * 0.1}s ease both`,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = s.color;
                      e.currentTarget.style.color = "#fff";
                      e.currentTarget.style.borderColor = s.color;
                      e.currentTarget.style.transform = "translateY(-3px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "var(--brand5)";
                      e.currentTarget.style.color = "var(--brand)";
                      e.currentTarget.style.borderColor = "var(--brand4)";
                      e.currentTarget.style.transform = "none";
                    }}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ── Booking form ── */}
          <div ref={r3} className="reveal-right">
            <div
              style={{
                background: "#fff",
                border: "1px solid var(--brand4)",
                borderRadius: 16,
                padding: "32px",
                boxShadow: "0 8px 40px rgba(90,55,25,0.08)",
                transition: "box-shadow 0.3s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.boxShadow =
                  "0 16px 56px rgba(90,55,25,0.13)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.boxShadow =
                  "0 8px 40px rgba(90,55,25,0.08)")
              }
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 24,
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: "var(--brand)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 20,
                    animation: "pulse 3s ease-in-out infinite",
                  }}
                >
                  📅
                </div>
                <h2
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 700,
                    fontSize: 22,
                    color: "var(--brand)",
                  }}
                >
                  Book a Store Visit
                </h2>
              </div>

              {submitted ? (
                <div
                  style={{
                    textAlign: "center",
                    padding: "32px 0",
                    animation: "bounceIn 0.7s ease",
                  }}
                >
                  <div
                    style={{
                      fontSize: 56,
                      marginBottom: 16,
                      animation: "bounceIn 0.6s 0.2s ease both",
                    }}
                  >
                    🎊
                  </div>
                  <p
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontWeight: 700,
                      fontSize: 24,
                      color: "var(--brand)",
                      marginBottom: 10,
                    }}
                  >
                    Appointment Confirmed!
                  </p>
                  <p
                    style={{
                      fontSize: 12,
                      color: "var(--brand1)",
                      lineHeight: 1.7,
                    }}
                  >
                    We'll send a confirmation to <strong>{form.email}</strong>{" "}
                    shortly.
                  </p>
                  <div
                    style={{
                      marginTop: 16,
                      padding: "10px 16px",
                      background: "var(--brand5)",
                      border: "1px solid var(--brand4)",
                      borderRadius: 8,
                      fontSize: 11,
                      color: "var(--brand1)",
                    }}
                  >
                    📞 We may also call you on the day before to confirm.
                  </div>
                </div>
              ) : (
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 18 }}
                >
                  <Field
                    label="Your Name"
                    value={form.name}
                    onChange={set("name")}
                    placeholder="Full name"
                  />
                  <Field
                    label="Email"
                    type="email"
                    value={form.email}
                    onChange={set("email")}
                    placeholder="your@email.com"
                  />
                  <Field
                    label="Preferred Date"
                    type="date"
                    value={form.date}
                    onChange={set("date")}
                  />
                  <Field
                    label="Message (Optional)"
                    textarea
                    value={form.message}
                    onChange={set("message")}
                    placeholder="Any specific pieces or queries?"
                  />
                  <button
                    onClick={() => {
                      if (form.name && form.email) setSubmitted(true);
                    }}
                    style={{
                      padding: "14px",
                      background: "var(--brand)",
                      color: "#fff",
                      border: "none",
                      fontFamily: "Montserrat",
                      fontWeight: 700,
                      fontSize: 11,
                      letterSpacing: "2px",
                      textTransform: "uppercase",
                      borderRadius: 8,
                      cursor: "pointer",
                      transition: "transform 0.2s, box-shadow 0.2s",
                      boxShadow: "0 4px 16px rgba(90,55,25,0.3)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow =
                        "0 8px 24px rgba(90,55,25,0.4)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "none";
                      e.currentTarget.style.boxShadow =
                        "0 4px 16px rgba(90,55,25,0.3)";
                    }}
                  >
                    Book Appointment 📅
                  </button>
                </div>
              )}
            </div>

            {/* Quick contact card */}
            <div
              ref={r4}
              className="reveal"
              style={{
                marginTop: 16,
                padding: "16px 20px",
                background:
                  "linear-gradient(135deg, rgba(90,55,25,0.05), rgba(90,55,25,0.02))",
                border: "1px solid var(--brand4)",
                borderRadius: 10,
                display: "flex",
                alignItems: "center",
                gap: 14,
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  background: "#25D366",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 22,
                  flexShrink: 0,
                  animation: "pulse 2.5s ease-in-out infinite",
                }}
              >
                💬
              </div>
              <div>
                <p
                  style={{
                    fontWeight: 700,
                    fontSize: 12,
                    color: "var(--brand)",
                    marginBottom: 3,
                  }}
                >
                  Prefer a quick chat?
                </p>
                <p style={{ fontSize: 11, color: "var(--brand1)" }}>
                  WhatsApp: <strong>+91 76006 59791</strong> · Mon–Fri 10–6
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── POLICY PAGE DATA ─────────────────────────────────────────────────────────
const POLICY_CONTENT = {
  "About Us": {
    icon: "💎",
    hero: "Our Story",
    subtitle: "25+ Years of Crafting Dreams",
    color: "#5a3719",
    sections: [
      {
        title: "Who We Are",
        content:
          "Shets Jewellers was founded in 1999 in the heart of Rajkot, Gujarat — India's jewellery capital. What began as a small family workshop has grown into one of the most trusted names in premium imitation and gold-plated jewellery, serving over 5,00,000 happy customers across India.",
      },
      {
        title: "Our Craft",
        content:
          "Every piece at Shets Jewellers is handcrafted by master artisans who have inherited generations of jewellery-making knowledge. We combine traditional Indian craftsmanship with modern design sensibilities to create jewellery that is both timeless and contemporary.",
      },
      {
        title: "Our Promise",
        content:
          "We believe every woman deserves to feel like royalty — without spending a fortune. Our jewellery is made with the finest materials: high gold plating, AD diamonds, and hand-set stones that capture the brilliance of precious gems at a fraction of the cost.",
      },
      {
        title: "Why Choose Us",
        content:
          "✦ 25+ years of excellence\n✦ 5,00,000+ happy orders delivered\n✦ ISO-certified quality standards\n✦ Cash on delivery available\n✦ Easy 3-day return & exchange\n✦ Free delivery on orders above ₹499\n✦ Dedicated customer support 6 days a week",
      },
      {
        title: "Visit Us",
        content:
          "Come experience our collection in person at our flagship store in Rajkot.\n\nShrinathji Imitation, Pushkardham Main Road,\nKalawad Road, Rajkot – 360005, Gujarat\n\nMon–Fri: 10 AM – 6 PM | Sun: By appointment only\n📞 +91 76006 59791",
      },
    ],
  },
  "Privacy Policy": {
    icon: "🔒",
    hero: "Privacy Policy",
    subtitle: "Your privacy is our priority",
    color: "#1565C0",
    sections: [
      {
        title: "Information We Collect",
        content:
          "We collect information you provide directly to us, such as your name, email address, phone number, shipping address, and payment information when you make a purchase or create an account. We also automatically collect certain information about your device and how you interact with our website.",
      },
      {
        title: "How We Use Your Information",
        content:
          "We use the information we collect to:\n✦ Process and fulfill your orders\n✦ Send order confirmations and shipping updates\n✦ Respond to your comments and questions\n✦ Send promotional communications (with your consent)\n✦ Improve and personalise your shopping experience\n✦ Detect and prevent fraudulent transactions",
      },
      {
        title: "Information Sharing",
        content:
          "We do not sell, trade, or rent your personal information to third parties. We may share your information with trusted service providers who assist us in operating our website, conducting our business, and serving our customers — all subject to strict confidentiality agreements.",
      },
      {
        title: "Data Security",
        content:
          "We implement industry-standard security measures to protect your personal information against unauthorised access, alteration, disclosure, or destruction. All sensitive data is encrypted using SSL technology. However, no method of transmission over the Internet is 100% secure.",
      },
      {
        title: "Your Rights",
        content:
          "You have the right to:\n✦ Access your personal data\n✦ Correct inaccurate data\n✦ Request deletion of your data\n✦ Opt out of marketing communications\n✦ Lodge a complaint with a supervisory authority\n\nTo exercise any of these rights, contact us at shets@jewellers.com",
      },
      {
        title: "Cookies",
        content:
          "We use cookies and similar tracking technologies to track activity on our website and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. If you do not accept cookies, some portions of our service may not function properly.",
      },
      {
        title: "Contact Us",
        content:
          "If you have any questions about this Privacy Policy, please contact us at:\n\nShets Jewellers\n📧 shets@jewellers.com\n📞 +91 76006 59791",
      },
    ],
  },
  "Return Policy": {
    icon: "↩️",
    hero: "Return & Exchange Policy",
    subtitle: "Shop with complete confidence",
    color: "#2e7d32",
    sections: [
      {
        title: "Our Return Window",
        content:
          "We offer a hassle-free 3-day return and exchange policy from the date of delivery. If you are not completely satisfied with your purchase, you may return it within 3 days for an exchange or store credit.",
      },
      {
        title: "Eligibility for Returns",
        content:
          "To be eligible for a return, your item must be:\n✦ Unused and in the same condition you received it\n✦ In its original packaging with all tags intact\n✦ Accompanied by the original receipt or proof of purchase\n✦ Not a customised or bespoke order (custom orders are non-returnable)",
      },
      {
        title: "How to Initiate a Return",
        content:
          "Step 1: WhatsApp us at +91 76006 59791 within 3 days of delivery\nStep 2: Share your order ID and photos of the item\nStep 3: Our team will confirm the return within 24 hours\nStep 4: Ship the item back (we'll provide the address)\nStep 5: Exchange or store credit processed within 3–5 business days",
      },
      {
        title: "Non-Returnable Items",
        content:
          "The following items cannot be returned:\n✦ Customised or personalised jewellery\n✦ Items marked as final sale\n✦ Items that have been worn, used, or altered\n✦ Gift cards\n✦ Items returned after the 3-day window",
      },
      {
        title: "Damaged or Defective Items",
        content:
          "If you receive a damaged or defective item, please contact us immediately at shets@jewellers.com or WhatsApp us with photos. We will arrange a replacement or full refund at no additional cost to you.",
      },
      {
        title: "Refund Processing",
        content:
          "Refunds are issued as store credit or product exchange. Cash refunds are processed to the original payment method within 5–7 business days if applicable. Shipping charges are non-refundable unless the return is due to our error.",
      },
    ],
  },
  "Shipping Policy": {
    icon: "🚚",
    hero: "Shipping Policy",
    subtitle: "Fast, reliable delivery across India",
    color: "#E65100",
    sections: [
      {
        title: "Delivery Timeframe",
        content:
          "Orders are typically delivered within 3–5 business days across India. Metropolitan cities (Mumbai, Delhi, Bangalore, Hyderabad, Chennai, Kolkata) may receive delivery in 2–3 business days. Remote areas may take up to 7 business days.",
      },
      {
        title: "Shipping Charges",
        content:
          "✦ Orders above ₹499 — FREE shipping\n✦ Orders below ₹499 — ₹49 flat shipping fee\n✦ Express delivery (1–2 days) — ₹99 additional charge (select cities)\n\nAll prices are inclusive of taxes.",
      },
      {
        title: "Order Processing",
        content:
          "Orders placed before 2 PM IST on business days are processed the same day. Orders placed after 2 PM or on weekends/holidays are processed the next business day. You will receive an order confirmation email and a shipping notification with tracking details.",
      },
      {
        title: "Tracking Your Order",
        content:
          "Once your order is shipped, you will receive a WhatsApp message and email with your tracking number and courier partner details. You can track your order directly on the courier's website or contact us at +91 76006 59791 for updates.",
      },
      {
        title: "Cash on Delivery",
        content:
          "We offer Cash on Delivery (COD) on all orders across India. COD is available for orders up to ₹5,000. Please ensure someone is available at the delivery address to accept and pay for the order. A COD convenience fee of ₹30 may apply.",
      },
      {
        title: "Delivery Issues",
        content:
          "If your order has not arrived within the expected timeframe, please contact us at shets@jewellers.com or WhatsApp +91 76006 59791. We will investigate and resolve the issue within 24–48 hours.",
      },
    ],
  },
  "Terms & Conditions": {
    icon: "📋",
    hero: "Terms & Conditions",
    subtitle: "Please read these terms carefully",
    color: "#4A148C",
    sections: [
      {
        title: "Acceptance of Terms",
        content:
          "By accessing and using the Shets Jewellers website and services, you accept and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.",
      },
      {
        title: "Products and Pricing",
        content:
          "All products are subject to availability. We reserve the right to modify or discontinue any product without notice. Prices are in Indian Rupees (INR) and are inclusive of applicable taxes. We reserve the right to change prices at any time without prior notice.",
      },
      {
        title: "Orders and Payment",
        content:
          "By placing an order, you confirm that the information provided is accurate and complete. We accept UPI, credit/debit cards, net banking, and Cash on Delivery. Orders are confirmed only after successful payment or COD confirmation. We reserve the right to cancel any order at our discretion.",
      },
      {
        title: "Intellectual Property",
        content:
          "All content on this website — including images, logos, text, and designs — is the exclusive property of Shets Jewellers and is protected by Indian and international copyright laws. Unauthorised reproduction, distribution, or use of any content is strictly prohibited.",
      },
      {
        title: "Limitation of Liability",
        content:
          "Shets Jewellers shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our products or services. Our maximum liability shall not exceed the purchase price of the specific product that gave rise to the claim.",
      },
      {
        title: "Governing Law",
        content:
          "These Terms and Conditions are governed by the laws of India. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts in Rajkot, Gujarat, India.",
      },
      {
        title: "Changes to Terms",
        content:
          "We reserve the right to update these Terms and Conditions at any time. Changes will be effective immediately upon posting to the website. Your continued use of our services after any changes constitutes acceptance of the new terms.",
      },
      {
        title: "Contact Us",
        content:
          "For any questions about these Terms and Conditions, please contact:\n\nShets Jewellers\n📧 shets@jewellers.com\n📞 +91 76006 59791\nRajkot, Gujarat – 360005",
      },
    ],
  },
};

// ─── POLICY PAGE COMPONENT ────────────────────────────────────────────────────
const PolicyPage = ({ policyKey, onBack }) => {
  const policy = POLICY_CONTENT[policyKey];
  const [activeSection, setActiveSection] = useState(null);
  const r1 = useReveal();

  if (!policy) return null;

  return (
    <div style={{ width: "100%", overflow: "hidden" }}>
      {/* ── Hero ── */}
      <div
        style={{
          background: `linear-gradient(135deg, ${policy.color}ee 0%, ${policy.color}bb 100%)`,
          padding: "52px 24px 44px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: 100 + i * 60,
              height: 100 + i * 60,
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.08)",
              top: "50%",
              left: "50%",
              marginTop: -(50 + i * 30),
              marginLeft: -(50 + i * 30),
              animation: `spin ${15 + i * 5}s linear infinite`,
            }}
          />
        ))}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            animation: "fadeUp 0.7s ease",
          }}
        >
          <div
            style={{
              fontSize: 48,
              marginBottom: 16,
              animation: "bounceIn 0.8s ease",
            }}
          >
            {policy.icon}
          </div>
          <p
            style={{
              fontSize: 10,
              letterSpacing: "5px",
              color: "rgba(255,255,255,0.7)",
              textTransform: "uppercase",
              marginBottom: 10,
            }}
          >
            Shets Jewellers
          </p>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 700,
              fontSize: "clamp(24px,5vw,48px)",
              color: "#fff",
              marginBottom: 10,
              lineHeight: 1.1,
            }}
          >
            {policy.hero}
          </h1>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.75)" }}>
            {policy.subtitle}
          </p>
        </div>
      </div>

      <div
        className="page-container"
        style={{ paddingTop: 40, paddingBottom: 60 }}
      >
        {/* Back breadcrumb */}
        <p
          style={{
            fontSize: 11,
            color: "var(--brand2)",
            marginBottom: 32,
            cursor: "pointer",
          }}
          onClick={onBack}
        >
          ←{" "}
          <span style={{ color: "var(--brand)", fontWeight: 600 }}>
            Back to Home
          </span>
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "260px 1fr",
            gap: 40,
            alignItems: "start",
          }}
        >
          {/* ── Sticky sidebar ── */}
          <div
            ref={r1}
            className="reveal-left"
            style={{ position: "sticky", top: 100 }}
          >
            <div
              style={{
                background: "var(--brand5)",
                border: "1px solid var(--brand4)",
                borderRadius: 12,
                padding: "20px 16px",
              }}
            >
              <p
                style={{
                  fontSize: 9,
                  fontWeight: 700,
                  color: "var(--brand2)",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  marginBottom: 14,
                }}
              >
                Contents
              </p>
              {policy.sections.map((sec, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setActiveSection(i);
                    document
                      .getElementById(`section-${i}`)
                      ?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                  style={{
                    display: "block",
                    width: "100%",
                    textAlign: "left",
                    padding: "9px 12px",
                    background:
                      activeSection === i ? "var(--brand)" : "transparent",
                    color: activeSection === i ? "#fff" : "var(--brand1)",
                    border: "none",
                    borderRadius: 6,
                    cursor: "pointer",
                    fontFamily: "Montserrat",
                    fontSize: 11,
                    fontWeight: 500,
                    marginBottom: 4,
                    transition: "all 0.2s",
                    lineHeight: 1.4,
                  }}
                  onMouseEnter={(e) => {
                    if (activeSection !== i) {
                      e.currentTarget.style.background = "var(--brand4)";
                      e.currentTarget.style.color = "var(--brand)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeSection !== i) {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = "var(--brand1)";
                    }
                  }}
                >
                  {i + 1}. {sec.title}
                </button>
              ))}
            </div>
          </div>

          {/* ── Content sections ── */}
          <div>
            {policy.sections.map((sec, i) => (
              <div
                key={i}
                id={`section-${i}`}
                ref={useReveal()}
                className="reveal"
                style={{ marginBottom: 28, transitionDelay: `${i * 0.07}s` }}
              >
                <div
                  style={{
                    background: "#fff",
                    border: "1px solid var(--brand4)",
                    borderRadius: 12,
                    overflow: "hidden",
                    transition: "box-shadow 0.25s, transform 0.25s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 8px 32px rgba(90,55,25,0.1)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.transform = "none";
                  }}
                >
                  {/* Section header */}
                  <div
                    style={{
                      background: `${policy.color}0d`,
                      borderBottom: "1px solid var(--brand4)",
                      padding: "16px 22px",
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                    }}
                  >
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        background: policy.color,
                        color: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 11,
                        fontWeight: 800,
                        flexShrink: 0,
                      }}
                    >
                      {i + 1}
                    </div>
                    <h2
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontWeight: 700,
                        fontSize: 18,
                        color: policy.color,
                      }}
                    >
                      {sec.title}
                    </h2>
                  </div>
                  {/* Section body */}
                  <div style={{ padding: "20px 22px" }}>
                    <p
                      style={{
                        fontSize: 13,
                        color: "#444",
                        lineHeight: 1.9,
                        whiteSpace: "pre-line",
                      }}
                    >
                      {sec.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Last updated */}
            <div
              style={{
                background: "var(--brand5)",
                border: "1px solid var(--brand4)",
                borderRadius: 8,
                padding: "14px 18px",
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <span style={{ fontSize: 16 }}>📅</span>
              <p style={{ fontSize: 11, color: "var(--brand2)" }}>
                Last updated:{" "}
                <strong style={{ color: "var(--brand)" }}>January 2025</strong>{" "}
                · For questions, contact{" "}
                <strong style={{ color: "var(--brand)" }}>
                  shets@jewellers.com
                </strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const Footer = ({ setPage, onPolicyPage }) => (
  <footer>
    <div
      style={{
        background: "var(--brand)",
        color: "#fff",
        padding: "48px 0 24px",
      }}
    >
      <div className="page-container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1.2fr",
            gap: 40,
            marginBottom: 36,
          }}
        >
          <div>
            <div style={{ marginBottom: 16 }}>
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 700,
                  fontSize: 28,
                  letterSpacing: "3px",
                }}
              >
                SHETS
              </p>
              <p
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 500,
                  fontSize: 8,
                  letterSpacing: "5px",
                  opacity: 0.6,
                }}
              >
                JEWELLERS
              </p>
            </div>
            <p
              style={{
                fontSize: 11,
                lineHeight: 1.9,
                opacity: 0.78,
                maxWidth: 280,
              }}
            >
              25+ years of excellence. 5,00,000+ happy orders. Premium jewellery
              at prices that feel like a celebration.
            </p>
            <div style={{ marginTop: 20, display: "flex", gap: 10 }}>
              {/* {["📘", "📸", "▶"].map((icon, i) => ( */}
              {[
                { icon: "📘", url: "https://www.facebook.com/" },
                { icon: "📸", url: "https://www.instagram.com/" },
                { icon: "▶", url: "https://www.youtube.com/" },
              ].map(({ icon, url }, i) => (
                <div
                  key={i}
                  onClick={() => window.open(url, "_blank")}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.12)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 13,
                    cursor: "pointer",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background =
                      "rgba(255,255,255,0.25)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background =
                      "rgba(255,255,255,0.12)")
                  }
                >
                  {icon}
                </div>
              ))}
            </div>
          </div>
          <div>
            <p
              style={{
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: "2.5px",
                textTransform: "uppercase",
                opacity: 0.55,
                marginBottom: 16,
              }}
            >
              Navigate
            </p>
            {["Home", "Collections", "Bridal", "Custom Order", "Contact"].map(
              (item) => (
                <p
                  key={item}
                  onClick={() => setPage(item)}
                  style={{
                    fontSize: 11,
                    opacity: 0.78,
                    marginBottom: 12,
                    cursor: "pointer",
                    transition: "opacity 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.78")}
                >
                  {item}
                </p>
              )
            )}
          </div>
          <div>
            <p
              style={{
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: "2.5px",
                textTransform: "uppercase",
                opacity: 0.55,
                marginBottom: 16,
              }}
            >
              Shop
            </p>
            {[
              "Bangles",
              "Chains",
              "Earrings",
              "Necklaces",
              "Rings",
              "Watches",
            ].map((item) => (
              <p
                key={item}
                style={{
                  fontSize: 11,
                  opacity: 0.78,
                  marginBottom: 12,
                  cursor: "pointer",
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.78")}
              >
                {item}
              </p>
            ))}
          </div>
          <div>
            <p
              style={{
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: "2.5px",
                textTransform: "uppercase",
                opacity: 0.55,
                marginBottom: 16,
              }}
            >
              Contact
            </p>
            <p
              style={{
                fontSize: 11,
                opacity: 0.78,
                marginBottom: 10,
                lineHeight: 1.6,
              }}
            >
              📞 +91 8618713231
            </p>
            <p style={{ fontSize: 11, opacity: 0.78, marginBottom: 10 }}>
              ✉️ shets@jewellers.com
            </p>
            <p style={{ fontSize: 10, opacity: 0.6, lineHeight: 1.7 }}>
              Rajkot, Gujarat – 360005
            </p>
            <p style={{ fontSize: 10, opacity: 0.6, marginTop: 6 }}>
              Mon–Fri · 10 AM – 6 PM
            </p>
            <div
              style={{
                marginTop: 16,
                background: "rgba(255,255,255,0.1)",
                borderRadius: 4,
                padding: "10px 14px",
              }}
            >
              <p style={{ fontSize: 10, opacity: 0.85, fontWeight: 600 }}>
                💬 WhatsApp us anytime
              </p>
              <p style={{ fontSize: 11, fontWeight: 700, marginTop: 3 }}>
                +91 76006 59791
              </p>
            </div>
          </div>
        </div>

        {/* ── Policy links — fully clickable ── */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.15)",
            paddingTop: 18,
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "6px 4px",
            marginBottom: 18,
          }}
        >
          {[
            "About Us",
            "Privacy Policy",
            "Return Policy",
            "Shipping Policy",
            "Terms & Conditions",
          ].map((item, i) => (
            <span
              key={item}
              style={{ display: "flex", alignItems: "center", gap: 4 }}
            >
              {i > 0 && (
                <span style={{ color: "rgba(255,255,255,0.2)", fontSize: 12 }}>
                  ·
                </span>
              )}
              <span
                onClick={() => onPolicyPage(item)}
                style={{
                  fontSize: 10,
                  color: "rgba(255,255,255,0.65)",
                  cursor: "pointer",
                  padding: "3px 6px",
                  borderRadius: 4,
                  transition: "all 0.2s",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#fff";
                  e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                  e.currentTarget.style.textDecoration = "underline";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "rgba(255,255,255,0.65)";
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.textDecoration = "none";
                }}
              >
                {item}
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
    <div
      style={{
        background: "rgba(50,25,5,1)",
        padding: "14px 24px",
        textAlign: "center",
      }}
    >
      <p style={{ fontSize: 10, color: "rgba(255,255,255,0.4)" }}>
        © 2025 Shets Jewellers · All rights reserved · Made with ❤️ in India
      </p>
    </div>
  </footer>
);

// ─── APP ROOT ─────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("Home");
  const [cartItems, setCartItems] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [collectionsTab, setCollectionsTab] = useState("Rings");
  const [policyPage, setPolicyPage] = useState(null); // "About Us" | "Privacy Policy" | etc.

  // Modal state
  const [showSearch, setShowSearch] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [user, setUser] = useState(null);

  const [orders, setOrders] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const navigateTo = (p) => {
    setPage(p);
    setPolicyPage(null);
    setSelectedProduct(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openPolicyPage = (key) => {
    setPolicyPage(key);
    setPage("Policy");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const addToCart = (product) => setCartItems((prev) => [...prev, product]);
  const removeFromCart = (idx) =>
    setCartItems((prev) => prev.filter((_, i) => i !== idx));
  const clearCart = () => setCartItems([]);
  const placeOrder = (orderDetails) => {
    setOrders((prev) => [orderDetails, ...prev]);
    setCartItems([]);
  };
  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.findIndex((p) => p.id === product.id);
      if (exists >= 0) return prev.filter((_, i) => i !== exists);
      return [...prev, product];
    });
  };
  const removeWishlist = (idx) =>
    setWishlist((prev) => prev.filter((_, i) => i !== idx));
  const isWishlisted = (id) => wishlist.some((p) => p.id === id);

  const viewProduct = (product) => {
    setSelectedProduct(product);
    setPage("ProductDetail");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openAuth = () => setShowAuth(true);

  return (
    <div style={{ minHeight: "100vh", background: "#fff" }}>
      <GlobalStyle />
      <Navbar
        page={page}
        setPage={navigateTo}
        cartCount={cartItems.length}
        setCollectionsTab={setCollectionsTab}
        onSearchOpen={() => setShowSearch(true)}
        onCartOpen={() => setShowCart(true)}
        onProfileOpen={() => setShowAuth(true)}
        user={user}
      />

      <main style={{ minHeight: "70vh" }}>
        {page === "Home" && (
          <HomePage
            setPage={navigateTo}
            onAddToCart={addToCart}
            setCollectionsTab={setCollectionsTab}
            user={user}
            onOpenAuth={openAuth}
            wishlist={wishlist}
            onToggleWishlist={toggleWishlist}
            isWishlisted={isWishlisted}
          />
        )}
        {page === "Collections" && (
          <CollectionsPage
            onAddToCart={addToCart}
            onViewProduct={viewProduct}
            activeTab={collectionsTab}
            setActiveTab={setCollectionsTab}
            user={user}
            onOpenAuth={openAuth}
            wishlist={wishlist}
            onToggleWishlist={toggleWishlist}
            isWishlisted={isWishlisted}
          />
        )}
        {page === "ProductDetail" && selectedProduct && (
          <ProductDetailPage
            product={selectedProduct}
            onAddToCart={addToCart}
            onBack={() => navigateTo("Collections")}
            user={user}
            onOpenAuth={openAuth}
            isWishlisted={isWishlisted}
            onToggleWishlist={toggleWishlist}
          />
        )}
        {page === "Bridal" && (
          <BridalPage
            onAddToCart={addToCart}
            user={user}
            onOpenAuth={openAuth}
          />
        )}
        {page === "Custom Order" && <CustomOrderPage />}
        {page === "Contact" && <ContactPage />}
        {page === "Policy" && policyPage && (
          <PolicyPage
            policyKey={policyPage}
            onBack={() => navigateTo("Home")}
          />
        )}
      </main>

      <Footer setPage={navigateTo} onPolicyPage={openPolicyPage} />

      {showSearch && (
        <SearchModal
          onClose={() => setShowSearch(false)}
          onViewProduct={(p) => {
            viewProduct(p);
            setShowSearch(false);
          }}
        />
      )}
      {showCart && (
        <CartDrawer
          items={cartItems}
          onClose={() => setShowCart(false)}
          onRemove={removeFromCart}
          onClear={clearCart}
          onPlaceOrder={placeOrder}
          user={user}
          onOpenAuth={() => {
            setShowCart(false);
            setShowAuth(true);
          }}
        />
      )}
      {showAuth && (
        <AuthModal
          onClose={() => setShowAuth(false)}
          user={user}
          onLogin={(u) => setUser(u)}
          onLogout={() => {
            setUser(null);
            setWishlist([]);
          }}
          orders={orders}
          wishlist={wishlist}
          onRemoveWishlist={removeWishlist}
        />
      )}
    </div>
  );
}
