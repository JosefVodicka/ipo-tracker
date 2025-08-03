import { TrendingUp, Calendar, Building2, DollarSign } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface IPOCardProps {
  className?: string
  company: string
  symbol: string
  expectedDate: string
  price: string
  status: "upcoming" | "completed" | "withdrawn"
}

export function IPOCard({
  className,
  company,
  symbol,
  expectedDate,
  price,
  status,
}: IPOCardProps) {
  return (
    <Card className={cn(
      "transition-all hover:shadow-lg",
      status === "completed" && "bg-green-50",
      status === "withdrawn" && "bg-red-50",
      className
    )}>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Building2 className="h-5 w-5 text-gray-500" />
          <CardTitle>{company}</CardTitle>
        </div>
        <CardDescription className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4" />
          {symbol}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span>{expectedDate}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <DollarSign className="h-4 w-4 text-gray-500" />
            <span>{price}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 