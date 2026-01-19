'use server';

import { summarizeMedicalReport } from '@/ai/flows/summarize-medical-reports';

export type FormState = {
  summary?: string;
  potentialTreatments?: string;
  error?: string;
  formKey: number;
};

export async function analyzeReport(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const reportDataUri = formData.get('reportDataUri') as string;

  if (!reportDataUri) {
    return {
      error: 'File data is missing. Please try uploading again.',
      formKey: prevState.formKey + 1,
    };
  }

  try {
    const result = await summarizeMedicalReport({ reportDataUri });
    return {
      summary: result.summary,
      potentialTreatments: result.potentialTreatments,
      formKey: prevState.formKey + 1,
    };
  } catch (e: any) {
    console.error(e);
    return {
      error: e.message || 'An unknown error occurred while analyzing the report.',
      formKey: prevState.formKey + 1,
    };
  }
}
