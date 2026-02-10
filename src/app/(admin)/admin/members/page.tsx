import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Users } from "lucide-react";

export default function MembersPage() {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Mitglieder</h1>
      </div>

      <Card>
        <CardHeader>
          <p className="text-sm font-medium text-muted-foreground">
            Mitglieder-Verwaltung
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Users className="mb-4 h-12 w-12 text-muted-foreground/50" />
            <p className="text-lg font-medium text-muted-foreground">
              Mitglieder-Verwaltung
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Hier werden Mitglieder angezeigt und verwaltet. (Phase 2)
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
