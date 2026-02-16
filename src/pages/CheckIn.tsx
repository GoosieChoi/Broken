import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, X, ChevronDown, ChevronUp, Check } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import BottomNav from '@/components/BottomNav';
import { COUNTRIES, REGIONS } from '@/data/europeData';
import { useTravelData } from '@/hooks/useTravelData';

export default function CheckIn() {
  const { isCountryVisited, toggleCountry, getCountryCheckin, addCity, removeCity } = useTravelData();
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState<string | null>(null);
  const [cityName, setCityName] = useState('');
  const [cityDate, setCityDate] = useState(new Date().toISOString().slice(0, 10));

  const filtered = COUNTRIES.filter(c =>
    c.nameZh.includes(search) || c.id.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddCity = (countryId: string) => {
    if (!cityName.trim()) return;
    addCity(countryId, cityName.trim(), cityDate);
    setCityName('');
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="bg-primary px-5 pb-6 pt-10 text-primary-foreground">
        <h1 className="text-xl font-black">📍 打卡国家</h1>
        <p className="mt-1 text-sm font-bold opacity-80">选择你去过的国家和城市</p>
      </div>

      <div className="mx-auto max-w-lg px-4 -mt-3">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="搜索国家..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="rounded-2xl border-2 bg-card pl-10 font-bold"
          />
        </div>

        <div className="space-y-4">
          {REGIONS.map(region => {
            const countries = filtered.filter(c => c.region === region);
            if (countries.length === 0) return null;
            return (
              <div key={region}>
                <p className="mb-2 text-xs font-black uppercase tracking-wider text-muted-foreground">{region}</p>
                <div className="space-y-2">
                  {countries.map(country => {
                    const visited = isCountryVisited(country.id);
                    const checkin = getCountryCheckin(country.id);
                    const isExpanded = expanded === country.id;

                    return (
                      <Card key={country.id} className={`overflow-hidden transition-shadow ${visited ? 'shadow-md ring-2 ring-primary/30' : ''}`}>
                        <CardContent className="p-0">
                          <div className="flex items-center gap-3 p-3">
                            <span className="text-2xl">{country.flag}</span>
                            <div className="flex-1">
                              <p className="font-bold">{country.nameZh}</p>
                              {checkin && (
                                <p className="text-xs text-muted-foreground">
                                  {checkin.cities.length}个城市 · {checkin.date}
                                </p>
                              )}
                            </div>
                            <Button
                              size="sm"
                              variant={visited ? 'default' : 'outline'}
                              className="rounded-xl"
                              onClick={() => toggleCountry(country.id)}
                            >
                              {visited ? <Check className="h-4 w-4" /> : '打卡'}
                            </Button>
                            {visited && (
                              <button
                                onClick={() => setExpanded(isExpanded ? null : country.id)}
                                className="text-muted-foreground"
                              >
                                {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                              </button>
                            )}
                          </div>

                          <AnimatePresence>
                            {isExpanded && visited && (
                              <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: 'auto' }}
                                exit={{ height: 0 }}
                                className="overflow-hidden"
                              >
                                <div className="border-t px-3 pb-3 pt-2">
                                  {/* Cities */}
                                  {checkin?.cities.map(city => (
                                    <div key={city.name} className="flex items-center justify-between py-1">
                                      <span className="text-sm">📍 {city.name} <span className="text-xs text-muted-foreground">{city.date}</span></span>
                                      <button onClick={() => removeCity(country.id, city.name)}>
                                        <X className="h-3 w-3 text-muted-foreground" />
                                      </button>
                                    </div>
                                  ))}
                                  {/* Add city */}
                                  <div className="mt-2 flex gap-2">
                                    <Input
                                      placeholder="城市名称"
                                      value={cityName}
                                      onChange={e => setCityName(e.target.value)}
                                      className="h-8 flex-1 rounded-xl text-sm"
                                      onFocus={() => {}}
                                    />
                                    <Input
                                      type="date"
                                      value={cityDate}
                                      onChange={e => setCityDate(e.target.value)}
                                      className="h-8 w-32 rounded-xl text-sm"
                                    />
                                    <Button size="sm" className="h-8 rounded-xl" onClick={() => handleAddCity(country.id)}>
                                      <Plus className="h-3 w-3" />
                                    </Button>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
