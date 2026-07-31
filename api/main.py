from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
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
    
    mi_correo = os.getenv("EMAIL_USER") 
    mi_password = os.getenv("EMAIL_PASSWORD")
 
    
    msg = MIMEMultipart()
    msg['From'] = mi_correo
    msg['To'] = mi_correo 
    msg['Subject'] = f"🚀 Nuevo mensaje de Portfolio: {form_data.name}"

    cuerpo = f"Nombre: {form_data.name}\nEmail: {form_data.email}\nMensaje:\n{form_data.message}"
    msg.attach(MIMEText(cuerpo, 'plain'))

    try:
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(mi_correo, mi_password)
        server.send_message(msg)
        server.quit()
        print("Correo enviado con éxito")
        return {"status": "success", "message": "Email enviado con éxito"}
    except Exception as e:
        print(f"Error: {e}")
        return {"status": "error", "message": "Falló el envío"}

    
    return {"status": "success", "message": "Email simulado con éxito"}
# Un endpoint de prueba para ver que la API está encendida
@app.get("/")
async def root():
    return {"status": "online", "message": "API de contacto funcionando"}