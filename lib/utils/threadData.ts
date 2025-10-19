/**
 * Comprehensive thread data for imperial and metric threads
 * Including UNC, UNF, UNEF, NPT, and NPTF specifications
 */

export interface ThreadDrillData {
  engagement: number; // percentage (50, 60, 70, 75, 80)
  drillSize: string;
  decimal: number;
}

export interface UnifiedThreadData {
  size: string;
  majorDiameter: number;
  tpi: number;
  threadType: 'UNC' | 'UNF' | 'UNEF';
  drillSizes: ThreadDrillData[];
  torque?: {
    dry: { min: number; max: number }; // lb-ft
    lubricated: { min: number; max: number }; // lb-ft
  };
  engagementLength?: {
    steel: number; // multiplier of diameter
    aluminum: number;
    castIron: number;
    brass: number;
    plastic: number;
  };
}

export interface NPTThreadData {
  size: string;
  nominalOD: number; // inches
  tpi: number;
  taperPerFoot: number; // inches per foot (standard 3/4")
  pitchDiameter: {
    atGagePlane: number;
    smallEnd: number;
  };
  tapDrill: string;
  tapDrillDecimal: number;
  handTightEngagement: number; // turns
  wrenchTightEngagement: number; // turns
  type: 'NPT' | 'NPTF'; // NPTF = Dryseal (tighter tolerances)
}

