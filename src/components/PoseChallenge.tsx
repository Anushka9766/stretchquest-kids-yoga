import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { YogaPose } from "@/data/yogaPoses";
import { Star, Sparkles, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { YogaAvatar3D } from "@/components/YogaAvatar3D";
import { PoseDetectionCamera } from "@/components/PoseDetectionCamera";

interface PoseChallengeProps {
  pose: YogaPose;
  onComplete: (stars: number) => void;
  currentPose: number;
  totalPoses: number;
}

export const PoseChallenge = ({ pose, onComplete, currentPose, totalPoses }: PoseChallengeProps) => {
  const [completed, setCompleted] = useState(false);
  const [showFunFact, setShowFunFact] = useState(false);
  const [poseAccuracy, setPoseAccuracy] = useState(0);
  const [bestAccuracy, setBestAccuracy] = useState(0);

  const handlePoseMatch = (accuracy: number) => {
    setPoseAccuracy(accuracy);
    if (accuracy > bestAccuracy) {
      setBestAccuracy(accuracy);
    }
    
    // Auto-complete if accuracy is high enough
    if (accuracy >= 80 && !completed) {
      handleComplete();
    }
  };

  const handleComplete = () => {
    setCompleted(true);
    const stars = 3; // Always give 3 stars for encouragement!
    
    toast("Amazing job! 🌟", {
      description: `You matched the pose with ${bestAccuracy}% accuracy!`,
    });

    // Show fun fact after completing
    setTimeout(() => {
      setShowFunFact(true);
    }, 500);
  };

  const handleNext = () => {
    onComplete(3);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 md:p-6">
      {/* Progress indicator */}
      <div className="mb-6 text-center">
        <p className="text-lg font-semibold text-muted-foreground">
          Pose {currentPose} of {totalPoses}
        </p>
        <div className="flex gap-2 mt-2 justify-center">
          {Array.from({ length: totalPoses }).map((_, i) => (
            <div
              key={i}
              className={`h-2 w-8 rounded-full transition-all ${
                i < currentPose ? "bg-accent" : "bg-muted"
              }`}
            />
          ))}
        </div>
      </div>

      <Card className="w-full max-w-7xl p-6 md:p-8 shadow-[0_8px_24px_-4px_hsl(270_70%_60%/0.3)] border-2 border-primary/20">
        {/* Pose name */}
        <h2 className="text-4xl md:text-5xl font-black text-center mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          {pose.name}
        </h2>

        {/* 3D Avatar and Camera side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* 3D Animated Avatar */}
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-bold text-foreground text-center">Target Pose</h3>
            <div className="h-[400px] rounded-xl overflow-hidden border-2 border-accent/30">
              <YogaAvatar3D pose={pose.id} />
            </div>
          </div>

          {/* Pose Detection Camera */}
          <div className="h-[400px]">
            <PoseDetectionCamera 
              targetPose={pose.id} 
              onPoseMatch={handlePoseMatch}
            />
          </div>
        </div>

        {/* Accuracy indicator */}
        {poseAccuracy > 0 && !completed && (
          <div className="mb-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-4 text-center">
            <p className="text-lg font-bold text-foreground">
              Current Match: <span className={poseAccuracy >= 80 ? "text-green-500" : "text-amber-500"}>{poseAccuracy}%</span>
            </p>
            <p className="text-sm text-muted-foreground">
              {poseAccuracy >= 80 ? "Perfect! Keep holding..." : "Keep adjusting your pose!"}
            </p>
          </div>
        )}

        {/* Instructions */}
        {!completed && (
          <div className="mb-6 bg-muted/50 rounded-xl p-4 md:p-6">
            <h3 className="text-xl font-bold mb-3 text-foreground">How to do it:</h3>
            <ol className="space-y-2">
              {pose.instructions.map((instruction, index) => (
                <li key={index} className="flex gap-3 text-base md:text-lg">
                  <span className="flex-shrink-0 w-7 h-7 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </span>
                  <span className="text-foreground">{instruction}</span>
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* Fun fact - shown after completion */}
        {showFunFact && (
          <div className="mb-6 bg-gradient-to-r from-accent/20 to-secondary/20 rounded-xl p-4 md:p-6 border-2 border-accent bounce-in">
            <div className="flex items-start gap-3">
              <Star className="w-8 h-8 text-accent fill-accent flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold mb-2 text-foreground">Did you know?</h3>
                <p className="text-base md:text-lg text-foreground">{pose.funFact}</p>
              </div>
            </div>
          </div>
        )}

        {/* Stars - shown after completion */}
        {completed && (
          <div className="flex justify-center gap-4 mb-6">
            {[1, 2, 3].map((star, index) => (
              <Star
                key={star}
                className="w-16 h-16 text-secondary fill-secondary bounce-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              />
            ))}
          </div>
        )}

        {/* Action button */}
        <div className="flex justify-center">
          {!completed ? (
            <Button
              variant="playful"
              size="lg"
              onClick={handleComplete}
              className="text-xl"
            >
              I Did It! ✨
            </Button>
          ) : (
            <Button
              variant="hero"
              size="lg"
              onClick={handleNext}
              className="text-xl"
            >
              Next Pose <ArrowRight className="ml-2" />
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};
