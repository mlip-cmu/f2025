# Lab 5: Containerizing with Docker

In this lab, you'll learn how to containerize a Flask application, train and deploy a machine learning model using Docker and Docker Compose. By the end of the lab, you'll have a Flask API running in a Docker container that can serve predictions using a machine learning model trained on the Iris dataset. You will also learn how to debug and check logs in a Docker container.

Clone the code from [this](https://github.com/kp10-x/mlip-docker-lab-f25) repository.

## Deliverables

 - [ ] Containerize the training step by writing a train.py script inside a Docker image that produces a model file, and explain why Docker is useful in this scenario for reproducibility and portability.
 - [ ] Build the Flask App for inference and containerize it, ensuring it can load the trained model and serve predictions. Explain how containerizing the inference service simplifies deployment and scaling.
 - [ ] Orchestrate both services with Docker Compose, verify with logs that training completes and inference serves requests, and explain how storage is handled between multiple container services and how this builds the overall ML pipeline.

## Prerequisite: Setup Docker

- Install Docker on your system
- Verify Docker installation

Follow the instructions for your operating system to install Docker. Then test your installation with:

```bash
docker run hello-world
```

## Additional resources 
1. [Docker For Beginners](https://docker-curriculum.com/)
2. [Build and Deploy Flask Applications with Docker](https://www.digitalocean.com/community/tutorials/how-to-build-and-deploy-a-flask-application-using-docker-on-ubuntu-20-04)
3. [Models on Docker](https://towardsdatascience.com/build-and-run-a-docker-container-for-your-machine-learning-model-60209c2d7a7f)

## Troubleshooting

If you encounter issues:
- Check Docker daemon status
- Verify port availability
- Review service logs with `docker-compose logs`
- Ensure the training service completes before the inference service starts

