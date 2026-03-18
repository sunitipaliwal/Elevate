import { OptimizerResult } from "@/types/optimizer.types"

export default function ScoreCard({
  result
}: {
  result: OptimizerResult
}) {

  return (

    <div className="border p-6 rounded">

      <h2 className="text-xl font-bold">
        ATS Score
      </h2>

      <p className="text-4xl font-bold text-green-600">
        {result.score}/100
      </p>

    </div>

  )

}