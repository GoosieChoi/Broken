import { COUNTRIES, REGIONS, MAP_COLORS, TOTAL_COUNTRIES } from '@/data/europeData';
import { useTravelData } from '@/hooks/useTravelData';

interface Props {
  compact?: boolean;
}

export default function EuropeMapGrid({ compact = false }: Props) {
  const { isCountryVisited } = useTravelData();
  const visited = COUNTRIES.filter(c => isCountryVisited(c.id));
  const size = compact ? 'h-8 w-8 text-base' : 'h-10 w-10 text-lg';

  return (
    <div className="space-y-3">
      {REGIONS.map(region => {
        const countries = COUNTRIES.filter(c => c.region === region);
        return (
          <div key={region}>
            {!compact && (
              <p className="mb-1 text-xs font-bold text-muted-foreground">{region}</p>
            )}
            <div className="flex flex-wrap gap-1.5">
              {countries.map(country => {
                const vis = isCountryVisited(country.id);
                return (
                  <div
                    key={country.id}
                    title={country.nameZh}
                    className={`${size} flex items-center justify-center rounded-xl font-bold transition-all ${
                      vis
                        ? 'scale-105 shadow-md'
                        : 'opacity-30 grayscale'
                    }`}
                    style={vis ? { backgroundColor: MAP_COLORS[country.colorIndex] } : {}}
                  >
                    {country.flag}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
