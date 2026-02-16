import { Link } from 'react-router-dom';
import { MapPin, Award, BookOpen, Camera, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import BottomNav from '@/components/BottomNav';
import EuropeMapGrid from '@/components/EuropeMapGrid';
import { TOTAL_COUNTRIES } from '@/data/europeData';
import { useTravelData } from '@/hooks/useTravelData';

const quickActions = [
  { path: '/checkin', icon: MapPin, label: '打卡', color: 'bg-primary' },
  { path: '/passport', icon: BookOpen, label: '护照', color: 'bg-secondary' },
  { path: '/badges', icon: Award, label: '勋章', color: 'bg-accent' },
  { path: '/summary', icon: Camera, label: '总结图', color: 'bg-[hsl(340,72%,58%)]' },
];

export default function Home() {
  const { data, getVisitedCount, getTotalCities, getUnlockedLandmarks } = useTravelData();
  const visitedCount = getVisitedCount();
  const totalCities = getTotalCities();
  const badges = getUnlockedLandmarks();
  const pct = Math.round((visitedCount / TOTAL_COUNTRIES) * 100);

  const level = visitedCount === 0 ? '🌱 新手旅行者' : visitedCount < 5 ? '🎒 背包客' : visitedCount < 10 ? '✈️ 旅行达人' : visitedCount < 20 ? '🌟 欧洲通' : '👑 欧洲之王';

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-primary px-5 pb-8 pt-10 text-primary-foreground">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-sm font-bold opacity-80">你好，{data.nickname}！</p>
          <h1 className="mt-1 text-2xl font-black">🌍 欧洲足迹打卡</h1>
          <p className="mt-1 text-sm font-bold">{level}</p>
        </motion.div>
      </div>

      <div className="mx-auto max-w-lg space-y-4 px-4 -mt-4">
        {/* Progress Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="shadow-lg">
            <CardContent className="p-5">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-bold text-muted-foreground">足迹进度</span>
                <span className="text-lg font-black text-primary">{visitedCount}/{TOTAL_COUNTRIES}</span>
              </div>
              <Progress value={pct} className="h-3 rounded-full" />
              <div className="mt-3 flex justify-around text-center">
                <div>
                  <p className="text-2xl font-black text-primary">{visitedCount}</p>
                  <p className="text-xs font-bold text-muted-foreground">国家</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-secondary">{totalCities}</p>
                  <p className="text-xs font-bold text-muted-foreground">城市</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-accent">{badges.length}</p>
                  <p className="text-xs font-bold text-muted-foreground">勋章</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          className="grid grid-cols-4 gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {quickActions.map(({ path, icon: Icon, label, color }) => (
            <Link
              key={path}
              to={path}
              className={`${color} flex flex-col items-center gap-1.5 rounded-2xl p-3 text-white shadow-md transition-transform active:scale-95`}
            >
              <Icon className="h-6 w-6" strokeWidth={2.5} />
              <span className="text-xs font-bold">{label}</span>
            </Link>
          ))}
        </motion.div>

        {/* Recent Badges */}
        {badges.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card className="shadow-lg">
              <CardContent className="p-5">
                <div className="mb-3 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span className="text-sm font-bold">最近解锁勋章</span>
                </div>
                <div className="flex gap-3">
                  {badges.slice(-5).map(b => (
                    <div key={b.id} className="flex flex-col items-center gap-1" title={b.nameZh}>
                      <span className="text-3xl">{b.emoji}</span>
                      <span className="text-[10px] font-bold text-muted-foreground">{b.nameZh}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Map Grid */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card className="shadow-lg">
            <CardContent className="p-5">
              <p className="mb-3 text-sm font-bold">🗺️ 欧洲足迹地图</p>
              <EuropeMapGrid />
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
}
