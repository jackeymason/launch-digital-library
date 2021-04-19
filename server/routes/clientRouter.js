import express from "express"

const router = new express.Router()

const clientRoutes = ["/stats", "/books", "/books/new", "/books/:id"]
router.get(clientRoutes, (req, res) => {
  res.render("home")
})

export default router
