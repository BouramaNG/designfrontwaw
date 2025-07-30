import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react';

interface WebHostingPlan {
  name: string;
  price: string;
  period: string;
  description: string;
  domains: string;
  disk: string;
  emails: string;
  databases: string;
  ssl: string;
  cms: string;
  apps: string;
  backup: string;
}

const webHostingPlans: WebHostingPlan[] = [
  {
    name: 'Pack Basic',
    price: '1500',
    period: '/Mois',
    description: 'Idéal pour un site vitrine',
    domains: '01 nom de domaine .com , .net',
    disk: '50 Go Espace Disque',
    emails: '01 Adresses emails de 05 Go',
    databases: '01 Base de données MYSQL',
    ssl: 'SSL (Gratuit) Let\'s Encrypt',
    cms: 'CMS (wordpress, Prestashop, Drupal...)',
    apps: '',
    backup: ''
  },
  {
    name: 'Pack Start Up',
    price: '2500',
    period: '/Mois',
    description: 'Idéal pour les start up',
    domains: '01 nom de domaine .com , .net, .sn',
    disk: '100 Go Espace Disque',
    emails: '02 Adresses emails de 05 Go',
    databases: '01 Base de données MYSQL',
    ssl: 'SSL (Gratuit) Let\'s Encrypt',
    cms: 'CMS (wordpress, Prestashop, Drupal...)',
    apps: 'Jokko Apps',
    backup: ''
  },
  {
    name: 'Pack Pro',
    price: '3500',
    period: '/Mois',
    description: 'Idéal pour les PME/PMI',
    domains: '01 nom de domaine .com , .net, .org, .sn, .africa',
    disk: '200 Go Espace Disque',
    emails: '03 Adresses emails de 05 Go',
    databases: '02 Base de données MYSQL',
    ssl: 'SSL (Gratuit) Let\'s Encrypt',
    cms: 'CMS (wordpress, Prestashop, Drupal...)',
    apps: 'Jokko Apps',
    backup: 'Sauvegarde Cloud automatique'
  }
];

const WebHostingPlans = () => {
  return (
    <div className="section-padding bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      <div className="container-custom">
        <h2 className="text-4xl lg:text-5xl font-display font-bold text-waw-dark text-center mb-12">
          Nos Plans d'Hébergement Web
        </h2>
        
        <div className="grid md:grid-cols-3 lg:grid-cols-3 gap-8">
          {webHostingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              <div className="p-6">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-waw-yellow mb-1">{plan.price}</div>
                  <span className="text-gray-500">{plan.period}</span>
                </div>

                <h3 className="text-xl font-bold text-waw-dark mb-4">{plan.name}</h3>
                <p className="text-gray-600 mb-6">{plan.description}</p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center space-x-2">
                    <CheckCircle size={16} className="text-waw-yellow" />
                    <span className="text-gray-600">{plan.domains}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle size={16} className="text-waw-yellow" />
                    <span className="text-gray-600">{plan.disk}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle size={16} className="text-waw-yellow" />
                    <span className="text-gray-600">{plan.emails}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle size={16} className="text-waw-yellow" />
                    <span className="text-gray-600">{plan.databases}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle size={16} className="text-waw-yellow" />
                    <span className="text-gray-600">{plan.ssl}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle size={16} className="text-waw-yellow" />
                    <span className="text-gray-600">{plan.cms}</span>
                  </div>
                  {plan.apps && (
                    <div className="flex items-center space-x-2">
                      <CheckCircle size={16} className="text-waw-yellow" />
                      <span className="text-gray-600">{plan.apps}</span>
                    </div>
                  )}
                  {plan.backup && (
                    <div className="flex items-center space-x-2">
                      <CheckCircle size={16} className="text-waw-yellow" />
                      <span className="text-gray-600">{plan.backup}</span>
                    </div>
                  )}
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

        <div className="max-w-2xl mx-auto text-center mt-12">
          <p className="text-gray-600 text-lg">
            L'hébergement mutualisé est un excellent point de départ pour les sites Web à faible trafic.
            Il est facile de mettre à jour à mesure que votre site web grandit.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WebHostingPlans;