// Comprehensive UNC thread data
export const uncThreadData: UnifiedThreadData[] = [
  {
    size: '#0-80',
    majorDiameter: 0.0600,
    tpi: 80,
    threadType: 'UNC',
    drillSizes: [
      { engagement: 50, drillSize: '#53', decimal: 0.0595 },
      { engagement: 60, drillSize: '#54', decimal: 0.055 },
      { engagement: 70, drillSize: '#55', decimal: 0.052 },
      { engagement: 75, drillSize: '3/64', decimal: 0.0469 },
      { engagement: 80, drillSize: '#56', decimal: 0.0465 },
    ],
  },
  {
    size: '#1-64',
    majorDiameter: 0.0730,
    tpi: 64,
    threadType: 'UNC',
    drillSizes: [
      { engagement: 50, drillSize: '#53', decimal: 0.0595 },
      { engagement: 60, drillSize: '#54', decimal: 0.055 },
      { engagement: 70, drillSize: '#55', decimal: 0.052 },
      { engagement: 75, drillSize: '#56', decimal: 0.0465 },
      { engagement: 80, drillSize: '#57', decimal: 0.043 },
    ],
  },
  {
    size: '#2-56',
    majorDiameter: 0.0860,
    tpi: 56,
    threadType: 'UNC',
    drillSizes: [
      { engagement: 50, drillSize: '#51', decimal: 0.067 },
      { engagement: 60, drillSize: '#50', decimal: 0.070 },
      { engagement: 70, drillSize: '#50', decimal: 0.070 },
      { engagement: 75, drillSize: '#51', decimal: 0.067 },
      { engagement: 80, drillSize: '#51', decimal: 0.067 },
    ],
  },
  {
    size: '#3-48',
    majorDiameter: 0.0990,
    tpi: 48,
    threadType: 'UNC',
    drillSizes: [
      { engagement: 50, drillSize: '#49', decimal: 0.073 },
      { engagement: 60, drillSize: '#48', decimal: 0.076 },
      { engagement: 70, drillSize: '#47', decimal: 0.0785 },
      { engagement: 75, drillSize: '5/64', decimal: 0.0781 },
      { engagement: 80, drillSize: '#46', decimal: 0.081 },
    ],
  },
  {
    size: '#4-40',
    majorDiameter: 0.1120,
    tpi: 40,
    threadType: 'UNC',
    drillSizes: [
      { engagement: 50, drillSize: '#45', decimal: 0.082 },
      { engagement: 60, drillSize: '#44', decimal: 0.086 },
      { engagement: 70, drillSize: '#43', decimal: 0.089 },
      { engagement: 75, drillSize: '3/32', decimal: 0.0938 },
      { engagement: 80, drillSize: '#42', decimal: 0.0935 },
    ],
    torque: { dry: { min: 0.6, max: 0.9 }, lubricated: { min: 0.5, max: 0.7 } },
    engagementLength: { steel: 1.0, aluminum: 1.5, castIron: 1.5, brass: 1.5, plastic: 2.0 },
  },
  {
    size: '#5-40',
    majorDiameter: 0.1250,
    tpi: 40,
    threadType: 'UNC',
    drillSizes: [
      { engagement: 50, drillSize: '#41', decimal: 0.096 },
      { engagement: 60, drillSize: '#40', decimal: 0.098 },
      { engagement: 70, drillSize: '#39', decimal: 0.0995 },
      { engagement: 75, drillSize: '#38', decimal: 0.1015 },
      { engagement: 80, drillSize: '#37', decimal: 0.104 },
    ],
    torque: { dry: { min: 0.8, max: 1.2 }, lubricated: { min: 0.6, max: 1.0 } },
    engagementLength: { steel: 1.0, aluminum: 1.5, castIron: 1.5, brass: 1.5, plastic: 2.0 },
  },
  {
    size: '#6-32',
    majorDiameter: 0.1380,
    tpi: 32,
    threadType: 'UNC',
    drillSizes: [
      { engagement: 50, drillSize: '#38', decimal: 0.1015 },
      { engagement: 60, drillSize: '#37', decimal: 0.104 },
      { engagement: 70, drillSize: '#36', decimal: 0.1065 },
      { engagement: 75, drillSize: '#36', decimal: 0.1065 },
      { engagement: 80, drillSize: '#35', decimal: 0.110 },
    ],
    torque: { dry: { min: 1.0, max: 1.5 }, lubricated: { min: 0.8, max: 1.2 } },
    engagementLength: { steel: 1.0, aluminum: 1.5, castIron: 1.5, brass: 1.5, plastic: 2.0 },
  },
  {
    size: '#8-32',
    majorDiameter: 0.1640,
    tpi: 32,
    threadType: 'UNC',
    drillSizes: [
      { engagement: 50, drillSize: '#32', decimal: 0.116 },
      { engagement: 60, drillSize: '#31', decimal: 0.120 },
      { engagement: 70, drillSize: '#30', decimal: 0.1285 },
      { engagement: 75, drillSize: '#29', decimal: 0.136 },
      { engagement: 80, drillSize: '#28', decimal: 0.1405 },
    ],
    torque: { dry: { min: 1.8, max: 2.5 }, lubricated: { min: 1.4, max: 2.0 } },
    engagementLength: { steel: 1.0, aluminum: 1.5, castIron: 1.5, brass: 1.5, plastic: 2.0 },
  },
  {
    size: '#10-24',
    majorDiameter: 0.1900,
    tpi: 24,
    threadType: 'UNC',
    drillSizes: [
      { engagement: 50, drillSize: '#27', decimal: 0.144 },
      { engagement: 60, drillSize: '#26', decimal: 0.147 },
      { engagement: 70, drillSize: '#25', decimal: 0.1495 },
      { engagement: 75, drillSize: '#25', decimal: 0.1495 },
      { engagement: 80, drillSize: '#24', decimal: 0.152 },
    ],
    torque: { dry: { min: 2.5, max: 3.5 }, lubricated: { min: 2.0, max: 2.8 } },
    engagementLength: { steel: 1.0, aluminum: 1.5, castIron: 1.5, brass: 1.5, plastic: 2.0 },
  },
  {
    size: '#10-32',
    majorDiameter: 0.1900,
    tpi: 32,
    threadType: 'UNF',
    drillSizes: [
      { engagement: 50, drillSize: '#23', decimal: 0.154 },
      { engagement: 60, drillSize: '#22', decimal: 0.157 },
      { engagement: 70, drillSize: '#21', decimal: 0.159 },
      { engagement: 75, drillSize: '#21', decimal: 0.159 },
      { engagement: 80, drillSize: '#20', decimal: 0.161 },
    ],
    torque: { dry: { min: 2.8, max: 3.8 }, lubricated: { min: 2.2, max: 3.0 } },
    engagementLength: { steel: 1.0, aluminum: 1.5, castIron: 1.5, brass: 1.5, plastic: 2.0 },
  },
  {
    size: '#12-24',
    majorDiameter: 0.2160,
    tpi: 24,
    threadType: 'UNC',
    drillSizes: [
      { engagement: 50, drillSize: '#18', decimal: 0.1695 },
      { engagement: 60, drillSize: '#17', decimal: 0.173 },
      { engagement: 70, drillSize: '#16', decimal: 0.177 },
      { engagement: 75, drillSize: '#16', decimal: 0.177 },
      { engagement: 80, drillSize: '#15', decimal: 0.180 },
    ],
    torque: { dry: { min: 3.5, max: 5.0 }, lubricated: { min: 2.8, max: 4.0 } },
    engagementLength: { steel: 1.0, aluminum: 1.5, castIron: 1.5, brass: 1.5, plastic: 2.0 },
  },
  {
    size: '1/4-20',
    majorDiameter: 0.2500,
    tpi: 20,
    threadType: 'UNC',
    drillSizes: [
      { engagement: 50, drillSize: '#9', decimal: 0.196 },
      { engagement: 60, drillSize: '#8', decimal: 0.199 },
      { engagement: 70, drillSize: '#7', decimal: 0.201 },
      { engagement: 75, drillSize: '#7', decimal: 0.201 },
      { engagement: 80, drillSize: '#6', decimal: 0.204 },
    ],
    torque: { dry: { min: 6, max: 9 }, lubricated: { min: 5, max: 7 } },
    engagementLength: { steel: 1.0, aluminum: 1.5, castIron: 1.5, brass: 1.5, plastic: 2.0 },
  },
  {
    size: '1/4-28',
    majorDiameter: 0.2500,
    tpi: 28,
    threadType: 'UNF',
    drillSizes: [
      { engagement: 50, drillSize: '#5', decimal: 0.2055 },
      { engagement: 60, drillSize: '#4', decimal: 0.209 },
      { engagement: 70, drillSize: '#3', decimal: 0.213 },
      { engagement: 75, drillSize: '#3', decimal: 0.213 },
      { engagement: 80, drillSize: '7/32', decimal: 0.2188 },
    ],
    torque: { dry: { min: 7, max: 10 }, lubricated: { min: 5.5, max: 8 } },
    engagementLength: { steel: 1.0, aluminum: 1.5, castIron: 1.5, brass: 1.5, plastic: 2.0 },
  },
  {
    size: '5/16-18',
    majorDiameter: 0.3125,
    tpi: 18,
    threadType: 'UNC',
    drillSizes: [
      { engagement: 50, drillSize: 'G', decimal: 0.261 },
      { engagement: 60, drillSize: 'F', decimal: 0.257 },
      { engagement: 70, drillSize: 'F', decimal: 0.257 },
      { engagement: 75, drillSize: 'F', decimal: 0.257 },
      { engagement: 80, drillSize: 'E', decimal: 0.250 },
    ],
    torque: { dry: { min: 13, max: 19 }, lubricated: { min: 10, max: 15 } },
    engagementLength: { steel: 1.0, aluminum: 1.5, castIron: 1.5, brass: 1.5, plastic: 2.0 },
  },
  {
    size: '5/16-24',
    majorDiameter: 0.3125,
    tpi: 24,
    threadType: 'UNF',
    drillSizes: [
      { engagement: 50, drillSize: 'J', decimal: 0.277 },
      { engagement: 60, drillSize: 'I', decimal: 0.272 },
      { engagement: 70, drillSize: 'I', decimal: 0.272 },
      { engagement: 75, drillSize: 'I', decimal: 0.272 },
      { engagement: 80, drillSize: 'H', decimal: 0.266 },
    ],
    torque: { dry: { min: 15, max: 21 }, lubricated: { min: 12, max: 17 } },
    engagementLength: { steel: 1.0, aluminum: 1.5, castIron: 1.5, brass: 1.5, plastic: 2.0 },
  },
  {
    size: '3/8-16',
    majorDiameter: 0.3750,
    tpi: 16,
    threadType: 'UNC',
    drillSizes: [
      { engagement: 50, drillSize: 'S', decimal: 0.348 },
      { engagement: 60, drillSize: 'R', decimal: 0.339 },
      { engagement: 70, drillSize: 'Q', decimal: 0.332 },
      { engagement: 75, drillSize: '5/16', decimal: 0.3125 },
      { engagement: 80, drillSize: 'P', decimal: 0.323 },
    ],
    torque: { dry: { min: 23, max: 33 }, lubricated: { min: 18, max: 27 } },
    engagementLength: { steel: 1.0, aluminum: 1.5, castIron: 1.5, brass: 1.5, plastic: 2.0 },
  },
  {
    size: '3/8-24',
    majorDiameter: 0.3750,
    tpi: 24,
    threadType: 'UNF',
    drillSizes: [
      { engagement: 50, drillSize: 'S', decimal: 0.348 },
      { engagement: 60, drillSize: 'R', decimal: 0.339 },
      { engagement: 70, drillSize: 'Q', decimal: 0.332 },
      { engagement: 75, drillSize: 'Q', decimal: 0.332 },
      { engagement: 80, drillSize: 'P', decimal: 0.323 },
    ],
    torque: { dry: { min: 27, max: 37 }, lubricated: { min: 21, max: 30 } },
    engagementLength: { steel: 1.0, aluminum: 1.5, castIron: 1.5, brass: 1.5, plastic: 2.0 },
  },
  {
    size: '7/16-14',
    majorDiameter: 0.4375,
    tpi: 14,
    threadType: 'UNC',
    drillSizes: [
      { engagement: 50, drillSize: 'X', decimal: 0.397 },
      { engagement: 60, drillSize: 'W', decimal: 0.386 },
      { engagement: 70, drillSize: 'V', decimal: 0.377 },
      { engagement: 75, drillSize: 'U', decimal: 0.368 },
      { engagement: 80, drillSize: 'T', decimal: 0.358 },
    ],
    torque: { dry: { min: 40, max: 55 }, lubricated: { min: 32, max: 44 } },
    engagementLength: { steel: 1.0, aluminum: 1.5, castIron: 1.5, brass: 1.5, plastic: 2.0 },
  },
  {
    size: '7/16-20',
    majorDiameter: 0.4375,
    tpi: 20,
    threadType: 'UNF',
    drillSizes: [
      { engagement: 50, drillSize: 'Z', decimal: 0.413 },
      { engagement: 60, drillSize: 'Y', decimal: 0.404 },
      { engagement: 70, drillSize: 'X', decimal: 0.397 },
      { engagement: 75, drillSize: '25/64', decimal: 0.3906 },
      { engagement: 80, drillSize: 'W', decimal: 0.386 },
    ],
    torque: { dry: { min: 45, max: 60 }, lubricated: { min: 36, max: 48 } },
    engagementLength: { steel: 1.0, aluminum: 1.5, castIron: 1.5, brass: 1.5, plastic: 2.0 },
  },
  {
    size: '1/2-13',
    majorDiameter: 0.5000,
    tpi: 13,
    threadType: 'UNC',
    drillSizes: [
      { engagement: 50, drillSize: '29/64', decimal: 0.4531 },
      { engagement: 60, drillSize: '7/16', decimal: 0.4375 },
      { engagement: 70, drillSize: '27/64', decimal: 0.4219 },
      { engagement: 75, drillSize: '27/64', decimal: 0.4219 },
      { engagement: 80, drillSize: '13/32', decimal: 0.4063 },
    ],
    torque: { dry: { min: 75, max: 105 }, lubricated: { min: 60, max: 85 } },
    engagementLength: { steel: 1.0, aluminum: 1.5, castIron: 1.5, brass: 1.5, plastic: 2.0 },
  },
  {
    size: '1/2-20',
    majorDiameter: 0.5000,
    tpi: 20,
    threadType: 'UNF',
    drillSizes: [
      { engagement: 50, drillSize: '31/64', decimal: 0.4844 },
      { engagement: 60, drillSize: '15/32', decimal: 0.4688 },
      { engagement: 70, drillSize: '29/64', decimal: 0.4531 },
      { engagement: 75, drillSize: '29/64', decimal: 0.4531 },
      { engagement: 80, drillSize: '7/16', decimal: 0.4375 },
    ],
    torque: { dry: { min: 85, max: 120 }, lubricated: { min: 68, max: 96 } },
    engagementLength: { steel: 1.0, aluminum: 1.5, castIron: 1.5, brass: 1.5, plastic: 2.0 },
  },
  {
    size: '9/16-12',
    majorDiameter: 0.5625,
    tpi: 12,
    threadType: 'UNC',
    drillSizes: [
      { engagement: 50, drillSize: '33/64', decimal: 0.5156 },
      { engagement: 60, drillSize: '1/2', decimal: 0.5000 },
      { engagement: 70, drillSize: '31/64', decimal: 0.4844 },
      { engagement: 75, drillSize: '31/64', decimal: 0.4844 },
      { engagement: 80, drillSize: '15/32', decimal: 0.4688 },
    ],
    torque: { dry: { min: 110, max: 155 }, lubricated: { min: 88, max: 125 } },
    engagementLength: { steel: 1.0, aluminum: 1.5, castIron: 1.5, brass: 1.5, plastic: 2.0 },
  },
  {
    size: '9/16-18',
    majorDiameter: 0.5625,
    tpi: 18,
    threadType: 'UNF',
    drillSizes: [
      { engagement: 50, drillSize: '35/64', decimal: 0.5469 },
      { engagement: 60, drillSize: '17/32', decimal: 0.5312 },
      { engagement: 70, drillSize: '33/64', decimal: 0.5156 },
      { engagement: 75, drillSize: '33/64', decimal: 0.5156 },
      { engagement: 80, drillSize: '1/2', decimal: 0.5000 },
    ],
    torque: { dry: { min: 125, max: 175 }, lubricated: { min: 100, max: 140 } },
    engagementLength: { steel: 1.0, aluminum: 1.5, castIron: 1.5, brass: 1.5, plastic: 2.0 },
  },
  {
    size: '5/8-11',
    majorDiameter: 0.6250,
    tpi: 11,
    threadType: 'UNC',
    drillSizes: [
      { engagement: 50, drillSize: '37/64', decimal: 0.5781 },
      { engagement: 60, drillSize: '9/16', decimal: 0.5625 },
      { engagement: 70, drillSize: '35/64', decimal: 0.5469 },
      { engagement: 75, drillSize: '17/32', decimal: 0.5312 },
      { engagement: 80, drillSize: '33/64', decimal: 0.5156 },
    ],
    torque: { dry: { min: 150, max: 210 }, lubricated: { min: 120, max: 170 } },
    engagementLength: { steel: 1.0, aluminum: 1.5, castIron: 1.5, brass: 1.5, plastic: 2.0 },
  },
  {
    size: '5/8-18',
    majorDiameter: 0.6250,
    tpi: 18,
    threadType: 'UNF',
    drillSizes: [
      { engagement: 50, drillSize: '39/64', decimal: 0.6094 },
      { engagement: 60, drillSize: '19/32', decimal: 0.5938 },
      { engagement: 70, drillSize: '37/64', decimal: 0.5781 },
      { engagement: 75, drillSize: '37/64', decimal: 0.5781 },
      { engagement: 80, drillSize: '9/16', decimal: 0.5625 },
    ],
    torque: { dry: { min: 170, max: 240 }, lubricated: { min: 136, max: 192 } },
    engagementLength: { steel: 1.0, aluminum: 1.5, castIron: 1.5, brass: 1.5, plastic: 2.0 },
  },
  {
    size: '3/4-10',
    majorDiameter: 0.7500,
    tpi: 10,
    threadType: 'UNC',
    drillSizes: [
      { engagement: 50, drillSize: '45/64', decimal: 0.7031 },
      { engagement: 60, drillSize: '11/16', decimal: 0.6875 },
      { engagement: 70, drillSize: '43/64', decimal: 0.6719 },
      { engagement: 75, drillSize: '21/32', decimal: 0.6562 },
      { engagement: 80, drillSize: '41/64', decimal: 0.6406 },
    ],
    torque: { dry: { min: 280, max: 395 }, lubricated: { min: 225, max: 315 } },
    engagementLength: { steel: 1.0, aluminum: 1.5, castIron: 1.5, brass: 1.5, plastic: 2.0 },
  },
  {
    size: '3/4-16',
    majorDiameter: 0.7500,
    tpi: 16,
    threadType: 'UNF',
    drillSizes: [
      { engagement: 50, drillSize: '47/64', decimal: 0.7344 },
      { engagement: 60, drillSize: '23/32', decimal: 0.7188 },
      { engagement: 70, drillSize: '45/64', decimal: 0.7031 },
      { engagement: 75, drillSize: '11/16', decimal: 0.6875 },
      { engagement: 80, drillSize: '43/64', decimal: 0.6719 },
    ],
    torque: { dry: { min: 315, max: 440 }, lubricated: { min: 250, max: 350 } },
    engagementLength: { steel: 1.0, aluminum: 1.5, castIron: 1.5, brass: 1.5, plastic: 2.0 },
  },
  {
    size: '7/8-9',
    majorDiameter: 0.8750,
    tpi: 9,
    threadType: 'UNC',
    drillSizes: [
      { engagement: 50, drillSize: '53/64', decimal: 0.8281 },
      { engagement: 60, drillSize: '13/16', decimal: 0.8125 },
      { engagement: 70, drillSize: '51/64', decimal: 0.7969 },
      { engagement: 75, drillSize: '49/64', decimal: 0.7656 },
      { engagement: 80, drillSize: '3/4', decimal: 0.7500 },
    ],
    torque: { dry: { min: 480, max: 675 }, lubricated: { min: 385, max: 540 } },
    engagementLength: { steel: 1.0, aluminum: 1.5, castIron: 1.5, brass: 1.5, plastic: 2.0 },
  },
  {
    size: '1-8',
    majorDiameter: 1.0000,
    tpi: 8,
    threadType: 'UNC',
    drillSizes: [
      { engagement: 50, drillSize: '61/64', decimal: 0.9531 },
      { engagement: 60, drillSize: '15/16', decimal: 0.9375 },
      { engagement: 70, drillSize: '59/64', decimal: 0.9219 },
      { engagement: 75, drillSize: '7/8', decimal: 0.8750 },
      { engagement: 80, drillSize: '55/64', decimal: 0.8594 },
    ],
    torque: { dry: { min: 750, max: 1050 }, lubricated: { min: 600, max: 840 } },
    engagementLength: { steel: 1.0, aluminum: 1.5, castIron: 1.5, brass: 1.5, plastic: 2.0 },
  },
  {
    size: '1-12',
    majorDiameter: 1.0000,
    tpi: 12,
    threadType: 'UNF',
    drillSizes: [
      { engagement: 50, drillSize: '63/64', decimal: 0.9844 },
      { engagement: 60, drillSize: '31/32', decimal: 0.9688 },
      { engagement: 70, drillSize: '61/64', decimal: 0.9531 },
      { engagement: 75, drillSize: '59/64', decimal: 0.9219 },
      { engagement: 80, drillSize: '29/32', decimal: 0.9063 },
    ],
    torque: { dry: { min: 850, max: 1200 }, lubricated: { min: 680, max: 960 } },
    engagementLength: { steel: 1.0, aluminum: 1.5, castIron: 1.5, brass: 1.5, plastic: 2.0 },
  },
];

