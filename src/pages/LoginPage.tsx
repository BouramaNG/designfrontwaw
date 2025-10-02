import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Smartphone, 
  Globe, 
  Shield,
  CheckCircle,
  Star
} from 'lucide-react';
import type { PageType } from '../App';

interface LoginPageProps {
  onNavigate: (page: PageType) => void;
}

const LoginPage = ({ onNavigate }: LoginPageProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulation d'une connexion
    setTimeout(() => {
      setIsLoading(false);
      // Rediriger vers la page d'accueil après connexion
      onNavigate('home');
    }, 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-waw-dark via-gray-900 to-black flex items-center justify-center p-4 pt-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'linear',
          }}
          className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-waw-yellow/10 to-waw-yellow-dark/10 rounded-full blur-3xl"
        />

        <motion.div
          animate={{
            rotate: -360,
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 30,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'linear',
          }}
          className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-waw-yellow/5 to-white/5 rounded-full blur-3xl"
        />

        {/* Floating Tech Icons */}
        {[
          { icon: Smartphone, position: 'top-40 left-20', delay: 0 },
          { icon: Globe, position: 'top-60 right-40', delay: 1 },
          { icon: Shield, position: 'bottom-40 right-20', delay: 0.5 },
        ].map((item, index) => (
          <motion.div
            key={`floating-${index}`}
            className={`absolute ${item.position} hidden lg:block`}
            animate={{
              y: [-10, 10, -10],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 4 + item.delay,
              repeat: Number.POSITIVE_INFINITY,
              ease: 'easeInOut',
              delay: item.delay,
            }}
          >
            <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-xl shadow-lg flex items-center justify-center">
              <item.icon size={24} className="text-waw-yellow" />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="w-full max-w-6xl mx-auto relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          {/* Left Side - Branding & Info */}
          <motion.div variants={itemVariants} className="text-white space-y-8">
            <div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
                className="inline-block px-6 py-3 bg-waw-yellow/20 text-waw-yellow rounded-full text-lg font-semibold mb-6"
              >
                🔐 Espace Client WAW
              </motion.div>

              <h1 className="text-4xl lg:text-6xl font-display font-bold leading-tight mb-6">
                Connectez-vous à votre{' '}
                <span className="bg-gradient-to-r from-waw-yellow to-waw-yellow-dark bg-clip-text text-transparent">
                  espace eSIM
                </span>
              </h1>

              <p className="text-xl text-gray-300 leading-relaxed mb-8">
                Gérez vos eSIM, consultez vos commandes et profitez d'une connectivité mondiale sans limites.
              </p>
            </div>

            {/* Features */}
            <div className="space-y-4">
              {[
                { icon: Globe, text: 'Gestion de vos eSIM actives' },
                { icon: Smartphone, text: 'Historique des commandes' },
                { icon: Shield, text: 'Sécurité renforcée' },
                { icon: Star, text: 'Support client prioritaire' }
              ].map((feature, index) => (
                <motion.div
                  key={feature.text}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <div className="w-10 h-10 bg-waw-yellow/20 rounded-lg flex items-center justify-center">
                    <feature.icon size={20} className="text-waw-yellow" />
                  </div>
                  <span className="text-gray-300">{feature.text}</span>
                </motion.div>
              ))}
            </div>

          </motion.div>

          {/* Right Side - Login Form */}
          <motion.div variants={itemVariants} className="w-full">
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 lg:p-10 border border-white/20 shadow-2xl">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">Connexion</h2>
                <p className="text-gray-300">Accédez à votre espace client WAW</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-200">
                    Adresse e-mail
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="block w-full pl-10 pr-3 py-3 border border-white/20 rounded-xl bg-white/10 backdrop-blur-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-waw-yellow focus:border-transparent transition-all"
                      placeholder="votre@email.com"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-200">
                    Mot de passe
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={formData.password}
                      onChange={handleInputChange}
                      className="block w-full pl-10 pr-12 py-3 border border-white/20 rounded-xl bg-white/10 backdrop-blur-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-waw-yellow focus:border-transparent transition-all"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-waw-yellow transition-colors" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400 hover:text-waw-yellow transition-colors" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-waw-yellow focus:ring-waw-yellow border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                      Se souvenir de moi
                    </label>
                  </div>

                  <button
                    type="button"
                    className="text-sm text-waw-yellow hover:text-waw-yellow-dark transition-colors"
                  >
                    Mot de passe oublié ?
                  </button>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-waw-yellow to-waw-yellow-dark text-waw-dark font-bold py-3 px-4 rounded-xl hover:shadow-lg transition-all flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="w-6 h-6 border-2 border-waw-dark border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Se connecter</span>
                      <ArrowRight size={20} />
                    </>
                  )}
                </motion.button>

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/20" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-transparent text-gray-400">ou</span>
                  </div>
                </div>

                {/* Sign Up Link */}
                <div className="text-center">
                  <p className="text-gray-300">
                    Pas encore de compte ?{' '}
                    <button
                      type="button"
                      onClick={() => onNavigate('register')}
                      className="text-waw-yellow hover:text-waw-yellow-dark font-semibold transition-colors"
                    >
                      Créer un compte
                    </button>
                  </p>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
