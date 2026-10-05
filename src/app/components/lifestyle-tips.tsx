import { Card } from "./ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";

interface Tip {
  id: string;
  category: string;
  icon: string;
  title: string;
  description: string;
  tips: string[];
}

const tips: Tip[] = [
  {
    id: "caffeine",
    category: "Caffeine",
    icon: "☕",
    title: "Managing Caffeine Intake",
    description: "Caffeine can stay in your system for 6-8 hours",
    tips: [
      "Avoid caffeine after 2 PM for better sleep",
      "Limit daily intake to 400mg (about 4 cups of coffee)",
      "Try decaf alternatives in the afternoon",
      "Be aware of hidden caffeine in chocolate, tea, and sodas",
      "Consider herbal teas like chamomile instead",
    ],
  },
  {
    id: "alcohol",
    category: "Alcohol",
    icon: "🍷",
    title: "Alcohol and Sleep Quality",
    description: "While alcohol may help you fall asleep, it disrupts sleep cycles",
    tips: [
      "Avoid alcohol 3-4 hours before bedtime",
      "Alcohol reduces REM sleep, crucial for memory and learning",
      "It can cause sleep fragmentation and early waking",
      "Stay hydrated if you do drink",
      "Consider non-alcoholic alternatives in the evening",
    ],
  },
  {
    id: "food",
    category: "Diet",
    icon: "🌶️",
    title: "Food Choices for Better Sleep",
    description: "What you eat affects how well you sleep",
    tips: [
      "Avoid spicy foods 3+ hours before bed",
      "Heavy, greasy meals can cause discomfort and acid reflux. Milds foods like lean meat and cooked veggies help promote a more restorative rest.",
      "Try sleep-promoting foods like almonds, turkey, or bananas",
      "Avoid large amounts of liquid before bed",
      "Consider a light snack if hungry, like whole grain crackers",
    ],
  },
  {
    id: "environment",
    category: "Environment",
    icon: "🛏️",
    title: "Creating the Perfect Sleep Space",
    description: "Your bedroom environment significantly impacts sleep quality",
    tips: [
      "Keep room temperature between 60-67°F (15-19°C)",
      "Use blackout curtains or eye masks for darkness",
      "Minimize noise with earplugs or white noise",
      "Invest in a comfortable mattress and pillows",
      "Remove electronics and work materials from bedroom",
      "Add soundproof boards on the walls of your bedroom",
    ],
  },
  {
    id: "routine",
    category: "Routine",
    icon: "⏰",
    title: "Building a Sleep Routine",
    description: "Consistency is key to quality sleep",
    tips: [
      "Go to bed and wake up at the same time daily",
      "Create a relaxing pre-sleep ritual (30-60 minutes)",
      "Dim lights in the evening to signal sleep time",
      "Avoid screens 1 hour before bed (blue light disrupts melatonin)",
      "If you can't sleep after 20 minutes, get up and do a calm activity",
    ],
  },
  {
    id: "stress",
    category: "Stress Management",
    icon: "🧘",
    title: "Reducing Nighttime Anxiety",
    description: "Mental wellness is crucial for restful sleep",
    tips: [
      "Practice meditation or deep breathing before bed",
      "Keep a journal to process thoughts and worries",
      "Try progressive muscle relaxation techniques",
      "Avoid work-related activities in the evening",
      "Consider professional help if anxiety persists",
    ],
  },
];

export function LifestyleTips() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-2">Sleep Wellness Guide</h2>
        <p className="text-muted-foreground">
          Learn how lifestyle choices impact your sleep quality
        </p>
      </div>

      <Card className="p-6 bg-primary/10 border-primary/30">
        <div className="flex items-start gap-3">
          <div className="text-2xl">💡</div>
          <div>
            <h3 className="mb-2">Did you know?</h3>
            <p className="text-muted-foreground">
              Small changes in your daily habits can lead to significant improvements in sleep quality. 
              Consistency is more important than perfection.
            </p>
          </div>
        </div>
      </Card>

      <Accordion type="single" collapsible className="space-y-4">
        {tips.map((tip) => (
          <AccordionItem key={tip.id} value={tip.id} className="border rounded-lg px-6 bg-card">
            <AccordionTrigger className="hover:no-underline py-4">
              <div className="flex items-center gap-4 text-left">
                <div className="text-3xl">{tip.icon}</div>
                <div>
                  <div className="mb-1">{tip.title}</div>
                  <div className="text-muted-foreground">{tip.description}</div>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-2 pb-4">
              <ul className="space-y-2 ml-14">
                {tip.tips.map((item, index) => (
                  <li key={index} className="text-muted-foreground">
                    {item}
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <Card className="p-6 bg-secondary/30">
        <h3 className="mb-3">Scientific Support</h3>
        <div className="space-y-3 text-sm text-muted-foreground">
          <p>
            <strong>Sleep Foundation:</strong> Caffeine has a half-life of 5-6 hours, meaning half 
            the caffeine consumed remains in your system hours later, affecting sleep architecture.
          </p>
          <p>
            <strong>National Sleep Foundation:</strong> Optimal bedroom temperature for sleep is 
            60-67°F (15-19°C), as cooler temperatures facilitate the natural drop in body temperature 
            needed for quality sleep.
          </p>
          <p>
            <strong>Journal of Clinical Sleep Medicine (2013):</strong> Alcohol consumption before 
            bed significantly disrupts REM sleep and increases sleep fragmentation in the second half 
            of the night.
          </p>
          <p>
            <strong>Harvard Medical School:</strong> Consistent sleep schedules help regulate the 
            circadian rhythm, improving both sleep quality and daytime alertness.
          </p>
        </div>
      </Card>
    </div>
  );
}