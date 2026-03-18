import { OptimizerResult } from "@/types/optimizer.types"

export default function ImprovementList({
  result
}: {
  result: OptimizerResult
}) {

  return (

    <div className="space-y-6">

      <div>

        <h3 className="font-bold">
          Strengths
        </h3>

        <ul>
          {result.strengths.map((s, i) => (
            <li key={i}>• {s}</li>
          ))}
        </ul>

      </div>

      <div>

        <h3 className="font-bold">
          Missing Skills
        </h3>

        <ul>
          {result.missingSkills.map((s, i) => (
            <li key={i}>• {s}</li>
          ))}
        </ul>

      </div>

      <div>

        <h3 className="font-bold">
          Improvements
        </h3>

        <ul>
          {result.improvements.map((s, i) => (
            <li key={i}>• {s}</li>
          ))}
        </ul>

      </div>

    </div>

  )

}