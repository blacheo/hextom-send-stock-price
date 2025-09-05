import { Calendar } from "lucide-react"

export default function NewsCard({ article }) {
  return (
    <div className="w-full max-w-md rounded-2xl border bg-white shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      {/* Article image */}
      {article.thumbnail && (
        <img
          src={article.thumbnail.resolutions[0].url}
          alt={article.title}
          className="w-full h-48 object-cover"
        />
      )}

      {/* Content */}
      <div className="p-4 flex flex-col gap-3">
        {/* Title */}
        <h2 className="text-lg font-semibold line-clamp-2 text-gray-800">
          {article.title}
        </h2>

        {/* Link */}
        <a
          href={article.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block text-blue-600 hover:underline text-sm font-medium"
        >
          Read more →
        </a>
      </div>
    </div>
  )
}
