// انتظار تحميل DOM بالكامل قبل تنفيذ البرنامج النصي
document.addEventListener('DOMContentLoaded', function() {

  // 1. عداد تنازلي للعروض
  const countdownTimer = () => {
    let hours = 23;
    let minutes = 59;
    let seconds = 59;

    const countdown = setInterval(() => {
      const countdownElement = document.getElementById('countdown');
      
      if (seconds === 0) {
        if (minutes === 0) {
          if (hours === 0) {
            clearInterval(countdown);
            document.querySelector('.countdown-bar').style.display = 'none';
            return;
          }
          hours--;
          minutes = 59;
        } else {
          minutes--;
        }
        seconds = 59;
      } else {
        seconds--;
      }

      // تحديث العداد في الصفحة
      countdownElement.textContent = 
        ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')};
    }, 1000);
  };

  // 2. وظائف عربة التسوق
  const setupCart = () => {
    let cartCount = 0;
    const cartCountElement = document.querySelector('.cart-count');
    const cartIcon = document.querySelector('.cart-icon');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    // تحميل عدد العناصر من localStorage إذا وجد
    if (localStorage.getItem('cartCount')) {
      cartCount = parseInt(localStorage.getItem('cartCount'));
      cartCountElement.textContent = cartCount;
    }

    // إضافة عنصر للسلة
    addToCartButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        e.stopPropagation();
        cartCount++;
        cartCountElement.textContent = cartCount;
        localStorage.setItem('cartCount', cartCount);
        
        // تأثير حركي عند الإضافة
        cartCountElement.style.transform = 'scale(1.5)';
        setTimeout(() => {
          cartCountElement.style.transform = 'scale(1)';
        }, 300);
        
        // إظهار إشعار بالإضافة
        showNotification('تمت إضافة المنتج إلى السلة!');
      });
    });

    // النقر على أيقونة السلة
    cartIcon.addEventListener('click', function() {
      showNotification(لديك ${cartCount} عنصر في سلة التسوق);
    });
  };

  // 3. نافذة العرض السريع للمنتج
  const setupQuickView = () => {
    const quickViewModal = document.getElementById('quickView');
    const closeBtn = document.querySelector('.close-btn');
    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach(card => {
      card.addEventListener('click', function(e) {
        if (!e.target.classList.contains('add-to-cart')) {
          const product = {
            title: card.querySelector('h4').textContent,
            price: card.querySelector('.price').textContent,
            rating: card.querySelector('.rating').innerHTML,
            image: card.querySelector('img').src,
            description: 'ساعة فاخرة سويسرية الصنع بحركة تلقائية، زجاج من الكريستال الصفري ومقاومة للماء حتى عمق 100 متر',
            features: [
              'حركة تلقائية',
              'زجاج من الكريستال الصفري',
              'مقاومة للماء حتى 100 متر',
              'هيكل من الفولاذ المقاوم للصدأ',
              'سوار من الجلد الطبيعي'
            ]
          };

          // تعبئة النافذة ببيانات المنتج
          document.querySelector('.product-details').innerHTML = `
            <div class="quick-view-flex">
              <div class="quick-view-image">
                <img src="${product.image}" alt="${product.title}">
              </div>
              <div class="quick-view-info">
                <h3>${product.title}</h3>
                <div class="rating">${product.rating}</div>
                <p class="price">${product.price}</p>
                <p class="description">${product.description}</p>
                
                <div class="quick-view-features">
                  <h4>المميزات</h4>
                  <ul>
                    ${product.features.map(feature => <li>${feature}</li>).join('')}
                  </ul>
                </div>
                
                <button class="add-to-cart cta-button">أضف إلى السلة</button>
              </div>
            </div>
          `;

          // إظهار النافذة مع تأثير حركي
          quickViewModal.style.display = 'block';
          document.body.style.overflow = 'hidden';
        }
      });
    });

    // إغلاق النافذة
    closeBtn.addEventListener('click', function() {
      quickViewModal.style.display = 'none';
      document.body.style.overflow = 'auto';
    });

    // إغلاق النافذة عند النقر خارجها
    window.addEventListener('click', function(e) {
      if (e.target === quickViewModal) {
        quickViewModal.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
    });
  };

  // 4. وظيفة البحث
  const setupSearch = () => {
    const searchInput = document.querySelector('.search-bar input');
    const searchButton = document.querySelector('.search-bar button');
    const productCards = document.querySelectorAll('.product-card');

    const performSearch = () => {
      const searchTerm = searchInput.value.toLowerCase();
      
      productCards.forEach(card => {
        const title = card.querySelector('h4').textContent.toLowerCase();
        if (title.includes(searchTerm)) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    };

    searchInput.addEventListener('keyup', function(e) {
      if (e.key === 'Enter') {
        performSearch();
      }
    });

    searchButton.addEventListener('click', performSearch);
  };

  // 5. زر العودة إلى الأعلى
  const setupBackToTop = () => {
    const backToTopButton = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        backToTopButton.classList.add('active');
      } else {
        backToTopButton.classList.remove('active');
      }
    });

    backToTopButton.addEventListener('click', function() {
async function async (params) async (params) => {
  =>
} {
  name
}(params) {
        window.scrollTo!({
  
}        top: 0,
        behavior: 'smooth'
      });
    });
  };

  // 6. نظام الإشعارات
  const showNotification = (message) => {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  };

  // 7. تهيئة جميع الوظائف
  const init = () => {
    countdownTimer();
    setupCart();
    setupQuickView();
    setupSearch();
    setupBackToTop();
    
    // إضافة أنماط الإشعارات ديناميكيًا
    const style = document.createElement('style');
    style.textContent = `
      .notification {
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: #b8860b;
        color: white;
        padding: 15px 30px;
        border-radius: 30px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s ease;
        font-family: 'Roboto', sans-serif;
      }
      .notification.show {
        opacity: 1;
      }
    `;
    document.head.appendChild(style);
  };

  // بدء تشغيل التطبيق
  init();
});