interface Props {
  title: string
  original: string
  optimized: string
}

export default function DiffViewer({
  title,
  original,
  optimized
}: Props) {

  return (

    <div className="border p-6 space-y-4">

      <h3 className="font-bold text-lg">
        {title}
      </h3>

      <div className="grid grid-cols-2 gap-6">

        <div>

          <h4 className="font-semibold text-gray-600">
            Original
          </h4>

          <p className="border p-3">
            {original}
          </p>

        </div>

        <div>

          <h4 className="font-semibold text-green-600">
            Optimized
          </h4>

          <p className="border p-3 bg-green-50">
            {optimized}
          </p>

        </div>

      </div>

    </div>

  )

}