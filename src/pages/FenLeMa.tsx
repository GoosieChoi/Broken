import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';

type Gender = 'female' | 'male' | null;
type Status = 'broken' | 'together' | 'thinking' | 'single' | null;

const COPIES: Record<string, { text: string; emoji: string }[]> = {
  'female-broken': [
    { text: '恭喜你，重获新生。', emoji: '🦋' },
    { text: '他配不上你的emo。', emoji: '👑' },
    { text: '下一个更乖，真的。', emoji: '✨' },
    { text: '今晚可以哭，明天必须赢。', emoji: '🥊' },
  ],
  'male-broken': [
    { text: '兄弟，喝顿酒就好了。', emoji: '🍺' },
    { text: '失去你是她的损失。', emoji: '🚬' },
    { text: '游戏它不香吗？', emoji: '🎮' },
    { text: '下一个会更好，信我。', emoji: '👍' },
  ],
  'female-together': [
    { text: '挺好的，继续甜。', emoji: '🍭' },
    { text: '今天又被他可爱到了。', emoji: '🥰' },
    { text: '平平淡淡才是真。', emoji: '🌸' },
    { text: '吵架了吗？没有就好。', emoji: '☁️' },
  ],
  'male-together': [
    { text: '好好珍惜，兄弟。', emoji: '🤝' },
    { text: '今天没挨骂，胜利。', emoji: '✌️' },
    { text: '爱情还在，游戏照打。', emoji: '🎯' },
    { text: '挺好，省得被兄弟嘲笑。', emoji: '😏' },
  ],
  'female-thinking': [
    { text: '再想想，万一他改了呢？', emoji: '🌧️' },
    { text: '姐妹，你值得更好的，但别冲动。', emoji: '⚖️' },
    { text: '先冷战三天试试？', emoji: '❄️' },
    { text: '分还是不分，这是个问题。', emoji: '🤯' },
  ],
  'male-thinking': [
    { text: '想清楚，回头别后悔。', emoji: '🌪️' },
    { text: '自由和孤独，你选哪个？', emoji: '🕯️' },
    { text: '要不…先打盘游戏冷静下？', emoji: '🎮' },
    { text: '分了吧，别耽误人家。', emoji: '😐' },
  ],
  'female-single': [
    { text: '单身是最好的增值期。', emoji: '💎' },
    { text: '一个人也可以很精彩。', emoji: '🌟' },
    { text: '等一个对的人，不着急。', emoji: '🌹' },
    { text: '自由自在，谁都羡慕你。', emoji: '🦅' },
  ],
  'male-single': [
    { text: '单身贵族，你最酷。', emoji: '😎' },
    { text: '一个人挺好，钱都是自己的。', emoji: '💰' },
    { text: '缘分到了自然来。', emoji: '🍀' },
    { text: '兄弟，先搞事业。', emoji: '🚀' },
  ],
};

const statusOptions: { key: NonNullable<Status>; label: string; emoji: string }[] = [
  { key: 'broken', label: '分了', emoji: '💔' },
  { key: 'together', label: '没分', emoji: '💑' },
  { key: 'thinking', label: '想分', emoji: '🤔' },
  { key: 'single', label: '单身', emoji: '🧍' },
];

