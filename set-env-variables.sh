#!/bin/bash

# Define las variables de entorno
ENV_VARS=(
    "export IMAGE_VERSION='latest'"
    "export PAYPAL_OAUTH_URL='https://oauth.paypal.com/v1'"
    "export PAYPAL_ORDERS_URL='https://api.paypal.com/v2'"
    "export CLOUDINARY_URL=''"
)

# Itera sobre las variables de entorno
for ENV_VAR in "${ENV_VARS[@]}"; do
    # Verifica si la variable ya está definida en el archivo de perfil
    if ! grep -qF "$ENV_VAR" ~/.bashrc; then
        # Si no está definida, la agrega al final del archivo de perfil
        echo "$ENV_VAR" >> ~/.bashrc
        echo "Se ha agregado la variable de entorno al archivo ~/.bashrc"
    else
        echo "La variable de entorno ya está definida en el archivo ~/.bashrc"
    fi
done

# Carga el archivo de perfil para aplicar los cambios
source ~/.bashrc