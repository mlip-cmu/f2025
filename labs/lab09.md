# Lab: Orchestrating ML training and Inference with Kubernetes
In this lab, you'll leverage Kubernetes to enable continuous model training and inference, configure a Python-based load balancer to distribute traffic across the backend inference instances, and experiment with [container lifecycle hooks](https://kubernetes.io/docs/concepts/containers/container-lifecycle-hooks/) in Kubernetes.



## Deliverables

- [ ] Show the TA that inference occurs with continuously updating models on a distributed backend
- [ ] Show to the TA what gets logged on container shutdown from the backend/inference service. Explain what container lifecycle hooks are and when they might be used.
- [ ] Explain to the TA how Kubernetes might be used in Milestone 3



## Getting Started
1. **Sign up for Docker**: If you don't already, ensure you have an account at [docker.com](https://www.docker.com/), so you can push images to the docker registry.
2. **Start Docker**: Ensure Docker is running on your machine.
3. **Fork Repo**: Fork the repo [here](https://github.com/KaushikKoirala/mlip-kubernetes-lab-fall25) 
4. **Install MiniKube**: Follow instructions [here](https://minikube.sigs.k8s.io/docs/start/).
5. **Start MiniKube**: Start MiniKube on your local setup. Run `minikube start`.
6. **Verify MiniKube**: Confirm that MiniKube is running by listing all pods:

```
kubectl get po -A
```

## Task 1: Implement continuous training 
1. In `model_trainer.py` implement the code to train the model given training data `X` and labels `Y`
2. Push your model training image. For details on how to do that, see [Build and Push the Docker Image](./README.md#build-and-push-the-docker-image)
3. In `trainer_deployment.yaml` configure the cron so that the model training runs at a periodic interval (for demonstration purposes keep it fairly frequent; every 1-2 minutes)  
```
kubectl apply -f trainer-deployment.yaml
```
At this point, you should be able to see the continuously running training `model-trainer-job` CronJob using the Minikube dashboard. For instructions on doing that see [Troubleshooting](#troubleshooting).

## Task 2: Implement the Backend Inference Service and Load Balancer
1. In `backend.py` implement the code changes to predict based on the input.
2. In `load_balancer.py` implement the code changes to route traffic for both the `POST` and `GET` endpoints.
3. Push your backend and load balancer images to the Docker registry. For details on how to do that, see [Build and Push the Docker Image](./README.md#build-and-push-the-docker-image)

At this point, you should be able to verify that you can reach the load balancer and can see the inference happening on distributed backend. For this task/step comment out the `lifecycle` hook in `backend-deployment.yaml` (or just skip this step and do the full implementation of `backend-deployment.yaml` at the next step).  
Then apply the manifests for the backend and the load balancer:
```
kubectl apply -f backend-deployment.yaml
kubectl apply -f load-balancer-deployment.yaml
```
Verify using [this postman collection](./mlip-kubernetes.postman_collection.json) AND/OR the following `cURL` commands. For obtaining the correct port, see [Accessing the Load Balancer](#accessing-the-load-balancer). You should see the `host` parameter in the response body vary across requests: 
```
curl --location --request GET '127.0.0.1:<some-port-here>/model-info'
```

```
curl --location --request POST '127.0.0.1:<some-port-here>/predict' \
--header 'Content-Type: application/json' \
--data-raw '{
    "avg_session_duration": 30,
    "visits_per_week": 14,
    "response_rate": 4,
    "feature_usage_depth": 6,
    "user_id": 34
}'
```

## Task 3: Implement the lifecycle hook and re-deploy service in Kubernetes
1. Configure the lifecycle hook to send a SIGTERM on shutdown to `backend.py` in `backend-deployment.yaml`
2. **CRUCIAL**: Ensure you have the correct DockerHub username/image name in all 3 of the following files: `load-balancer-deployment.yaml`, `backend-deployment.yaml`, `trainer-deployment.yaml`
3. Re-deploy the backend: 
```
kubectl apply -f backend-deployment.yaml
```

Now that this task is complete you should be able to demonstrate the behavior of te lifecycle hook:    

```
# for verifying shutdown hooks
kubectl rollout restart deployment/flask-backend-deployment
# then in a separate process
kubectl logs -l app=flask-backend -f
```

### 


## Observe Load Balancer Logs (Optional):

- Monitor the backend logs in real-time to verify that the load balancer distributes requests evenly:

  ```
  kubectl logs -l app=flask-backend -f
  ```

---

## Build and Push the Docker Image:
Before you do the following steps, ensure you have logged into docker. You will need to do the following for EACH type of image (trainer, backend, and loadbalancer)
```
docker build -t <your-dockerhub-username>/<load-balancer-image-name>:1.0.0 -f Dockerfile.loadbalancer .
docker push <your-dockerhub-username>/<load-balancer-image-name>:1.0.0
```

## Accessing the Load Balancer
Access the Load Balancer and Test Traffic

1. **Access via NodePort**:

- Get the MiniKube IP:
  ```
  minikube ip
  ```
- Access the load balancer using `curl` (replace `<minikube-ip>` with the output from `minikube ip`):
  ```
  curl "http://<minikube-ip>:30080/?user_id=Alice"
  ```

2. **Use `minikube service` (If NodePort Does Not Work)**:

- Create a tunnel to the load balancer service:
  ```
  minikube service flask-load-balancer-service
  ```
- This command will provide a URL, typically in the format `http://127.0.0.1:<some-port>`, which you can use to test the load balancer.


## Troubleshooting
- **Launch MiniKube Dashboard**:
Open the MiniKube dashboard to monitor the status of Pods, deployments, and services:
  ```
  minikube dashboard
  ```
- **Minikube IP Issues**: Use `minikube ip` to verify the correct IP.
- **Service Not Accessible**: If NodePort does not work, use `minikube service` to create a tunnel.
- **Backend Logs**: Use `kubectl logs -l app=flask-backend -f` to monitor requests going to the backend.
- **Load Balancer Logs**: Check the load balancer logs to see the request distribution:
  ```
  kubectl logs -l app=flask-load-balancer -f
  ```
- **Image Pull Issues**: Ensure your Docker images are pushed to Docker Hub with the correct tags. [More Details](https://docs.docker.com/get-started/introduction/build-and-push-first-image/)
