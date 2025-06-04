const mockProducts = [
  {
    id: '1',
    name: 'Единорожка Звездочка',
    price: 1500,
    description: 'Милая вязаная единорожка с радужной гривой. Идеальный подарок для детей любого возраста.',
    images: [
      '/images/products/unicorn.jpg',
    ],
    category: 'fairy',
    tags: ['подарок', 'игрушка', 'ручная работа', 'единорог'],
    inStock: true,
    rating: 4.8,
    reviewsCount: 24,
    featured: true,
    new: false,
    discount: null,
    colors: ['розовый', 'голубой', 'лавандовый'],
    materials: ['хлопок', 'акрил'],
    size: { height: 25, width: 15, length: 10 },
    weight: 150,
    createdAt: '2024-01-15T10:30:00Z',
  },
  {
    id: '2',
    name: 'Роскошный Мухомор',
    price: 1200,
    description: 'Очаровательный вязаный мухомор с ярко-красной шляпкой. Оригинальное украшение для дома.',
    images: [
      '/images/products/muhomor.jpg',
    ],
    category: 'plants',
    tags: ['подарок', 'игрушка', 'ручная работа', 'интерьер'],
    inStock: true,
    rating: 4.5,
    reviewsCount: 18,
    featured: false,
    new: true,
    discount: 10,
    colors: ['красный', 'белый'],
    materials: ['хлопок', 'акрил'],
    size: { height: 20, width: 10, length: 8 },
    weight: 100,
    createdAt: '2024-02-20T14:45:00Z',
  },
  {
    id: '3',
    name: 'Чебурашка',
    price: 2500,
    description: 'Вязаный Чебурашка с большими ушами. Любимый персонаж детей и взрослых.',
    images: [
      '/images/products/cheburashka.jpg',
    ],
    category: 'fairy',
    tags: ['подарок', 'игрушка', 'ручная работа', 'персонаж'],
    inStock: true,
    rating: 4.9,
    reviewsCount: 32,
    featured: true,
    new: false,
    discount: null,
    colors: ['коричневый', 'оранжевый'],
    materials: ['хлопок', 'акрил', 'лен'],
    size: { height: 30, width: 12, length: 8 },
    weight: 200,
    createdAt: '2023-11-05T09:15:00Z',
  },
  {
    id: '4',
    name: 'Лама Лайма',
    price: 1300,
    description: 'Милая вязаная лама с шарфиком. Мягкая игрушка для всех возрастов.',
    images: [
      '/images/products/lama.jpg',
    ],
    category: 'animals',
    tags: ['подарок', 'игрушка', 'ручная работа', 'лама'],
    inStock: true,
    rating: 4.7,
    reviewsCount: 15,
    featured: false,
    new: false,
    discount: null,
    colors: ['белый', 'бежевый', 'розовый'],
    materials: ['хлопок', 'акрил'],
    size: { height: 22, width: 12, length: 10 },
    weight: 120,
    createdAt: '2023-12-12T11:20:00Z',
  },
  {
    id: '5',
    name: 'Лошадка Люси',
    price: 1100,
    description: 'Вязаная лошадка с гривой и хвостом из пряжи. Отличный подарок для детей.',
    images: [
      '/images/products/loshadka.jpg',
    ],
    category: 'animals',
    tags: ['подарок', 'игрушка', 'ручная работа', 'лошадь'],
    inStock: true,
    rating: 4.6,
    reviewsCount: 9,
    featured: false,
    new: true,
    discount: 15,
    colors: ['коричневый', 'белый', 'черный'],
    materials: ['хлопок', 'акрил'],
    size: { height: 15, width: 12, length: 25 },
    weight: 130,
    createdAt: '2024-03-05T15:10:00Z',
  },
  {
    id: '6',
    name: 'Добрая кобра Зизи',
    price: 1800,
    description: 'Яркая вязаная кобра с узорами. Необычный подарок для любителей экзотики.',
    images: [
      '/images/products/kobra.jpg',
    ],
    category: 'animals',
    tags: ['подарок', 'игрушка', 'ручная работа', 'змея', 'экзотика'],
    inStock: true,
    rating: 4.8,
    reviewsCount: 21,
    featured: true,
    new: false,
    discount: null,
    colors: ['зеленый', 'желтый', 'красный'],
    materials: ['акрил', 'хлопок'],
    size: { height: 10, width: 10, length: 80 },
    weight: 180,
    createdAt: '2023-10-30T12:00:00Z',
  },
  {
    id: '7',
    name: 'Цветы для любимой',
    price: 1400,
    description: 'Набор вязаных цветов, которые никогда не завянут. Идеальный подарок для любимого человека.',
    images: [
      '/images/products/buket.jpg',
    ],
    category: 'plants',
    tags: ['подарок', 'цветы', 'ручная работа', 'декор'],
    inStock: true,
    rating: 4.9,
    reviewsCount: 27,
    featured: true,
    new: false,
    discount: 5,
    colors: ['разноцветный', 'красный', 'розовый'],
    materials: ['хлопок', 'акрил'],
    size: { height: 30, width: 20, length: 20 },
    weight: 110,
    createdAt: '2023-09-15T11:30:00Z',
  },
  {
    id: '8',
    name: 'Дракоша Тоша',
    price: 2100,
    description: 'Забавный вязаный дракончик с крыльями. Станет верным другом для вашего ребенка.',
    images: [
      '/images/products/drakosha.jpg',
    ],
    category: 'fairy',
    tags: ['подарок', 'игрушка', 'ручная работа', 'дракон'],
    inStock: true,
    rating: 4.7,
    reviewsCount: 19,
    featured: false,
    new: true,
    discount: null,
    colors: ['зеленый', 'синий', 'фиолетовый'],
    materials: ['акрил', 'хлопок'],
    size: { height: 25, width: 35, length: 20 },
    weight: 170,
    createdAt: '2024-01-25T09:20:00Z',
  },
  {
    id: '9',
    name: 'Коровка Муля',
    price: 1350,
    description: 'Мягкая вязаная коровка с пятнышками. Очаровательная игрушка для детей всех возрастов.',
    images: [
      '/images/products/korovka.jpg',
    ],
    category: 'animals',
    tags: ['подарок', 'игрушка', 'ручная работа', 'корова'],
    inStock: true,
    rating: 4.6,
    reviewsCount: 14,
    featured: false,
    new: false,
    discount: 10,
    colors: ['белый', 'черный', 'черно-белый'],
    materials: ['хлопок', 'акрил'],
    size: { height: 18, width: 12, length: 22 },
    weight: 140,
    createdAt: '2023-11-12T14:35:00Z',
  },
  {
    id: '10',
    name: 'Щенок Бобик',
    price: 1250,
    description: 'Вязаный щенок с большими глазами. Станет любимой игрушкой вашего ребенка.',
    images: [
      '/images/products/schenok.jpg',
    ],
    category: 'animals',
    tags: ['подарок', 'игрушка', 'ручная работа', 'собака', 'щенок'],
    inStock: true,
    rating: 4.8,
    reviewsCount: 22,
    featured: true,
    new: false,
    discount: null,
    colors: ['коричневый', 'бежевый', 'серый'],
    materials: ['хлопок', 'акрил'],
    size: { height: 20, width: 15, length: 25 },
    weight: 160,
    createdAt: '2023-12-05T10:15:00Z',
  },
  {
    id: '11',
    name: 'Змейка Шипуня',
    price: 950,
    description: 'Длинная вязаная змейка с узором. Оригинальная игрушка для детей и декоративный элемент для дома.',
    images: [
      '/images/products/zmeika.jpg',
    ],
    category: 'animals',
    tags: ['подарок', 'игрушка', 'ручная работа', 'змея'],
    inStock: true,
    rating: 4.5,
    reviewsCount: 12,
    featured: false,
    new: true,
    discount: 5,
    colors: ['зеленый', 'желтый', 'оранжевый'],
    materials: ['акрил', 'хлопок'],
    size: { height: 5, width: 5, length: 100 },
    weight: 90,
    createdAt: '2024-02-10T13:40:00Z',
  },
  {
    id: '12',
    name: 'Набор вязаных друзей для большой семьи',
    price: 5500,
    description: 'Коллекция из пяти разных вязаных игрушек: мишка, зайчик, котик, собачка и лисичка. Идеальный подарок для большой семьи.',
    images: [
      '/images/products/nabor.jpg',
    ],
    category: 'sets',
    tags: ['подарок', 'игрушка', 'ручная работа', 'набор', 'семья'],
    inStock: true,
    rating: 5.0,
    reviewsCount: 35,
    featured: true,
    new: true,
    discount: 15,
    colors: ['разноцветный'],
    materials: ['хлопок', 'акрил', 'лен'],
    size: { height: 20, width: 50, length: 30 },
    weight: 650,
    createdAt: '2024-03-01T09:00:00Z',
  },
];

