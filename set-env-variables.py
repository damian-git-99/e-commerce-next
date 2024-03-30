import os

env_vars = [
    "export IMAGE_VERSION='latest'",
    "export PAYPAL_OAUTH_URL='https://oauth.paypal.com/v1'",
    "export PAYPAL_ORDERS_URL='https://api.paypal.com/v2'",
    "export CLOUDINARY_URL=''",
]

bashrc_path = os.path.expanduser('~/.bashrc')

for env_var in env_vars:
    with open(bashrc_path, 'r') as file:
        if env_var not in file.read():
            with open(bashrc_path, 'a') as file:
                file.write('\n' + env_var + '\n')
            print(f"Se ha agregado la variable de entorno al archivo {bashrc_path}")
        else:
            print("La variable de entorno ya está definida en el archivo {bashrc_path}")

os.system(f"source {bashrc_path}")