import { config } from 'dotenv';
config();

import '@/ai/flows/summarize-medical-reports.ts';
import '@/ai/flows/analyze-report-and-suggest-treatment.ts';