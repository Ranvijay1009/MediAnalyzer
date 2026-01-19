'use server';
/**
 * @fileOverview AI-powered medical report summarization flow.
 *
 * - summarizeMedicalReport - A function that summarizes medical reports and identifies potential treatments.
 * - SummarizeMedicalReportInput - The input type for the summarizeMedicalReport function.
 * - SummarizeMedicalReportOutput - The return type for the summarizeMedicalReport function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeMedicalReportInputSchema = z.object({
  reportDataUri: z
    .string()
    .describe(
      'The medical report as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.'    ),
});
export type SummarizeMedicalReportInput = z.infer<typeof SummarizeMedicalReportInputSchema>;

const SummarizeMedicalReportOutputSchema = z.object({
  summary: z.string().describe('A simplified summary of the medical report.'),
  potentialTreatments: z
    .string()
    .describe(
      'Potential treatments, medications, or interventions suggested by the AI based on the report.'
    ),
});
export type SummarizeMedicalReportOutput = z.infer<typeof SummarizeMedicalReportOutputSchema>;

export async function summarizeMedicalReport(
  input: SummarizeMedicalReportInput
): Promise<SummarizeMedicalReportOutput> {
  return summarizeMedicalReportFlow(input);
}

const medicalDatabaseSearchTool = ai.defineTool({
  name: 'medicalDatabaseSearch',
  description: 'Searches medical databases for information about conditions and treatments.',
  inputSchema: z.object({
    query: z
      .string()
      .describe('The search query, which could be a condition or symptom.'),
  }),
  outputSchema: z.string(),
});

const summarizeMedicalReportPrompt = ai.definePrompt({
  name: 'summarizeMedicalReportPrompt',
  input: {schema: SummarizeMedicalReportInputSchema},
  output: {schema: SummarizeMedicalReportOutputSchema},
  tools: [medicalDatabaseSearchTool],
  prompt: `You are an AI assistant specializing in simplifying medical reports for patients. Use the following steps:

1.  Summarize the medical report in simple terms so that a lay person can understand it.
2.  Check to see if there are any treatments, medications, or interventions that should be performed for anything described in the medical report by using the medicalDatabaseSearch tool to search for relevant treatments.
3.  Respond to the user in the requested JSON format.

Medical Report: {{media url=reportDataUri}}`,
});

const summarizeMedicalReportFlow = ai.defineFlow(
  {
    name: 'summarizeMedicalReportFlow',
    inputSchema: SummarizeMedicalReportInputSchema,
    outputSchema: SummarizeMedicalReportOutputSchema,
  },
  async input => {
    const {output} = await summarizeMedicalReportPrompt(input);
    return output!;
  }
);
