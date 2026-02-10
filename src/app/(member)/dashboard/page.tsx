import { Card, CardContent } from "@/components/ui/card";
import { BookOpen } from "lucide-react";

export default function DashboardPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">Meine Lehrgänge</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Placeholder - will be populated with real courses in Phase 3 */}
        <Card className="flex flex-col items-center justify-center border-dashed py-12">
          <CardContent className="text-center">
            <BookOpen className="mx-auto mb-4 h-12 w-12 text-muted-foreground/50" />
            <p className="text-lg font-medium text-muted-foreground">
              Keine Lehrgänge
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Ihnen wurden noch keine Lehrgänge freigeschaltet.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
