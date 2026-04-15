import { PremiumButton } from '@/components/premium-button'

interface PaginationProProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function PaginationPro({ currentPage, totalPages, onPageChange }: PaginationProProps) {
  if (totalPages <= 1) return null

  return (
    <div className="flex items-center justify-center gap-3">
      <PremiumButton
        variant="outline"
        size="sm"
        disabled={currentPage === 1}
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
      >
        Previous
      </PremiumButton>
      <span className="text-sm text-muted-foreground">
        Page {currentPage} / {totalPages}
      </span>
      <PremiumButton
        variant="outline"
        size="sm"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
      >
        Next
      </PremiumButton>
    </div>
  )
}
