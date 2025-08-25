import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { FC, JSX, PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  title: string;
  icon: JSX.Element;
}

export const HeroStatCard: FC<Props> = ({ title, icon, children }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {/* <Zap className="h-4 w-4 text-muted-foreground" /> */}
        { icon }
      </CardHeader>
      <CardContent>
        { children}
      </CardContent>
    </Card>
  )
};
