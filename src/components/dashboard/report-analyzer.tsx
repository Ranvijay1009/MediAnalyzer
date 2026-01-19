'use client';
import { useState, useRef, useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { analyzeReport, FormState } from '@/app/dashboard/reports/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { UploadCloud, FileText, Bot, AlertTriangle, Lightbulb } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Analyzing...' : 'Analyze Report'}
    </Button>
  );
}

export function ReportAnalyzer() {
  const initialState: FormState = { formKey: 0 };
  const [state, formAction] = useFormState(analyzeReport, initialState);
  const [fileName, setFileName] = useState<string | null>(null);
  const [reportDataUri, setReportDataUri] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (state.error) {
      toast({
        variant: 'destructive',
        title: 'Analysis Failed',
        description: state.error,
      });
    }
  }, [state.error, state.formKey, toast]);

  useEffect(() => {
    // Reset file input when form is successfully submitted
    if (state.summary || state.potentialTreatments) {
      setFileName(null);
      setReportDataUri(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  }, [state.formKey]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        setReportDataUri(loadEvent.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      const file = event.dataTransfer.files[0];
      if (fileInputRef.current) {
          // You might need to use a DataTransfer object to set the files
          const dataTransfer = new DataTransfer();
          dataTransfer.items.add(file);
          fileInputRef.current.files = dataTransfer.files;
      }
      handleFileChange({ target: { files: [file] } } as any);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Upload Medical Report</CardTitle>
          <CardDescription>
            Upload a PDF or image of your medical report for AI analysis.
          </CardDescription>
        </CardHeader>
        <form ref={formRef} action={formAction}>
          <CardContent>
            <input type="hidden" name="reportDataUri" value={reportDataUri || ''} />
            <div
              className="group relative flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 bg-background p-12 text-center transition-colors hover:border-primary/50 hover:bg-accent/50"
              onClick={() => fileInputRef.current?.click()}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
                accept="image/*,application/pdf"
              />
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <UploadCloud className="h-10 w-10" />
                {fileName ? (
                  <>
                    <p className="font-semibold text-foreground">{fileName}</p>
                    <p className="text-sm">Click or drag another file to replace</p>
                  </>
                ) : (
                  <>
                    <p className="font-semibold text-foreground">
                      Click to upload or drag & drop
                    </p>
                    <p className="text-sm">PDF, PNG, JPG supported</p>
                  </>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <SubmitButton />
          </CardFooter>
        </form>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-6 w-6" /> AI Analysis
          </CardTitle>
          <CardDescription>
            A simplified summary of your report will appear here.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {state.summary && (
            <div className="space-y-4">
              <Alert>
                <FileText className="h-4 w-4" />
                <AlertTitle>Report Summary</AlertTitle>
                <AlertDescription className="prose prose-sm dark:prose-invert">
                  {state.summary}
                </AlertDescription>
              </Alert>
            </div>
          )}
          {state.potentialTreatments && (
             <Alert>
                <Lightbulb className="h-4 w-4" />
                <AlertTitle>Potential Treatments & Suggestions</AlertTitle>
                <AlertDescription className="prose prose-sm dark:prose-invert">
                  {state.potentialTreatments}
                </AlertDescription>
            </Alert>
          )}

           {!(state.summary || state.potentialTreatments) && (
             <div className="text-center text-muted-foreground py-12">
                 <p>Your analysis will be displayed here.</p>
             </div>
           )}

            <Alert variant="destructive" className="bg-yellow-50 border-yellow-200 text-yellow-900 dark:bg-yellow-900/30 dark:border-yellow-800 dark:text-yellow-200">
                <AlertTriangle className="h-4 w-4 !text-yellow-600 dark:!text-yellow-400" />
                <AlertTitle>Disclaimer</AlertTitle>
                <AlertDescription>
                    This AI-generated summary is for informational purposes only and is not a substitute for professional medical advice. Always consult with a qualified healthcare provider.
                </AlertDescription>
            </Alert>
        </CardContent>
      </Card>
    </div>
  );
}