export default function FenLeMa() {
  const [gender, setGender] = useState<Gender>(null);
  const [result, setResult] = useState<{ text: string; emoji: string; status: NonNullable<Status> } | null>(null);
  const [lastPickIndex, setLastPickIndex] = useState<Record<string, number>>({});
  const [showHint, setShowHint] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleStatus = (status: NonNullable<Status>) => {
    if (!gender) {
      setShowHint(true);
      setTimeout(() => setShowHint(false), 2000);
      return;
    }
    const key = `${gender}-${status}`;
    const pool = COPIES[key];
    const lastIdx = lastPickIndex[key];

    // Pick a random index that differs from the last one
    let idx: number;
    if (pool.length <= 1) {
      idx = 0;
    } else {
      do {
        idx = Math.floor(Math.random() * pool.length);
      } while (idx === lastIdx);
    }

    setLastPickIndex(prev => ({ ...prev, [key]: idx }));
    setResult({ ...pool[idx], status });
  };

  const reset = () => {
    setGender(null);
    setResult(null);
  };

  const handleShare = async () => {
    if (!resultRef.current) return;
    try {
      const canvas = await html2canvas(resultRef.current, { scale: 2, backgroundColor: '#fff' });
      const link = document.createElement('a');
      link.download = `分了吗-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (e) {
      console.error(e);
    }
  };

  const genderLabel = gender === 'female' ? '👧 女生' : gender === 'male' ? '👦 男生' : '';
  const statusLabel = result ? statusOptions.find(s => s.key === result.status) : null;

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-between px-5 py-10">
      <div className="w-full max-w-sm flex-1 flex flex-col justify-center space-y-8">
        {/* Title */}
        <motion.div className="text-center" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-5xl font-black">
            <span style={{ color: 'hsl(350, 100%, 86%)' }}>分</span>
            <span style={{ color: 'hsl(0, 0%, 66%)' }}>了</span>
            <span style={{ color: 'hsl(350, 100%, 86%)' }}>吗</span>
          </h1>
        </motion.div>

        {/* Content to screenshot */}
        <div ref={resultRef} className="space-y-6 rounded-3xl bg-card p-6">
          {/* Gender */}
          <div className="space-y-2">
            <p className="text-center text-sm font-bold text-muted-foreground">你是</p>
            <div className="grid grid-cols-2 gap-3">
              {([['female', '👧 我是女生'], ['male', '👦 我是男生']] as const).map(([g, label]) => (
                <button
                  key={g}
                  onClick={() => { setGender(g); setResult(null); }}
                  className={`rounded-2xl py-4 text-base font-extrabold transition-all ${
                    gender === g
                      ? 'bg-primary text-primary-foreground shadow-md'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Status */}
          <div className="space-y-2">
            <p className="text-center text-sm font-bold text-muted-foreground">你的状态</p>
            <div className="grid grid-cols-4 gap-2">
              {statusOptions.map(({ key, label, emoji }) => (
                <button
                  key={key}
                  onClick={() => handleStatus(key)}
                  className={`rounded-2xl py-3 text-sm font-extrabold transition-all ${
                    result?.status === key
                      ? 'bg-primary text-primary-foreground shadow-md'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {label} {emoji}
                </button>
              ))}
            </div>
          </div>

          {/* Hint */}
          <AnimatePresence>
            {showHint && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-center text-sm font-bold"
                style={{ color: 'hsl(350, 80%, 65%)' }}
              >
                先说说你是男生还是女生嘛～
              </motion.p>
            )}
          </AnimatePresence>

          {/* Result */}
          <AnimatePresence mode="wait">
            {result && (
              <motion.div
                key={result.text}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="space-y-3 rounded-2xl py-6 text-center"
                style={{ background: 'hsl(340, 50%, 97%)' }}
              >
                <p className="text-7xl">{result.emoji}</p>
                <p className="px-4 text-lg font-extrabold text-foreground">{result.text}</p>
                {genderLabel && statusLabel && (
                  <p className="text-xs font-bold text-muted-foreground">
                    {genderLabel} · {statusLabel.label} {statusLabel.emoji}
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Watermark (visible in screenshot) */}
          {result && (
            <p className="text-center text-[10px] font-bold text-muted-foreground opacity-40">
              分了吗 · fenle.ma
            </p>
          )}
        </div>

        {/* Action buttons */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-3 gap-3"
          >
            <button
              onClick={reset}
              className="rounded-2xl bg-muted py-4 text-sm font-extrabold text-muted-foreground transition-all active:scale-95"
            >
              🔁 再来一次
            </button>
            <button
              onClick={() => navigate('/game')}
              className="rounded-2xl bg-accent py-4 text-sm font-extrabold text-accent-foreground transition-all active:scale-95"
            >
              🎲 小游戏
            </button>
            <button
              onClick={handleShare}
              className="rounded-2xl bg-primary py-4 text-sm font-extrabold text-primary-foreground shadow-md transition-all active:scale-95"
            >
              📸 截图分享
            </button>
          </motion.div>
        )}
      </div>

      {/* Footer - always at bottom */}
      <p className="text-center text-[10px] text-muted-foreground/40 pt-6">made by Goosie</p>
    </div>
  );
}
