import { ReportAnalyzer } from "@/components/dashboard/report-analyzer";

export default function ReportsPage() {
    return (
        <div className="space-y-8">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">AI Report Summarization</h1>
                <p className="text-muted-foreground">
                    Securely upload your medical reports to receive a simplified, AI-generated summary.
                </p>
            </div>
            <ReportAnalyzer />
        </div>
    );
}
