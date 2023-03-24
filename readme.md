Text to Image Synthesis using Stable Diffusion
This repository contains code for a text-to-image synthesis application using Stable Diffusion, a latent diffusion model trained on 512x512 images from a subset of the LAION-5B dataset. The model uses a frozen CLIP ViT-L/14 text encoder to condition the model on text prompts, allowing users to generate images from textual descriptions.

Installation
To use this application, you will need to have Python 3.8 or higher installed on your machine. You can clone this repository using the following command:


git clone https://github.com/<username>/<repository>.git
Then, navigate to the cloned directory and install the required packages using pip:

cd <repository>
pip install -r requirements.txt
Usage
This application consists of a FastAPI endpoint that serves the Stable Diffusion model and a React UI for interacting with the model. To run the application, first start the FastAPI server:


uvicorn main:app --reload
This will start the server at http://localhost:8000. Next, navigate to the ui directory and start the React app:


cd client
npm install
npm start
This will start the React app at http://localhost:3000. You can now enter a text prompt in the input field and click the "Generate" button to generate an image. The generated image will be displayed on the screen.

Model Details
The Stable Diffusion model is relatively lightweight and can run on consumer GPUs. It uses a PNDMScheduler scheduler by default, but diffusers provides many other schedulers that can be used with the stable diffusion pipeline, such as DDIMScheduler, LMSDiscreteScheduler, EulerDiscreteScheduler, EulerAncestralDiscreteScheduler, etc. To use a different scheduler, you can either change it via the ConfigMixin.from_config() method or pass the scheduler argument to the from_pretrained method of the pipeline.

This implementation of the Stable Diffusion model uses the weights of the Stable Diffusion v4 model that have been downloaded from the Hugging Face model hub. The model is conditioned on text prompts using a frozen CLIP ViT-L/14 text encoder.

References
Stable Diffusion GitHub Repository
Hugging Face Model Hub
Latent Diffusion Models by Robin Rombach, Andreas Blattmann, Dominik Lorenz, Patrick Esser, Björn Ommer
Diffusers Documentation by Hugging Face