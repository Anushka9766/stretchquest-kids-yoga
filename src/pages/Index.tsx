import { useState } from "react";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { PoseChallenge } from "@/components/PoseChallenge";
import { CompletionScreen } from "@/components/CompletionScreen";
import { yogaPoses } from "@/data/yogaPoses";

type GameState = "welcome" | "playing" | "complete";

const Index = () => {
  const [gameState, setGameState] = useState<GameState>("welcome");
  const [currentPoseIndex, setCurrentPoseIndex] = useState(0);
  const [totalStars, setTotalStars] = useState(0);

  const handleStart = () => {
    setGameState("playing");
    setCurrentPoseIndex(0);
    setTotalStars(0);
  };

  const handlePoseComplete = (stars: number) => {
    setTotalStars(prev => prev + stars);
    
    if (currentPoseIndex < yogaPoses.length - 1) {
      setCurrentPoseIndex(prev => prev + 1);
    } else {
      setGameState("complete");
    }
  };

  const handleRestart = () => {
    setGameState("welcome");
    setCurrentPoseIndex(0);
    setTotalStars(0);
  };

  return (
    <>
      {gameState === "welcome" && <WelcomeScreen onStart={handleStart} />}
      
      {gameState === "playing" && (
        <PoseChallenge
          pose={yogaPoses[currentPoseIndex]}
          onComplete={handlePoseComplete}
          currentPose={currentPoseIndex + 1}
          totalPoses={yogaPoses.length}
        />
      )}
      
      {gameState === "complete" && (
        <CompletionScreen
          totalStars={totalStars}
          onRestart={handleRestart}
        />
      )}
    </>
  );
};

export default Index;
