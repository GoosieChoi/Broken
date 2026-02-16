import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import BottomNav from '@/components/BottomNav';
import { COUNTRIES } from '@/data/europeData';
import { useTravelData } from '@/hooks/useTravelData';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel';

export default function Passport() {
  const { data } = useTravelData();
  const checkins = data.checkins;

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="bg-primary px-5 pb-6 pt-10 text-primary-foreground">
        <h1 className="text-xl font-black">📕 旅行护照</h1>
        <p className="mt-1 text-sm font-bold opacity-80">
          {checkins.length > 0 ? `已盖${checkins.length}个章` : '还没有盖章，快去打卡吧！'}
        </p>
      </div>

      <div className="mx-auto max-w-lg px-4 -mt-3">
        {checkins.length === 0 ? (
          <Card className="shadow-lg">
            <CardContent className="flex flex-col items-center gap-4 p-10 text-center">
              <span className="text-6xl">📖</span>
              <p className="text-lg font-bold">护照还是空的</p>
              <p className="text-sm text-muted-foreground">去打卡页面添加你去过的国家吧！</p>
            </CardContent>
          </Card>
        ) : (
          <div className="px-10">
            <Carousel className="w-full">
              <CarouselContent>
                {/* Cover */}
                <CarouselItem>
                  <Card className="border-0 bg-[hsl(220,40%,25%)] shadow-xl">
                    <CardContent className="flex h-80 flex-col items-center justify-center gap-4 text-center text-white">
                      <div className="rounded-full border-4 border-[hsl(45,80%,55%)] p-4">
                        <span className="text-5xl">🌍</span>
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.3em] text-[hsl(45,80%,55%)]">
                          TRAVEL PASSPORT
                        </p>
                        <p className="mt-1 text-lg font-black">欧洲旅行护照</p>
                        <p className="mt-2 text-sm opacity-70">{data.nickname}</p>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>

                {/* Stamps */}
                {checkins.map((checkin, idx) => {
                  const country = COUNTRIES.find(c => c.id === checkin.countryId);
                  if (!country) return null;

                  return (
                    <CarouselItem key={checkin.countryId}>
                      <Card className="border-0 bg-[hsl(40,30%,94%)] shadow-xl">
                        <CardContent className="flex h-80 flex-col items-center justify-center gap-3 p-6">
                          {/* Stamp */}
                          <motion.div
                            initial={{ scale: 0, rotate: -15 }}
                            animate={{ scale: 1, rotate: Math.random() * 10 - 5 }}
                            transition={{ type: 'spring', delay: 0.2 }}
                            className="relative"
                          >
                            <div className="flex h-36 w-36 flex-col items-center justify-center rounded-full border-[6px] border-dashed border-primary/60 bg-card p-4 shadow-inner">
                              <span className="text-5xl">{country.flag}</span>
                              <p className="mt-1 text-sm font-black text-primary">{country.nameZh}</p>
                            </div>
                            {/* Date ribbon */}
                            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-0.5 text-[10px] font-bold text-primary-foreground shadow">
                              {checkin.date}
                            </div>
                          </motion.div>

                          {/* Cities */}
                          {checkin.cities.length > 0 && (
                            <div className="mt-4 text-center">
                              <p className="text-xs font-bold text-muted-foreground">到访城市</p>
                              <div className="mt-1 flex flex-wrap justify-center gap-1">
                                {checkin.cities.map(city => (
                                  <span
                                    key={city.name}
                                    className="rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-bold text-primary"
                                  >
                                    📍 {city.name}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          <p className="mt-auto text-[10px] text-muted-foreground">
                            第 {idx + 1} / {checkins.length} 页
                          </p>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
