import React from "react"
import { ArrowDown, ArrowUp, DollarSign, AlertCircle, FileText, CreditCard } from "lucide-react"

export default function FinancialMetrics() {
  const metrics = [
    {
      title: "Revenue",
      value: "₵405,091.00",
      change: "+4.75%",
      isPositive: true,
      icon: DollarSign,
    },
    {
      title: "Overdue invoices",
      value: "₵12,787.00",
      change: "+54.02%",
      isPositive: false,
      icon: AlertCircle,
    },
    {
      title: "Outstanding invoices",
      value: "₵245,988.00",
      change: "-1.39%",
      isPositive: false,
      icon: FileText,
    },
    {
      title: "Expenses",
      value: "₵30,156.00",
      change: "+10.18%",
      isPositive: false,
      icon: CreditCard,
    },
  ]

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-gray-200">
        {metrics.map((metric, index) => (
          <div key={metric.title} className="p-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium text-gray-500 flex items-center">
                <metric.icon className="w-4 h-4 mr-2" />
                {metric.title}
              </h3>
              <span
                className={`text-sm font-medium ${
                  metric.isPositive ? "text-green-600" : "text-red-600"
                }`}
              >
                {metric.change}
                {metric.isPositive ? (
                  <ArrowUp className="inline ml-1 h-4 w-4" />
                ) : (
                  <ArrowDown className="inline ml-1 h-4 w-4" />
                )}
              </span>
            </div>
            <p className="text-2xl font-semibold text-gray-900">{metric.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}