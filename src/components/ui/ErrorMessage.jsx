import { AlertCircle } from 'lucide-react'

export const ErrorMessage = ({ 
  title = "Unable to Load Data",
  message = "We're having trouble connecting to our servers. Please check your internet connection and try again.",
  onRetry
}) => {
  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center">
      <div className="bg-red-50 border-l-4 border-red-400 p-8 rounded-lg max-w-lg w-full">
        <div className="flex items-center gap-3">
          <AlertCircle className="h-6 w-6 text-red-400" />
          <h3 className="text-lg font-semibold text-red-800">{title}</h3>
        </div>
        <p className="mt-2 text-sm text-red-700">{message}</p>
        {onRetry && (
          <button 
            onClick={onRetry} 
            className="mt-4 px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors duration-200 text-sm font-medium"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  )
} 