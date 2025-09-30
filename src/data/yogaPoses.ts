import treePose from "@/assets/tree-pose.png";
import catPose from "@/assets/cat-pose.png";
import warriorPose from "@/assets/warrior-pose.png";
import downwardDogPose from "@/assets/downward-dog-pose.png";

export interface YogaPose {
  id: string;
  name: string;
  image: string;
  instructions: string[];
  funFact: string;
  difficulty: "easy" | "medium" | "hard";
}

export const yogaPoses: YogaPose[] = [
  {
    id: "tree",
    name: "Tree Pose",
    image: treePose,
    instructions: [
      "Stand tall on both feet",
      "Lift one foot and place it on your other leg",
      "Put your hands together above your head",
      "Balance like a strong tree!"
    ],
    funFact: "Tree Pose improves balance and focus! Just like a tree has strong roots, you're building strength in your legs!",
    difficulty: "easy"
  },
  {
    id: "cat",
    name: "Cat-Cow Pose",
    image: catPose,
    instructions: [
      "Get on your hands and knees",
      "Arch your back up like a stretching cat",
      "Then curve your back down like a happy cow",
      "Keep moving slowly back and forth"
    ],
    funFact: "Cat-Cow Pose makes your spine flexible and feels great for your back! It's like giving yourself a gentle massage!",
    difficulty: "easy"
  },
  {
    id: "warrior",
    name: "Warrior Pose",
    image: warriorPose,
    instructions: [
      "Stand with your feet wide apart",
      "Turn one foot to the side",
      "Stretch your arms out like you're flying",
      "Feel strong and brave like a warrior!"
    ],
    funFact: "Warrior Pose builds strength and confidence! Warriors are brave and strong, just like you!",
    difficulty: "medium"
  },
  {
    id: "downward-dog",
    name: "Downward Dog",
    image: downwardDogPose,
    instructions: [
      "Start on your hands and knees",
      "Lift your bottom up to the sky",
      "Make a triangle shape with your body",
      "Keep your arms and legs straight"
    ],
    funFact: "Downward Dog stretches your whole body and gives you energy! Dogs love this stretch when they wake up!",
    difficulty: "medium"
  }
];
