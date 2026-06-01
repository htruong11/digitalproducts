import { exec } from "node:child_process";
import { promisify } from "node:util";

const execAsync = promisify(exec);

const researchTasks = [
  {
    name: "behavioral-nudge-caregiving",
    prompt: "Research behavioral economics patterns (nudges, commitment devices) for improving caregiver task adherence in home settings. Output 3 actionable product features."
  },
  {
    name: "estate-automation-2026",
    prompt: "Research legal-tech trends in 2026 for automated probate and digital asset management. Output 3 actionable product features for non-expert executors."
  },
  {
    name: "senior-loneliness-prescribing",
    prompt: "Research evidence-based social prescribing models for seniors (mastery, legacy, intergenerational). Output 3 actionable product features for family-led coordination kits."
  }
];

async function runResearch() {
  for (const task of researchTasks) {
    console.log(`Launching research loop for: ${task.name}`);
    // Using gemini --yolo as requested
    const command = `gemini --yolo -p "${task.prompt}"`;
    try {
      const { stdout } = await execAsync(command);
      console.log(`Results for ${task.name}:\n${stdout}`);
    } catch (error) {
      console.error(`Error in research task ${task.name}: ${error}`);
    }
  }
}

runResearch();
