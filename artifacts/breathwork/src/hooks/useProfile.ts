const PROFILE_KEY = 'breathwork_profile';

export interface UserProfile {
  name: string;
  intention: string;
}

let stOK = false;
try {
  localStorage.setItem('__tp__', '1');
  localStorage.removeItem('__tp__');
  stOK = true;
} catch {
  stOK = false;
}

let memProfile: UserProfile = { name: '', intention: '' };

export function loadProfile(): UserProfile {
  if (!stOK) return memProfile;
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    if (!raw) return { name: '', intention: '' };
    return JSON.parse(raw) as UserProfile;
  } catch {
    return { name: '', intention: '' };
  }
}

export function saveProfile(profile: UserProfile) {
  if (!stOK) { memProfile = profile; return; }
  try { localStorage.setItem(PROFILE_KEY, JSON.stringify(profile)); } catch { /* empty */ }
}

const INTENTION_KEYWORDS: [string, string][] = [
  ['energy',       'energy'],
  ['wake',         'energy'],
  ['alert',        'energy'],
  ['activ',        'energy'],
  ['morning',      'energy'],
  ['focus',        'focus'],
  ['sharp',        'focus'],
  ['clear',        'focus'],
  ['present',      'focus'],
  ['concentrat',   'focus'],
  ['work',         'focus'],
  ['adhd',         'adhd'],
  ['attention',    'adhd'],
  ['distract',     'adhd'],
  ['calm',         'calm'],
  ['anxious',      'calm'],
  ['anxiety',      'calm'],
  ['stress',       'calm'],
  ['relax',        'calm'],
  ['peace',        'calm'],
  ['sooth',        'calm'],
  ['sleep',        'sleep'],
  ['rest',         'sleep'],
  ['insomnia',     'sleep'],
  ['wind',         'sleep'],
  ['spiritual',    'spiritual'],
  ['meditat',      'spiritual'],
  ['spirit',       'spiritual'],
  ['awaken',       'spiritual'],
  ['sacred',       'spiritual'],
  ['craving',      'craving'],
  ['urge',         'craving'],
  ['tempt',        'craving'],
  ['resist',       'craving'],
  ['anger',        'anger'],
  ['angry',        'anger'],
  ['frustrat',     'anger'],
  ['irritat',      'anger'],
  ['rage',         'anger'],
  ['perform',      'performance'],
  ['athlet',       'performance'],
  ['sport',        'performance'],
  ['exercis',      'performance'],
  ['strength',     'performance'],
  ['health',       'health'],
  ['pressure',     'health'],
  ['immun',        'health'],
  ['trauma',       'trauma'],
  ['heal',         'trauma'],
  ['release',      'trauma'],
  ['transmut',     'transmute'],
  ['redirect',     'transmute'],
  ['transform',    'transmute'],
];

export function matchIntentionToGoal(intention: string): string | null {
  if (!intention.trim()) return null;
  const lower = intention.toLowerCase();
  for (const [keyword, goalKey] of INTENTION_KEYWORDS) {
    if (lower.includes(keyword)) return goalKey;
  }
  return null;
}

export function timeOfDayGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}
