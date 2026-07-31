from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import resend
import os
from dotenv import load_dotenv
load_dotenv()



# Inicializamos la aplicación FastAPI
app = FastAPI(title="Portfolio Contact API")

# Configuración de CORS
# Esto es CRÍTICO: permite que tu index.html (frontend) pueda comunicarse
# con tu API sin que el navegador bloquee la petición por seguridad.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # En producción cambiaremos esto por la URL de tu web
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Definimos cómo deben ser los datos que vamos a recibir del frontend
class ContactForm(BaseModel):
    name: str
    email: str
    message: str

    # Creamos el endpoint (la ruta) que recibirá la petición POST
@app.post("/contact")
async def send_contact_email(form_data: ContactForm):
    # Configurar API Key de Resend
    resend.api_key = os.getenv("RESEND_API_KEY")
    
    # Tu correo donde quieres recibir los mensajes
    mi_correo = os.getenv("EMAIL_USER") 

    try:
        # Usamos el dominio de prueba de Resend (onboarding@resend.dev)
        # Esto nos permite enviar correos sin tener que verificar un dominio propio
        r = resend.Emails.send({
            "from": "Portfolio <onboarding@resend.dev>",
            "to": mi_correo,
            "subject": f"🚀 Nuevo mensaje de Portfolio: {form_data.name}",
            "text": f"Nombre: {form_data.name}\nEmail: {form_data.email}\nMensaje:\n{form_data.message}"
        })
        print("Correo enviado con éxito a través de Resend")
        return {"status": "success", "message": "Email enviado con éxito"}
    except Exception as e:
        print(f"Error enviando correo con Resend: {e}")
        return {"status": "error", "message": "Falló el envío"}

    
    return {"status": "success", "message": "Email simulado con éxito"}
# Un endpoint de prueba para ver que la API está encendida
@app.get("/")
async def root():
    return {"status": "online", "message": "API de contacto funcionando"}