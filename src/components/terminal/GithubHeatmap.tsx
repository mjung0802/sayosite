import { useState } from 'react'
import type { HeatmapCell } from '../../hooks/useGithubData'
import styles from './GithubHeatmap.module.css'

const CELL_SIZE = 10
const CELL_GAP = 2
const WEEKS = 12
const DAYS = 7

// GitHub green palette (4 levels + empty)
function getCellColor(count: number, isError: boolean): string {
  if (isError) return '#2d333b'
  if (count === 0) return '#161b22'
  if (count <= 2) return '#0e4429'
  if (count <= 4) return '#006d32'
  if (count <= 6) return '#26a641'
  return '#39d353'
}

interface TooltipState {
  cell: HeatmapCell
  x: number
  y: number
}

interface Props {
  cells: HeatmapCell[]
  isError: boolean
}

export default function GithubHeatmap({ cells, isError }: Props) {
  const [tooltip, setTooltip] = useState<TooltipState | null>(null)

  const svgWidth = WEEKS * (CELL_SIZE + CELL_GAP) - CELL_GAP
  const svgHeight = DAYS * (CELL_SIZE + CELL_GAP) - CELL_GAP

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr + 'T00:00:00')
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  return (
    <div className={styles.heatmapWrapper}>
      <svg
        width={svgWidth}
        height={svgHeight}
        className={styles.svg}
      >
        {cells.map(cell => {
          const x = cell.weekIndex * (CELL_SIZE + CELL_GAP)
          const y = cell.dayIndex * (CELL_SIZE + CELL_GAP)
          return (
            <rect
              key={cell.date}
              x={x}
              y={y}
              width={CELL_SIZE}
              height={CELL_SIZE}
              rx={2}
              fill={getCellColor(cell.count, isError)}
              className={styles.cell}
              onMouseEnter={e => {
                const rect = (e.target as SVGRectElement).getBoundingClientRect()
                setTooltip({ cell, x: rect.left, y: rect.top })
              }}
              onMouseLeave={() => setTooltip(null)}
            />
          )
        })}
      </svg>
      {tooltip && (
        <div
          className={styles.tooltip}
          style={{ left: tooltip.x, top: tooltip.y - 36 }}
        >
          {isError
            ? 'unavailable'
            : `${tooltip.cell.count} commit${tooltip.cell.count !== 1 ? 's' : ''} · ${formatDate(tooltip.cell.date)}`
          }
        </div>
      )}
    </div>
  )
}
