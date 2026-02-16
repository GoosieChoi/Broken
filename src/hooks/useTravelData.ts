import { useState, useEffect, useCallback } from 'react';
import { LANDMARKS, ACHIEVEMENTS, type Landmark, type Achievement } from '@/data/europeData';

export interface CityCheckin {
  name: string;
  date: string;
}

export interface CountryCheckin {
  countryId: string;
  date: string;
  cities: CityCheckin[];
}

export interface TravelData {
  nickname: string;
  checkins: CountryCheckin[];
}

const STORAGE_KEY = 'europe-travel-data';

const defaultData: TravelData = {
  nickname: '旅行者',
  checkins: [],
};

export function useTravelData() {
  const [data, setData] = useState<TravelData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : defaultData;
    } catch {
      return defaultData;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const setNickname = useCallback((nickname: string) => {
    setData(prev => ({ ...prev, nickname }));
  }, []);

  const toggleCountry = useCallback((countryId: string) => {
    setData(prev => {
      const exists = prev.checkins.find(c => c.countryId === countryId);
      if (exists) {
        return { ...prev, checkins: prev.checkins.filter(c => c.countryId !== countryId) };
      }
      return {
        ...prev,
        checkins: [...prev.checkins, { countryId, date: new Date().toISOString().slice(0, 10), cities: [] }],
      };
    });
  }, []);

  const addCity = useCallback((countryId: string, cityName: string, date: string) => {
    setData(prev => ({
      ...prev,
      checkins: prev.checkins.map(c =>
        c.countryId === countryId
          ? { ...c, cities: [...c.cities, { name: cityName, date }] }
          : c
      ),
    }));
  }, []);

  const removeCity = useCallback((countryId: string, cityName: string) => {
    setData(prev => ({
      ...prev,
      checkins: prev.checkins.map(c =>
        c.countryId === countryId
          ? { ...c, cities: c.cities.filter(city => city.name !== cityName) }
          : c
      ),
    }));
  }, []);

  const isCountryVisited = useCallback((countryId: string) => {
    return data.checkins.some(c => c.countryId === countryId);
  }, [data.checkins]);

  const getCountryCheckin = useCallback((countryId: string) => {
    return data.checkins.find(c => c.countryId === countryId);
  }, [data.checkins]);

  const getVisitedCount = useCallback(() => data.checkins.length, [data.checkins]);

  const getTotalCities = useCallback(() => {
    return data.checkins.reduce((sum, c) => sum + c.cities.length, 0);
  }, [data.checkins]);

  const isLandmarkUnlocked = useCallback((landmark: Landmark) => {
    const checkin = data.checkins.find(c => c.countryId === landmark.countryId);
    if (!checkin) return false;
    return checkin.cities.some(city => {
      const name = city.name.toLowerCase();
      return name.includes(landmark.city.toLowerCase()) || city.name.includes(landmark.cityZh);
    });
  }, [data.checkins]);

  const getUnlockedLandmarks = useCallback(() => {
    return LANDMARKS.filter(l => isLandmarkUnlocked(l));
  }, [isLandmarkUnlocked]);

  const isAchievementUnlocked = useCallback((achievement: Achievement) => {
    if (achievement.minCountries) {
      return data.checkins.length >= achievement.minCountries;
    }
    return achievement.requiredCountries.every(cid =>
      data.checkins.some(c => c.countryId === cid)
    );
  }, [data.checkins]);

  const getUnlockedAchievements = useCallback(() => {
    return ACHIEVEMENTS.filter(a => isAchievementUnlocked(a));
  }, [isAchievementUnlocked]);

  return {
    data,
    setNickname,
    toggleCountry,
    addCity,
    removeCity,
    isCountryVisited,
    getCountryCheckin,
    getVisitedCount,
    getTotalCities,
    isLandmarkUnlocked,
    getUnlockedLandmarks,
    isAchievementUnlocked,
    getUnlockedAchievements,
  };
}
