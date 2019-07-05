package main

import (
	"fmt"
	"net/http"
	"os"

	"firebase.google.com/go/auth"
	"github.com/VanshilShah/plura/firebase"
	"github.com/VanshilShah/plura/firebase/models"
	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		fmt.Println(err)
	}
	firebaseApp := firebase.InitApp()
	firestoreClient := firebase.InitFirestoreClient(firebaseApp)
	authClient := firebase.InitAuth(firebaseApp)
	// Set the router as the default one shipped with Gin
	router := gin.Default()

	// Serve frontend static files
	router.Use(static.Serve("/", static.LocalFile("./public", true)))
	router.Use(static.Serve("/images", static.LocalFile("./public/images", true)))
	router.NoRoute(func(c *gin.Context) {
		c.File("./public/index.html")
	})

	// Setup route group for the API
	api := router.Group("/api", authMiddleware(authClient))
	{
		api.GET("/", func(c *gin.Context) {
			c.JSON(http.StatusOK, gin.H{
				"message": "pong",
			})
		})
		api.GET("/name", func(c *gin.Context) {
			c.JSON(http.StatusOK, gin.H{
				"name": firebase.GetName(firestoreClient, c),
			})
		})
		api.GET("/tasks", func(c *gin.Context) {
			c.JSON(http.StatusOK, gin.H{
				"tasks": firebase.GetTasks(firestoreClient, c),
			})
		})
		api.POST("/tasks", func(c *gin.Context) {
			// data, _ := c.GetRawData()
			// fmt.Println(string(data))
			var task models.Task
			err := c.BindJSON(&task)
			if err != nil {
				fmt.Println(err)
			}
			if firebase.SaveTask(firestoreClient, c, task) {
				c.JSON(200, gin.H{})
			} else {
				c.JSON(400, gin.H{})
			}

		})
		api.DELETE("/tasks", func(c *gin.Context) {
			// data, _ := c.GetRawData()
			// fmt.Println(string(data))
			var task models.Task
			err := c.BindJSON(&task)
			if err != nil {
				fmt.Println(err)
			}
			if firebase.DeleteTask(firestoreClient, c, task) {
				c.JSON(200, gin.H{})
			} else {
				c.JSON(400, gin.H{})
			}

		})
	}
	// Start and run the server
	port := os.Getenv("PORT")
	if len(port) == 0 {
		port = "3000"
	}
	router.Run(":" + port)
}

func authMiddleware(authClient *auth.Client) gin.HandlerFunc {
	return func(c *gin.Context) {
		_, err := firebase.VerifyRequest(authClient, c)
		if err != nil {
			c.JSON(401, gin.H{})
		}
	}
}
