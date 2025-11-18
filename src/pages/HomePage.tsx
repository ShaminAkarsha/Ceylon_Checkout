import { products } from '../data/mockData';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import Hero from '../components/Hero';
import Footer from '../components/Footer';

export default function HomePage() {
  const tours = products.filter(p => p.category === 'tour');
  const handicrafts = products.filter(p => p.category === 'handicraft');
  const { addItem } = useCart();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Hero />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-grow pt-24">
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Featured Tours</h2>
              <p className="text-gray-600 mt-2">Explore the beauty and culture of Sri Lanka</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tours.map(tour => (
              <div key={tour.id} onClick={() => addItem(tour, 1)} className="cursor-pointer">
                <ProductCard product={tour} />
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Authentic Handicrafts</h2>
              <p className="text-gray-600 mt-2">Take home a piece of Sri Lankan craftsmanship</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {handicrafts.map(handicraft => (
              <div key={handicraft.id} onClick={() => addItem(handicraft, 1)} className="cursor-pointer">
                <ProductCard product={handicraft} />
              </div>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
