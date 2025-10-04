import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  rating: number;
  reviews: number;
  category: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface Review {
  id: number;
  author: string;
  rating: number;
  text: string;
  date: string;
}

const products: Product[] = [
  {
    id: 1,
    name: 'iPhone 15 Pro Max',
    price: 129990,
    image: '/img/3745db15-c253-493a-8c2e-9bd44ccf6e50.jpg',
    rating: 4.9,
    reviews: 342,
    category: 'Смартфоны'
  },
  {
    id: 2,
    name: 'AirPods Pro 2',
    price: 24990,
    image: '/img/ceded34f-436e-40b7-a053-97d4e1ce4ad8.jpg',
    rating: 4.8,
    reviews: 521,
    category: 'Аудио'
  },
  {
    id: 3,
    name: 'MacBook Pro 16"',
    price: 249990,
    image: '/img/ec6827ea-6c49-4d00-9da2-69dfcf8dd66c.jpg',
    rating: 4.9,
    reviews: 287,
    category: 'Ноутбуки'
  }
];

const reviewsData: Record<number, Review[]> = {
  1: [
    { id: 1, author: 'Алексей М.', rating: 5, text: 'Потрясающий смартфон! Камера просто космос.', date: '15.09.2024' },
    { id: 2, author: 'Мария К.', rating: 5, text: 'Лучший телефон, который у меня был.', date: '12.09.2024' }
  ],
  2: [
    { id: 1, author: 'Дмитрий П.', rating: 5, text: 'Отличное шумоподавление, звук супер!', date: '20.09.2024' },
    { id: 2, author: 'Елена С.', rating: 4, text: 'Хорошие наушники, но дороговаты.', date: '18.09.2024' }
  ],
  3: [
    { id: 1, author: 'Игорь В.', rating: 5, text: 'Мощнейшая машина для работы!', date: '10.09.2024' },
    { id: 2, author: 'Анна Л.', rating: 5, text: 'Идеально для видеомонтажа.', date: '08.09.2024' }
  ]
};

