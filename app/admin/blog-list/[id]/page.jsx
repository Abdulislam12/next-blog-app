'use client'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import axios from 'axios'

const BlogDetailPage = () => {
  const { id } = useParams()
  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)
  const [editMode, setEditMode] = useState(false)
  const [image, setImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)

  // Form state for editing
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`/api/blogs`, { params: { id } })
        setBlog(res.data)
        setTitle(res.data.title)
        setDescription(res.data.description)
        setLoading(false)
      } catch (err) {
        console.error('Failed to fetch blog:', err)
        setLoading(false)
      }
    }

    if (id) fetchBlog()
  }, [id])

  // Handle save (PATCH request)
  const handleSave = async () => {
    setSaving(true)

    try {
      const formData = new FormData()
      formData.append('title', title)
      formData.append('description', description)
      if (image) formData.append('image', image)

      const res = await axios.patch(`/api/blogs?id=${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      setBlog(res.data)
      setEditMode(false)
      setImage(null)
      setImagePreview(null)
    } catch (err) {
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="p-6 sm:pl-[220px]">Loading blog...</div>
  if (!blog) return <div className="p-6 sm:pl-[220px] text-red-600">Blog not found</div>

  return (
    <div className="p-4 sm:pl-[220px] sm:pr-10 pt-6 max-w-5xl mx-auto">
      {/* Edit button toggles editMode */}
      <button
        onClick={() => {
          setEditMode(!editMode)
          setImagePreview(null)
          setImage(null)
        }}
        className="inline-block px-4 py-2 text-white bg-blue-600 rounded-lg cursor-pointer hover:bg-blue-700 transition-colors duration-200 mb-4"
      >
        {editMode ? 'Cancel ✕' : 'Edit ✎'}
      </button>

      {editMode ? (
        // Edit form
        <div className="space-y-4">
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Title"
          />

          <textarea
            rows={6}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Description"
          />

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Update Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={e => {
                const file = e.target.files[0]
                setImage(file)
                if (file) {
                  setImagePreview(URL.createObjectURL(file))
                }
              }}
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
            />
          </div>

          {/* Show preview if new image is selected */}
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-3 max-h-[200px] rounded-lg border"
            />
          )}

          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors duration-200"
          >
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      ) : (
        // View mode
        <>
          <h1 className="text-2xl sm:text-3xl font-bold mb-4">{blog.title}</h1>

          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600 mb-4">
            <span>By {blog.author?.username}</span>
            <span className="hidden sm:inline">|</span>
            <span className="text-gray-500">{blog.category}</span>
          </div>

          {blog.image && (
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full max-h-[400px] object-cover rounded-lg border mb-6"
            />
          )}

          <p className="text-base sm:text-lg text-gray-800 leading-relaxed whitespace-pre-line">
            {blog.description}
          </p>
        </>
      )}
    </div>
  )
}

export default BlogDetailPage
