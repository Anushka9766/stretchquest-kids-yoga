import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Star, Trophy, Sparkles } from "lucide-react";

interface CompletionScreenProps {
  totalStars: number;
  onRestart: () => void;
}

export const CompletionScreen = ({ totalStars, onRestart }: CompletionScreenProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <Card className="w-full max-w-2xl p-8 md:p-12 text-center shadow-[0_8px_24px_-4px_hsl(270_70%_60%/0.3)] border-2 border-primary/20">
        <div className="mb-6 flex justify-center">
          <div className="relative animate-bounce-gentle">
            <Trophy className="w-32 h-32 text-secondary fill-secondary" />
            <Sparkles className="w-12 h-12 text-accent absolute -top-2 -right-2 sparkle" />
          </div>
        </div>

        <h1 className="text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
          Quest Complete!
        </h1>

        <p className="text-2xl md:text-3xl font-bold text-foreground mb-8">
          You're a Yoga Champion! 🎉
        </p>

        <div className="mb-8 bg-gradient-to-r from-primary/20 via-accent/20 to-secondary/20 rounded-2xl p-6 border-2 border-primary/30">
          <p className="text-xl text-muted-foreground mb-4">You earned:</p>
          <div className="flex justify-center gap-2 mb-2">
            {Array.from({ length: totalStars }).map((_, index) => (
              <Star
                key={index}
                className="w-10 h-10 text-secondary fill-secondary bounce-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              />
            ))}
          </div>
          <p className="text-4xl font-black text-primary">{totalStars} Stars!</p>
        </div>

        <div className="space-y-4 mb-8 text-left bg-muted/50 rounded-xl p-6">
          <h3 className="text-xl font-bold text-center mb-4 text-foreground">
            What You Learned Today:
          </h3>
          <ul className="space-y-2 text-base text-foreground">
            <li className="flex items-center gap-3">
              <span className="text-2xl">🌳</span>
              <span>Balance and focus with Tree Pose</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-2xl">🐱</span>
              <span>Flexibility with Cat-Cow Pose</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-2xl">⚔️</span>
              <span>Strength and confidence with Warrior Pose</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-2xl">🐕</span>
              <span>Energy and stretching with Downward Dog</span>
            </li>
          </ul>
        </div>

        <Button
          variant="hero"
          size="xl"
          onClick={onRestart}
          className="bounce-in"
        >
          Practice Again! 🌟
        </Button>

        <p className="mt-6 text-muted-foreground">
          Great job today! Come back tomorrow for more yoga fun!
        </p>
      </Card>
    </div>
  );
};
