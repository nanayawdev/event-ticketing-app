import { TbLoader2 } from 'react-icons/tb'

export const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <TbLoader2 className="animate-spin rounded-full h-8 w-8 border-b-2 border-sea-green-400 mx-auto mb-4 text-sea-green-200" />
    </div>
  )
} 