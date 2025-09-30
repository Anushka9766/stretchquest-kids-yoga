import { Button } from "@/components/ui/button";
import { Sparkles, Star } from "lucide-react";

interface WelcomeScreenProps {
  onStart: () => void;
}

export const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
      <div className="animate-bounce-gentle mb-8">
        <Sparkles className="w-20 h-20 text-primary sparkle" />
      </div>
      
      <h1 className="text-6xl md:text-8xl font-black mb-4 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent drop-shadow-lg animate-wiggle">
        StretchQuest
      </h1>
      
      <p className="text-2xl md:text-3xl font-bold text-foreground mb-2">
        🧘‍♀️ Yoga Adventure for Kids! 🧘‍♂️
      </p>
      
      <p className="text-lg text-muted-foreground mb-12 max-w-md">
        Learn fun yoga poses, earn stars, and become a yoga champion!
      </p>
      
      <div className="flex gap-4 mb-8">
        <Star className="w-12 h-12 text-secondary fill-secondary animate-bounce-gentle" style={{ animationDelay: "0.1s" }} />
        <Star className="w-12 h-12 text-primary fill-primary animate-bounce-gentle" style={{ animationDelay: "0.2s" }} />
        <Star className="w-12 h-12 text-accent fill-accent animate-bounce-gentle" style={{ animationDelay: "0.3s" }} />
      </div>
      
      <Button 
        variant="hero" 
        size="xl" 
        onClick={onStart}
        className="bounce-in"
      >
        Start Your Quest! ✨
      </Button>
      
      <div className="mt-12 text-muted-foreground text-sm">
        Ages 4-10 • Tap anywhere to begin
      </div>
    </div>
  );
};
