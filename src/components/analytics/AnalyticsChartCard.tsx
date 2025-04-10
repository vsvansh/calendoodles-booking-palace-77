
import { useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import { Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AnalyticsChartCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  chartType: 'line' | 'bar';
  data: {
    weekly: any[];
    monthly: any[];
    yearly: any[];
  };
  dataKeys: {
    name: string;
    keys: { key: string; name: string; color: string }[];
  };
}

const AnalyticsChartCard = ({ 
  title, 
  description, 
  icon, 
  chartType, 
  data, 
  dataKeys 
}: AnalyticsChartCardProps) => {
  const { toast } = useToast();
  const [period, setPeriod] = useState<'weekly' | 'monthly' | 'yearly'>('monthly');
  
  const handleViewReport = () => {
    toast({
      title: `Viewing ${title} Report`,
      description: `The detailed ${title.toLowerCase()} report is being prepared.`,
    });
  };
  
  const currentData = data[period];
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="flex items-center gap-2">
              {icon}
              <span>{title}</span>
            </CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <ButtonGroup className="mb-2 sm:mb-0">
              <Button
                variant="outline"
                size="sm"
                className={period === 'weekly' ? 'bg-gray-100 dark:bg-gray-800' : ''}
                onClick={() => setPeriod('weekly')}
              >
                Weekly
              </Button>
              <Button
                variant="outline"
                size="sm"
                className={period === 'monthly' ? 'bg-gray-100 dark:bg-gray-800' : ''}
                onClick={() => setPeriod('monthly')}
              >
                Monthly
              </Button>
              <Button
                variant="outline"
                size="sm"
                className={period === 'yearly' ? 'bg-gray-100 dark:bg-gray-800' : ''}
                onClick={() => setPeriod('yearly')}
              >
                Yearly
              </Button>
            </ButtonGroup>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleViewReport}
              className="text-calendoodle-blue hover:text-calendoodle-blue/90 hover:bg-calendoodle-blue/10 transition-colors"
            >
              <Eye className="h-4 w-4 mr-1" /> View Report
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === 'line' ? (
              <LineChart
                data={currentData}
                margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                <XAxis dataKey={dataKeys.name} stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(17, 24, 39, 0.8)', 
                    border: 'none',
                    borderRadius: '4px',
                    color: '#F9FAFB' 
                  }}
                />
                <Legend />
                {dataKeys.keys.map(key => (
                  <Line
                    key={key.key}
                    type="monotone" 
                    dataKey={key.key} 
                    name={key.name}
                    stroke={key.color} 
                    activeDot={{ r: 8 }} 
                    strokeWidth={2}
                  />
                ))}
              </LineChart>
            ) : (
              <BarChart
                data={currentData}
                margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                <XAxis dataKey={dataKeys.name} stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(17, 24, 39, 0.8)', 
                    border: 'none',
                    borderRadius: '4px',
                    color: '#F9FAFB' 
                  }}
                />
                <Legend />
                {dataKeys.keys.map(key => (
                  <Bar
                    key={key.key}
                    dataKey={key.key}
                    name={key.name}
                    fill={key.color}
                  />
                ))}
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalyticsChartCard;
