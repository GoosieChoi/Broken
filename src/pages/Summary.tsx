import { useRef, useState } from 'react';
import { Download, Loader2 } from 'lucide-react';
import html2canvas from 'html2canvas';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import BottomNav from '@/components/BottomNav';
import { COUNTRIES, TOTAL_COUNTRIES, MAP_COLORS } from '@/data/europeData';
import { useTravelData } from '@/hooks/useTravelData';

export default function Summary() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [generating, setGenerating] = useState(false);
  const { data, getVisitedCount, getTotalCities, getUnlockedLandmarks, getUnlockedAchievements, isCountryVisited } = useTravelData();

  const visitedCount = getVisitedCount();
  const totalCities = getTotalCities();
  const landmarks = getUnlockedLandmarks();
  const achievements = getUnlockedAchievements();
  const pct = Math.round((visitedCount / TOTAL_COUNTRIES) * 100);

  const handleGenerate = async () => {
    if (!cardRef.current) return;
    setGenerating(true);
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        backgroundColor: null,
        useCORS: true,
      });
      const link = document.createElement('a');
      link.download = `europe-travel-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (e) {
      console.error('Generate failed:', e);
    }
    setGenerating(false);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="bg-primary px-5 pb-6 pt-10 text-primary-foreground">
        <h1 className="text-xl font-black">📸 生成总结图</h1>
        <p className="mt-1 text-sm font-bold opacity-80">保存精美足迹图，分享到朋友圈</p>
      </div>

      <div className="mx-auto max-w-lg space-y-4 px-4 -mt-3">
        {/* Preview Card */}
        <div
          ref={cardRef}
          className="overflow-hidden rounded-3xl"
          style={{
            background: 'linear-gradient(135deg, hsl(25, 95%, 55%), hsl(340, 72%, 58%), hsl(270, 55%, 58%))',
            padding: '24px',
          }}
        >
          <div className="rounded-2xl bg-white/95 p-5 shadow-xl backdrop-blur">
            {/* Title */}
            <div className="mb-4 text-center">
              <p className="text-2xl font-black" style={{ color: 'hsl(25, 95%, 50%)' }}>
                🌍 我的欧洲足迹
              </p>
              <p className="mt-1 text-sm font-bold" style={{ color: 'hsl(25, 15%, 50%)' }}>
                {data.nickname} 的旅行记录
              </p>
            </div>

            {/* Stats Row */}
            <div className="mb-4 flex justify-around rounded-2xl p-3" style={{ background: 'hsl(25, 95%, 96%)' }}>
              <div className="text-center">
                <p className="text-2xl font-black" style={{ color: 'hsl(25, 95%, 50%)' }}>{visitedCount}</p>
                <p className="text-[11px] font-bold" style={{ color: 'hsl(25, 15%, 50%)' }}>国家</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-black" style={{ color: 'hsl(145, 55%, 44%)' }}>{totalCities}</p>
                <p className="text-[11px] font-bold" style={{ color: 'hsl(25, 15%, 50%)' }}>城市</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-black" style={{ color: 'hsl(210, 80%, 55%)' }}>{landmarks.length + achievements.length}</p>
                <p className="text-[11px] font-bold" style={{ color: 'hsl(25, 15%, 50%)' }}>勋章</p>
              </div>
            </div>

            {/* Progress */}
            <div className="mb-4">
              <div className="mb-1 flex justify-between text-xs font-bold" style={{ color: 'hsl(25, 15%, 50%)' }}>
                <span>探索进度</span>
                <span>{pct}%</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full" style={{ background: 'hsl(35, 20%, 90%)' }}>
                <div
                  className="h-full rounded-full transition-all"
                  style={{ width: `${pct}%`, background: 'linear-gradient(90deg, hsl(25, 95%, 55%), hsl(340, 72%, 58%))' }}
                />
              </div>
            </div>

            {/* Recent Badges */}
            {landmarks.length > 0 && (
              <div className="mb-4">
                <p className="mb-2 text-xs font-black" style={{ color: 'hsl(25, 30%, 30%)' }}>🏅 解锁勋章</p>
                <div className="flex flex-wrap gap-2">
                  {landmarks.slice(-5).map(b => (
                    <div key={b.id} className="flex items-center gap-1 rounded-full px-2 py-1" style={{ background: 'hsl(25, 95%, 96%)' }}>
                      <span className="text-lg">{b.emoji}</span>
                      <span className="text-[10px] font-bold" style={{ color: 'hsl(25, 30%, 30%)' }}>{b.nameZh}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Mini Map */}
            <div className="mb-3">
              <p className="mb-2 text-xs font-black" style={{ color: 'hsl(25, 30%, 30%)' }}>🗺️ 足迹地图</p>
              <div className="flex flex-wrap gap-1">
                {COUNTRIES.map(c => {
                  const visited = isCountryVisited(c.id);
                  return (
                    <div
                      key={c.id}
                      className="flex h-7 w-7 items-center justify-center rounded-lg text-sm"
                      style={{
                        backgroundColor: visited ? MAP_COLORS[c.colorIndex] : 'hsl(35, 15%, 90%)',
                        opacity: visited ? 1 : 0.3,
                      }}
                    >
                      {c.flag}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Footer */}
            <p className="text-center text-[10px] font-bold" style={{ color: 'hsl(25, 15%, 70%)' }}>
              欧洲足迹打卡 · {new Date().toLocaleDateString('zh-CN')}
            </p>
          </div>
        </div>

        {/* Generate Button */}
        <Button
          className="w-full rounded-2xl py-6 text-lg font-black shadow-lg"
          onClick={handleGenerate}
          disabled={generating}
        >
          {generating ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              生成中...
            </>
          ) : (
            <>
              <Download className="mr-2 h-5 w-5" />
              保存足迹总结图
            </>
          )}
        </Button>
      </div>

      <BottomNav />
    </div>
  );
}
