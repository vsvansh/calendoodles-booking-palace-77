
import { Link } from "react-router-dom";
import { Calendar, Heart, Github, Twitter, Facebook, Instagram } from "lucide-react";

const Footer = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="bg-white dark:bg-gray-900/90 border-t dark:border-gray-800 py-8 px-4 sm:px-6 lg:px-8 mt-6 transition-colors duration-300 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 group">
              <Calendar className="h-6 w-6 text-calendoodle-purple transition-transform group-hover:rotate-12 dark:text-calendoodle-purple/90" />
              <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-calendoodle-blue to-calendoodle-purple text-transparent bg-clip-text group-hover:from-calendoodle-purple group-hover:to-calendoodle-blue transition-all duration-500">
                Calendoodles
              </span>
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Simplify your scheduling and appointment management with our intuitive platform.
            </p>
            <div className="flex items-center space-x-4">
              <a href="#" className="text-gray-500 hover:text-calendoodle-blue transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-calendoodle-blue transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-calendoodle-blue transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-calendoodle-blue transition-colors">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">Product</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/features" className="text-sm text-gray-600 hover:text-calendoodle-blue dark:text-gray-400 dark:hover:text-calendoodle-blue">Features</Link>
              </li>
              <li>
                <Link to="/pricing" className="text-sm text-gray-600 hover:text-calendoodle-blue dark:text-gray-400 dark:hover:text-calendoodle-blue">Pricing</Link>
              </li>
              <li>
                <Link to="/integrations" className="text-sm text-gray-600 hover:text-calendoodle-blue dark:text-gray-400 dark:hover:text-calendoodle-blue">Integrations</Link>
              </li>
              <li>
                <Link to="/changelog" className="text-sm text-gray-600 hover:text-calendoodle-blue dark:text-gray-400 dark:hover:text-calendoodle-blue">Changelog</Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">Support</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/help" className="text-sm text-gray-600 hover:text-calendoodle-blue dark:text-gray-400 dark:hover:text-calendoodle-blue">Help Center</Link>
              </li>
              <li>
                <Link to="/documentation" className="text-sm text-gray-600 hover:text-calendoodle-blue dark:text-gray-400 dark:hover:text-calendoodle-blue">Documentation</Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-gray-600 hover:text-calendoodle-blue dark:text-gray-400 dark:hover:text-calendoodle-blue">Contact Us</Link>
              </li>
              <li>
                <Link to="/status" className="text-sm text-gray-600 hover:text-calendoodle-blue dark:text-gray-400 dark:hover:text-calendoodle-blue">System Status</Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/privacy" className="text-sm text-gray-600 hover:text-calendoodle-blue dark:text-gray-400 dark:hover:text-calendoodle-blue">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-gray-600 hover:text-calendoodle-blue dark:text-gray-400 dark:hover:text-calendoodle-blue">Terms of Service</Link>
              </li>
              <li>
                <Link to="/cookies" className="text-sm text-gray-600 hover:text-calendoodle-blue dark:text-gray-400 dark:hover:text-calendoodle-blue">Cookie Policy</Link>
              </li>
              <li>
                <Link to="/compliance" className="text-sm text-gray-600 hover:text-calendoodle-blue dark:text-gray-400 dark:hover:text-calendoodle-blue">Compliance</Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            &copy; {year} Calendoodles. All rights reserved.
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-4 md:mt-0 flex items-center">
            Made with <Heart className="h-4 w-4 text-red-500 mx-1" /> for better scheduling
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
