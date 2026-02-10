import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BookOpen } from "lucide-react";

export default function CoursesPage() {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Lehrgänge</h1>
      </div>

      <Card>
        <CardHeader>
          <p className="text-sm font-medium text-muted-foreground">
            Lehrgang-Verwaltung
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <BookOpen className="mb-4 h-12 w-12 text-muted-foreground/50" />
            <p className="text-lg font-medium text-muted-foreground">
              Lehrgang-Verwaltung
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Hier werden Lehrgänge erstellt und verwaltet. (Phase 2)
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
