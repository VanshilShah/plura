package main

import (
	"net/http"
	"os"

	"github.com/VanshilShah/plura/firestore"
	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()
	if err != nil {
	}

	firestore.Init()
	// Set the router as the default one shipped with Gin
	router := gin.Default()

	// Serve frontend static files
	router.Use(static.Serve("/", static.LocalFile("./public", true)))

	// Setup route group for the API
	api := router.Group("/api")
	{
		api.GET("/", func(c *gin.Context) {
			c.JSON(http.StatusOK, gin.H{
				"message": "pong",
			})
		})
		api.GET("/name", func(c *gin.Context) {
			c.JSON(http.StatusOK, gin.H{
				"name": firestore.GetName(c),
			})
		})
		api.GET("/tasks", func(c *gin.Context) {
			c.JSON(http.StatusOK, gin.H{
				"tasks": firestore.GetTasks(c),
			})
		})
	}
	// Start and run the server
	port := os.Getenv("PORT")
	if len(port) == 0 {
		port = "3000"
	}
	router.Run(":" + port)
}
