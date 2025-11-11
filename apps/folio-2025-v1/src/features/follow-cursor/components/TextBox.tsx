import { forwardRef } from 'react'
import { TP } from '@/components/typograpgy/p'

interface TextBoxProps {
  textContentRef: React.RefObject<HTMLParagraphElement | null>
  displayText: string
}

export const TextBox = forwardRef<HTMLDivElement, TextBoxProps>(
  ({ textContentRef, displayText }, ref) => {
    return (
      <div
        ref={ref}
        className="fixed z-1000 rounded-sm mt-3 pointer-events-none w-max p-1 bg-blue-600 origin-top-left opacity-0"
      >
        <TP ref={textContentRef} className="text-white whitespace-nowrap leading-none">
          {displayText}
        </TP>
      </div>
    )
  },
)

TextBox.displayName = 'TextBox'