// UNEF (Extra Fine) thread data
export const unefThreadData: UnifiedThreadData[] = [
  {
    size: '#12-32',
    majorDiameter: 0.2160,
    tpi: 32,
    threadType: 'UNEF',
    drillSizes: [
      { engagement: 50, drillSize: '#13', decimal: 0.185 },
      { engagement: 60, drillSize: '#12', decimal: 0.189 },
      { engagement: 70, drillSize: '#11', decimal: 0.191 },
      { engagement: 75, drillSize: '#10', decimal: 0.1935 },
      { engagement: 80, drillSize: '#9', decimal: 0.196 },
    ],
    engagementLength: { steel: 1.0, aluminum: 1.5, castIron: 1.5, brass: 1.5, plastic: 2.0 },
  },
  {
    size: '1/4-32',
    majorDiameter: 0.2500,
    tpi: 32,
    threadType: 'UNEF',
    drillSizes: [
      { engagement: 50, drillSize: '#4', decimal: 0.209 },
      { engagement: 60, drillSize: '#3', decimal: 0.213 },
      { engagement: 70, drillSize: '7/32', decimal: 0.2188 },
      { engagement: 75, drillSize: '7/32', decimal: 0.2188 },
      { engagement: 80, drillSize: '#1', decimal: 0.228 },
    ],
    torque: { dry: { min: 8, max: 11 }, lubricated: { min: 6.5, max: 9 } },
    engagementLength: { steel: 1.0, aluminum: 1.5, castIron: 1.5, brass: 1.5, plastic: 2.0 },
  },
  {
    size: '5/16-32',
    majorDiameter: 0.3125,
    tpi: 32,
    threadType: 'UNEF',
    drillSizes: [
      { engagement: 50, drillSize: 'J', decimal: 0.277 },
      { engagement: 60, drillSize: 'I', decimal: 0.272 },
      { engagement: 70, drillSize: 'I', decimal: 0.272 },
      { engagement: 75, drillSize: 'I', decimal: 0.272 },
      { engagement: 80, drillSize: 'H', decimal: 0.266 },
    ],
    torque: { dry: { min: 16, max: 22 }, lubricated: { min: 13, max: 18 } },
    engagementLength: { steel: 1.0, aluminum: 1.5, castIron: 1.5, brass: 1.5, plastic: 2.0 },
  },
  {
    size: '3/8-32',
    majorDiameter: 0.3750,
    tpi: 32,
    threadType: 'UNEF',
    drillSizes: [
      { engagement: 50, drillSize: 'S', decimal: 0.348 },
      { engagement: 60, drillSize: 'R', decimal: 0.339 },
      { engagement: 70, drillSize: 'Q', decimal: 0.332 },
      { engagement: 75, drillSize: 'Q', decimal: 0.332 },
      { engagement: 80, drillSize: 'P', decimal: 0.323 },
    ],
    torque: { dry: { min: 30, max: 40 }, lubricated: { min: 24, max: 32 } },
    engagementLength: { steel: 1.0, aluminum: 1.5, castIron: 1.5, brass: 1.5, plastic: 2.0 },
  },
  {
    size: '7/16-28',
    majorDiameter: 0.4375,
    tpi: 28,
    threadType: 'UNEF',
    drillSizes: [
      { engagement: 50, drillSize: 'Y', decimal: 0.404 },
      { engagement: 60, drillSize: 'X', decimal: 0.397 },
      { engagement: 70, drillSize: 'W', decimal: 0.386 },
      { engagement: 75, drillSize: 'W', decimal: 0.386 },
      { engagement: 80, drillSize: 'V', decimal: 0.377 },
    ],
    torque: { dry: { min: 50, max: 65 }, lubricated: { min: 40, max: 52 } },
    engagementLength: { steel: 1.0, aluminum: 1.5, castIron: 1.5, brass: 1.5, plastic: 2.0 },
  },
  {
    size: '1/2-28',
    majorDiameter: 0.5000,
    tpi: 28,
    threadType: 'UNEF',
    drillSizes: [
      { engagement: 50, drillSize: '15/32', decimal: 0.4688 },
      { engagement: 60, drillSize: '29/64', decimal: 0.4531 },
      { engagement: 70, drillSize: '29/64', decimal: 0.4531 },
      { engagement: 75, drillSize: '7/16', decimal: 0.4375 },
      { engagement: 80, drillSize: '27/64', decimal: 0.4219 },
    ],
    torque: { dry: { min: 95, max: 130 }, lubricated: { min: 76, max: 104 } },
    engagementLength: { steel: 1.0, aluminum: 1.5, castIron: 1.5, brass: 1.5, plastic: 2.0 },
  },
];

