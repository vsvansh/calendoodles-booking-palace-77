
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface PolicyPageProps {
  title: string;
  children: ReactNode;
}

const PolicyPage: React.FC<PolicyPageProps> = ({ title, children }) => {
  return (
    <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6">
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link to="/contact-us">
            <Button variant="outline" size="sm" className="rounded-full">
              <ArrowLeft className="h-4 w-4 mr-1" /> Back
            </Button>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-200 dark:to-white bg-clip-text text-transparent">
            {title}
          </h1>
        </div>
        
        <div className="prose prose-lg dark:prose-invert max-w-none">
          {children}
        </div>
        
        <div className="pt-8 border-t border-gray-200 dark:border-gray-700">
          <Link to="/contact-us">
            <Button variant="ghost" className="text-calendoodle-blue hover:text-calendoodle-blue/80">
              <ArrowLeft className="h-4 w-4 mr-1" /> Back to Contact Us
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PolicyPage;
