import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react';

interface VpsPlan {
  name: string;
  price: string;
  period: string;
  cpu: string;
  ram: string;
  disk: string;
  features: string[];
}

const vpsPlans: VpsPlan[] = [
  {
    name: 'VPS-Basic',
    price: '3000',
    period: '/Mois',
    cpu: '2 vCore(s)',
    ram: '2 GB',
    disk: '64GB SSD',
    features: ['Stockage sécurisé', 'Sauvegardes automatiques', 'Support technique']
  },
  {
    name: 'VPS-Pro',
    price: '6000',
    period: '/Mois',
    cpu: '4 vCore(s)',
    ram: '4 GB',
    disk: '120GB SSD',
    features: ['Performance optimisée', 'Sauvegardes quotidiennes', 'Support 24/7']
  },
  {
    name: 'VPS-Performance',
    price: '12000',
    period: '/Mois',
    cpu: '8 vCore(s)',
    ram: '8 GB',
    disk: '320GB SSD',
    features: ['Haute performance', 'Sauvegardes avancées', 'Support Premium']
  },
  {
    name: 'VPS-Entreprise',
    price: '24000',
    period: '/Mois',
    cpu: '16 vCore(s)',
    ram: '32 GB',
    disk: '6400GB SSD',
    features: ['Performance maximale', 'Sauvegardes illimitées', 'Support dédié']
  }
];

const VpsPlans = () => {
  return (
    <div className="section-padding bg-white relative overflow-hidden">
      <div className="container-custom">
        <h2 className="text-4xl lg:text-5xl font-display font-bold text-waw-dark text-center mb-12">
          Nos Plans VPS
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {vpsPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              <div className="p-6">
                <h3 className="text-2xl font-bold text-waw-dark mb-4">{plan.name}</h3>
                
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-waw-yellow mb-1">{plan.price}</div>
                  <span className="text-gray-500">{plan.period}</span>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center space-x-2">
                    <span className="text-waw-yellow">CPU</span>
                    <span className="text-gray-600">{plan.cpu}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-waw-yellow">RAM</span>
                    <span className="text-gray-600">{plan.ram}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-waw-yellow">DISQUE</span>
                    <span className="text-gray-600">{plan.disk}</span>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-center space-x-2">
                      <CheckCircle size={16} className="text-waw-yellow" />
                      <span className="text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>

                <button
                  className="w-full bg-waw-yellow text-waw-dark font-bold py-3 px-6 rounded-lg hover:bg-waw-yellow-dark transition-colors flex items-center justify-center space-x-2"
                  onClick={() => window.location.href = '/contact'}
                >
                  <span>Commander</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VpsPlans;
