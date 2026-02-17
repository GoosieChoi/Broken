import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

type Mode = 'truth' | 'dare' | null;

const TRUTHS = [
  '你最近一次偷偷想ta是什么时候？',
  '你手机里有没有不敢让对方看的聊天记录？',
  '你觉得这段感情里最遗憾的事是什么？',
  '你有没有偷偷关注过前任的社交媒体？',
  '你最怕对方说哪句话？',
  '你觉得你们之间最大的问题是什么？',
  '如果可以改变对方一个缺点，你会改什么？',
  '你有没有因为ta哭过？',
  '你最想对ta说但一直没说出口的话是什么？',
  '你觉得你们会在一起多久？',
  '你做过最浪漫的事是什么？',
  '你有没有想过和别人在一起？',
  '你上一次说"我爱你"是什么时候？',
  '你最喜欢对方身上哪个特质？',
  '你们吵架的时候谁先认错？',
];

const DARES = [
  '给对方发一条超肉麻的消息。',
  '现在立刻给ta打一个电话说"我想你了"。',
  '把你们的合照设为头像一整天。',
  '发一条朋友圈夸ta。',
  '给对方唱一首情歌（录语音）。',
  '模仿对方说话的样子持续30秒。',
  '翻出你们第一条聊天记录截图发出来。',
  '用一个表情包形容你现在的心情发给ta。',
  '给对方写一段50字以上的情话。',
  '接下来一小时只能用"宝贝"称呼对方。',
  '把手机壁纸换成对方的照片。',
  '发一条语音说"你是我最重要的人"。',
  '闭眼画一幅对方的肖像给ta看。',
  '用三个emoji表达你对ta的感觉。',
  '假装第一次认识，重新自我介绍。',
];

export default function TruthOrDare() {
  const [mode, setMode] = useState<Mode>(null);
  const [card, setCard] = useState<string | null>(null);
  const [lastIdx, setLastIdx] = useState<Record<string, number>>({});
  const navigate = useNavigate();

  const draw = (m: NonNullable<Mode>) => {
    setMode(m);
    const pool = m === 'truth' ? TRUTHS : DARES;
    const prevIdx = lastIdx[m];
    let idx: number;
    do {
      idx = Math.floor(Math.random() * pool.length);
    } while (idx === prevIdx && pool.length > 1);
    setLastIdx(prev => ({ ...prev, [m]: idx }));
    setCard(pool[idx]);
  };

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-between px-5 py-10">
      <div className="w-full max-w-sm flex-1 flex flex-col justify-center space-y-8">
        {/* Title */}
        <motion.div className="text-center" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-black">
            <span style={{ color: 'hsl(350, 100%, 86%)' }}>真心话</span>
            <span style={{ color: 'hsl(0, 0%, 66%)' }}> · </span>
            <span style={{ color: 'hsl(350, 100%, 86%)' }}>大冒险</span>
          </h1>
          <p className="mt-2 text-sm font-bold text-muted-foreground">情侣专属小游戏 💕</p>
        </motion.div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => draw('truth')}
            className={`rounded-2xl py-6 text-lg font-extrabold transition-all active:scale-95 ${
              mode === 'truth'
                ? 'bg-primary text-primary-foreground shadow-md'
                : 'bg-muted text-muted-foreground'
            }`}
          >
            💬 真心话
          </button>
          <button
            onClick={() => draw('dare')}
            className={`rounded-2xl py-6 text-lg font-extrabold transition-all active:scale-95 ${
              mode === 'dare'
                ? 'bg-primary text-primary-foreground shadow-md'
                : 'bg-muted text-muted-foreground'
            }`}
          >
            🔥 大冒险
          </button>
        </div>

        {/* Card */}
        <AnimatePresence mode="wait">
          {card && (
            <motion.div
              key={card}
              initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: 'spring', damping: 15 }}
              className="rounded-3xl p-8 text-center"
              style={{ background: 'hsl(340, 50%, 97%)' }}
            >
              <p className="text-5xl mb-4">{mode === 'truth' ? '💬' : '🔥'}</p>
              <p className="text-lg font-extrabold text-foreground leading-relaxed">{card}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Actions */}
        {card && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-2 gap-3"
          >
            <button
              onClick={() => draw(mode!)}
              className="rounded-2xl bg-muted py-4 text-base font-extrabold text-muted-foreground transition-all active:scale-95"
            >
              🔁 换一题
            </button>
            <button
              onClick={() => draw(mode === 'truth' ? 'dare' : 'truth')}
              className="rounded-2xl bg-accent py-4 text-base font-extrabold text-accent-foreground transition-all active:scale-95"
            >
              🔄 换{mode === 'truth' ? '大冒险' : '真心话'}
            </button>
          </motion.div>
        )}

        {/* Back button */}
        <button
          onClick={() => navigate('/')}
          className="rounded-2xl bg-muted py-3 text-sm font-extrabold text-muted-foreground transition-all active:scale-95"
        >
          ← 返回首页
        </button>
      </div>

      <p className="text-center text-[10px] text-muted-foreground/40 pt-6">made by Goosie</p>
    </div>
  );
}
