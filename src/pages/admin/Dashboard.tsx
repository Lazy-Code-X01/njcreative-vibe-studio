import { useQuery } from '@tanstack/react-query';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { StatsCard } from '@/components/admin/StatsCard';
import { adminApi } from '@/lib/adminApi';
import { FileText, MessageSquare, CheckCircle, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#166534', '#15803d', '#16a34a', '#22c55e', '#4ade80'];

export default function AdminDashboard() {
  const { data: analytics, isLoading } = useQuery({
    queryKey: ['analytics'],
    queryFn: async () => {
      const res = await adminApi.getAnalytics();
      return res.data;
    },
    refetchInterval: 30000, // Refetch every 30 seconds
    refetchOnWindowFocus: true, // Refetch when window regains focus
  });

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Here's your overview</p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total Blog Posts"
            value={analytics?.totalPosts || 0}
            icon={FileText}
            description="All blog posts"
          />
          <StatsCard
            title="Published Posts"
            value={analytics?.publishedPosts || 0}
            icon={CheckCircle}
            description="Live on website"
          />
          <StatsCard
            title="Total Messages"
            value={analytics?.totalMessages || 0}
            icon={MessageSquare}
            description="Contact submissions"
          />
          <StatsCard
            title="Recent Messages"
            value={analytics?.recentMessages || 0}
            icon={TrendingUp}
            description="Last 7 days"
          />
        </div>

        {/* Charts Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Monthly Activity */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-sm font-semibold text-foreground">Monthly Activity</CardTitle>
              <CardDescription>Contact messages over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analytics?.monthlyActivity || []}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                  <XAxis dataKey="_id" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(0 0% 9%)',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      color: 'hsl(var(--foreground))'
                    }}
                    labelStyle={{ color: 'hsl(var(--foreground))' }}
                    itemStyle={{ color: 'hsl(var(--foreground))' }}
                    cursor={{ fill: 'hsl(var(--primary) / 0.08)' }}
                  />
                  <Bar dataKey="count" fill="hsl(var(--primary-glow))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Posts by Category */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-sm font-semibold text-foreground">Posts by Category</CardTitle>
              <CardDescription>Distribution of blog posts</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={analytics?.postsByCategory || []}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={(entry) => entry.category || 'Uncategorized'}
                    outerRadius={90}
                    fill="#8884d8"
                    dataKey="count"
                    nameKey="category"
                  >
                    {(analytics?.postsByCategory || []).map((_: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(0 0% 9%)',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      color: 'hsl(var(--foreground))'
                    }}
                    labelStyle={{ color: 'hsl(var(--foreground))' }}
                    itemStyle={{ color: 'hsl(var(--foreground))' }}
                    formatter={(value: number, _name, item: any) => [value, item?.payload?.category || 'Uncategorized']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
