export type JourneyStep = {
  id: number;
  tag: string;
  title: string;
  subtitle: string;
  desc: string;
  image: string;
  accentColor: string;
  accentLight: string;
};

export const JOURNEY_STEPS: JourneyStep[] = [
  {
    id: 1,
    tag: 'Step 01 · Getting Started',
    title: 'Registration',
    subtitle: 'Book Your Slot',
    desc: 'Book your slot easily through our platform. Right now you do not need to choose a specific doctor; simply select a convenient time, and we will handle the rest.',
    image: '/cards/1-registration.jpg',
    accentColor: '#7a9e7e',
    accentLight: 'rgba(122,158,126,0.12)',
  },
  {
    id: 2,
    tag: 'Step 02 · Practitioner Assigned',
    title: 'Doctor Invitation',
    subtitle: 'Review & Outreach',
    desc: 'A qualified Vaidya reviews your booking request. Once assigned, they will send you a personalized questionnaire tailored to your specific needs.',
    image: '/cards/2-invitation.jpg',
    accentColor: '#a8843e',
    accentLight: 'rgba(168,132,62,0.12)',
  },
  {
    id: 3,
    tag: 'Step 03 · Medical History',
    title: 'Health Profile',
    subtitle: 'Upload Your Details',
    desc: 'Complete your health questionnaire with your medical history and upload any recent lab reports. This ensures your doctor is fully prepared before you even meet.',
    image: '/cards/3-data-entry.jpg',
    accentColor: '#5a8870',
    accentLight: 'rgba(90,136,112,0.12)',
  },
  {
    id: 4,
    tag: 'Step 04 · Assessment',
    title: 'Initial Screening',
    subtitle: 'Reviewing Your Profile',
    desc: 'Our practitioners perform an initial analysis of your reports and astrological assessments to build a clear understanding of your current health status.',
    image: '/cards/4-screening.jpg',
    accentColor: '#6a5878',
    accentLight: 'rgba(106,88,120,0.12)',
  },
  {
    id: 5,
    tag: 'Step 05 · Finalizing Time',
    title: 'Consultation Scheduling',
    subtitle: 'Coordinate Your Session',
    desc: 'We will coordinate with both you and the Vaidya to lock in your virtual consultation time based on mutual availability.',
    image: '/cards/5-scheduling.jpg',
    accentColor: '#4a7858',
    accentLight: 'rgba(74,120,88,0.12)',
  },
  {
    id: 6,
    tag: 'Step 06 · Online Session',
    title: 'Virtual Consultation',
    subtitle: 'Face-to-Face Guidance',
    desc: 'Connect with your Vaidya for a comprehensive 30-minute virtual session to discuss your health concerns, lifestyle habits, and a customized action plan.',
    image: '/cards/6-teleconsul.jpg',
    accentColor: '#3a6878',
    accentLight: 'rgba(58,104,120,0.12)',
  },
  {
    id: 7,
    tag: 'Step 07 · Advanced Care',
    title: 'In-Person Treatment',
    subtitle: 'Physical Consultation',
    desc: 'If eligible, you can schedule a physical consultation at one of our centers for specialized treatments like Panchakarma.',
    image: '/cards/7-treatment.jpg',
    accentColor: '#786040',
    accentLight: 'rgba(120,96,64,0.12)',
  },
  {
    id: 8,
    tag: 'Step 08 · Healing Path',
    title: 'Ongoing Support',
    subtitle: 'Continuous Monitoring',
    desc: 'We offer regular virtual follow-ups to monitor your progress, answer any questions, and adjust your treatment plan as needed over time.',
    image: '/cards/8-followups.jpg',
    accentColor: '#5a8870',
    accentLight: 'rgba(90,136,112,0.12)',
  },
];
