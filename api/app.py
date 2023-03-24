from auth_token import auth_token
from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware
import torch
from torch import autocast
from diffusers import StableDiffusionPipeline
from io import BytesIO
import base64
import os
os.environ["PYTORCH_CUDA_ALLOC_CONF"] = "max_split_size_mb:256"
torch.cuda.empty_cache()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_credentials = True,
    allow_origins=["*"],
    allow_headers=["*"],
    allow_methods=["*"]
)

device = "cuda"
path = "./stable-diffusion-v1-4"
pipe =  StableDiffusionPipeline.from_pretrained(path, variant="fp16",
                 torch_dtype=torch.float16, use_auth_token = auth_token)
pipe.to(device)
pipe.enable_attention_slicing()
# pipe.save_pretrained("./stable-diffusion-v1-4", variant="fp16")

@app.get("/")
def generate(prompt: str):
    with autocast(device):
        image = pipe(prompt, guidance_scale=8.5).images[0]
    image.save("testimage.png")

    buffer = BytesIO()
    image.save(buffer, format="PNG")
    imgstr = base64.b64encode(buffer.getvalue())

    return Response(content=imgstr, media_type="image/png")