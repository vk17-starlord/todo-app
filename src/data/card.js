import { v4 as uuidv4 } from 'uuid';

export const cardData = [
  {
    id: 'cf1',
    name: "Project Planning",
    category: "Work",
    tasks: ["Define scope", "Gather requirements", "Set deadlines"],
    created_at: "2024-04-21T10:00:00Z",
    status: "In Progress",
    progress: 2,
    description:
      "Planning the initial stages of a work project, including defining the scope, gathering requirements, and setting deadlines.",
    link: "https://example.com/project-planning",
  },
  {
    id: 'cf2',
    name: "Grocery Shopping",
    category: "Personal",
    tasks: ["Buy milk", "Get eggs", "Purchase vegetables"],
    created_at: "2024-04-20T14:30:00Z",
    status: "Complete",
    progress: 1,
    description:
      "A personal task to shop for groceries, including dairy, eggs, and vegetables.",
    link: "https://example.com/grocery-list",
  },
  {
    id: 'cf3',
    name: "Gym Workout",
    category: "Health",
    tasks: ["Warm-up", "Strength training", "Cardio exercises"],
    created_at: "2024-04-21T07:00:00Z",
    status: "Incomplete",
    progress: 0,
    description:
      "A health-related task for a gym workout with various exercises, including warm-up, strength training, and cardio.",
    link: "https://example.com/workout-plan",
  },
  {
    id: 'cf4',
    name: "Team Meeting",
    category: "Work",
    tasks: ["Prepare agenda", "Send invites", "Host meeting"],
    created_at: "2024-04-21T09:00:00Z",
    status: "In Progress",
    progress: 2,
    description:
      "A work-related meeting with tasks to prepare an agenda, send out invites, and host the meeting.",
    link: "https://example.com/team-meeting",
  },
  {
    id: 'cf5',
    name: "Car Maintenance",
    category: "Personal",
    tasks: ["Change oil", "Check tires", "Clean interior"],
    created_at: "2024-04-19T16:00:00Z",
    status: "In Progress",
    progress: 0,
    description:
      "A personal task for car maintenance, including oil changes, tire checks, and interior cleaning.",
    link: "https://example.com/car-maintenance",
  },
];
