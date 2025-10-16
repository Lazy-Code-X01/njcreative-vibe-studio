import { LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
}

export const StatsCard = ({ title, value, icon: Icon, description }: StatsCardProps) => {
  return (
    <Card className="glass-card group cursor-default">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
          {title}
        </CardTitle>
        <div className="p-2 rounded-lg bg-secondary/10 group-hover:bg-secondary/20 transition-colors">
          <Icon className="h-5 w-5 text-secondary" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
          {value}
        </div>
        {description && (
          <p className="text-xs text-muted-foreground mt-2 group-hover:text-muted-foreground/80 transition-colors">
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  );
};
