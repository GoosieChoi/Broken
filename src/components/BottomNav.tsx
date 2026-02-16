import { Link, useLocation } from 'react-router-dom';
import { Home, MapPin, Award, BookOpen, Camera } from 'lucide-react';

const tabs = [
  { path: '/', icon: Home, label: '首页' },
  { path: '/checkin', icon: MapPin, label: '打卡' },
  { path: '/badges', icon: Award, label: '勋章' },
  { path: '/passport', icon: BookOpen, label: '护照' },
  { path: '/summary', icon: Camera, label: '总结' },
];

export default function BottomNav() {
  const { pathname } = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-card pb-safe">
      <div className="mx-auto flex max-w-lg">
        {tabs.map(({ path, icon: Icon, label }) => {
          const active = pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className={`flex flex-1 flex-col items-center gap-0.5 py-2 text-xs font-bold transition-colors ${
                active ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <Icon className="h-5 w-5" strokeWidth={active ? 3 : 2} />
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
