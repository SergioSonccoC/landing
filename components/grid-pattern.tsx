import { cn } from "@/lib/utils"

interface GridPatternProps {
  className?: string
  width?: number
  height?: number
  x?: number
  y?: number
  strokeWidth?: number
  strokeOpacity?: number
  patternUnits?: string
}

export function GridPattern({
  className,
  width = 100,
  height = 100,
  x = 0,
  y = 0,
  strokeWidth = 1,
  strokeOpacity = 0.5,
  patternUnits = "userSpaceOnUse",
}: GridPatternProps) {
  return (
    <svg className={cn("absolute inset-0 h-full w-full", className)} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid-pattern" width={width} height={height} x={x} y={y} patternUnits={patternUnits}>
          <path
            d={`M ${width} 0 L 0 ${height} M 0 0 L ${width} ${height}`}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeOpacity={strokeOpacity}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid-pattern)" />
    </svg>
  )
}

