import BlogItem from "./BlogItem"
import { useEffect, useState } from "react"
import axios from "axios"

const BlogList = () => {
  const [menu, setMenu] = useState("All")
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchBlogs = async () => {
    try {
      const response = await axios.get("/api/blogs")
      setBlogs(response.data.blogs)
    } catch (err) {
      console.error("Failed to fetch blogs", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBlogs()
  }, [])

  return (
    <div className="px-4 sm:px-8 lg:px-16">
      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-4 sm:gap-6 my-8 sm:my-10">
        {["All", "Technology", "Startup", "Lifestyle"].map((item) => (
          <button
            key={item}
            onClick={() => setMenu(item)}
            className={`py-1.5 px-4 rounded-sm text-sm sm:text-base border border-black transition 
              ${menu === item ? "bg-black text-white" : "text-black hover:bg-black hover:text-white"}`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex flex-col items-center py-20">
          <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin shadow-lg shadow-blue-300"></div>
          <p className="mt-4 text-black text-lg font-medium">Loading blogs...</p>
        </div>

      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10 mb-16">
          {blogs
            .filter((item) => (menu === "All" ? true : item.category === menu))
            .map((item, index) => (
              <BlogItem
                key={index}
                image={item.image}
                title={item.title}
                description={item.description}
                category={item.category}
                id={item._id}
              />
            ))}
        </div>
      )}
    </div>
  )
}

export default BlogList