// NPT and NPTF (Tapered Pipe Thread) data
export const nptThreadData: NPTThreadData[] = [
  {
    size: '1/16-27',
    nominalOD: 0.3125,
    tpi: 27,
    taperPerFoot: 0.75,
    pitchDiameter: { atGagePlane: 0.27118, smallEnd: 0.26461 },
    tapDrill: 'R',
    tapDrillDecimal: 0.339,
    handTightEngagement: 4,
    wrenchTightEngagement: 4,
    type: 'NPT',
  },
  {
    size: '1/8-27',
    nominalOD: 0.405,
    tpi: 27,
    taperPerFoot: 0.75,
    pitchDiameter: { atGagePlane: 0.36351, smallEnd: 0.35656 },
    tapDrill: 'S',
    tapDrillDecimal: 0.348,
    handTightEngagement: 4,
    wrenchTightEngagement: 4,
    type: 'NPT',
  },
  {
    size: '1/4-18',
    nominalOD: 0.540,
    tpi: 18,
    taperPerFoot: 0.75,
    pitchDiameter: { atGagePlane: 0.47739, smallEnd: 0.46687 },
    tapDrill: '7/16',
    tapDrillDecimal: 0.4375,
    handTightEngagement: 4,
    wrenchTightEngagement: 5,
    type: 'NPT',
  },
  {
    size: '3/8-18',
    nominalOD: 0.675,
    tpi: 18,
    taperPerFoot: 0.75,
    pitchDiameter: { atGagePlane: 0.61201, smallEnd: 0.60185 },
    tapDrill: '37/64',
    tapDrillDecimal: 0.5781,
    handTightEngagement: 4,
    wrenchTightEngagement: 5,
    type: 'NPT',
  },
  {
    size: '1/2-14',
    nominalOD: 0.840,
    tpi: 14,
    taperPerFoot: 0.75,
    pitchDiameter: { atGagePlane: 0.75843, smallEnd: 0.74695 },
    tapDrill: '23/32',
    tapDrillDecimal: 0.7188,
    handTightEngagement: 5,
    wrenchTightEngagement: 6,
    type: 'NPT',
  },
  {
    size: '3/4-14',
    nominalOD: 1.050,
    tpi: 14,
    taperPerFoot: 0.75,
    pitchDiameter: { atGagePlane: 0.96768, smallEnd: 0.95620 },
    tapDrill: '59/64',
    tapDrillDecimal: 0.9219,
    handTightEngagement: 5,
    wrenchTightEngagement: 6,
    type: 'NPT',
  },
  {
    size: '1-11.5',
    nominalOD: 1.315,
    tpi: 11.5,
    taperPerFoot: 0.75,
    pitchDiameter: { atGagePlane: 1.21363, smallEnd: 1.19953 },
    tapDrill: '1-5/32',
    tapDrillDecimal: 1.15625,
    handTightEngagement: 5,
    wrenchTightEngagement: 7,
    type: 'NPT',
  },
  {
    size: '1-1/4-11.5',
    nominalOD: 1.660,
    tpi: 11.5,
    taperPerFoot: 0.75,
    pitchDiameter: { atGagePlane: 1.55713, smallEnd: 1.54303 },
    tapDrill: '1-1/2',
    tapDrillDecimal: 1.5000,
    handTightEngagement: 5,
    wrenchTightEngagement: 7,
    type: 'NPT',
  },
  {
    size: '1-1/2-11.5',
    nominalOD: 1.900,
    tpi: 11.5,
    taperPerFoot: 0.75,
    pitchDiameter: { atGagePlane: 1.79609, smallEnd: 1.78199 },
    tapDrill: '1-23/32',
    tapDrillDecimal: 1.7188,
    handTightEngagement: 5,
    wrenchTightEngagement: 7,
    type: 'NPT',
  },
  {
    size: '2-11.5',
    nominalOD: 2.375,
    tpi: 11.5,
    taperPerFoot: 0.75,
    pitchDiameter: { atGagePlane: 2.26902, smallEnd: 2.25402 },
    tapDrill: '2-7/32',
    tapDrillDecimal: 2.2188,
    handTightEngagement: 6,
    wrenchTightEngagement: 8,
    type: 'NPT',
  },
  {
    size: '2-1/2-8',
    nominalOD: 2.875,
    tpi: 8,
    taperPerFoot: 0.75,
    pitchDiameter: { atGagePlane: 2.71953, smallEnd: 2.70047 },
    tapDrill: '2-5/8',
    tapDrillDecimal: 2.625,
    handTightEngagement: 6,
    wrenchTightEngagement: 9,
    type: 'NPT',
  },
  {
    size: '3-8',
    nominalOD: 3.500,
    tpi: 8,
    taperPerFoot: 0.75,
    pitchDiameter: { atGagePlane: 3.34062, smallEnd: 3.32156 },
    tapDrill: '3-1/4',
    tapDrillDecimal: 3.250,
    handTightEngagement: 6,
    wrenchTightEngagement: 10,
    type: 'NPT',
  },
];