const mockCategories = [
  { id: 'animals', name: 'Животные', count: 6 },
  { id: 'plants', name: 'Растения', count: 2 },
  { id: 'fairy', name: 'Сказочные существа', count: 3 },
  { id: 'sets', name: 'Наборы', count: 1 },
];

const mockReviews = {
  '1': [
    {
      id: '101',
      productId: '1',
      userId: 'user1',
      userName: 'Анна К.',
      rating: 5,
      text: 'Отличная игрушка! Мой ребенок в восторге. Единорожка очень мягкая и приятная на ощупь.',
      date: '2024-02-10T14:30:00Z',
    },
    {
      id: '102',
      productId: '1',
      userId: 'user2',
      userName: 'Иван П.',
      rating: 4,
      text: 'Хорошее качество, но доставка могла бы быть быстрее.',
      date: '2024-01-25T09:15:00Z',
    },
  ],
};


const productService = {
  getProducts: async (filters = {}) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    try {
      let filteredProducts = [...mockProducts];
      if (filters.category) {
        filteredProducts = filteredProducts.filter(p => p.category === filters.category);
      }
      
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filteredProducts = filteredProducts.filter(p => 
          p.name.toLowerCase().includes(searchLower) || 
          p.description.toLowerCase().includes(searchLower) ||
          p.tags.some(tag => tag.toLowerCase().includes(searchLower))
        );
      }
      
      if (filters.priceMin !== undefined) {
        filteredProducts = filteredProducts.filter(p => p.price >= filters.priceMin);
      }
      
      if (filters.priceMax !== undefined) {
        filteredProducts = filteredProducts.filter(p => p.price <= filters.priceMax);
      }
      
      if (filters.inStock !== undefined) {
        filteredProducts = filteredProducts.filter(p => p.inStock === filters.inStock);
      }
      
      if (filters.featured !== undefined) {
        filteredProducts = filteredProducts.filter(p => p.featured === filters.featured);
      }
      
      if (filters.new !== undefined) {
        filteredProducts = filteredProducts.filter(p => p.new === filters.new);
      }
      
      if (filters.discount !== undefined) {
        filteredProducts = filteredProducts.filter(p => p.discount !== null && p.discount > 0);
      }
      
      if (filters.sortBy) {
        switch (filters.sortBy) {
          case 'price_asc':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
          case 'price_desc':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
          case 'name_asc':
            filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
          case 'name_desc':
            filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
            break;
          case 'rating':
            filteredProducts.sort((a, b) => b.rating - a.rating);
            break;
          case 'newest':
            filteredProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            break;
          default:
            filteredProducts.sort((a, b) => (b.rating * b.reviewsCount) - (a.rating * a.reviewsCount));
        }
      }
      
      const page = filters.page || 1;
      const limit = filters.limit || 10;
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      
      const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
      
      return {
        products: paginatedProducts,
        total: filteredProducts.length,
        page,
        totalPages: Math.ceil(filteredProducts.length / limit)
      };
    } catch (error) {
      console.error('Ошибка при получении товаров:', error);
      throw error;
    }
  },
  
  getProductById: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    try {
      const product = mockProducts.find(p => p.id === id);
      
      if (!product) {
        throw new Error('Товар не найден');
      }
      
      return product;
    } catch (error) {
      console.error(`Ошибка при получении товара с ID ${id}:`, error);
      throw error;
    }
  },
  
  getCategories: async () => {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    try {
      return mockCategories;
    } catch (error) {
      console.error('Ошибка при получении категорий:', error);
      throw error;
    }
  },
  
  getReviews: async (productId) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    try {
      return mockReviews[productId] || [];
    } catch (error) {
      console.error(`Ошибка при получении отзывов для товара с ID ${productId}:`, error);
      throw error;
    }
  },
  
  addReview: async (productId, review) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    try {
      const newReview = {
        id: `review-${Date.now()}`,
        productId,
        ...review,
        date: new Date().toISOString()
      };
      
      if (!mockReviews[productId]) {
        mockReviews[productId] = [];
      }
      
      mockReviews[productId].push(newReview);
      
      return newReview;
    } catch (error) {
      console.error(`Ошибка при добавлении отзыва для товара с ID ${productId}:`, error);
      throw error;
    }
  },
  
  getSimilarProducts: async (productId, limit = 4) => {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    try {
      const product = await productService.getProductById(productId);
      
      const similarProducts = mockProducts
        .filter(p => p.id !== productId && p.category === product.category)
        .slice(0, limit);
      
      if (similarProducts.length < limit) {
        const otherProducts = mockProducts
          .filter(p => p.id !== productId && p.category !== product.category)
          .sort(() => 0.5 - Math.random())
          .slice(0, limit - similarProducts.length);
        
        return [...similarProducts, ...otherProducts];
      }
      
      return similarProducts;
    } catch (error) {
      console.error(`Ошибка при получении похожих товаров для ID ${productId}:`, error);
      throw error;
    }
  },
  
  getFeaturedProducts: async (limit = 6) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    try {
      return mockProducts
        .filter(p => p.featured)
        .sort(() => 0.5 - Math.random())
        .slice(0, limit);
    } catch (error) {
      console.error('Ошибка при получении рекомендуемых товаров:', error);
      throw error;
    }
  },
  
  getNewProducts: async (limit = 6) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    try {
      const desiredOrder = ['8', '2', '11', '5']; 
      
      const allNewProducts = mockProducts.filter(p => p.new || desiredOrder.includes(p.id));
      
      const sortedProducts = [];
      
      for (const id of desiredOrder) {
        const product = allNewProducts.find(p => p.id === id);
        if (product) {
          sortedProducts.push(product);
        }
      }
      
      if (sortedProducts.length < limit) {
        const remainingNewProducts = mockProducts
          .filter(p => p.new && !desiredOrder.includes(p.id))
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, limit - sortedProducts.length);
        
        sortedProducts.push(...remainingNewProducts);
      }
      
      return sortedProducts.slice(0, limit);
    } catch (error) {
      console.error('Ошибка при получении новых товаров:', error);
      throw error;
    }
  },
  
  getDiscountedProducts: async (limit = 6) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    try {
      const desiredOrder = ['5', '7', '12', '9']; 
      
      const allDiscountedProducts = mockProducts.filter(p => (p.discount !== null && p.discount > 0) || desiredOrder.includes(p.id));
      
      const sortedProducts = [];
      
      for (const id of desiredOrder) {
        const product = allDiscountedProducts.find(p => p.id === id);
        if (product) {
          sortedProducts.push(product);
        }
      }
      
      if (sortedProducts.length < limit) {
        const remainingDiscountedProducts = mockProducts
          .filter(p => p.discount !== null && p.discount > 0 && !desiredOrder.includes(p.id))
          .sort((a, b) => b.discount - a.discount)
          .slice(0, limit - sortedProducts.length);
        
        sortedProducts.push(...remainingDiscountedProducts);
      }
      
      return sortedProducts.slice(0, limit);
    } catch (error) {
      console.error('Ошибка при получении товаров со скидкой:', error);
      throw error;
    }
  }
};

export default productService;