export default function Index() {
  const [activeSection, setActiveSection] = useState('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === productId) {
        const newQuantity = item.quantity + delta;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Icon
        key={i}
        name={i < Math.floor(rating) ? 'Star' : 'Star'}
        size={16}
        className={i < Math.floor(rating) ? 'fill-secondary text-secondary' : 'text-muted'}
      />
    ));
  };

  const renderHome = () => (
    <div className="space-y-16">
      <section className="relative overflow-hidden rounded-2xl tech-gradient p-12 md:p-20">
        <div className="relative z-10 max-w-2xl">
          <h1 className="font-orbitron text-5xl md:text-7xl font-bold mb-6 text-primary-foreground">
            Технологии будущего
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90">
            Передовая электроника для тех, кто идет в ногу со временем
          </p>
          <Button
            size="lg"
            onClick={() => setActiveSection('catalog')}
            className="tech-border bg-card hover:bg-card/80 text-foreground glow-blue font-orbitron text-lg"
          >
            <Icon name="Zap" size={20} className="mr-2" />
            Перейти в каталог
          </Button>
        </div>
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-20">
          <Icon name="Cpu" size={400} className="text-primary-foreground" />
        </div>
      </section>

      <section>
        <h2 className="font-orbitron text-4xl font-bold mb-8 text-center">Популярные товары</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <Card key={product.id} className="tech-border overflow-hidden group hover:glow-blue transition-all duration-300">
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <Badge className="absolute top-4 left-4 bg-secondary text-secondary-foreground">
                  {product.category}
                </Badge>
              </div>
              <CardContent className="p-6 space-y-4">
                <h3 className="font-orbitron text-xl font-semibold">{product.name}</h3>
                
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">{renderStars(product.rating)}</div>
                  <button
                    onClick={() => setSelectedProduct(product.id)}
                    className="text-sm text-primary hover:underline"
                  >
                    {product.rating} ({product.reviews} отзывов)
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-orbitron text-2xl font-bold text-primary">
                    {product.price.toLocaleString('ru-RU')} ₽
                  </span>
                  <Button
                    onClick={() => addToCart(product)}
                    className="bg-primary hover:bg-primary/90 glow-blue"
                  >
                    <Icon name="ShoppingCart" size={18} className="mr-2" />
                    В корзину
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-6">
        <Card className="tech-border p-6 hover:glow-blue transition-all">
          <Icon name="Truck" size={48} className="text-primary mb-4" />
          <h3 className="font-orbitron text-xl font-semibold mb-2">Быстрая доставка</h3>
          <p className="text-muted-foreground">Доставим за 1-2 дня по всей России</p>
        </Card>
        <Card className="tech-border p-6 hover:glow-amber transition-all">
          <Icon name="Shield" size={48} className="text-secondary mb-4" />
          <h3 className="font-orbitron text-xl font-semibold mb-2">Гарантия 2 года</h3>
          <p className="text-muted-foreground">Официальная гарантия производителя</p>
        </Card>
        <Card className="tech-border p-6 hover:glow-blue transition-all">
          <Icon name="Headphones" size={48} className="text-primary mb-4" />
          <h3 className="font-orbitron text-xl font-semibold mb-2">Поддержка 24/7</h3>
          <p className="text-muted-foreground">Всегда на связи для вас</p>
        </Card>
      </section>
    </div>
  );

  const renderCatalog = () => (
    <div className="space-y-8">
      <h1 className="font-orbitron text-4xl font-bold">Каталог товаров</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <Card key={product.id} className="tech-border overflow-hidden group hover:glow-blue transition-all duration-300">
            <div className="relative overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <Badge className="absolute top-4 left-4 bg-secondary text-secondary-foreground">
                {product.category}
              </Badge>
            </div>
            <CardContent className="p-6 space-y-4">
              <h3 className="font-orbitron text-xl font-semibold">{product.name}</h3>
              
              <div className="flex items-center gap-2">
                <div className="flex gap-1">{renderStars(product.rating)}</div>
                <button
                  onClick={() => setSelectedProduct(product.id)}
                  className="text-sm text-primary hover:underline"
                >
                  {product.rating} ({product.reviews} отзывов)
                </button>
              </div>

              <div className="flex items-center justify-between">
                <span className="font-orbitron text-2xl font-bold text-primary">
                  {product.price.toLocaleString('ru-RU')} ₽
                </span>
                <Button
                  onClick={() => addToCart(product)}
                  className="bg-primary hover:bg-primary/90 glow-blue"
                >
                  <Icon name="ShoppingCart" size={18} className="mr-2" />
                  В корзину
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderWarranty = () => (
    <div className="space-y-8">
      <h1 className="font-orbitron text-4xl font-bold">Гарантия</h1>
      <Card className="tech-border p-8 space-y-6">
        <div className="flex items-start gap-4">
          <Icon name="Shield" size={48} className="text-secondary flex-shrink-0" />
          <div>
            <h3 className="font-orbitron text-2xl font-semibold mb-2">2 года официальной гарантии</h3>
            <p className="text-muted-foreground">На всю технику распространяется официальная гарантия производителя сроком 24 месяца.</p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <Icon name="RefreshCw" size={48} className="text-primary flex-shrink-0" />
          <div>
            <h3 className="font-orbitron text-2xl font-semibold mb-2">Обмен и возврат</h3>
            <p className="text-muted-foreground">14 дней на обмен или возврат товара без объяснения причин.</p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <Icon name="Wrench" size={48} className="text-secondary flex-shrink-0" />
          <div>
            <h3 className="font-orbitron text-2xl font-semibold mb-2">Сервисное обслуживание</h3>
            <p className="text-muted-foreground">Бесплатный ремонт в авторизованных сервисных центрах по всей России.</p>
          </div>
        </div>
      </Card>
    </div>
  );

  const renderDelivery = () => (
    <div className="space-y-8">
      <h1 className="font-orbitron text-4xl font-bold">Доставка</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="tech-border p-8 space-y-4 hover:glow-blue transition-all">
          <Icon name="Zap" size={48} className="text-primary" />
          <h3 className="font-orbitron text-2xl font-semibold">Экспресс-доставка</h3>
          <p className="text-muted-foreground">Доставим завтра при заказе до 18:00. Только для Москвы и Санкт-Петербурга.</p>
          <p className="font-orbitron text-xl text-primary">990 ₽</p>
        </Card>
        <Card className="tech-border p-8 space-y-4 hover:glow-blue transition-all">
          <Icon name="Truck" size={48} className="text-secondary" />
          <h3 className="font-orbitron text-2xl font-semibold">Стандартная доставка</h3>
          <p className="text-muted-foreground">Доставка по России за 2-5 дней. Бесплатно при заказе от 50 000 ₽.</p>
          <p className="font-orbitron text-xl text-secondary">от 500 ₽</p>
        </Card>
        <Card className="tech-border p-8 space-y-4 hover:glow-amber transition-all">
          <Icon name="MapPin" size={48} className="text-secondary" />
          <h3 className="font-orbitron text-2xl font-semibold">Самовывоз</h3>
          <p className="text-muted-foreground">Заберите заказ из пункта выдачи в удобное время.</p>
          <p className="font-orbitron text-xl text-primary">Бесплатно</p>
        </Card>
        <Card className="tech-border p-8 space-y-4 hover:glow-blue transition-all">
          <Icon name="Globe" size={48} className="text-primary" />
          <h3 className="font-orbitron text-2xl font-semibold">Международная доставка</h3>
          <p className="text-muted-foreground">Доставляем в страны СНГ и Европы за 7-14 дней.</p>
          <p className="font-orbitron text-xl text-primary">Рассчитывается индивидуально</p>
        </Card>
      </div>
    </div>
  );

  const renderContacts = () => (
    <div className="space-y-8">
      <h1 className="font-orbitron text-4xl font-bold">Контакты</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="tech-border p-8 space-y-6">
          <div className="flex items-center gap-4">
            <Icon name="Phone" size={32} className="text-primary" />
            <div>
              <p className="text-muted-foreground">Телефон</p>
              <p className="font-orbitron text-xl">+7 (800) 555-35-35</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Icon name="Mail" size={32} className="text-secondary" />
            <div>
              <p className="text-muted-foreground">Email</p>
              <p className="font-orbitron text-xl">info@techstore.ru</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Icon name="MapPin" size={32} className="text-primary" />
            <div>
              <p className="text-muted-foreground">Адрес</p>
              <p className="font-orbitron text-xl">г. Москва, ул. Тверская, д. 1</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Icon name="Clock" size={32} className="text-secondary" />
            <div>
              <p className="text-muted-foreground">Режим работы</p>
              <p className="font-orbitron text-xl">Пн-Вс: 10:00 - 22:00</p>
            </div>
          </div>
        </Card>
        <Card className="tech-border p-8">
          <h3 className="font-orbitron text-2xl font-semibold mb-6">Написать нам</h3>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Ваше имя"
              className="w-full p-3 bg-muted rounded-lg tech-border focus:outline-none focus:glow-blue transition-all"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 bg-muted rounded-lg tech-border focus:outline-none focus:glow-blue transition-all"
            />
            <textarea
              placeholder="Сообщение"
              rows={4}
              className="w-full p-3 bg-muted rounded-lg tech-border focus:outline-none focus:glow-blue transition-all resize-none"
            />
            <Button className="w-full bg-primary hover:bg-primary/90 glow-blue" size="lg">
              <Icon name="Send" size={20} className="mr-2" />
              Отправить
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b tech-border backdrop-blur-lg bg-background/80">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="Cpu" size={40} className="text-primary animate-glow-pulse" />
              <span className="font-orbitron text-2xl font-bold">TECH STORE</span>
            </div>
            
            <nav className="hidden md:flex items-center gap-6">
              {['home', 'catalog', 'warranty', 'delivery', 'contacts'].map(section => (
                <button
                  key={section}
                  onClick={() => setActiveSection(section)}
                  className={`font-orbitron transition-colors ${
                    activeSection === section ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {section === 'home' && 'Главная'}
                  {section === 'catalog' && 'Каталог'}
                  {section === 'warranty' && 'Гарантия'}
                  {section === 'delivery' && 'Доставка'}
                  {section === 'contacts' && 'Контакты'}
                </button>
              ))}
            </nav>

            <Sheet>
              <SheetTrigger asChild>
                <Button className="relative bg-primary hover:bg-primary/90 glow-blue">
                  <Icon name="ShoppingCart" size={20} />
                  {totalItems > 0 && (
                    <Badge className="absolute -top-2 -right-2 bg-secondary text-secondary-foreground">
                      {totalItems}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-lg">
                <SheetHeader>
                  <SheetTitle className="font-orbitron text-2xl">Корзина</SheetTitle>
                </SheetHeader>
                <div className="mt-8 space-y-4">
                  {cart.length === 0 ? (
                    <p className="text-center text-muted-foreground py-12">Корзина пуста</p>
                  ) : (
                    <>
                      {cart.map(item => (
                        <Card key={item.id} className="tech-border p-4">
                          <div className="flex gap-4">
                            <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                            <div className="flex-1">
                              <h4 className="font-orbitron font-semibold">{item.name}</h4>
                              <p className="text-primary font-bold">{item.price.toLocaleString('ru-RU')} ₽</p>
                              <div className="flex items-center gap-2 mt-2">
                                <Button size="sm" variant="outline" onClick={() => updateQuantity(item.id, -1)}>
                                  <Icon name="Minus" size={12} />
                                </Button>
                                <span className="font-orbitron">{item.quantity}</span>
                                <Button size="sm" variant="outline" onClick={() => updateQuantity(item.id, 1)}>
                                  <Icon name="Plus" size={12} />
                                </Button>
                              </div>
                            </div>
                            <Button size="sm" variant="ghost" onClick={() => removeFromCart(item.id)}>
                              <Icon name="X" size={16} />
                            </Button>
                          </div>
                        </Card>
                      ))}
                      <div className="pt-4 border-t tech-border">
                        <div className="flex justify-between font-orbitron text-xl font-bold mb-4">
                          <span>Итого:</span>
                          <span className="text-primary">{totalPrice.toLocaleString('ru-RU')} ₽</span>
                        </div>
                        <Button className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground glow-amber" size="lg">
                          Оформить заказ
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {activeSection === 'home' && renderHome()}
        {activeSection === 'catalog' && renderCatalog()}
        {activeSection === 'warranty' && renderWarranty()}
        {activeSection === 'delivery' && renderDelivery()}
        {activeSection === 'contacts' && renderContacts()}
      </main>

      <footer className="border-t tech-border mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Cpu" size={32} className="text-primary" />
                <span className="font-orbitron text-xl font-bold">TECH STORE</span>
              </div>
              <p className="text-muted-foreground">Передовая электроника для вашего будущего</p>
            </div>
            <div>
              <h4 className="font-orbitron font-semibold mb-4">Покупателям</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><button onClick={() => setActiveSection('catalog')} className="hover:text-primary transition-colors">Каталог</button></li>
                <li><button onClick={() => setActiveSection('warranty')} className="hover:text-primary transition-colors">Гарантия</button></li>
                <li><button onClick={() => setActiveSection('delivery')} className="hover:text-primary transition-colors">Доставка</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-orbitron font-semibold mb-4">Контакты</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>+7 (800) 555-35-35</li>
                <li>info@techstore.ru</li>
                <li>Пн-Вс: 10:00 - 22:00</li>
              </ul>
            </div>
            <div>
              <h4 className="font-orbitron font-semibold mb-4">Мы в соцсетях</h4>
              <div className="flex gap-4">
                <Button size="sm" variant="outline" className="tech-border hover:glow-blue">
                  <Icon name="Mail" size={20} />
                </Button>
                <Button size="sm" variant="outline" className="tech-border hover:glow-blue">
                  <Icon name="MessageCircle" size={20} />
                </Button>
                <Button size="sm" variant="outline" className="tech-border hover:glow-blue">
                  <Icon name="Phone" size={20} />
                </Button>
              </div>
            </div>
          </div>
          <div className="border-t tech-border mt-8 pt-8 text-center text-muted-foreground">
            <p>© 2024 TECH STORE. Все права защищены.</p>
          </div>
        </div>
      </footer>

      {selectedProduct && (
        <Sheet open={selectedProduct !== null} onOpenChange={() => setSelectedProduct(null)}>
          <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
            <SheetHeader>
              <SheetTitle className="font-orbitron text-2xl">Отзывы о товаре</SheetTitle>
            </SheetHeader>
            <div className="mt-8 space-y-6">
              {reviewsData[selectedProduct]?.map(review => (
                <Card key={review.id} className="tech-border p-6">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-orbitron font-semibold">{review.author}</p>
                      <p className="text-sm text-muted-foreground">{review.date}</p>
                    </div>
                    <div className="flex gap-1">
                      {renderStars(review.rating)}
                    </div>
                  </div>
                  <p className="text-muted-foreground">{review.text}</p>
                </Card>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
}