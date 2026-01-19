'use server';
/**
 * @fileOverview An AI agent that analyzes medical reports and suggests treatments if needed.
 *
 * - analyzeReportAndSuggestTreatment - A function that handles the report analysis process.
 * - AnalyzeReportInput - The input type for the analyzeReportAndSuggestTreatment function.
 * - AnalyzeReportOutput - The return type for the analyzeReportAndSuggestTreatment function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeReportInputSchema = z.object({
  reportText: z
    .string()
    .describe('The text content extracted from the medical report.'),
});
export type AnalyzeReportInput = z.infer<typeof AnalyzeReportInputSchema>;

const AnalyzeReportOutputSchema = z.object({
  summary: z.string().describe('A simplified summary of the medical report.'),
  treatmentSuggestion: z
    .string()
    .optional()
    .describe(
      'A suggestion for treatment, medication, or intervention if needed.'
    ),
});
export type AnalyzeReportOutput = z.infer<typeof AnalyzeReportOutputSchema>;

export async function analyzeReportAndSuggestTreatment(
  input: AnalyzeReportInput
): Promise<AnalyzeReportOutput> {
  return analyzeReportAndSuggestTreatmentFlow(input);
}

const findTreatmentTool = ai.defineTool({
  name: 'findTreatment',
  description:
    'This tool determines whether the medical report describes a condition requiring treatment, medication, or intervention. If treatment is needed, it provides a suggestion.',
  inputSchema: z.object({
    reportText: z
      .string()
      .describe('The medical report text to analyze for treatment needs.'),
  }),
  outputSchema: z.string().optional(),
  async (input) => {
    // Placeholder: Replace with actual implementation to search medical databases.
    // For demonstration purposes, this always returns a canned response.
    if (input.reportText.includes('high blood pressure')) {
      return 'Based on the report, consider lifestyle changes and consult a cardiologist for potential medication.';
    }
    return undefined;
  },
});

const analyzeReportPrompt = ai.definePrompt({
  name: 'analyzeReportPrompt',
  input: {schema: AnalyzeReportInputSchema},
  output: {schema: AnalyzeReportOutputSchema},
  tools: [findTreatmentTool],
  prompt: `You are a medical report summarization AI. Your task is to summarize the given medical report in simple language that a layperson can understand.

Report:
{{reportText}}

{{#tool_use 'findTreatmentTool' reportText=reportText}}
Based on the medical report and the treatment suggestions:
Summary: {{summary}}
Treatment Suggestion: {{result}}
{{else}}
Summary: {{summary}}
{{/tool_use}}`,
});

const analyzeReportAndSuggestTreatmentFlow = ai.defineFlow(
  {
    name: 'analyzeReportAndSuggestTreatmentFlow',
    inputSchema: AnalyzeReportInputSchema,
    outputSchema: AnalyzeReportOutputSchema,
  },
  async input => {
    const {output} = await analyzeReportPrompt(input);
    return output!;
  }
);
