import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import BottomNav from '@/components/BottomNav';
import { LANDMARKS, ACHIEVEMENTS } from '@/data/europeData';
import { useTravelData } from '@/hooks/useTravelData';

export default function Badges() {
  const { isLandmarkUnlocked, isAchievementUnlocked, getUnlockedLandmarks, getUnlockedAchievements } = useTravelData();
  const unlockedCount = getUnlockedLandmarks().length;
  const achievementCount = getUnlockedAchievements().length;

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="bg-primary px-5 pb-6 pt-10 text-primary-foreground">
        <h1 className="text-xl font-black">🏅 勋章墙</h1>
        <p className="mt-1 text-sm font-bold opacity-80">
          已解锁 {unlockedCount}/{LANDMARKS.length} 地标 · {achievementCount}/{ACHIEVEMENTS.length} 成就
        </p>
      </div>

      <div className="mx-auto max-w-lg space-y-4 px-4 -mt-3">
        {/* Landmark Badges */}
        <Card className="shadow-lg">
          <CardContent className="p-5">
            <p className="mb-3 text-sm font-black">🗼 地标勋章</p>
            <div className="grid grid-cols-4 gap-3">
              {LANDMARKS.map((lm, i) => {
                const unlocked = isLandmarkUnlocked(lm);
                return (
                  <Tooltip key={lm.id}>
                    <TooltipTrigger asChild>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: i * 0.03 }}
                        className={`flex flex-col items-center gap-1 rounded-2xl p-2 transition-all ${
                          unlocked
                            ? 'bg-primary/10 shadow-sm'
                            : 'opacity-40 grayscale'
                        }`}
                      >
                        <span className="text-3xl">{unlocked ? lm.emoji : '🔒'}</span>
                        <span className="text-[10px] font-bold leading-tight text-center">
                          {unlocked ? lm.nameZh : '???'}
                        </span>
                      </motion.div>
                    </TooltipTrigger>
                    <TooltipContent className="rounded-xl">
                      <p className="font-bold">{lm.nameZh}</p>
                      <p className="text-xs text-muted-foreground">
                        {unlocked ? '✅ 已解锁' : `打卡${lm.cityZh}解锁`}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card className="shadow-lg">
          <CardContent className="p-5">
            <p className="mb-3 text-sm font-black">✨ 特殊成就</p>
            <div className="space-y-3">
              {ACHIEVEMENTS.map(ach => {
                const unlocked = isAchievementUnlocked(ach);
                return (
                  <div
                    key={ach.id}
                    className={`flex items-center gap-3 rounded-2xl p-3 transition-all ${
                      unlocked ? 'bg-secondary/10 shadow-sm' : 'opacity-50'
                    }`}
                  >
                    <span className="text-3xl">{unlocked ? ach.emoji : '🔒'}</span>
                    <div className="flex-1">
                      <p className="font-bold">{ach.nameZh}</p>
                      <p className="text-xs text-muted-foreground">{ach.description}</p>
                    </div>
                    {unlocked && (
                      <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-bold text-secondary-foreground">
                        已达成
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      <BottomNav />
    </div>
  );
}