// NPTF (Dryseal) - slightly different tolerances
export const nptfThreadData: NPTThreadData[] = nptThreadData.map(thread => ({
  ...thread,
  type: 'NPTF' as const,
  // NPTF has tighter tolerances and designed for metal-to-metal seal
}));

// Calculate engagement length in inches based on material and thread diameter
export function calculateEngagementLength(
  diameter: number,
  material: 'steel' | 'aluminum' | 'castIron' | 'brass' | 'plastic',
  threadData?: UnifiedThreadData
): { minimum: number; recommended: number; notes: string } {
  let multiplier = 1.0;
  let notes = '';

  if (threadData?.engagementLength) {
    multiplier = threadData.engagementLength[material] || 1.5;
  } else {
    switch (material) {
      case 'steel':
        multiplier = 1.0;
        notes = 'Steel-to-steel provides best thread engagement';
        break;
      case 'aluminum':
        multiplier = 1.5;
        notes = 'Aluminum requires 50% more engagement than steel';
        break;
      case 'castIron':
        multiplier = 1.5;
        notes = 'Cast iron can be brittle, increase engagement';
        break;
      case 'brass':
        multiplier = 1.5;
        notes = 'Softer material, requires more engagement';
        break;
      case 'plastic':
        multiplier = 2.0;
        notes = 'Plastic requires double the engagement of steel';
        break;
    }
  }

  return {
    minimum: diameter * multiplier,
    recommended: diameter * multiplier * 1.25, // 25% safety factor
    notes,
  };
}

// Calculate torque values (if not in table, use approximate formulas)
export function calculateTorqueRecommendation(
  diameter: number,
  tpi: number,
  materialGrade: 'grade2' | 'grade5' | 'grade8' = 'grade5'
): { dry: { min: number; max: number }; lubricated: { min: number; max: number } } {
  // Simplified torque calculation based on diameter and grade
  // These are approximations - actual values vary by standard
  let baseTorque = 0;
  
  // Base calculation using cross-sectional area
  const area = Math.PI * Math.pow(diameter, 2) / 4;
  
  switch (materialGrade) {
    case 'grade2':
      baseTorque = area * 33000 * diameter * 0.2; // Low strength steel
      break;
    case 'grade5':
      baseTorque = area * 85000 * diameter * 0.2; // Medium strength
      break;
    case 'grade8':
      baseTorque = area * 120000 * diameter * 0.2; // High strength
      break;
  }

  // Convert to lb-ft
  baseTorque = baseTorque / 12;

  return {
    dry: {
      min: baseTorque * 0.75,
      max: baseTorque * 1.05,
    },
    lubricated: {
      min: baseTorque * 0.75 * 0.8,
      max: baseTorque * 1.05 * 0.8,
    },
  };
}

